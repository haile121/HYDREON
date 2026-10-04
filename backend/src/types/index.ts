export interface StructuredAIOutput {
  observations: Array<{
    indicator: string;
    value: string;
    confidence: number;
    evidence: string;
  }>;
  potential_signals: Array<{
    type:
      | "ecosystem_stress"
      | "biodiversity_risk"
      | "water_quality_anomaly"
      | "physical_disturbance";
    confidence: number;
    evidence?: string;
  }>;
  overall_status:
    | "NO_CONCERN"
    | "ATTENTION_RECOMMENDED"
    | "HIGH_PRIORITY_SIGNAL";
  overall_confidence: number;
  reasoning_summary: string;
  uncertainties: string[];
  recommended_review: boolean;
  one_health_perspective?: {
    ecosystem: string;
    animal: string;
    human: string;
    community: string;
  };
}

export interface CreateObservationInput {
  userId?: string;
  siteId?: string;
  title?: string;
  latitude: number;
  longitude: number;
  address?: string;
  waterAppearance: string;
  vegetationCondition: string;
  wildlifeObserved: string;
  pollutionIndicators: string;
  odorReported?: string;
  notes?: string;
  imageUrls?: string[];
}

export interface SubmitReviewInput {
  observationId: string;
  reviewerId: string;
  action: "CONFIRM" | "MODIFY" | "REJECT" | "REQUEST_INFO";
  reviewerNotes: string;
  modifiedIndicators?: Record<string, string>;
}
