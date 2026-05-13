import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navigation } from "../data/navigation";
import { X, ChevronDown } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: Props) {
  const location = useLocation();
  const currentPath = location.pathname + location.hash;

  // Identify which section owns the current route. That one is locked
  // open — the user can collapse other sections but never lose context.
  const sectionOwnsRoute = (title: string) => {
    const sec = navigation.find((s) => s.title === title);
    if (!sec) return false;
    return sec.items.some((it) => location.pathname === it.to.split("#")[0]);
  };

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(navigation.map((s) => [s.title, true]))
  );

  useEffect(() => {
    setExpanded((prev) => {
      const next = { ...prev };
      navigation.forEach((sec) => {
        if (sectionOwnsRoute(sec.title)) next[sec.title] = true;
      });
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggle = (title: string) => {
    if (sectionOwnsRoute(title)) return; // never collapse the active section
    setExpanded((p) => ({ ...p, [title]: !p[title] }));
  };

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
        className={`fixed md:sticky top-0 md:top-16 z-40 md:z-10
          h-screen md:h-[calc(100vh-64px)]
          w-[260px] shrink-0
          bg-bg border-r border-[color:var(--color-border-structural)]
          transition-transform md:transition-none
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        aria-label="Documentation navigation"
      >
        <div className="md:hidden flex items-center justify-between h-16 px-4">
          <span className="font-mono text-meta uppercase text-text-tertiary">
            Navigation
          </span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-bg-hover hover:text-text"
            aria-label="Close navigation"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="overflow-y-auto h-[calc(100%-64px)] md:h-full px-3 pt-5 pb-10">
          {/* Version pill — quieter */}
          <div className="mx-1 mb-5 flex items-center justify-between rounded-md bg-bg-elevated px-2.5 h-8 text-[11.5px]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="h-1.5 w-1.5 rounded-full bg-status-ok pulse-dot shrink-0" />
              <span className="text-text-secondary font-mono">v1 · stable</span>
            </div>
            <span className="text-text-quaternary text-[10px] font-mono uppercase tracking-[0.1em]">
              2026.05
            </span>
          </div>

          {navigation.map((section, idx) => {
            const isOpen = expanded[section.title];
            return (
              <section key={section.title} className="mb-3 last:mb-3">
                <button
                  type="button"
                  onClick={() => toggle(section.title)}
                  aria-expanded={isOpen}
                  className={`group w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors ${
                    sectionOwnsRoute(section.title)
                      ? "text-text-secondary"
                      : "text-text-tertiary hover:text-text-secondary"
                  }`}
                >
                  <span className="font-mono text-meta uppercase">
                    {section.title}
                  </span>
                  {!sectionOwnsRoute(section.title) && (
                    <ChevronDown
                      size={11}
                      className={`text-text-quaternary group-hover:text-text-tertiary transition-transform duration-200 ${
                        isOpen ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  )}
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-200 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="mt-0.5 mb-1 space-y-px">
                      {section.items.map((item) => {
                        const isActive =
                          currentPath === item.to ||
                          (!item.to.includes("#") &&
                            location.pathname === item.to);
                        return (
                          <li key={item.to}>
                            <NavLink
                              to={item.to}
                              onClick={onClose}
                              className={() =>
                                `relative flex items-center h-[30px] pl-5 pr-2.5 text-[13px] transition-colors rounded-md
                                ${
                                  isActive
                                    ? "text-text bg-bg-hover font-medium"
                                    : "text-text-secondary hover:text-text hover:bg-bg-elevated"
                                }`
                              }
                            >
                              {isActive && (
                                <span className="absolute left-[7px] top-1.5 bottom-1.5 w-[2px] rounded-full bg-text" />
                              )}
                              <span className="truncate">{item.label}</span>
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                {idx === 0 && <div className="h-3" />}
              </section>
            );
          })}

        </nav>
      </aside>
    </>
  );
}
