import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { MethodBadge } from "../../components/MethodBadge";
import { MdxTable } from "../../components/MdxTable";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { Play, Gauge } from "lucide-react";

const toc = [
  { id: "endpoints", label: "Endpoints", depth: 2 as const },
  { id: "list", label: "List failures", depth: 2 as const },
  { id: "get", label: "Get a failure", depth: 2 as const },
  { id: "stats", label: "Stats", depth: 2 as const },
  { id: "resolve", label: "Resolve a failure", depth: 2 as const },
];

export function ApiFailures() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "REST API" },
        { label: "Failures" },
      ]}
      eyebrow="REST API"
      title="Failures"
      description="Inspect and resolve failed executions."
      toc={toc}
      complexity="intermediate"
      etaMinutes={4}
      prev={{ label: "Workflows", to: "/docs/api/workflows" }}
      next={{ label: "Billing", to: "/docs/api/billing" }}
    >
      <p>
        Base URL: <code>https://api.omium.ai/api/v1</code>. Send your API key
        as <code>X-API-Key</code> or as a Bearer token.
      </p>

      <h2 id="endpoints">Endpoints</h2>
      <MdxTable
        head={["Method", "Path", "What it does"]}
        rows={[
          [<code>GET</code>, <code>/failures</code>, "List failures"],
          [<code>GET</code>, <code>/failures/{"{failure_id}"}</code>, "Fetch failure details"],
          [<code>GET</code>, <code>/failures/stats</code>, "Aggregated stats"],
          [<code>POST</code>, <code>/failures/{"{failure_id}"}/resolve</code>, "Mark failure resolved"],
        ]}
      />

      <h2 id="list">List failures</h2>
      <Endpoint method="GET" path="/failures" />
      <p>Parameters:</p>
      <ul>
        <li>
          <code>limit</code> (default: 50)
        </li>
        <li>
          <code>offset</code> (default: 0)
        </li>
        <li>
          <code>status</code> (optional): <code>open</code> |{" "}
          <code>resolved</code> | <code>ignored</code>
        </li>
      </ul>
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/failures?status=open&limit=50" \\
  -H "X-API-Key: $OMIUM_API_KEY"`}
      />

      <h2 id="get">Get a failure</h2>
      <Endpoint method="GET" path="/failures/{failure_id}" />
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/failures/fail_1" \\
  -H "X-API-Key: $OMIUM_API_KEY"`}
      />

      <h2 id="stats">Stats</h2>
      <Endpoint method="GET" path="/failures/stats" />
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/failures/stats" \\
  -H "X-API-Key: $OMIUM_API_KEY"`}
      />

      <h2 id="resolve">Resolve a failure</h2>
      <Endpoint method="POST" path="/failures/{failure_id}/resolve" />
      <CodeBlock
        lang="bash"
        code={`curl -sS -X POST "https://api.omium.ai/api/v1/failures/fail_1/resolve" \\
  -H "X-API-Key: $OMIUM_API_KEY"`}
      />

      <DocCardGrid>
        <DocCard
          title="Executions"
          description="Replay and rollback are execution-level operations."
          to="/docs/api/executions"
          icon={Play}
        />
        <DocCard
          title="Dashboard"
          description="Inspect failures alongside traces and checkpoints."
          to="https://app.omium.ai"
          icon={Gauge}
        />
      </DocCardGrid>
    </DocLayout>
  );
}

function Endpoint({ method, path }: { method: string; path: string }) {
  return (
    <div className="not-prose my-3 flex items-center gap-3 rounded-md bg-bg-elevated px-3.5 h-11">
      <MethodBadge method={method} />
      <code className="font-mono text-[13px] text-text">{path}</code>
    </div>
  );
}
