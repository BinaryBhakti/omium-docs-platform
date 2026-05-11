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
    <div className="flex gap-10 px-5 md:px-10 py-10 max-w-[1240px] mx-auto w-full">
      <article className="min-w-0 flex-1">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center flex-wrap text-[12px] text-text-muted mb-3">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="inline-flex items-center">
                {b.to ? (
                  <Link to={b.to} className="hover:text-text">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-text">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <ChevronRight size={11} className="mx-1 text-text-muted" />
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <div className="text-[11px] uppercase tracking-[0.1em] font-medium text-text-muted mb-2">
            {eyebrow}
          </div>
        )}

        <header className="mb-7 max-w-[720px]">
          <h1 className="text-[34px] leading-[40px] tracking-[-0.025em] font-semibold text-text">
            {title}
          </h1>
          {description && (
            <p className="mt-3 text-[16px] leading-[26px] text-text-secondary">
              {description}
            </p>
          )}
          {meta && (
            <div className="mt-4 flex items-center gap-3 text-[12px] text-text-muted">
              {meta.updatedAt && <span>Updated {meta.updatedAt}</span>}
              {meta.readTime && (
                <>
                  <span className="h-1 w-1 rounded-full bg-text-muted/60" />
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
                className="group rounded-lg border border-border-subtle bg-surface hover:border-border-strong p-3 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-text-muted">
                  <ArrowLeft size={11} />
                  Previous
                </div>
                <div className="mt-1 text-[14px] text-text font-medium group-hover:underline">
                  {prev.label}
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                to={next.to}
                className="group rounded-lg border border-border-subtle bg-surface hover:border-border-strong p-3 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1.5 text-[11px] uppercase tracking-[0.08em] text-text-muted">
                  Next
                  <ArrowRight size={11} />
                </div>
                <div className="mt-1 text-[14px] text-text font-medium group-hover:underline">
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
