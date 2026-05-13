import { describe, it, expect } from "vitest";
import { listScenarios, loadScenario } from "../lib/scenarios";

describe("scenario loader", () => {
  it("listScenarios returns 4 scenarios", () => {
    const scenarios = listScenarios();
    expect(scenarios).toHaveLength(4);
  });

  it("all scenarios have required root fields", () => {
    const scenarios = listScenarios();
    for (const s of scenarios) {
      expect(s.id).toBeTruthy();
      expect(s.name).toBeTruthy();
      expect(s.customer).toBeDefined();
      expect(s.discovery).toBeDefined();
      expect(Array.isArray(s.workflows)).toBe(true);
      expect(Array.isArray(s.systems)).toBe(true);
      expect(Array.isArray(s.dataSources)).toBe(true);
      expect(Array.isArray(s.risks)).toBe(true);
      expect(Array.isArray(s.stakeholders)).toBe(true);
    }
  });

  it("fintech-aml scenario has expected customer", () => {
    const s = loadScenario("fintech-aml");
    expect(s).not.toBeNull();
    expect(s?.customer.companyName).toBe("Meridian Bank");
    expect(s?.customer.industry).toBe("fintech");
  });

  it("legaltech scenario has expected customer", () => {
    const s = loadScenario("legaltech-contract");
    expect(s).not.toBeNull();
    expect(s?.customer.industry).toBe("legaltech");
  });

  it("hardware-ops scenario has expected customer", () => {
    const s = loadScenario("hardware-ops");
    expect(s).not.toBeNull();
    expect(s?.customer.industry).toBe("industrial");
  });

  it("enterprise-support scenario has expected customer", () => {
    const s = loadScenario("enterprise-support");
    expect(s).not.toBeNull();
    expect(s?.customer.industry).toBe("insurance");
  });

  it("loadScenario returns null for unknown ID", () => {
    const s = loadScenario("does-not-exist");
    expect(s).toBeNull();
  });

  it("fintech scenario has at least 5 pre-seeded risks", () => {
    const s = loadScenario("fintech-aml");
    expect(s?.risks.length).toBeGreaterThanOrEqual(5);
  });

  it("all scenarios have at least one workflow", () => {
    const scenarios = listScenarios();
    for (const s of scenarios) {
      expect(s.workflows.length).toBeGreaterThan(0);
    }
  });

  it("all scenarios have at least one system", () => {
    const scenarios = listScenarios();
    for (const s of scenarios) {
      expect(s.systems.length).toBeGreaterThan(0);
    }
  });

  it("all scenarios have regulatory context if fintech or legaltech", () => {
    const scenarios = listScenarios().filter((s) => ["fintech", "legaltech"].includes(s.customer.industry));
    for (const s of scenarios) {
      expect(s.customer.regulatoryContext.length).toBeGreaterThan(0);
    }
  });
});
