import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

type Props = {
  code: string;
  lang?: string;
  filename?: string;
  showLineNumbers?: boolean;
};

// Lightweight, deterministic token highlighter. Not a full parser — just enough
// to give the dark code blocks a Linear-like accent palette without bringing
// in a heavy syntax library.
function highlight(code: string, lang: string): React.ReactNode {
  if (lang === "json") return highlightJson(code);
  if (lang === "yaml" || lang === "yml") return highlightYaml(code);
  if (lang === "bash" || lang === "sh") return highlightBash(code);
  if (lang === "python" || lang === "py") return highlightGeneric(code, PY);
  if (lang === "ts" || lang === "tsx" || lang === "js" || lang === "jsx")
    return highlightGeneric(code, JS);
  return <>{code}</>;
}

const PY = {
  keywords: [
    "def", "return", "from", "import", "as", "if", "elif", "else", "for",
    "while", "in", "is", "not", "and", "or", "with", "class", "lambda",
    "try", "except", "finally", "raise", "yield", "pass", "True", "False", "None",
  ],
  builtins: ["print", "len", "range", "str", "int", "list", "dict", "set", "tuple"],
};
const JS = {
  keywords: [
    "const", "let", "var", "function", "return", "if", "else", "for", "while",
    "of", "in", "import", "from", "export", "default", "as", "new", "class",
    "extends", "this", "true", "false", "null", "undefined", "async", "await",
    "try", "catch", "finally", "throw", "type", "interface",
  ],
  builtins: ["console", "Math", "Object", "Array", "JSON", "Promise"],
};

