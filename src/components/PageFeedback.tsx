import { useState } from "react";
import { ThumbsUp, ThumbsDown, Github, MessageSquare } from "lucide-react";

export function PageFeedback() {
  const [vote, setVote] = useState<null | "up" | "down">(null);

  return (
    <div className="not-prose mt-16 pt-7 border-t border-hairline max-w-[720px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[12px] uppercase tracking-[0.18em] font-medium text-white/55">
            Was this helpful?
          </span>
          <div className="inline-flex rounded-full border border-hairline bg-white/[0.02] overflow-hidden">
            <button
              type="button"
              onClick={() => setVote("up")}
              aria-pressed={vote === "up"}
              className={`inline-flex items-center gap-1.5 h-8 px-3 text-[11px] uppercase tracking-[0.15em] transition-colors
                ${vote === "up"
                  ? "bg-copper text-black"
                  : "text-white/55 hover:text-white hover:bg-white/[0.04]"}`}
            >
              <ThumbsUp size={11} />
              Yes
            </button>
            <span className="w-px bg-hairline" />
            <button
              type="button"
              onClick={() => setVote("down")}
              aria-pressed={vote === "down"}
              className={`inline-flex items-center gap-1.5 h-8 px-3 text-[11px] uppercase tracking-[0.15em] transition-colors
                ${vote === "down"
                  ? "bg-white/15 text-white"
                  : "text-white/55 hover:text-white hover:bg-white/[0.04]"}`}
            >
              <ThumbsDown size={11} />
              No
            </button>
          </div>
          {vote && (
            <span className="text-[11.5px] text-copper font-mono">
              Thanks for the feedback.
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-[11.5px] uppercase tracking-[0.15em]">
          <a className="inline-flex items-center gap-1.5 text-white/45 hover:text-copper cursor-pointer transition-colors link-underline">
            <Github size={11} />
            Edit on GitHub
          </a>
          <a className="inline-flex items-center gap-1.5 text-white/45 hover:text-copper cursor-pointer transition-colors link-underline">
            <MessageSquare size={11} />
            Community
          </a>
        </div>
      </div>
    </div>
  );
}
