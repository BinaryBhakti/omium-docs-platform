import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { MdxTable } from "../../components/MdxTable";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { Network, Code } from "lucide-react";

const toc = [
  { id: "quickstart", label: "Quickstart", depth: 2 as const },
  { id: "captures", label: "What Omium captures", depth: 2 as const },
  { id: "lifecycle", label: "Instrumentation lifecycle", depth: 2 as const },
  { id: "async", label: "Async and batch execution", depth: 2 as const },
  { id: "config", label: "Configuration", depth: 2 as const },
  { id: "troubleshoot", label: "Troubleshooting", depth: 2 as const },
  { id: "next", label: "Next steps", depth: 2 as const },
];

export function BuildCrewAI() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Build with Omium" },
        { label: "CrewAI" },
      ]}
      eyebrow="Build with Omium"
      title="CrewAI"
      description="Automatic tracing and checkpoints for CrewAI crews."
      toc={toc}
      complexity="intermediate"
      etaMinutes={5}
      prev={{ label: "LangGraph", to: "/docs/build-with-omium/langgraph" }}
      next={{ label: "API overview", to: "/docs/api/overview" }}
    >
      <p>
        Omium instruments CrewAI at runtime. Once enabled, your{" "}
        <code>kickoff()</code> runs are traced without restructuring agents or
        tasks.
      </p>

      <h2 id="quickstart">Quickstart</h2>
      <p>Install both packages:</p>
      <CodeBlock lang="bash" code={`pip install omium crewai`} />
      <p>
        Initialise Omium once at startup. <code>omium.init()</code>{" "}
        auto-detects CrewAI and patches <code>Crew.kickoff()</code> for you
        when <code>auto_trace=True</code> (the default). Calling{" "}
        <code>instrument_crewai()</code> explicitly is safe and idempotent.
      </p>
      <CodeBlock
        lang="python"
        code={`import omium

omium.init(project="my-crew")
omium.instrument_crewai()  # optional — init() already did this`}
      />
      <p>Run your crew normally:</p>
      <CodeBlock
        lang="python"
        code={`from crewai import Crew, Agent, Task

researcher = Agent(role="Researcher", goal="Find AI news", backstory="You research quickly.")
task = Task(description="Summarize the latest AI agent news.", agent=researcher)

crew = Crew(agents=[researcher], tasks=[task])
result = crew.kickoff()`}
      />
      <p>
        Open{" "}
        <a href="https://app.omium.ai" target="_blank" rel="noreferrer">
          app.omium.ai
        </a>{" "}
        to view the execution.
      </p>

      <h2 id="captures">What Omium captures</h2>
      <MdxTable
        head={["Signal", "Notes"]}
        rows={[
          [
            <strong>Execution ID</strong>,
            <span>
              One per <code>kickoff()</code> run.
            </span>,
          ],
          [
            <strong>Agent &amp; task metadata</strong>,
            "Counts, roles, and step events.",
          ],
          [
            <strong>Outputs</strong>,
            "Final run output and intermediate events (where available).",
          ],
          [<strong>Errors</strong>, "Exceptions and failure context."],
        ]}
      />

      <h2 id="lifecycle">Instrumentation lifecycle</h2>
      <h3 id="enable">Enable instrumentation</h3>
      <CodeBlock
        lang="python"
        code={`import omium

omium.init()
omium.instrument_crewai()`}
      />
      <h3 id="disable">Disable instrumentation</h3>
      <CodeBlock
        lang="python"
        code={`import omium

omium.uninstrument_crewai()`}
      />

      <h2 id="async">Async and batch execution</h2>
      <p>CrewAI async runs are traced:</p>
      <CodeBlock lang="python" code={`# result = await crew.kickoff_async()`} />
      <p>Batch runs are also captured:</p>
      <CodeBlock
        lang="python"
        code={`inputs = [{"topic": "Agents"}, {"topic": "RAG"}]
results = crew.kickoff_for_each(inputs)`}
      />

      <h2 id="config">Configuration</h2>
      <p>
        Pass options to <code>omium.init()</code>. Use{" "}
        <code>checkpoint_strategy="task"</code> if you want a checkpoint after
        every CrewAI task rather than every node:
      </p>
      <CodeBlock
        lang="python"
        code={`import omium

omium.init(
    api_key="om_xxx",
    project="my-crewai-app",
    auto_trace=True,
    auto_checkpoint=True,
    checkpoint_strategy="task",
)

# Update fields later (keyword args, not an OmiumConfig instance):
omium.configure(auto_checkpoint=False)`}
      />

      <h2 id="troubleshoot">Troubleshooting</h2>
      <h3 id="no-traces">Traces not appearing</h3>
      <ul>
        <li>
          Ensure <code>omium.init()</code> is called before{" "}
          <code>instrument_crewai()</code>.
        </li>
        <li>
          Confirm your API key and URL with{" "}
          <a href="/docs/getting-started/configure">Configure</a>.
        </li>
        <li>
          Verify connectivity to <code>https://api.omium.ai</code>.
        </li>
      </ul>
      <h3 id="import">ImportError: CrewAI is not installed</h3>
      <CodeBlock lang="bash" code={`pip install crewai`} />

      <h2 id="next">Next steps</h2>
      <DocCardGrid>
        <DocCard
          title="LangGraph"
          description="Auto-instrument graph runs and streaming."
          to="/docs/build-with-omium/langgraph"
          icon={Network}
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
