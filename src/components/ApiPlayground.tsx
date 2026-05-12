import { useMemo, useState } from "react";
import { Play, Square, Check, Eye, EyeOff } from "lucide-react";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type Lang = "python" | "node" | "go" | "curl";

export type Param = {
  name: string;
  in: "header" | "query" | "body";
  type: "string" | "number" | "boolean";
  required?: boolean;
  default?: string | number | boolean;
  description?: string;
  secret?: boolean;
};

type RunnerArgs = {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  body?: unknown;
};

type RunnerResult = { status: number; durationMs: number; body: unknown };

type Props = {
  method: HttpMethod;
  endpoint: string;
  baseUrl?: string;
  params: Param[];
  /** Optional override: defaults to a local mock so the docs work without a backend. */
  runner?: (args: RunnerArgs) => Promise<RunnerResult>;
};

const buildSnippet = (
  lang: Lang,
  m: HttpMethod,
  url: string,
  headers: Record<string, string>,
  body?: unknown
): string => {
  switch (lang) {
    case "curl":
      return [
        `curl -X ${m} '${url}' \\`,
        ...Object.entries(headers).map(([k, v]) => `  -H '${k}: ${v}' \\`),
        body !== undefined ? `  -d '${JSON.stringify(body)}'` : null,
      ]
        .filter(Boolean)
        .join("\n");
    case "python":
      return [
        `import httpx`,
        ``,
        `r = httpx.request(`,
        `    "${m}", "${url}",`,
        `    headers=${JSON.stringify(headers, null, 4).replace(/"/g, "'")},`,
        body !== undefined ? `    json=${JSON.stringify(body, null, 4)},` : null,
        `)`,
        `print(r.status_code, r.json())`,
      ]
        .filter(Boolean)
        .join("\n");
    case "node":
      return [
        `const res = await fetch("${url}", {`,
        `  method: "${m}",`,
        `  headers: ${JSON.stringify(headers, null, 2)},`,
        body !== undefined
          ? `  body: JSON.stringify(${JSON.stringify(body, null, 2)}),`
          : null,
        `});`,
        `console.log(res.status, await res.json());`,
      ]
        .filter(Boolean)
        .join("\n");
    case "go":
      return [
        `req, _ := http.NewRequest("${m}", "${url}", strings.NewReader(\`${
          body ? JSON.stringify(body) : ""
        }\`))`,
        ...Object.entries(headers).map(
          ([k, v]) => `req.Header.Set("${k}", "${v}")`
        ),
        `resp, err := http.DefaultClient.Do(req)`,
      ].join("\n");
  }
};

const defaultMockRunner = async (
  args: RunnerArgs
): Promise<RunnerResult> => {
  const start = performance.now();
  // Simulate network latency 350-650ms
  await new Promise((r) => setTimeout(r, 350 + Math.random() * 300));
  const durationMs = Math.round(performance.now() - start);
  if (args.method === "POST" && args.url.includes("/v1/runs")) {
    return {
      status: 201,
      durationMs,
      body: {
        id: "run_01H8XKQ4ABCDEF",
        workflow: (args.body as any)?.workflow ?? "crawl",
        status: "queued",
        created_at: new Date().toISOString(),
        input: (args.body as any)?.input ?? {},
      },
    };
  }
  if (args.url.match(/\/v1\/runs\/[\w_]+/)) {
    return {
      status: 200,
      durationMs,
      body: {
        id: "run_01H8XKQ4ABCDEF",
        status: "succeeded",
        duration_ms: 2412,
        cost_usd: 0.0019,
      },
    };
  }
  return { status: 200, durationMs, body: { ok: true } };
};

