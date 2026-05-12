import { DocLayout } from "../../components/DocLayout";
import { MdxTable } from "../../components/MdxTable";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { Code, Webhook, Terminal, LayoutDashboard } from "lucide-react";

const toc = [
  { id: "labels", label: "How features are described here", depth: 2 as const },
  { id: "observability", label: "Observability", depth: 2 as const },
  { id: "reliability", label: "Reliability", depth: 2 as const },
  { id: "projects", label: "Projects and workflows", depth: 2 as const },
  { id: "accounts", label: "Accounts and spend", depth: 2 as const },
  { id: "choose", label: "Choose your path", depth: 2 as const },
];

export function BuildOverview() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Build with Omium" },
        { label: "Platform capabilities" },
      ]}
      eyebrow="Build with Omium"
      title="Platform capabilities"
      description="How tracing, checkpoints, workflows, and the dashboard fit together."
      toc={toc}
      complexity="intermediate"
      etaMinutes={6}
      prev={{
        label: "First project",
        to: "/docs/getting-started/first-project",
      }}
      next={{ label: "LangGraph", to: "/docs/build-with-omium/langgraph" }}
    >
      <p>
        If you are new, skim this page once, then follow{" "}
        <a href="/docs/getting-started/quickstart">Quickstart</a>. Come back
        here when you need a map from <strong>feature → doc → surface</strong>{" "}
        (API, SDK, or dashboard).
      </p>

      <h2 id="labels">How features are described here</h2>
      <p>
        Some capabilities ship today; others may be labelled before they reach
        everyone's account. When in doubt, the dashboard and{" "}
        <code>omium --version</code> are the source of truth for what your org
        can use.
      </p>
      <MdxTable
        head={["Label", "Meaning"]}
        rows={[
          [
            <strong>Generally available</strong>,
            "Safe for production; stable in the SDK, CLI, and API.",
          ],
          [
            <strong>Beta</strong>,
            "Expect changes; we may gate access or adjust behaviour as we learn.",
          ],
          [
            <strong>Coming soon</strong>,
            "Documented early so you can plan; not wired up for every tenant yet.",
          ],
        ]}
      />

      <h2 id="observability">Observability</h2>
      <p>Understand what your agents did, in one place.</p>
      <MdxTable
        head={["Capability", "What it does", "Doc", "Surfaces"]}
        rows={[
          [
            "Execution history",
            "Each run gets an ID, status, and timeline.",
            <a href="/docs/api/executions">Executions API</a>,
            <span>
              Dashboard, CLI <code>omium list</code>
            </span>,
          ],
          [
            "Traces",
            "Step-level detail for instrumented frameworks.",
            <a href="/docs/build-with-omium/langgraph">LangGraph</a>,
            "Dashboard",
          ],
          [
            "Logs",
            "Stream output while a run is live.",
            <a href="/docs/sdk/cli">CLI</a>,
            <span>
              CLI <code>omium logs</code>
            </span>,
          ],
        ]}
      />

      <h2 id="reliability">Reliability</h2>
      <p>Recover without rewriting your graph or crew.</p>
      <MdxTable
        head={["Capability", "What it does", "Doc", "Surfaces"]}
        rows={[
          [
            "Checkpoints",
            "Persist machine-readable state at safe points.",
            <a href="/docs/api/checkpoints">Checkpoints API</a>,
            "Dashboard, CLI",
          ],
          [
            "Replay",
            "Continue from a checkpoint after failure.",
            <a href="/docs/api/executions">Executions API</a>,
            "Dashboard",
          ],
          [
            "Failure surfacing",
            "See what broke and where.",
            <a href="/docs/api/failures">Failures API</a>,
            "Dashboard, CLI",
          ],
        ]}
      />

      <h2 id="projects">Projects and workflows</h2>
      <p>Connect your repo to the hosted Automations experience.</p>
      <MdxTable
        head={["Capability", "What it does", "Doc", "Surfaces"]}
        rows={[
          [
            <code>omium.toml</code>,
            "Names your project and default execution endpoints.",
            <a href="/docs/configuration/omium-toml">omium.toml</a>,
            "Local CLI",
          ],
          [
            "Project push",
            "Sync definitions to the cloud.",
            <a href="/docs/getting-started/first-project">First project</a>,
            <code>omium project push</code>,
          ],
          [
            "Workflow registry",
            "HTTP CRUD for workflow metadata.",
            <a href="/docs/api/workflows">Workflows API</a>,
            <a href="/docs/platform/automations">Automations</a>,
          ],
        ]}
      />

      <h2 id="accounts">Accounts and spend</h2>
      <MdxTable
        head={["Capability", "What it does", "Doc", "Surfaces"]}
        rows={[
          [
            "API keys",
            "Authenticate CLI, SDK, and HTTP.",
            <a href="/docs/getting-started/configure">Configure</a>,
            "Dashboard",
          ],
          [
            "Usage & credits",
            "See consumption and balance.",
            <a href="/docs/api/billing">Billing API</a>,
            "Dashboard",
          ],
        ]}
      />

      <h2 id="choose">Choose your path</h2>
      <DocCardGrid>
        <DocCard
          title="Python SDK"
          description="Instrument LangGraph, CrewAI, or use decorators on your own functions."
          to="/docs/sdk/python-sdk"
          icon={Code}
        />
        <DocCard
          title="REST API"
          description="Integrate from any language using HTTP."
          to="/docs/api/overview"
          icon={Webhook}
        />
        <DocCard
          title="CLI"
          description="Configure, run scripts, inspect executions, and push projects."
          to="/docs/sdk/cli"
          icon={Terminal}
        />
        <DocCard
          title="Automations"
          description="See projects, health, and cost in the app."
          to="/docs/platform/automations"
          icon={LayoutDashboard}
        />
      </DocCardGrid>
    </DocLayout>
  );
}
