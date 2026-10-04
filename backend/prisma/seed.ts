import {
  PrismaClient,
  Role,
  ObservationStatus,
  Priority,
  ReviewAction,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting HYDREON database seed...");

  // Clean existing database records
  await prisma.auditLog.deleteMany();
  await prisma.review.deleteMany();
  await prisma.aISignal.deleteMany();
  await prisma.aIAnalysis.deleteMany();
  await prisma.observationIndicator.deleteMany();
  await prisma.observationImage.deleteMany();
  await prisma.observation.deleteMany();
  await prisma.location.deleteMany();
  await prisma.environmentalMetric.deleteMany();
  await prisma.streamSite.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Users
  const reviewer = await prisma.user.create({
    data: {
      email: "dr.elena.vance@oneaquahealth.org",
      name: "Dr. Elena Vance",
      role: Role.REVIEWER,
      organization: "OneAquaHealth Ecosystem Assessment Lead",
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    },
  });

  const citizen = await prisma.user.create({
    data: {
      email: "marcus.chen@citizenwatch.org",
      name: "Marcus Chen",
      role: Role.CITIZEN,
      organization: "Urban Stream Monitors Collective",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: "admin@hydreon.org",
      name: "HYDREON Operations",
      role: Role.ADMIN,
      organization: "IEEE OneAquaHealth Hackathon Platform",
    },
  });

  // 2. Create Stream Sites
  const siteRiverside = await prisma.streamSite.create({
    data: {
      name: "Riverside North Stream",
      code: "STR-RIV-01",
      description:
        "Perennial urban creek segment flowing through dense residential and parkland corridor.",
      streamType: "Urban Freshwater Creek",
      catchmentArea: "Lower Basin Corridor (14.2 sq km)",
      latitude: 42.3601,
      longitude: -71.0589,
    },
  });

  const siteGreenway = await prisma.streamSite.create({
    data: {
      name: "Greenway Urban Canal",
      code: "STR-GRN-02",
      description:
        "Modified urban waterways channel receiving residential stormwater discharge.",
      streamType: "Stormwater-Fed Urban Canal",
      catchmentArea: "Central Drainage Zone (8.7 sq km)",
      latitude: 42.3655,
      longitude: -71.0642,
    },
  });

  const siteCentral = await prisma.streamSite.create({
    data: {
      name: "Central Watershed Runoff",
      code: "STR-CTR-03",
      description:
        "Riffle-pool stream section with riparian restoration buffer.",
      streamType: "Restored Freshwater Runoff",
      catchmentArea: "Parkland Reserve (22.5 sq km)",
      latitude: 42.3522,
      longitude: -71.0715,
    },
  });

  const siteEastMarsh = await prisma.streamSite.create({
    data: {
      name: "East Marsh Wetland Outfall",
      code: "STR-EST-04",
      description:
        "Estuarine wetland transitional node subject to tidal and urban outfall flows.",
      streamType: "Coastal Transition Wetland",
      catchmentArea: "Estuary Outfall Basin (18.9 sq km)",
      latitude: 42.3489,
      longitude: -71.0498,
    },
  });

  // 3. Create Environmental Metrics History
  const metricsData = [
    {
      siteId: siteRiverside.id,
      metricType: "visual_stress_index",
      numericValue: 6.8,
      unit: "Scale 1-10",
      source: "Community Observation Trend",
    },
    {
      siteId: siteRiverside.id,
      metricType: "riparian_coverage_pct",
      numericValue: 42.0,
      unit: "%",
      source: "Satellite Buffer Analysis",
    },
    {
      siteId: siteGreenway.id,
      metricType: "visual_stress_index",
      numericValue: 8.2,
      unit: "Scale 1-10",
      source: "Community Observation Trend",
    },
    {
      siteId: siteGreenway.id,
      metricType: "riparian_coverage_pct",
      numericValue: 28.5,
      unit: "%",
      source: "Satellite Buffer Analysis",
    },
    {
      siteId: siteCentral.id,
      metricType: "visual_stress_index",
      numericValue: 2.1,
      unit: "Scale 1-10",
      source: "Community Observation Trend",
    },
    {
      siteId: siteCentral.id,
      metricType: "riparian_coverage_pct",
      numericValue: 88.0,
      unit: "%",
      source: "Satellite Buffer Analysis",
    },
  ];
  for (const m of metricsData) {
    await prisma.environmentalMetric.create({ data: m });
  }

  // 4. Create Observation 1 (Riverside North - Needs Review)
  const loc1 = await prisma.location.create({
    data: {
      latitude: 42.3605,
      longitude: -71.0592,
      address: "Riverside Park Footbridge, Gate 3",
      city: "Boston",
      siteId: siteRiverside.id,
    },
  });

  const obs1 = await prisma.observation.create({
    data: {
      userId: citizen.id,
      siteId: siteRiverside.id,
      locationId: loc1.id,
      title: "Unusual Milky Discoloration & White Foam",
      status: ObservationStatus.IN_REVIEW,
      priority: Priority.HIGH,
      waterAppearance: "Unusual Discoloration",
      vegetationCondition: "Severely Reduced",
      wildlifeObserved: "No Visible Life",
      pollutionIndicators: "Foam / Discoloration Outfall",
      odorReported: "Musty / Chemical",
      notes:
        "Noticed dense white foam accumulating near the northern culvert bank after light rain. Water appears opaque grayish-white.",
      observedAt: new Date(Date.now() - 3600000 * 4), // 4 hours ago
    },
  });

  await prisma.observationImage.createMany({
    data: [
      {
        observationId: obs1.id,
        url: "https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?auto=format&fit=crop&w=1200&q=80",
        caption:
          "Milky water discoloration observed below north culvert outfall.",
      },
      {
        observationId: obs1.id,
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        caption: "Accumulated foam edge along riparian rocks.",
      },
    ],
  });

  await prisma.observationIndicator.createMany({
    data: [
      {
        observationId: obs1.id,
        indicatorType: "water_appearance",
        value: "Grayish-White Discoloration",
        confidence: 0.88,
        evidence: "Opaque visual opacity in image #1",
      },
      {
        observationId: obs1.id,
        indicatorType: "vegetation",
        value: "Degraded Riparian Edge",
        confidence: 0.76,
        evidence: "Yellowing bank foliage along outfall",
      },
      {
        observationId: obs1.id,
        indicatorType: "odor",
        value: "Chemical/Musty Odor",
        confidence: 0.8,
        evidence: "Citizen field report statement",
      },
    ],
  });

  const aiAnalysis1 = await prisma.aIAnalysis.create({
    data: {
      observationId: obs1.id,
      provider: "OpenAI-GPT4-Vision",
      modelVersion: "v1.4-structured-onehealth",
      overallStatus: "ATTENTION_RECOMMENDED",
      overallConfidence: 0.84,
      reasoningSummary:
        "Visual analysis confirms visible surface discoloration and persistent localized foam structure. Reported absence of aquatic life aligns with localized physical ecosystem stress.",
      uncertaintyNotes:
        "Visual observation cannot confirm toxic chemical presence or micro-biological pathogens without laboratory water sample testing.",
      recommendedReview: true,
      rawJson: JSON.stringify({
        observations: [
          {
            indicator: "water_appearance",
            value: "Grayish-White Discoloration",
            confidence: 0.88,
            evidence: "Visible plume in water column",
          },
          {
            indicator: "foam_presence",
            value: "Moderate Persistent Foam",
            confidence: 0.82,
            evidence: "Foam raft at embankment",
          },
        ],
        potential_signals: [
          { type: "ecosystem_stress", confidence: 0.84 },
          { type: "outfall_runoff_anomaly", confidence: 0.79 },
        ],
        uncertainties: [
          "Image resolution prevents turbidity quantification.",
          "Chemical constituents unknown without lab assays.",
        ],
        recommended_review: true,
      }),
    },
  });

  await prisma.aISignal.createMany({
    data: [
      {
        aiAnalysisId: aiAnalysis1.id,
        signalType: "ecosystem_stress",
        confidence: 0.84,
        evidence: "High visual contrast against natural baseline stream color.",
        indicatorRef: "water_appearance",
      },
      {
        aiAnalysisId: aiAnalysis1.id,
        signalType: "outfall_runoff_anomaly",
        confidence: 0.79,
        evidence:
          "Concentrated foam formation downstream of urban discharge pipe.",
        indicatorRef: "pollution",
      },
    ],
  });

  // 5. Create Observation 2 (Greenway Canal - Verified High Concern)
  const loc2 = await prisma.location.create({
    data: {
      latitude: 42.3658,
      longitude: -71.0645,
      address: "Greenway Footpath Pier 12",
      city: "Boston",
      siteId: siteGreenway.id,
    },
  });

  const obs2 = await prisma.observation.create({
    data: {
      userId: citizen.id,
      siteId: siteGreenway.id,
      locationId: loc2.id,
      title: "Heavy Algae Mat & Foul Sulfuric Odor",
      status: ObservationStatus.VERIFIED,
      priority: Priority.HIGH,
      waterAppearance: "Excessive Algae",
      vegetationCondition: "Excessive Algae",
      wildlifeObserved: "Dead Macroinvertebrates",
      pollutionIndicators: "Odor / Algal Bloom",
      odorReported: "Sulfur / Rotten Egg",
      notes:
        "Dense bright green algal mat covering 80% of canal surface. Strong rotten egg smell in ambient air.",
      observedAt: new Date(Date.now() - 3600000 * 26), // Yesterday
    },
  });

  await prisma.observationImage.create({
    data: {
      observationId: obs2.id,
      url: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=1200&q=80",
      caption: "Algal bloom covering calm canal surface.",
    },
  });

  const aiAnalysis2 = await prisma.aIAnalysis.create({
    data: {
      observationId: obs2.id,
      provider: "HYDREON-Multimodal-Engine",
      modelVersion: "v1.4-structured-onehealth",
      overallStatus: "HIGH_PRIORITY_SIGNAL",
      overallConfidence: 0.91,
      reasoningSummary:
        "Surface coverage pattern is consistent with eutrophication-driven algal bloom. Reported sulfur odor suggests anaerobic decomposition at sediment interface.",
      uncertaintyNotes:
        "Specific cyanobacteria species classification requires microscopic verification.",
      recommendedReview: true,
      rawJson: JSON.stringify({ status: "HIGH_PRIORITY" }),
    },
  });

  await prisma.aISignal.create({
    data: {
      aiAnalysisId: aiAnalysis2.id,
      signalType: "biodiversity_risk",
      confidence: 0.91,
      evidence:
        "Extensive algal surface coverage restricting dissolved oxygen diffusion.",
    },
  });

  await prisma.review.create({
    data: {
      observationId: obs2.id,
      reviewerId: reviewer.id,
      action: ReviewAction.CONFIRM,
      previousStatus: ObservationStatus.IN_REVIEW,
      newStatus: ObservationStatus.VERIFIED,
      reviewerNotes:
        "Confirmed observation based on site history. Dispatched municipal water quality sampling team for dissolved oxygen test.",
    },
  });

  // 6. Create Observation 3 (Central Watershed - Verified Normal)
  const loc3 = await prisma.location.create({
    data: {
      latitude: 42.3525,
      longitude: -71.0718,
      address: "Parkland Riffle Bench Site 4",
      city: "Boston",
      siteId: siteCentral.id,
    },
  });

  const obs3 = await prisma.observation.create({
    data: {
      userId: citizen.id,
      siteId: siteCentral.id,
      locationId: loc3.id,
      title: "Clear Stream Flow & Active Aquatic Life",
      status: ObservationStatus.VERIFIED,
      priority: Priority.LOW,
      waterAppearance: "Normal Clear",
      vegetationCondition: "Abundant Riparian",
      wildlifeObserved: "Fish & Mayfly Nymphs Present",
      pollutionIndicators: "None",
      odorReported: "Fresh Natural",
      notes:
        "Water is crystal clear. Saw small minnows and caddisfly larvae under gravel rocks. Healthy bank vegetation.",
      observedAt: new Date(Date.now() - 3600000 * 48),
    },
  });

  await prisma.observationImage.create({
    data: {
      observationId: obs3.id,
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      caption: "Clear stream channel with rocky gravel substrate.",
    },
  });

  const aiAnalysis3 = await prisma.aIAnalysis.create({
    data: {
      observationId: obs3.id,
      provider: "HYDREON-Multimodal-Engine",
      modelVersion: "v1.4-structured-onehealth",
      overallStatus: "NO_CONCERN",
      overallConfidence: 0.95,
      reasoningSummary:
        "High clarity visual substrate and active bioindicator invertebrates indicate well-oxygenated freshwater stream condition.",
      uncertaintyNotes: "None noted.",
      recommendedReview: false,
      rawJson: JSON.stringify({ status: "NORMAL" }),
    },
  });

  await prisma.review.create({
    data: {
      observationId: obs3.id,
      reviewerId: reviewer.id,
      action: ReviewAction.CONFIRM,
      previousStatus: ObservationStatus.SUBMITTED,
      newStatus: ObservationStatus.VERIFIED,
      reviewerNotes:
        "Verified clean stream baseline report. Excellent community bio-indicator tracking.",
    },
  });

  // 7. Audit Logs
  await prisma.auditLog.createMany({
    data: [
      {
        userId: citizen.id,
        action: "OBSERVATION_SUBMITTED",
        entityType: "Observation",
        entityId: obs1.id,
        details: JSON.stringify({ title: obs1.title }),
      },
      {
        userId: null,
        action: "AI_ASSESSMENT_GENERATED",
        entityType: "AIAnalysis",
        entityId: aiAnalysis1.id,
        details: JSON.stringify({ confidence: 0.84 }),
      },
      {
        userId: reviewer.id,
        action: "REVIEW_CONFIRMED",
        entityType: "Review",
        entityId: obs2.id,
        details: JSON.stringify({ status: "VERIFIED" }),
      },
    ],
  });

  console.log("✅ HYDREON database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Database seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
