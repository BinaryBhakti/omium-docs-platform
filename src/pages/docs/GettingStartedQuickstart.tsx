import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { Network, Users, FolderOpen, Terminal } from "lucide-react";

const toc = [
  { id: "prereq", label: "Prerequisites", depth: 2 as const },
  { id: "install", label: "Step 1: Install", depth: 2 as const },
  { id: "auth", label: "Step 2: Authenticate", depth: 2 as const },
  { id: "script", label: "Step 3: Run a traced script", depth: 2 as const },
  { id: "dashboard", label: "Step 4: See it in the dashboard", depth: 2 as const },
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
        This tutorial gets you from "installed" to a real execution showing up
        in the dashboard.
      </p>

      <h2 id="prereq">Prerequisites</h2>
      <ul>
        <li>
          <a href="/docs/getting-started/installation">Install Omium</a>
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
      <p>If you're on a laptop, the fastest setup is:</p>
      <CodeBlock lang="bash" code={`omium init`} />
      <p>If you prefer environment variables:</p>
      <CodeBlock
        lang="bash"
        code={`export OMIUM_API_KEY=omium_your_key_here
export OMIUM_API_URL=https://api.omium.ai`}
      />

      <h2 id="script">Step 3: Run a minimal traced script</h2>
      <p>
        Create a file named <code>quickstart.py</code>:
      </p>
      <CodeBlock
        lang="python"
        filename="quickstart.py"
        code={`import omium

omium.init()  # reads ~/.omium/config.json or OMIUM_API_KEY/OMIUM_API_URL

@omium.trace("hello")
def hello(name: str) -> str:
    return f"hello, {name}"

if __name__ == "__main__":
    print(hello("omium"))`}
      />
      <p>Run it:</p>
      <CodeBlock lang="bash" code={`python quickstart.py`} />
      <p>Expected output:</p>
      <CodeBlock lang="bash" code={`hello, omium`} />

      <h2 id="dashboard">Step 4: See it in the dashboard</h2>
      <p>
        Open{" "}
        <a href="https://app.omium.ai" target="_blank" rel="noreferrer">
          app.omium.ai
        </a>{" "}
        and look for the execution under:
      </p>
      <ul>
        <li>
          <strong>Executions</strong>
        </li>
        <li>
          or your project area in <strong>Automations</strong> (once you start
          pushing projects)
        </li>
      </ul>
      <p>If you don't see it after a minute:</p>
      <ul>
        <li>
          confirm your key is valid (<code>omium init</code> again)
        </li>
        <li>
          confirm your API URL is <code>https://api.omium.ai</code>
        </li>
        <li>check network access from your machine</li>
      </ul>

      <h2 id="next">What's next</h2>
      <DocCardGrid>
        <DocCard
          title="LangGraph"
          description="Auto-instrument LangGraph calls like invoke() and stream()."
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
          description="Push a project so it appears as an Automation in the app."
          to="/docs/getting-started/first-project"
          icon={FolderOpen}
        />
        <DocCard
          title="CLI reference"
          description="Inspect executions, stream logs, replay, and more."
          to="/docs/sdk/cli"
          icon={Terminal}
        />
      </DocCardGrid>
    </DocLayout>
  );
}
