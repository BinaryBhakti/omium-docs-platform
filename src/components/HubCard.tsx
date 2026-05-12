import { Link } from "react-router-dom";

type Props = {
  title: string;
  description?: string;
  to: string;
  icon: React.ComponentType<any>;
};

function isExternal(to: string) {
  return /^https?:\/\//.test(to) || to.startsWith("mailto:");
}

export function HubCard({ title, description, to, icon: Icon }: Props) {
  const external = isExternal(to);
  const Wrapper: any = external ? "a" : Link;
  const wrapperProps = external
    ? { href: to, target: "_blank", rel: "noreferrer" }
    : { to };

  return (
    <Wrapper
      {...wrapperProps}
      className="group card-surface relative flex flex-col h-[220px] no-underline overflow-hidden"
    >
      {/* Faint scan-sweep across the top edge on hover — borrowed from
          omium-web's scan-sweep-h pattern. */}
      <span className="scan-sweep" aria-hidden />
      {/* Icon zone — fixed height so the divider lands at the same vertical
          position on every card, independent of description length. */}
      <div className="h-[112px] px-5 pt-5 text-text-secondary group-hover:text-text transition-colors relative">
        <Icon size={22} strokeWidth={1.6} />
      </div>
      {/* Content zone — flex-1 absorbs any height variation. */}
      <div className="flex-1 px-5 py-4 border-t border-[color:var(--color-border-structural)]">
        <div className="text-[14.5px] font-semibold text-text tracking-[-0.01em]">
          {title}
        </div>
        {description && (
          <p className="mt-1.5 text-[12.5px] leading-[18px] text-text-secondary line-clamp-3">
            {description}
          </p>
        )}
      </div>
    </Wrapper>
  );
}

export function HubGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {children}
    </div>
  );
}
