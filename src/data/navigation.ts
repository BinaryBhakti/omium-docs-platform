export type NavItem = {
  label: string;
  to: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const navigation: NavSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Introduction", to: "/" },
      { label: "What is Omium", to: "/#what-is-omium" },
      { label: "Changelog", to: "/#changelog" },
    ],
  },
  {
    title: "Get started",
    items: [
      { label: "Quickstart", to: "/docs/get-started" },
      { label: "Installation", to: "/docs/get-started#installation" },
      { label: "Your first run", to: "/docs/get-started#first-run" },
      { label: "Next steps", to: "/docs/get-started#next-steps" },
    ],
  },
  {
    title: "SDK",
    items: [
      { label: "Python SDK", to: "/docs/sdk#python" },
      { label: "CLI", to: "/docs/sdk#cli" },
      { label: "Authentication", to: "/docs/sdk#auth" },
      { label: "Examples", to: "/docs/sdk#examples" },
    ],
  },
  {
    title: "API reference",
    items: [
      { label: "Overview", to: "/docs/api-reference" },
      { label: "Runs", to: "/docs/api-reference#runs" },
      { label: "Checkpoints", to: "/docs/api-reference#checkpoints" },
      { label: "Traces", to: "/docs/api-reference#traces" },
      { label: "Policies", to: "/docs/api-reference#policies" },
    ],
  },
  {
    title: "Platform concepts",
    items: [
      { label: "Workflows", to: "/docs/concepts#workflows" },
      { label: "Checkpointing", to: "/docs/concepts#checkpointing" },
      { label: "Recovery", to: "/docs/concepts#recovery" },
      { label: "Tracing", to: "/docs/concepts#tracing" },
      { label: "Policy engine", to: "/docs/concepts#policy" },
      { label: "Billing", to: "/docs/concepts#billing" },
      { label: "LLM routing", to: "/docs/concepts#llm-routing" },
    ],
  },
];
