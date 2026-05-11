import { DocLayout } from "../components/DocLayout";
import { CodeBlock } from "../components/CodeBlock";

const toc = [
  { id: "install", label: "Install", depth: 2 as const },
  { id: "python", label: "Python SDK", depth: 2 as const },
  { id: "auth", label: "Authentication", depth: 3 as const },
  { id: "retries", label: "Retries & timeouts", depth: 3 as const },
  { id: "parallel", label: "Parallel execution", depth: 3 as const },
  { id: "checkpoints", label: "Checkpoints", depth: 3 as const },
  { id: "cli", label: "CLI", depth: 2 as const },
  { id: "examples", label: "Examples", depth: 2 as const },
  { id: "fanout", label: "Fan-out classifier", depth: 3 as const },
  { id: "etl", label: "Multi-step ETL", depth: 3 as const },
];

export function SDK() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "SDK" },
      ]}
      eyebrow="SDK reference"
      title="Python SDK & CLI"
      description="The Omium SDK gives you typed primitives for building workflows, plus a CLI for running, inspecting, and managing them."
      toc={toc}
      meta={{ updatedAt: "May 10, 2026", readTime: "10 min" }}
      prev={{ label: "Quickstart", to: "/docs/get-started" }}
      next={{ label: "API reference", to: "/docs/api-reference" }}
    >
      <p>
        The SDK has three surfaces: <strong>decorators</strong> for declaring
        workflows and steps, a <strong>Client</strong> object for managing
        runs and resources programmatically, and the <strong>CLI</strong> that
        wraps the same client for terminal use.
      </p>

      <h2 id="install">Install</h2>
      <CodeBlock lang="bash" code={`pip install omium    # or: uv add omium`} />

      <h2 id="python">Python SDK</h2>
      <p>
        Define workflows with the <code>@workflow</code> decorator and steps
        with <code>@step</code>. Steps are deterministic, retryable, and
        observable by default.
      </p>
      <CodeBlock
        lang="python"
        filename="pipeline.py"
        code={`from omium import workflow, step

@step
def extract(html: str) -> list[dict]:
    return parser.extract(html)

@workflow
def crawl(url: str) -> list[dict]:
    html = fetch(url)
    return extract(html)`}
      />

      <h3 id="auth">Authentication</h3>
      <p>
        The SDK reads <code>OMIUM_API_KEY</code> from the environment. You can
        also pass it explicitly per-client:
      </p>
      <CodeBlock
        lang="python"
        code={`from omium import Client

client = Client(
    api_key="omk_live_...",
    workspace="acme-prod",
    base_url="https://api.omium.ai/v1",  # optional override
)
client.runs.list(limit=10)`}
      />

      <h3 id="retries">Retries & timeouts</h3>
      <p>
        Configure retry and timeout behavior per step. Backoff is exponential
        with jitter by default; override with the <code>backoff</code> kwarg.
      </p>
      <CodeBlock
        lang="python"
        code={`from omium import step

@step(
    retries=3,
    timeout="30s",
    backoff="exponential",          # "exponential" | "linear" | "constant"
    retry_on=(TimeoutError, ConnectionError),
)
def fetch(url: str) -> str:
    return httpx.get(url, timeout=10).text`}
      />
      <p>
        Failed steps emit a <code>step.failed</code> span and bubble up unless
        wrapped in <code>try/except</code>. The retry counter is exposed via{" "}
        <code>omium.context.attempt</code>.
      </p>

      <h3 id="parallel">Parallel execution</h3>
      <p>
        Fan out a step across many inputs with <code>parallel()</code>. Results
        are returned in input order.
      </p>
      <CodeBlock
        lang="python"
        code={`from omium import workflow, step, parallel

@step(retries=2)
def classify(item: dict) -> dict:
    return {"id": item["id"], "label": llm.classify(item["text"])}

@workflow
def label_corpus(items: list[dict]) -> list[dict]:
    return parallel(classify, items, max_concurrency=16)`}
      />

      <h3 id="checkpoints">Checkpoints</h3>
      <p>
        Call <code>checkpoint()</code> to capture durable state during a run.
        Combine an optional payload so resumption can short-circuit work.
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

      <h2 id="cli">CLI</h2>
      <p>
        The CLI ships with the SDK. It mirrors every client method and adds a
        few terminal-friendly helpers like live tailing.
      </p>
      <CodeBlock
        lang="bash"
        code={`# Run a workflow defined in a Python module
omium run pipeline.py::crawl --arg url=https://example.com

# List, show, watch
omium runs list --status failed --limit 20
omium runs show run_01H8...
omium runs watch run_01H8... --follow

# Resume from the latest (or named) checkpoint
omium runs resume run_01H8...
omium runs resume run_01H8... --from cleaned

# Stream spans for a trace
omium traces tail tr_01H8... --follow

# Attach and detach policies
omium policies attach prod-default --workspace acme-prod
omium policies detach pol_01H8...`}
      />
      <p>
        Output is plain text by default and JSON with <code>--json</code> —
        ideal for piping into <code>jq</code>:
      </p>
      <CodeBlock
        lang="bash"
        code={`omium runs list --json --status succeeded \\
  | jq '.[] | {id, duration_ms, cost_usd}'`}
      />

      <h2 id="examples">Examples</h2>

      <h3 id="fanout">Fan-out classifier</h3>
      <p>
        Label a large corpus with bounded concurrency. The checkpoint after
        fan-out means a failure during <code>write</code> won't re-run the
        expensive classification.
      </p>
      <CodeBlock
        lang="python"
        filename="fanout.py"
        code={`from omium import workflow, step, parallel, checkpoint

@step(retries=2, timeout="45s")
def classify(item: dict) -> dict:
    label = llm.classify(item["text"], labels=["news", "spam", "review"])
    return {"id": item["id"], "label": label}

@step
def write(rows: list[dict]) -> None:
    db.bulk_insert("labeled", rows)

@workflow
def label_corpus(items: list[dict]) -> int:
    labeled = parallel(classify, items, max_concurrency=24)
    checkpoint("labeled", payload={"count": len(labeled)})
    write(labeled)
    return len(labeled)`}
      />
      <CodeBlock
        lang="bash"
        code={`omium run fanout.py::label_corpus --arg-file items.json --watch`}
      />

      <h3 id="etl">Multi-step ETL</h3>
      <p>
        A more realistic pipeline with extraction, transformation, validation,
        and load. Each stage is independently retryable; failures resume from
        the last good checkpoint.
      </p>
      <CodeBlock
        lang="python"
        filename="etl.py"
        code={`from omium import workflow, step, checkpoint

@step(retries=3, timeout="60s")
def extract(source: str) -> list[dict]:
    return s3.read_jsonl(source)

@step
def transform(rows: list[dict]) -> list[dict]:
    return [normalize(r) for r in rows]

@step
def validate(rows: list[dict]) -> list[dict]:
    bad = [r for r in rows if not schema.is_valid(r)]
    if bad:
        raise ValueError(f"{len(bad)} rows failed validation")
    return rows

@step(retries=5)
def load(rows: list[dict]) -> None:
    warehouse.upsert("events", rows, key="id")

@workflow
def daily_etl(source: str) -> int:
    rows = extract(source)
    checkpoint("extracted", payload={"count": len(rows)})

    rows = transform(rows)
    rows = validate(rows)
    checkpoint("validated")

    load(rows)
    return len(rows)`}
      />
      <p>
        Schedule it from your own cron, an Airflow DAG, or Omium's hosted
        scheduler — the workflow code stays the same in every case.
      </p>
    </DocLayout>
  );
}
