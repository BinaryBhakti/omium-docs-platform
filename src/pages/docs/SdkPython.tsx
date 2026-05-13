import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout } from "../../components/Callout";
import { Tabs } from "../../components/Tabs";
import { MdxTable } from "../../components/MdxTable";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { Terminal, Webhook } from "lucide-react";

const toc = [
  { id: "install", label: "Install", depth: 2 as const },
  { id: "init", label: "Initialize", depth: 2 as const },
  { id: "config", label: "OmiumConfig reference", depth: 2 as const },
  { id: "auto", label: "Auto-instrumentation", depth: 2 as const },
  { id: "manual", label: "Manual tracing", depth: 2 as const },
  { id: "callbacks", label: "LangChain callbacks", depth: 2 as const },
  { id: "execution", label: "Execution-ID correlation", depth: 2 as const },
  { id: "errors", label: "Error handling", depth: 2 as const },
  { id: "next", label: "Next steps", depth: 2 as const },
];

export function SdkPython() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "SDK and CLI" },
        { label: "Python SDK" },
      ]}
      eyebrow="SDK and CLI"
      title="Python SDK"
      description="Initialize Omium, instrument frameworks, and add manual tracing or checkpoints."
      toc={toc}
      complexity="intermediate"
      etaMinutes={7}
      prev={{ label: "Billing", to: "/docs/api/billing" }}
      next={{ label: "CLI reference", to: "/docs/sdk/cli" }}
    >
      <p>
        The Python SDK is the primary integration surface for Omium. In most
        codebases you'll:
      </p>
      <ul>
        <li>
          call <code>omium.init()</code> once at process start
        </li>
        <li>
          let auto-instrumentation handle <strong>LangGraph</strong> and{" "}
          <strong>CrewAI</strong>
        </li>
        <li>
          decorate hot paths with <code>@omium.trace</code> and{" "}
          <code>@omium.checkpoint</code> where you want stable span names or
          recovery points
        </li>
      </ul>

      <h2 id="install">Install</h2>
      <CodeBlock lang="bash" code={`pip install omium`} />
      <p>
        If you haven't authenticated yet, see{" "}
        <a href="/docs/getting-started/configure">Configure</a>.
      </p>

      <h2 id="init">Initialize</h2>
      <p>
        <code>omium.init()</code> is the single entry point. Call it once,
        before your first traced call. The function is idempotent — calling
        it again logs a warning and returns the existing config.
      </p>
      <Tabs
        tabs={[
          {
            title: "From environment",
            content: (
              <>
                <p style={{ padding: "0 12px" }}>
                  When <code>OMIUM_API_KEY</code> and <code>OMIUM_API_URL</code>{" "}
                  are set in the process environment:
                </p>
                <CodeBlock
                  lang="python"
                  code={`import omium

omium.init(project="my-agent")`}
                />
              </>
            ),
          },
          {
            title: "Inline kwargs",
            content: (
              <CodeBlock
                lang="python"
                code={`import omium

omium.init(
    api_key="om_xxx",
    project="my-agent",
    debug=True,
)`}
              />
            ),
          },
        ]}
      />
      <Callout variant="note">
        The SDK does not read the CLI's <code>~/.omium/config.json</code> file
        directly. To run a script using credentials saved by{" "}
        <code>omium init</code>, invoke it via <code>omium run script.py</code>{" "}
        — the CLI exports the saved values into the child process.
      </Callout>

      <h3 id="signature">init() signature</h3>
      <CodeBlock
        lang="python"
        code={`omium.init(
    api_key: str | None = None,
    project: str | None = None,
    auto_trace: bool = True,
    auto_checkpoint: bool = True,
    checkpoint_strategy: str = "node",   # "node" | "task" | "agent" | "manual"
    api_base_url: str | None = None,
    debug: bool = False,
) -> OmiumConfig`}
      />

      <h2 id="config">OmiumConfig reference</h2>
      <p>
        <code>omium.init()</code> returns an <code>OmiumConfig</code> instance.
        Call <code>omium.configure(**kwargs)</code> to update fields after
        initialization, or read the live config with{" "}
        <code>omium.get_current_config()</code>.
      </p>
      <Callout variant="warn">
        <code>configure()</code> takes keyword arguments, not an{" "}
        <code>OmiumConfig</code> instance. Passing a dataclass to it will
        silently no-op.
      </Callout>
      <CodeBlock
        lang="python"
        code={`import omium

omium.init(api_key="om_xxx", project="my-agent")

# Later — update one field:
omium.configure(auto_checkpoint=False)

# Inspect the active config:
cfg = omium.get_current_config()
print(cfg.project, cfg.auto_trace)`}
      />
      <h3 id="fields">Fields</h3>
      <MdxTable
        head={["Field", "Type", "Default", "Notes"]}
        rows={[
          [<code>api_key</code>, "str", "—", <span>Accepts <code>om_…</code> or <code>omium_…</code>.</span>],
          [<code>project</code>, "str", <code>"default"</code>, "Groups traces in the dashboard."],
          [<code>auto_trace</code>, "bool", <code>True</code>, "Patches LangGraph/CrewAI on init."],
          [<code>auto_checkpoint</code>, "bool", <code>True</code>, "Persists state via @checkpoint."],
          [
            <code>checkpoint_strategy</code>,
            <code>str</code>,
            <code>"node"</code>,
            <span>One of <code>node</code> / <code>task</code> / <code>agent</code> / <code>manual</code>.</span>,
          ],
          [
            <code>api_base_url</code>,
            "str",
            <code>https://api.omium.ai/api/v1</code>,
            <span>
              SDK auto-appends <code>/api/v1</code> if you supply only the
              base.
            </span>,
          ],
          [<code>debug</code>, "bool", <code>False</code>, "Verbose SDK logging."],
        ]}
      />

      <h2 id="auto">Auto-instrumentation</h2>
      <p>
        With <code>auto_trace=True</code> (the default),{" "}
        <code>omium.init()</code> detects installed frameworks and patches
        their entry points. You can also call the instrumenters directly when
        you need explicit control.
      </p>
      <h3 id="langgraph">LangGraph</h3>
      <CodeBlock
        lang="python"
        code={`import omium

omium.init(project="my-graph")
omium.instrument_langgraph()      # explicit form; init() also calls this

# CompiledStateGraph.invoke / ainvoke / stream / astream are now traced.
result = app.invoke({"input": "hello"})

omium.uninstrument_langgraph()    # restore original methods (tests, A/B)`}
      />
      <p>
        Full guide:{" "}
        <a href="/docs/build-with-omium/langgraph">LangGraph integration</a>.
      </p>
      <h3 id="crewai">CrewAI</h3>
      <CodeBlock
        lang="python"
        code={`import omium

omium.init(project="my-crew")
omium.instrument_crewai()

# Crew.kickoff / kickoff_async / kickoff_for_each are now traced.
result = crew.kickoff()

omium.uninstrument_crewai()`}
      />

      <h2 id="manual">Manual tracing</h2>
      <p>
        Reach for the decorators when auto-instrumentation isn't enough:
        custom logic outside a framework, code paths you want pinned with a
        stable span name, or expensive steps you want to resume from.
      </p>
      <h3 id="trace">@omium.trace</h3>
      <CodeBlock
        lang="python"
        code={`@omium.trace(
    name="extract",        # defaults to the function name
    span_type="function",  # "function" | "tool" | "llm" | …
    capture_input=True,
    capture_output=True,
    capture_errors=True,
)
def extract(payload: dict) -> dict:
    return {"ok": True, "payload": payload}`}
      />
      <p>
        Works on both sync and async functions — the decorator detects which
        one it's wrapping. Set <code>capture_input=False</code> on functions
        that take secrets or large blobs you don't want stored.
      </p>
      <h3 id="checkpoint">@omium.checkpoint</h3>
      <CodeBlock
        lang="python"
        code={`@omium.checkpoint(
    name="after_extract",
    capture_state=True,
    on_error="skip",   # "skip" | "raise" | "log"
)
def expensive_step(state: dict) -> dict:
    return state`}
      />
      <MdxTable
        head={["on_error", "Behaviour when checkpoint write fails"]}
        rows={[
          [<code>"skip"</code>, "Silently continue execution (default)."],
          [<code>"log"</code>, "Emit a warning and continue."],
          [<code>"raise"</code>, "Propagate the exception."],
        ]}
      />

      <h2 id="callbacks">LangChain callbacks</h2>
      <p>
        Use <code>OmiumCallbackHandler</code> for LangChain chains and
        Runnables that aren't covered by the LangGraph patcher.
      </p>
      <CodeBlock
        lang="python"
        code={`from omium import OmiumCallbackHandler

handler = OmiumCallbackHandler()
chain.invoke(input, config={"callbacks": [handler]})`}
      />

      <h2 id="execution">Execution-ID correlation</h2>
      <p>
        When a run is started through the Execution Engine (REST API,
        webhook, or another service), correlate Python-side traces with the
        engine's <code>execution_id</code> by setting it explicitly:
      </p>
      <CodeBlock
        lang="python"
        code={`import omium

omium.init(api_key="om_xxx")
omium.set_execution_id("exec_abc123")

# Subsequent spans, including LangGraph/CrewAI patches, use this ID.
graph.invoke({"input": "hello"})

print(omium.get_execution_id())  # -> "exec_abc123"`}
      />

      <h2 id="errors">Error handling</h2>
      <p>
        Omium aims to never break your code. If trace ingestion or checkpoint
        writes fail, the SDK logs a warning and lets your program continue.
        For explicit error handling against the checkpoint manager directly,
        the legacy client surface raises typed exceptions:
      </p>
      <CodeBlock
        lang="python"
        code={`from omium import (
    OmiumClient,
    CheckpointError,
    CheckpointNotFoundError,
    CheckpointValidationError,
)

try:
    client = OmiumClient(checkpoint_manager_url="localhost:7001")
    await client.connect()
    await client.load_checkpoint("does_not_exist")
except CheckpointNotFoundError:
    ...
except CheckpointValidationError:
    ...
except CheckpointError:
    ...`}
      />
      <p>
        Keep retries and fallbacks at the boundary of your system (HTTP
        handler, queue worker) rather than inside step functions.
      </p>

      <h2 id="next">Next steps</h2>
      <DocCardGrid>
        <DocCard
          title="CLI reference"
          description="Authenticate, run scripts, inspect traces, replay failures, push projects."
          to="/docs/sdk/cli"
          icon={Terminal}
        />
        <DocCard
          title="API overview"
          description="Use Omium from any language via HTTP."
          to="/docs/api/overview"
          icon={Webhook}
        />
      </DocCardGrid>
    </DocLayout>
  );
}
