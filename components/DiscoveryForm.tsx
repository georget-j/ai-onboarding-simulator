"use client";

import { useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { OnboardingProject, CustomerProfile, DiscoveryInput } from "@/lib/types";

type Props = {
  project: OnboardingProject;
  onUpdate: (patch: Partial<OnboardingProject>) => void;
};

const REGULATORY_OPTIONS = ["FCA", "FATF", "GDPR", "PSD2", "ISO 13849", "SRA", "ICO", "HIPAA", "SOC 2", "DORA", "MiFID II"];

export function DiscoveryForm({ project, onUpdate }: Props) {
  const { customer, discovery } = project;

  const setCustomer = useCallback(
    (patch: Partial<CustomerProfile>) => {
      onUpdate({ customer: { ...customer, ...patch } });
    },
    [customer, onUpdate]
  );

  const setDiscovery = useCallback(
    (patch: Partial<DiscoveryInput>) => {
      onUpdate({ discovery: { ...discovery, ...patch } });
    },
    [discovery, onUpdate]
  );

  const toggleRegulatory = (value: string) => {
    const current = customer.regulatoryContext ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setCustomer({ regulatoryContext: next });
  };

  return (
    <div className="space-y-8">
      {/* Customer Profile */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Customer Profile</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={customer.companyName}
              onChange={(e) => setCustomer({ companyName: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="industry">Industry</Label>
            <Select value={customer.industry} onValueChange={(v) => setCustomer({ industry: v as CustomerProfile["industry"] })}>
              <SelectTrigger id="industry">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["fintech", "legaltech", "healthcare", "insurance", "industrial", "enterprise_saas", "public_sector", "other"].map((v) => (
                  <SelectItem key={v} value={v}>{v.replace("_", " ")}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="companySize">Company Size</Label>
            <Select value={customer.companySize} onValueChange={(v) => setCustomer({ companySize: v as CustomerProfile["companySize"] })}>
              <SelectTrigger id="companySize">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="startup">Startup</SelectItem>
                <SelectItem value="mid_market">Mid-Market</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="urgency">Urgency</Label>
            <Select value={customer.urgency} onValueChange={(v) => setCustomer({ urgency: v as CustomerProfile["urgency"] })}>
              <SelectTrigger id="urgency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="technicalMaturity">Technical Maturity</Label>
            <Select value={customer.technicalMaturity} onValueChange={(v) => setCustomer({ technicalMaturity: v as CustomerProfile["technicalMaturity"] })}>
              <SelectTrigger id="technicalMaturity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="primaryUseCase">Primary Use Case</Label>
            <Input
              id="primaryUseCase"
              value={customer.primaryUseCase}
              onChange={(e) => setCustomer({ primaryUseCase: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="businessProblem">Business Problem</Label>
          <Textarea
            id="businessProblem"
            rows={3}
            value={customer.businessProblem}
            onChange={(e) => setCustomer({ businessProblem: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="desiredOutcome">Desired Outcome</Label>
          <Textarea
            id="desiredOutcome"
            rows={2}
            value={customer.desiredOutcome}
            onChange={(e) => setCustomer({ desiredOutcome: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Regulatory Context</Label>
          <div className="flex flex-wrap gap-2">
            {REGULATORY_OPTIONS.map((opt) => {
              const active = customer.regulatoryContext?.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleRegulatory(opt)}
                  className="focus:outline-none"
                >
                  <Badge
                    variant={active ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                  >
                    {opt}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <Separator />

      {/* Discovery Context */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Discovery Context</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="buyerTeam">Buyer / Stakeholder Team</Label>
            <Input
              id="buyerTeam"
              value={discovery.buyerTeam}
              onChange={(e) => setDiscovery({ buyerTeam: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="implementationDeadline">Implementation Deadline</Label>
            <Input
              id="implementationDeadline"
              value={discovery.implementationDeadline}
              onChange={(e) => setDiscovery({ implementationDeadline: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="usersAffected">Users Affected</Label>
            <Input
              id="usersAffected"
              value={discovery.usersAffected}
              onChange={(e) => setDiscovery({ usersAffected: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="riskLevel">Risk Level</Label>
            <Select value={discovery.riskLevel} onValueChange={(v) => setDiscovery({ riskLevel: v as DiscoveryInput["riskLevel"] })}>
              <SelectTrigger id="riskLevel">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="currentProcess">Current Process</Label>
          <Textarea
            id="currentProcess"
            rows={3}
            value={discovery.currentProcess}
            onChange={(e) => setDiscovery({ currentProcess: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="constraints">Constraints</Label>
          <Textarea
            id="constraints"
            rows={2}
            value={discovery.constraints}
            onChange={(e) => setDiscovery({ constraints: e.target.value })}
            placeholder="Regulatory, technical, budget, timeline constraints…"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="knownRisks">Known Risks</Label>
          <Textarea
            id="knownRisks"
            rows={2}
            value={discovery.knownRisks}
            onChange={(e) => setDiscovery({ knownRisks: e.target.value })}
            placeholder="Risks the customer or team has already identified…"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="successDefinition">Success Definition</Label>
          <Textarea
            id="successDefinition"
            rows={2}
            value={discovery.successDefinition}
            onChange={(e) => setDiscovery({ successDefinition: e.target.value })}
            placeholder="How will the customer define success?"
          />
        </div>
      </section>
    </div>
  );
}
