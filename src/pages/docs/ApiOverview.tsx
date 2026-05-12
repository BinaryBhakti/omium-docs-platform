import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { MdxTable } from "../../components/MdxTable";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { Rocket, Play, Code, LayoutDashboard } from "lucide-react";

const toc = [
  { id: "what", label: "What this API is for", depth: 2 as const },
  { id: "base-url", label: "Base URL", depth: 2 as const },
  { id: "auth", label: "Authentication", depth: 2 as const },
  { id: "resources", label: "Available resources", depth: 2 as const },
  { id: "clients", label: "Client libraries", depth: 2 as const },
  { id: "minimal", label: "Minimal request", depth: 2 as const },
  { id: "errors", label: "Errors and limits", depth: 2 as const },
];

export function ApiOverview() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "REST API" },
        { label: "Overview" },
      ]}
      eyebrow="REST API"
      title="API overview"
      description="Base URL, authentication, available resources, and your first request."
      toc={toc}
      complexity="intermediate"
      etaMinutes={6}
      prev={{ label: "CrewAI", to: "/docs/build-with-omium/crewai" }}
      next={{
        label: "API errors and rate limits",
        to: "/docs/api/errors-and-rate-limits",
      }}
    >
      <p>
        New to Omium? Start with{" "}
        <a href="/docs/getting-started/installation">Installation</a> and{" "}
        <a href="/docs/getting-started/quickstart">Quickstart</a>, or open the{" "}
        <a href="#resources">REST reference index</a> below if you already
        have an API key.
      </p>

      <h2 id="what">What this API is for</h2>
      <p>
        The Omium HTTP API sits alongside the Python SDK and CLI. Use it when
        you want to list executions, drive replays from your own orchestrator,
        or integrate Omium into a service written in any language. Day-to-day
        tracing still flows through the SDK in production apps.
      </p>

      <h2 id="base-url">Base URL</h2>
      <CodeBlock lang="bash" code={`https://api.omium.ai/api/v1`} />

      <h2 id="auth">Authentication</h2>
      <p>
        All requests need a valid API key. Send it as <code>X-API-Key</code>{" "}
        or as a Bearer token.
      </p>
      <CodeBlock
        lang="bash"
        code={`curl -sS -H "X-API-Key: omium_your_key_here" \\
  -H "Content-Type: application/json" \\
  "https://api.omium.ai/api/v1/executions"`}
      />
      <p>
        Use the same key you create under{" "}
        <a href="https://app.omium.ai" target="_blank" rel="noreferrer">
          API keys
        </a>{" "}
        in the dashboard. In server-side code, load it from the environment
        instead of hard-coding it.
      </p>

      <h2 id="resources">Available resources</h2>
      <p>
        These endpoints are documented in detail on the pages linked in the
        sidebar.
      </p>
      <MdxTable
        head={["Area", "Use it", "Primary paths"]}
        rows={[
          [
            <a href="/docs/api/executions">Executions</a>,
            "Start runs, inspect status, replay or roll back from checkpoints",
            <code>GET/POST /executions, /executions/{"{id}"}/replay</code>,
          ],
          [
            <a href="/docs/api/checkpoints">Checkpoints</a>,
            "List checkpoints, fetch state for recovery",
            <code>
              GET /checkpoints, GET /checkpoints/{"{id}"}
            </code>,
          ],
          [
            <a href="/docs/api/workflows">Workflows</a>,
            "Register and version workflows you push from projects",
            <code>GET/POST/PUT/DELETE /workflows</code>,
          ],
          [
            <a href="/docs/api/failures">Failures</a>,
            "Investigate failed runs and track resolution",
            <code>GET /failures, GET /failures/stats</code>,
          ],
          [
            <a href="/docs/api/billing">Billing</a>,
            "Read balances, usage, and subscription state",
            <code>GET /billing/*</code>,
          ],
        ]}
      />
      <p>
        If you are building a new integration, read{" "}
        <a href="/docs/api/executions">Executions</a> first, then{" "}
        <a href="/docs/api/checkpoints">Checkpoints</a>.
      </p>

      <h2 id="clients">Client libraries</h2>
      <p>
        For Python, install the official package so headers, paths, and
        retries stay consistent:
      </p>
      <CodeBlock lang="bash" code={`pip install omium`} />
      <p>
        The SDK reads <code>OMIUM_API_KEY</code> and <code>OMIUM_API_URL</code>{" "}
        when you call <code>omium.init()</code> without arguments. See{" "}
        <a href="/docs/sdk/python-sdk">Python SDK</a> and{" "}
        <a href="/docs/sdk/cli">CLI reference</a> for everything the shipped
        client can do.
      </p>

      <h2 id="minimal">Minimal request</h2>
      <p>List recent executions (empty list is normal on a new account):</p>
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/executions?page=1&page_size=20" \\
  -H "X-API-Key: $OMIUM_API_KEY" \\
  -H "Content-Type: application/json"`}
      />

      <h2 id="errors">Errors and limits</h2>
      <ul>
        <li>
          Expect regular HTTP status codes (<code>401</code> for bad keys,{" "}
          <code>404</code> for unknown IDs, <code>429</code> when throttled).
        </li>
        <li>
          For platform-wide throughput and spend, see your dashboard and{" "}
          <a href="/docs/platform/api-keys-billing">API keys &amp; billing</a>.
        </li>
      </ul>

      <DocCardGrid>
        <DocCard
          title="Quickstart"
          description="Run a traced workflow locally in a few minutes."
          to="/docs/getting-started/quickstart"
          icon={Rocket}
        />
        <DocCard
          title="Executions API"
          description="Request and response shapes for runs and replays."
          to="/docs/api/executions"
          icon={Play}
        />
        <DocCard
          title="Python SDK"
          description="Instrument LangGraph, CrewAI, or your own code."
          to="/docs/sdk/python-sdk"
          icon={Code}
        />
        <DocCard
          title="Platform capabilities"
          description="Map features to APIs and dashboard surfaces."
          to="/docs/build-with-omium/overview"
          icon={LayoutDashboard}
        />
      </DocCardGrid>
    </DocLayout>
  );
}
