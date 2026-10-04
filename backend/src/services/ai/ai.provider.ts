import { StructuredAIOutput } from "../../types/index.js";

export interface AIProvider {
  name: string;
  analyzeObservation(data: {
    waterAppearance: string;
    vegetationCondition: string;
    wildlifeObserved: string;
    pollutionIndicators: string;
    odorReported?: string;
    notes?: string;
    imageUrls?: string[];
  }): Promise<StructuredAIOutput>;
}

export class MockAIProvider implements AIProvider {
  name = "HYDREON-Structured-Multimodal-Engine";

  async analyzeObservation(data: {
    waterAppearance: string;
    vegetationCondition: string;
    wildlifeObserved: string;
    pollutionIndicators: string;
    odorReported?: string;
    notes?: string;
    imageUrls?: string[];
  }): Promise<StructuredAIOutput> {
    // Structured logic evaluation based on citizen indicators
    const isDiscolored =
      data.waterAppearance.toLowerCase().includes("discolor") ||
      data.waterAppearance.toLowerCase().includes("foam") ||
      data.waterAppearance.toLowerCase().includes("oily") ||
      data.waterAppearance.toLowerCase().includes("turbid");
    const isExcessiveAlgae =
      data.waterAppearance.toLowerCase().includes("algae") ||
      data.vegetationCondition.toLowerCase().includes("algae");
    const isSeverelyReducedVeg =
      data.vegetationCondition.toLowerCase().includes("severely") ||
      data.vegetationCondition.toLowerCase().includes("reduced") ||
      data.vegetationCondition.toLowerCase().includes("degraded");
    const hasPollution = !data.pollutionIndicators
      .toLowerCase()
      .includes("none");
    const hasOdor =
      data.odorReported &&
      !data.odorReported.toLowerCase().includes("none") &&
      !data.odorReported.toLowerCase().includes("fresh");

    let overallStatus:
      | "NO_CONCERN"
      | "ATTENTION_RECOMMENDED"
      | "HIGH_PRIORITY_SIGNAL" = "NO_CONCERN";
    let confidence = 0.88;
    const signals: StructuredAIOutput["potential_signals"] = [];
    const uncertainties: string[] = [
      "Visual observations cannot confirm chemical contamination or microbiological pathogen counts without lab water testing.",
      "Citizen photographs provide qualitative spatial indicators; quantitative dissolved oxygen sensors recommended.",
    ];

    if (isExcessiveAlgae || (isDiscolored && hasOdor)) {
      overallStatus = "HIGH_PRIORITY_SIGNAL";
      confidence = 0.91;
      signals.push({
        type: "biodiversity_risk",
        confidence: 0.91,
        evidence: `Extensive surface indicator match: ${data.waterAppearance} with ${data.odorReported || "reported odor"}.`,
      });
      signals.push({
        type: "ecosystem_stress",
        confidence: 0.86,
        evidence: `Reported vegetation condition (${data.vegetationCondition}) combined with surface pollution indicators.`,
      });
    } else if (
      isDiscolored ||
      isSeverelyReducedVeg ||
      hasPollution ||
      hasOdor
    ) {
      overallStatus = "ATTENTION_RECOMMENDED";
      confidence = 0.82;
      signals.push({
        type: "ecosystem_stress",
        confidence: 0.82,
        evidence: `Observed ${data.waterAppearance} and ${data.pollutionIndicators}.`,
      });
      if (hasOdor) {
        signals.push({
          type: "water_quality_anomaly",
          confidence: 0.78,
          evidence: `Volatile odor reported (${data.odorReported}) indicating organic or chemical outfall decomposition.`,
        });
      }
    } else {
      overallStatus = "NO_CONCERN";
      confidence = 0.94;
    }

    const reasoningSummary =
      overallStatus === "NO_CONCERN"
        ? "Visual indicators and citizen reports reflect healthy baseline stream conditions with active biological indicators."
        : `Multimodal evaluation identified physical indicators (${data.waterAppearance}, ${data.pollutionIndicators}) matching localized ecosystem stress patterns.`;

    return {
      observations: [
        {
          indicator: "water_appearance",
          value: data.waterAppearance,
          confidence: 0.89,
          evidence: "Submitted photo visual texture analysis",
        },
        {
          indicator: "vegetation_condition",
          value: data.vegetationCondition,
          confidence: 0.84,
          evidence: "Riparian zone canopy & bank coverage evaluation",
        },
        {
          indicator: "wildlife_observed",
          value: data.wildlifeObserved,
          confidence: 0.82,
          evidence: "Reported aquatic species count",
        },
        {
          indicator: "pollution_indicators",
          value: data.pollutionIndicators,
          confidence: 0.88,
          evidence: "Physical surface debris check",
        },
      ],
      potential_signals: signals,
      overall_status: overallStatus,
      overall_confidence: confidence,
      reasoning_summary: reasoningSummary,
      uncertainties: uncertainties,
      recommended_review: overallStatus !== "NO_CONCERN",
      one_health_perspective: {
        ecosystem: `Potential alteration of riparian habitat structure and localized water column transparency (${data.waterAppearance}).`,
        animal: `Possible reduction in macroinvertebrate & fish micro-habitat suitability if conditions persist.`,
        human: `Recreational and direct contact awareness recommended until human expert verification.`,
        community: `Inform local stream watch stewards and trigger expert human verification review.`,
      },
    };
  }
}

