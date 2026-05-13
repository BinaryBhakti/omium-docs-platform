import { Link } from "react-router-dom";

type Props = {
  height?: number;
  withDocsBadge?: boolean;
  variant?: "wordmark" | "mark";
};

export function Logo({
  height = 26,
  withDocsBadge = true,
  variant = "mark",
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
      {withDocsBadge && (
        <>
          <span
            aria-hidden
            className="inline-block w-px bg-[color:var(--color-border-structural)]"
            style={{ height: Math.round(height * 0.65) }}
          />
          <span
            className="text-[14px] font-medium text-text-secondary tracking-tight leading-none"
            style={{ transform: "translateY(-0.5px)" }}
          >
            Docs
          </span>
        </>
      )}
    </Link>
  );
}
