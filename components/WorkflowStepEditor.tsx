"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { generateId } from "@/lib/utils";
import type { WorkflowStep, FutureState } from "@/lib/types";

type Props = {
  steps: WorkflowStep[];
  onChange: (steps: WorkflowStep[]) => void;
};

const FUTURE_STATE_LABELS: Record<FutureState, string> = {
  human_led: "Human-Led",
  ai_assisted: "AI-Assisted",
  automated: "Automated",
  requires_approval: "Requires Approval",
};

const FUTURE_STATE_COLORS: Record<FutureState, string> = {
  human_led: "bg-muted text-muted-foreground border-muted-foreground/30",
  ai_assisted: "bg-blue-100 text-blue-800 border-blue-200",
  automated: "bg-green-100 text-green-800 border-green-200",
  requires_approval: "bg-amber-100 text-amber-800 border-amber-200",
};

const AUTO_COLORS: Record<string, string> = {
  high: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-muted text-muted-foreground border-muted-foreground/30",
};

function newStep(): WorkflowStep {
  return {
    id: generateId(),
    name: "",
    description: "",
    ownerTeam: "",
    currentSystem: "",
    inputData: [],
    outputArtifact: [],
    painPoints: [],
    manualEffort: "medium",
    frequency: "daily",
    failureModes: [],
    automationPotential: "medium",
    futureState: "ai_assisted",
  };
}

function arrToStr(arr: string[]): string {
  return arr.join(", ");
}

function strToArr(s: string): string[] {
  return s
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

type StepRowProps = {
  step: WorkflowStep;
  index: number;
  onUpdate: (patch: Partial<WorkflowStep>) => void;
  onRemove: () => void;
};

function StepRow({ step, index, onUpdate, onRemove }: StepRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("rounded-lg border bg-background", open && "ring-1 ring-primary/20")}>
      {/* Header row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="text-xs font-mono text-muted-foreground w-5 shrink-0">{index + 1}</span>

        <div className="flex-1 min-w-0">
          {open ? (
            <Input
              value={step.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="Step name…"
              className="h-7 text-sm font-medium"
            />
          ) : (
            <p className="text-sm font-medium truncate">{step.name || <span className="text-muted-foreground italic">Unnamed step</span>}</p>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {step.ownerTeam && !open && (
            <span className="text-xs text-muted-foreground">{step.ownerTeam}</span>
          )}
          <Badge variant="outline" className={cn("text-xs shrink-0", FUTURE_STATE_COLORS[step.futureState])}>
            {FUTURE_STATE_LABELS[step.futureState]}
          </Badge>
          <Badge variant="outline" className={cn("text-xs shrink-0", AUTO_COLORS[step.automationPotential])}>
            {step.automationPotential} auto
          </Badge>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted transition-colors"
          >
            {open ? "Done" : "Edit"}
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="text-xs text-destructive/70 hover:text-destructive px-2 py-1 rounded hover:bg-destructive/10 transition-colors"
          >
            ×
          </button>
        </div>
      </div>

      {/* Expanded edit panel */}
      {open && (
        <>
          <Separator />
          <div className="px-4 py-4 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Owner Team</Label>
                <Input value={step.ownerTeam} onChange={(e) => onUpdate({ ownerTeam: e.target.value })} placeholder="e.g. Compliance, Ops…" />
              </div>
              <div className="space-y-1.5">
                <Label>Current System</Label>
                <Input value={step.currentSystem} onChange={(e) => onUpdate({ currentSystem: e.target.value })} placeholder="e.g. Salesforce, manual…" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea rows={2} value={step.description} onChange={(e) => onUpdate({ description: e.target.value })} placeholder="What happens in this step?" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Input Data <span className="text-muted-foreground">(comma-separated)</span></Label>
                <Input value={arrToStr(step.inputData)} onChange={(e) => onUpdate({ inputData: strToArr(e.target.value) })} placeholder="customer records, alerts…" />
              </div>
              <div className="space-y-1.5">
                <Label>Output Artefacts <span className="text-muted-foreground">(comma-separated)</span></Label>
                <Input value={arrToStr(step.outputArtifact)} onChange={(e) => onUpdate({ outputArtifact: strToArr(e.target.value) })} placeholder="SAR filing, case note…" />
              </div>
              <div className="space-y-1.5">
                <Label>Pain Points <span className="text-muted-foreground">(comma-separated)</span></Label>
                <Input value={arrToStr(step.painPoints)} onChange={(e) => onUpdate({ painPoints: strToArr(e.target.value) })} placeholder="slow, error-prone…" />
              </div>
              <div className="space-y-1.5">
                <Label>Failure Modes <span className="text-muted-foreground">(comma-separated)</span></Label>
                <Input value={arrToStr(step.failureModes)} onChange={(e) => onUpdate({ failureModes: strToArr(e.target.value) })} placeholder="false negatives, missed…" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Manual Effort</Label>
                <Select value={step.manualEffort} onValueChange={(v) => onUpdate({ manualEffort: v as WorkflowStep["manualEffort"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Frequency</Label>
                <Select value={step.frequency} onValueChange={(v) => onUpdate({ frequency: v as WorkflowStep["frequency"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="ad_hoc">Ad-hoc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Automation Potential</Label>
                <Select value={step.automationPotential} onValueChange={(v) => onUpdate({ automationPotential: v as WorkflowStep["automationPotential"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Future State</Label>
                <Select value={step.futureState} onValueChange={(v) => onUpdate({ futureState: v as FutureState })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="human_led">Human-Led</SelectItem>
                    <SelectItem value="ai_assisted">AI-Assisted</SelectItem>
                    <SelectItem value="automated">Automated</SelectItem>
                    <SelectItem value="requires_approval">Requires Approval</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function WorkflowStepEditor({ steps, onChange }: Props) {
  const updateStep = (id: string, patch: Partial<WorkflowStep>) => {
    onChange(steps.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const removeStep = (id: string) => {
    onChange(steps.filter((s) => s.id !== id));
  };

  const addStep = () => {
    onChange([...steps, newStep()]);
  };

  return (
    <div className="space-y-3">
      {steps.length === 0 && (
        <div className="rounded-lg border border-dashed px-6 py-10 text-center text-sm text-muted-foreground">
          No workflow steps yet. Add the first step to map the current process.
        </div>
      )}
      {steps.map((step, i) => (
        <StepRow
          key={step.id}
          step={step}
          index={i}
          onUpdate={(patch) => updateStep(step.id, patch)}
          onRemove={() => removeStep(step.id)}
        />
      ))}
      <button
        type="button"
        onClick={addStep}
        className="w-full rounded-lg border border-dashed px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/30 transition-colors"
      >
        + Add workflow step
      </button>
    </div>
  );
}
