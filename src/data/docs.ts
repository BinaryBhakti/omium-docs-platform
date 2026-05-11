export type TocItem = { id: string; label: string; depth?: 2 | 3 };

export const homeFeatured = [
  {
    label: "Get started",
    description: "Install the SDK and run your first Omium workflow in under five minutes.",
    to: "/docs/get-started",
    accent: "pink" as const,
  },
  {
    label: "SDK",
    description: "Python and CLI references with examples for every primitive.",
    to: "/docs/sdk",
    accent: "orange" as const,
  },
  {
    label: "API reference",
    description: "REST endpoints for runs, checkpoints, traces, and policy enforcement.",
    to: "/docs/api-reference",
    accent: "yellow" as const,
  },
  {
    label: "Platform concepts",
    description: "How workflows, checkpointing, recovery, and routing fit together.",
    to: "/docs/concepts",
    accent: "pink" as const,
  },
];

export const recentDocs = [
  { label: "Resuming a workflow from a checkpoint", to: "/docs/concepts#recovery", tag: "Concepts" },
  { label: "Streaming token usage via the trace API", to: "/docs/api-reference#traces", tag: "API" },
  { label: "Routing between Sonnet and Haiku", to: "/docs/concepts#llm-routing", tag: "Routing" },
  { label: "Policy engine: deny-by-default tools", to: "/docs/concepts#policy", tag: "Policy" },
  { label: "CLI: omium run with --watch", to: "/docs/sdk#cli", tag: "CLI" },
];

export const endpoints = [
  { method: "POST", path: "/v1/runs", desc: "Create a new workflow run", id: "runs" },
  { method: "GET", path: "/v1/runs/{id}", desc: "Retrieve a run by id", id: "runs-get" },
  { method: "POST", path: "/v1/runs/{id}/resume", desc: "Resume from latest checkpoint", id: "runs-resume" },
  { method: "GET", path: "/v1/checkpoints", desc: "List checkpoints for a run", id: "checkpoints" },
  { method: "POST", path: "/v1/checkpoints/{id}/restore", desc: "Restore a workflow to a checkpoint", id: "checkpoints-restore" },
  { method: "GET", path: "/v1/traces", desc: "List traces with filters", id: "traces" },
  { method: "GET", path: "/v1/traces/{id}/spans", desc: "Stream spans for a trace", id: "traces-spans" },
  { method: "POST", path: "/v1/policies", desc: "Attach a policy to a workspace", id: "policies" },
  { method: "DELETE", path: "/v1/policies/{id}", desc: "Detach a policy", id: "policies-delete" },
];
