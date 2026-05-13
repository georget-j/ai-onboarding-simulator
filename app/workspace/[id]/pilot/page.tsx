"use client";

import { useWorkspace } from "@/components/WorkspaceProvider";
import { PilotPlanBuilder } from "@/components/PilotPlanBuilder";
import type { PilotPlan } from "@/lib/types";

export default function PilotPage() {
  const { project, loading, updateProject } = useWorkspace();

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!project) return <div className="p-8 text-sm text-muted-foreground">Project not found.</div>;

  const workflowNames = project.workflows.map((w) => w.name).filter(Boolean);

  const metricsCount = project.pilotPlan?.successMetrics.length ?? 0;
  const criteriaCount = (project.pilotPlan?.launchCriteria.length ?? 0) + (project.pilotPlan?.rollbackCriteria.length ?? 0);

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-bold">Pilot Plan</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Define pilot scope, success metrics, launch and rollback criteria. Changes are saved automatically.
        </p>
      </div>

      {project.pilotPlan && (
        <div className="flex gap-6 text-xs text-muted-foreground">
          <span>{metricsCount} success metric{metricsCount !== 1 ? "s" : ""}</span>
          <span>·</span>
          <span>{criteriaCount} launch/rollback criteria</span>
          <span>·</span>
          <span>{project.pilotPlan.durationWeeks} week pilot</span>
        </div>
      )}

      <PilotPlanBuilder
        plan={project.pilotPlan}
        workflowNames={workflowNames}
        onChange={(pilotPlan: PilotPlan) => updateProject({ pilotPlan })}
      />
    </div>
  );
}
