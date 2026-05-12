import { Link } from "react-router-dom";

type Props = {
  height?: number;
  withDocsBadge?: boolean;
  variant?: "wordmark" | "mark";
};

export function Logo({
  height = 26,
  withDocsBadge = true,
  variant = "wordmark",
}: Props) {
  const src =
    variant === "mark" ? "/logos/mark.svg" : "/logos/wordmark.svg";
  const w =
    variant === "mark" ? height : Math.round(height * (228 / 78));

  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
      aria-label="Omium docs home"
    >
      <img
        src={src}
        alt="Omium"
        width={w}
        height={height}
        className="block"
        style={{ height, width: w }}
      />
      {withDocsBadge && variant === "wordmark" && (
        <>
          <span
            className="text-text-quaternary text-[14px] leading-none select-none"
            aria-hidden
          >
            /
          </span>
          <span className="text-[14px] font-medium text-text-secondary tracking-tight">
            docs
          </span>
        </>
      )}
    </Link>
  );
}
