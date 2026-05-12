import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout } from "../../components/Callout";
import { Tabs } from "../../components/Tabs";

const toc = [
  { id: "create-key", label: "Create an API key", depth: 2 as const },
  { id: "cli-config", label: "Configure the CLI", depth: 2 as const },
  { id: "config-location", label: "Where config is stored", depth: 2 as const },
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
          Open <strong>API Keys</strong> (or{" "}
          <strong>Settings → API Keys</strong>)
        </li>
        <li>Create a key and copy it</li>
      </ol>
      <p>
        Keys look like <code>omium_...</code>. Treat them like passwords.
      </p>

      <h2 id="cli-config">2) Configure the CLI (recommended)</h2>
      <p>
        Run the interactive setup once. It verifies your key and stores config
        locally.
      </p>
      <CodeBlock lang="bash" code={`omium init`} />
      <p>You'll be prompted for:</p>
      <ul>
        <li>
          <strong>API key</strong>
        </li>
        <li>
          <strong>API URL</strong> (use <code>https://api.omium.ai</code> for
          hosted Omium)
        </li>
      </ul>
      <Callout variant="tip">
        Do not add <code>/api/v1</code> to the API URL in the CLI. The CLI
        appends it when calling endpoints.
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

      <h2 id="env-vars">4) Environment variables (CI-friendly)</h2>
      <p>
        Environment variables override the config file. This is the preferred
        pattern for CI/CD and servers.
      </p>
      <Tabs
        tabs={[
          {
            title: "macOS / Linux",
            content: (
              <CodeBlock
                lang="bash"
                code={`export OMIUM_API_KEY=omium_your_key_here
export OMIUM_API_URL=https://api.omium.ai`}
              />
            ),
          },
          {
            title: "Windows (PowerShell)",
            content: (
              <CodeBlock
                lang="bash"
                code={`$env:OMIUM_API_KEY = "omium_your_key_here"
$env:OMIUM_API_URL = "https://api.omium.ai"`}
              />
            ),
          },
        ]}
      />

      <h2 id="next">5) Next step</h2>
      <p>Run your first workflow locally:</p>
      <ul>
        <li>
          <a href="/docs/getting-started/quickstart">Quickstart</a>
        </li>
      </ul>
    </DocLayout>
  );
}
