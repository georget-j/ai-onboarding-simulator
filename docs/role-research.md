# Role Research — Forward-Deployed & Solutions Engineering Roles

> Research basis for product requirements. Sources: YC job boards (May 2026) + seeded role patterns.

---

## 1. Forward-Deployed Engineer

**Representative companies:** Capitol AI, Dime (YC)

**Key responsibilities:**
- Partner with enterprise clients to understand data landscape, business objectives, and technical constraints
- Translate institutional requirements into governed AI deployments
- Design and deploy AI applications into mission-critical workflows
- Build connectors, data pipelines, custom integrations, and customer-specific workflows
- Prototype use cases using LLMs, RAG, or agent orchestration
- Serve as trusted technical advisor across pilots, integrations, and production deployments
- Feed frontline customer insights back to product and engineering teams
- Create reusable implementation playbooks and best practices

**Skills implied:**
- Customer discovery and requirements gathering
- System integration and API planning
- LLM / RAG / agent prototyping
- Implementation documentation
- Product feedback loops

**Product requirements derived:**
- Discovery capture with business problem, workflow, constraints, and technical maturity
- Data source and systems mapping with API availability and integration complexity
- Engineering handoff section ("What Engineering Needs To Know")
- Reusable implementation playbooks (exportable Markdown)
- Product feedback memo as a core output

**How the simulator demonstrates these skills:**
- Discovery form captures all required context
- Systems mapper captures API availability, data sensitivity, and integration complexity
- Engineering handoff artifact generated from project state
- Markdown export serves as the reusable playbook
- Product feedback memo captures workflow patterns and capability gaps

---

## 2. Solutions Engineer

**Representative companies:** TrueClaim, Taktile (YC)

**Key responsibilities:**
- Sit at the intersection of product, engineering, and customer success
- Translate customer needs into technical solutions
- Debug technical/product issues and manage technical requests
- Configure platform for specific customer use cases
- Build lightweight features or integrations to unblock customers
- Join customer calls and manage external Slack/email channels
- Translate customer feedback into product and engineering changes

**Skills implied:**
- Customer-facing technical communication
- Requirements classification
- Configuration and customisation planning
- Issue categorisation and escalation
- Product feedback translation

**Product requirements derived:**
- Requirements matrix grouped by category (functional, technical, integration, etc.)
- Missing information log for unknown constraints and decisions needed
- Customer communication templates (kickoff, status, escalation)
- "What Engineering Needs To Know" section for technical handoffs

**How the simulator demonstrates these skills:**
- Requirements engine auto-classifies requirements by category and priority
- Missing info log flags unknown constraints and required decisions
- Customer communication section generates kickoff email, status update, and escalation draft
- Engineering handoff connects customer needs to technical implementation

---

## 3. Deployment Strategist

**Representative companies:** Luminai (YC)

**Key responsibilities:**
- Own deployments from post-sale handoff through launch and stabilisation
- Understand customer workflows, constraints, and operating models
- Translate requirements into execution plans, timelines, and success criteria
- Coordinate product, engineering, customer, IT, operations, and leadership stakeholders
- Identify patterns across deployments and feed insights into product abstractions
- Manage risks and escalations
- Run communication cadences, milestones, and status updates

**Skills implied:**
- Project and program management
- Stakeholder coordination (RACI, influence mapping)
- Risk management and escalation planning
- Milestone and timeline planning
- Deployment governance

**Product requirements derived:**
- Implementation plan with phases, tasks, owners, and timelines
- Risk register with severity, likelihood, mitigation, and escalation triggers
- Stakeholder map with influence levels and required actions
- Workspace completion checklist and status tracking
- Pilot success plan with launch criteria and rollback criteria

**How the simulator demonstrates these skills:**
- Implementation plan generated from workflow and systems state
- Risk register auto-generated with 9 risk categories
- Stakeholder section captures sponsor, decision-maker, technical owner, and end user
- Workspace dashboard shows status and next recommended action
- Pilot plan builder includes launch and rollback criteria

---

## 4. Technical Customer Success / AI Deployment Lead

**Representative companies:** Aviary AI, Netomi (YC)

**Key responsibilities:**
- Educate customers on AI products
- Help customers integrate product into support, sales, operations, or compliance workflows
- Customise configurations to fit customer workflows and tone
- Support initial setup and deployment
- Provide technical guidance on APIs, conversation flows, model configuration, and troubleshooting
- Monitor KPIs: response accuracy, customer satisfaction, response times, conversion rates, adoption
- Identify at-risk customers and propose onboarding improvements

**Skills implied:**
- KPI definition and measurement planning
- Configuration and customisation guidance
- Adoption risk identification
- Customer education asset creation
- Technical onboarding management

**Product requirements derived:**
- Pilot success plan with explicit KPIs, baselines, targets, and measurement methods
- Risk register covering operational adoption and support readiness categories
- Data readiness assessment artifact
- Missing information log covers unknown success metrics

**How the simulator demonstrates these skills:**
- Pilot plan builder captures success metrics with baseline, target, and measurement method
- Risk register includes operational_adoption and support_readiness categories
- Data readiness assessment generates from data source quality inputs
- Missing info flags when success metrics are undefined

---

## 5. Deployed Agent / AI Workflow Orchestrator

**Representative companies:** Vulcan Technologies (YC)

**Key responsibilities:**
- Embed with customers to understand workflow and deployment constraints
- Build demos, prototypes, automations, integrations, and agent workflows
- Partner with founders on technical sales, discovery, pilots, procurement, and expansion
- Translate customer needs into product requirements
- Ship missing pieces quickly
- Work across enterprise, government, legal, regulatory, or procurement-heavy environments

**Skills implied:**
- Embedded customer work
- Rapid prototyping and demo building
- Procurement and security constraint navigation
- Agent workflow design
- Expansion opportunity identification

**Product requirements derived:**
- Recommended prototype scope in the engineering handoff
- Automation potential captured per workflow step
- Future-state classification (human_led, ai_assisted, automated, requires_approval)
- Risk categories for legal_procurement and security
- Product feedback memo captures expansion opportunities

**How the simulator demonstrates these skills:**
- Each workflow step captures automation potential and future state
- Engineering handoff includes recommended prototype scope
- Risk register covers legal_procurement category
- Systems mapper captures security/compliance constraints
- Product feedback memo captures missing capability patterns

---

## Feature-to-Role Mapping Summary

| Feature | FDE | SE | DS | TCS | Agent |
|---|:---:|:---:|:---:|:---:|:---:|
| Customer discovery form | ✓ | ✓ | ✓ | ✓ | ✓ |
| Workflow builder | ✓ | | ✓ | ✓ | ✓ |
| Systems + data mapper | ✓ | ✓ | | ✓ | ✓ |
| Requirements matrix | ✓ | ✓ | ✓ | | |
| Missing information log | ✓ | ✓ | ✓ | ✓ | |
| Risk register | ✓ | | ✓ | ✓ | ✓ |
| Pilot success plan | ✓ | | ✓ | ✓ | |
| Engineering handoff | ✓ | ✓ | | | ✓ |
| Implementation plan | ✓ | | ✓ | | |
| Customer communication | | ✓ | ✓ | ✓ | |
| Product feedback memo | ✓ | ✓ | ✓ | | ✓ |
| Markdown export | ✓ | ✓ | ✓ | ✓ | ✓ |
