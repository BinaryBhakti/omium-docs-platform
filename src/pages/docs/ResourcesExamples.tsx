import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { Rocket, Code, Megaphone, Webhook } from "lucide-react";

const toc = [
  { id: "e1", label: "Minimal manual tracing", depth: 2 as const },
  { id: "e2", label: 'LangGraph "instrument once"', depth: 2 as const },
  { id: "e3", label: 'CrewAI "instrument once"', depth: 2 as const },
  { id: "e4", label: "Environment-first configuration", depth: 2 as const },
  { id: "e5", label: "Drive recovery via HTTP (replay)", depth: 2 as const },
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
      description="Sample projects and patterns built on Omium."
      toc={toc}
      complexity="beginner"
      etaMinutes={5}
      prev={{
        label: "API keys and billing",
        to: "/docs/platform/api-keys-billing",
      }}
      next={{ label: "Release notes", to: "/docs/resources/release-notes" }}
    >
      <p>
        These examples are designed to be copied into your own repo. Each one
        is intentionally small, so you can validate end-to-end quickly and
        then scale it up.
      </p>

      <h2 id="e1">Example 1: Minimal manual tracing</h2>
      <p>Use this when you're not running LangGraph or CrewAI yet.</p>
      <CodeBlock
        lang="python"
        code={`import omium

omium.init()

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

      <h2 id="e2">Example 2: LangGraph "instrument once"</h2>
      <CodeBlock
        lang="python"
        code={`import omium
from langgraph.graph import StateGraph

omium.init()
omium.instrument_langgraph()

graph = StateGraph(dict)
# … add nodes and edges …
app = graph.compile()

result = app.invoke({"input": "Hello"})
print(result)`}
      />
      <p>
        See the integration guide:{" "}
        <a href="/docs/build-with-omium/langgraph">LangGraph</a>.
      </p>

      <h2 id="e3">Example 3: CrewAI "instrument once"</h2>
      <CodeBlock
        lang="python"
        code={`import omium
from crewai import Crew, Agent, Task

omium.init()
omium.instrument_crewai()

agent = Agent(role="Researcher", goal="Summarize", backstory="You write concise summaries.")
task = Task(description="Summarize: Hello world", agent=agent)

crew = Crew(agents=[agent], tasks=[task])
print(crew.kickoff())`}
      />
      <p>
        See the integration guide:{" "}
        <a href="/docs/build-with-omium/crewai">CrewAI</a>.
      </p>

      <h2 id="e4">Example 4: Environment-first configuration (CI pattern)</h2>
      <p>In CI/CD, prefer environment variables over local config files.</p>
      <CodeBlock
        lang="bash"
        code={`export OMIUM_API_KEY=omium_your_key_here
export OMIUM_API_URL=https://api.omium.ai
python your_script.py`}
      />
      <p>
        See{" "}
        <a href="/docs/configuration/environment">Environment variables</a>.
      </p>

      <h2 id="e5">Example 5: Drive recovery via HTTP (replay)</h2>
      <p>
        If you operate Omium from a non-Python control plane, you can replay
        a failed run from a checkpoint:
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
          description="Run a traced workflow locally."
          to="/docs/getting-started/quickstart"
          icon={Rocket}
        />
        <DocCard
          title="Python SDK"
          description="Auto-instrument or trace manually."
          to="/docs/sdk/python-sdk"
          icon={Code}
        />
        <DocCard
          title="Release notes"
          description="Follow product and doc changes."
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
