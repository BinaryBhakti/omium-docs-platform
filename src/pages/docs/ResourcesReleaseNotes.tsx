import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";

const toc = [
  { id: "how", label: "How to read these notes", depth: 2 as const },
  { id: "2026-04-07", label: "2026-04-07", depth: 2 as const },
  { id: "template", label: "Template", depth: 2 as const },
];

export function ResourcesReleaseNotes() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Resources" },
        { label: "Release notes" },
      ]}
      eyebrow="Resources"
      title="Release notes"
      description="Notable changes to Omium products and APIs."
      toc={toc}
      complexity="beginner"
      etaMinutes={3}
      prev={{ label: "Examples", to: "/docs/resources/examples" }}
      next={{ label: "FAQ", to: "/docs/resources/faq" }}
    >
      <p>This page tracks notable changes across:</p>
      <ul>
        <li>
          the <strong>platform</strong> (dashboard and backend behaviour)
        </li>
        <li>
          the <strong>SDK &amp; CLI</strong> (<code>pip install omium</code>)
        </li>
        <li>
          the <strong>HTTP API</strong> (<code>https://api.omium.ai/api/v1</code>)
        </li>
        <li>
          these <strong>docs</strong>
        </li>
      </ul>
      <p>
        For very small changes (typos, formatting), we may not add an entry.
      </p>

      <h2 id="how">How to read these notes</h2>
      <p>Each entry aims to answer:</p>
      <ul>
        <li>
          <strong>What changed</strong>
        </li>
        <li>
          <strong>Who it impacts</strong>
        </li>
        <li>
          <strong>What you should do</strong>
        </li>
      </ul>
      <p>
        We prioritize "what to do next" over listing every internal detail.
      </p>

      <h2 id="2026-04-07">2026-04-07</h2>
      <h3 id="docs">Docs</h3>
      <ul>
        <li>
          Added Anthropic-style hubs, capability matrix, and structured
          Getting Started guides.
        </li>
        <li>
          Added runnable local verification (<code>npm run verify</code>) and
          local preview (<code>npm run dev</code>).
        </li>
      </ul>

      <h2 id="template">Template (copy/paste for future entries)</h2>
      <CodeBlock
        lang="bash"
        code={`## YYYY-MM-DD

### SDK & CLI

- **Added**: …
- **Changed**: …
- **Fixed**: …
- **Deprecated**: …

### HTTP API

- **Added**: …
- **Changed**: …

### Platform

- **Added**: …

### Docs

- **Added/Changed**: …`}
      />
    </DocLayout>
  );
}
