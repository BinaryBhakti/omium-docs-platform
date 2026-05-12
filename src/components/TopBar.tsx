import { Search, Github, Menu, ArrowUpRight, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { Link, useLocation } from "react-router-dom";

type Props = {
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  onAskAiClick?: () => void;
};

const links = [
  { label: "Documentation", to: "/" },
  { label: "API", to: "/docs/api-reference" },
  { label: "Changelog", to: "/#changelog" },
];

export function TopBar({ onMenuClick, onSearchClick, onAskAiClick }: Props) {
  const location = useLocation();
  const isDocsRoot = location.pathname === "/";

  return (
    <header
      className="sticky top-0 z-40 bg-bg/90 supports-[backdrop-filter]:bg-bg/75 backdrop-blur-xl border-b border-[color:var(--color-border-structural)]"
    >
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        {/* Left: logo + primary nav */}
        <div className="flex items-center gap-5 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-bg-hover hover:text-text transition-colors"
            aria-label="Open navigation"
          >
            <Menu size={16} />
          </button>

          <Logo height={24} />

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active =
                (l.to === "/" && isDocsRoot) ||
                (l.to !== "/" &&
                  location.pathname.startsWith(l.to.split("#")[0]));
              return (
                <Link
                  key={l.label}
                  to={l.to}
                  className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    active
                      ? "text-text bg-white/[0.04]"
                      : "text-text-tertiary hover:text-text-secondary hover:bg-white/[0.025]"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Center-right: unified search + Ask-AI capsule */}
        <div className="flex items-center gap-2 min-w-0">
          {/* Unified pill — borderless, soft bg, two-action capsule. */}
          <div className="hidden sm:flex items-stretch h-10 rounded-full bg-white/[0.035] hover:bg-white/[0.06] transition-colors overflow-hidden">
            <button
              type="button"
              onClick={onSearchClick}
              className="group flex items-center gap-2.5 pl-4 pr-3 lg:pr-4 w-[200px] lg:w-[280px] text-text-tertiary hover:text-text-secondary transition-colors"
            >
              <Search size={13} className="shrink-0 opacity-70" />
              <span className="text-[12.5px] flex-1 text-left truncate">
                Search documentation
              </span>
              <span className="hidden lg:inline font-mono text-[11px] text-text-quaternary group-hover:text-text-tertiary transition-colors">
                ⌘K
              </span>
            </button>
            {/* hair-thin divider — barely visible, exactly enough to bisect */}
            <span
              className="w-px self-stretch my-2.5"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
            <button
              type="button"
              onClick={onAskAiClick}
              aria-label="Ask AI"
              className="group inline-flex items-center gap-2 pl-3.5 pr-4 text-text-secondary hover:text-text transition-colors"
            >
              <Sparkles
                size={13}
                className="shrink-0 text-warm-solid/90 group-hover:text-warm-solid group-hover:scale-110 transition-all"
              />
              <span className="text-[12.5px] font-medium">Ask AI</span>
              <span className="hidden lg:inline font-mono text-[11px] text-text-quaternary group-hover:text-text-tertiary transition-colors ml-0.5">
                ⌘I
              </span>
            </button>
          </div>

          {/* Mobile: two compact circular triggers */}
          <button
            type="button"
            onClick={onSearchClick}
            className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.035] text-text-secondary hover:bg-white/[0.07] hover:text-text transition-colors"
            aria-label="Search"
          >
            <Search size={16} />
          </button>
          <button
            type="button"
            onClick={onAskAiClick}
            className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.035] text-text-secondary hover:bg-white/[0.07] transition-colors"
            aria-label="Ask AI"
          >
            <Sparkles size={16} className="text-warm-solid/90" />
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 h-10 px-3 rounded-full text-[12.5px] font-medium text-text-tertiary hover:text-text-secondary hover:bg-white/[0.035] transition-colors"
            aria-label="GitHub repository"
          >
            <Github size={13} />
            GitHub
          </a>

          <a
            href="#"
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-white/90 text-bg text-[12.5px] font-medium hover:bg-white transition-colors ml-1"
          >
            Open dashboard
            <ArrowUpRight size={12} className="opacity-60" />
          </a>
        </div>
      </div>
    </header>
  );
}
