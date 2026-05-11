import { useState } from "react";
import { ThumbsUp, ThumbsDown, Github, MessageSquare } from "lucide-react";

export function PageFeedback() {
  const [vote, setVote] = useState<null | "up" | "down">(null);

  return (
    <div className="not-prose mt-14 pt-6 border-t border-border-subtle max-w-[720px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-text-secondary">
            Was this page helpful?
          </span>
          <div className="inline-flex rounded-md border border-border-subtle bg-surface overflow-hidden">
            <button
              type="button"
              onClick={() => setVote("up")}
              aria-pressed={vote === "up"}
              className={`inline-flex items-center gap-1.5 h-7 px-2.5 text-[12.5px] transition-colors
                ${vote === "up"
                  ? "bg-accent-yellow text-text"
                  : "text-text-secondary hover:text-text hover:bg-[color:var(--color-hover)]"}`}
            >
              <ThumbsUp size={12} />
              Yes
            </button>
            <span className="w-px bg-border-subtle" />
            <button
              type="button"
              onClick={() => setVote("down")}
              aria-pressed={vote === "down"}
              className={`inline-flex items-center gap-1.5 h-7 px-2.5 text-[12.5px] transition-colors
                ${vote === "down"
                  ? "bg-accent-pink/70 text-text"
                  : "text-text-secondary hover:text-text hover:bg-[color:var(--color-hover)]"}`}
            >
              <ThumbsDown size={12} />
              No
            </button>
          </div>
          {vote && (
            <span className="text-[12px] text-text-muted">Thanks for the feedback.</span>
          )}
        </div>

        <div className="flex items-center gap-3 text-[12.5px]">
          <a className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text cursor-pointer">
            <Github size={12} />
            Edit on GitHub
          </a>
          <span className="text-text-muted">·</span>
          <a className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text cursor-pointer">
            <MessageSquare size={12} />
            Ask in community
          </a>
        </div>
      </div>
    </div>
  );
}
