import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function AccordionGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-5 divide-y divide-border/60 rounded-card bg-bg-elevated overflow-hidden">
      {children}
    </div>
  );
}

export function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-bg-hover/40 transition-colors"
      >
        <ChevronDown
          size={13}
          className={`text-text-tertiary shrink-0 transition-transform duration-200 ${
            open ? "rotate-0" : "-rotate-90"
          }`}
        />
        <span className="flex-1 text-[14px] font-medium text-text">{title}</span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pl-10 text-[13.5px] leading-[22px] text-text-secondary [&>p]:m-0 [&>p+p]:mt-3 [&_a]:text-text [&_a]:underline [&_a]:decoration-text-quaternary hover:[&_a]:decoration-text [&_code]:font-mono [&_code]:text-[12.5px] [&_code]:bg-bg [&_code]:px-1 [&_code]:py-[1px] [&_code]:rounded [&_strong]:text-text [&_strong]:font-semibold">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
