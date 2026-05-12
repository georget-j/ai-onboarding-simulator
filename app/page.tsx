import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const OUTPUTS = [
  "Customer Discovery Summary",
  "Current & Future-State Workflow Map",
  "Requirements Matrix",
  "Missing Information Log",
  "Integration & API Plan",
  "Data Readiness Assessment",
  "Implementation Plan",
  "Deployment Risk Register",
  "Pilot Success Plan",
  "Engineering Handoff",
  "Stakeholder Communication Plan",
  "Product Feedback Memo",
  "Executive Summary",
  "Next Actions Checklist",
];

const ROLES = [
  "Forward-Deployed Engineer",
  "Solutions Engineer",
  "Deployment Strategist",
  "Technical Customer Success",
  "AI Deployment Lead",
  "Technical Operator",
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 space-y-16">
      {/* Hero */}
      <section className="space-y-6 max-w-3xl">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">Portfolio Project</Badge>
          <Badge variant="outline" className="text-xs">AI · B2B · Forward-Deployed</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Forward-Deployed Customer Onboarding Simulator
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Simulate how a forward-deployed AI team turns messy customer discovery into a
          deployment-ready onboarding plan — requirements, risks, engineering handoffs, pilot
          success metrics, and more.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <Link href="/scenarios" className={buttonVariants({ size: "lg" })}>
            Browse Scenarios
          </Link>
          <Link href="/workspace/custom" className={buttonVariants({ variant: "outline", size: "lg" })}>
            Start Custom Project
          </Link>
        </div>
      </section>

      {/* What it generates */}
      <section className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Generated Outputs
          </h2>
          <ul className="space-y-2">
            {OUTPUTS.map((output, i) => (
              <li key={output} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 text-xs text-muted-foreground font-mono w-5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{output}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Demonstrates Skills For
            </h2>
            <div className="flex flex-wrap gap-2">
              {ROLES.map((role) => (
                <Badge key={role} variant="secondary" className="text-xs">
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-5 space-y-3">
            <h3 className="text-sm font-semibold">How It Works</h3>
            <ol className="space-y-2 text-sm text-muted-foreground">
              {[
                "Select a customer scenario or create your own",
                "Capture discovery inputs, workflow steps, and systems",
                "Auto-generate requirements and deployment risks",
                "Build a pilot success plan with KPIs and criteria",
                "Generate AI-structured implementation artifacts",
                "Export a complete Markdown onboarding pack",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-lg border p-5 space-y-2">
            <h3 className="text-sm font-semibold">Why This Project Exists</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This project demonstrates how a forward-deployed AI or solutions engineering team
              can turn messy customer discovery into structured implementation artifacts —
              requirements, risks, pilot plans, engineering handoffs, and customer
              communications.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