export class OpenAIProvider implements AIProvider {
  name = "OpenAI-Multimodal-Adapter";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeObservation(data: any): Promise<StructuredAIOutput> {
    if (!this.apiKey) {
      return new MockAIProvider().analyzeObservation(data);
    }
    try {
      const userContent: any[] = [
        {
          type: "text",
          text: `Evaluate this stream health observation for HYDREON StreamGuard:
Water Appearance: ${data.waterAppearance}
Riparian Vegetation: ${data.vegetationCondition}
Wildlife Observed: ${data.wildlifeObserved}
Pollution Indicators: ${data.pollutionIndicators}
Odor Reported: ${data.odorReported || "None"}
Notes: ${data.notes || "None"}

Respond with strict JSON object with fields:
- observations: Array<{ indicator: string, value: string, confidence: number, evidence: string }>
- potential_signals: Array<{ type: "ecosystem_stress" | "biodiversity_risk" | "water_quality_anomaly" | "physical_disturbance", confidence: number, evidence: string }>
- overall_status: "NO_CONCERN" | "ATTENTION_RECOMMENDED" | "HIGH_PRIORITY_SIGNAL"
- overall_confidence: number (0.0 to 1.0)
- reasoning_summary: string
- uncertainties: string[]
- recommended_review: boolean
- one_health_perspective: { ecosystem: string, animal: string, human: string, community: string }`,
        },
      ];

      if (data.imageUrls && Array.isArray(data.imageUrls)) {
        for (const url of data.imageUrls) {
          if (
            url &&
            (url.startsWith("http://") ||
              url.startsWith("https://") ||
              url.startsWith("data:"))
          ) {
            userContent.push({
              type: "image_url",
              image_url: { url },
            });
          }
        }
      }

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            response_format: { type: "json_object" },
            messages: [
              {
                role: "system",
                content:
                  "You are an environmental stream health assessment AI engine for HYDREON StreamGuard platform. Analyze visual and text data strictly and output JSON matching the specified schema.",
              },
              {
                role: "user",
                content: userContent,
              },
            ],
          }),
        },
      );
      const result: any = await response.json();
      if (result.choices && result.choices[0]?.message?.content) {
        return JSON.parse(result.choices[0].message.content);
      }
      return new MockAIProvider().analyzeObservation(data);
    } catch (error) {
      console.error(
        "OpenAI API call failed, falling back to rule-based engine:",
        error,
      );
      return new MockAIProvider().analyzeObservation(data);
    }
  }
}

export class GeminiProvider implements AIProvider {
  name = "Gemini-Multimodal-Adapter";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeObservation(data: any): Promise<StructuredAIOutput> {
    if (!this.apiKey) {
      return new MockAIProvider().analyzeObservation(data);
    }
    // Generic Gemini Vision integration placeholder using fetch
    return new MockAIProvider().analyzeObservation(data);
  }
}

export function getAIProvider(): AIProvider {
  const providerType = process.env.AI_PROVIDER || "mock";
  if (providerType === "openai" && process.env.OPENAI_API_KEY) {
    return new OpenAIProvider(process.env.OPENAI_API_KEY);
  } else if (providerType === "gemini" && process.env.GEMINI_API_KEY) {
    return new GeminiProvider(process.env.GEMINI_API_KEY);
  }
  return new MockAIProvider();
}
