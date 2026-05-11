import { DocLayout } from "../components/DocLayout";
import { CodeBlock } from "../components/CodeBlock";
import { MethodBadge } from "../components/MethodBadge";

const toc = [
  { id: "auth", label: "Authentication", depth: 2 as const },
  { id: "errors", label: "Errors", depth: 2 as const },
  { id: "pagination", label: "Pagination", depth: 2 as const },
  { id: "idempotency", label: "Idempotency", depth: 2 as const },
  { id: "versioning", label: "Versioning", depth: 2 as const },
  { id: "endpoints", label: "Endpoints", depth: 2 as const },
  { id: "runs", label: "Runs", depth: 3 as const },
  { id: "checkpoints", label: "Checkpoints", depth: 3 as const },
  { id: "traces", label: "Traces", depth: 3 as const },
  { id: "policies", label: "Policies", depth: 3 as const },
  { id: "webhooks", label: "Webhooks", depth: 2 as const },
  { id: "clients", label: "SDK clients", depth: 2 as const },
];

const endpointRows = [
  { method: "POST", path: "/v1/runs", desc: "Create a new workflow run", id: "runs" },
  { method: "GET", path: "/v1/runs/{id}", desc: "Retrieve a run by id" },
  { method: "POST", path: "/v1/runs/{id}/resume", desc: "Resume from a checkpoint" },
  { method: "GET", path: "/v1/checkpoints", desc: "List checkpoints for a run", id: "checkpoints" },
  { method: "POST", path: "/v1/checkpoints/{id}/restore", desc: "Restore to a checkpoint" },
  { method: "GET", path: "/v1/traces", desc: "List traces with filters", id: "traces" },
  { method: "GET", path: "/v1/traces/{id}/spans", desc: "Stream spans for a trace" },
  { method: "POST", path: "/v1/policies", desc: "Attach a policy to a workspace", id: "policies" },
  { method: "DELETE", path: "/v1/policies/{id}", desc: "Detach a policy" },
];

