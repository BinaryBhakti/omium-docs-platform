import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Compass,
  Rocket,
  Terminal,
  Network,
  Layers,
  Plus,
  PanelLeft,
  Sparkles,
  X,
  CornerDownLeft,
} from "lucide-react";
import { navigation } from "../data/navigation";

type NavItem = {
  kind: "nav";
  label: string;
  to: string;
  section: string;
  icon: React.ComponentType<any>;
  shortcut: [string, string];
};
type ActionItem = {
  kind: "action";
  label: string;
  icon: React.ComponentType<any>;
  shortcut: [string, string];
  onRun: () => void;
};
type Item = NavItem | ActionItem;

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenAskAi?: () => void;
};

const sectionIcons: Record<string, React.ComponentType<any>> = {
  Overview: Compass,
  "Get started": Rocket,
  SDK: Terminal,
  "API reference": Network,
  "Platform concepts": Layers,
};

// Derive a stable two-letter shortcut for an item: first letter of section,
// first letter of item label. Purely visual — not wired to a global hotkey.
function shortcutFor(section: string, label: string): [string, string] {
  const a = (section.match(/[A-Za-z]/)?.[0] ?? "G").toUpperCase();
  const words = label.split(/\s+/);
  const b = (words[words.length === 1 ? 0 : 0].match(/[A-Za-z]/)?.[0] ?? "X").toUpperCase();
  return [a, b];
}

export function CommandPalette({ open, onClose, onOpenAskAi }: Props) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const navItems: Item[] = useMemo(() => {
    return navigation.flatMap((section) =>
      section.items.map<NavItem>((item) => ({
        kind: "nav",
        label: item.label,
        to: item.to,
        section: section.title,
        icon: sectionIcons[section.title] ?? Compass,
        shortcut: shortcutFor(section.title, item.label),
      }))
    );
  }, []);

  const actions: ActionItem[] = useMemo(
    () => [
      {
        kind: "action",
        label: "Ask AI about this page",
        icon: Sparkles,
        shortcut: ["⌘", "I"],
        onRun: () => {
          onClose();
          onOpenAskAi?.();
        },
      },
      {
        kind: "action",
        label: "Open GitHub repository",
        icon: Plus,
        shortcut: ["G", "H"],
        onRun: () => {
          window.open("https://github.com", "_blank", "noreferrer");
          onClose();
        },
      },
      {
        kind: "action",
        label: "Toggle sidebar",
        icon: PanelLeft,
        shortcut: ["⌘", "\\"],
        onRun: onClose,
      },
    ],
    [onClose, onOpenAskAi]
  );

  // Combine + filter
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = (it: Item) => {
      if (!q) return true;
      const fields =
        it.kind === "nav"
          ? `${it.label} ${it.section}`
          : it.label;
      return fields.toLowerCase().includes(q);
    };
    return {
      nav: navItems.filter(matches) as NavItem[],
      actions: actions.filter(matches) as ActionItem[],
    };
  }, [navItems, actions, query]);

  const flat: Item[] = useMemo(
    () => [...filtered.nav, ...filtered.actions],
    [filtered]
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, flat.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter") {
        const target = flat[active];
        if (!target) return;
        if (target.kind === "nav") {
          navigate(target.to);
          onClose();
        } else {
          target.onRun();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, flat, active, onClose, navigate]);

  if (!open) return null;

  let flatIdx = -1;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-[660px] rounded-2xl bg-bg-elevated overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.06) inset, 0 30px 80px -20px rgba(0,0,0,0.85)",
        }}
      >
        {/* Search row */}
        <div className="flex items-center gap-3 px-4 h-14">
          <Search size={15} className="text-text-tertiary shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent text-[15px] text-text placeholder:text-text-tertiary outline-none border-none"
          />
          <div className="flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded text-text-tertiary hover:text-text hover:bg-bg-hover"
          >
            <X size={13} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[58vh] overflow-y-auto pb-2">
          {flat.length === 0 ? (
            <div className="px-4 py-12 text-center text-[13px] text-text-tertiary">
              No results for{" "}
              <span className="text-text font-mono">"{query}"</span>
            </div>
          ) : (
            <>
              {filtered.nav.length > 0 && (
                <Section title="Navigate">
                  {filtered.nav.map((it) => {
                    flatIdx++;
                    const isActive = flatIdx === active;
                    return (
                      <Row
                        key={`nav-${it.to}-${it.label}`}
                        item={it}
                        isActive={isActive}
                        onHover={(idx) => setActive(idx)}
                        idx={flatIdx}
                        renderAs={(content) => (
                          <Link
                            to={it.to}
                            onClick={onClose}
                            className="block"
                          >
                            {content}
                          </Link>
                        )}
                      />
                    );
                  })}
                </Section>
              )}

              {filtered.actions.length > 0 && (
                <Section title="Actions">
                  {filtered.actions.map((it) => {
                    flatIdx++;
                    const isActive = flatIdx === active;
                    return (
                      <Row
                        key={`act-${it.label}`}
                        item={it}
                        isActive={isActive}
                        onHover={(idx) => setActive(idx)}
                        idx={flatIdx}
                        renderAs={(content) => (
                          <button
                            type="button"
                            onClick={it.onRun}
                            className="block w-full text-left"
                          >
                            {content}
                          </button>
                        )}
                      />
                    );
                  })}
                </Section>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between h-11 px-4 bg-bg-card text-[12px] text-text-tertiary">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              <span>navigate</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Kbd>
                <CornerDownLeft size={9} />
              </Kbd>
              <span>open</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Kbd>esc</Kbd>
              <span>close</span>
            </span>
          </div>
          <span className="font-mono text-[11px] text-text-tertiary">
            v1.0 · omium
          </span>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-2 pt-3">
      <div className="px-3 pb-1.5 text-[12px] text-text-tertiary">{title}</div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function Row({
  item,
  isActive,
  onHover,
  idx,
  renderAs,
}: {
  item: Item;
  isActive: boolean;
  onHover: (i: number) => void;
  idx: number;
  renderAs: (content: React.ReactNode) => React.ReactNode;
}) {
  const Icon = item.icon;
  return (
    <div onMouseEnter={() => onHover(idx)}>
      {renderAs(
        <div
          className={`group flex items-center gap-3 h-11 px-2 rounded-md transition-colors ${
            isActive ? "bg-bg-hover" : "hover:bg-bg-hover/60"
          }`}
        >
          <span
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
              isActive ? "bg-bg-elevated" : "bg-bg-card"
            }`}
          >
            <Icon size={14} className="text-text" />
          </span>
          <span
            className={`flex-1 truncate text-[14px] ${
              isActive ? "text-text" : "text-text-secondary"
            }`}
          >
            {item.label}
          </span>
          <span className="flex items-center gap-1">
            <Kbd>{item.shortcut[0]}</Kbd>
            <Kbd>{item.shortcut[1]}</Kbd>
          </span>
        </div>
      )}
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded bg-bg-card text-[10.5px] font-mono text-text-tertiary leading-none">
      {children}
    </kbd>
  );
}
