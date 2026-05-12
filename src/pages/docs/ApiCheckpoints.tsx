import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { MethodBadge } from "../../components/MethodBadge";
import { MdxTable } from "../../components/MdxTable";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { Play, Code } from "lucide-react";

const toc = [
  { id: "endpoints", label: "Endpoints", depth: 2 as const },
  { id: "list", label: "List checkpoints", depth: 2 as const },
  { id: "get", label: "Get a checkpoint", depth: 2 as const },
  { id: "create", label: "Create a checkpoint", depth: 2 as const },
];

export function ApiCheckpoints() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "REST API" },
        { label: "Checkpoints" },
      ]}
      eyebrow="REST API"
      title="Checkpoints"
      description="List, retrieve, and create execution checkpoints."
      toc={toc}
      complexity="intermediate"
      etaMinutes={5}
      prev={{ label: "Executions", to: "/docs/api/executions" }}
      next={{ label: "Workflows", to: "/docs/api/workflows" }}
    >
      <p>
        Base URL: <code>https://api.omium.ai/api/v1</code>. Send your API key
        as <code>X-API-Key</code> or as a Bearer token.
      </p>

      <h2 id="endpoints">Endpoints</h2>
      <MdxTable
        head={["Method", "Path", "What it does"]}
        rows={[
          [<code>GET</code>, <code>/checkpoints?execution_id=...</code>, "List checkpoints for an execution"],
          [<code>GET</code>, <code>/checkpoints/{"{checkpoint_id}"}</code>, "Fetch checkpoint metadata"],
          [<code>GET</code>, <code>/checkpoints/{"{checkpoint_id}"}?include_state=true</code>, "Fetch checkpoint metadata + state"],
          [<code>POST</code>, <code>/checkpoints</code>, "Create a checkpoint (usually via SDK)"],
        ]}
      />

      <h2 id="list">List checkpoints</h2>
      <Endpoint method="GET" path="/checkpoints" />
      <p>Parameters:</p>
      <ul>
        <li>
          <code>execution_id</code> (required)
        </li>
        <li>
          <code>limit</code> (default: 50)
        </li>
        <li>
          <code>offset</code> (default: 0)
        </li>
      </ul>
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/checkpoints?execution_id=exec_abc&limit=50" \\
  -H "X-API-Key: $OMIUM_API_KEY"`}
      />
      <CodeBlock
        lang="json"
        filename="response"
        code={`{
  "items": [
    {
      "id": "chk_1",
      "execution_id": "exec_abc",
      "name": "initial_state",
      "created_at": "2026-01-01T12:00:00Z",
      "metadata": {}
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}`}
      />

      <h2 id="get">Get a checkpoint</h2>
      <Endpoint method="GET" path="/checkpoints/{checkpoint_id}" />
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/checkpoints/chk_1" \\
  -H "X-API-Key: $OMIUM_API_KEY"`}
      />
      <p>To include state:</p>
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/checkpoints/chk_1?include_state=true" \\
  -H "X-API-Key: $OMIUM_API_KEY"`}
      />

      <h2 id="create">Create a checkpoint</h2>
      <Endpoint method="POST" path="/checkpoints" />
      <p>
        Most applications create checkpoints via the SDK (
        <code>@omium.checkpoint</code> or auto-checkpointing). If you manage
        state yourself, you can post a checkpoint explicitly:
      </p>
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/checkpoints" \\
  -H "X-API-Key: $OMIUM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "execution_id": "exec_abc",
    "name": "custom_checkpoint_name",
    "state": { "step": "after_load", "vars": { "count": 42 } },
    "metadata": { "note": "manual save point" }
  }'`}
      />

      <DocCardGrid>
        <DocCard
          title="Executions"
          description="Replay and rollback flows use checkpoint IDs."
          to="/docs/api/executions"
          icon={Play}
        />
        <DocCard
          title="Python SDK"
          description="Prefer decorators and auto-checkpoints in Python apps."
          to="/docs/sdk/python-sdk"
          icon={Code}
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
