type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const styles: Record<Method, string> = {
  GET: "text-white/90 border-white/15 bg-white/[0.04]",
  POST: "text-copper border-copper/40 bg-copper/10",
  PUT: "text-copper border-copper/40 bg-copper/15",
  PATCH: "text-copper border-copper/30 bg-copper/8",
  DELETE: "text-[#ff8e8e] border-[#ff8e8e]/35 bg-[#ff8e8e]/8",
};

export function MethodBadge({ method, size = "md" }: { method: string; size?: "sm" | "md" }) {
  const m = (method.toUpperCase() as Method) ?? "GET";
  const cls = styles[m] ?? styles.GET;
  const sz =
    size === "sm"
      ? "h-[20px] min-w-[44px] text-[10px] px-1.5"
      : "h-[22px] min-w-[50px] text-[10.5px] px-2";
  return (
    <span
      className={`inline-flex items-center justify-center font-mono font-medium tracking-[0.12em] uppercase rounded-md border ${sz} ${cls}`}
    >
      {m}
    </span>
  );
}
