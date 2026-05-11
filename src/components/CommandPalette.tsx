import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  CornerDownLeft,
  Hash,
  FileText,
  Rocket,
  Terminal,
  Network,
  Layers,
  X,
} from "lucide-react";
import { navigation } from "../data/navigation";

type Item = {
  label: string;
  to: string;
  group: string;
  icon: React.ComponentType<any>;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

const groupIcons: Record<string, React.ComponentType<any>> = {
  Overview: FileText,
  "Get started": Rocket,
  SDK: Terminal,
  "API reference": Network,
  "Platform concepts": Layers,
};

export function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(() => {
    return navigation.flatMap((section) =>
      section.items.map((item) => ({
        label: item.label,
        to: item.to,
        group: section.title,
        icon: item.to.includes("#") ? Hash : groupIcons[section.title] ?? FileText,
      }))
    );
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q)
    );
  }, [items, query]);

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
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter") {
        const target = filtered[active];
        if (target) {
          navigate(target.to);
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose, navigate]);

  // Group by section for display
  const grouped = useMemo(() => {
    const m = new Map<string, Item[]>();
    filtered.forEach((it) => {
      if (!m.has(it.group)) m.set(it.group, []);
      m.get(it.group)!.push(it);
    });
    return Array.from(m.entries());
  }, [filtered]);

  if (!open) return null;

  let flatIdx = -1;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] px-4 bg-text/35 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal
    >
      <div
        className="w-full max-w-[620px] rounded-xl border border-border-subtle bg-surface overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0 0 0 1px rgba(8,9,10,0.04)" }}
      >
        <div className="flex items-center gap-2 px-3 h-12 border-b border-border-subtle">
          <Search size={15} className="text-text-muted shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Search documentation, concepts, endpoints…"
            className="flex-1 bg-transparent text-[14px] text-text placeholder:text-text-muted outline-none border-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-text-muted hover:text-text hover:bg-[color:var(--color-hover)]"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-10 text-center text-[13px] text-text-muted">
              No results for <span className="text-text">"{query}"</span>
            </div>
          ) : (
            grouped.map(([group, list]) => (
              <div key={group} className="px-1 pb-1">
                <div className="px-3 pt-2 pb-1 text-[10.5px] uppercase tracking-[0.1em] font-medium text-text-muted">
                  {group}
                </div>
                {list.map((it) => {
                  flatIdx++;
                  const isActive = flatIdx === active;
                  const Icon = it.icon;
                  return (
                    <Link
                      key={it.to + it.label}
                      to={it.to}
                      onClick={onClose}
                      onMouseEnter={() => setActive(flatIdx)}
                      className={`flex items-center gap-2.5 mx-1 px-2 h-8 rounded-md text-[13px] transition-colors
                        ${isActive
                          ? "bg-[color:var(--color-active)] text-text"
                          : "text-text-secondary hover:bg-[color:var(--color-hover)]"
                        }`}
                    >
                      <Icon size={13} className={isActive ? "text-text" : "text-text-muted"} />
                      <span className="flex-1 truncate">{it.label}</span>
                      {isActive && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-text-muted">
                          <CornerDownLeft size={11} />
                          Enter
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between h-9 px-3 border-t border-border-subtle bg-bg text-[11px] text-text-muted">
          <div className="flex items-center gap-3">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <span>Navigate</span>
            <Kbd>↵</Kbd>
            <span>Open</span>
            <Kbd>Esc</Kbd>
            <span>Close</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span>Omium Docs</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="font-mono text-[10.5px] leading-none rounded-sm border border-border-subtle bg-surface px-1.5 py-1 text-text-muted">
      {children}
    </kbd>
  );
}
