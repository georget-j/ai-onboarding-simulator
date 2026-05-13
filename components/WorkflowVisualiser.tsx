"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { WorkflowStep, FutureState, AutomationPotential } from "@/lib/types";

type Props = {
  steps: WorkflowStep[];
};

const FUTURE_STATE_CONFIG: Record<FutureState, { label: string; color: string; dot: string }> = {
  human_led:        { label: "Human-Led",        color: "border-l-muted-foreground/40 bg-muted/20",          dot: "bg-muted-foreground/50" },
  ai_assisted:      { label: "AI-Assisted",      color: "border-l-blue-400 bg-blue-50/50",                   dot: "bg-blue-500" },
  automated:        { label: "Automated",         color: "border-l-green-500 bg-green-50/50",                 dot: "bg-green-500" },
  requires_approval:{ label: "Requires Approval", color: "border-l-amber-400 bg-amber-50/50",                dot: "bg-amber-500" },
};

const AUTO_BAR: Record<AutomationPotential, { width: string; color: string }> = {
  low:    { width: "w-1/3", color: "bg-muted-foreground/40" },
  medium: { width: "w-2/3", color: "bg-yellow-400" },
  high:   { width: "w-full", color: "bg-green-500" },
};

export function WorkflowVisualiser({ steps }: Props) {
  if (steps.length === 0) {
    return (
      <div className="rounded-lg border border-dashed px-6 py-10 text-center text-sm text-muted-foreground">
        Add workflow steps above to see the visual flow.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        {(Object.entries(FUTURE_STATE_CONFIG) as [FutureState, typeof FUTURE_STATE_CONFIG[FutureState]][]).map(([, cfg]) => (
          <span key={cfg.label} className="flex items-center gap-1.5">
            <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", cfg.dot)} />
            {cfg.label}
          </span>
        ))}
      </div>

      {/* Steps */}
      <div className="space-y-0">
        {steps.map((step, i) => {
          const cfg = FUTURE_STATE_CONFIG[step.futureState];
          const auto = AUTO_BAR[step.automationPotential];
          return (
            <div key={step.id} className="flex gap-0">
              {/* Connector column */}
              <div className="flex flex-col items-center w-8 shrink-0">
                <div className={cn("w-3 h-3 rounded-full border-2 border-background shrink-0 mt-4", cfg.dot)} />
                {i < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border mt-0.5" />
                )}
              </div>

              {/* Card */}
              <div className={cn(
                "flex-1 mb-2 rounded-lg border border-l-4 px-4 py-3 space-y-2 min-w-0",
                cfg.color
              )}>
                <div className="flex items-start gap-2 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-snug truncate">{step.name || <span className="text-muted-foreground italic">Unnamed step</span>}</p>
                    {step.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{step.description}</p>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0 whitespace-nowrap">
                    {cfg.label}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  {step.ownerTeam && <span>Owner: <span className="text-foreground">{step.ownerTeam}</span></span>}
                  {step.currentSystem && <span>System: <span className="text-foreground">{step.currentSystem}</span></span>}
                  <span className="capitalize">Frequency: <span className="text-foreground">{step.frequency.replace("_", " ")}</span></span>
                </div>

                {/* Automation potential bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Automation potential</span>
                    <span className="capitalize font-medium">{step.automationPotential}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all", auto.width, auto.color)} />
                  </div>
                </div>

                {step.painPoints.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {step.painPoints.slice(0, 3).map((p, pi) => (
                      <span key={pi} className="text-xs bg-muted/60 text-muted-foreground px-1.5 py-0.5 rounded">
                        {p}
                      </span>
                    ))}
                    {step.painPoints.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{step.painPoints.length - 3} more</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
