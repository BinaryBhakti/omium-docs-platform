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
      { rootMargin: "-92px 0px -70% 0px", threshold: [0, 1] }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block w-[220px] shrink-0">
      <div className="sticky top-[88px]">
        <div className="font-mono text-meta uppercase text-text-tertiary mb-3">
          On this page
        </div>
        <ul className="border-l border-[color:var(--color-border-structural)]">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block -ml-px pl-3 pr-2 py-1.5 text-[12.5px] leading-[18px] border-l transition-colors
                    ${
                      isActive
                        ? "border-text text-text font-medium"
                        : "border-transparent text-text-tertiary hover:text-text-secondary"
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

        <div className="mt-6 pl-3">
          <button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="text-[12px] text-text-tertiary hover:text-text cursor-pointer transition-colors"
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </aside>
  );
}
