import { FlaskConical, Clock } from "lucide-react";

export type Complexity = "beginner" | "intermediate" | "advanced";

const complexityLabel: Record<Complexity, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function ComplexityPill({ level }: { level: Complexity }) {
  const dots = level === "beginner" ? 1 : level === "intermediate" ? 2 : 3;
  return (
    <span className="inline-flex items-center gap-1.5 h-[22px] px-2 rounded-pill bg-bg-elevated font-mono text-meta uppercase text-text-secondary">
      <span className="inline-flex items-center gap-[3px]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-[5px] w-[5px] rounded-full ${
              i < dots ? "bg-text" : "bg-text-quaternary"
            }`}
          />
        ))}
      </span>
      {complexityLabel[level]}
    </span>
  );
}

export function EtaPill({ minutes }: { minutes: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 h-[22px] px-2 rounded-pill bg-bg-elevated font-mono text-meta uppercase text-text-secondary">
      <Clock size={10} />
      {minutes} min
    </span>
  );
}

export function BetaPill() {
  return (
    <span className="inline-flex items-center gap-1.5 h-[22px] px-2 rounded-pill bg-bg-elevated font-mono text-meta uppercase text-warm-solid">
      <FlaskConical size={10} />
      Beta
    </span>
  );
}
