import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout } from "../../components/Callout";
import { MdxTable } from "../../components/MdxTable";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { KeyRound, CreditCard } from "lucide-react";

const toc = [
  { id: "install", label: "Install and version", depth: 2 as const },
  { id: "quick-ref", label: "Quick reference", depth: 2 as const },
  { id: "auth", label: "Authentication", depth: 2 as const },
  { id: "running", label: "Running code", depth: 2 as const },
  { id: "traces", label: "Traces", depth: 2 as const },
  { id: "failures", label: "Failures", depth: 2 as const },
  { id: "scores", label: "Scores", depth: 2 as const },
  { id: "analytics", label: "Analytics and billing", depth: 2 as const },
  { id: "projects", label: "Projects and Automations", depth: 2 as const },
  { id: "checkpoints", label: "Checkpoints and replay", depth: 2 as const },
  { id: "templates", label: "Workflow templates", depth: 2 as const },
  { id: "export", label: "Export to JSON", depth: 2 as const },
  { id: "extras", label: "TUI, chat, completions", depth: 2 as const },
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
      description="Every omium command, grouped by what it lets you do."
      toc={toc}
      complexity="intermediate"
      etaMinutes={9}
      prev={{ label: "Python SDK", to: "/docs/sdk/python-sdk" }}
      next={{ label: "omium.toml", to: "/docs/configuration/omium-toml" }}
    >
      <p>
        The <code>omium</code> CLI is the day-to-day tool for authentication,
        running scripts with tracing, inspecting platform data, and pushing
        projects to Automations. Every command takes <code>--help</code>.
      </p>

      <h2 id="install">Install and version</h2>
      <p>The CLI ships with the Python package:</p>
      <CodeBlock
        lang="bash"
        code={`pip install omium
omium --version`}
      />

      <h2 id="quick-ref">Quick reference</h2>
      <MdxTable
        head={["Goal", "Command"]}
        rows={[
          ["Authenticate (wizard)", <code>omium init</code>],
          ["Update one setting", <code>omium configure --api-key …</code>],
          ["Run a Python script", <code>omium run script.py</code>],
          [
            "Run a JSON workflow (legacy)",
            <code>omium run workflow.json</code>,
          ],
          ["Inspect traces", <code>omium traces list</code>],
          ["Inspect failures", <code>omium failures list</code>],
          [
            "Replay from a checkpoint",
            <code>omium replay &lt;execution_id&gt;</code>,
          ],
          [
            "Scaffold a project",
            <code>omium project init --name my-agent</code>,
          ],
          ["Push project to Automations", <code>omium project push</code>],
          ["Open the live TUI", <code>omium tui</code>],
        ]}
      />

      <h2 id="auth">Authentication</h2>
      <h3 id="init">omium init</h3>
      <p>
        Interactive setup wizard. Prompts for API key and API URL, verifies
        the key against the platform, and writes <code>~/.omium/config.json</code>.
      </p>
      <CodeBlock
        lang="bash"
        code={`omium init                                  # interactive
omium init --api-key om_xxx --api-url https://api.omium.ai
omium init --api-key om_xxx --skip-verify   # skip the API round-trip`}
      />
      <h3 id="configure">omium configure</h3>
      <p>Non-interactive update for individual settings.</p>
      <CodeBlock
        lang="bash"
        code={`omium configure --api-key om_xxx
omium configure --api-url https://api.omium.ai
omium configure --region us-east-1
omium configure --interactive               # walk through every field`}
      />
      <Callout variant="tip">
        Pass the base URL (<code>https://api.omium.ai</code>) — not{" "}
        <code>…/api/v1</code>. The CLI appends the path internally.
      </Callout>

      <h2 id="running">Running code</h2>
      <h3 id="run">omium run</h3>
      <p>
        Runs a Python script (recommended) or legacy JSON workflow with the
        saved credentials injected as environment variables.
      </p>
      <CodeBlock
        lang="bash"
        code={`omium run <script.py | workflow.json> [-- script_args...] [OPTIONS]`}
      />
      <MdxTable
        head={["Flag", "Meaning"]}
        rows={[
          [<code>--project, -p &lt;name&gt;</code>, "Group the run's traces under a project."],
          [
            <code>--env, -e KEY=VALUE</code>,
            "Inject env vars into the child process. Repeatable.",
          ],
          [<code>--no-trace</code>, "Skip auto-instrumentation for this run."],
          [
            <code>--execution-id &lt;id&gt;</code>,
            "Supply your own ID for correlation. Auto-generated otherwise.",
          ],
          [
            <code>--execution-engine-url</code>,
            "Override the local Execution Engine endpoint (JSON workflows).",
          ],
          [
            <code>--checkpoint-manager</code>,
            <span>
              Checkpoint Manager gRPC URL (default <code>localhost:7001</code>).
            </span>,
          ],
        ]}
      />
      <CodeBlock
        lang="bash"
        code={`omium run my_agent.py --project my-agent --env OPENAI_API_KEY=sk-...
omium run my_agent.py -- --topic "agents in production"`}
      />

      <h2 id="traces">Traces</h2>
      <p>
        The <code>traces</code> group inspects ingested spans for the
        configured tenant.
      </p>
      <CodeBlock
        lang="bash"
        code={`omium traces projects [--limit N]
omium traces list [--project NAME] [--execution-id ID] [--span-name NAME]
omium traces show <trace_id>`}
      />

      <h2 id="failures">Failures</h2>
      <p>Errors surfaced by trace ingestion or runtime exceptions.</p>
      <CodeBlock
        lang="bash"
        code={`omium failures list [--limit N]
omium failures show <execution_id>`}
      />

      <h2 id="scores">Scores</h2>
      <p>
        Attach evaluation scores to a trace or span for offline eval and
        regression dashboards.
      </p>
      <CodeBlock
        lang="bash"
        code={`omium scores create --trace-id tr_xxx --name accuracy --value 0.92 \\
    [--span-id sp_xxx] [--comment "missed one edge case"]
omium scores list [--trace-id tr_xxx] [--name accuracy] [--limit N]`}
      />

      <h2 id="analytics">Analytics and billing</h2>
      <CodeBlock
        lang="bash"
        code={`omium analytics latency [--project NAME]
omium analytics errors  [--project NAME]
omium analytics summary

omium billing balance
omium billing usage [--limit N]`}
      />

      <h2 id="projects">Projects and Automations</h2>
      <p>
        Projects are how workflows show up under{" "}
        <a href="/docs/platform/automations">Automations</a>.
      </p>
      <CodeBlock
        lang="bash"
        code={`omium project init --name my-agent [--dir ./services/agent]
omium project info                # show parsed omium.toml
omium project workflows           # list workflows declared in the project
omium project push [--create]     # sync to the dashboard`}
      />
      <p>
        If a push silently 404s, re-run with <code>--create</code> — the
        project doesn't exist yet on the platform.
      </p>

      <h2 id="checkpoints">Checkpoints and replay</h2>
      <CodeBlock
        lang="bash"
        code={`omium checkpoints list <execution_id> [--checkpoint-manager localhost:7001]
omium replay <execution_id> [--checkpoint-id <id>] \\
    [--execution-engine-url URL] [--checkpoint-manager URL]`}
      />
      <p>
        Without <code>--checkpoint-id</code> the latest checkpoint for the
        execution is used.
      </p>

      <h2 id="templates">Workflow templates</h2>
      <p>Scaffold runnable starter files:</p>
      <CodeBlock
        lang="bash"
        code={`omium new --template langgraph --name my-agent --output my-agent.json
omium init-workflow --type crewai --name my-crew --output workflow.json`}
      />

      <h2 id="export">Export to JSON</h2>
      <p>
        Convert an existing CrewAI or LangGraph script into the platform's
        JSON workflow definition.
      </p>
      <CodeBlock
        lang="bash"
        code={`omium export-crew crew_module.py        --output my-crew.json
omium export-langgraph graph_module.py  --output my-graph.json`}
      />

      <h2 id="extras">TUI, chat, and shell completions</h2>
      <CodeBlock
        lang="bash"
        code={`omium tui                # interactive terminal UI for live executions
omium chat               # conversational helper for building workflows
omium completions bash   # bash | zsh | fish | powershell`}
      />

      <h2 id="env-vars">Environment variables</h2>
      <MdxTable
        head={["Variable", "Effect"]}
        rows={[
          [
            <code>OMIUM_API_KEY</code>,
            "API key. Overrides the value in ~/.omium/config.json.",
          ],
          [
            <code>OMIUM_API_URL</code>,
            <span>
              API base URL. Defaults to <code>https://api.omium.ai</code>.
            </span>,
          ],
          [<code>OMIUM_PROJECT</code>, "Default project name."],
          [<code>OMIUM_DEBUG</code>, <span>Set <code>true</code> for verbose CLI/SDK logs.</span>],
          [
            <code>OMIUM_TRACING</code>,
            <span>Set <code>false</code> to disable auto-tracing globally.</span>,
          ],
          [
            <code>OMIUM_CHECKPOINTS</code>,
            <span>Set <code>false</code> to disable auto-checkpointing.</span>,
          ],
          [
            <code>OMIUM_SKIP_WORKFLOW_REGISTER</code>,
            "Skip auto-registering the workflow on init (useful when the API is unreachable).",
          ],
        ]}
      />
      <p>
        For full examples see{" "}
        <a href="/docs/configuration/environment">Environment variables</a>.
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
