import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { MdxTable } from "../../components/MdxTable";
import { Callout } from "../../components/Callout";

const toc = [
  { id: "create", label: "Create the file", depth: 2 as const },
  { id: "sections", label: "Sections", depth: 2 as const },
  { id: "example", label: "Full example", depth: 2 as const },
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
      description="Project-level configuration for push, run, and SDK defaults."
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
        file. It lives at the root of your agent repo and is consumed by:
      </p>
      <ul>
        <li>
          <code>omium project push</code> — when syncing the project to the
          dashboard
        </li>
        <li>
          <code>omium run</code> — when invoked inside the project directory
        </li>
        <li>
          the SDK — for project name, workflows directory, and tracing
          defaults
        </li>
      </ul>
      <p>
        If you haven't created one yet, start with{" "}
        <a href="/docs/getting-started/first-project">First project</a>.
      </p>

      <h2 id="create">Create the file</h2>
      <CodeBlock
        lang="bash"
        code={`omium project init --name my-agent`}
      />

      <h2 id="sections">Sections</h2>

      <h3 id="project">[project]</h3>
      <MdxTable
        head={["Key", "Meaning"]}
        rows={[
          [<code>name</code>, "Project name shown in Automations."],
          [<code>version</code>, "Your project's semantic version string."],
        ]}
      />

      <h3 id="execution">[execution]</h3>
      <MdxTable
        head={["Key", "Meaning"]}
        rows={[
          [
            <code>api_url</code>,
            <span>
              Execution API URL. For the hosted platform use{" "}
              <code>https://api.omium.ai/api/v1</code>.
            </span>,
          ],
        ]}
      />

      <h3 id="tracing">[tracing]</h3>
      <MdxTable
        head={["Key", "Meaning", "Default"]}
        rows={[
          [<code>enabled</code>, "Enable automatic tracing.", <code>true</code>],
          [
            <code>endpoint</code>,
            "Override the trace ingestion endpoint. Defaults to api_url + /traces/ingest.",
            <em>derived</em>,
          ],
        ]}
      />

      <h3 id="llm">[llm]</h3>
      <p>
        Selects the LLM provider that the platform's hosted runtimes use
        when no explicit model is passed in code.
      </p>
      <MdxTable
        head={["Key", "Meaning", "Default"]}
        rows={[
          [
            <code>provider</code>,
            <span>
              One of <code>router</code>, <code>auto</code>,{" "}
              <code>digitalocean</code>, <code>openai</code>.
            </span>,
            <code>"router"</code>,
          ],
          [
            <code>model</code>,
            "Default model identifier passed to the provider.",
            <code>"llama3.3-70b-instruct"</code>,
          ],
        ]}
      />

      <h3 id="workflows">[workflows]</h3>
      <MdxTable
        head={["Key", "Meaning", "Default"]}
        rows={[
          [
            <code>directory</code>,
            "Where JSON workflow definitions live.",
            <code>"./workflows"</code>,
          ],
        ]}
      />
      <p>
        Declare workflows inline with a TOML array of tables. This is how{" "}
        <code>omium project push</code> learns which definitions to upload.
      </p>
      <CodeBlock
        lang="bash"
        code={`[[workflows.definitions]]
id = "my-workflow"
type = "crewai"           # "crewai" | "langgraph"
file = "workflows/my-workflow.json"`}
      />

      <h3 id="checkpoints">[checkpoints]</h3>
      <MdxTable
        head={["Key", "Meaning", "Default"]}
        rows={[
          [<code>enabled</code>, "Enable checkpointing for this project.", <code>true</code>],
          [
            <code>interval</code>,
            "Auto-checkpoint interval, in seconds.",
            <code>30</code>,
          ],
          [
            <code>max_count</code>,
            "Maximum checkpoints retained per execution.",
            <code>100</code>,
          ],
        ]}
      />

      <h3 id="logging">[logging]</h3>
      <MdxTable
        head={["Key", "Meaning", "Default"]}
        rows={[
          [
            <code>level</code>,
            <span>
              One of <code>debug</code>, <code>info</code>,{" "}
              <code>warning</code>, <code>error</code>.
            </span>,
            <code>"info"</code>,
          ],
          [<code>rich_output</code>, "Use rich-formatted CLI output.", <code>true</code>],
        ]}
      />

      <h2 id="example">Full example</h2>
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

[llm]
provider = "router"
model = "llama3.3-70b-instruct"

[workflows]
directory = "./workflows"

[[workflows.definitions]]
id = "my-workflow"
type = "langgraph"
file = "workflows/my-workflow.json"

[checkpoints]
enabled = true
interval = 30
max_count = 100

[logging]
level = "info"
rich_output = true`}
      />

      <h2 id="global">Relationship to global config</h2>
      <Callout variant="warn">
        <code>omium.toml</code> is <strong>not</strong> where your API key
        lives. Keys are stored in <code>~/.omium/config.json</code> (via{" "}
        <code>omium init</code>) or read from <code>OMIUM_API_KEY</code> in
        the environment. Keeping secrets out of the repo file means it's
        safe to commit.
      </Callout>
      <p>
        See <a href="/docs/configuration/environment">Environment variables</a>{" "}
        for the full list of overrides.
      </p>
    </DocLayout>
  );
}
