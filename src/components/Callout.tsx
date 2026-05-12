import { Info, Lightbulb, AlertTriangle } from "lucide-react";

type Variant = "note" | "tip" | "warn";

const config: Record<
  Variant,
  { Icon: React.ComponentType<any>; label: string; accent: string }
> = {
  note: { Icon: Info, label: "Note", accent: "var(--color-text-secondary)" },
  tip: { Icon: Lightbulb, label: "Tip", accent: "var(--color-status-ok)" },
  warn: {
    Icon: AlertTriangle,
    label: "Warning",
    accent: "var(--color-status-warn)",
  },
};

export function Callout({
  variant = "note",
  children,
}: {
  variant?: Variant;
  children: React.ReactNode;
}) {
  const { Icon, label, accent } = config[variant];
  return (
    <div
      className="not-prose my-5 rounded-card bg-bg-elevated px-4 py-3.5 flex gap-3"
      style={{ boxShadow: `inset 2px 0 0 ${accent}` }}
    >
      <div className="shrink-0 mt-[2px]">
        <Icon size={14} style={{ color: accent }} />
      </div>
      <div className="min-w-0 flex-1">
        <div
          className="font-mono text-meta uppercase mb-1"
          style={{ color: accent }}
        >
          {label}
        </div>
        <div className="text-[13.5px] leading-[22px] text-text-secondary [&>p]:m-0 [&>p+p]:mt-2 [&_a]:text-text [&_a]:underline [&_a]:decoration-text-quaternary hover:[&_a]:decoration-text [&_code]:font-mono [&_code]:text-[12.5px] [&_code]:bg-bg [&_code]:px-1 [&_code]:py-[1px] [&_code]:rounded">
          {children}
        </div>
      </div>
    </div>
  );
}
