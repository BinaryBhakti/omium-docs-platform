import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { Tabs } from "../../components/Tabs";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { KeyRound, Rocket } from "lucide-react";

const toc = [
  { id: "prerequisites", label: "Prerequisites", depth: 2 as const },
  { id: "install", label: "Install", depth: 2 as const },
  { id: "verify", label: "Verify", depth: 2 as const },
  { id: "venv", label: "Virtual environment", depth: 2 as const },
  { id: "next-steps", label: "Next steps", depth: 2 as const },
];

export function GettingStartedInstallation() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Getting started" },
        { label: "Installation" },
      ]}
      eyebrow="Getting started"
      title="Installation"
      description="Install the Omium Python package and CLI."
      toc={toc}
      complexity="beginner"
      etaMinutes={3}
      next={{ label: "Configure", to: "/docs/getting-started/configure" }}
    >
      <h2 id="prerequisites">Prerequisites</h2>
      <ul>
        <li>
          Python <strong>3.9+</strong>
        </li>
        <li>
          <code>pip</code> (or <code>uv</code> / <code>pipx</code> if you prefer)
        </li>
      </ul>
      <p>
        If you plan to use LangGraph or CrewAI, install those libraries in
        your app as usual — Omium does not replace them.
      </p>

      <h2 id="install">Install</h2>
      <p>
        Omium ships as a Python package and includes the <code>omium</code> CLI.
      </p>
      <CodeBlock lang="bash" code={`pip install omium`} />

      <h2 id="verify">Verify</h2>
      <CodeBlock lang="bash" code={`omium --version`} />
      <p>You should see a version string like:</p>
      <CodeBlock lang="bash" code={`Omium SDK v0.3.0`} />
      <p>
        If you see "command not found", your Python scripts directory isn't
        on <code>PATH</code>. A quick workaround is:
      </p>
      <CodeBlock lang="bash" code={`python -m omium --version`} />

      <h2 id="venv">Virtual environment (recommended)</h2>
      <p>Use a venv to avoid dependency conflicts.</p>
      <Tabs
        tabs={[
          {
            title: "macOS / Linux",
            content: (
              <CodeBlock
                lang="bash"
                code={`python -m venv .venv
source .venv/bin/activate
pip install omium`}
              />
            ),
          },
          {
            title: "Windows (PowerShell)",
            content: (
              <CodeBlock
                lang="bash"
                code={`py -m venv .venv
.\\.venv\\Scripts\\Activate.ps1
pip install omium`}
              />
            ),
          },
        ]}
      />

      <h2 id="next-steps">Next steps</h2>
      <DocCardGrid>
        <DocCard
          title="Configure"
          description="Create an API key and configure the CLI / SDK."
          to="/docs/getting-started/configure"
          icon={KeyRound}
        />
        <DocCard
          title="Quickstart"
          description="Run your first traced workflow in minutes."
          to="/docs/getting-started/quickstart"
          icon={Rocket}
        />
      </DocCardGrid>
    </DocLayout>
  );
}
