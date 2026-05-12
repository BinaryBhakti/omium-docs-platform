import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { MethodBadge } from "../../components/MethodBadge";
import { MdxTable } from "../../components/MdxTable";
import { ApiPlayground } from "../../components/ApiPlayground";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { Flag, AlertTriangle } from "lucide-react";

const toc = [
  { id: "endpoints", label: "Endpoints", depth: 2 as const },
  { id: "list", label: "List executions", depth: 2 as const },
  { id: "get", label: "Get execution", depth: 2 as const },
  { id: "create", label: "Create execution", depth: 2 as const },
  { id: "replay", label: "Replay from checkpoint", depth: 2 as const },
  { id: "rollback", label: "Roll back to checkpoint", depth: 2 as const },
  { id: "next", label: "Next steps", depth: 2 as const },
];

export function ApiExecutions() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "REST API" },
        { label: "Executions" },
      ]}
      eyebrow="REST API"
      title="Executions"
      description="List, create, and manage workflow executions."
      toc={toc}
      complexity="intermediate"
      etaMinutes={6}
      prev={{
        label: "API errors and rate limits",
        to: "/docs/api/errors-and-rate-limits",
      }}
      next={{ label: "Checkpoints", to: "/docs/api/checkpoints" }}
    >
      <p>
        Base URL: <code>https://api.omium.ai/api/v1</code>. Send your API key
        as <code>X-API-Key</code> or as a Bearer token.
      </p>

      <h2 id="endpoints">Endpoints</h2>
      <MdxTable
        head={["Method", "Path", "What it does"]}
        rows={[
          [<code>GET</code>, <code>/executions</code>, "List executions"],
          [<code>GET</code>, <code>/executions/{"{execution_id}"}</code>, "Get execution details"],
          [<code>POST</code>, <code>/executions</code>, "Create an execution"],
          [<code>POST</code>, <code>/executions/{"{execution_id}"}/replay</code>, "Replay from checkpoint"],
          [<code>POST</code>, <code>/executions/{"{execution_id}"}/rollback</code>, "Roll back to checkpoint"],
        ]}
      />

      <h2 id="list">List executions</h2>
      <Endpoint method="GET" path="/executions" />
      <p>Query parameters:</p>
      <ul>
        <li>
          <code>workflow_id</code> (optional)
        </li>
        <li>
          <code>status</code> (optional): <code>running</code> |{" "}
          <code>completed</code> | <code>failed</code> |{" "}
          <code>cancelled</code> | <code>paused</code>
        </li>
        <li>
          <code>page</code> (default: 1)
        </li>
        <li>
          <code>page_size</code> (default: 20)
        </li>
      </ul>
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/executions?page=1&page_size=20" \\
  -H "X-API-Key: $OMIUM_API_KEY"`}
      />
      <CodeBlock
        lang="json"
        filename="response"
        code={`{
  "items": [
    {
      "id": "exec_abc",
      "workflow_id": "workflow_xyz",
      "status": "running",
      "created_at": "2026-01-01T12:00:00Z",
      "updated_at": "2026-01-01T12:01:00Z",
      "input_data": {},
      "output_data": null
    }
  ],
  "total": 1,
  "page": 1,
  "page_size": 20
}`}
      />

      <h2 id="get">Get execution</h2>
      <Endpoint method="GET" path="/executions/{execution_id}" />
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/executions/exec_abc" \\
  -H "X-API-Key: $OMIUM_API_KEY"`}
      />
      <CodeBlock
        lang="json"
        filename="response"
        code={`{
  "id": "exec_abc",
  "workflow_id": "workflow_xyz",
  "status": "completed",
  "created_at": "2026-01-01T12:00:00Z",
  "updated_at": "2026-01-01T12:05:00Z",
  "input_data": { "query": "latest AI trends" },
  "output_data": { "report": "..." },
  "error": null,
  "checkpoints": [
    { "id": "chk_1", "name": "start", "created_at": "..." }
  ]
}`}
      />

      <h2 id="create">Create execution</h2>
      <Endpoint method="POST" path="/executions" />
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/executions" \\
  -H "X-API-Key: $OMIUM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "workflow_id": "workflow_xyz",
    "input_data": { "query": "Research quantum computing advancements" },
    "metadata": { "user_id": "user_123", "priority": "high" }
  }'`}
      />
      <CodeBlock
        lang="json"
        filename="response"
        code={`{
  "id": "exec_new_123",
  "workflow_id": "workflow_xyz",
  "status": "running",
  "created_at": "2026-01-01T12:10:00Z"
}`}
      />
      <p>Try it live:</p>
      <ApiPlayground
        method="POST"
        endpoint="/api/v1/executions"
        params={[
          {
            name: "X-API-Key",
            in: "header",
            type: "string",
            required: true,
            secret: true,
            default: "omium_test_•••",
            description: "Your Omium API key",
          },
          {
            name: "workflow_id",
            in: "body",
            type: "string",
            required: true,
            default: "workflow_xyz",
          },
          {
            name: "input_data.query",
            in: "body",
            type: "string",
            default: "Research quantum computing advancements",
          },
        ]}
      />

      <h2 id="replay">Replay from checkpoint</h2>
      <Endpoint method="POST" path="/executions/{execution_id}/replay" />
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/executions/exec_abc/replay" \\
  -H "X-API-Key: $OMIUM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "checkpoint_id": "checkpoint_456" }'`}
      />

      <h2 id="rollback">Roll back to checkpoint</h2>
      <Endpoint method="POST" path="/executions/{execution_id}/rollback" />
      <p>
        Rolling back pauses the execution at a prior checkpoint and discards
        later state.
      </p>
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/executions/exec_abc/rollback" \\
  -H "X-API-Key: $OMIUM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "checkpoint_id": "checkpoint_456" }'`}
      />

      <h2 id="next">Next steps</h2>
      <DocCardGrid>
        <DocCard
          title="Checkpoints"
          description="List and fetch checkpoint state for recovery."
          to="/docs/api/checkpoints"
          icon={Flag}
        />
        <DocCard
          title="Failures"
          description="Understand failed runs and resolution flows."
          to="/docs/api/failures"
          icon={AlertTriangle}
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
