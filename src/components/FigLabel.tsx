// FigLabel — ported from omium-web's `src/components/shared/fig-label.tsx`.
// Inline variant: "FIG 01 — Section name", with a thin hairline divider.

type Props = {
  number?: string;
  label: string;
  className?: string;
};

export function FigLabel({ number, label, className = "" }: Props) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-text-tertiary ${className}`}
      style={{
        fontSize: "var(--text-meta)",
        letterSpacing: "var(--text-meta--letter-spacing)",
      }}
    >
      {number && <span className="uppercase">FIG {number}</span>}
      {number && (
        <span
          className="h-px w-6 bg-[color:var(--color-border)]"
          aria-hidden
        />
      )}
      <span className="uppercase">{label}</span>
    </div>
  );
}
