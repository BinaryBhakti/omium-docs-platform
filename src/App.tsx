import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { CommandPalette } from "./components/CommandPalette";
import { Home } from "./pages/Home";
import { GetStarted } from "./pages/GetStarted";
import { SDK } from "./pages/SDK";
import { ApiReference } from "./pages/ApiReference";
import { Concepts } from "./pages/Concepts";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const location = useLocation();

  // Cmd/Ctrl+K to open palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (e.key === "/" && !paletteOpen && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen]);

  // Smooth-scroll to hash on route change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <TopBar
        onMenuClick={() => setMobileOpen(true)}
        onSearchClick={() => setPaletteOpen(true)}
      />
      <div className="flex flex-1 min-h-0">
        <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="flex-1 min-w-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs/get-started" element={<GetStarted />} />
            <Route path="/docs/sdk" element={<SDK />} />
            <Route path="/docs/api-reference" element={<ApiReference />} />
            <Route path="/docs/concepts" element={<Concepts />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
