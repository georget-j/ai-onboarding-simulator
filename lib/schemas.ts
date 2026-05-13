import { z } from "zod";

export const GeneratedArtifactsSchema = z.object({
  customerDiscoverySummary: z.string(),
  currentStateWorkflow: z.string(),
  futureStateWorkflow: z.string(),
  requirementsMatrix: z.string(),
  missingInformationLog: z.string(),
  integrationAndApiPlan: z.string(),
  dataReadinessAssessment: z.string(),
  implementationPlan: z.string(),
  riskRegisterSummary: z.string(),
  pilotSuccessPlan: z.string(),
  stakeholderCommunicationPlan: z.string(),
  engineeringHandoff: z.string(),
  productFeedbackMemo: z.string(),
  executiveSummary: z.string(),
  nextActionsChecklist: z.string(),
});

export type GeneratedArtifactsSchema = z.infer<typeof GeneratedArtifactsSchema>;
