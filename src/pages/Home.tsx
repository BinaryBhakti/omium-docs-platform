import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Rocket,
  Terminal,
  Network,
  Layers,
  Sparkles,
  Clock,
  BookOpen,
  Boxes,
  KeyRound,
  Activity,
  ShieldCheck,
  GitBranch,
} from "lucide-react";

const categories = [
  {
    title: "Get started",
    desc: "Install the SDK and run your first Omium workflow in under five minutes.",
    to: "/docs/get-started",
    icon: Rocket,
    pages: ["Quickstart", "Installation", "Your first run"],
    accent: "var(--color-accent-pink)",
  },
  {
    title: "SDK",
    desc: "Python and CLI references with examples for every primitive.",
    to: "/docs/sdk",
    icon: Terminal,
    pages: ["Python SDK", "CLI", "Authentication", "Examples"],
    accent: "var(--color-accent-orange)",
  },
  {
    title: "API reference",
    desc: "REST endpoints for runs, checkpoints, traces, and policy enforcement.",
    to: "/docs/api-reference",
    icon: Network,
    pages: ["Runs", "Checkpoints", "Traces", "Policies"],
    accent: "var(--color-accent-yellow)",
  },
  {
    title: "Platform concepts",
    desc: "How workflows, checkpointing, recovery, and routing fit together.",
    to: "/docs/concepts",
    icon: Layers,
    pages: ["Workflows", "Checkpointing", "Recovery", "Tracing", "Policy"],
    accent: "var(--color-accent-pink)",
  },
];

const popularGuides = [
  {
    title: "Resume a workflow from any checkpoint",
    desc: "Use the resume API and the run watcher to continue from the last durable state.",
    to: "/docs/concepts#recovery",
    tag: "Tutorial",
    icon: GitBranch,
  },
  {
    title: "Stream span events from the trace API",
    desc: "Subscribe to a trace and render spans in your own UI in real time.",
    to: "/docs/api-reference#traces",
    tag: "Guide",
    icon: Activity,
  },
  {
    title: "Route between Sonnet and Haiku",
    desc: "Set up a routing policy that balances latency, cost, and quality.",
    to: "/docs/concepts#llm-routing",
    tag: "Routing",
    icon: Boxes,
  },
  {
    title: "Deny-by-default tool policies",
    desc: "Lock down which tools agents can call and require explicit allowlists.",
    to: "/docs/concepts#policy",
    tag: "Policy",
    icon: ShieldCheck,
  },
];

const recentDocs = [
  { label: "Resuming a workflow from a checkpoint", to: "/docs/concepts#recovery", tag: "Concepts" },
  { label: "Streaming token usage via the trace API", to: "/docs/api-reference#traces", tag: "API" },
  { label: "Routing between Sonnet and Haiku", to: "/docs/concepts#llm-routing", tag: "Routing" },
  { label: "Policy engine: deny-by-default tools", to: "/docs/concepts#policy", tag: "Policy" },
  { label: "CLI: omium run with --watch", to: "/docs/sdk#cli", tag: "CLI" },
];

const changelog = [
  { date: "May 8, 2026", title: "Trace API v1.2", detail: "Added span-level token usage and cost attribution." },
  { date: "Apr 30, 2026", title: "Checkpoint compaction", detail: "Older checkpoints are now compacted into 24h windows by default." },
  { date: "Apr 22, 2026", title: "Python SDK 0.9", detail: "New omium.run.watch() helper and improved retry semantics." },
];

