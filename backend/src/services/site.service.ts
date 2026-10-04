import { prisma } from "../lib/prisma.js";

export class SiteService {
  static async listSites() {
    return prisma.streamSite.findMany({
      include: {
        observations: {
          take: 5,
          orderBy: { createdAt: "desc" },
          include: { images: true, aiAnalyses: { take: 1 } },
        },
        metrics: {
          orderBy: { recordedAt: "desc" },
        },
      },
    });
  }

  static async getSiteById(id: string) {
    const site = await prisma.streamSite.findFirst({
      where: {
        OR: [{ id }, { code: id }],
      },
      include: {
        observations: {
          orderBy: { createdAt: "desc" },
          include: {
            images: true,
            location: true,
            aiAnalyses: { take: 1, include: { signals: true } },
            reviews: { take: 1 },
          },
        },
        metrics: {
          orderBy: { recordedAt: "desc" },
        },
      },
    });

    if (!site) throw new Error("Stream site not found");

    // Calculate site health synthesis insights
    const totalObs = site.observations.length;
    const attentionObs = site.observations.filter(
      (o) =>
        o.aiAnalyses[0]?.overallStatus === "ATTENTION_RECOMMENDED" ||
        o.aiAnalyses[0]?.overallStatus === "HIGH_PRIORITY_SIGNAL",
    ).length;
    const verifiedObs = site.observations.filter(
      (o) => o.status === "VERIFIED",
    ).length;

    const insights = [
      totalObs > 0
        ? `${verifiedObs} of ${totalObs} observations have been verified by expert reviewers.`
        : "Baseline observation monitoring initialized for site.",
      attentionObs > 0
        ? `Potential ecosystem stress signals detected in ${attentionObs} recent citizen submissions.`
        : "No active ecosystem stress signals detected.",
    ];

    return {
      site,
      summary: {
        totalObservations: totalObs,
        attentionRequired: attentionObs,
        verifiedCount: verifiedObs,
        insights,
      },
    };
  }

  static async getMapObservations() {
    return prisma.observation.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        waterAppearance: true,
        vegetationCondition: true,
        observedAt: true,
        location: true,
        site: true,
        images: {
          take: 1,
          select: { url: true },
        },
        aiAnalyses: {
          take: 1,
          select: {
            overallStatus: true,
            overallConfidence: true,
            reasoningSummary: true,
          },
        },
      },
    });
  }
}
