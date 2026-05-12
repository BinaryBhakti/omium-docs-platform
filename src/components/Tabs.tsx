import { useState } from "react";

export type Tab = {
  title: string;
  content: React.ReactNode;
};

export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="not-prose my-5 rounded-card bg-bg-elevated overflow-hidden">
      <div
        role="tablist"
        className="flex items-center gap-1 px-3 pt-2.5 pb-0 bg-bg-card"
      >
        {tabs.map((t, i) => {
          const isActive = i === active;
          return (
            <button
              key={t.title}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={`relative inline-flex items-center h-9 px-3 text-[12.5px] font-medium transition-colors ${
                isActive
                  ? "text-text"
                  : "text-text-tertiary hover:text-text-secondary"
              }`}
            >
              {t.title}
              {isActive && (
                <span className="absolute -bottom-px left-2 right-2 h-[2px] rounded-t-full bg-text" />
              )}
            </button>
          );
        })}
      </div>
      <div className="px-1 py-1">{tabs[active]?.content}</div>
    </div>
  );
}
