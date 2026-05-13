"use client";

import { useMemo } from "react";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { RiskRegister } from "@/components/RiskRegister";
import { generateRisks } from "@/lib/risk-engine";
import type { RiskStatus } from "@/lib/types";

export default function RisksPage() {
  const { project, loading, updateProject } = useWorkspace();

  const generatedRisks = useMemo(
    () => (project ? generateRisks(project) : []),
    [project]
  );

  // Merge generated risks with any pre-seeded risks from the scenario,
  // deduplicating by title so we don't double-count
  const allRisks = useMemo(() => {
    if (!project) return [];
    const seededTitles = new Set(project.risks.map((r) => r.title));
    const newRisks = generatedRisks.filter((r) => !seededTitles.has(r.title));
    return [...project.risks, ...newRisks];
  }, [project, generatedRisks]);

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!project) return <div className="p-8 text-sm text-muted-foreground">Project not found.</div>;

  const handleStatusChange = (id: string, status: RiskStatus) => {
    const updatedRisks = allRisks.map((r) => (r.id === id ? { ...r, status } : r));
    // Only persist changes to the seeded (project-owned) risks; generated risks are stateless
    const seededIds = new Set(project.risks.map((r) => r.id));
    if (seededIds.has(id)) {
      updateProject({ risks: updatedRisks.filter((r) => seededIds.has(r.id)) });
    }
  };

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-bold">Risk Register</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Deployment risks identified from project context. Includes pre-seeded scenario risks and auto-generated risks.
        </p>
      </div>

      <RiskRegister risks={allRisks} onStatusChange={handleStatusChange} />
    </div>
  );
}
