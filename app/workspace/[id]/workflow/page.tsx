"use client";

import { useWorkspace } from "@/components/WorkspaceProvider";
import { WorkflowStepEditor } from "@/components/WorkflowStepEditor";

export default function WorkflowPage() {
  const { project, loading, updateProject } = useWorkspace();

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!project) return <div className="p-8 text-sm text-muted-foreground">Project not found.</div>;

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-bold">Workflow Mapping</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Map the current-state workflow steps and define the future-state AI integration. Changes are saved automatically.
        </p>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>{project.workflows.length} step{project.workflows.length !== 1 ? "s" : ""}</span>
        <span>·</span>
        <span>{project.workflows.filter((w) => w.automationPotential === "high").length} high-automation potential</span>
        <span>·</span>
        <span>{project.workflows.filter((w) => w.futureState === "automated").length} fully automated in future state</span>
      </div>

      <WorkflowStepEditor
        steps={project.workflows}
        onChange={(workflows) => updateProject({ workflows })}
      />
    </div>
  );
}
