# Evaluation — Manual QA Checklist

> Use this checklist before any demo or deployment.

---

## Scenario Loading

- [ ] All 4 scenarios load without errors
- [ ] Each scenario populates discovery, workflows, systems, data sources, stakeholders, and risks
- [ ] Scenario data matches the TypeScript type shapes exactly
- [ ] Custom blank project initialises with empty state correctly

---

## Discovery Form

- [ ] All CustomerProfile fields pre-populate from scenario JSON
- [ ] All DiscoveryInput fields pre-populate from scenario JSON
- [ ] Editing a field persists to sessionStorage
- [ ] Refreshing the page restores the edited state
- [ ] Regulatory context multi-select works

---

## Workflow Builder

- [ ] All pre-seeded workflow steps display correctly
- [ ] Add step creates a new step with empty defaults
- [ ] Edit step updates the step in state
- [ ] Delete step removes it from the list
- [ ] Future-state badge displays the correct colour for each value
- [ ] Automation potential is captured per step

---

## Systems and Data Mapper

- [ ] Systems table shows all pre-seeded systems
- [ ] Data sources table shows all pre-seeded data sources
- [ ] Systems with `apiAvailable = false` are visually highlighted
- [ ] Data sources with `accessStatus = blocked` are visually highlighted
- [ ] Add/edit/delete works for both tables

---

## Requirements Engine

- [ ] Fintech AML scenario generates security and compliance requirements
- [ ] System with `apiAvailable = false` generates an integration requirement (must_have)
- [ ] Data source with `quality = poor` generates a data requirement
- [ ] Data source with `pii = true` generates a security requirement
- [ ] `regulatoryContext` non-empty generates a compliance requirement
- [ ] Requirements are grouped by category in the UI
- [ ] Requirements can be filtered by priority

---

## Missing Information Log

- [ ] System with `accessMethod = unknown` creates a missing info flag
- [ ] Data source with `accessStatus = unknown` creates a missing info flag
- [ ] Workflow step missing `currentSystem` creates a missing info flag
- [ ] No pilot plan defined creates a missing info flag
- [ ] No stakeholders defined creates a missing info flag
- [ ] Each item shows owner and "why it matters"

---

## Risk Register

- [ ] Fintech AML scenario generates model explainability and audit trail risks
- [ ] Legaltech scenario generates hallucination and privilege risks
- [ ] System with `apiAvailable = false` generates an integration risk
- [ ] Data source with `dataSensitivity = regulated` generates a security risk
- [ ] Risk severity × likelihood produces correct visual coding
- [ ] Risk status can be updated (open / mitigating / resolved / accepted)
- [ ] Escalation trigger is captured per risk

---

## Pilot Plan Builder

- [ ] All PilotPlan fields are editable
- [ ] Success metrics table allows add/edit/delete
- [ ] Launch criteria and rollback criteria are captured as lists
- [ ] Duration in weeks is numeric input

---

## AI Artifact Generation

- [ ] With OPENAI_API_KEY: generates all 15 artifacts without error
- [ ] Without OPENAI_API_KEY: returns deterministic template-filled artifacts without error
- [ ] Generated artifacts are stored in sessionStorage
- [ ] Re-generating replaces previous artifacts

---

## Output Artifact Viewer

- [ ] All 15 artifact tabs display correctly
- [ ] Each tab renders Markdown correctly
- [ ] Copy-to-clipboard works per tab
- [ ] Artifacts load without flicker

---

## Markdown Export

- [ ] Export button downloads a `.md` file
- [ ] File is named `[customer-name]-onboarding-pack.md`
- [ ] File contains all 16 required sections:
  - [ ] Executive Summary
  - [ ] Customer Context
  - [ ] Business Problem
  - [ ] Current-State Workflow
  - [ ] Future-State Workflow
  - [ ] Systems and Data Sources
  - [ ] Requirements Matrix
  - [ ] Missing Information
  - [ ] Integration and API Plan
  - [ ] Data Readiness Assessment
  - [ ] Risk Register
  - [ ] Pilot Success Plan
  - [ ] Engineering Handoff
  - [ ] Product Feedback Memo
  - [ ] Customer Communication Plan
  - [ ] Next Actions

---

## Cross-Scenario Checks

| Check | Fintech AML | Legaltech | Hardware | Insurance |
|---|:---:|:---:|:---:|:---:|
| Loads without error | | | | |
| Discovery pre-filled | | | | |
| Workflows visible | | | | |
| Systems mapped | | | | |
| Risks auto-generated | | | | |
| Scenario-specific risks present | | | | |
| Markdown export works | | | | |

---

## Known Issues / Limitations

- State lives in sessionStorage — clearing browser storage loses the project
- AI generation requires OpenAI API key — note in demo
- No multi-tab support — opening two workspaces in same browser may conflict
