import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

type Props = {
  title: string;
  description?: string;
  to: string;
  icon?: React.ComponentType<any>;
};

function isExternal(to: string) {
  return /^https?:\/\//.test(to) || to.startsWith("mailto:");
}

export function DocCard({ title, description, to, icon: Icon }: Props) {
  const external = isExternal(to);
  const Wrapper: any = external ? "a" : Link;
  const wrapperProps = external
    ? { href: to, target: "_blank", rel: "noreferrer" }
    : { to };

  return (
    <Wrapper
      {...wrapperProps}
      className="group card-surface px-5 py-4 block no-underline"
    >
      <div className="flex items-center gap-2.5">
        {Icon && (
          <div className="h-7 w-7 rounded-md bg-bg flex items-center justify-center">
            <Icon size={13} className="text-text" />
          </div>
        )}
        <span className="text-[14px] font-medium text-text">{title}</span>
        <ArrowUpRight
          size={12}
          className="ml-auto text-text-tertiary group-hover:text-text transition-colors"
        />
      </div>
      {description && (
        <p className="mt-2 text-[13px] leading-[20px] text-text-secondary">
          {description}
        </p>
      )}
    </Wrapper>
  );
}

export function DocCardGrid({
  cols = 2,
  children,
}: {
  cols?: 1 | 2;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`not-prose my-5 grid gap-x-3 gap-y-6 ${
        cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
      }`}
    >
      {children}
    </div>
  );
}
