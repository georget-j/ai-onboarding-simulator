"use client";

import { useWorkspace } from "@/components/WorkspaceProvider";

export default function SystemsPage() {
  const { project, loading } = useWorkspace();

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!project) return <div className="p-8 text-sm text-muted-foreground">Project not found.</div>;

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-bold">Systems & Data</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Map the customer's existing systems and data sources.
        </p>
      </div>
      <p className="text-sm text-muted-foreground">Coming in Phase 5…</p>
    </div>
  );
}
