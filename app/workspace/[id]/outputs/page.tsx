"use client";

import { useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { assembleOnboardingPack, downloadMarkdown } from "@/lib/markdown-export";
import type { GeneratedArtifacts } from "@/lib/types";

type Tab = keyof GeneratedArtifacts;

const TABS: { key: Tab; label: string; audience: string }[] = [
  { key: "executiveSummary", label: "Executive Summary", audience: "Customer C-suite" },
  { key: "customerDiscoverySummary", label: "Discovery Summary", audience: "Internal" },
  { key: "currentStateWorkflow", label: "Current State", audience: "Eng + Product" },
  { key: "futureStateWorkflow", label: "Future State", audience: "Customer" },
  { key: "requirementsMatrix", label: "Requirements", audience: "Engineering" },
  { key: "missingInformationLog", label: "Missing Info", audience: "CSM + Customer" },
  { key: "integrationAndApiPlan", label: "Integration Plan", audience: "Engineering" },
  { key: "dataReadinessAssessment", label: "Data Readiness", audience: "Data + Eng" },
  { key: "implementationPlan", label: "Impl. Plan", audience: "Customer + Internal" },
  { key: "riskRegisterSummary", label: "Risk Summary", audience: "Customer Exec" },
  { key: "pilotSuccessPlan", label: "Pilot Plan", audience: "Customer" },
  { key: "stakeholderCommunicationPlan", label: "Comms Plan", audience: "CSM" },
  { key: "engineeringHandoff", label: "Eng Handoff", audience: "Engineering" },
  { key: "productFeedbackMemo", label: "Product Memo", audience: "Product" },
  { key: "nextActionsChecklist", label: "Next Actions", audience: "CSM + Customer" },
];

export default function OutputsPage() {
  const { project, loading, updateProject } = useWorkspace();
  const [activeTab, setActiveTab] = useState<Tab>("executiveSummary");
  const [generating, setGenerating] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(async () => {
    if (!project) return;
    setGenerating(true);
    setSource(null);
    try {
      const res = await fetch("/api/generate/artifacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      const data = await res.json();
      if (data.artifacts) {
        updateProject({ outputs: data.artifacts });
        setSource(data.source);
      }
    } catch (err) {
      console.error("Generation failed", err);
    } finally {
      setGenerating(false);
    }
  }, [project, updateProject]);

  const copyTab = useCallback(async () => {
    const content = project?.outputs?.[activeTab];
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [project, activeTab]);

  const exportMarkdown = useCallback(() => {
    if (!project) return;
    const content = assembleOnboardingPack(project);
    const slug = project.customer.companyName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    downloadMarkdown(content, `${slug}-onboarding-pack.md`);
  }, [project]);

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!project) return <div className="p-8 text-sm text-muted-foreground">Project not found.</div>;

  const hasOutputs = !!project.outputs;
  const activeContent = project.outputs?.[activeTab];
  const activeTabMeta = TABS.find((t) => t.key === activeTab)!;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-8 pt-8 pb-4 space-y-4 border-b">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">Generate Outputs</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Generate all 15 onboarding artifacts from your project data. Export as a full Markdown pack.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {hasOutputs && (
              <button
                type="button"
                onClick={exportMarkdown}
                className="text-sm px-3 py-1.5 rounded-md border border-border hover:bg-muted/50 transition-colors"
              >
                Export .md
              </button>
            )}
            <button
              type="button"
              onClick={generate}
              disabled={generating}
              className={cn(
                "text-sm px-4 py-1.5 rounded-md font-medium transition-colors",
                generating
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {generating ? "Generating…" : hasOutputs ? "Regenerate" : "Generate Outputs"}
            </button>
          </div>
        </div>

        {source && (
          <p className="text-xs text-muted-foreground">
            Generated via: <span className="font-medium capitalize">{source === "ai" ? "OpenAI (gpt-4o-mini)" : source === "template" ? "Deterministic templates (no API key)" : "Template fallback"}</span>
          </p>
        )}

        {!hasOutputs && !generating && (
          <div className="rounded-lg border border-dashed px-6 py-8 text-center text-sm text-muted-foreground">
            Click "Generate Outputs" to produce all 15 onboarding artifacts. Works with or without an OpenAI API key.
          </div>
        )}
      </div>

      {hasOutputs && (
        <div className="flex flex-1 min-h-0">
          {/* Tab sidebar */}
          <div className="w-44 shrink-0 border-r overflow-y-auto py-2">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm transition-colors",
                  activeTab === tab.key
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-8 py-6 max-w-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h2 className="text-base font-semibold">{activeTabMeta.label}</h2>
                  <p className="text-xs text-muted-foreground">Audience: {activeTabMeta.audience}</p>
                </div>
                <button
                  type="button"
                  onClick={copyTab}
                  className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md border border-border hover:bg-muted/50 transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              {activeContent ? (
                <div className="prose prose-sm max-w-none text-foreground [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded [&_code]:text-xs">
                  <ReactMarkdown>
                    {activeContent}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No content generated for this artifact.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
