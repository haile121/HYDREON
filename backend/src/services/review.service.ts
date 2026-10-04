import { prisma } from "../lib/prisma.js";
import { SubmitReviewInput } from "../types/index.js";
import { ObservationStatus, ReviewAction } from "@prisma/client";

export class ReviewService {
  static async submitReview(input: SubmitReviewInput) {
    const observation = await prisma.observation.findUnique({
      where: { id: input.observationId },
    });

    if (!observation) throw new Error("Observation not found");

    let newStatus: ObservationStatus = observation.status;

    switch (input.action) {
      case ReviewAction.CONFIRM:
        newStatus = ObservationStatus.VERIFIED;
        break;
      case ReviewAction.MODIFY:
        newStatus = ObservationStatus.VERIFIED;
        break;
      case ReviewAction.REJECT:
        newStatus = ObservationStatus.REJECTED;
        break;
      case ReviewAction.REQUEST_INFO:
        newStatus = ObservationStatus.NEEDS_INFO;
        break;
    }

    // Create Review record
    const review = await prisma.review.create({
      data: {
        observationId: input.observationId,
        reviewerId: input.reviewerId,
        action: input.action as ReviewAction,
        previousStatus: observation.status,
        newStatus,
        reviewerNotes: input.reviewerNotes,
        modifiedIndicators: input.modifiedIndicators
          ? JSON.stringify(input.modifiedIndicators)
          : undefined,
      },
    });

    // Update Observation
    await prisma.observation.update({
      where: { id: input.observationId },
      data: {
        status: newStatus,
      },
    });

    // Log Audit Event
    await prisma.auditLog.create({
      data: {
        userId: input.reviewerId,
        action: `REVIEW_${input.action}`,
        entityType: "Review",
        entityId: review.id,
        details: JSON.stringify({
          observationId: input.observationId,
          previousStatus: observation.status,
          newStatus,
          action: input.action,
        }),
      },
    });

    return review;
  }

  static async getReviewQueue() {
    return prisma.observation.findMany({
      where: {
        status: {
          in: [
            ObservationStatus.IN_REVIEW,
            ObservationStatus.SUBMITTED,
            ObservationStatus.ASSESSED,
          ],
        },
      },
      include: {
        site: true,
        location: true,
        images: true,
        aiAnalyses: {
          take: 1,
          orderBy: { createdAt: "desc" },
          include: { signals: true },
        },
        reviews: {
          include: { reviewer: true },
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { priority: "desc" },
    });
  }

  static async getAuditLogs() {
    return prisma.auditLog.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }
}
