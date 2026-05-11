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
      <div className="sticky top-[84px]">
        <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/45 mb-3 pl-3">
          On this page
        </div>
        <ul className="border-l border-hairline">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block -ml-px pl-3 pr-2 py-[5px] text-[12.5px] leading-[18px] border-l transition-colors
                    ${
                      isActive
                        ? "border-copper text-copper font-medium"
                        : "border-transparent text-white/50 hover:text-white"
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
          <a className="block text-[11.5px] text-white/40 hover:text-copper cursor-pointer transition-colors">
            ↑ Back to top
          </a>
          <a className="block text-[11.5px] text-white/40 hover:text-copper cursor-pointer transition-colors">
            Edit this page on GitHub
          </a>
        </div>
      </div>
    </aside>
  );
}