function highlightGeneric(
  code: string,
  dict: { keywords: string[]; builtins: string[] }
): React.ReactNode {
  const tokens: React.ReactNode[] = [];
  // Strings, comments, numbers, identifiers
  const re =
    /(#[^\n]*|\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b|[^\s])/g;
  let m: RegExpExecArray | null;
  let last = 0;
  let i = 0;
  while ((m = re.exec(code))) {
    if (m.index > last) tokens.push(code.slice(last, m.index));
    const t = m[0];
    if (/^(#|\/\/|\/\*)/.test(t)) {
      tokens.push(<span key={i++} className="tok-comment">{t}</span>);
    } else if (/^["'`]/.test(t)) {
      tokens.push(<span key={i++} className="tok-string">{t}</span>);
    } else if (/^\d/.test(t)) {
      tokens.push(<span key={i++} className="tok-number">{t}</span>);
    } else if (/^[A-Za-z_]/.test(t)) {
      if (dict.keywords.includes(t)) {
        tokens.push(<span key={i++} className="tok-keyword">{t}</span>);
      } else if (dict.builtins.includes(t)) {
        tokens.push(<span key={i++} className="tok-builtin">{t}</span>);
      } else {
        tokens.push(<span key={i++}>{t}</span>);
      }
    } else {
      tokens.push(<span key={i++} className="tok-punc">{t}</span>);
    }
    last = m.index + t.length;
  }
  if (last < code.length) tokens.push(code.slice(last));
  return <>{tokens}</>;
}

function highlightBash(code: string): React.ReactNode {
  const lines = code.split("\n");
  return (
    <>
      {lines.map((line, idx) => {
        const isComment = /^\s*#/.test(line);
        if (isComment) {
          return (
            <span key={idx} className="tok-comment">
              {line}
              {idx < lines.length - 1 && "\n"}
            </span>
          );
        }
        // command (first word) accented
        const m = line.match(/^(\s*)(\S+)(\s.*)?$/);
        if (!m) return <span key={idx}>{line}{idx < lines.length - 1 && "\n"}</span>;
        const [, ws, cmd, rest = ""] = m;
        // also highlight quoted strings inside rest
        const restNodes: React.ReactNode[] = [];
        const re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|--?[A-Za-z-][A-Za-z0-9-]*|\$[A-Za-z_][A-Za-z0-9_]*)/g;
        let lastIdx = 0;
        let mm: RegExpExecArray | null;
        let k = 0;
        while ((mm = re.exec(rest))) {
          if (mm.index > lastIdx) restNodes.push(rest.slice(lastIdx, mm.index));
          const tk = mm[0];
          if (/^["']/.test(tk)) restNodes.push(<span key={k++} className="tok-string">{tk}</span>);
          else if (tk.startsWith("$")) restNodes.push(<span key={k++} className="tok-number">{tk}</span>);
          else restNodes.push(<span key={k++} className="tok-keyword">{tk}</span>);
          lastIdx = mm.index + tk.length;
        }
        if (lastIdx < rest.length) restNodes.push(rest.slice(lastIdx));
        return (
          <span key={idx}>
            {ws}
            <span className="tok-builtin">{cmd}</span>
            {restNodes}
            {idx < lines.length - 1 && "\n"}
          </span>
        );
      })}
    </>
  );
}

function highlightJson(code: string): React.ReactNode {
  const re = /("(?:[^"\\]|\\.)*"\s*:)|("(?:[^"\\]|\\.)*")|\b(true|false|null)\b|\b-?\d+(?:\.\d+)?\b|([{}\[\],])/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const t = m[0];
    if (m[1]) out.push(<span key={i++} className="tok-keyword">{t}</span>);
    else if (m[2]) out.push(<span key={i++} className="tok-string">{t}</span>);
    else if (m[3]) out.push(<span key={i++} className="tok-builtin">{t}</span>);
    else if (m[4]) out.push(<span key={i++} className="tok-punc">{t}</span>);
    else out.push(<span key={i++} className="tok-number">{t}</span>);
    last = m.index + t.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return <>{out}</>;
}

function highlightYaml(code: string): React.ReactNode {
  const lines = code.split("\n");
  return (
    <>
      {lines.map((line, idx) => {
        const cm = line.match(/^(\s*)([A-Za-z0-9_-]+)(\s*:)(.*)$/);
        if (cm) {
          const [, ws, key, colon, val] = cm;
          return (
            <span key={idx}>
              {ws}
              <span className="tok-keyword">{key}</span>
              <span className="tok-punc">{colon}</span>
              <span className="tok-string">{val}</span>
              {idx < lines.length - 1 && "\n"}
            </span>
          );
        }
        return <span key={idx}>{line}{idx < lines.length - 1 && "\n"}</span>;
      })}
    </>
  );
}

export function CodeBlock({ code, lang = "bash", filename, showLineNumbers = false }: Props) {
  const [copied, setCopied] = useState(false);
  const rendered = useMemo(() => highlight(code, lang), [code, lang]);
  const lines = useMemo(() => code.split("\n").length, [code]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {/* ignore */}
  };

  return (
    <div className="not-prose my-5 rounded-lg overflow-hidden border border-[color:var(--code-border)]"
      style={{ background: "var(--code-bg)" }}>
      <div className="flex items-center justify-between h-9 pl-3 pr-2 border-b border-[color:var(--code-border)]"
        style={{ background: "var(--code-surface)" }}>
        <div className="flex items-center gap-2 min-w-0 text-[color:var(--code-muted)]">
          <div className="flex gap-1 mr-1">
            <span className="h-2 w-2 rounded-full bg-[#3a3d42]" />
            <span className="h-2 w-2 rounded-full bg-[#3a3d42]" />
            <span className="h-2 w-2 rounded-full bg-[#3a3d42]" />
          </div>
          {filename ? (
            <span className="font-mono text-[12px] text-[color:var(--code-text)] truncate">
              {filename}
            </span>
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-wide">
              {lang}
            </span>
          )}
          {filename && (
            <span className="font-mono text-[10.5px] uppercase tracking-wide ml-1">
              · {lang}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 h-7 px-2 rounded-sm text-[11.5px] text-[color:var(--code-muted)] hover:text-[color:var(--code-text)] hover:bg-white/5 transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <pre className="px-4 py-3 text-[13.5px] font-mono leading-6"
          style={{ color: "var(--code-text)" }}>
          {showLineNumbers ? (
            <div className="grid grid-cols-[auto_1fr] gap-x-4">
              <div className="text-right text-[color:var(--code-muted)] select-none">
                {Array.from({ length: lines }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <code>{rendered}</code>
            </div>
          ) : (
            <code>{rendered}</code>
          )}
        </pre>
      </div>
    </div>
  );
}
