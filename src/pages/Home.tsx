import { HubCard, HubGrid } from "../components/HubCard";
import {
  Rocket,
  Network,
  Users,
  Download,
  KeyRound,
  FolderOpen,
  Terminal,
  Code,
  LayoutDashboard,
} from "lucide-react";

const popular = [
  {
    title: "Quickstart",
    description: "Run your first traced workflow in a few minutes.",
    to: "/docs/getting-started/quickstart",
    icon: Rocket,
  },
  {
    title: "LangGraph",
    description: "Automatic tracing and checkpoints for LangGraph applications.",
    to: "/docs/build-with-omium/langgraph",
    icon: Network,
  },
  {
    title: "CrewAI",
    description: "Automatic tracing and checkpoints for CrewAI crews.",
    to: "/docs/build-with-omium/crewai",
    icon: Users,
  },
];

const omiumBasics = [
  {
    title: "Installation",
    description: "Install the Omium Python package and CLI.",
    to: "/docs/getting-started/installation",
    icon: Download,
  },
  {
    title: "Configure",
    description: "Authenticate the CLI and SDK with the Omium platform.",
    to: "/docs/getting-started/configure",
    icon: KeyRound,
  },
  {
    title: "Quickstart",
    description: "Run your first traced workflow in a few minutes.",
    to: "/docs/getting-started/quickstart",
    icon: Rocket,
  },
  {
    title: "First project",
    description: "Create a project, push it, and see it on the dashboard.",
    to: "/docs/getting-started/first-project",
    icon: FolderOpen,
  },
  {
    title: "Python SDK",
    description: "Initialize Omium, instrument frameworks, and use advanced APIs.",
    to: "/docs/sdk/python-sdk",
    icon: Code,
  },
  {
    title: "CLI reference",
    description: "Commands for configuration, runs, traces, and projects.",
    to: "/docs/sdk/cli",
    icon: Terminal,
  },
  {
    title: "Platform capabilities",
    description: "How tracing, checkpoints, workflows, and the dashboard fit together.",
    to: "/docs/build-with-omium/overview",
    icon: LayoutDashboard,
  },
];

export function Home() {
  return (
    <div className="relative overflow-clip">
      {/* Dot-grid texture across the top of the page — borrowed from
          omium-web's DottedLogoBackground. Faded out toward the lower
          two-thirds so it doesn't fight with the card grids. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-dot opacity-90"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
        }}
        aria-hidden
      />
      {/* Warm-glow radial in the upper-right — omium-web's warm-glow-radial. */}
      <div
        className="pointer-events-none absolute -top-32 -right-40 w-[820px] h-[820px] opacity-80"
        style={{
          background:
            "radial-gradient(circle at 75% 35%, var(--color-warm-halftone) 0%, var(--color-warm-glow) 25%, transparent 55%)",
        }}
        aria-hidden
      />

      <div className="relative px-5 md:px-10 pt-14 pb-20 max-w-[1240px] mx-auto w-full">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.04] tracking-[-0.03em] font-semibold text-text">
            Start building with Omium
          </h1>
          <p className="mt-3 max-w-[640px] text-[16px] leading-[26px] text-text-secondary">
            Tracing, checkpoints, and recovery for multi-agent systems — from
            first install to production.
          </p>
        </header>

        <Section title="Popular">
          <HubGrid>
            {popular.map((c) => (
              <HubCard key={c.to + c.title} {...c} />
            ))}
          </HubGrid>
        </Section>

        <Section title="Omium basics">
          <HubGrid>
            {omiumBasics.map((c) => (
              <HubCard key={c.to + c.title} {...c} />
            ))}
          </HubGrid>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14 last:mb-0">
      <h2 className="mb-5 text-[18px] font-semibold tracking-[-0.015em] text-text">
        {title}
      </h2>
      {children}
    </section>
  );
}
