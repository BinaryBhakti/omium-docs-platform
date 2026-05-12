import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout } from "../../components/Callout";
import { Tabs } from "../../components/Tabs";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { Terminal, Webhook } from "lucide-react";

const toc = [
  { id: "install", label: "Install", depth: 2 as const },
  { id: "init", label: "Initialize", depth: 2 as const },
  { id: "auto", label: "Auto-instrumentation", depth: 2 as const },
  { id: "manual", label: "Manual tracing", depth: 2 as const },
  { id: "config", label: "Configuration", depth: 2 as const },
  { id: "errors", label: "Errors", depth: 2 as const },
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
      description="Initialize Omium, instrument frameworks, and use advanced APIs."
      toc={toc}
      complexity="intermediate"
      etaMinutes={6}
      prev={{ label: "Billing", to: "/docs/api/billing" }}
      next={{ label: "CLI reference", to: "/docs/sdk/cli" }}
    >
      <p>The Python SDK is the primary integration surface for Omium. Most teams:</p>
      <ul>
        <li>
          use <strong>auto-instrumentation</strong> for LangGraph / CrewAI
        </li>
        <li>
          add <strong>manual tracing</strong> for custom steps that matter
        </li>
        <li>
          rely on the <strong>CLI</strong> for day-two operations (list, logs,
          replay)
        </li>
      </ul>
      <p>
        If you haven't authenticated yet, do{" "}
        <a href="/docs/getting-started/configure">Configure</a> first.
      </p>

      <h2 id="install">Install</h2>
      <CodeBlock lang="bash" code={`pip install omium`} />

      <h2 id="init">Initialize</h2>
      <p>You can initialize in two common ways.</p>
      <Tabs
        tabs={[
          {
            title: "From CLI config (recommended)",
            content: (
              <>
                <p style={{ padding: "0 12px" }}>
                  Run <code>omium init</code> once, then:
                </p>
                <CodeBlock
                  lang="python"
                  code={`import omium

omium.init()`}
                />
              </>
            ),
          },
          {
            title: "From code / env",
            content: (
              <CodeBlock
                lang="python"
                code={`import omium

omium.init(api_key="omium_xxx")  # or set OMIUM_API_KEY in the environment`}
              />
            ),
          },
        ]}
      />

      <h2 id="auto">Auto-instrumentation</h2>
      <h3 id="langgraph">LangGraph</h3>
      <CodeBlock
        lang="python"
        code={`import omium

omium.init()
omium.instrument_langgraph()`}
      />
      <p>
        See the full guide at{" "}
        <a href="/docs/build-with-omium/langgraph">LangGraph</a>.
      </p>

      <h3 id="crewai">CrewAI</h3>
      <CodeBlock
        lang="python"
        code={`import omium

omium.init()
omium.instrument_crewai()`}
      />
      <p>
        See the full guide at <a href="/docs/build-with-omium/crewai">CrewAI</a>.
      </p>

      <h2 id="manual">Manual tracing</h2>
      <p>
        Use manual tracing when you want stable step names, or when your code
        doesn't run inside an auto-instrumented framework.
      </p>
      <h3 id="trace">@trace</h3>
      <CodeBlock
        lang="python"
        code={`import omium

omium.init()

@omium.trace("extract")
def extract(payload: dict) -> dict:
    return {"ok": True, "payload": payload}`}
      />
      <h3 id="checkpoint">@checkpoint</h3>
      <CodeBlock
        lang="python"
        code={`import omium

omium.init()

@omium.checkpoint("after_extract")
def expensive_step(state: dict) -> dict:
    return state`}
      />

      <h2 id="config">Configuration</h2>
      <p>Most teams start with defaults. When you want explicit control:</p>
      <CodeBlock
        lang="python"
        code={`from omium import OmiumConfig
import omium

omium.configure(
    OmiumConfig(
        api_key="omium_xxx",
        api_url="https://api.omium.ai",
        project="my-agent",
        auto_trace=True,
        auto_checkpoint=True,
    )
)`}
      />
      <Callout variant="tip">
        For the hosted platform, set <code>api_url</code> to{" "}
        <code>https://api.omium.ai</code> in SDK config and to{" "}
        <code>https://api.omium.ai</code> (no <code>/api/v1</code>) in CLI
        config. The SDK/CLI add <code>/api/v1</code> where needed.
      </Callout>

      <h2 id="errors">Errors</h2>
      <p>
        If you want to catch Omium-specific failures (for example, checkpoint
        lookups), import the relevant exception classes from <code>omium</code>{" "}
        and handle them at your boundary (HTTP handler, queue worker, etc.).
        Keep retries and fallbacks at the edge of your system, not inside step
        functions.
      </p>

      <h2 id="next">Next steps</h2>
      <DocCardGrid>
        <DocCard
          title="CLI reference"
          description="Configure, run, list executions, stream logs, and replay."
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
