"use client";

import { useWorkspace } from "@/components/WorkspaceProvider";

export default function OutputsPage() {
  const { project, loading } = useWorkspace();

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!project) return <div className="p-8 text-sm text-muted-foreground">Project not found.</div>;

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-bold">Generate Outputs</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Generate and export the full AI onboarding pack — executive summary, engineering handoff, risk register, and more.
        </p>
      </div>
      <p className="text-sm text-muted-foreground">Coming in Phase 9…</p>
    </div>
  );
}