export function ApiPlayground({
  method,
  endpoint,
  baseUrl = "https://api.omium.ai",
  params,
  runner = defaultMockRunner,
}: Props) {
  const [lang, setLang] = useState<Lang>("python");
  const [showSecrets, setShowSecrets] = useState(false);
  const [values, setValues] = useState<Record<string, any>>(() =>
    Object.fromEntries(params.map((p) => [p.name, p.default ?? ""]))
  );
  const [pending, setPending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<RunnerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { url, headers, body } = useMemo(() => {
    const qsEntries = params
      .filter((p) => p.in === "query")
      .map((p) => [p.name, String(values[p.name] ?? "")]);
    const headerEntries = params
      .filter((p) => p.in === "header")
      .map((p) => [
        p.name,
        showSecrets || !p.secret
          ? String(values[p.name] ?? "")
          : "•••••••",
      ]);
    const bodyEntries = Object.fromEntries(
      params.filter((p) => p.in === "body").map((p) => [p.name, values[p.name]])
    );
    const qs = qsEntries.length
      ? "?" + new URLSearchParams(qsEntries as [string, string][]).toString()
      : "";
    return {
      url: `${baseUrl}${endpoint}${qs}`,
      headers: Object.fromEntries(headerEntries) as Record<string, string>,
      body: Object.keys(bodyEntries).length ? bodyEntries : undefined,
    };
  }, [params, values, baseUrl, endpoint, showSecrets]);

  const snippet = buildSnippet(lang, method, url, headers, body);

  const onRun = async () => {
    setPending(true);
    setError(null);
    setResult(null);
    setProgress(8);
    const tick = setInterval(
      () => setProgress((p) => Math.min(p + 6, 92)),
      120
    );
    try {
      // Reconstruct real headers (un-masked) for the actual call.
      const realHeaders = Object.fromEntries(
        params
          .filter((p) => p.in === "header")
          .map((p) => [p.name, String(values[p.name] ?? "")])
      );
      const res = await runner({ method, url, headers: realHeaders, body });
      setResult(res);
      setProgress(100);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      clearInterval(tick);
      setPending(false);
      setTimeout(() => setProgress(0), 600);
    }
  };

  return (
    <div className="not-prose my-5 rounded-card bg-bg-elevated overflow-hidden border border-border">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-11 bg-bg-card">
        <span className="inline-flex items-center h-[22px] px-2 rounded font-mono text-[10.5px] uppercase tracking-[0.1em] bg-bg text-text">
          {method}
        </span>
        <code className="font-mono text-[13px] text-text flex-1 truncate">
          {endpoint}
        </code>
        <button
          type="button"
          onClick={onRun}
          disabled={pending}
          className="btn-primary inline-flex items-center gap-1.5 h-8 px-3 text-[12.5px] disabled:opacity-60"
        >
          {pending ? <Square size={11} /> : <Play size={11} />}
          {pending ? "Running" : "Try it"}
        </button>
      </div>

      {/* Progress */}
      <div
        className="h-[2px] transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background:
            progress === 100
              ? "var(--color-status-ok)"
              : "var(--color-warm-solid)",
          opacity: pending || progress > 0 ? 1 : 0,
        }}
        aria-hidden
      />

      {/* Params */}
      {params.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-4 gap-y-2 px-4 py-4 border-b border-[color:var(--color-border-structural)]">
          {params.map((p) => (
            <div key={p.name} className="contents">
              <label className="flex flex-wrap items-baseline gap-2 pt-2">
                <span className="font-mono text-[12.5px] text-text">{p.name}</span>
                <span className="font-mono text-meta uppercase text-text-tertiary">
                  {p.in}
                </span>
                {p.required && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-status-err">
                    required
                  </span>
                )}
              </label>
              <input
                type={
                  p.secret && !showSecrets
                    ? "password"
                    : p.type === "number"
                      ? "number"
                      : "text"
                }
                value={values[p.name] ?? ""}
                onChange={(e) =>
                  setValues((v) => ({
                    ...v,
                    [p.name]:
                      p.type === "number"
                        ? Number(e.target.value)
                        : e.target.value,
                  }))
                }
                placeholder={p.description ?? ""}
                className="h-8 px-2.5 rounded bg-bg border border-border focus:border-border-hover outline-none text-[13px] font-mono text-text placeholder:text-text-tertiary"
              />
            </div>
          ))}
          {params.some((p) => p.secret) && (
            <>
              <div />
              <button
                type="button"
                onClick={() => setShowSecrets((v) => !v)}
                className="inline-flex items-center gap-1.5 h-7 px-2 self-start rounded font-mono text-meta uppercase text-text-tertiary hover:text-text hover:bg-bg-hover transition-colors w-fit"
              >
                {showSecrets ? <EyeOff size={11} /> : <Eye size={11} />}
                {showSecrets ? "Hide secrets" : "Show secrets in snippet"}
              </button>
            </>
          )}
        </div>
      )}

      {/* Snippet language tabs */}
      <div className="flex items-center justify-between border-b border-[color:var(--color-border-structural)]/60 px-4 py-2">
        <div
          role="tablist"
          aria-label="Snippet language"
          className="flex items-center gap-1"
        >
          {(["python", "node", "go", "curl"] as Lang[]).map((l) => (
            <button
              key={l}
              role="tab"
              aria-selected={lang === l}
              onClick={() => setLang(l)}
              className={`font-mono text-[11px] uppercase tracking-[0.12em] px-2 py-1 rounded transition-colors ${
                lang === l
                  ? "bg-bg-hover text-text"
                  : "text-text-tertiary hover:text-text"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <span className="font-mono text-meta uppercase text-text-tertiary">
          snippet
        </span>
      </div>
      <pre className="px-5 py-4 font-mono text-[12.5px] leading-relaxed text-text overflow-x-auto">
        <code>{snippet}</code>
      </pre>

      {/* Response */}
      {(result || error) && (
        <div className="border-t border-border">
          <div className="flex items-center justify-between px-4 h-10 bg-bg/40">
            <div className="flex items-center gap-2 font-mono text-[11.5px] text-text-tertiary uppercase tracking-[0.1em]">
              <span
                className={
                  result && result.status < 400
                    ? "text-status-ok"
                    : "text-status-err"
                }
              >
                {result ? result.status : "ERR"}
              </span>
              {result && <span>· {result.durationMs}ms</span>}
              {result && result.status < 400 && (
                <Check size={11} className="text-status-ok" />
              )}
            </div>
            <span className="font-mono text-meta uppercase text-text-tertiary">
              response
            </span>
          </div>
          <pre className="px-5 py-4 font-mono text-[12.5px] leading-relaxed text-text overflow-x-auto max-h-[320px]">
            <code>
              {error ? error : JSON.stringify(result!.body, null, 2)}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}
