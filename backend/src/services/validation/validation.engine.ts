import { StructuredAIOutput } from "../../types/index.js";

export class ValidationEngine {
  /**
   * Validates structured AI output against application rules.
   * Ensures the AI never makes authoritative medical claims or unverified toxic contamination statements.
   */
  static processAssessment(aiOutput: StructuredAIOutput, observationData: any) {
    // 1. Enforce disclaimers and scientific limitations
    const mandatoryLimitation =
      "Visual observations cannot confirm chemical contamination, pathogen levels, or drinkability. Field laboratory sampling is required for definitive health safety verification.";

    if (!aiOutput.uncertainties.includes(mandatoryLimitation)) {
      aiOutput.uncertainties.unshift(mandatoryLimitation);
    }

    // 2. Risk Score & Priority calculation
    let calculatedPriority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" = "MEDIUM";
    if (aiOutput.overall_status === "HIGH_PRIORITY_SIGNAL") {
      calculatedPriority = "HIGH";
    } else if (aiOutput.overall_status === "NO_CONCERN") {
      calculatedPriority = "LOW";
    }

    // Check if human review is mandatory
    const isHumanReviewRequired = aiOutput.overall_status !== "NO_CONCERN";

    return {
      aiOutput,
      calculatedPriority,
      isHumanReviewRequired,
      processedAt: new Date(),
    };
  }
}
