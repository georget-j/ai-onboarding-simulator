import { describe, it, expect } from "vitest";
import { assembleOnboardingPack } from "../lib/markdown-export";
import fintechScenario from "../data/scenarios/fintech-aml-onboarding.json";
import type { OnboardingProject, GeneratedArtifacts } from "../lib/types";

const fintech = fintechScenario as unknown as OnboardingProject;

const mockOutputs: GeneratedArtifacts = {
  customerDiscoverySummary: "Discovery summary content.",
  currentStateWorkflow: "Current state content.",
  futureStateWorkflow: "Future state content.",
  requirementsMatrix: "Requirements content.",
  missingInformationLog: "Missing info content.",
  integrationAndApiPlan: "Integration plan content.",
  dataReadinessAssessment: "Data readiness content.",
  implementationPlan: "Implementation plan content.",
  riskRegisterSummary: "Risk register content.",
  pilotSuccessPlan: "Pilot plan content.",
  stakeholderCommunicationPlan: "Stakeholder comms content.",
  engineeringHandoff: "Engineering handoff content.",
  productFeedbackMemo: "Product feedback content.",
  executiveSummary: "Executive summary content.",
  nextActionsChecklist: "Next actions content.",
};

const projectWithOutputs: OnboardingProject = {
  ...fintech,
  outputs: mockOutputs,
};

describe("assembleOnboardingPack", () => {
  it("returns a non-empty string", () => {
    const result = assembleOnboardingPack(projectWithOutputs);
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });

  it("includes the customer name in the title", () => {
    const result = assembleOnboardingPack(projectWithOutputs);
    expect(result).toContain("Meridian Bank");
  });

  it("includes all 15 required sections", () => {
    const result = assembleOnboardingPack(projectWithOutputs);
    const sections = [
      "Executive Summary",
      "Customer Discovery Summary",
      "Current State Workflow",
      "Future State Workflow",
      "Requirements Matrix",
      "Missing Information Log",
      "Integration and API Plan",
      "Data Readiness Assessment",
      "Implementation Plan",
      "Risk Register Summary",
      "Pilot Success Plan",
      "Stakeholder Communication Plan",
      "Engineering Handoff",
      "Product Feedback Memo",
      "Next Actions Checklist",
    ];
    for (const section of sections) {
      expect(result).toContain(section);
    }
  });

  it("includes section numbers 1–15", () => {
    const result = assembleOnboardingPack(projectWithOutputs);
    for (let i = 1; i <= 15; i++) {
      expect(result).toContain(`## ${i}.`);
    }
  });

  it("includes mock artifact content", () => {
    const result = assembleOnboardingPack(projectWithOutputs);
    expect(result).toContain("Discovery summary content.");
    expect(result).toContain("Executive summary content.");
    expect(result).toContain("Next actions content.");
  });

  it("shows placeholder for missing artifacts", () => {
    const noOutputs: OnboardingProject = { ...fintech, outputs: null };
    const result = assembleOnboardingPack(noOutputs);
    expect(result).toContain("_Not yet generated._");
  });

  it("includes the customer industry and company size", () => {
    const result = assembleOnboardingPack(projectWithOutputs);
    expect(result).toContain("fintech");
    expect(result).toContain("enterprise");
  });

  it("is valid markdown with a top-level heading", () => {
    const result = assembleOnboardingPack(projectWithOutputs);
    expect(result).toMatch(/^# AI Onboarding Pack/);
  });
});
