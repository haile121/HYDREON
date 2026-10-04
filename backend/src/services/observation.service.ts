import { prisma } from "../lib/prisma.js";
import { getAIProvider } from "./ai/ai.provider.js";
import { ValidationEngine } from "./validation/validation.engine.js";
import { CreateObservationInput } from "../types/index.js";
import { ObservationStatus, Priority } from "@prisma/client";

export class ObservationService {
  static async createObservation(input: CreateObservationInput) {
    // 1. Create Location
    const location = await prisma.location.create({
      data: {
        latitude: input.latitude,
        longitude: input.longitude,
        address: input.address || "Urban Stream Access Node",
        siteId: input.siteId,
      },
    });

    // 2. Create Observation Record
    const observation = await prisma.observation.create({
      data: {
        userId: input.userId,
        siteId: input.siteId,
        locationId: location.id,
        title:
          input.title ||
          `Stream Observation (${new Date().toLocaleDateString()})`,
        status: ObservationStatus.ANALYZING,
        priority: Priority.MEDIUM,
        waterAppearance: input.waterAppearance,
        vegetationCondition: input.vegetationCondition,
        wildlifeObserved: input.wildlifeObserved,
        pollutionIndicators: input.pollutionIndicators,
        odorReported: input.odorReported,
        notes: input.notes,
        observedAt: new Date(),
      },
    });

    // 3. Attach Images
    if (input.imageUrls && input.imageUrls.length > 0) {
      for (const url of input.imageUrls) {
        await prisma.observationImage.create({
          data: {
            observationId: observation.id,
            url,
            caption: "Citizen submitted field photo",
          },
        });
      }
    }

    // 4. Log Audit Event
    await prisma.auditLog.create({
      data: {
        userId: input.userId,
        action: "OBSERVATION_SUBMITTED",
        entityType: "Observation",
        entityId: observation.id,
        details: JSON.stringify({ title: observation.title }),
      },
    });

    // 5. Automatically Trigger AI Assessment Engine
    const analysis = await this.triggerAIAnalysis(observation.id);

    return {
      observation,
      analysis,
    };
  }

  static async triggerAIAnalysis(observationId: string) {
    const obs = await prisma.observation.findUnique({
      where: { id: observationId },
      include: { images: true, location: true },
    });

    if (!obs) throw new Error("Observation not found");

    const aiProvider = getAIProvider();
    const rawAIOutput = await aiProvider.analyzeObservation({
      waterAppearance: obs.waterAppearance,
      vegetationCondition: obs.vegetationCondition,
      wildlifeObserved: obs.wildlifeObserved,
      pollutionIndicators: obs.pollutionIndicators,
      odorReported: obs.odorReported || undefined,
      notes: obs.notes || undefined,
      imageUrls: obs.images.map((i) => i.url),
    });

    const validatedResult = ValidationEngine.processAssessment(
      rawAIOutput,
      obs,
    );

    // Save AI Analysis to DB
    const aiAnalysis = await prisma.aIAnalysis.create({
      data: {
        observationId: obs.id,
        provider: aiProvider.name,
        modelVersion: "v1.4-structured-onehealth",
        overallStatus: rawAIOutput.overall_status,
        overallConfidence: rawAIOutput.overall_confidence,
        reasoningSummary: rawAIOutput.reasoning_summary,
        uncertaintyNotes: rawAIOutput.uncertainties.join(" | "),
        recommendedReview: rawAIOutput.recommended_review,
        rawJson: JSON.stringify(rawAIOutput),
      },
    });

    // Save Signals
    for (const sig of rawAIOutput.potential_signals) {
      await prisma.aISignal.create({
        data: {
          aiAnalysisId: aiAnalysis.id,
          signalType: sig.type,
          confidence: sig.confidence,
          evidence:
            sig.evidence || "Visual & indicator evaluation pattern match",
        },
      });
    }

    // Update Observation Status & Priority
    const updatedStatus = validatedResult.isHumanReviewRequired
      ? ObservationStatus.IN_REVIEW
      : ObservationStatus.ASSESSED;
    await prisma.observation.update({
      where: { id: obs.id },
      data: {
        status: updatedStatus,
        priority: validatedResult.calculatedPriority as Priority,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "AI_ASSESSMENT_GENERATED",
        entityType: "AIAnalysis",
        entityId: aiAnalysis.id,
        details: JSON.stringify({
          overallStatus: rawAIOutput.overall_status,
          confidence: rawAIOutput.overall_confidence,
        }),
      },
    });

    return aiAnalysis;
  }

  static async getObservationById(id: string) {
    let obs = await prisma.observation.findUnique({
      where: { id },
      include: {
        user: true,
        site: true,
        location: true,
        images: true,
        indicators: true,
        aiAnalyses: {
          include: { signals: true },
          orderBy: { createdAt: "desc" },
        },
        reviews: {
          include: { reviewer: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!obs) {
      // Fallback to first available observation in database
      obs = await prisma.observation.findFirst({
        include: {
          user: true,
          site: true,
          location: true,
          images: true,
          indicators: true,
          aiAnalyses: {
            include: { signals: true },
            orderBy: { createdAt: "desc" },
          },
          reviews: {
            include: { reviewer: true },
            orderBy: { createdAt: "desc" },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    }

    return obs;
  }

  static async listObservations(filters?: {
    status?: string;
    priority?: string;
    siteId?: string;
  }) {
    const whereClause: any = {};
    if (filters?.status) whereClause.status = filters.status;
    if (filters?.priority) whereClause.priority = filters.priority;
    if (filters?.siteId) whereClause.siteId = filters.siteId;

    return prisma.observation.findMany({
      where: whereClause,
      include: {
        location: true,
        site: true,
        images: true,
        aiAnalyses: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        reviews: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
