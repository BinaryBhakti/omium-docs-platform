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
        className={`fixed inset-0 z-30 bg-black/60 md:hidden transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={`fixed md:sticky top-0 md:top-[60px] z-40 md:z-10
          h-screen md:h-[calc(100vh-60px)]
          w-[268px] shrink-0
          border-r border-hairline bg-charcoal
          transition-transform md:transition-none
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        aria-label="Documentation navigation"
      >
        <div className="md:hidden flex items-center justify-between h-[60px] px-4 border-b border-hairline">
          <span className="text-[10.5px] uppercase tracking-[0.2em] font-medium text-white/55">
            Navigation
          </span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-white/55 hover:bg-white/[0.04] hover:text-white"
            aria-label="Close navigation"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="overflow-y-auto h-[calc(100%-60px)] md:h-full px-3 pt-5 pb-12">
          {/* Version selector */}
          <div className="mx-1 mb-5 flex items-center justify-between rounded-lg border border-hairline bg-white/[0.02] px-2.5 h-9 text-[11.5px]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="h-1.5 w-1.5 rounded-full bg-copper shadow-[0_0_8px_rgba(222,146,79,0.6)] shrink-0" />
              <span className="text-white font-mono truncate">v1 · stable</span>
            </div>
            <span className="text-white/35 text-[10.5px] font-mono uppercase tracking-wider">
              2026.05
            </span>
          </div>

          {navigation.map((section, idx) => {
            const Icon = sectionIcons[section.title] ?? Compass;
            return (
              <div key={section.title} className="mb-6 last:mb-3">
                <div className="px-2 mb-1.5 flex items-center gap-1.5">
                  <Icon size={11} className="text-copper/70" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/45">
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
                              ? "text-white bg-white/[0.05]"
                              : "text-white/55 hover:text-white hover:bg-white/[0.025]"
                            }`
                          }
                        >
                          {isActive && (
                            <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-copper shadow-[0_0_8px_rgba(222,146,79,0.5)]" />
                          )}
                          <span className="truncate">{item.label}</span>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
                {idx === 0 && (
                  <div className="mx-2 my-5 h-px bg-hairline" />
                )}
              </div>
            );
          })}

          {/* What's new card */}
          <div className="mt-4 mx-1 glass-card-copper relative overflow-hidden p-3.5">
            <div className="relative">
              <div className="flex items-center gap-1.5">
                <Sparkles size={11} className="text-copper" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-copper">
                  What&apos;s new
                </span>
              </div>
              <p className="mt-1.5 text-[12px] leading-[18px] text-white/65">
                Trace API v1.2 ships token cost attribution per span.
              </p>
              <a className="mt-2 inline-flex items-center text-[11.5px] font-medium text-white hover:text-copper cursor-pointer transition-colors">
                Read changelog →
              </a>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
