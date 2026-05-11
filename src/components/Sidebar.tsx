import { NavLink, useLocation } from "react-router-dom";
import { navigation } from "../data/navigation";
import {
  X,
  Compass,
  Rocket,
  Terminal,
  Network,
  Layers,
  Sparkles,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const sectionIcons: Record<string, React.ComponentType<any>> = {
  Overview: Compass,
  "Get started": Rocket,
  SDK: Terminal,
  "API reference": Network,
  "Platform concepts": Layers,
};

export function Sidebar({ open, onClose }: Props) {
  const location = useLocation();
  const currentPath = location.pathname + location.hash;

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-text/30 md:hidden transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={`fixed md:sticky top-0 md:top-[52px] z-40 md:z-10
          h-screen md:h-[calc(100vh-52px)]
          w-[268px] shrink-0
          border-r border-border-subtle bg-bg
          transition-transform md:transition-none
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        aria-label="Documentation navigation"
      >
        <div className="md:hidden flex items-center justify-between h-[52px] px-4 hairline">
          <span className="text-[13px] font-medium text-text">Navigation</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-secondary hover:bg-[color:var(--color-hover)] hover:text-text"
            aria-label="Close navigation"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="overflow-y-auto h-[calc(100%-52px)] md:h-full px-3 pt-4 pb-10">
          {/* Version selector */}
          <div className="mx-1 mb-4 flex items-center justify-between rounded-md border border-border-subtle bg-surface px-2 h-8 text-[12.5px]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-orange shrink-0" />
              <span className="text-text font-medium truncate">v1 · stable</span>
            </div>
            <span className="text-text-muted text-[11px]">2026.05</span>
          </div>

          {navigation.map((section, idx) => {
            const Icon = sectionIcons[section.title] ?? Compass;
            return (
              <div key={section.title} className="mb-5 last:mb-3">
                <div className="px-2 mb-1 flex items-center gap-1.5">
                  <Icon size={12} className="text-text-muted" />
                  <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-text-muted">
                    {section.title}
                  </span>
                </div>
                <ul className="space-y-px">
                  {section.items.map((item) => {
                    const isActive =
                      currentPath === item.to ||
                      (!item.to.includes("#") && location.pathname === item.to);
                    return (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          onClick={onClose}
                          className={() =>
                            `relative flex items-center h-7 px-2 rounded-md text-[13px] transition-colors
                            ${isActive
                              ? "text-text bg-[color:var(--color-active)] font-medium"
                              : "text-text-secondary hover:text-text hover:bg-[color:var(--color-hover)]"
                            }`
                          }
                        >
                          {isActive && (
                            <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-text" />
                          )}
                          <span className="truncate">{item.label}</span>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
                {idx === 0 && (
                  <div className="mx-2 my-4 h-px bg-border-subtle" />
                )}
              </div>
            );
          })}

          <div className="mt-4 mx-1 rounded-lg border border-border-subtle bg-surface p-3 relative overflow-hidden">
            <div
              className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, var(--color-accent-yellow), transparent)",
              }}
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-center gap-1.5">
                <Sparkles size={12} className="text-text" />
                <span className="text-[12px] font-medium text-text">
                  What&apos;s new
                </span>
              </div>
              <p className="mt-1 text-[12px] leading-[18px] text-text-secondary">
                Trace API v1.2 ships token cost attribution per span.
              </p>
              <a className="mt-2 inline-flex items-center text-[12px] font-medium text-text hover:underline cursor-pointer">
                Read changelog →
              </a>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
