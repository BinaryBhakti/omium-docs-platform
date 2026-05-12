import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  X,
  ArrowUp,
  RotateCcw,
  ExternalLink,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  pageContext?: string;
};

type Message =
  | { role: "user"; content: string }
  | {
      role: "assistant";
      content: string;
      citations?: { label: string; anchor: string }[];
      pending?: boolean;
    };

const SUGGESTIONS = [
  "Summarize this page in 3 bullets",
  "Show me a Python example",
  "What does the policy engine evaluate first?",
  "How do I resume from a specific checkpoint?",
];

function mockAnswer(prompt: string, pageContext?: string): Message {
  const lower = prompt.toLowerCase();
  if (lower.includes("checkpoint") || lower.includes("resume")) {
    return {
      role: "assistant",
      content:
        "Resume a Workflow Run from its most recent checkpoint with `omium runs resume <run_id>`. To pin to a specific checkpoint by name, pass `--from <name>`. Recovery is at-least-once, so wrap side-effecting steps with an idempotency key.",
      citations: [
        { label: "Concepts → Recovery", anchor: "/docs/concepts#recovery" },
        { label: "SDK → Checkpoints", anchor: "/docs/sdk#checkpoints" },
      ],
    };
  }
  if (lower.includes("policy") || lower.includes("deny")) {
    return {
      role: "assistant",
      content:
        "The policy engine evaluates rules at every step boundary, deny-by-default. Tool, model, and budget rules are checked in that order; the first matching deny short-circuits and emits a `policy.violated` webhook.",
      citations: [
        { label: "Concepts → Policy engine", anchor: "/docs/concepts#policy" },
      ],
    };
  }
  if (lower.includes("summar")) {
    return {
      role: "assistant",
      content: pageContext?.includes("api-reference")
        ? "• Base URL: api.omium.ai/v1.  • Authenticate with a bearer Access Token.  • All mutating endpoints accept Idempotency-Key for safe retries."
        : "• Omium traces every Workflow Run as a tree of Spans.  • Checkpoints make long runs cheap to resume.  • Policies and Routes are configured per workspace.",
      citations: [{ label: "Fundamentals", anchor: "/docs/concepts" }],
    };
  }
  return {
    role: "assistant",
    content:
      "I can answer questions grounded in this page and its linked references. Try one of the suggestions above, or ask anything specific to the Workflow Run, Span, or Policy concepts.",
  };
}

export function AskAI({ open, onClose, pageContext }: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const ask = (prompt: string) => {
    if (!prompt.trim()) return;
    const userMsg: Message = { role: "user", content: prompt };
    const pending: Message = { role: "assistant", content: "", pending: true };
    setMessages((m) => [...m, userMsg, pending]);
    setInput("");

    setTimeout(() => {
      const answer = mockAnswer(prompt, pageContext);
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = answer;
        return copy;
      });
    }, 450);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  const reset = () => setMessages([]);

  return (
    <>
      {/* Scrim — strong dark to fully hide page content */}
      <div
        className={`fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />
      {/* Drawer — fully opaque solid surface */}
      <aside
        className={`fixed top-0 right-0 z-[61] flex flex-col h-screen w-full sm:w-[440px] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "var(--color-bg)",
          boxShadow: "-24px 0 60px -20px rgba(0,0,0,0.7)",
        }}
        role="dialog"
        aria-modal
        aria-label="Ask AI"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 bg-bg-elevated">
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles size={14} className="text-warm-solid shrink-0" />
            <span className="text-[14px] font-medium text-text">Ask AI</span>
            <span className="font-mono text-meta uppercase text-text-tertiary ml-1 truncate">
              page-aware
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={reset}
              aria-label="Reset conversation"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-tertiary hover:text-text hover:bg-bg-hover transition-colors"
            >
              <RotateCcw size={13} />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-tertiary hover:text-text hover:bg-bg-hover transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto px-4 py-5 bg-bg"
        >
          {messages.length === 0 ? (
            <div>
              <p className="text-[13.5px] text-text-secondary leading-relaxed">
                Ask anything about Omium. Answers are grounded in this page and
                the linked references. Citations link back to the source.
              </p>
              <div className="mt-6">
                <div className="font-mono text-meta uppercase text-text-tertiary mb-2">
                  Try
                </div>
                <div className="space-y-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => ask(s)}
                      className="group w-full text-left rounded-md bg-bg-elevated hover:bg-bg-hover px-3 py-2.5 text-[13px] text-text-secondary hover:text-text transition-colors flex items-center gap-2"
                    >
                      <span className="flex-1">{s}</span>
                      <ArrowUp
                        size={11}
                        className="rotate-45 text-text-quaternary group-hover:text-text-tertiary transition-colors"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <ul className="space-y-5">
              {messages.map((m, i) => (
                <li key={i}>
                  {m.role === "user" ? (
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl bg-bg-hover px-3.5 py-2 text-[13.5px] text-text">
                        {m.content}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Sparkles size={11} className="text-warm-solid" />
                        <span className="font-mono text-meta uppercase text-text-tertiary">
                          Omium AI
                        </span>
                      </div>
                      <div className="text-[13.5px] leading-[22px] text-text">
                        {m.pending ? <Thinking /> : m.content}
                      </div>
                      {m.citations && m.citations.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {m.citations.map((c) => (
                            <a
                              key={c.anchor}
                              href={c.anchor}
                              className="inline-flex items-center gap-1 rounded-md bg-bg-elevated hover:bg-bg-hover px-2 py-1 font-mono text-[11px] text-text-secondary hover:text-text transition-colors"
                            >
                              <ExternalLink size={9} />
                              {c.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={onSubmit}
          className="bg-bg-elevated p-3"
        >
          <div className="relative flex items-end gap-2 rounded-2xl bg-bg px-3 py-2.5 focus-within:bg-bg-elevated transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  ask(input);
                }
              }}
              rows={1}
              placeholder="Ask about this page…"
              className="flex-1 resize-none bg-transparent outline-none border-none text-[14px] text-text placeholder:text-text-tertiary max-h-[120px] leading-[22px]"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!input.trim()}
              className="btn-primary inline-flex h-8 w-8 items-center justify-center text-[12.5px] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowUp size={13} />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-text-tertiary">
            <span>⏎ send · ⇧⏎ newline · esc close</span>
            {pageContext && (
              <span className="truncate ml-3 max-w-[180px]">
                · {pageContext}
              </span>
            )}
          </div>
        </form>
      </aside>
    </>
  );
}

function Thinking() {
  return (
    <span className="inline-flex items-center gap-1 text-text-tertiary">
      <span className="h-1.5 w-1.5 rounded-full bg-text-secondary pulse-dot" />
      <span
        className="h-1.5 w-1.5 rounded-full bg-text-secondary pulse-dot"
        style={{ animationDelay: "0.15s" }}
      />
      <span
        className="h-1.5 w-1.5 rounded-full bg-text-secondary pulse-dot"
        style={{ animationDelay: "0.3s" }}
      />
    </span>
  );
}
