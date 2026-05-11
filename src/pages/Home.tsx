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
    pages: ["Quickstart", "Installation", "First run"],
  },
  {
    title: "SDK",
    desc: "Python and CLI references with examples for every primitive.",
    to: "/docs/sdk",
    icon: Terminal,
    pages: ["Python", "CLI", "Auth", "Examples"],
  },
  {
    title: "API reference",
    desc: "REST endpoints for runs, checkpoints, traces, and policy enforcement.",
    to: "/docs/api-reference",
    icon: Network,
    pages: ["Runs", "Checkpoints", "Traces", "Policies"],
  },
  {
    title: "Platform concepts",
    desc: "How workflows, checkpointing, recovery, and routing fit together.",
    to: "/docs/concepts",
    icon: Layers,
    pages: ["Workflows", "Recovery", "Tracing", "Routing"],
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
  { date: "Apr 30, 2026", title: "Checkpoint compaction", detail: "Older checkpoints are compacted into 24h windows by default." },
  { date: "Apr 22, 2026", title: "Python SDK 0.9", detail: "New omium.run.watch() helper and improved retry semantics." },
];

export function Home() {
  return (
    <div className="relative">
      {/* Soft copper glow at the top */}
      <div
        className="pointer-events-none absolute top-0 inset-x-0 h-[500px] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 30% 0%, rgba(222,146,79,0.10), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none [mask-image:linear-gradient(to_bottom,black_0%,transparent_60%)]" aria-hidden />

      <div className="relative px-5 md:px-10 py-12 max-w-[1240px] mx-auto w-full">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 h-7 pl-2.5 pr-3 rounded-full border border-copper/30 bg-copper/[0.06] text-[10.5px] uppercase tracking-[0.2em] font-medium text-copper">
              <span className="h-1.5 w-1.5 rounded-full bg-copper shadow-[0_0_8px_rgba(222,146,79,0.7)]" />
              v1 · Stable
            </div>
            <h1 className="mt-5 text-[44px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-extrabold text-white">
              Build reliable AI workflows.
              <span className="block text-white/40 font-semibold">
                Documentation for the Omium platform.
              </span>
            </h1>
            <p className="mt-5 max-w-[600px] text-[16px] leading-[26px] text-white/60">
              The Omium SDK, REST API, and platform primitives — workflows,
              checkpointing, tracing, policy enforcement, and LLM routing — all
              in one place.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/docs/get-started"
                className="btn-copper inline-flex items-center gap-2 h-11 px-5 text-[11px]"
              >
                <Rocket size={13} />
                Start the quickstart
              </Link>
              <Link
                to="/docs/api-reference"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-hairline bg-white/[0.03] text-white text-[11px] uppercase tracking-[0.18em] font-medium hover:border-copper/40 hover:text-copper transition-colors"
              >
                <Network size={13} />
                API reference
              </Link>
            </div>
          </div>

          {/* Terminal card */}
          <div className="rounded-2xl border border-hairline bg-panel overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-hairline">
              <div className="size-3 rounded-full bg-[#FF5F56]" />
              <div className="size-3 rounded-full bg-[#FFBD2E]" />
              <div className="size-3 rounded-full bg-[#27C93F]" />
              <span className="ml-2 text-[11px] font-mono text-white/55">terminal</span>
              <span className="ml-auto text-[10.5px] font-mono text-white/30 uppercase tracking-wider">
                ~/omium
              </span>
            </div>
            <pre className="p-5 font-mono text-[13px] leading-[22px] text-white/90 bg-charcoal">
              <span className="text-copper">$</span> pip install omium{"\n"}
              <span className="text-copper">$</span> export{" "}
              <span className="tok-keyword">OMIUM_API_KEY</span>=
              <span className="tok-string">"omk_..."</span>{"\n"}
              <span className="text-copper">$</span> omium run hello.py::summarize \{"\n"}
              {"  "}--arg text=<span className="tok-string">"Omium runs production AI."</span>{"\n\n"}
              <span className="tok-comment">→ run_01H8XK… ✓ summarize · 412ms · $0.0004</span>
            </pre>
          </div>
        </section>

        {/* Category grid */}
        <section className="mt-16">
          <SectionHeader eyebrow="Browse" title="Pick a path" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                to={cat.to}
                className="group relative overflow-hidden glass-card p-5"
              >
                <div className="relative">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-lg border border-hairline bg-white/[0.03] flex items-center justify-center group-hover:border-copper/30 group-hover:bg-copper/10 transition-colors">
                      <cat.icon size={15} className="text-copper" />
                    </div>
                    <span className="text-[16px] font-semibold text-white tracking-[-0.015em]">
                      {cat.title}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="ml-auto text-white/35 group-hover:text-copper transition-colors"
                    />
                  </div>
                  <p className="mt-3 text-[13.5px] leading-[20px] text-white/55">
                    {cat.desc}
                  </p>
                  <ul className="mt-3.5 flex flex-wrap gap-1.5">
                    {cat.pages.map((p) => (
                      <li
                        key={p}
                        className="text-[10.5px] uppercase tracking-[0.15em] font-medium text-white/45 border border-hairline bg-white/[0.02] rounded-sm px-1.5 py-[3px]"
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

        {/* Featured guides + side */}
        <section id="what-is-omium" className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SectionHeader icon={BookOpen} eyebrow="Featured" title="Popular guides" />
            <div className="rounded-xl border border-hairline bg-panel overflow-hidden">
              {popularGuides.map((row, i) => (
                <Link
                  key={row.to}
                  to={row.to}
                  className={`group flex items-start gap-4 px-5 py-4 hover:bg-white/[0.025] transition-colors ${
                    i !== 0 ? "border-t border-hairline" : ""
                  }`}
                >
                  <div className="h-9 w-9 shrink-0 rounded-lg border border-hairline bg-white/[0.02] flex items-center justify-center group-hover:border-copper/30 transition-colors">
                    <row.icon size={14} className="text-copper" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[14.5px] font-semibold text-white">
                        {row.title}
                      </span>
                      <span className="text-[9.5px] font-medium text-copper/80 border border-copper/25 bg-copper/[0.06] rounded-sm px-1.5 py-[2px] uppercase tracking-[0.15em]">
                        {row.tag}
                      </span>
                    </div>
                    <p className="mt-1 text-[13px] leading-[20px] text-white/55">
                      {row.desc}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-white/30 group-hover:text-copper shrink-0 mt-2 transition-colors"
                  />
                </Link>
              ))}
            </div>

            <div id="changelog" className="mt-12">
              <SectionHeader
                eyebrow="Recent"
                title="Changelog"
                right={
                  <a className="text-[10.5px] uppercase tracking-[0.2em] font-medium text-white/45 hover:text-copper inline-flex items-center gap-1.5 cursor-pointer transition-colors link-underline">
                    All updates <ArrowUpRight size={11} />
                  </a>
                }
              />
              <ol className="relative ml-3 border-l border-hairline">
                {changelog.map((row) => (
                  <li key={row.title} className="relative pl-6 pb-6 last:pb-0">
                    <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-copper shadow-[0_0_10px_rgba(222,146,79,0.6)]" />
                    <div className="text-[10.5px] uppercase tracking-[0.2em] text-white/35 font-mono">
                      {row.date}
                    </div>
                    <div className="mt-1 text-[15px] font-semibold text-white tracking-[-0.01em]">
                      {row.title}
                    </div>
                    <p className="mt-1 text-[13.5px] leading-[20px] text-white/55">
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
              <ul className="rounded-xl border border-hairline bg-panel overflow-hidden">
                {recentDocs.map((d, i) => (
                  <li key={d.to}>
                    <Link
                      to={d.to}
                      className={`flex items-start gap-2.5 px-3.5 py-3 hover:bg-white/[0.025] transition-colors ${
                        i !== 0 ? "border-t border-hairline" : ""
                      }`}
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-copper/70 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[13px] text-white truncate">
                          {d.label}
                        </div>
                        <div className="mt-0.5 text-[9.5px] uppercase tracking-[0.18em] text-white/35 font-mono">
                          {d.tag}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* What's new (copper) */}
            <div className="glass-card-copper p-5">
              <div className="flex items-center gap-1.5">
                <Sparkles size={12} className="text-copper" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-copper">
                  New
                </span>
              </div>
              <div className="mt-2 text-[15px] font-semibold text-white tracking-[-0.01em]">
                LLM routing v2
              </div>
              <p className="mt-1.5 text-[13.5px] leading-[20px] text-white/60">
                Route across providers by weight, cost ceiling, and latency
                target. Public preview.
              </p>
              <Link
                to="/docs/concepts#llm-routing"
                className="mt-3 inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] text-copper font-semibold hover:text-white transition-colors link-underline"
              >
                Read the guide
                <ArrowUpRight size={12} />
              </Link>
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center gap-1.5">
                <KeyRound size={11} className="text-white/45" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/45">
                  Reference
                </span>
              </div>
              <div className="mt-2 text-[15px] font-semibold text-white tracking-[-0.01em]">
                Authentication
              </div>
              <p className="mt-1.5 text-[13.5px] leading-[20px] text-white/55">
                Workspace API keys, bearer tokens, scoping, and rotation.
              </p>
              <Link
                to="/docs/api-reference#auth"
                className="mt-3 inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] text-white/65 font-semibold hover:text-copper transition-colors link-underline"
              >
                API auth
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </aside>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10.5px] uppercase tracking-[0.18em] font-medium text-white/40">
          <div className="flex items-center gap-3 flex-wrap">
            <span>© 2026 Omium</span>
            <span className="text-white/20">·</span>
            <a className="hover:text-copper cursor-pointer transition-colors">Privacy</a>
            <span className="text-white/20">·</span>
            <a className="hover:text-copper cursor-pointer transition-colors">Terms</a>
            <span className="text-white/20">·</span>
            <a className="hover:text-copper cursor-pointer transition-colors">Status</a>
          </div>
          <div className="flex items-center gap-4">
            <a className="hover:text-copper cursor-pointer transition-colors link-underline">GitHub</a>
            <a className="hover:text-copper cursor-pointer transition-colors link-underline">Community</a>
            <a className="hover:text-copper cursor-pointer transition-colors link-underline">Support</a>
          </div>
        </footer>
      </div>
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
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        {eyebrow && (
          <div className="flex items-center gap-1.5 mb-1.5">
            {Icon && <Icon size={11} className="text-copper" />}
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-copper">
              {eyebrow}
            </span>
          </div>
        )}
        <h2 className="text-[22px] font-bold tracking-[-0.025em] text-white leading-[26px]">
          {title}
        </h2>
      </div>
      {right}
    </div>
  );
}
