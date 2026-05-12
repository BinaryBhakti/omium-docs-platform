import { DocLayout } from "../../components/DocLayout";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { KeyRound, LayoutDashboard } from "lucide-react";

const toc = [
  { id: "keys", label: "API keys", depth: 2 as const },
  { id: "billing", label: "Billing and usage", depth: 2 as const },
  { id: "practices", label: "Good practices", depth: 2 as const },
];

export function PlatformApiKeysBilling() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Platform" },
        { label: "API keys and billing" },
      ]}
      eyebrow="Platform"
      title="API keys and billing"
      description="Keys, usage, and where to review spend."
      toc={toc}
      complexity="beginner"
      etaMinutes={3}
      prev={{
        label: "Automations dashboard",
        to: "/docs/platform/automations",
      }}
      next={{ label: "Examples", to: "/docs/resources/examples" }}
    >
      <h2 id="keys">API keys</h2>
      <p>API keys authenticate the CLI, SDK, and HTTP API.</p>
      <h3 id="create">Create a key</h3>
      <ol>
        <li>
          Sign in at{" "}
          <a href="https://app.omium.ai" target="_blank" rel="noreferrer">
            app.omium.ai
          </a>
        </li>
        <li>
          Open <strong>API Keys</strong>
        </li>
        <li>
          Create a new key and copy it (keys start with <code>omium_</code>)
        </li>
      </ol>
      <h3 id="use">Use the key</h3>
      <ul>
        <li>
          <strong>CLI</strong>: run <code>omium init</code> (recommended)
        </li>
        <li>
          <strong>SDK</strong>: call <code>omium.init()</code> after{" "}
          <code>omium init</code>, or pass <code>api_key=...</code>
        </li>
        <li>
          <strong>HTTP</strong>: send the key in <code>X-API-Key</code> (see{" "}
          <a href="/docs/api/overview">API overview</a>)
        </li>
      </ul>

      <h2 id="billing">Billing and usage</h2>
      <p>
        In the dashboard you can review balance, usage, and per-run cost. You
        can also query via:
      </p>
      <ul>
        <li>
          the <a href="/docs/api/billing">Billing API</a>
        </li>
        <li>
          the CLI (where available): <code>omium billing balance</code>,{" "}
          <code>omium billing usage</code>
        </li>
      </ul>

      <h2 id="practices">Good practices</h2>
      <ul>
        <li>
          Keep keys out of source control (use <code>omium init</code> or
          environment variables).
        </li>
        <li>
          In CI, prefer <code>OMIUM_API_KEY</code> and{" "}
          <code>OMIUM_API_URL</code> environment variables.
        </li>
        <li>
          Rotate keys when team members change or when a key is exposed.
        </li>
      </ul>

      <DocCardGrid>
        <DocCard
          title="Configure"
          description="Where config is stored and how env overrides work."
          to="/docs/getting-started/configure"
          icon={KeyRound}
        />
        <DocCard
          title="Automations dashboard"
          description="Projects, runs, and cost."
          to="/docs/platform/automations"
          icon={LayoutDashboard}
        />
      </DocCardGrid>
    </DocLayout>
  );
}
