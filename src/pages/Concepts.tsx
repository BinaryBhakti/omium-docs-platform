import { DocLayout } from "../components/DocLayout";
import { CodeBlock } from "../components/CodeBlock";

const toc = [
  { id: "workflows", label: "Workflows", depth: 2 as const },
  { id: "steps", label: "Steps", depth: 3 as const },
  { id: "checkpointing", label: "Checkpointing", depth: 2 as const },
  { id: "recovery", label: "Recovery", depth: 2 as const },
  { id: "tracing", label: "Tracing", depth: 2 as const },
  { id: "policy", label: "Policy engine", depth: 2 as const },
  { id: "billing", label: "Billing", depth: 2 as const },
  { id: "llm-routing", label: "LLM routing", depth: 2 as const },
  { id: "reliability", label: "Reliability", depth: 2 as const },
  { id: "observability", label: "Observability", depth: 2 as const },
];

export function Concepts() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Platform concepts" },
      ]}
      eyebrow="Concepts"
      title="Platform concepts"
      description="The mental model behind Omium — how workflows, checkpoints, traces, policy, and routing fit together."
      toc={toc}
      meta={{ updatedAt: "Apr 28, 2026", readTime: "15 min" }}
      prev={{ label: "API reference", to: "/docs/api-reference" }}
    >
      <p>
        Omium is built around five core primitives: <strong>workflows</strong>,{" "}
        <strong>checkpoints</strong>, <strong>traces</strong>,{" "}
        <strong>policies</strong>, and <strong>routes</strong>. Every other
        feature — recovery, billing, observability — is composed from those
        five. This page walks through each one and how they interact.
      </p>

      <h2 id="workflows">Workflows</h2>
      <p>
        A <strong>workflow</strong> is a directed graph of <strong>steps</strong>.
        Steps are functions with explicit inputs, outputs, retry policy, and
        timeout. Omium executes them in dependency order and records every
        invocation to the trace store.
      </p>
      <p>
        Workflows are <strong>code-defined</strong>, not DAG-configured.
        Branching, fan-out, and conditional execution all use ordinary Python
        control flow — Omium reconstructs the call graph from the trace.
      </p>

      <h3 id="steps">Steps</h3>
      <p>
        Steps are deterministic by default. Side effects — HTTP calls, LLM
        invocations, DB writes — are wrapped so they can be replayed against
        their recorded responses during recovery.
      </p>
      <CodeBlock
        lang="python"
        code={`from omium import step

@step(
    retries=3,
    timeout="30s",
    idempotency_key=lambda url: f"fetch:{url}",
)
def fetch(url: str) -> str:
    return httpx.get(url, timeout=10).text`}
      />

      <h2 id="checkpointing">Checkpointing</h2>
      <p>
        Checkpoints are <strong>durable markers</strong> that capture workflow
        state at a moment in time. They include input parameters, the call
        graph so far, and any payload you explicitly attach. Checkpoints are
        what make long-running runs cheap to resume.
      </p>
      <CodeBlock
        lang="python"
        code={`from omium import workflow, step, checkpoint

@workflow
def ingest(path: str):
    rows = load(path)
    checkpoint("loaded", payload={"count": len(rows)})

    cleaned = clean(rows)
    checkpoint("cleaned")

    write(cleaned)`}
      />
      <p>
        Older checkpoints are <strong>compacted</strong> into 24-hour windows
        by default. Configure compaction windows per workspace; they don't
        affect resumability of in-flight runs.
      </p>

      <h2 id="recovery">Recovery</h2>
      <p>
        When a run fails or is interrupted, you can <strong>resume</strong> it
        from the most recent checkpoint. Omium replays deterministic steps
        from their recorded outputs and continues from the failed step onward
        — no work is repeated.
      </p>
      <CodeBlock
        lang="bash"
        code={`omium runs resume run_01H8XK...           # latest checkpoint
omium runs resume run_01H8XK... --from cleaned`}
      />
      <p>
        Recovery semantics are <strong>at-least-once</strong>: a step may run
        twice if Omium can't confirm the original write committed. Use
        idempotency keys on side-effecting steps to keep this safe.
      </p>

      <h2 id="tracing">Tracing</h2>
      <p>
        Every run emits a <strong>trace</strong> composed of one span per step
        invocation. Spans carry timing, token usage, cost, and any logs your
        step produced. Traces are queryable through the API and stream-able
        for real-time UIs.
      </p>
      <CodeBlock
        lang="bash"
        code={`curl -N https://api.omium.ai/v1/traces/tr_01H8.../spans \\
  -H "Authorization: Bearer $OMIUM_API_KEY" \\
  -H "Accept: text/event-stream"`}
      />
      <p>
        Set <code>OMIUM_OTLP_ENDPOINT</code> to forward traces to your own
        OpenTelemetry collector — useful when you want Omium spans next to
        application spans in your existing observability stack.
      </p>

      <h2 id="policy">Policy engine</h2>
      <p>
        The policy engine constrains what runs can do — which tools they can
        call, which models they can route to, and what budget they can consume.
        Policies are evaluated at every step boundary and are{" "}
        <strong>deny-by-default</strong>: anything not explicitly allowed is
        rejected.
      </p>
      <CodeBlock
        lang="yaml"
        filename="src/policies/prod.yaml"
        code={`name: prod-default
rules:
  - tools:
      allow: ["http.get", "vector.search", "db.read"]
      deny: ["shell.exec", "db.write"]
  - models:
      allow: ["anthropic/claude-sonnet-*", "anthropic/claude-haiku-*"]
  - budget:
      run_max_usd: 1.50
      workspace_daily_usd: 250`}
      />
      <p>
        Every policy decision is written to the audit log. Violations also
        emit a <code>policy.violated</code> webhook event so you can route
        them into alerts.
      </p>

      <h2 id="billing">Billing</h2>
      <p>Cost is metered at three layers:</p>
      <ul>
        <li>
          <strong>LLM provider invoice</strong> — pass-through, attributed
          per-span.
        </li>
        <li>
          <strong>Platform usage</strong> — billed per active step-minute.
          Idle wall-clock (waiting on an external system) doesn't count.
        </li>
        <li>
          <strong>Storage</strong> — traces and checkpoints, billed per
          GB-month after compaction.
        </li>
      </ul>
      <p>
        Each run carries an attributable cost line you can export to your
        warehouse via webhook or scheduled CSV drop.
      </p>
      <CodeBlock
        lang="json"
        filename="run.cost"
        code={`{
  "run_id": "run_01H8XK...",
  "llm_cost_usd": 0.0184,
  "platform_cost_usd": 0.0021,
  "storage_cost_usd": 0.0001,
  "total_usd": 0.0206
}`}
      />

      <h2 id="llm-routing">LLM routing</h2>
      <p>
        Routing policies pick the right model per request based on quality
        targets, latency budgets, and price ceilings. Declare routing at the
        step level or attach it to the entire workspace.
      </p>
      <CodeBlock
        lang="python"
        code={`from omium import route

router = route.policy(
    quality="high",
    candidates=[
        route.candidate("anthropic/claude-sonnet-4-6", weight=0.7),
        route.candidate(
            "anthropic/claude-haiku-4-5",
            weight=0.3,
            max_latency_ms=400,
        ),
    ],
    fallback="anthropic/claude-haiku-4-5",
)

answer = router.complete("Summarize this transcript", input=transcript)`}
      />
      <p>
        The router automatically <strong>circuit-breaks</strong> on a candidate
        that exceeds its latency target three times in a row, falling back to
        the next candidate or the declared <code>fallback</code>.
      </p>

      <h2 id="reliability">Reliability</h2>
      <p>Omium builds reliability primitives into the runtime so your workflow code stays simple:</p>
      <ul>
        <li>
          <strong>Exponential backoff with jitter</strong> on every retry.
          Configure via the <code>backoff</code> kwarg on <code>@step</code>.
        </li>
        <li>
          <strong>Dead-letter</strong> queues — runs that exhaust retries land
          in a per-workspace DLQ with full trace context.
        </li>
        <li>
          <strong>Circuit breaking</strong> per external dependency, with
          configurable open/half-open windows.
        </li>
        <li>
          <strong>Bounded concurrency</strong> via <code>parallel()</code>'s{" "}
          <code>max_concurrency</code> and workspace-level fairness limits.
        </li>
      </ul>

      <h2 id="observability">Observability</h2>
      <p>
        Omium emits the three classic pillars — logs, metrics, traces — and
        surfaces them in the dashboard or via your own OTel pipeline. The
        dashboard view defaults to <em>traces</em> because most workflow
        questions are span-shaped: which step was slow, which span burned
        tokens, which retry finally succeeded.
      </p>
      <p>
        Metrics worth alerting on:
      </p>
      <ul>
        <li><code>omium.step.duration_ms</code> (histogram, by workflow + step)</li>
        <li><code>omium.run.failed_total</code> (counter, by workflow + reason)</li>
        <li><code>omium.llm.cost_usd</code> (counter, by model)</li>
        <li><code>omium.policy.violations_total</code> (counter, by rule)</li>
      </ul>
    </DocLayout>
  );
}
