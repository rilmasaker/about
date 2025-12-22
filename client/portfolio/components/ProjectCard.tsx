"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import { FiExternalLink, FiMapPin } from "react-icons/fi";

import { portfolioTexts } from "@/client/portfolio/data";
import {
  usePortfolioTexts,
  t,
} from "@/client/portfolio/hooks/usePortfolioTexts";
import { useViewportCenterIntensity } from "@/client/portfolio/hooks/useViewportCenterIntensity";
import { technologyIcons } from "@/client/portfolio/icons";
import { accentClasses, cardClasses } from "@/client/portfolio/theme";
import type { Locale, Project, Theme } from "@/client/portfolio/types";
import { buildGlowShadow } from "@/client/portfolio/utils/projectCard";
import { TechBadge } from "@/client/ui/components/TechBadge";
import { Text } from "@/client/ui/components/Text";

type Props = {
  ariaLabel?: string;
  locale: Locale;
  onActivate?: () => void;
  project: Project;
  setRef: (element: HTMLDivElement | null) => void;
  theme: Theme;
};

export function ProjectCard(props: Props) {
  const { ariaLabel, locale, onActivate, project, setRef, theme } = props;

  const texts = usePortfolioTexts({ locale, key: "projectCard" });

  const projectTitle = t(locale, project.title);
  const projectDescription = t(locale, project.description);

  const isClickable = typeof onActivate === "function";

  const localRef = useRef<HTMLDivElement | null>(null);
  const intensity = useViewportCenterIntensity({ elementRef: localRef });

  const glowShadow = useMemo(
    () => buildGlowShadow(theme, intensity),
    [theme, intensity],
  );

  const lift = 1 + intensity * 0.05; // max +5%
  const translateY = -intensity * 6; // max -6px

  const fallbackArticleAriaLabel = t(
    locale,
    portfolioTexts.projectCard.aria.articleLabel(projectTitle),
  );

  const articleAriaLabel = ariaLabel ?? fallbackArticleAriaLabel;

  const clickSurfaceAriaLabel = isClickable
    ? t(
        locale,
        portfolioTexts.projectCard.aria.activateProjectOnMap(projectTitle),
      )
    : t(locale, portfolioTexts.projectCard.aria.articleLabel(projectTitle));

  const openInNewTabAriaLabel = t(
    locale,
    portfolioTexts.projectCard.aria.openProjectInNewTab(projectTitle),
  );
  const screenshotAlt = t(
    locale,
    portfolioTexts.projectCard.aria.projectScreenshotAlt(projectTitle),
  );

  return (
    <article
      aria-label={articleAriaLabel}
      className={`${
        cardClasses[theme]
      } border rounded-xl p-6 transition-[transform,box-shadow] duration-300 will-change-transform ${
        isClickable ? "cursor-pointer" : ""
      }`}
      ref={(element: HTMLDivElement | null) => {
        localRef.current = element;
        setRef(element);
      }}
      style={{
        boxShadow: glowShadow,
        transform: `translateY(${translateY}px) scale(${lift})`,
      }}
    >
      <div
        aria-label={clickSurfaceAriaLabel}
        className={
          isClickable
            ? "outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg"
            : ""
        }
        onClick={() => {
          if (!isClickable) return;
          onActivate();
        }}
        onKeyDown={(event) => {
          if (!isClickable) return;

          if (event.key === "Enter") {
            onActivate();
          }

          if (event.key === " ") {
            event.preventDefault();
            onActivate();
          }
        }}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : -1}
      >
        <div className="flex justify-between mb-3 gap-4 min-w-0">
          <Text
            className={`${accentClasses[theme]} min-w-0 wrap-break-word`}
            variant="h4"
          >
            {projectTitle}
          </Text>

          <Text
            className="whitespace-nowrap shrink-0"
            tone="muted"
            variant="caption"
          >
            {project.period}
          </Text>
        </div>

        <div className="flex items-center gap-2 mb-4 min-w-0">
          <FiMapPin
            aria-hidden="true"
            className="opacity-60 shrink-0"
            size={16}
          />
          <Text className="min-w-0" tone="muted" variant="bodySm">
            {project.location.city}, {project.location.country}
          </Text>
        </div>

        {project.image ? (
          <div className="mb-4">
            {project.link ? (
              <a
                aria-label={openInNewTabAriaLabel}
                className="block group relative"
                href={project.link}
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="relative w-full h-64 overflow-hidden rounded-lg">
                  <Image
                    alt={screenshotAlt}
                    className="object-cover group-hover:opacity-90 transition-opacity"
                    fill
                    sizes="(min-width: 1024px) 600px, 100vw"
                    src={project.image}
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-lg">
                  <FiExternalLink
                    aria-hidden="true"
                    className="text-white"
                    size={32}
                  />
                </div>
              </a>
            ) : (
              <div className="relative w-full h-64 overflow-hidden rounded-lg">
                <Image
                  alt={screenshotAlt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  src={project.image}
                />
              </div>
            )}
          </div>
        ) : null}

        <Text className="mb-5 wrap-break-word" tone="muted" variant="body">
          {projectDescription}
        </Text>
      </div>

      <div
        aria-label={texts.aria.technologiesListLabel}
        className="flex flex-wrap gap-3"
        role="list"
      >
        {project.technologies.map((technology, technologyIndex) => {
          const IconComponent =
            technologyIcons[technology.iconKey] ?? technologyIcons.unknown;

          return (
            <TechBadge
              icon={<IconComponent aria-hidden="true" />}
              key={`${project.title.en}-${technology.name}-${technologyIndex}`}
              label={technology.name}
              tone="accent"
            />
          );
        })}
      </div>
    </article>
  );
}
