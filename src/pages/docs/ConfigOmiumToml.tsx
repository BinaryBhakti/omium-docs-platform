import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { MdxTable } from "../../components/MdxTable";

const toc = [
  { id: "create", label: "Create the file", depth: 2 as const },
  { id: "sections", label: "Sections", depth: 2 as const },
  { id: "example", label: "Example", depth: 2 as const },
  { id: "global", label: "Relationship to global config", depth: 2 as const },
];

export function ConfigOmiumToml() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Configuration" },
        { label: "omium.toml" },
      ]}
      eyebrow="Configuration"
      title="omium.toml"
      description="Project-level configuration for push and run workflows."
      toc={toc}
      complexity="intermediate"
      etaMinutes={4}
      prev={{ label: "CLI reference", to: "/docs/sdk/cli" }}
      next={{
        label: "Environment variables",
        to: "/docs/configuration/environment",
      }}
    >
      <p>
        <code>omium.toml</code> is the <strong>project-level</strong> config
        file. It lives at the root of your agent repo and is used by:
      </p>
      <ul>
        <li>
          <code>omium project push</code>
        </li>
        <li>
          <code>omium run</code> (when you run inside the project directory)
        </li>
        <li>
          the SDK (for defaults like project name, workflows directory, etc.)
        </li>
      </ul>
      <p>
        If you haven't created one yet, start with{" "}
        <a href="/docs/getting-started/first-project">First project</a>.
      </p>

      <h2 id="create">Create the file</h2>
      <CodeBlock lang="bash" code={`omium project init --name my-agent`} />

      <h2 id="sections">Sections</h2>
      <h3 id="project">[project]</h3>
      <MdxTable
        head={["Key", "Meaning"]}
        rows={[
          [<code>name</code>, "Project name shown in Automations"],
          [<code>version</code>, "Your project version string"],
        ]}
      />
      <h3 id="execution">[execution]</h3>
      <MdxTable
        head={["Key", "Meaning"]}
        rows={[
          [
            <code>api_url</code>,
            <span>
              Full execution API base URL (includes <code>/api/v1</code>)
            </span>,
          ],
        ]}
      />
      <h3 id="tracing">[tracing]</h3>
      <MdxTable
        head={["Key", "Meaning", "Default"]}
        rows={[
          [
            <code>enabled</code>,
            "Enable automatic tracing",
            <code>true</code>,
          ],
        ]}
      />
      <h3 id="workflows">[workflows]</h3>
      <MdxTable
        head={["Key", "Meaning", "Default"]}
        rows={[
          [
            <code>directory</code>,
            "Where workflow definitions live",
            <code>./workflows</code>,
          ],
        ]}
      />
      <h3 id="checkpoints">[checkpoints]</h3>
      <MdxTable
        head={["Key", "Meaning", "Default"]}
        rows={[
          [<code>enabled</code>, "Enable checkpointing", <code>true</code>],
          [
            <code>interval</code>,
            "Auto-checkpoint interval (seconds)",
            <code>30</code>,
          ],
          [
            <code>max_count</code>,
            "Max checkpoints to retain",
            <code>100</code>,
          ],
        ]}
      />

      <h2 id="example">Example</h2>
      <CodeBlock
        lang="bash"
        filename="omium.toml"
        code={`[project]
name = "my-agent"
version = "0.1.0"

[execution]
api_url = "https://api.omium.ai/api/v1"

[tracing]
enabled = true

[workflows]
directory = "./workflows"

[checkpoints]
enabled = true
interval = 30
max_count = 100`}
      />

      <h2 id="global">Relationship to global config</h2>
      <p>
        <code>omium.toml</code> is <strong>not</strong> where your API key
        lives. Keys are stored in <code>~/.omium/config.json</code> (via{" "}
        <code>omium init</code>) or in environment variables. See{" "}
        <a href="/docs/configuration/environment">Environment variables</a>.
      </p>
    </DocLayout>
  );
}
