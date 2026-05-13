import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { Callout } from "../../components/Callout";
import { Network, Users, FolderOpen, Terminal } from "lucide-react";

const toc = [
  { id: "prereq", label: "Prerequisites", depth: 2 as const },
  { id: "install", label: "Step 1: Install", depth: 2 as const },
  { id: "auth", label: "Step 2: Authenticate", depth: 2 as const },
  { id: "script", label: "Step 3: Write a traced script", depth: 2 as const },
  { id: "run", label: "Step 4: Run it", depth: 2 as const },
  { id: "dashboard", label: "Step 5: See it in the dashboard", depth: 2 as const },
  { id: "next", label: "What's next", depth: 2 as const },
];

export function GettingStartedQuickstart() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Getting started" },
        { label: "Quickstart" },
      ]}
      eyebrow="Getting started"
      title="Quickstart"
      description="Run your first traced workflow in a few minutes."
      toc={toc}
      complexity="beginner"
      etaMinutes={5}
      prev={{ label: "Configure", to: "/docs/getting-started/configure" }}
      next={{
        label: "First project and Automations",
        to: "/docs/getting-started/first-project",
      }}
    >
      <p>
        This walk-through gets you from a clean machine to a real execution
        showing up in the Omium dashboard.
      </p>

      <h2 id="prereq">Prerequisites</h2>
      <ul>
        <li>
          <a href="/docs/getting-started/installation">Omium installed</a>{" "}
          (Python 3.9+)
        </li>
        <li>
          An API key from{" "}
          <a href="https://app.omium.ai" target="_blank" rel="noreferrer">
            app.omium.ai
          </a>
        </li>
      </ul>

      <h2 id="install">Step 1: Install</h2>
      <CodeBlock lang="bash" code={`pip install omium`} />

      <h2 id="auth">Step 2: Authenticate</h2>
      <p>
        Pick whichever path matches your environment. <em>Either</em>{" "}
        approach is sufficient — you don't need both.
      </p>
      <p>
        <strong>Workstation:</strong> save credentials via the CLI wizard:
      </p>
      <CodeBlock lang="bash" code={`omium init`} />
      <p>
        <strong>CI / Docker / scripted:</strong> use environment variables:
      </p>
      <CodeBlock
        lang="bash"
        code={`export OMIUM_API_KEY=om_your_key_here
export OMIUM_API_URL=https://api.omium.ai`}
      />
      <Callout variant="note">
        The Python SDK reads <code>OMIUM_API_KEY</code> / <code>OMIUM_API_URL</code>{" "}
        from the environment, not from the CLI's config file. To make the
        CLI's saved key available to <code>python script.py</code>, run via{" "}
        <code>omium run script.py</code> instead — the CLI will inject the
        credentials for you.
      </Callout>

      <h2 id="script">Step 3: Write a traced script</h2>
      <p>
        Create a file called <code>quickstart.py</code>:
      </p>
      <CodeBlock
        lang="python"
        filename="quickstart.py"
        code={`import omium

# Reads OMIUM_API_KEY / OMIUM_API_URL from the environment.
# (Or pass api_key="om_xxx" explicitly.)
omium.init(project="quickstart")


@omium.trace("greet")
def greet(name: str) -> str:
    return f"hello, {name}"


if __name__ == "__main__":
    print(greet("omium"))`}
      />
      <p>
        The <code>@omium.trace</code> decorator creates a span around the
        function. Auto-instrumentation also wires up LangGraph and CrewAI
        if those packages are importable at <code>init()</code> time.
      </p>

      <h2 id="run">Step 4: Run it</h2>
      <p>Pick whichever invocation matches how you authenticated in Step 2:</p>
      <CodeBlock
        lang="bash"
        code={`# Env vars set, or api_key passed inline:
python quickstart.py

# Or, let the CLI inject your saved credentials:
omium run quickstart.py --project quickstart`}
      />
      <p>Expected output:</p>
      <CodeBlock lang="bash" code={`hello, omium`} />

      <h2 id="dashboard">Step 5: See it in the dashboard</h2>
      <p>
        Open{" "}
        <a href="https://app.omium.ai" target="_blank" rel="noreferrer">
          app.omium.ai
        </a>
        . The run should appear within a few seconds under:
      </p>
      <ul>
        <li>
          <strong>Traces</strong> — every <code>@omium.trace</code> span
        </li>
        <li>
          <strong>Automations</strong> → the <code>quickstart</code> project
          once you push a project (see <em>First project</em> below)
        </li>
      </ul>
      <p>If nothing appears after a minute:</p>
      <ul>
        <li>
          Confirm the key is valid with <code>omium init</code> (or echo{" "}
          <code>OMIUM_API_KEY</code>)
        </li>
        <li>
          Confirm <code>OMIUM_API_URL</code> is{" "}
          <code>https://api.omium.ai</code> — not the staging URL or a stale
          tunnel
        </li>
        <li>
          Re-run with <code>OMIUM_DEBUG=true</code> to surface SDK-side
          errors
        </li>
      </ul>

      <h2 id="next">What's next</h2>
      <DocCardGrid>
        <DocCard
          title="LangGraph"
          description="Auto-instrument invoke(), ainvoke(), stream(), and astream()."
          to="/docs/build-with-omium/langgraph"
          icon={Network}
        />
        <DocCard
          title="CrewAI"
          description="Trace kickoff() and multi-agent runs."
          to="/docs/build-with-omium/crewai"
          icon={Users}
        />
        <DocCard
          title="First project"
          description="Push a project so it shows up under Automations in the app."
          to="/docs/getting-started/first-project"
          icon={FolderOpen}
        />
        <DocCard
          title="CLI reference"
          description="Inspect traces, replay failures, push projects, and more."
          to="/docs/sdk/cli"
          icon={Terminal}
        />
      </DocCardGrid>
    </DocLayout>
  );
}
