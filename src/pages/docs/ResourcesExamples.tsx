import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { Rocket, Code, Megaphone, Webhook } from "lucide-react";

const toc = [
  { id: "e1", label: "Minimal manual tracing", depth: 2 as const },
  { id: "e2", label: "Checkpoints with the decorator and context manager", depth: 2 as const },
  { id: "e3", label: 'LangGraph "instrument once"', depth: 2 as const },
  { id: "e4", label: 'CrewAI "instrument once"', depth: 2 as const },
  { id: "e5", label: "Environment-first configuration", depth: 2 as const },
  { id: "e6", label: "Drive recovery via HTTP (replay)", depth: 2 as const },
];

export function ResourcesExamples() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Resources" },
        { label: "Examples" },
      ]}
      eyebrow="Resources"
      title="Examples"
      description="Patterns drawn from the omium-platform examples/ folder."
      toc={toc}
      complexity="beginner"
      etaMinutes={6}
      prev={{
        label: "API keys and billing",
        to: "/docs/platform/api-keys-billing",
      }}
      next={{ label: "Release notes", to: "/docs/resources/release-notes" }}
    >
      <p>
        Every snippet here is adapted from the runnable examples under{" "}
        <code>sdk/python/examples/</code>. Copy them into your own repo and
        scale up — each is intentionally small so you can validate
        end-to-end before adding complexity.
      </p>

      <h2 id="e1">Example 1: Minimal manual tracing</h2>
      <p>
        Use this when you're not running LangGraph or CrewAI yet — or when
        you want stable span names regardless of framework changes.
      </p>
      <CodeBlock
        lang="python"
        filename="minimal_trace.py"
        code={`import omium

omium.init(project="quickstart")


@omium.trace("extract")
def extract(text: str) -> dict:
    return {"length": len(text)}


@omium.checkpoint("after_extract")
def next_step(state: dict) -> dict:
    return {"ok": True, **state}


if __name__ == "__main__":
    state = extract("hello")
    print(next_step(state))`}
      />

      <h2 id="e2">Example 2: Checkpoints with the decorator and context manager</h2>
      <p>
        Adapted from <code>examples/basic_checkpoint.py</code>. The decorator
        suits step-shaped code; the context manager suits long-running
        blocks where you want to update state as you go.
      </p>
      <CodeBlock
        lang="python"
        filename="basic_checkpoint.py"
        code={`import asyncio
from omium import OmiumClient, checkpoint, Checkpoint


@checkpoint("validate_data")
async def validate_data(data: dict) -> dict:
    assert data is not None and data.get("value", 0) > 0
    return {"validated": True, "data": data}


async def process_with_checkpoint(data: dict):
    client = OmiumClient(checkpoint_manager_url="localhost:7001")
    await client.connect()
    client.set_execution_context(execution_id="exec_123", agent_id="agent_1")

    try:
        async with Checkpoint("important_processing", client=client) as cp:
            result = {"processed": True, "data": data}
            cp.update_state(step="processing_complete")
            return result
    finally:
        await client.close()


if __name__ == "__main__":
    asyncio.run(validate_data({"value": 42}))
    asyncio.run(process_with_checkpoint({"value": 100}))`}
      />

      <h2 id="e3">Example 3: LangGraph "instrument once"</h2>
      <CodeBlock
        lang="python"
        code={`import omium
from langgraph.graph import StateGraph

omium.init(project="langgraph-demo")
# init() auto-detects LangGraph; this call is optional and idempotent:
omium.instrument_langgraph()

graph = StateGraph(dict)
# … add nodes and edges …
app = graph.compile()

result = app.invoke({"input": "Hello"})
print(result)`}
      />
      <p>
        Full guide:{" "}
        <a href="/docs/build-with-omium/langgraph">LangGraph integration</a>.
      </p>

      <h2 id="e4">Example 4: CrewAI "instrument once"</h2>
      <CodeBlock
        lang="python"
        code={`import omium
from crewai import Crew, Agent, Task

omium.init(project="crew-demo", checkpoint_strategy="task")
omium.instrument_crewai()  # optional — init() already did this

agent = Agent(
    role="Researcher",
    goal="Summarize",
    backstory="You write concise summaries.",
)
task = Task(description="Summarize: Hello world", agent=agent)

crew = Crew(agents=[agent], tasks=[task])
print(crew.kickoff())`}
      />
      <p>
        Full guide: <a href="/docs/build-with-omium/crewai">CrewAI integration</a>.
      </p>

      <h2 id="e5">Example 5: Environment-first configuration (CI pattern)</h2>
      <p>
        In CI/CD, prefer environment variables over local config files —
        they're easier to scope per-job and per-secret-rotation.
      </p>
      <CodeBlock
        lang="bash"
        code={`export OMIUM_API_KEY=om_your_key_here
export OMIUM_API_URL=https://api.omium.ai
export OMIUM_PROJECT=my-agent

python your_script.py`}
      />
      <p>
        Your script just calls <code>omium.init()</code> with no arguments
        and inherits everything from the environment. See{" "}
        <a href="/docs/configuration/environment">Environment variables</a>{" "}
        for the full list.
      </p>

      <h2 id="e6">Example 6: Drive recovery via HTTP (replay)</h2>
      <p>
        If you operate Omium from a non-Python control plane, replay a
        failed execution from a known checkpoint over HTTP:
      </p>
      <CodeBlock
        lang="bash"
        code={`curl -sS "https://api.omium.ai/api/v1/executions/exec_abc/replay" \\
  -H "X-API-Key: $OMIUM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "checkpoint_id": "chk_1" }'`}
      />
      <p>
        See <a href="/docs/api/executions">Executions</a> and{" "}
        <a href="/docs/api/checkpoints">Checkpoints</a>.
      </p>

      <DocCardGrid>
        <DocCard
          title="Quickstart"
          description="Run a traced workflow locally end-to-end."
          to="/docs/getting-started/quickstart"
          icon={Rocket}
        />
        <DocCard
          title="Python SDK"
          description="Reference for init(), decorators, and instrumenters."
          to="/docs/sdk/python-sdk"
          icon={Code}
        />
        <DocCard
          title="Release notes"
          description="Follow product and SDK changes."
          to="/docs/resources/release-notes"
          icon={Megaphone}
        />
        <DocCard
          title="API overview"
          description="Base URL, auth, and links to every resource."
          to="/docs/api/overview"
          icon={Webhook}
        />
      </DocCardGrid>
    </DocLayout>
  );
}
