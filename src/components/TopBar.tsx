import { Search, Github, Menu, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { Link, useLocation } from "react-router-dom";

type Props = {
  onMenuClick?: () => void;
  onSearchClick?: () => void;
};

const links = [
  { label: "Documentation", to: "/" },
  { label: "API", to: "/docs/api-reference" },
  { label: "Changelog", to: "/#changelog" },
];

export function TopBar({ onMenuClick, onSearchClick }: Props) {
  const location = useLocation();
  const isDocsRoot = location.pathname === "/";

  return (
    <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70 hairline">
      <div className="flex h-[52px] items-center gap-3 pl-3 pr-3 md:pl-4 md:pr-5">
        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-md text-text-secondary hover:bg-[color:var(--color-hover)] hover:text-text"
          aria-label="Open navigation"
        >
          <Menu size={16} />
        </button>

        <Logo />

        <span className="hidden md:inline-block text-text-muted/70 mx-1">/</span>

        <nav className="hidden md:flex items-center gap-0.5">
          {links.map((l) => {
            const active =
              (l.to === "/" && isDocsRoot) ||
              (l.to !== "/" && location.pathname.startsWith(l.to.split("#")[0]));
            return (
              <Link
                key={l.label}
                to={l.to}
                className={`inline-flex items-center h-7 px-2 rounded-md text-[13px] transition-colors
                  ${active
                    ? "text-text"
                    : "text-text-secondary hover:text-text hover:bg-[color:var(--color-hover)]"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* Search */}
        <button
          type="button"
          onClick={onSearchClick}
          className="hidden sm:flex items-center gap-2 h-8 w-[260px] lg:w-[340px] rounded-md bg-surface border border-border-subtle px-2.5 text-text-muted hover:border-border-strong hover:text-text-secondary transition-colors"
        >
          <Search size={14} className="shrink-0" />
          <span className="text-[13px] flex-1 text-left truncate">
            Search documentation
          </span>
          <kbd className="font-mono text-[10.5px] leading-none rounded-sm border border-border-subtle bg-bg px-1.5 py-1 text-text-muted">
            ⌘K
          </kbd>
        </button>

        <button
          type="button"
          onClick={onSearchClick}
          className="sm:hidden inline-flex h-8 w-8 items-center justify-center rounded-md text-text-secondary hover:bg-[color:var(--color-hover)] hover:text-text"
          aria-label="Search"
        >
          <Search size={16} />
        </button>

        <div className="hidden lg:flex items-center gap-1 pl-2 ml-1">
          <a
            href="https://github.com"
            className="inline-flex items-center gap-1.5 h-8 px-2 rounded-md text-[13px] text-text-secondary hover:bg-[color:var(--color-hover)] hover:text-text"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={14} />
            GitHub
          </a>
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-1 h-8 px-2.5 rounded-md text-[13px] font-medium bg-text text-bg hover:opacity-90 transition-opacity"
        >
          Open dashboard
          <ArrowUpRight size={13} className="opacity-80" />
        </a>
      </div>
    </header>
  );
}
