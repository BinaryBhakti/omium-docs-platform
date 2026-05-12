import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { MdxTable } from "../../components/MdxTable";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { Play, Webhook } from "lucide-react";

const toc = [
  { id: "basics", label: "Error handling basics", depth: 2 as const },
  { id: "patterns", label: "Common patterns", depth: 2 as const },
  { id: "limits", label: "Rate limits", depth: 2 as const },
];

export function ApiErrors() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "REST API" },
        { label: "Errors and rate limits" },
      ]}
      eyebrow="REST API"
      title="API errors and rate limits"
      description="Status codes, common error shapes, and how to back off safely."
      toc={toc}
      complexity="intermediate"
      etaMinutes={4}
      prev={{ label: "API overview", to: "/docs/api/overview" }}
      next={{ label: "Executions", to: "/docs/api/executions" }}
    >
      <p>
        This page documents how to handle failures when calling the Omium
        HTTP API. For endpoint details, start at{" "}
        <a href="/docs/api/overview">API overview</a>.
      </p>

      <h2 id="basics">Error handling basics</h2>
      <p>
        Omium APIs use standard HTTP status codes. Treat{" "}
        <strong>non-2xx</strong> responses as failures and log the response
        body for debugging.
      </p>
      <MdxTable
        head={["Status", "Meaning", "What to do"]}
        rows={[
          [<code>400</code>, "Invalid request (missing fields, invalid enum)", "Fix the request payload; don't retry unchanged."],
          [<code>401</code>, "Missing / invalid API key", "Check X-API-Key and account; rotate key if needed."],
          [<code>403</code>, "Key is valid but not allowed", "Check tenant/workspace permissions and feature access."],
          [<code>404</code>, "Resource not found", "Validate IDs; don't retry unless you expect eventual consistency."],
          [<code>409</code>, "Conflict", "Treat as state mismatch; refetch and decide."],
          [<code>413</code>, "Payload too large", "Reduce payload size; use files or references if supported."],
          [<code>422</code>, "Validation failed", "Fix the request; don't retry unchanged."],
          [<code>429</code>, "Rate limited", "Back off and retry with jitter."],
          [<code>5xx</code>, "Server-side error", "Retry with exponential backoff; alert if sustained."],
        ]}
      />

      <h2 id="patterns">Common patterns</h2>
      <h3 id="idempotency">Idempotency and retries</h3>
      <p>If you're building an orchestrator or worker system:</p>
      <ul>
        <li>
          Retry <strong>only</strong> when it's safe (typically <code>429</code>{" "}
          and <code>5xx</code>).
        </li>
        <li>
          Use <strong>exponential backoff with jitter</strong>.
        </li>
        <li>
          If you supply your own <code>execution_id</code> (where supported),
          you can make retries safer by de-duplicating on your side.
        </li>
      </ul>
      <h3 id="logging">Logging</h3>
      <p>Always log:</p>
      <ul>
        <li>request path + method</li>
        <li>response status code</li>
        <li>response body (redact secrets)</li>
        <li>correlation IDs if your stack has them</li>
      </ul>

      <h2 id="limits">Rate limits</h2>
      <p>
        Rate limits protect platform capacity. You may see <code>429</code>{" "}
        during bursts or when a tenant hits its limit.
      </p>
      <p>
        Recommended client behaviour on <code>429</code>:
      </p>
      <ol>
        <li>Wait using exponential backoff + jitter</li>
        <li>Retry the same request</li>
        <li>If it repeats, reduce concurrency and/or request volume</li>
      </ol>
      <p>Example (pseudo):</p>
      <CodeBlock
        lang="bash"
        code={`sleep = min(base * 2^attempt + random(0..jitter), max_sleep)`}
      />

      <DocCardGrid>
        <DocCard
          title="Executions"
          description="Create runs and drive replay/rollback."
          to="/docs/api/executions"
          icon={Play}
        />
        <DocCard
          title="API overview"
          description="Base URL, auth, and resource map."
          to="/docs/api/overview"
          icon={Webhook}
        />
      </DocCardGrid>
    </DocLayout>
  );
}
