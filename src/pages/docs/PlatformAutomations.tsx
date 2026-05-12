import { DocLayout } from "../../components/DocLayout";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { CreditCard, FileText } from "lucide-react";

const toc = [
  { id: "see", label: "What you see", depth: 2 as const },
  { id: "show-up", label: "How projects show up", depth: 2 as const },
  { id: "loop", label: "Operational loop", depth: 2 as const },
  { id: "troubleshoot", label: "Troubleshooting", depth: 2 as const },
];

export function PlatformAutomations() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Platform" },
        { label: "Automations dashboard" },
      ]}
      eyebrow="Platform"
      title="Automations dashboard"
      description="Projects, runs, cost, and health in the Omium app."
      toc={toc}
      complexity="beginner"
      etaMinutes={3}
      prev={{
        label: "Environment variables",
        to: "/docs/configuration/environment",
      }}
      next={{
        label: "API keys and billing",
        to: "/docs/platform/api-keys-billing",
      }}
    >
      <p>
        The <strong>Automations</strong> page (
        <code>app.omium.ai/automations</code>) is the dashboard view of your
        pushed projects and their run history.
      </p>

      <h2 id="see">What you see</h2>
      <ul>
        <li>
          <strong>Project cards</strong>: name, status, total runs, success
          rate, cost, and last run time
        </li>
        <li>
          <strong>Summary metrics</strong>: number of automations, healthy
          count, live runs, total cost
        </li>
      </ul>

      <h2 id="show-up">How projects show up</h2>
      <p>Projects appear after you push them from your machine:</p>
      <ol>
        <li>
          Create a project: <code>omium project init</code> (creates{" "}
          <code>omium.toml</code> and <code>workflows/</code>)
        </li>
        <li>
          Push it: <code>omium project push</code>
        </li>
        <li>Refresh Automations and find your project card</li>
      </ol>
      <p>
        See the step-by-step guide at{" "}
        <a href="/docs/getting-started/first-project">First project</a>.
      </p>

      <h2 id="loop">Operational loop</h2>
      <p>Most teams use this flow:</p>
      <ol>
        <li>Browse runs in Automations</li>
        <li>Open an execution to view trace + checkpoints</li>
        <li>Replay from a checkpoint for recovery</li>
      </ol>
      <p>
        For CLI-driven ops, use{" "}
        <a href="/docs/sdk/cli">CLI reference</a>.
      </p>

      <h2 id="troubleshoot">Troubleshooting</h2>
      <p>If your project does not appear:</p>
      <ul>
        <li>
          confirm you used the intended account key (<code>omium init</code>)
        </li>
        <li>
          confirm your API URL is <code>https://api.omium.ai</code>
        </li>
        <li>
          re-run <code>omium project push</code> and watch for errors
        </li>
      </ul>

      <DocCardGrid>
        <DocCard
          title="API keys & billing"
          description="Manage keys and review usage."
          to="/docs/platform/api-keys-billing"
          icon={CreditCard}
        />
        <DocCard
          title="omium.toml"
          description="Project-level config that drives pushes."
          to="/docs/configuration/omium-toml"
          icon={FileText}
        />
      </DocCardGrid>
    </DocLayout>
  );
}
