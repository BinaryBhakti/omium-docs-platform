import { Link } from "react-router-dom";

export function Logo({ withWordmark = true }: { withWordmark?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 group" aria-label="Omium docs home">
      <span className="relative inline-flex h-[22px] w-[22px] items-center justify-center rounded-md bg-text overflow-hidden">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <defs>
            <linearGradient id="ologo" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f79ce0" />
              <stop offset="55%" stopColor="#f7bf8b" />
              <stop offset="100%" stopColor="#ffdf9f" />
            </linearGradient>
          </defs>
          <path
            d="M7.2 9.2C7.2 8.0 8.2 7 9.4 7h.5c1.2 0 2.2 1 2.2 2.2v5.6c0 1.2 1 2.2 2.2 2.2h.5c1.2 0 2.2-1 2.2-2.2"
            stroke="url(#ologo)"
            strokeWidth="1.7"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </span>
      {withWordmark && (
        <>
          <span className="text-[14.5px] font-semibold tracking-[-0.01em] text-text">
            Omium
          </span>
          <span className="text-[11.5px] font-medium text-text-secondary translate-y-[0.5px]">
            Docs
          </span>
        </>
      )}
    </Link>
  );
}
