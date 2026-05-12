import { DocLayout } from "../../components/DocLayout";
import { Callout } from "../../components/Callout";
import { Accordion, AccordionGroup } from "../../components/Accordion";

const toc = [
  { id: "general", label: "General", depth: 2 as const },
  { id: "debugging", label: "Debugging agent failures", depth: 2 as const },
  { id: "monitoring", label: "Monitoring and observability", depth: 2 as const },
  { id: "integration", label: "Integration and setup", depth: 2 as const },
  { id: "pricing", label: "Pricing and billing", depth: 2 as const },
];

export function ResourcesFaq() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Resources" },
        { label: "FAQ" },
      ]}
      eyebrow="Resources"
      title="Frequently asked questions"
      description="Common questions about AI agent failures, debugging, observability, and how Omium helps fix production issues."
      toc={toc}
      complexity="beginner"
      etaMinutes={8}
      prev={{ label: "Release notes", to: "/docs/resources/release-notes" }}
    >
      <h2 id="general">General</h2>
      <AccordionGroup>
        <Accordion title="What is Omium?">
          Omium is an observability and reliability platform for AI agents.
          It captures execution traces, creates state checkpoints, detects
          failures, and enables one-click recovery — so your LangGraph,
          CrewAI, or custom agents stay debuggable in production.
        </Accordion>
        <Accordion title="What frameworks does Omium support?">
          Omium has auto-instrumentation for <strong>LangGraph</strong> and{" "}
          <strong>CrewAI</strong>. For any other Python framework (or custom
          agents), use the <code>@omium.trace</code> and{" "}
          <code>@omium.checkpoint</code> decorators. The REST API works from
          any language.
        </Accordion>
        <Accordion title="Is there a free tier?">
          Yes. The free tier includes{" "}
          <strong>500 agent executions per month</strong>, core tracing,
          checkpoints, and 7-day data retention. No credit card required.{" "}
          <a href="https://app.omium.ai" target="_blank" rel="noreferrer">
            Get started →
          </a>
        </Accordion>
        <Accordion title="How long does setup take?">
          Under 5 minutes. Install the SDK (<code>pip install omium</code>),
          run <code>omium init</code> to authenticate, and add two lines to
          your agent code.{" "}
          <a href="/docs/getting-started/quickstart">See the quickstart →</a>
        </Accordion>
        <Accordion title="Does Omium replace my logging or monitoring tools?">
          No. Omium complements your existing stack. It adds{" "}
          <strong>agent-specific</strong> observability — execution traces,
          state checkpoints, failure detection, and replay — that generic
          logging tools like Datadog or Sentry don't provide for multi-step
          AI workflows.
        </Accordion>
      </AccordionGroup>

      <h2 id="debugging">Debugging agent failures</h2>
      <AccordionGroup>
        <Accordion title="My AI agent failed mid-workflow — how do I find the root cause?">
          <p>
            Omium captures every step of your agent's execution as a trace.
            Open the failed run in the{" "}
            <a
              href="https://app.omium.ai"
              target="_blank"
              rel="noreferrer"
            >
              dashboard
            </a>
            , expand the execution timeline, and click into the failing step.
            You'll see the exact input, output, tool calls, and error message
            at the point of failure — no manual logging required.
          </p>
          <p>
            Related:{" "}
            <a href="/docs/build-with-omium/overview">Execution tracing →</a>
          </p>
        </Accordion>
        <Accordion title="How do I recover from a failed agent run without restarting from scratch?">
          <p>
            Omium saves <strong>checkpoints</strong> — full state snapshots
            at critical points during execution. When a run fails, you can
            replay from the last valid checkpoint instead of re-running the
            entire pipeline. This saves time and avoids duplicate API calls.
          </p>
          <p>
            Related: <a href="/docs/api/checkpoints">Checkpoints API →</a>,{" "}
            <a href="/docs/sdk/cli">CLI replay →</a>
          </p>
        </Accordion>
        <Accordion title="My LangGraph agent produces wrong output but doesn't throw an error — how do I debug this?">
          <p>
            These are <strong>silent failures</strong> — the hardest kind to
            catch. Omium's failure detection monitors for output drift,
            hallucinations, and quality degradation even when no exception is
            thrown. Enable <code>omium.instrument_langgraph()</code> and the
            dashboard will flag anomalies automatically.
          </p>
          <p>
            Related:{" "}
            <a href="/docs/build-with-omium/langgraph">
              LangGraph integration →
            </a>
          </p>
        </Accordion>
        <Accordion title="My CrewAI agent is stuck in an infinite loop — what do I do?">
          <p>
            Omium detects infinite loops and circular tool-call patterns in
            real-time. When detected, you'll see a failure alert in the
            dashboard with the exact loop pattern. You can then:
          </p>
          <ol>
            <li>View the trace to see where the loop starts</li>
            <li>Roll back to the last checkpoint before the loop</li>
            <li>Apply a fix and replay</li>
          </ol>
          <p>
            Related:{" "}
            <a href="/docs/build-with-omium/crewai">CrewAI integration →</a>,{" "}
            <a href="/docs/api/failures">Failures API →</a>
          </p>
        </Accordion>
        <Accordion title="How do I debug a multi-agent system where agents interact with each other?">
          <p>
            Omium traces the full execution graph across agents — including
            handoffs, shared state, and tool calls between agents. The
            dashboard visualizes these as a connected timeline so you can
            follow the flow from one agent to another and pinpoint where
            communication breaks down.
          </p>
          <p>
            Related:{" "}
            <a href="/docs/build-with-omium/overview">
              Platform capabilities →
            </a>
          </p>
        </Accordion>
        <Accordion title="My agent's API calls are timing out — can Omium help?">
          <p>
            Yes. Omium traces every external tool call your agent makes,
            including duration. You can filter executions by status (failed,
            timeout) and sort by latency to find the slow calls. Checkpoints
            before the timeout let you retry just the failing step.
          </p>
          <p>
            Related: <a href="/docs/api/executions">Executions API →</a>
          </p>
        </Accordion>
      </AccordionGroup>

      <h2 id="monitoring">Monitoring and observability</h2>
      <AccordionGroup>
        <Accordion title="How do I monitor my AI agents in production?">
          <p>
            Once instrumented, Omium automatically captures every execution.
            The{" "}
            <a
              href="https://app.omium.ai"
              target="_blank"
              rel="noreferrer"
            >
              dashboard
            </a>{" "}
            shows real-time metrics: success rate, failure rate, latency,
            cost per run, and active runs. Set up Slack notifications for
            failures and daily digests.
          </p>
          <p>
            Related: <a href="/docs/platform/automations">Automations →</a>
          </p>
        </Accordion>
        <Accordion title="Can I track how much my AI agents cost to run?">
          <p>
            Yes. Omium tracks token usage and estimated cost per execution,
            broken down by workflow, model, and time period. The Cost page in
            the dashboard shows trends and lets you set budget alerts.
          </p>
          <p>
            Related: <a href="/docs/api/billing">Billing API →</a>,{" "}
            <a href="/docs/platform/api-keys-billing">
              API keys &amp; billing →
            </a>
          </p>
        </Accordion>
        <Accordion title="How do I set up alerts when an agent fails?">
          <p>
            Connect Slack in your dashboard settings. Omium sends real-time
            failure alerts to your configured channel. You can also set up
            daily/weekly digest reports that summarize wins, issues, and key
            metrics.
          </p>
          <p>
            Related: <a href="/docs/platform/automations">Platform →</a>
          </p>
        </Accordion>
        <Accordion title="What's the difference between a trace and a checkpoint?">
          <p>
            A <strong>trace</strong> is a read-only record of what happened —
            every step, tool call, and LLM response during an execution. A{" "}
            <strong>checkpoint</strong> is a writable state snapshot that you
            can roll back to and replay from. Traces help you understand;
            checkpoints help you recover.
          </p>
          <p>
            Related: <a href="/docs/api/checkpoints">Checkpoints →</a>,{" "}
            <a href="/docs/build-with-omium/overview">
              Platform capabilities →
            </a>
          </p>
        </Accordion>
      </AccordionGroup>

      <h2 id="integration">Integration and setup</h2>
      <AccordionGroup>
        <Accordion title="Does Omium work with OpenAI, Anthropic, and other LLM providers?">
          Yes. Omium is LLM-agnostic. It instruments at the agent framework
          level (LangGraph, CrewAI) or at the function level (
          <code>@omium.trace</code>), so it works regardless of which LLM
          provider your agents call.
        </Accordion>
        <Accordion title="Can I use Omium without LangGraph or CrewAI?">
          <p>
            Absolutely. Use the <code>@omium.trace</code> and{" "}
            <code>@omium.checkpoint</code> decorators on any Python function.
            The REST API also works from non-Python services.
          </p>
          <p>
            Related: <a href="/docs/sdk/python-sdk">Python SDK →</a>,{" "}
            <a href="/docs/api/overview">REST API →</a>
          </p>
        </Accordion>
        <Accordion title="How do I add Omium to an existing project?">
          <p>Two lines of code. No refactoring needed.</p>
          <p>
            Your existing agent code runs unchanged. Omium wraps framework
            internals to capture traces and checkpoints automatically.
          </p>
          <p>
            Related:{" "}
            <a href="/docs/getting-started/installation">Installation →</a>,{" "}
            <a href="/docs/getting-started/quickstart">Quickstart →</a>
          </p>
        </Accordion>
        <Accordion title="Is my data secure?">
          <p>
            Yes. All data is encrypted in transit (TLS) and at rest. Omium
            does not store your LLM prompts or responses unless you explicitly
            enable full-content tracing. API keys are scoped per project and
            can be rotated at any time.
          </p>
          <p>
            Related:{" "}
            <a href="/docs/platform/api-keys-billing">
              API keys &amp; billing →
            </a>
          </p>
        </Accordion>
        <Accordion title="Can I self-host Omium?">
          Enterprise plans include self-hosted deployment options.{" "}
          <a href="https://omium.ai/contact" target="_blank" rel="noreferrer">
            Contact us
          </a>{" "}
          to discuss your requirements.
        </Accordion>
      </AccordionGroup>

      <h2 id="pricing">Pricing and billing</h2>
      <AccordionGroup>
        <Accordion title="How does pricing work?">
          <p>
            Omium has four tiers: <strong>Free</strong> (500 runs/mo),{" "}
            <strong>Developer</strong> ($49/mo, 2,500 runs),{" "}
            <strong>Pro</strong> ($299/mo, 25,000 runs), and{" "}
            <strong>Enterprise</strong> (custom). All tiers include core
            tracing and checkpoints. Higher tiers unlock failure analytics,
            fix suggestions, and priority support.
          </p>
          <p>
            <a href="https://omium.ai/pricing" target="_blank" rel="noreferrer">
              See full pricing →
            </a>
          </p>
        </Accordion>
        <Accordion title="What counts as an execution?">
          One execution = one top-level agent run (e.g., one{" "}
          <code>app.invoke()</code> in LangGraph or one{" "}
          <code>crew.kickoff()</code> in CrewAI). Steps within that run (tool
          calls, LLM calls, checkpoints) are included and don't count
          separately.
        </Accordion>
        <Accordion title="Can I upgrade or downgrade my plan at any time?">
          <p>
            Yes. Changes take effect immediately. When upgrading, you're
            charged the prorated difference. When downgrading, the new rate
            applies at the next billing cycle.
          </p>
          <p>
            Related:{" "}
            <a href="/docs/platform/api-keys-billing">
              API keys &amp; billing →
            </a>
          </p>
        </Accordion>
      </AccordionGroup>

      <Callout variant="note">
        <strong>Still have questions?</strong> Join our{" "}
        <a
          href="https://discord.gg/DAKB7sj8tW"
          target="_blank"
          rel="noreferrer"
        >
          Discord community
        </a>{" "}
        or email us at{" "}
        <a href="mailto:founders@omium.ai">founders@omium.ai</a>.
      </Callout>
    </DocLayout>
  );
}
