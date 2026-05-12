import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { LayoutDashboard, Terminal } from "lucide-react";

const toc = [
  { id: "init", label: "Step 1: Initialize a project", depth: 2 as const },
  { id: "toml", label: "Step 2: Review omium.toml", depth: 2 as const },
  { id: "push", label: "Step 3: Push to Automations", depth: 2 as const },
  { id: "confirm", label: "Step 4: Confirm in the dashboard", depth: 2 as const },
  { id: "next", label: "Next steps", depth: 2 as const },
];

export function GettingStartedFirstProject() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Getting started" },
        { label: "First project" },
      ]}
      eyebrow="Getting started"
      title="First project and Automations"
      description="Create a project, push it, and see it on the dashboard."
      toc={toc}
      complexity="beginner"
      etaMinutes={4}
      prev={{ label: "Quickstart", to: "/docs/getting-started/quickstart" }}
      next={{
        label: "Platform capabilities",
        to: "/docs/build-with-omium/overview",
      }}
    >
      <p>
        Projects are how you make your workflow definitions visible in{" "}
        <strong>Automations</strong>.
      </p>

      <h2 id="init">Step 1: Initialize a project</h2>
      <p>From your agent repo (or a new folder):</p>
      <CodeBlock lang="bash" code={`omium project init --name my-agent`} />
      <p>This creates:</p>
      <ul>
        <li>
          <code>omium.toml</code>
        </li>
        <li>
          <code>workflows/</code> (a place for workflow definitions)
        </li>
      </ul>

      <h2 id="toml">Step 2: Review omium.toml</h2>
      <p>At minimum set a stable name and version:</p>
      <CodeBlock
        lang="bash"
        filename="omium.toml"
        code={`[project]
name = "my-agent"
version = "0.1.0"

[execution]
api_url = "https://api.omium.ai/api/v1"`}
      />
      <p>
        See the full reference at{" "}
        <a href="/docs/configuration/omium-toml">omium.toml</a>.
      </p>

      <h2 id="push">Step 3: Push to Automations</h2>
      <CodeBlock lang="bash" code={`omium project push`} />
      <p>
        If the project has no workflow definitions yet, Omium still creates a
        default entry so the project appears in the dashboard.
      </p>

      <h2 id="confirm">Step 4: Confirm in the dashboard</h2>
      <p>
        Open{" "}
        <a
          href="https://app.omium.ai/automations"
          target="_blank"
          rel="noreferrer"
        >
          app.omium.ai/automations
        </a>
        . You should see a card for your project.
      </p>
      <p>If you don't:</p>
      <ul>
        <li>
          confirm you're using the right account / key (<code>omium init</code>)
        </li>
        <li>
          confirm your API URL is <code>https://api.omium.ai</code>
        </li>
        <li>
          re-run <code>omium project push</code> and watch for errors
        </li>
      </ul>

      <h2 id="next">Next steps</h2>
      <DocCardGrid>
        <DocCard
          title="Automations dashboard"
          description="How projects, runs, success rate, and cost are displayed."
          to="/docs/platform/automations"
          icon={LayoutDashboard}
        />
        <DocCard
          title="CLI reference"
          description="Commands for runs, traces, failures, and replays."
          to="/docs/sdk/cli"
          icon={Terminal}
        />
      </DocCardGrid>
    </DocLayout>
  );
}
