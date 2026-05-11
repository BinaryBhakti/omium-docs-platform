# Omium Docs Platform

A standalone documentation platform for Omium, built with Vite + React + TypeScript + Tailwind CSS. The visual language is inspired by Linear's docs (calm, minimal, precise) but uses Omium's own design tokens.

## Tech stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3 (with CSS variables for the Omium design tokens)
- React Router v6
- Lucide icons

## Getting started

```bash
npm install
npm run dev
```

The dev server starts on http://localhost:5180.

## Scripts

| Script              | Purpose                          |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start the Vite dev server        |
| `npm run build`     | Type-check and produce a build   |
| `npm run preview`   | Preview the production build     |
| `npm run typecheck` | Type-check without emitting      |

## Project layout

```
src/
  components/   # Sidebar, TopBar, DocLayout, CodeBlock, TOC, MethodBadge, Logo
  pages/        # Home, GetStarted, SDK, ApiReference, Concepts
  data/         # Static navigation and doc content
  styles/       # Global CSS, design tokens, prose styling
```

## Design tokens

Defined as CSS custom properties in `src/styles/globals.css` and surfaced to Tailwind via `tailwind.config.js`. Colors, type scale, spacing scale, and radii all come from the Omium design system.

## Routes

- `/` — Documentation home
- `/docs/get-started`
- `/docs/sdk`
- `/docs/api-reference`
- `/docs/concepts`

## Notes

- No external API calls; all docs content is static.
- Code blocks use `navigator.clipboard` for copy-to-clipboard.
- The right-side table of contents uses `IntersectionObserver` to highlight the active heading.
