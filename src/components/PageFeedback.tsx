import { useState } from "react";
import { ThumbsUp, ThumbsDown, Github, MessageSquare } from "lucide-react";

export function PageFeedback() {
  const [vote, setVote] = useState<null | "up" | "down">(null);

  return (
    <div className="not-prose mt-20 pt-8 max-w-[720px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-meta uppercase text-text-tertiary">
            Was this helpful?
          </span>
          <div className="inline-flex rounded-pill bg-bg-elevated overflow-hidden">
            <button
              type="button"
              onClick={() => setVote("up")}
              aria-pressed={vote === "up"}
              className={`inline-flex items-center gap-1.5 h-8 px-3 text-[12px] transition-colors
                ${vote === "up"
                  ? "bg-bg-hover text-text"
                  : "text-text-secondary hover:text-text hover:bg-bg-hover"}`}
            >
              <ThumbsUp size={11} />
              Yes
            </button>
            <span className="w-px bg-bg" />
            <button
              type="button"
              onClick={() => setVote("down")}
              aria-pressed={vote === "down"}
              className={`inline-flex items-center gap-1.5 h-8 px-3 text-[12px] transition-colors
                ${vote === "down"
                  ? "bg-bg-hover text-text"
                  : "text-text-secondary hover:text-text hover:bg-bg-hover"}`}
            >
              <ThumbsDown size={11} />
              No
            </button>
          </div>
          {vote && (
            <span className="font-mono text-meta uppercase text-text-tertiary">
              Thanks
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-[12.5px]">
          <a className="inline-flex items-center gap-1.5 text-text-tertiary hover:text-text cursor-pointer transition-colors">
            <Github size={11} />
            Edit on GitHub
          </a>
          <a className="inline-flex items-center gap-1.5 text-text-tertiary hover:text-text cursor-pointer transition-colors">
            <MessageSquare size={11} />
            Community
          </a>
        </div>
      </div>
    </div>
  );
}
