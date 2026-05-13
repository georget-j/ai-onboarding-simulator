"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateId } from "@/lib/utils";
import type { DeploymentRisk, RiskCategory, RiskSeverity, RiskLikelihood } from "@/lib/types";

type Props = {
  onSave: (risk: DeploymentRisk) => void;
  onCancel: () => void;
};

function blank(): DeploymentRisk {
  return {
    id: generateId(),
    title: "",
    description: "",
    category: "integration",
    severity: "medium",
    likelihood: "medium",
    owner: "",
    mitigation: "",
    escalationTrigger: "",
    status: "open",
    source: "manual",
  };
}

export function AddRiskForm({ onSave, onCancel }: Props) {
  const [risk, setRisk] = useState<DeploymentRisk>(blank);
  const set = (patch: Partial<DeploymentRisk>) => setRisk((r) => ({ ...r, ...patch }));

  const canSave = risk.title.trim().length > 0;

  return (
    <div className="rounded-lg border border-orange-200 bg-orange-50/30 px-5 py-5 space-y-4">
      <h3 className="text-sm font-semibold">Add Custom Risk</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Title <span className="text-destructive">*</span></Label>
          <Input
            value={risk.title}
            onChange={(e) => set({ title: e.target.value })}
            placeholder="e.g. Vendor lock-in on primary data pipeline"
            autoFocus
          />
        </div>

        <div className="space-y-1.5">
          <Label>Category</Label>
          <Select value={risk.category} onValueChange={(v) => set({ category: v as RiskCategory })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="data_readiness">Data Readiness</SelectItem>
              <SelectItem value="integration">Integration</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="stakeholder_alignment">Stakeholder Alignment</SelectItem>
              <SelectItem value="operational_adoption">Operational Adoption</SelectItem>
              <SelectItem value="model_quality">Model Quality</SelectItem>
              <SelectItem value="timeline">Timeline</SelectItem>
              <SelectItem value="legal_procurement">Legal / Procurement</SelectItem>
              <SelectItem value="support_readiness">Support Readiness</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Severity</Label>
          <Select value={risk.severity} onValueChange={(v) => set({ severity: v as RiskSeverity })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Likelihood</Label>
          <Select value={risk.likelihood} onValueChange={(v) => set({ likelihood: v as RiskLikelihood })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Owner</Label>
          <Input
            value={risk.owner}
            onChange={(e) => set({ owner: e.target.value })}
            placeholder="e.g. Engineering, Customer, Legal…"
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label>Description</Label>
          <Textarea
            rows={2}
            value={risk.description}
            onChange={(e) => set({ description: e.target.value })}
            placeholder="What is this risk and what could go wrong?"
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label>Mitigation</Label>
          <Textarea
            rows={2}
            value={risk.mitigation}
            onChange={(e) => set({ mitigation: e.target.value })}
            placeholder="How will this risk be mitigated or managed?"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => { if (canSave) onSave(risk); }}
          disabled={!canSave}
          className="text-sm px-4 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Add Risk
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm px-4 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
