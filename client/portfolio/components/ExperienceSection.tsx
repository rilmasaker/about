import type { MutableRefObject } from "react";

import { WorkBlock } from "@/client/portfolio/components/WorkBlock";
import { accentClasses } from "@/client/portfolio/theme";
import type { Locale, Theme, WorkExperience } from "@/client/portfolio/types";
import { Text } from "@/client/ui/components/Text";
import { usePortfolioTexts } from "@/client/portfolio/hooks/usePortfolioTexts";

type Props = {
  locale: Locale;
  onActivateProject: (lat: number, lng: number) => void;
  projectRefs: MutableRefObject<Record<string, HTMLDivElement | null>>;
  theme: Theme;
  workExperience: WorkExperience[];
};

const EXPERIENCE_HEADING_ID = "experience-heading";

export function ExperienceSection(props: Props) {
  const { locale, onActivateProject, projectRefs, theme, workExperience } =
    props;

  const texts = usePortfolioTexts({ locale, key: "experienceSection" });

  const heading = texts.heading;
  const sectionAriaLabel = texts.aria.sectionLabel;
  return (
    <section
      aria-label={sectionAriaLabel}
      aria-labelledby={EXPERIENCE_HEADING_ID}
      className="min-w-0"
    >
      <Text
        className={`mb-10 ${accentClasses[theme]}`}
        id={EXPERIENCE_HEADING_ID}
        variant="h2"
      >
        {heading}
      </Text>

      <div className="space-y-12">
        {workExperience.map((workExperienceEntry, index) => (
          <WorkBlock
            key={`${workExperienceEntry.company}-${index}`}
            locale={locale}
            onActivateProject={onActivateProject}
            projectRefs={projectRefs}
            theme={theme}
            work={workExperienceEntry}
          />
        ))}
      </div>
    </section>
  );
}
