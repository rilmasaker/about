import type { MutableRefObject } from "react";

import { ProjectCard } from "@/client/portfolio/components/ProjectCard";
import { portfolioTexts } from "@/client/portfolio/data";
import {
  t,
  usePortfolioTexts,
} from "@/client/portfolio/hooks/usePortfolioTexts";
import type { Locale, Theme, WorkExperience } from "@/client/portfolio/types";
import { Text } from "@/client/ui/components/Text";
import { getProjectKey } from "@/client/portfolio/utils/getProjectKey";

type Props = {
  locale: Locale;
  onActivateProject: (lat: number, lng: number) => void;
  projectRefs: MutableRefObject<Record<string, HTMLDivElement | null>>;
  theme: Theme;
  work: WorkExperience;
};

export function WorkBlock(props: Props) {
  const { locale, onActivateProject, projectRefs, theme, work } = props;

  usePortfolioTexts({ locale, key: "workBlock" });

  const position = t(locale, work.position);

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <Text variant="h3">{work.company}</Text>

        <Text className="mt-1" tone="muted" variant="subtitle">
          {position}
        </Text>

        <Text className="mt-1" tone="muted" variant="caption">
          {work.period}
        </Text>
      </div>

      {work.projects.map((project, projectIndex) => {
        const projectTitle = t(locale, project.title);

        const projectKey = getProjectKey(work.company, project.title.en);

        const latitude = project.location.lat;
        const longitude = project.location.lng;

        const canActivate =
          typeof latitude === "number" && typeof longitude === "number";

        const projectCardAriaLabel = t(
          locale,
          portfolioTexts.workBlock.aria.openProjectCard(projectTitle),
        );

        return (
          <ProjectCard
            ariaLabel={projectCardAriaLabel}
            key={`${projectKey}-${projectIndex}`}
            locale={locale}
            onActivate={
              canActivate
                ? () => {
                    onActivateProject(latitude, longitude);
                  }
                : undefined
            }
            project={project}
            setRef={(element) => {
              projectRefs.current[projectKey] = element;
            }}
            theme={theme}
          />
        );
      })}
    </div>
  );
}
