import type { OnboardingProject, ScenarioType } from "@/lib/types";

import fintechAml from "@/data/scenarios/fintech-aml-onboarding.json";
import legaltechContract from "@/data/scenarios/legaltech-contract-review.json";
import hardwareOps from "@/data/scenarios/hardware-ops-monitoring.json";
import enterpriseSupport from "@/data/scenarios/enterprise-support-agent.json";

const SCENARIOS = [fintechAml, legaltechContract, hardwareOps, enterpriseSupport] as unknown as OnboardingProject[];

export function listScenarios(): OnboardingProject[] {
  return SCENARIOS;
}

export function loadScenario(id: string): OnboardingProject | null {
  return SCENARIOS.find((s) => s.id === id) ?? null;
}

export const SCENARIO_META: Record<
  ScenarioType,
  { complexity: "Low" | "Medium" | "High"; color: string }
> = {
  fintech_aml: { complexity: "High", color: "bg-red-50 text-red-700 border-red-200" },
  legaltech_contract: { complexity: "High", color: "bg-purple-50 text-purple-700 border-purple-200" },
  hardware_ops: { complexity: "Medium", color: "bg-orange-50 text-orange-700 border-orange-200" },
  enterprise_support: { complexity: "Medium", color: "bg-blue-50 text-blue-700 border-blue-200" },
  custom: { complexity: "Low", color: "bg-gray-50 text-gray-700 border-gray-200" },
};
