"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { generateId } from "@/lib/utils";
import type { PilotPlan, SuccessMetric } from "@/lib/types";

type Props = {
  plan: PilotPlan | null;
  workflowNames: string[];
  onChange: (plan: PilotPlan) => void;
};

function blankPlan(workflowNames: string[]): PilotPlan {
  return {
    objective: "",
    scope: "",
    pilotUsers: [],
    includedWorkflows: workflowNames,
    excludedWorkflows: [],
    durationWeeks: 8,
    successMetrics: [],
    launchCriteria: [],
    rollbackCriteria: [],
    baselineMeasurement: "",
    targetOutcome: "",
  };
}

function blankMetric(): SuccessMetric {
  return {
    id: generateId(),
    name: "",
    baseline: "",
    target: "",
    measurementMethod: "",
    owner: "",
  };
}

function listToStr(arr: string[]): string {
  return arr.join("\n");
}
function strToList(s: string): string[] {
  return s.split("\n").map((l) => l.trim()).filter(Boolean);
}

type MetricRowProps = {
  metric: SuccessMetric;
  onUpdate: (patch: Partial<SuccessMetric>) => void;
  onRemove: () => void;
};

function MetricRow({ metric, onUpdate, onRemove }: MetricRowProps) {
  return (
    <div className="rounded-lg border bg-background px-4 py-3 space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Metric Name</Label>
          <Input value={metric.name} onChange={(e) => onUpdate({ name: e.target.value })} placeholder="e.g. SAR filing time" className="h-8 text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Owner</Label>
          <Input value={metric.owner} onChange={(e) => onUpdate({ owner: e.target.value })} placeholder="e.g. Compliance team" className="h-8 text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Baseline</Label>
          <Input value={metric.baseline} onChange={(e) => onUpdate({ baseline: e.target.value })} placeholder="e.g. 4 hours per filing" className="h-8 text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Target</Label>
          <Input value={metric.target} onChange={(e) => onUpdate({ target: e.target.value })} placeholder="e.g. <45 minutes" className="h-8 text-sm" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label className="text-xs">Measurement Method</Label>
          <Input value={metric.measurementMethod} onChange={(e) => onUpdate({ measurementMethod: e.target.value })} placeholder="e.g. Average ticket duration in Jira" className="h-8 text-sm" />
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-xs text-destructive/70 hover:text-destructive transition-colors"
      >
        Remove metric
      </button>
    </div>
  );
}

export function PilotPlanBuilder({ plan, workflowNames, onChange }: Props) {
  const p = plan ?? blankPlan(workflowNames);

  const set = (patch: Partial<PilotPlan>) => onChange({ ...p, ...patch });

  const updateMetric = (id: string, patch: Partial<SuccessMetric>) =>
    set({ successMetrics: p.successMetrics.map((m) => (m.id === id ? { ...m, ...patch } : m)) });
  const removeMetric = (id: string) =>
    set({ successMetrics: p.successMetrics.filter((m) => m.id !== id) });
  const addMetric = () =>
    set({ successMetrics: [...p.successMetrics, blankMetric()] });

  return (
    <div className="space-y-8">
      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Overview</h2>
        <div className="space-y-1.5">
          <Label>Pilot Objective</Label>
          <Textarea rows={2} value={p.objective} onChange={(e) => set({ objective: e.target.value })} placeholder="What is the primary goal of this pilot?" />
        </div>
        <div className="space-y-1.5">
          <Label>Scope</Label>
          <Textarea rows={2} value={p.scope} onChange={(e) => set({ scope: e.target.value })} placeholder="Which teams, regions, or use cases are in scope for the pilot?" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Duration (weeks)</Label>
            <Input
              type="number"
              min={1}
              max={52}
              value={p.durationWeeks}
              onChange={(e) => set({ durationWeeks: parseInt(e.target.value) || 4 })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Pilot Users <span className="text-muted-foreground text-xs">(one per line)</span></Label>
            <Textarea
              rows={3}
              value={listToStr(p.pilotUsers)}
              onChange={(e) => set({ pilotUsers: strToList(e.target.value) })}
              placeholder="Alice Chen — AML Analyst&#10;Bob Kumar — Compliance Lead"
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* Baseline + target */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Baseline & Target</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Baseline Measurement</Label>
            <Textarea rows={2} value={p.baselineMeasurement} onChange={(e) => set({ baselineMeasurement: e.target.value })} placeholder="Current performance before AI — quantify where possible." />
          </div>
          <div className="space-y-1.5">
            <Label>Target Outcome</Label>
            <Textarea rows={2} value={p.targetOutcome} onChange={(e) => set({ targetOutcome: e.target.value })} placeholder="Expected performance after AI deployment." />
          </div>
        </div>
      </section>

      <Separator />

      {/* Workflows */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Workflow Scope</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Included Workflows <span className="text-muted-foreground text-xs">(one per line)</span></Label>
            <Textarea rows={4} value={listToStr(p.includedWorkflows)} onChange={(e) => set({ includedWorkflows: strToList(e.target.value) })} placeholder="Transaction monitoring review&#10;Alert triage" />
          </div>
          <div className="space-y-1.5">
            <Label>Excluded Workflows <span className="text-muted-foreground text-xs">(one per line)</span></Label>
            <Textarea rows={4} value={listToStr(p.excludedWorkflows)} onChange={(e) => set({ excludedWorkflows: strToList(e.target.value) })} placeholder="SAR filing (excluded — manual review required by regulation)" />
          </div>
        </div>
      </section>

      <Separator />

      {/* Success metrics */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Success Metrics</h2>
          <span className="text-xs text-muted-foreground">{p.successMetrics.length} metric{p.successMetrics.length !== 1 ? "s" : ""}</span>
        </div>
        {p.successMetrics.length === 0 && (
          <div className="rounded-lg border border-dashed px-6 py-8 text-center text-sm text-muted-foreground">
            No success metrics defined. Add at least one measurable metric for pilot sign-off.
          </div>
        )}
        {p.successMetrics.map((m) => (
          <MetricRow key={m.id} metric={m} onUpdate={(patch) => updateMetric(m.id, patch)} onRemove={() => removeMetric(m.id)} />
        ))}
        <button
          type="button"
          onClick={addMetric}
          className="w-full rounded-lg border border-dashed px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/30 transition-colors"
        >
          + Add success metric
        </button>
      </section>

      <Separator />

      {/* Launch + rollback criteria */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Launch & Rollback Criteria</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Launch Criteria <span className="text-muted-foreground text-xs">(one per line)</span></Label>
            <Textarea
              rows={5}
              value={listToStr(p.launchCriteria)}
              onChange={(e) => set({ launchCriteria: strToList(e.target.value) })}
              placeholder="Accuracy ≥ 85% on test set&#10;DPA signed&#10;Security review passed&#10;Training completed for all pilot users"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Rollback Criteria <span className="text-muted-foreground text-xs">(one per line)</span></Label>
            <Textarea
              rows={5}
              value={listToStr(p.rollbackCriteria)}
              onChange={(e) => set({ rollbackCriteria: strToList(e.target.value) })}
              placeholder="False positive rate exceeds 20%&#10;System unavailability > 4 hours&#10;User satisfaction drops below 6/10"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
