"use client";

import { useWorkspace } from "@/components/WorkspaceProvider";

export default function WorkflowPage() {
  const { project, loading } = useWorkspace();

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!project) return <div className="p-8 text-sm text-muted-foreground">Project not found.</div>;

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-bold">Workflow Mapping</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Map the current and future-state workflow steps for this deployment.
        </p>
      </div>
      <p className="text-sm text-muted-foreground">Coming in Phase 5…</p>
    </div>
  );
}
