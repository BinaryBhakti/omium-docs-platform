export type NavItem = { label: string; to: string };
export type NavSection = { title: string; items: NavItem[] };

// One entry per real .mdx file from the omium-docs source repo.
// Routes mirror the docs.json structure under /docs/...
export const navigation: NavSection[] = [
  {
    title: "Welcome",
    items: [{ label: "Start building with Omium", to: "/" }],
  },
  {
    title: "Getting started",
    items: [
      { label: "Installation", to: "/docs/getting-started/installation" },
      { label: "API keys and CLI configuration", to: "/docs/getting-started/configure" },
      { label: "Quickstart", to: "/docs/getting-started/quickstart" },
      { label: "First project and Automations", to: "/docs/getting-started/first-project" },
    ],
  },
  {
    title: "Build with Omium",
    items: [
      { label: "Platform capabilities", to: "/docs/build-with-omium/overview" },
      { label: "LangGraph", to: "/docs/build-with-omium/langgraph" },
      { label: "CrewAI", to: "/docs/build-with-omium/crewai" },
    ],
  },
  {
    title: "REST API",
    items: [
      { label: "API overview", to: "/docs/api/overview" },
      { label: "API errors and rate limits", to: "/docs/api/errors-and-rate-limits" },
      { label: "Executions", to: "/docs/api/executions" },
      { label: "Checkpoints", to: "/docs/api/checkpoints" },
      { label: "Workflows", to: "/docs/api/workflows" },
      { label: "Failures", to: "/docs/api/failures" },
      { label: "Billing", to: "/docs/api/billing" },
    ],
  },
  {
    title: "SDK and CLI",
    items: [
      { label: "Python SDK", to: "/docs/sdk/python-sdk" },
      { label: "CLI reference", to: "/docs/sdk/cli" },
    ],
  },
  {
    title: "Configuration",
    items: [
      { label: "omium.toml", to: "/docs/configuration/omium-toml" },
      { label: "Environment variables", to: "/docs/configuration/environment" },
    ],
  },
  {
    title: "Platform",
    items: [
      { label: "Automations dashboard", to: "/docs/platform/automations" },
      { label: "API keys and billing", to: "/docs/platform/api-keys-billing" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Examples", to: "/docs/resources/examples" },
      { label: "Release notes", to: "/docs/resources/release-notes" },
      { label: "FAQ", to: "/docs/resources/faq" },
    ],
  },
];