export function Home() {
  return (
    <div className="px-5 md:px-10 py-10 max-w-[1240px] mx-auto w-full">
      {/* Hero strip */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-10 items-start">
        <div>
          <div className="inline-flex items-center gap-1.5 h-6 pl-1.5 pr-2 rounded-full border border-border-subtle bg-surface text-[11.5px] text-text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-orange" />
            Omium Platform · v1
            <span className="text-text-muted">— stable</span>
          </div>
          <h1 className="mt-3 text-[34px] sm:text-[40px] leading-[1.08] tracking-[-0.025em] font-semibold text-text">
            Build reliable AI workflows
            <span className="block text-text-muted font-medium tracking-[-0.02em]">
              with the Omium platform.
            </span>
          </h1>
          <p className="mt-3 max-w-[600px] text-[15.5px] leading-[24px] text-text-secondary">
            Documentation for the Omium SDK, REST API, and platform primitives —
            workflows, checkpointing, tracing, policy enforcement, and LLM routing.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/docs/get-started"
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-text text-bg text-[13px] font-medium hover:opacity-90"
            >
              <Rocket size={13} />
              Start the quickstart
            </Link>
            <Link
              to="/docs/api-reference"
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-border-subtle bg-surface text-text text-[13px] font-medium hover:border-border-strong"
            >
              <Network size={13} />
              API reference
            </Link>
            <Link
              to="/docs/sdk"
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-text-secondary text-[13px] font-medium hover:text-text hover:bg-[color:var(--color-hover)]"
            >
              <Terminal size={13} />
              SDK
            </Link>
          </div>
        </div>

        {/* Quickstart code card on the right */}
        <div className="rounded-xl border border-border-subtle overflow-hidden"
          style={{ background: "var(--code-bg)" }}>
          <div className="flex items-center justify-between h-9 px-3 border-b border-[color:var(--code-border)]"
            style={{ background: "var(--code-surface)" }}>
            <div className="flex items-center gap-2 text-[color:var(--code-muted)]">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-[#3a3d42]" />
                <span className="h-2 w-2 rounded-full bg-[#3a3d42]" />
                <span className="h-2 w-2 rounded-full bg-[#3a3d42]" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wide">terminal</span>
            </div>
            <span className="text-[11px] text-[color:var(--code-muted)] font-mono">~/omium</span>
          </div>
          <pre className="px-4 py-3 text-[13px] leading-[22px] font-mono" style={{ color: "var(--code-text)" }}>
{`$ pip install omium
$ export OMIUM_API_KEY="omk_..."
$ omium run hello.py::summarize_workflow \\
    --arg text="Omium is a workflow platform."

`}
            <span className="tok-comment">→ run_01H8XK… ✓ summarize · 412ms · $0.0004</span>
          </pre>
        </div>
      </section>

      {/* Category grid */}
      <section className="mt-12">
        <SectionHeader
          eyebrow="Browse the docs"
          title="Pick a path"
          right={
            <Link
              to="/docs/concepts"
              className="text-[12.5px] text-text-secondary hover:text-text inline-flex items-center gap-1"
            >
              All concepts <ArrowUpRight size={12} />
            </Link>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.to}
              className="group relative overflow-hidden rounded-lg border border-border-subtle bg-surface p-4 hover:border-border-strong transition-colors"
            >
              <div
                className="absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-50 group-hover:opacity-80 transition-opacity"
                style={{
                  background: `radial-gradient(closest-side, ${cat.accent}, transparent 70%)`,
                }}
                aria-hidden
              />
              <div className="relative">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md border border-border-subtle bg-bg flex items-center justify-center">
                    <cat.icon size={14} className="text-text" />
                  </div>
                  <span className="text-[14.5px] font-semibold text-text tracking-[-0.005em]">
                    {cat.title}
                  </span>
                  <ArrowUpRight
                    size={13}
                    className="ml-auto text-text-muted group-hover:text-text"
                  />
                </div>
                <p className="mt-2 text-[13px] leading-[19.5px] text-text-secondary">
                  {cat.desc}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1">
                  {cat.pages.map((p) => (
                    <li
                      key={p}
                      className="text-[11.5px] text-text-secondary border border-border-subtle bg-bg rounded-sm px-1.5 py-0.5"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured guides + sidebar */}
      <section id="what-is-omium" className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SectionHeader
            icon={BookOpen}
            eyebrow="Featured"
            title="Popular guides"
          />
          <div className="rounded-lg border border-border-subtle bg-surface overflow-hidden">
            {popularGuides.map((row, i) => (
              <Link
                key={row.to}
                to={row.to}
                className={`group flex items-start gap-3 px-4 py-3.5 hover:bg-bg/60 transition-colors ${
                  i !== 0 ? "border-t border-border-subtle" : ""
                }`}
              >
                <div className="h-8 w-8 shrink-0 rounded-md border border-border-subtle bg-bg flex items-center justify-center">
                  <row.icon size={13} className="text-text" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13.5px] font-medium text-text">
                      {row.title}
                    </span>
                    <span className="text-[10.5px] font-medium text-text-muted border border-border-subtle bg-bg rounded-sm px-1.5 py-[2px] uppercase tracking-wide">
                      {row.tag}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[13px] leading-[19.5px] text-text-secondary">
                    {row.desc}
                  </p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-text-muted group-hover:text-text shrink-0 mt-1"
                />
              </Link>
            ))}
          </div>

          <div id="changelog" className="mt-10">
            <SectionHeader
              eyebrow="Recent"
              title="Changelog"
              right={
                <a className="text-[12.5px] text-text-secondary hover:text-text inline-flex items-center gap-1 cursor-pointer">
                  All updates <ArrowUpRight size={12} />
                </a>
              }
            />
            <ol className="relative ml-3 border-l border-border-subtle">
              {changelog.map((row) => (
                <li key={row.title} className="relative pl-6 pb-5 last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-text" />
                  <div className="text-[11.5px] text-text-muted font-mono">
                    {row.date}
                  </div>
                  <div className="mt-0.5 text-[14px] font-medium text-text">
                    {row.title}
                  </div>
                  <p className="mt-0.5 text-[13px] leading-[19.5px] text-text-secondary">
                    {row.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="space-y-8">
          <div>
            <SectionHeader icon={Clock} eyebrow="Activity" title="Recently updated" />
            <ul className="rounded-lg border border-border-subtle bg-surface overflow-hidden">
              {recentDocs.map((d, i) => (
                <li key={d.to}>
                  <Link
                    to={d.to}
                    className={`flex items-start gap-2 px-3 py-2.5 hover:bg-bg/60 ${
                      i !== 0 ? "border-t border-border-subtle" : ""
                    }`}
                  >
                    <span className="mt-[6px] h-1 w-1 rounded-full bg-text-muted shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[13px] text-text truncate">
                        {d.label}
                      </div>
                      <div className="mt-0.5 text-[11px] uppercase tracking-wide text-text-muted">
                        {d.tag}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* What's new */}
          <div className="relative overflow-hidden rounded-lg border border-border-subtle bg-surface p-4">
            <div
              className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-70"
              style={{
                background:
                  "radial-gradient(closest-side, var(--color-accent-yellow), transparent 70%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-center gap-1.5">
                <Sparkles size={12} className="text-text" />
                <span className="text-[10.5px] uppercase tracking-[0.1em] font-medium text-text-muted">
                  New
                </span>
              </div>
              <div className="mt-1 text-[14px] font-semibold text-text">
                LLM routing v2
              </div>
              <p className="mt-1 text-[13px] leading-[19.5px] text-text-secondary">
                Route across providers by weight, cost ceiling, and latency
                target. Public preview.
              </p>
              <Link
                to="/docs/concepts#llm-routing"
                className="mt-2 inline-flex items-center gap-1 text-[13px] text-text font-medium hover:underline"
              >
                Read the guide
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>

          {/* Auth quick card */}
          <div className="rounded-lg border border-border-subtle bg-surface p-4">
            <div className="flex items-center gap-1.5">
              <KeyRound size={12} className="text-text-muted" />
              <span className="text-[10.5px] uppercase tracking-[0.1em] font-medium text-text-muted">
                Reference
              </span>
            </div>
            <div className="mt-1 text-[14px] font-semibold text-text">
              Authentication
            </div>
            <p className="mt-1 text-[13px] leading-[19.5px] text-text-secondary">
              Workspace API keys, bearer tokens, scoping, and rotation.
            </p>
            <Link
              to="/docs/api-reference#auth"
              className="mt-2 inline-flex items-center gap-1 text-[13px] text-text font-medium hover:underline"
            >
              API auth →
            </Link>
          </div>
        </aside>
      </section>

      {/* Foot */}
      <footer className="mt-16 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12.5px] text-text-muted">
        <div className="flex items-center gap-2">
          <span>© 2026 Omium</span>
          <span>·</span>
          <a className="hover:text-text cursor-pointer">Privacy</a>
          <span>·</span>
          <a className="hover:text-text cursor-pointer">Terms</a>
          <span>·</span>
          <a className="hover:text-text cursor-pointer">Status</a>
        </div>
        <div className="flex items-center gap-3">
          <a className="hover:text-text cursor-pointer">GitHub</a>
          <a className="hover:text-text cursor-pointer">Community</a>
          <a className="hover:text-text cursor-pointer">Support</a>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  icon: Icon,
  right,
}: {
  eyebrow?: string;
  title: string;
  icon?: React.ComponentType<any>;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        {eyebrow && (
          <div className="flex items-center gap-1.5 mb-1">
            {Icon && <Icon size={12} className="text-text-muted" />}
            <span className="text-[10.5px] uppercase tracking-[0.1em] font-medium text-text-muted">
              {eyebrow}
            </span>
          </div>
        )}
        <h2 className="text-[18px] font-semibold tracking-[-0.015em] text-text leading-[24px]">
          {title}
        </h2>
      </div>
      {right}
    </div>
  );
}
