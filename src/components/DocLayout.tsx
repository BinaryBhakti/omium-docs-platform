import { Link } from "react-router-dom";
import { ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { PageFeedback } from "./PageFeedback";
import type { TocItem } from "../data/docs";

type Crumb = { label: string; to?: string };

type Props = {
  breadcrumbs?: Crumb[];
  title: string;
  eyebrow?: string;
  description?: string;
  toc?: TocItem[];
  children: React.ReactNode;
  prev?: { label: string; to: string };
  next?: { label: string; to: string };
  meta?: { updatedAt?: string; readTime?: string };
};

export function DocLayout({
  breadcrumbs = [],
  title,
  eyebrow,
  description,
  toc = [],
  children,
  prev,
  next,
  meta,
}: Props) {
  return (
    <div className="flex gap-10 px-5 md:px-10 py-12 max-w-[1240px] mx-auto w-full">
      <article className="min-w-0 flex-1">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center flex-wrap text-[11px] uppercase tracking-[0.18em] font-medium text-white/40 mb-4">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="inline-flex items-center">
                {b.to ? (
                  <Link to={b.to} className="hover:text-copper transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-white/75">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <ChevronRight size={11} className="mx-1.5 text-white/25" />
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <div className="text-[10px] uppercase tracking-[0.25em] font-medium text-copper mb-3">
            {eyebrow}
          </div>
        )}

        <header className="mb-8 max-w-[720px]">
          <h1 className="text-[40px] sm:text-[44px] leading-[1.05] tracking-[-0.035em] font-extrabold text-white">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-[16.5px] leading-[26px] text-white/60">
              {description}
            </p>
          )}
          {meta && (
            <div className="mt-5 flex items-center gap-3 text-[10.5px] uppercase tracking-[0.18em] text-white/35 font-mono">
              {meta.updatedAt && <span>Updated {meta.updatedAt}</span>}
              {meta.readTime && (
                <>
                  <span className="h-1 w-1 rounded-full bg-white/25" />
                  <span>{meta.readTime} read</span>
                </>
              )}
            </div>
          )}
        </header>

        <div className="prose-omium max-w-[720px]">{children}</div>

        <PageFeedback />

        {(prev || next) && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[720px]">
            {prev ? (
              <Link
                to={prev.to}
                className="group glass-card p-4 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/45 font-medium">
                  <ArrowLeft size={11} />
                  Previous
                </div>
                <div className="mt-1.5 text-[15px] text-white font-medium group-hover:text-copper transition-colors">
                  {prev.label}
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                to={next.to}
                className="group glass-card p-4 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/45 font-medium">
                  Next
                  <ArrowRight size={11} />
                </div>
                <div className="mt-1.5 text-[15px] text-white font-medium group-hover:text-copper transition-colors">
                  {next.label}
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}
      </article>

      <TableOfContents items={toc} />
    </div>
  );
}
