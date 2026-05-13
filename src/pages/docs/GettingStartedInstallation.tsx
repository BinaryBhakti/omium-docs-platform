import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { Tabs } from "../../components/Tabs";
import { Callout } from "../../components/Callout";
import { DocCard, DocCardGrid } from "../../components/DocCard";
import { KeyRound, Rocket } from "lucide-react";

const toc = [
  { id: "prerequisites", label: "Prerequisites", depth: 2 as const },
  { id: "install", label: "Install", depth: 2 as const },
  { id: "verify", label: "Verify", depth: 2 as const },
  { id: "venv", label: "Virtual environment", depth: 2 as const },
  { id: "from-source", label: "Install from source", depth: 2 as const },
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
      <p>
        Omium ships as a single Python package. Installing it gives you both
        the SDK (<code>import omium</code>) and the <code>omium</code> CLI.
      </p>

      <h2 id="prerequisites">Prerequisites</h2>
      <ul>
        <li>
          Python <strong>3.9+</strong> (3.11 or newer recommended)
        </li>
        <li>
          <code>pip</code> (or <code>uv</code> / <code>pipx</code>, if you
          prefer)
        </li>
      </ul>
      <p>
        Omium does not replace LangGraph or CrewAI — install those alongside
        Omium when you use them. Auto-instrumentation only activates if the
        framework package is importable.
      </p>

      <h2 id="install">Install</h2>
      <CodeBlock
        lang="bash"
        code={`python -m pip install --upgrade pip
python -m pip install omium`}
      />
      <Callout variant="tip">
        Omium is published on PyPI as <code>omium</code>. There is no separate
        SDK and CLI package — both ship together.
      </Callout>

      <h2 id="verify">Verify</h2>
      <CodeBlock lang="bash" code={`omium --version`} />
      <p>
        You should see a version string printed by the CLI. If you see
        "command not found", your Python user scripts directory likely isn't
        on <code>PATH</code>. Re-installing inside an activated virtual
        environment (below) usually resolves it.
      </p>

      <h2 id="venv">Virtual environment (recommended)</h2>
      <p>Use a virtual environment to keep Omium and its gRPC/protobuf dependencies isolated from other projects.</p>
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

      <h2 id="from-source">Install from source (contributors only)</h2>
      <p>
        If you are working against an in-progress branch of the SDK, install
        in editable mode:
      </p>
      <CodeBlock
        lang="bash"
        code={`git clone https://github.com/omium-ai/omium-platform.git
cd omium-platform/sdk/python
pip install -e ".[dev]"`}
      />
      <p>
        The <code>[dev]</code> extra pulls in test and lint dependencies.
        Production users should install from PyPI.
      </p>

      <h2 id="next-steps">Next steps</h2>
      <DocCardGrid>
        <DocCard
          title="Configure"
          description="Create an API key, run omium init, and set environment variables."
          to="/docs/getting-started/configure"
          icon={KeyRound}
        />
        <DocCard
          title="Quickstart"
          description="Run your first traced script in under five minutes."
          to="/docs/getting-started/quickstart"
          icon={Rocket}
        />
      </DocCardGrid>
    </DocLayout>
  );
}
