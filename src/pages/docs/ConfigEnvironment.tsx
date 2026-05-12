import { DocLayout } from "../../components/DocLayout";
import { CodeBlock } from "../../components/CodeBlock";
import { MdxTable } from "../../components/MdxTable";
import { Tabs } from "../../components/Tabs";

const toc = [
  { id: "config-file", label: "Config file", depth: 2 as const },
  { id: "overrides", label: "Environment overrides", depth: 2 as const },
  { id: "hosted", label: "Hosted API URL", depth: 2 as const },
];

export function ConfigEnvironment() {
  return (
    <DocLayout
      breadcrumbs={[
        { label: "Docs", to: "/" },
        { label: "Configuration" },
        { label: "Environment variables" },
      ]}
      eyebrow="Configuration"
      title="Environment variables"
      description="Global configuration for the CLI and SDK."
      toc={toc}
      complexity="beginner"
      etaMinutes={3}
      prev={{ label: "omium.toml", to: "/docs/configuration/omium-toml" }}
      next={{
        label: "Automations dashboard",
        to: "/docs/platform/automations",
      }}
    >
      <p>
        The CLI and SDK use a <strong>global</strong> configuration for
        authentication and API host. This is separate from project-level{" "}
        <a href="/docs/configuration/omium-toml">omium.toml</a>.
      </p>

      <h2 id="config-file">Config file</h2>
      <p>
        After you run <code>omium init</code>, settings are stored in:
      </p>
      <ul>
        <li>
          macOS / Linux: <code>~/.omium/config.json</code>
        </li>
        <li>
          Windows: <code>%USERPROFILE%\.omium\config.json</code>
        </li>
      </ul>
      <p>Typical fields:</p>
      <MdxTable
        head={["Field", "Meaning"]}
        rows={[
          [
            <code>api_key</code>,
            <span>
              API key (starts with <code>omium_</code>)
            </span>,
          ],
          [
            <code>api_url</code>,
            <span>
              API host URL, e.g. <code>https://api.omium.ai</code> (no{" "}
              <code>/api/v1</code>)
            </span>,
          ],
          [<code>region</code>, "Optional region identifier"],
        ]}
      />

      <h2 id="overrides">Environment overrides</h2>
      <p>
        Environment variables override the config file. This is the
        recommended approach for servers and CI.
      </p>
      <MdxTable
        head={["Variable", "Meaning"]}
        rows={[
          [<code>OMIUM_API_KEY</code>, "API key"],
          [
            <code>OMIUM_API_URL</code>,
            <span>
              API host URL (no <code>/api/v1</code>)
            </span>,
          ],
          [<code>OMIUM_DEBUG</code>, "Enable debug logs"],
        ]}
      />
      <Tabs
        tabs={[
          {
            title: "macOS / Linux",
            content: (
              <CodeBlock
                lang="bash"
                code={`export OMIUM_API_KEY=omium_your_key_here
export OMIUM_API_URL=https://api.omium.ai`}
              />
            ),
          },
          {
            title: "Windows (PowerShell)",
            content: (
              <CodeBlock
                lang="bash"
                code={`$env:OMIUM_API_KEY = "omium_your_key_here"
$env:OMIUM_API_URL = "https://api.omium.ai"`}
              />
            ),
          },
        ]}
      />

      <h2 id="hosted">Hosted API URL</h2>
      <p>For hosted Omium:</p>
      <ul>
        <li>
          <code>OMIUM_API_URL=https://api.omium.ai</code>
        </li>
      </ul>
      <p>
        The CLI and SDK append <code>/api/v1</code> where needed.
      </p>
    </DocLayout>
  );
}
