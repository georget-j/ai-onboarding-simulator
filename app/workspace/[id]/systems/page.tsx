"use client";

import { useWorkspace } from "@/components/WorkspaceProvider";
import { SystemsDataSourceEditor } from "@/components/SystemsDataSourceEditor";

export default function SystemsPage() {
  const { project, loading, updateProject } = useWorkspace();

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!project) return <div className="p-8 text-sm text-muted-foreground">Project not found.</div>;

  const blockedCount = project.dataSources.filter((d) => d.accessStatus === "blocked").length;
  const noApiCount = project.systems.filter((s) => s.apiAvailable === false).length;

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-bold">Systems & Data</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Map the customer's existing systems and data sources. Changes are saved automatically.
        </p>
      </div>

      {(blockedCount > 0 || noApiCount > 0) && (
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 px-4 py-3 text-sm text-amber-800 space-y-1">
          {noApiCount > 0 && <p>⚠ {noApiCount} system{noApiCount > 1 ? "s" : ""} without an available API — integration will require custom work.</p>}
          {blockedCount > 0 && <p>✕ {blockedCount} data source{blockedCount > 1 ? "s" : ""} with blocked access — unblock before pilot launch.</p>}
        </div>
      )}

      <SystemsDataSourceEditor
        systems={project.systems}
        dataSources={project.dataSources}
        onSystemsChange={(systems) => updateProject({ systems })}
        onDataSourcesChange={(dataSources) => updateProject({ dataSources })}
      />
    </div>
  );
}
