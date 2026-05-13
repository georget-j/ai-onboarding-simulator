"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateId } from "@/lib/utils";
import type { Requirement, RequirementCategory, RequirementPriority, RequirementOwner, RequirementStatus } from "@/lib/types";

type Props = {
  onSave: (req: Requirement) => void;
  onCancel: () => void;
};

function blank(): Requirement {
  return {
    id: generateId(),
    title: "",
    description: "",
    category: "functional",
    priority: "must_have",
    source: "customer_discovery",
    owner: "shared",
    status: "assumption",
  };
}

export function AddRequirementForm({ onSave, onCancel }: Props) {
  const [req, setReq] = useState<Requirement>(blank);
  const set = (patch: Partial<Requirement>) => setReq((r) => ({ ...r, ...patch }));

  const canSave = req.title.trim().length > 0;

  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 px-5 py-5 space-y-4">
      <h3 className="text-sm font-semibold">Add Custom Requirement</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Title <span className="text-destructive">*</span></Label>
          <Input
            value={req.title}
            onChange={(e) => set({ title: e.target.value })}
            placeholder="e.g. Single sign-on (SSO) integration with Okta"
            autoFocus
          />
        </div>

        <div className="space-y-1.5">
          <Label>Category</Label>
          <Select value={req.category} onValueChange={(v) => set({ category: v as RequirementCategory })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="functional">Functional</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="data">Data</SelectItem>
              <SelectItem value="integration">Integration</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="compliance">Compliance</SelectItem>
              <SelectItem value="reporting">Reporting</SelectItem>
              <SelectItem value="support">Support</SelectItem>
              <SelectItem value="change_management">Change Management</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Priority</Label>
          <Select value={req.priority} onValueChange={(v) => set({ priority: v as RequirementPriority })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="must_have">Must Have</SelectItem>
              <SelectItem value="should_have">Should Have</SelectItem>
              <SelectItem value="nice_to_have">Nice to Have</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Owner</Label>
          <Select value={req.owner} onValueChange={(v) => set({ owner: v as RequirementOwner })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="startup">Our Team</SelectItem>
              <SelectItem value="shared">Shared</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Status</Label>
          <Select value={req.status} onValueChange={(v) => set({ status: v as RequirementStatus })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="assumption">Assumption</SelectItem>
              <SelectItem value="needs_validation">Needs Validation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label>Description</Label>
          <Textarea
            rows={2}
            value={req.description}
            onChange={(e) => set({ description: e.target.value })}
            placeholder="What is this requirement and why does it matter?"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => { if (canSave) { onSave(req); } }}
          disabled={!canSave}
          className="text-sm px-4 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Add Requirement
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
