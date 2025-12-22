"use client";

import { useMemo, useRef, useState } from "react";
import type { GlobeMethods } from "react-globe.gl";

import { AboutCard } from "@/client/portfolio/components/AboutCard";
import { ExperienceSection } from "@/client/portfolio/components/ExperienceSection";
import { Footer } from "@/client/portfolio/components/Footer";
import { GlobeCard } from "@/client/portfolio/components/GlobeCard";
import { Navbar } from "@/client/portfolio/components/Navbar";
import { PerfectCircleGameCard } from "@/client/portfolio/components/PerfectCircleGameCard";
import { aboutData, workExperience } from "@/client/portfolio/data";
import { useActiveProjectOnScroll } from "@/client/portfolio/hooks/useActiveProjectOnScroll";
import { usePortfolioPreferencesStore } from "@/client/portfolio/store/usePortfolioPreferencesStore";
import { themeClasses } from "@/client/portfolio/theme";
import type { ActiveProject } from "@/client/portfolio/types";
import { buildWorkCityLabels } from "@/client/portfolio/utils/buildWorkCityLabels";

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<ActiveProject>(null);

  const locale = usePortfolioPreferencesStore((state) => state.locale);
  const setLocale = usePortfolioPreferencesStore((state) => state.setLocale);
  const setTheme = usePortfolioPreferencesStore((state) => state.setTheme);
  const theme = usePortfolioPreferencesStore((state) => state.theme);

  const globeEl = useRef<GlobeMethods | null>(null);
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useActiveProjectOnScroll({ projectRefs, setActiveProject, workExperience });

  const labels = useMemo(() => buildWorkCityLabels(workExperience), []);

  const activateProject = (lat: number, lng: number) => {
    setActiveProject({ lat, lng });
  };

  return (
    <div
      className={`min-h-screen overflow-x-clip ${themeClasses[theme]} transition-colors duration-300`}
    >
      <Navbar
        locale={locale}
        name={aboutData.name}
        setLocale={setLocale}
        setTheme={setTheme}
        theme={theme}
      />

      <main
        className="max-w-7xl mx-auto px-6 pt-28 pb-12 overflow-x-clip"
        id="main-content"
      >
        <section aria-labelledby="about-heading" className="mb-12">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 min-w-0 ">
              <AboutCard about={aboutData} locale={locale} theme={theme} />
            </div>

            <div className="lg:col-span-5 min-w-0">
              <PerfectCircleGameCard
                className="w-full min-w-0 lg:h-140"
                locale={locale}
                theme={theme}
              />
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28 lg:self-start min-w-0">
            <GlobeCard
              activeProject={activeProject}
              globeEl={globeEl}
              labels={labels}
              locale={locale}
              onActivateLocation={activateProject}
              theme={theme}
            />
          </div>

          <div className="lg:col-span-8 min-w-0">
            <ExperienceSection
              locale={locale}
              onActivateProject={activateProject}
              projectRefs={projectRefs}
              theme={theme}
              workExperience={workExperience}
            />
          </div>
        </div>
      </main>

      <Footer locale={locale} name="Marcin Wydra" theme={theme} />
    </div>
  );
}
