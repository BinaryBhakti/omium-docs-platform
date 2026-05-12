type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const styles: Record<Method, string> = {
  GET: "text-text bg-bg-elevated",
  POST: "text-text bg-bg-hover",
  PUT: "text-text bg-bg-hover",
  PATCH: "text-text bg-bg-elevated",
  DELETE: "text-status-err bg-bg-elevated",
};

export function MethodBadge({ method, size = "md" }: { method: string; size?: "sm" | "md" }) {
  const m = (method.toUpperCase() as Method) ?? "GET";
  const cls = styles[m] ?? styles.GET;
  const sz =
    size === "sm"
      ? "h-[20px] min-w-[44px] text-[10px] px-2"
      : "h-[22px] min-w-[52px] text-[10.5px] px-2";
  return (
    <span
      className={`inline-flex items-center justify-center font-mono font-medium tracking-[0.1em] uppercase rounded ${sz} ${cls}`}
    >
      {m}
    </span>
  );
}
