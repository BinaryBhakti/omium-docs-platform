import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { MethodBadge } from "../../components/MethodBadge";
import { MdxTable } from "../../components/MdxTable";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { FolderOpen, LayoutDashboard } from "lucide-react";

const toc = [
  { id: "endpoints", label: "Endpoints", depth: 2 as const },
  { id: "list", label: "List workflows", depth: 2 as const },
  { id: "create", label: "Create a workflow", depth: 2 as const },
  { id: "get", label: "Get a workflow", depth: 2 as const },
  { id: "update", label: "Update a workflow", depth: 2 as const },
  { id: "delete", label: "Delete a workflow", depth: 2 as const },
];

export function ApiWorkflows() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "REST API" },
        { label: "Workflows" },
      ]}
      eyebrow="REST API"
      title="Workflows"
      description="Define and manage workflows exposed to the platform."
      toc={toc}
      complexity="intermediate"
      etaMinutes={5}
      prev={{ label: "Checkpoints", to: "/docs/api/checkpoints" }}
      next={{ label: "Failures", to: "/docs/api/failures" }}
    >
      <p>
        Base URL: <code>https://api.omium.ai/api/v1</code>. Send your API key
        as <code>X-API-Key</code> or as a Bearer token.
      </p>

      <h2 id="endpoints">Endpoints</h2>
      <MdxTable
        head={["Method", "Path", "What it does"]}
        rows={[
          [<code>GET</code>, <code>/workflows</code>, "List workflows"],
          [<code>POST</code>, <code>/workflows</code>, "Create a workflow"],
          [<code>GET</code>, <code>/workflows/{"{workflow_id}"}</code>, "Get a workflow"],
          [<code>PUT</code>, <code>/workflows/{"{workflow_id}"}</code>, "Update a workflow"],
          [<code>DELETE</code>, <code>/workflows/{"{workflow_id}"}</code>, "Delete a workflow"],
        ]}
      />

      <h2 id="list">List workflows</h2>
      <Endpoint method="GET" path="/workflows" />
      <p>Common filters:</p>
      <ul>
        <li>
          <code>status</code>: <code>draft</code> | <code>published</code> |{" "}
          <code>archived</code>
        </li>
        <li>
          <code>workflow_type</code>: <code>crewai</code> |{" "}
          <code>langgraph</code> | <code>autogen</code> |{" "}
          <code>semantic_kernel</code> | <code>custom</code>
        </li>
        <li>
          <code>page</code>, <code>page_size</code>
        </li>
      </ul>
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/workflows?page=1&page_size=20" \\
  -H "X-API-Key: $OMIUM_API_KEY"`}
      />

      <h2 id="create">Create a workflow</h2>
      <Endpoint method="POST" path="/workflows" />
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/workflows" \\
  -H "X-API-Key: $OMIUM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My workflow",
    "description": "Workflow description",
    "workflow_type": "langgraph",
    "definition": { "nodes": [], "edges": [] },
    "tags": ["prod"],
    "status": "draft"
  }'`}
      />

      <h2 id="get">Get a workflow</h2>
      <Endpoint method="GET" path="/workflows/{workflow_id}" />
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/workflows/workflow_xyz" \\
  -H "X-API-Key: $OMIUM_API_KEY"`}
      />

      <h2 id="update">Update a workflow</h2>
      <Endpoint method="PUT" path="/workflows/{workflow_id}" />
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/workflows/workflow_xyz" \\
  -H "X-API-Key: $OMIUM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Updated workflow name",
    "description": "Updated description",
    "status": "published",
    "definition": { "nodes": [], "edges": [] }
  }'`}
      />

      <h2 id="delete">Delete a workflow</h2>
      <Endpoint method="DELETE" path="/workflows/{workflow_id}" />
      <CodeBlock
        lang="bash"
        code={`curl -sS -X DELETE "https://api.omium.ai/api/v1/workflows/workflow_xyz" \\
  -H "X-API-Key: $OMIUM_API_KEY"`}
      />

      <DocCardGrid>
        <DocCard
          title="First project"
          description="Push a project so workflows show up in Automations."
          to="/docs/getting-started/first-project"
          icon={FolderOpen}
        />
        <DocCard
          title="Automations"
          description="See workflow health, runs, and cost in the dashboard."
          to="/docs/platform/automations"
          icon={LayoutDashboard}
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
