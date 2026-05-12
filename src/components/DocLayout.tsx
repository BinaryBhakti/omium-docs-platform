import { Link } from "react-router-dom";
import { ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { PageFeedback } from "./PageFeedback";
import { ComplexityPill, EtaPill, BetaPill, type Complexity } from "./Pills";
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
  complexity?: Complexity;
  etaMinutes?: number;
  beta?: boolean;
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
  complexity,
  etaMinutes,
  beta,
}: Props) {
  return (
    <div className="flex gap-10 px-5 md:px-10 py-12 max-w-[1240px] mx-auto w-full">
      <article className="min-w-0 flex-1">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center flex-wrap gap-1 font-mono text-meta uppercase text-text-tertiary mb-4">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="inline-flex items-center">
                {b.to ? (
                  <Link to={b.to} className="hover:text-text transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-text-secondary">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <ChevronRight size={11} className="mx-1.5 text-text-quaternary" />
                )}
              </span>
            ))}
          </nav>
        )}

        {(eyebrow || complexity || etaMinutes || beta) && (
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {eyebrow && <span className="eyebrow-pill">{eyebrow}</span>}
            {complexity && <ComplexityPill level={complexity} />}
            {etaMinutes != null && <EtaPill minutes={etaMinutes} />}
            {beta && <BetaPill />}
          </div>
        )}

        <header className="mb-8 max-w-[720px]">
          <h1 className="text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-[-0.03em] font-medium text-text">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-[17px] leading-[28px] text-text-secondary">
              {description}
            </p>
          )}
          {meta && (
            <div className="mt-5 flex items-center gap-3 font-mono text-meta uppercase text-text-tertiary">
              {meta.updatedAt && <span>Updated {meta.updatedAt}</span>}
              {meta.readTime && (
                <>
                  <span className="h-1 w-1 rounded-full bg-text-quaternary" />
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
              <Link to={prev.to} className="group card-surface p-4 transition-colors">
                <div className="flex items-center gap-1.5 font-mono text-meta uppercase text-text-tertiary">
                  <ArrowLeft size={11} />
                  Previous
                </div>
                <div className="mt-1.5 text-[15px] text-text font-medium group-hover:opacity-90 transition-opacity">
                  {prev.label}
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link to={next.to} className="group card-surface p-4 transition-colors text-right">
                <div className="flex items-center justify-end gap-1.5 font-mono text-meta uppercase text-text-tertiary">
                  Next
                  <ArrowRight size={11} />
                </div>
                <div className="mt-1.5 text-[15px] text-text font-medium group-hover:opacity-90 transition-opacity">
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
