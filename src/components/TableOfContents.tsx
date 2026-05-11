import { useEffect, useState } from "react";
import type { TocItem } from "../data/docs";

type Props = {
  items: TocItem[];
};

export function TableOfContents({ items }: Props) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-84px 0px -70% 0px", threshold: [0, 1] }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block w-[220px] shrink-0">
      <div className="sticky top-[76px]">
        <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-text-muted mb-2 pl-3">
          On this page
        </div>
        <ul className="border-l border-border-subtle">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block -ml-px pl-3 pr-2 py-[5px] text-[12.5px] leading-[18px] border-l transition-colors
                    ${
                      isActive
                        ? "border-text text-text font-medium"
                        : "border-transparent text-text-secondary hover:text-text"
                    }
                    ${item.depth === 3 ? "pl-7" : ""}
                  `}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 pl-3 space-y-1.5">
          <a className="block text-[12px] text-text-muted hover:text-text cursor-pointer">
            ↑ Back to top
          </a>
          <a className="block text-[12px] text-text-muted hover:text-text cursor-pointer">
            Edit this page on GitHub
          </a>
        </div>
      </div>
    </aside>
  );
}
