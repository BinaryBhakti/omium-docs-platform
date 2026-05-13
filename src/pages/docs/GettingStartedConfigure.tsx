import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout } from "../../components/Callout";
import { Tabs } from "../../components/Tabs";
import { MdxTable } from "../../components/MdxTable";

const toc = [
  { id: "create-key", label: "Create an API key", depth: 2 as const },
  { id: "cli-config", label: "Configure the CLI", depth: 2 as const },
  { id: "config-location", label: "Where config is stored", depth: 2 as const },
  { id: "sdk-config", label: "Configure the SDK", depth: 2 as const },
  { id: "env-vars", label: "Environment variables", depth: 2 as const },
  { id: "next", label: "Next step", depth: 2 as const },
];

export function GettingStartedConfigure() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Getting started" },
        { label: "API keys and CLI configuration" },
      ]}
      eyebrow="Getting started"
      title="API keys and CLI configuration"
      description="Authenticate the CLI and SDK with the Omium platform."
      toc={toc}
      complexity="beginner"
      etaMinutes={3}
      prev={{ label: "Installation", to: "/docs/getting-started/installation" }}
      next={{ label: "Quickstart", to: "/docs/getting-started/quickstart" }}
    >
      <h2 id="create-key">1) Create an API key</h2>
      <ol>
        <li>
          Sign in at{" "}
          <a href="https://app.omium.ai" target="_blank" rel="noreferrer">
            app.omium.ai
          </a>
        </li>
        <li>
          Open <strong>Settings → API Keys</strong>
        </li>
        <li>Create a key and copy it before leaving the page</li>
      </ol>
      <p>
        Omium accepts keys with either prefix: <code>om_…</code> or{" "}
        <code>omium_…</code>. Both formats are valid. Treat them like
        passwords — never commit them to version control.
      </p>

      <h2 id="cli-config">2) Configure the CLI</h2>
      <p>
        The fastest path on a workstation is the interactive setup. It
        prompts for your key, sanity-checks the format, and writes config to
        disk so the CLI doesn't ask again.
      </p>
      <CodeBlock lang="bash" code={`omium init`} />
      <p>You'll be prompted for:</p>
      <ul>
        <li>
          <strong>API key</strong> — paste the value from the dashboard
        </li>
        <li>
          <strong>API URL</strong> — accept the default{" "}
          <code>https://api.omium.ai</code> for hosted Omium
        </li>
      </ul>
      <p>For non-interactive setup (CI runners, Dockerfiles, scripted bootstrap):</p>
      <CodeBlock
        lang="bash"
        code={`omium init --api-key om_xxx --api-url https://api.omium.ai`}
      />
      <Callout variant="tip">
        Pass the base URL (<code>https://api.omium.ai</code>) — not{" "}
        <code>https://api.omium.ai/api/v1</code>. The CLI appends{" "}
        <code>/api/v1</code> when calling endpoints.
      </Callout>

      <h2 id="config-location">3) Where config is stored</h2>
      <p>
        After <code>omium init</code>, configuration is written to:
      </p>
      <ul>
        <li>
          macOS / Linux: <code>~/.omium/config.json</code>
        </li>
        <li>
          Windows: <code>%USERPROFILE%\.omium\config.json</code>
        </li>
      </ul>
      <p>
        Use <code>omium configure --api-key …</code> to update specific fields
        without re-running the full wizard.
      </p>

      <h2 id="sdk-config">4) Configure the SDK</h2>
      <p>
        The Python SDK does <strong>not</strong> read the CLI's config file
        automatically. It reads configuration from, in order of precedence:
      </p>
      <ol>
        <li>Keyword arguments to <code>omium.init(...)</code></li>
        <li>Environment variables (<code>OMIUM_API_KEY</code> etc.)</li>
      </ol>
      <p>
        There are two common patterns. Pick whichever fits your deployment
        story:
      </p>
      <Tabs
        tabs={[
          {
            title: "Env vars (recommended for prod / CI)",
            content: (
              <>
                <p style={{ padding: "0 12px" }}>
                  Set the variables once, then call <code>omium.init()</code>{" "}
                  with no arguments:
                </p>
                <CodeBlock
                  lang="python"
                  code={`import omium

# OMIUM_API_KEY and OMIUM_API_URL must be set in the process environment.
omium.init(project="my-agent")`}
                />
              </>
            ),
          },
          {
            title: "Inline kwargs (laptops, notebooks)",
            content: (
              <CodeBlock
                lang="python"
                code={`import omium

omium.init(
    api_key="om_xxx",
    project="my-agent",
)`}
              />
            ),
          },
          {
            title: "omium run (lets the CLI inject env)",
            content: (
              <>
                <p style={{ padding: "0 12px" }}>
                  Running your script through the CLI inherits the saved
                  config — your script just calls <code>omium.init()</code>:
                </p>
                <CodeBlock lang="bash" code={`omium run quickstart.py --project my-agent`} />
              </>
            ),
          },
        ]}
      />

      <h2 id="env-vars">5) Environment variables</h2>
      <p>
        Environment variables are the most common production pattern. Set
        them in your CI secrets, your Docker runtime, or your local shell
        profile.
      </p>
      <Tabs
        tabs={[
          {
            title: "macOS / Linux",
            content: (
              <CodeBlock
                lang="bash"
                code={`export OMIUM_API_KEY=om_your_key_here
export OMIUM_API_URL=https://api.omium.ai`}
              />
            ),
          },
          {
            title: "Windows (PowerShell)",
            content: (
              <CodeBlock
                lang="bash"
                code={`$env:OMIUM_API_KEY = "om_your_key_here"
$env:OMIUM_API_URL = "https://api.omium.ai"`}
              />
            ),
          },
        ]}
      />
      <p>The variables Omium reads at SDK startup:</p>
      <MdxTable
        head={["Variable", "Purpose"]}
        rows={[
          [<code>OMIUM_API_KEY</code>, "API key. Required if not passed to init()."],
          [
            <code>OMIUM_API_URL</code>,
            <span>
              Base URL of the API. Defaults to <code>https://api.omium.ai</code>.
            </span>,
          ],
          [<code>OMIUM_PROJECT</code>, "Default project name for traces."],
          [<code>OMIUM_DEBUG</code>, <span>Set to <code>true</code> for verbose SDK logs.</span>],
          [
            <code>OMIUM_TRACING</code>,
            <span>
              Set to <code>false</code> to disable auto-tracing without
              touching code.
            </span>,
          ],
          [
            <code>OMIUM_CHECKPOINTS</code>,
            <span>
              Set to <code>false</code> to disable auto-checkpointing.
            </span>,
          ],
        ]}
      />

      <h2 id="next">6) Next step</h2>
      <p>Run your first traced workflow:</p>
      <ul>
        <li>
          <a href="/docs/getting-started/quickstart">Quickstart</a>
        </li>
      </ul>
    </DocLayout>
  );
}
