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
    <header className="sticky top-0 z-40 bg-charcoal/85 backdrop-blur-xl supports-[backdrop-filter]:bg-charcoal/70 border-b border-hairline">
      <div className="flex h-[60px] items-center gap-3 pl-3 pr-3 md:pl-5 md:pr-5">
        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-md text-white/60 hover:bg-white/[0.04] hover:text-white"
          aria-label="Open navigation"
        >
          <Menu size={16} />
        </button>

        <Logo />

        <span className="hidden md:inline-block text-white/20 mx-2">/</span>

        <nav className="hidden md:flex items-center gap-5 lg:gap-6">
          {links.map((l) => {
            const active =
              (l.to === "/" && isDocsRoot) ||
              (l.to !== "/" && location.pathname.startsWith(l.to.split("#")[0]));
            return (
              <Link
                key={l.label}
                to={l.to}
                className={`text-[10.5px] uppercase tracking-[0.2em] font-medium link-underline transition-colors
                  ${active ? "text-white" : "text-white/55 hover:text-copper"}`}
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
          className="hidden sm:flex items-center gap-2 h-9 w-[260px] lg:w-[340px] rounded-full bg-white/[0.03] border border-hairline px-3.5 text-white/40 hover:border-copper/40 hover:text-white/70 transition-colors"
        >
          <Search size={13} className="shrink-0" />
          <span className="text-[12.5px] flex-1 text-left truncate font-mono">
            Search documentation
          </span>
          <kbd className="font-mono text-[10px] leading-none rounded-sm border border-hairline bg-white/[0.04] px-1.5 py-1 text-white/45">
            ⌘K
          </kbd>
        </button>

        <button
          type="button"
          onClick={onSearchClick}
          className="sm:hidden inline-flex h-8 w-8 items-center justify-center rounded-md text-white/60 hover:bg-white/[0.04] hover:text-white"
          aria-label="Search"
        >
          <Search size={16} />
        </button>

        <div className="hidden lg:flex items-center gap-3 pl-2 ml-1">
          <a
            href="https://github.com"
            className="inline-flex items-center gap-1.5 h-8 px-2 rounded-md text-[10.5px] uppercase tracking-[0.2em] font-medium text-white/55 hover:text-copper transition-colors link-underline"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={13} />
            GitHub
          </a>
        </div>

        <a
          href="#"
          className="btn-copper inline-flex items-center gap-1.5 h-9 px-4 text-[10px]"
        >
          Open dashboard
          <ArrowUpRight size={11} className="opacity-80" />
        </a>
      </div>
    </header>
  );
}
