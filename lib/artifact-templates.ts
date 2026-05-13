import type { OnboardingProject, GeneratedArtifacts } from "./types";

export function generateTemplateArtifacts(project: OnboardingProject): GeneratedArtifacts {
  const { customer, discovery, workflows, systems, dataSources, stakeholders, risks, pilotPlan } = project;
  const name = customer.companyName;
  const industry = customer.industry.replace("_", " ");
  const highAutoSteps = workflows.filter((w) => w.automationPotential === "high").map((w) => w.name);
  const blockedSystems = systems.filter((s) => s.apiAvailable === false).map((s) => s.name);
  const criticalRisks = risks.filter((r) => r.severity === "critical" || r.severity === "high").slice(0, 3).map((r) => r.title);
  const regs = customer.regulatoryContext.join(", ") || "no specific regulatory framework identified";

  return {
    customerDiscoverySummary: `CUSTOMER DISCOVERY SUMMARY — ${name.toUpperCase()}

${name} is a ${customer.companySize.replace("_", " ")} ${industry} company seeking to deploy AI to address: ${customer.businessProblem || "a key operational challenge"}.

The primary use case is ${customer.primaryUseCase || "not yet fully defined"}. The desired outcome is: ${customer.desiredOutcome || "improved operational efficiency"}.

Discovery was led by the ${discovery.buyerTeam || "customer team"} with an implementation deadline of ${discovery.implementationDeadline || "TBD"}. The engagement affects approximately ${discovery.usersAffected || "an unspecified number of"} users.

Current process: ${discovery.currentProcess || "Not yet documented — requires follow-up session."}

Key constraints: ${discovery.constraints || "No constraints documented in discovery."}

Risk level assessed as: ${discovery.riskLevel}. Customer technical maturity: ${customer.technicalMaturity}. Urgency: ${customer.urgency}.

Regulatory context: ${regs}.

${highAutoSteps.length > 0 ? `Highest automation potential identified in: ${highAutoSteps.join(", ")}.` : "No high-automation-potential steps identified yet — workflow mapping incomplete."}`,

    currentStateWorkflow: `CURRENT STATE WORKFLOW — ${name.toUpperCase()}

${name}'s current process involves ${workflows.length > 0 ? `${workflows.length} documented workflow steps` : "a process that has not yet been fully mapped"}. ${discovery.currentProcess || "The current process description has not been documented."}

${workflows.length > 0 ? `Key steps in the current process:\n${workflows.map((w, i) => `${i + 1}. ${w.name} — ${w.description || "no description"} (Owner: ${w.ownerTeam || "unknown"}, Manual effort: ${w.manualEffort}, Frequency: ${w.frequency})`).join("\n")}` : "Workflow mapping is required before this section can be completed."}

Pain points and inefficiencies: ${workflows.flatMap((w) => w.painPoints).filter(Boolean).slice(0, 5).join("; ") || "Not yet captured — pain point elicitation recommended in next session."}

Systems in use today: ${systems.map((s) => s.name).join(", ") || "Not yet mapped."}

Failure modes identified: ${workflows.flatMap((w) => w.failureModes).filter(Boolean).slice(0, 4).join("; ") || "None documented."}`,

    futureStateWorkflow: `FUTURE STATE WORKFLOW — ${name.toUpperCase()}

Following successful AI deployment, ${name}'s ${customer.primaryUseCase || "target workflow"} will shift from a predominantly manual process to an AI-augmented or automated flow.

${workflows.filter((w) => w.futureState !== "human_led").map((w) => `${w.name}: currently ${w.manualEffort} manual effort → future state: ${w.futureState.replace("_", " ")}`).join("\n") || "Future state workflow to be defined as workflow mapping progresses."}

The AI system will handle ${highAutoSteps.length > 0 ? highAutoSteps.join(", ") : "the identified high-automation steps"} autonomously, with human review gates at critical decision points.

Expected outcome: ${customer.desiredOutcome || "improved efficiency, reduced manual effort, and better decision quality"}.

Success definition: ${discovery.successDefinition || "To be defined with the customer before pilot launch."}`,

    requirementsMatrix: `REQUIREMENTS MATRIX — ${name.toUpperCase()}

MUST HAVE:
${blockedSystems.length > 0 ? blockedSystems.map((s) => `- Custom integration or workaround for ${s} (no API available)`).join("\n") : "- API integrations confirmed for all systems in scope"}
${customer.regulatoryContext.length > 0 ? `- Regulatory compliance documentation covering: ${regs}` : ""}
${dataSources.some((d) => d.pii === true) ? "- PII data handling policy and data processing agreement\n- Encryption at rest and in transit for all PII data" : ""}
- Audit trail for all AI-assisted decisions
- Model accuracy above agreed threshold before go-live

SHOULD HAVE:
- Dedicated Slack channel for pilot support escalation
- Weekly performance reporting dashboard during pilot
- End-user training programme before pilot launch

NICE TO HAVE:
- Real-time anomaly alerting
- Self-service model retraining interface
- Automated reporting to customer BI tools`,

    missingInformationLog: `MISSING INFORMATION LOG — ${name.toUpperCase()}

The following items are unresolved and must be addressed before pilot launch. Each item is flagged with a suggested owner.

${blockedSystems.length > 0 ? blockedSystems.map((s) => `[Engineering] API access or integration method for ${s} — blocks integration design`).join("\n") : ""}
${!discovery.currentProcess ? "[Customer] Full current process documentation — required for workflow mapping and baseline measurement" : ""}
${!discovery.successDefinition ? "[Customer] Measurable success definition — required for pilot sign-off criteria" : ""}
${stakeholders.length === 0 ? "[Customer] Named stakeholders including technical owner and executive sponsor" : ""}
${dataSources.filter((d) => d.accessStatus === "blocked" || d.accessStatus === "unknown").map((d) => `[Customer] Data access resolution for ${d.name} (status: ${d.accessStatus})`).join("\n") || ""}
${customer.regulatoryContext.length > 0 ? "[Commercial] Data processing agreement — required before any data is transferred" : ""}

Total open items: ${[!discovery.currentProcess, !discovery.successDefinition, stakeholders.length === 0, blockedSystems.length > 0].filter(Boolean).length + dataSources.filter((d) => d.accessStatus !== "available").length}`,

    integrationAndApiPlan: `INTEGRATION AND API PLAN — ${name.toUpperCase()}

SYSTEMS IN SCOPE:
${systems.length > 0 ? systems.map((s) => `- ${s.name} (${s.type.replace("_", " ")}) — API: ${s.apiAvailable}, Access: ${s.accessMethod.replace("_", " ")}, Complexity: ${s.integrationComplexity}`).join("\n") : "No systems mapped yet."}

INTEGRATION APPROACH:
${systems.filter((s) => s.apiAvailable === true).map((s) => `${s.name}: REST API integration. Authentication: ${s.authenticationMethod || "TBD"}. Data sensitivity: ${s.dataSensitivity}.`).join("\n") || ""}
${systems.filter((s) => s.apiAvailable === false).map((s) => `${s.name}: No API available. Custom integration required — CSV export pipeline or webhook workaround to be scoped.`).join("\n") || ""}

DATA PIPELINE:
${dataSources.map((d) => `${d.name}: ${d.dataType.replace("_", " ")}, format ${d.format}, quality ${d.quality}, access ${d.accessStatus}`).join("\n") || "No data sources mapped yet."}

ESTIMATED INTEGRATION EFFORT:
${systems.filter((s) => s.integrationComplexity === "high").length} high-complexity integration${systems.filter((s) => s.integrationComplexity === "high").length !== 1 ? "s" : ""} identified. Recommend dedicated 2-week integration sprint before pilot start.`,

    dataReadinessAssessment: `DATA READINESS ASSESSMENT — ${name.toUpperCase()}

Overall readiness: ${dataSources.every((d) => d.quality === "good" && d.accessStatus === "available") ? "READY" : "ACTION REQUIRED"}

DATA SOURCE ASSESSMENT:
${dataSources.map((d) => `${d.name}:
  Type: ${d.dataType.replace("_", " ")} | Format: ${d.format} | Quality: ${d.quality}
  Access: ${d.accessStatus} | PII: ${d.pii} | Volume: ${d.volumeEstimate || "unknown"}
  ${d.quality === "poor" ? "⚠ Data remediation required before training can begin." : ""}
  ${d.accessStatus === "blocked" ? "✕ Access blocked — must be unblocked before pilot." : ""}`).join("\n\n") || "No data sources documented yet."}

KEY RISKS:
${dataSources.filter((d) => d.quality === "poor" || d.accessStatus === "blocked").map((d) => `- ${d.name}: ${d.quality === "poor" ? "poor quality" : ""} ${d.accessStatus === "blocked" ? "access blocked" : ""}`).join("\n") || "No critical data risks identified."}

RECOMMENDATIONS:
- Define minimum data quality thresholds as a pilot launch criterion
- Obtain sample datasets for model validation before committing to go-live date`,

    implementationPlan: `IMPLEMENTATION PLAN — ${name.toUpperCase()}

PHASE 1 — DISCOVERY AND SCOPING (Weeks 1–2)
Complete workflow mapping, resolve missing information items, finalise integration approach, and agree pilot scope and success metrics.

PHASE 2 — INTEGRATION AND SETUP (Weeks 3–6)
Build integrations with ${systems.map((s) => s.name).join(", ") || "customer systems"}. Set up staging environment, data pipelines, and access controls.

PHASE 3 — PILOT PREPARATION (Weeks 6–7)
Model validation, end-user training, and launch criteria review. Confirm all launch criteria are met before proceeding.

PHASE 4 — PILOT (${pilotPlan ? `${pilotPlan.durationWeeks} weeks` : "8 weeks"})
Live deployment with ${pilotPlan?.pilotUsers.length || "selected"} pilot users. Weekly performance reviews against agreed success metrics.

PHASE 5 — PILOT REVIEW AND ROLLOUT DECISION
Evaluate against success metrics. Present results to executive sponsor. Decision: full rollout, extended pilot, or pause.

PHASE 6 — FULL ROLLOUT (timeline TBD)
Phased rollout to full user base. Ongoing support, monitoring, and quarterly business reviews.

IMPLEMENTATION DEADLINE: ${discovery.implementationDeadline || "Not yet set — must be agreed before kick-off."}`,

    riskRegisterSummary: `RISK REGISTER SUMMARY — ${name.toUpperCase()}

${risks.length} risks identified across this engagement. ${risks.filter((r) => r.severity === "critical").length} critical, ${risks.filter((r) => r.severity === "high").length} high severity.

CRITICAL AND HIGH RISKS:
${criticalRisks.length > 0 ? criticalRisks.map((t) => `- ${t}`).join("\n") : "No critical or high risks identified at this stage."}

TOP MITIGATIONS REQUIRED:
${risks.slice(0, 5).map((r) => `- ${r.title}: ${r.mitigation}`).join("\n") || "Risk register to be completed."}

OPEN RISKS: ${risks.filter((r) => r.status === "open").length}
MITIGATING: ${risks.filter((r) => r.status === "mitigating").length}
RESOLVED: ${risks.filter((r) => r.status === "resolved").length}

Overall deployment risk assessed as: ${discovery.riskLevel.toUpperCase()}. Recommend monthly risk review during pilot.`,

    pilotSuccessPlan: `PILOT SUCCESS PLAN — ${name.toUpperCase()}

OBJECTIVE: ${pilotPlan?.objective || "To validate the AI product delivers measurable value in a live environment before full rollout."}

SCOPE: ${pilotPlan?.scope || "Pilot scope to be defined with the customer."}

DURATION: ${pilotPlan ? `${pilotPlan.durationWeeks} weeks` : "8 weeks (recommended)"}

PILOT USERS: ${pilotPlan?.pilotUsers.join(", ") || "To be named by the customer."}

INCLUDED WORKFLOWS: ${pilotPlan?.includedWorkflows.join(", ") || workflows.map((w) => w.name).join(", ") || "TBD"}

SUCCESS METRICS:
${pilotPlan?.successMetrics.map((m) => `- ${m.name}: Baseline ${m.baseline} → Target ${m.target} (Measured by: ${m.measurementMethod}, Owner: ${m.owner})`).join("\n") || "- Success metrics to be defined before pilot start."}

LAUNCH CRITERIA:
${pilotPlan?.launchCriteria.map((c) => `✓ ${c}`).join("\n") || "- Launch criteria to be agreed before pilot start."}

ROLLBACK CRITERIA:
${pilotPlan?.rollbackCriteria.map((c) => `✕ ${c}`).join("\n") || "- Rollback criteria to be agreed before pilot start."}`,

    stakeholderCommunicationPlan: `STAKEHOLDER COMMUNICATION PLAN — ${name.toUpperCase()}

This plan outlines how each stakeholder group at ${name} should be engaged throughout the deployment.

${stakeholders.length > 0 ? stakeholders.map((s) => `${s.name} (${s.role}, ${s.team}) — ${s.involvement.replace("_", " ")}
  Concerns: ${s.concerns.join("; ") || "Not documented"}
  Required actions: ${s.requiredActions.join("; ") || "Not documented"}
  Communication cadence: ${s.involvement === "sponsor" ? "Monthly executive briefing + pilot sign-off meeting" : s.involvement === "technical_owner" ? "Weekly technical sync during integration phase" : "Bi-weekly status update"}`).join("\n\n") : "No stakeholders have been mapped yet. Stakeholder identification is an urgent action item."}

COMMUNICATION CHANNELS:
- Dedicated Slack channel: #${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-ai-deployment
- Weekly status email to all stakeholders
- Monthly executive review (sponsor + CSM)
- Incident escalation: CSM → Head of Deployment → VP Customer Success`,

    engineeringHandoff: `ENGINEERING HANDOFF — ${name.toUpperCase()}

This document summarises the technical requirements and integration specifics for the engineering team.

CUSTOMER ENVIRONMENT:
${systems.map((s) => `- ${s.name}: ${s.type.replace("_", " ")}, access via ${s.accessMethod.replace("_", " ")}, API available: ${s.apiAvailable}, auth: ${s.authenticationMethod || "TBD"}, data sensitivity: ${s.dataSensitivity}`).join("\n") || "Systems not yet mapped."}

DATA SOURCES:
${dataSources.map((d) => `- ${d.name}: ${d.dataType.replace("_", " ")}, format ${d.format}, quality ${d.quality}, PII: ${d.pii}, access: ${d.accessStatus}`).join("\n") || "Data sources not yet mapped."}

INTEGRATION BLOCKERS:
${blockedSystems.length > 0 ? blockedSystems.map((s) => `- ${s}: No API. Custom integration required.`).join("\n") : "No blockers identified."}
${dataSources.filter((d) => d.accessStatus === "blocked").map((d) => `- ${d.name}: Data access blocked.`).join("\n") || ""}

SECURITY REQUIREMENTS:
${customer.regulatoryContext.length > 0 ? `- Regulatory compliance: ${regs}` : "- No specific regulatory requirements identified."}
${dataSources.some((d) => d.pii === true) ? "- PII data present — encryption at rest and in transit required\n- DPA must be signed before data transfer" : ""}

ENVIRONMENT SETUP:
- Staging environment required before pilot
- Authentication: confirm auth method per system before integration sprint
- Monitoring: set up latency, error rate, and throughput dashboards before go-live`,

    productFeedbackMemo: `PRODUCT FEEDBACK MEMO — ${name.toUpperCase()}

This memo captures product gaps, feature requests, and friction points identified during this engagement, to be reviewed by the product team.

ENGAGEMENT CONTEXT: ${industry} customer, ${customer.companySize.replace("_", " ")}, ${customer.urgency} urgency.

INTEGRATION GAPS:
${blockedSystems.length > 0 ? `- ${blockedSystems.join(", ")}: No API available. We are losing time to custom integration work that should be handled by pre-built connectors.` : "- No significant integration gaps identified in this engagement."}

DATA QUALITY ISSUES:
${dataSources.filter((d) => d.quality === "poor" || d.quality === "mixed").map((d) => `- ${d.name}: ${d.quality} quality. Customers need clearer guidance on minimum data quality requirements before they commit.`).join("\n") || "- No data quality issues to flag."}

COMPLIANCE FRICTION:
${customer.regulatoryContext.length > 0 ? `- Customer is subject to ${regs}. Product does not currently have pre-built compliance documentation to accelerate legal review. This added significant friction.` : "- No compliance friction in this engagement."}

FEATURE REQUESTS:
- Self-service audit trail export for customer compliance teams
- Data quality scoring tool to help customers assess readiness before engagement
- Pre-built integration templates for common ${industry} systems

ANALYST NOTE: This customer could be a strong reference case if the pilot succeeds. Recommend treating as a priority engagement.`,

    executiveSummary: `EXECUTIVE SUMMARY — ${name.toUpperCase()}

${name} is deploying AI to transform its ${customer.primaryUseCase || "core operations"}, addressing the challenge of: ${customer.businessProblem || "operational inefficiency in key workflows"}.

THE OPPORTUNITY: ${highAutoSteps.length > 0 ? `${highAutoSteps.length} workflow steps have been identified as high automation potential, including ${highAutoSteps.slice(0, 2).join(" and ")}. Automating these steps is expected to` : "AI deployment is expected to"} ${customer.desiredOutcome || "significantly improve team efficiency and decision quality"}.

THE PLAN: We will deliver in four phases — integration (${systems.length} systems), ${pilotPlan ? `a ${pilotPlan.durationWeeks}-week` : "an 8-week"} pilot with ${pilotPlan?.pilotUsers.length || "selected"} users, pilot review, and full rollout.

KEY RISKS: ${criticalRisks.length > 0 ? criticalRisks.slice(0, 2).join("; ") : "Risks are within normal range for this type of deployment."}

SUCCESS DEFINITION: ${discovery.successDefinition || "To be agreed with the customer before pilot start."}

NEXT STEPS: Complete integration scoping, resolve ${blockedSystems.length > 0 ? `API access for ${blockedSystems.join(", ")}, and` : "any outstanding"} data access questions, then commence integration work.

We are confident this deployment can deliver measurable value within ${pilotPlan ? `${pilotPlan.durationWeeks} weeks` : "8 weeks"} of the pilot launch.`,

    nextActionsChecklist: `NEXT ACTIONS CHECKLIST — ${name.toUpperCase()}

FOR ${name.toUpperCase()} (CUSTOMER):
${!discovery.currentProcess ? "☐ Provide full current process documentation to the deployment team\n" : ""}${stakeholders.length === 0 ? "☐ Name technical owner, executive sponsor, and end-user pilot participants\n" : ""}${dataSources.filter((d) => d.accessStatus === "blocked").map((d) => `☐ Unblock data access for ${d.name}\n`).join("")}${blockedSystems.map((s) => `☐ Confirm integration approach for ${s} (no API available)\n`).join("")}${customer.regulatoryContext.length > 0 ? "☐ Engage legal/procurement to begin DPA review\n" : ""}${!discovery.successDefinition ? "☐ Define measurable success criteria for the pilot\n" : ""}${!discovery.implementationDeadline ? "☐ Confirm implementation deadline\n" : ""}

FOR THE DEPLOYMENT TEAM:
☐ Send discovery summary and this checklist to the customer within 24 hours
☐ Schedule integration scoping session with ${stakeholders.find((s) => s.involvement === "technical_owner")?.name || "customer technical owner"}
☐ Draft pilot plan and circulate for customer review
${customer.regulatoryContext.length > 0 ? "☐ Prepare compliance documentation pack for customer legal review\n" : ""}☐ Set up dedicated Slack channel and share with customer stakeholders
☐ Book weekly pilot check-in cadence with ${discovery.buyerTeam || "customer team"}

DUE DATE: All items above should be completed within 14 days of this document being shared.`,
  };
}
