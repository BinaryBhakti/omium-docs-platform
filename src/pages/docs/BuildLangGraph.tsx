import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout } from "../../components/Callout";
import { MdxTable } from "../../components/MdxTable";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { Users, Code } from "lucide-react";

const toc = [
  { id: "quickstart", label: "Quickstart", depth: 2 as const },
  { id: "captures", label: "What Omium captures", depth: 2 as const },
  { id: "lifecycle", label: "Instrumentation lifecycle", depth: 2 as const },
  { id: "async", label: "Async and streaming", depth: 2 as const },
  { id: "config", label: "Configuration", depth: 2 as const },
  { id: "troubleshoot", label: "Troubleshooting", depth: 2 as const },
  { id: "next", label: "Next steps", depth: 2 as const },
];

export function BuildLangGraph() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Build with Omium" },
        { label: "LangGraph" },
      ]}
      eyebrow="Build with Omium"
      title="LangGraph"
      description="Automatic tracing and checkpoints for LangGraph applications."
      toc={toc}
      complexity="intermediate"
      etaMinutes={6}
      prev={{
        label: "Platform capabilities",
        to: "/docs/build-with-omium/overview",
      }}
      next={{ label: "CrewAI", to: "/docs/build-with-omium/crewai" }}
    >
      <Callout variant="note">
        Omium patches <code>CompiledStateGraph</code> at runtime. Once
        enabled, every call to <code>invoke()</code>, <code>ainvoke()</code>,{" "}
        <code>stream()</code>, and <code>astream()</code> is traced without
        touching your graph definition.
      </Callout>

      <h2 id="quickstart">Quickstart</h2>
      <p>Install both packages:</p>
      <CodeBlock lang="bash" code={`pip install omium langgraph`} />
      <p>
        Initialise Omium once at process start. With{" "}
        <code>auto_trace=True</code> (the default), <code>omium.init()</code>{" "}
        detects LangGraph and calls <code>instrument_langgraph()</code> for
        you. Calling it explicitly is fine too — it's idempotent.
      </p>
      <CodeBlock
        lang="python"
        code={`import omium

# Reads OMIUM_API_KEY / OMIUM_API_URL from the environment, or pass
# api_key="om_xxx" inline.
omium.init(project="my-graph")

# Optional — init() already did this if LangGraph was importable:
omium.instrument_langgraph()`}
      />
      <p>Your graph code runs unchanged:</p>
      <CodeBlock
        lang="python"
        code={`from langgraph.graph import StateGraph

graph = StateGraph(dict)
# … add nodes and edges …
app = graph.compile()

result = app.invoke({"input": "Hello"})`}
      />
      <p>
        Open{" "}
        <a href="https://app.omium.ai" target="_blank" rel="noreferrer">
          app.omium.ai
        </a>{" "}
        to view the execution and trace.
      </p>

      <h2 id="captures">What Omium captures</h2>
      <MdxTable
        head={["Signal", "Notes"]}
        rows={[
          [
            <strong>Execution ID</strong>,
            <span>
              One per graph run (<code>invoke</code> / <code>ainvoke</code>).
            </span>,
          ],
          [
            <strong>Inputs &amp; outputs</strong>,
            "Initial state and final state for the run.",
          ],
          [
            <strong>Timing</strong>,
            "Total duration and step timings (where available).",
          ],
          [
            <strong>Errors</strong>,
            "Exceptions and failure context for debugging.",
          ],
          [
            <strong>Streaming metadata</strong>,
            "For streaming runs, counts and progress events.",
          ],
        ]}
      />

      <h2 id="lifecycle">Instrumentation lifecycle</h2>
      <h3 id="enable">Enable instrumentation</h3>
      <p>
        Call <code>instrument_langgraph()</code> once at process start (before
        you begin running graphs):
      </p>
      <CodeBlock
        lang="python"
        code={`import omium

omium.init()
omium.instrument_langgraph()`}
      />
      <h3 id="disable">Disable instrumentation</h3>
      <p>Temporarily turn it off (for debugging or A/B testing):</p>
      <CodeBlock
        lang="python"
        code={`import omium

omium.uninstrument_langgraph()`}
      />

      <h2 id="async">Async and streaming</h2>
      <p>Omium supports both sync and async execution.</p>
      <CodeBlock
        lang="python"
        code={`import omium

omium.init()
omium.instrument_langgraph()

# Sync streaming
for chunk in app.stream({"input": "Hello"}):
    print(chunk)

# Async invoke / stream
# result = await app.ainvoke({"input": "Hello"})
# async for chunk in app.astream({"input": "Hello"}):
#     print(chunk)`}
      />

      <h2 id="config">Configuration</h2>
      <p>
        Pass settings directly to <code>omium.init()</code>, or update fields
        afterward with <code>omium.configure(**kwargs)</code>:
      </p>
      <CodeBlock
        lang="python"
        code={`import omium

omium.init(
    api_key="om_xxx",
    project="my-langgraph-app",
    auto_trace=True,
    auto_checkpoint=True,
    checkpoint_strategy="node",   # "node" | "task" | "agent" | "manual"
)

# Update specific fields later (keyword args, not an OmiumConfig instance):
omium.configure(auto_checkpoint=False)`}
      />

      <h2 id="troubleshoot">Troubleshooting</h2>
      <h3 id="no-traces">Traces not appearing</h3>
      <ul>
        <li>
          Ensure <code>omium.init()</code> is called before{" "}
          <code>instrument_langgraph()</code>.
        </li>
        <li>
          Confirm your API key and URL with{" "}
          <a href="/docs/getting-started/configure">Configure</a>.
        </li>
        <li>
          Verify connectivity to <code>https://api.omium.ai</code>.
        </li>
      </ul>
      <h3 id="import">ImportError: LangGraph is not installed</h3>
      <CodeBlock lang="bash" code={`pip install langgraph`} />

      <h2 id="next">Next steps</h2>
      <DocCardGrid>
        <DocCard
          title="CrewAI"
          description="Auto-instrument kickoff() and multi-agent runs."
          to="/docs/build-with-omium/crewai"
          icon={Users}
        />
        <DocCard
          title="Python SDK"
          description="Full SDK reference for tracing and checkpoints."
          to="/docs/sdk/python-sdk"
          icon={Code}
        />
      </DocCardGrid>
    </DocLayout>
  );
}