export function ApiReference() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "API reference" },
      ]}
      eyebrow="REST API"
      title="API reference"
      description="HTTP endpoints for managing runs, checkpoints, traces, and policies. Base URL: api.omium.ai/v1."
      toc={toc}
      meta={{ updatedAt: "May 10, 2026", readTime: "12 min" }}
      prev={{ label: "SDK", to: "/docs/sdk" }}
      next={{ label: "Concepts", to: "/docs/concepts" }}
    >
      <p>
        The Omium REST API is the lowest level of integration. Every request
        is JSON, every response carries an <code>x-request-id</code> header
        for tracing, and rate limits are surfaced via <code>x-ratelimit-*</code>{" "}
        response headers.
      </p>

      <h2 id="auth">Authentication</h2>
      <p>
        Authenticate with a bearer token. Use a workspace API key from{" "}
        <strong>Settings → API keys</strong>. Keys are prefixed{" "}
        <code>omk_live_</code> in production and <code>omk_test_</code> in
        development workspaces.
      </p>
      <CodeBlock
        lang="bash"
        code={`curl https://api.omium.ai/v1/runs \\
  -H "Authorization: Bearer $OMIUM_API_KEY"`}
      />

      <h2 id="errors">Errors</h2>
      <p>
        Errors follow a stable shape across every endpoint. The HTTP status
        carries the category; the body carries actionable detail.
      </p>
      <CodeBlock
        lang="json"
        filename="error response"
        code={`{
  "error": {
    "type": "rate_limited",
    "message": "Workspace exceeded 60 req/s for /v1/runs.",
    "request_id": "req_01H8XK...",
    "retry_after_ms": 420
  }
}`}
      />
      <p>Status code mapping:</p>
      <ul>
        <li><strong>400</strong> — <code>invalid_request</code>: malformed body or unknown field</li>
        <li><strong>401</strong> — <code>unauthenticated</code>: missing or invalid bearer</li>
        <li><strong>403</strong> — <code>forbidden</code>: key lacks scope for the resource</li>
        <li><strong>404</strong> — <code>not_found</code>: resource doesn't exist in this workspace</li>
        <li><strong>409</strong> — <code>conflict</code>: idempotency-key reuse with different body</li>
        <li><strong>429</strong> — <code>rate_limited</code>: retry after <code>retry_after_ms</code></li>
        <li><strong>5xx</strong> — server-side; safe to retry with backoff</li>
      </ul>

      <h2 id="pagination">Pagination</h2>
      <p>
        List endpoints use opaque cursor pagination. Pass <code>after</code>{" "}
        from the previous response's <code>next_cursor</code> to page forward.
      </p>
      <CodeBlock
        lang="bash"
        code={`curl "https://api.omium.ai/v1/runs?limit=50&after=cur_01H8..." \\
  -H "Authorization: Bearer $OMIUM_API_KEY"`}
      />
      <CodeBlock
        lang="json"
        code={`{
  "data": [ /* ... */ ],
  "has_more": true,
  "next_cursor": "cur_01H8XQ..."
}`}
      />

      <h2 id="idempotency">Idempotency</h2>
      <p>
        Mutating endpoints accept an <code>Idempotency-Key</code> header. The
        first response is cached for 24 hours; repeating the same key with the
        same body returns the original response.
      </p>
      <CodeBlock
        lang="bash"
        code={`curl -X POST https://api.omium.ai/v1/runs \\
  -H "Authorization: Bearer $OMIUM_API_KEY" \\
  -H "Idempotency-Key: 9b1c4e88-..." \\
  -H "Content-Type: application/json" \\
  -d '{"workflow":"crawl","input":{"url":"https://example.com"}}'`}
      />

      <h2 id="versioning">Versioning</h2>
      <p>
        The API is versioned in the URL path (<code>/v1</code>). Backwards-
        incompatible changes ship under a new major path with a 12-month
        deprecation window on the previous version. Additive fields land
        without a version bump.
      </p>

      <h2 id="endpoints">Endpoints</h2>
      <div className="not-prose my-5 rounded-xl border border-hairline bg-panel overflow-hidden">
        <div className="grid grid-cols-[96px_1fr_240px] items-center gap-3 px-4 h-10 border-b border-hairline bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] font-medium text-white/45">
          <div>Method</div>
          <div>Path</div>
          <div className="hidden sm:block">Description</div>
        </div>
        {endpointRows.map((e, i) => (
          <a
            key={e.path + e.method}
            href={e.id ? `#${e.id}` : undefined}
            className={`grid grid-cols-[96px_1fr_240px] items-center gap-3 px-4 h-12 hover:bg-white/[0.025] transition-colors ${
              i !== 0 ? "border-t border-hairline" : ""
            }`}
          >
            <div>
              <MethodBadge method={e.method} size="sm" />
            </div>
            <div className="font-mono text-[13px] text-white truncate">{e.path}</div>
            <div className="hidden sm:block text-[12.5px] text-white/55 truncate">
              {e.desc}
            </div>
          </a>
        ))}
      </div>

      <h3 id="runs">Runs</h3>
      <p>Create and manage workflow runs.</p>
      <EndpointBlock method="POST" path="/v1/runs" />
      <CodeBlock
        lang="bash"
        code={`curl -X POST https://api.omium.ai/v1/runs \\
  -H "Authorization: Bearer $OMIUM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "workflow": "crawl",
    "input": { "url": "https://example.com" },
    "policy": "prod-default"
  }'`}
      />
      <CodeBlock
        lang="json"
        filename="response"
        code={`{
  "id": "run_01H8XK...",
  "workflow": "crawl",
  "status": "queued",
  "created_at": "2026-05-12T14:08:21Z",
  "input": { "url": "https://example.com" }
}`}
      />

      <EndpointBlock method="GET" path="/v1/runs/{id}" />
      <EndpointBlock method="POST" path="/v1/runs/{id}/resume" />
      <p>
        <strong>Parameters:</strong> <code>from</code> (string, optional) — the
        checkpoint name to resume from. Defaults to the latest checkpoint.
      </p>

      <h3 id="checkpoints">Checkpoints</h3>
      <p>Inspect or restore from durable checkpoints created during a run.</p>
      <EndpointBlock method="GET" path="/v1/checkpoints?run_id={run_id}" />
      <EndpointBlock method="POST" path="/v1/checkpoints/{id}/restore" />
      <CodeBlock
        lang="json"
        filename="checkpoint"
        code={`{
  "id": "ckpt_01H8XK...",
  "run_id": "run_01H8XK...",
  "name": "cleaned",
  "created_at": "2026-05-12T14:08:23.412Z",
  "payload": { "count": 24018 },
  "size_bytes": 184329
}`}
      />

      <h3 id="traces">Traces</h3>
      <p>
        Read traces and stream individual spans. The spans endpoint supports{" "}
        <code>Accept: text/event-stream</code> for live tailing.
      </p>
      <EndpointBlock method="GET" path="/v1/traces/{id}/spans" />
      <CodeBlock
        lang="bash"
        code={`curl -N https://api.omium.ai/v1/traces/tr_01H8.../spans \\
  -H "Authorization: Bearer $OMIUM_API_KEY" \\
  -H "Accept: text/event-stream"`}
      />
      <CodeBlock
        lang="json"
        filename="span (event)"
        code={`{
  "id": "span_01H8XK...",
  "name": "summarize",
  "trace_id": "tr_01H8XK...",
  "parent_span_id": null,
  "started_at": "2026-05-12T14:08:22.401Z",
  "duration_ms": 412,
  "status": "ok",
  "tokens": { "input": 84, "output": 119 },
  "cost_usd": 0.00043,
  "attributes": {
    "model": "anthropic/claude-sonnet-4-6",
    "step": "summarize"
  }
}`}
      />

      <h3 id="policies">Policies</h3>
      <p>Attach or detach a policy from a workspace.</p>
      <EndpointBlock method="POST" path="/v1/policies" />
      <EndpointBlock method="DELETE" path="/v1/policies/{id}" />
      <CodeBlock
        lang="json"
        filename="POST /v1/policies"
        code={`{
  "name": "prod-default",
  "workspace": "acme-prod",
  "source": "src/policies/prod.yaml"
}`}
      />

      <h2 id="webhooks">Webhooks</h2>
      <p>
        Subscribe to events from your workspace dashboard or via{" "}
        <code>POST /v1/webhooks</code>. Each delivery is signed with an HMAC-
        SHA256 signature in the <code>X-Omium-Signature</code> header. Replay
        attacks are prevented by requiring delivery within 5 minutes of the{" "}
        <code>X-Omium-Timestamp</code>.
      </p>
      <p>Supported events:</p>
      <ul>
        <li><code>run.created</code></li>
        <li><code>run.completed</code></li>
        <li><code>run.failed</code></li>
        <li><code>checkpoint.created</code></li>
        <li><code>policy.violated</code></li>
      </ul>
      <CodeBlock
        lang="bash"
        code={`# Verify a webhook signature
SIGNED=$(printf "%s.%s" "$TIMESTAMP" "$BODY" | openssl dgst -sha256 -hmac "$WEBHOOK_SECRET")
[ "$SIGNED" = "$X_OMIUM_SIGNATURE" ] && echo OK`}
      />

      <h2 id="clients">SDK clients</h2>
      <p>
        The Python SDK wraps every endpoint here with typed methods, retries,
        and pagination handled for you. See the{" "}
        <a href="/docs/sdk">SDK reference</a> for usage. Client libraries for
        TypeScript and Go are on the roadmap.
      </p>
    </DocLayout>
  );
}

function EndpointBlock({ method, path }: { method: string; path: string }) {
  return (
    <div className="not-prose my-3 flex items-center gap-3 rounded-lg border border-hairline bg-panel px-3.5 h-11">
      <MethodBadge method={method} />
      <code className="font-mono text-[13px] text-white">{path}</code>
    </div>
  );
}
