import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { MdxTable } from "../../components/MdxTable";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { KeyRound, CreditCard } from "lucide-react";

const toc = [
  { id: "install", label: "Install", depth: 2 as const },
  { id: "quick-ref", label: "Quick reference", depth: 2 as const },
  { id: "auth", label: "Authentication", depth: 2 as const },
  { id: "running", label: "Running code", depth: 2 as const },
  { id: "inspect", label: "Inspecting executions", depth: 2 as const },
  { id: "recovery", label: "Recovery", depth: 2 as const },
  { id: "projects", label: "Projects and Automations", depth: 2 as const },
  { id: "env-vars", label: "Environment variables", depth: 2 as const },
];

export function SdkCli() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "SDK and CLI" },
        { label: "CLI reference" },
      ]}
      eyebrow="SDK and CLI"
      title="CLI reference"
      description="Commands for configuration, runs, traces, and platform workflows."
      toc={toc}
      complexity="intermediate"
      etaMinutes={6}
      prev={{ label: "Python SDK", to: "/docs/sdk/python-sdk" }}
      next={{ label: "omium.toml", to: "/docs/configuration/omium-toml" }}
    >
      <p>
        The <code>omium</code> CLI is the fastest way to authenticate, run
        scripts with tracing, inspect failures, and push projects to
        Automations.
      </p>

      <h2 id="install">Install</h2>
      <p>The CLI is installed with the Python package:</p>
      <CodeBlock
        lang="bash"
        code={`pip install omium
omium --version`}
      />

      <h2 id="quick-ref">Quick reference</h2>
      <MdxTable
        head={["Goal", "Command"]}
        rows={[
          ["Authenticate", <code>omium init</code>],
          ["Run a script", <code>omium run your_script.py</code>],
          ["List executions", <code>omium list</code>],
          ["Show one execution", <code>omium show &lt;execution_id&gt;</code>],
          ["Stream logs", <code>omium logs &lt;execution_id&gt;</code>],
          [
            "Replay",
            <code>
              omium replay &lt;execution_id&gt; [--checkpoint-id &lt;id&gt;]
            </code>,
          ],
          [
            "Create project scaffolding",
            <code>omium project init --name my-agent</code>,
          ],
          ["Push project to Automations", <code>omium project push</code>],
        ]}
      />

      <h2 id="auth">Authentication</h2>
      <h3 id="init">omium init</h3>
      <p>Interactive setup (recommended):</p>
      <CodeBlock lang="bash" code={`omium init`} />
      <p>If you need a non-interactive call (CI / scripting):</p>
      <CodeBlock
        lang="bash"
        code={`omium init --api-key omium_xxx --api-url https://api.omium.ai`}
      />

      <h2 id="running">Running code</h2>
      <h3 id="run">omium run</h3>
      <CodeBlock lang="bash" code={`omium run <script.py> [OPTIONS]`} />
      <p>Common flags:</p>
      <ul>
        <li>
          <code>--project &lt;name&gt;</code>: group runs under a project name
        </li>
        <li>
          <code>--env KEY=VALUE</code>: pass environment variables
          (repeatable)
        </li>
        <li>
          <code>--no-trace</code>: disable automatic tracing for a run
        </li>
        <li>
          <code>--execution-id &lt;id&gt;</code>: supply your own ID (useful
          for correlating with your systems)
        </li>
      </ul>
      <p>Example:</p>
      <CodeBlock
        lang="bash"
        code={`omium run my_agent.py --env OPENAI_API_KEY=sk-... --project my-agent`}
      />

      <h2 id="inspect">Inspecting executions</h2>
      <h3 id="list">omium list</h3>
      <CodeBlock lang="bash" code={`omium list --limit 20`} />
      <h3 id="show">omium show</h3>
      <CodeBlock lang="bash" code={`omium show exec_abc123`} />
      <h3 id="logs">omium logs</h3>
      <CodeBlock lang="bash" code={`omium logs exec_abc123`} />

      <h2 id="recovery">Recovery</h2>
      <h3 id="replay">omium replay</h3>
      <p>
        Replay an execution from the latest checkpoint (or a specific
        checkpoint):
      </p>
      <CodeBlock
        lang="bash"
        code={`omium replay exec_abc123
omium replay exec_abc123 --checkpoint-id cp_456`}
      />

      <h2 id="projects">Projects and Automations</h2>
      <p>
        Projects appear in{" "}
        <a href="/docs/platform/automations">Automations</a> after you push
        them.
      </p>
      <h3 id="project-init">omium project init</h3>
      <CodeBlock lang="bash" code={`omium project init --name my-agent`} />
      <h3 id="project-push">omium project push</h3>
      <CodeBlock lang="bash" code={`omium project push`} />
      <p>
        If your project doesn't appear, confirm your auth and API URL, then
        re-run <code>omium project push</code>.
      </p>

      <h2 id="env-vars">Environment variables</h2>
      <MdxTable
        head={["Variable", "Meaning"]}
        rows={[
          [<code>OMIUM_API_KEY</code>, "API key (overrides config file)"],
          [
            <code>OMIUM_API_URL</code>,
            <span>
              API host URL (e.g. <code>https://api.omium.ai</code>)
            </span>,
          ],
          [<code>OMIUM_DEBUG</code>, "Enable debug logging"],
        ]}
      />
      <p>
        See{" "}
        <a href="/docs/configuration/environment">Environment variables</a>{" "}
        for examples.
      </p>

      <DocCardGrid>
        <DocCard
          title="Configure"
          description="Where keys and config live, and how env overrides work."
          to="/docs/getting-started/configure"
          icon={KeyRound}
        />
        <DocCard
          title="API keys & billing"
          description="Review spend and manage keys in the dashboard."
          to="/docs/platform/api-keys-billing"
          icon={CreditCard}
        />
      </DocCardGrid>
    </DocLayout>
  );
}
