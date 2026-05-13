"use client";

import Link from "next/link";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  { href: "discovery", label: "Customer Discovery", key: "discovery" },
  { href: "workflow", label: "Workflow Mapping", key: "workflow" },
  { href: "systems", label: "Systems & Data", key: "systems" },
  { href: "requirements", label: "Requirements", key: "requirements" },
  { href: "risks", label: "Risk Register", key: "risks" },
  { href: "pilot", label: "Pilot Plan", key: "pilot" },
  { href: "outputs", label: "Generate Outputs", key: "outputs" },
];

const SEVERITY_COLOR: Record<string, string> = {
  critical: "bg-red-100 text-red-800 border-red-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
};

function isStepComplete(project: ReturnType<typeof useWorkspace>["project"], key: string): boolean {
  if (!project) return false;
  switch (key) {
    case "discovery": return !!project.discovery.currentProcess;
    case "workflow": return project.workflows.length > 0;
    case "systems": return project.systems.length > 0;
    case "requirements": return project.requirements.length > 0;
    case "risks": return project.risks.length > 0;
    case "pilot": return !!project.pilotPlan?.objective;
    case "outputs": return !!project.outputs?.executiveSummary;
    default: return false;
  }
}

export default function WorkspaceDashboard() {
  const { project, loading } = useWorkspace();

  if (loading) {
    return (
      <div className="p-8 text-muted-foreground text-sm">Loading workspace…</div>
    );
  }

  if (!project) {
    return (
      <div className="p-8 space-y-3">
        <p className="text-muted-foreground">Scenario not found.</p>
        <Link href="/scenarios" className={buttonVariants({ variant: "outline", size: "sm" })}>
          Browse Scenarios
        </Link>
      </div>
    );
  }

  const completedCount = STEPS.filter((s) => isStepComplete(project, s.key)).length;
  const topRisks = [...project.risks]
    .sort((a, b) => {
      const order = { critical: 0, high: 1, medium: 2, low: 3 };
      return (order[a.severity] ?? 4) - (order[b.severity] ?? 4);
    })
    .slice(0, 3);

  const nextStep = STEPS.find((s) => !isStepComplete(project, s.key));

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs capitalize">{project.status}</Badge>
          <span className="text-xs text-muted-foreground">{project.customer.industry}</span>
        </div>
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <p className="text-muted-foreground text-sm">{project.customer.businessProblem}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Progress checklist */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Progress — {completedCount}/{STEPS.length} steps
          </h2>
          <div className="space-y-1.5">
            {STEPS.map((step) => {
              const done = isStepComplete(project, step.key);
              return (
                <Link
                  key={step.key}
                  href={`/workspace/${project.id}/${step.href}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/50 transition-colors group"
                >
                  <span
                    className={cn(
                      "w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center text-[10px]",
                      done
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted-foreground/40"
                    )}
                  >
                    {done ? "✓" : ""}
                  </span>
                  <span className={cn("text-sm", done ? "text-foreground" : "text-muted-foreground")}>
                    {step.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="space-y-5">
          {/* Top risks */}
          {topRisks.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Key Risks
              </h2>
              <div className="space-y-2">
                {topRisks.map((risk) => (
                  <div key={risk.id} className="flex items-start gap-2 text-sm">
                    <Badge
                      variant="outline"
                      className={cn("text-xs shrink-0 capitalize", SEVERITY_COLOR[risk.severity])}
                    >
                      {risk.severity}
                    </Badge>
                    <span className="text-muted-foreground">{risk.title}</span>
                  </div>
                ))}
              </div>
              <Link
                href={`/workspace/${project.id}/risks`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                View all {project.risks.length} risks →
              </Link>
            </div>
          )}

          {/* Next action */}
          {nextStep && (
            <div className="rounded-lg border bg-primary/5 border-primary/20 p-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Next recommended action
              </p>
              <p className="text-sm font-medium">{nextStep.label}</p>
              <Link
                href={`/workspace/${project.id}/${nextStep.href}`}
                className={buttonVariants({ size: "sm" })}
              >
                Continue →
              </Link>
            </div>
          )}

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Workflow Steps", value: project.workflows.length },
              { label: "Systems", value: project.systems.length },
              { label: "Data Sources", value: project.dataSources.length },
              { label: "Stakeholders", value: project.stakeholders.length },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-md border bg-muted/30 px-3 py-2">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-xl font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
