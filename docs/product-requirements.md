# Product Requirements

> Derived from role research. See role-research.md for source mapping.

---

## Core Jobs-To-Be-Done

| # | JTBD | Key Inputs | Key Outputs |
|---|---|---|---|
| 1 | Capture customer context | Company, industry, problem, urgency, maturity | CustomerProfile, DiscoveryInput |
| 2 | Map current workflow | Steps, owners, systems, pain points | WorkflowStep[] |
| 3 | Define future-state workflow | Automation potential, future state per step | WorkflowStep.futureState |
| 4 | Capture systems and data sources | APIs, formats, quality, sensitivity | CustomerSystem[], DataSource[] |
| 5 | Identify requirements | Categories, priorities, owners, status | Requirement[] |
| 6 | Identify missing information | Gaps, unknowns, decisions needed | MissingInfoItem[] |
| 7 | Generate implementation plan | Phases, tasks, owners, timeline | implementationPlan artifact |
| 8 | Generate engineering handoff | Integrations, APIs, config, risks, open Qs | engineeringHandoff artifact |
| 9 | Generate pilot success plan | KPIs, baselines, targets, launch/rollback criteria | PilotPlan |
| 10 | Track deployment risks | 9 categories, severity, likelihood, mitigation | DeploymentRisk[] |
| 11 | Produce customer communication | Kickoff, status update, escalation, exec summary | stakeholderCommunicationPlan artifact |
| 12 | Capture product feedback | Patterns, gaps, feature requests | productFeedbackMemo artifact |

---

## Output Artifacts (15 total)

1. Customer Discovery Summary
2. Current-State Workflow
3. Future-State Workflow
4. Requirements Matrix
5. Missing Information Log
6. Integration and API Plan
7. Data Readiness Assessment
8. Implementation Plan
9. Risk Register Summary
10. Pilot Success Plan
11. Stakeholder Communication Plan
12. Engineering Handoff
13. Product Feedback Memo
14. Executive Summary
15. Next Actions Checklist

---

## Requirements Matrix

### Functional Requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| F1 | User can select from 4 seeded scenarios | Must have | Portfolio spec |
| F2 | User can create a blank custom project | Must have | Portfolio spec |
| F3 | Discovery form captures all CustomerProfile + DiscoveryInput fields | Must have | JTBD 1 |
| F4 | Workflow builder supports add/edit/delete of steps | Must have | JTBD 2, 3 |
| F5 | Systems mapper supports add/edit/delete of systems and data sources | Must have | JTBD 4 |
| F6 | Requirements auto-generated from project state (deterministic engine) | Must have | JTBD 5 |
| F7 | Missing info auto-detected from project state | Must have | JTBD 6 |
| F8 | Risk register auto-generated from project state | Must have | JTBD 10 |
| F9 | Pilot plan builder captures all PilotPlan fields | Must have | JTBD 9 |
| F10 | All 15 artifacts viewable in output tab | Must have | Section 9 |
| F11 | Full Markdown onboarding pack downloadable as .md | Must have | Section 18 |
| F12 | AI generation via OpenAI (with template fallback) | Should have | Phase 8 |
| F13 | Copy-to-clipboard per artifact | Should have | Section 16.10 |
| F14 | Onboarding readiness score | Nice to have | Section 25 |

### Technical Requirements

| ID | Requirement | Priority |
|---|---|---|
| T1 | TypeScript strict mode throughout | Must have |
| T2 | Project state persisted in sessionStorage | Must have |
| T3 | No backend required for MVP (runs fully client-side except AI generation) | Must have |
| T4 | AI route handler handles missing API key gracefully | Must have |
| T5 | Vitest unit tests for engines and export logic | Should have |

### Data Requirements

| ID | Requirement | Priority |
|---|---|---|
| D1 | All 4 seed scenarios fully populated (workflows, systems, risks) | Must have |
| D2 | Fictional data only — no real customer PII | Must have |
| D3 | Scenarios validated against TypeScript types | Must have |

---

## Risk Categories (9)

- data_readiness
- integration
- security
- stakeholder_alignment
- operational_adoption
- model_quality
- timeline
- legal_procurement
- support_readiness

## Requirement Categories (9)

- functional
- technical
- data
- integration
- security
- compliance
- reporting
- support
- change_management
