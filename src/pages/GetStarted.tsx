import { DocLayout } from "../components/DocLayout";
import { CodeBlock } from "../components/CodeBlock";

const toc = [
  { id: "prerequisites", label: "Prerequisites", depth: 2 as const },
  { id: "installation", label: "Installation", depth: 2 as const },
  { id: "verify", label: "Verify the install", depth: 3 as const },
  { id: "auth", label: "Authentication", depth: 2 as const },
  { id: "first-run", label: "Your first run", depth: 2 as const },
  { id: "inspect", label: "Inspect the run", depth: 3 as const },
  { id: "structure", label: "Project structure", depth: 2 as const },
  { id: "next-steps", label: "Next steps", depth: 2 as const },
];

export function GetStarted() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Get started" },
      ]}
      eyebrow="Get started"
      title="Quickstart"
      description="Install the Omium SDK, authenticate, and run your first workflow in under five minutes."
      toc={toc}
      meta={{ updatedAt: "May 8, 2026", readTime: "5 min" }}
      next={{ label: "Explore the SDK", to: "/docs/sdk" }}
    >
      <p>
        Omium is a workflow platform for production AI systems. This guide walks
        you through installing the SDK, configuring authentication, and
        executing a first workflow end-to-end. If you prefer to read about the
        platform model first, jump to{" "}
        <a href="/docs/concepts">platform concepts</a>.
      </p>

      <h2 id="prerequisites">Prerequisites</h2>
      <ul>
        <li>Python <strong>3.10 or newer</strong> (3.12 recommended)</li>
        <li>An Omium workspace — sign up at <code>app.omium.ai</code></li>
        <li>A workspace API key from <strong>Settings → API keys</strong></li>
        <li>macOS, Linux, or Windows (WSL2 supported, native Windows is best-effort)</li>
      </ul>

      <h2 id="installation">Installation</h2>
      <p>
        Install the SDK from PyPI. The package ships the <code>omium</code> CLI
        as a console entry point, so a single install gets you both.
      </p>
      <CodeBlock lang="bash" code={`pip install omium`} />
      <p>Or with the faster <code>uv</code> resolver:</p>
      <CodeBlock lang="bash" code={`uv add omium`} />

      <h3 id="verify">Verify the install</h3>
      <p>Check that the CLI is on your PATH:</p>
      <CodeBlock
        lang="bash"
        code={`$ omium --version
omium 0.9.2 (python 3.12.3, darwin-arm64)`}
      />

      <h2 id="auth">Authentication</h2>
      <p>
        The SDK and CLI both read the <code>OMIUM_API_KEY</code> environment
        variable. Export it in your shell profile, or put it in a{" "}
        <code>.env</code> file at the repo root.
      </p>
      <CodeBlock lang="bash" code={`export OMIUM_API_KEY="omk_live_..."`} />
      <CodeBlock
        lang="bash"
        filename=".env"
        code={`OMIUM_API_KEY=omk_live_...
OMIUM_WORKSPACE=acme-prod   # optional — pin to a specific workspace`}
      />
      <p>
        If you belong to multiple workspaces, set <code>OMIUM_WORKSPACE</code>{" "}
        or pass <code>--workspace</code> to any CLI command. The SDK accepts an
        explicit key too:
      </p>
      <CodeBlock
        lang="python"
        code={`from omium import Client

client = Client(api_key="omk_live_...", workspace="acme-prod")
client.runs.list(limit=5)`}
      />

      <h2 id="first-run">Your first run</h2>
      <p>
        Create <code>hello.py</code> with a tiny two-step workflow that fetches
        a page and summarizes it. Omium will route the LLM call through your
        workspace's configured routing policy.
      </p>
      <CodeBlock
        lang="python"
        filename="hello.py"
        showLineNumbers
        code={`from omium import workflow, step, llm

@step(retries=2, timeout="20s")
def fetch(url: str) -> str:
    import httpx
    return httpx.get(url, timeout=10).text

@step
def summarize(text: str) -> str:
    return llm.complete(
        f"Summarize the following page in 3 bullets:\\n\\n{text[:8000]}",
        max_tokens=180,
    )

@workflow
def page_summary(url: str) -> str:
    html = fetch(url)
    return summarize(html)

if __name__ == "__main__":
    result = page_summary.run("https://omium.ai/blog/launch")
    print(result)`}
      />
      <p>Run it from the command line:</p>
      <CodeBlock lang="bash" code={`python hello.py`} />

      <h3 id="inspect">Inspect the run</h3>
      <p>
        Every <code>.run()</code> creates a trace with one span per step. List
        recent runs from the CLI:
      </p>
      <CodeBlock
        lang="bash"
        code={`$ omium runs list --limit 3
ID                STATUS     WORKFLOW       DURATION   COST
run_01H8XKQ4...   succeeded  page_summary   2.41s      $0.0019
run_01H8XKP1...   succeeded  page_summary   2.07s      $0.0017
run_01H8XKM0...   failed     page_summary   0.42s      $0.0000`}
      />
      <p>Drill into a specific run to see span timings and token usage:</p>
      <CodeBlock
        lang="bash"
        code={`$ omium runs show run_01H8XKQ4 --include spans
workflow:  page_summary
status:    succeeded
duration:  2.41s

spans:
  fetch         412ms   ↳ httpx.get
  summarize    1.93s   ↳ anthropic/claude-sonnet-4-6  (in 84 / out 119 tokens)`}
      />

      <h2 id="structure">Project structure</h2>
      <p>
        For anything beyond a single script, we recommend the following layout.
        The SDK auto-discovers workflows under <code>src/</code> when you point
        the CLI at <code>omium.yaml</code>.
      </p>
      <CodeBlock
        lang="bash"
        code={`my-project/
├── omium.yaml             # workspace + routing config
├── pyproject.toml
└── src/
    ├── workflows/
    │   ├── ingest.py
    │   └── summarize.py
    └── policies/
        └── prod.yaml`}
      />
      <CodeBlock
        lang="yaml"
        filename="omium.yaml"
        code={`workspace: acme-prod
runtime:
  python: "3.12"
routing:
  default: anthropic/claude-sonnet-4-6
  fallback: anthropic/claude-haiku-4-5
policies:
  - src/policies/prod.yaml`}
      />

      <h2 id="next-steps">Next steps</h2>
      <ul>
        <li>
          Read the <a href="/docs/sdk">SDK reference</a> for every decorator,
          helper, and CLI command.
        </li>
        <li>
          Learn the <a href="/docs/concepts#workflows">workflow model</a> and
          how <a href="/docs/concepts#checkpointing">checkpointing</a> makes
          long-running runs resumable.
        </li>
        <li>
          Jump into the <a href="/docs/api-reference">REST API reference</a> if
          you want to integrate Omium without the SDK.
        </li>
        <li>
          Configure <a href="/docs/concepts#llm-routing">LLM routing</a> to
          balance cost and latency across providers.
        </li>
      </ul>
    </DocLayout>
  );
}
