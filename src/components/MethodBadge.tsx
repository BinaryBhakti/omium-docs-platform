type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const styles: Record<Method, string> = {
  GET: "text-text border-border-strong bg-surface",
  POST: "text-text border-[#caa86b] bg-accent-yellow",
  PUT: "text-text border-[#c88f5a] bg-accent-orange/80",
  PATCH: "text-text border-[#caa86b] bg-accent-orange/60",
  DELETE: "text-text border-[#d97a9f] bg-accent-pink/80",
};

export function MethodBadge({ method, size = "md" }: { method: string; size?: "sm" | "md" }) {
  const m = (method.toUpperCase() as Method) ?? "GET";
  const cls = styles[m] ?? styles.GET;
  const sz =
    size === "sm"
      ? "h-[18px] min-w-[40px] text-[10px] px-1.5"
      : "h-[20px] min-w-[46px] text-[10.5px] px-1.5";
  return (
    <span
      className={`inline-flex items-center justify-center font-mono font-medium tracking-wide rounded-sm border ${sz} ${cls}`}
    >
      {m}
    </span>
  );
}
