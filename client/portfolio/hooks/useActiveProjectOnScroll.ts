import { useEffect } from "react";
import type { MutableRefObject } from "react";
import type { ActiveProject, WorkExperience } from "@/client/portfolio/types";
import { getProjectKey } from "@/client/portfolio/utils/getProjectKey";

type Params = {
  workExperience: WorkExperience[];
  projectRefs: MutableRefObject<Record<string, HTMLDivElement | null>>;
  setActiveProject: (next: ActiveProject) => void;
};

export function useActiveProjectOnScroll(params: Params) {
  const { workExperience, projectRefs, setActiveProject } = params;

  useEffect(() => {
    let isTicking = false;

    const handleScroll = () => {
      if (isTicking) return;

      isTicking = true;

      window.requestAnimationFrame(() => {
        isTicking = false;

        const scrollPosition = window.scrollY + window.innerHeight / 2;

        for (const work of workExperience) {
          for (const project of work.projects) {
            // IMPORTANT: use canonical string key (en) so it matches refs
            const projectKey = getProjectKey(work.company, project.title.en);
            const element = projectRefs.current[projectKey];

            if (!element) continue;

            const rect = element.getBoundingClientRect();
            const absoluteTop = rect.top + window.scrollY;
            const absoluteBottom = rect.bottom + window.scrollY;

            const isInView =
              scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom;
            if (!isInView) continue;

            const latitude = project.location.lat;
            const longitude = project.location.lng;

            if (typeof latitude !== "number" || typeof longitude !== "number") {
              setActiveProject(null);
              return;
            }

            setActiveProject({ lat: latitude, lng: longitude });
            return;
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [projectRefs, setActiveProject, workExperience]);
}
