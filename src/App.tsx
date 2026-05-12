import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { CommandPalette } from "./components/CommandPalette";
import { AskAI } from "./components/AskAI";

import { Home } from "./pages/Home";

import { GettingStartedInstallation } from "./pages/docs/GettingStartedInstallation";
import { GettingStartedConfigure } from "./pages/docs/GettingStartedConfigure";
import { GettingStartedQuickstart } from "./pages/docs/GettingStartedQuickstart";
import { GettingStartedFirstProject } from "./pages/docs/GettingStartedFirstProject";

import { BuildOverview } from "./pages/docs/BuildOverview";
import { BuildLangGraph } from "./pages/docs/BuildLangGraph";
import { BuildCrewAI } from "./pages/docs/BuildCrewAI";

import { ApiOverview } from "./pages/docs/ApiOverview";
import { ApiErrors } from "./pages/docs/ApiErrors";
import { ApiExecutions } from "./pages/docs/ApiExecutions";
import { ApiCheckpoints } from "./pages/docs/ApiCheckpoints";
import { ApiWorkflows } from "./pages/docs/ApiWorkflows";
import { ApiFailures } from "./pages/docs/ApiFailures";
import { ApiBilling } from "./pages/docs/ApiBilling";

import { SdkPython } from "./pages/docs/SdkPython";
import { SdkCli } from "./pages/docs/SdkCli";

import { ConfigOmiumToml } from "./pages/docs/ConfigOmiumToml";
import { ConfigEnvironment } from "./pages/docs/ConfigEnvironment";

import { PlatformAutomations } from "./pages/docs/PlatformAutomations";
import { PlatformApiKeysBilling } from "./pages/docs/PlatformApiKeysBilling";

import { ResourcesExamples } from "./pages/docs/ResourcesExamples";
import { ResourcesReleaseNotes } from "./pages/docs/ResourcesReleaseNotes";
import { ResourcesFaq } from "./pages/docs/ResourcesFaq";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [askAiOpen, setAskAiOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const meta = e.metaKey || e.ctrlKey;
      if (meta && k === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (meta && k === "i") {
        e.preventDefault();
        setAskAiOpen((v) => !v);
      } else if (
        e.key === "/" &&
        !paletteOpen &&
        !askAiOpen &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, askAiOpen]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(
          () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
          60
        );
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <TopBar
        onMenuClick={() => setMobileOpen(true)}
        onSearchClick={() => setPaletteOpen(true)}
        onAskAiClick={() => setAskAiOpen(true)}
      />
      <div className="flex flex-1 min-h-0">
        <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="flex-1 min-w-0">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/docs/getting-started/installation"
              element={<GettingStartedInstallation />}
            />
            <Route
              path="/docs/getting-started/configure"
              element={<GettingStartedConfigure />}
            />
            <Route
              path="/docs/getting-started/quickstart"
              element={<GettingStartedQuickstart />}
            />
            <Route
              path="/docs/getting-started/first-project"
              element={<GettingStartedFirstProject />}
            />

            <Route
              path="/docs/build-with-omium/overview"
              element={<BuildOverview />}
            />
            <Route
              path="/docs/build-with-omium/langgraph"
              element={<BuildLangGraph />}
            />
            <Route
              path="/docs/build-with-omium/crewai"
              element={<BuildCrewAI />}
            />

            <Route path="/docs/api/overview" element={<ApiOverview />} />
            <Route
              path="/docs/api/errors-and-rate-limits"
              element={<ApiErrors />}
            />
            <Route path="/docs/api/executions" element={<ApiExecutions />} />
            <Route path="/docs/api/checkpoints" element={<ApiCheckpoints />} />
            <Route path="/docs/api/workflows" element={<ApiWorkflows />} />
            <Route path="/docs/api/failures" element={<ApiFailures />} />
            <Route path="/docs/api/billing" element={<ApiBilling />} />

            <Route path="/docs/sdk/python-sdk" element={<SdkPython />} />
            <Route path="/docs/sdk/cli" element={<SdkCli />} />

            <Route
              path="/docs/configuration/omium-toml"
              element={<ConfigOmiumToml />}
            />
            <Route
              path="/docs/configuration/environment"
              element={<ConfigEnvironment />}
            />

            <Route
              path="/docs/platform/automations"
              element={<PlatformAutomations />}
            />
            <Route
              path="/docs/platform/api-keys-billing"
              element={<PlatformApiKeysBilling />}
            />

            <Route
              path="/docs/resources/examples"
              element={<ResourcesExamples />}
            />
            <Route
              path="/docs/resources/release-notes"
              element={<ResourcesReleaseNotes />}
            />
            <Route path="/docs/resources/faq" element={<ResourcesFaq />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenAskAi={() => setAskAiOpen(true)}
      />
      <AskAI
        open={askAiOpen}
        onClose={() => setAskAiOpen(false)}
        pageContext={location.pathname}
      />
    </div>
  );
}
