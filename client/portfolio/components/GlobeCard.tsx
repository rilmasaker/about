"use client";

import type { MutableRefObject } from "react";
import type { GlobeMethods } from "react-globe.gl";

import { useGlobeCardInitialView } from "@/client/portfolio/hooks/useGlobeCardInitialView";
import { useGlobeFocus } from "@/client/portfolio/hooks/useGlobeFocus";
import { usePortfolioTexts } from "@/client/portfolio/hooks/usePortfolioTexts";
import {
  accentClasses,
  cardClasses,
  getGlobePointColor,
} from "@/client/portfolio/theme";
import type {
  ActiveProject,
  Locale,
  Theme,
  WorkCityLabel,
} from "@/client/portfolio/types";
import {
  getLabelDotRadius,
  getLabelSize,
  isSameLocation,
  toWorkCityLabel,
} from "@/client/portfolio/utils/globeCard";
import { GlobeNoSsr } from "@/client/ui/components/GlobeNoSsr";
import { Text } from "@/client/ui/components/Text";
import {
  DEFAULT_VIEW_LOCATION,
  INACTIVE_LABEL_COLOR,
  LABEL_RESOLUTION,
} from "@/client/portfolio/consts/globeCard";

type Props = {
  activeProject: ActiveProject;
  globeEl: MutableRefObject<GlobeMethods | null>;
  labels: WorkCityLabel[];
  locale: Locale;
  onActivateLocation?: (lat: number, lng: number) => void;
  theme: Theme;
};

export function GlobeCard(props: Props) {
  const { activeProject, globeEl, labels, locale, onActivateLocation, theme } =
    props;

  const texts = usePortfolioTexts({ locale, key: "globeCard" });

  const baseColor = getGlobePointColor(theme);
  const effectiveActiveProject = activeProject ?? DEFAULT_VIEW_LOCATION;

  useGlobeFocus({ activeProject, globeEl });
  useGlobeCardInitialView({ activeProject, globeRef: globeEl });

  return (
    <div className="mt-8">
      <div
        aria-label={texts.aria.cardLabel}
        className={`${cardClasses[theme]} overflow-hidden rounded-2xl border p-6`}
      >
        <Text
          align="center"
          className={`mb-4 ${accentClasses[theme]}`}
          variant="h4"
        >
          {texts.heading}
        </Text>

        <div className="flex h-80 items-center justify-center sm:h-90 lg:h-80">
          <GlobeNoSsr
            ref={globeEl}
            backgroundImageUrl="/night-sky.png"
            globeImageUrl="/earth-blue-marble.jpg"
            labelsData={labels}
            labelColor={(datum: unknown) => {
              const label = toWorkCityLabel(datum);
              const isActive = isSameLocation(label, effectiveActiveProject);
              return isActive ? baseColor : INACTIVE_LABEL_COLOR;
            }}
            labelDotRadius={(datum: unknown) =>
              getLabelDotRadius(toWorkCityLabel(datum).count)
            }
            labelLat={(datum: unknown) => toWorkCityLabel(datum).lat}
            labelLng={(datum: unknown) => toWorkCityLabel(datum).lng}
            labelResolution={LABEL_RESOLUTION}
            labelSize={(datum: unknown) =>
              getLabelSize(toWorkCityLabel(datum).count)
            }
            labelText={(datum: unknown) => toWorkCityLabel(datum).city}
            loadingAriaLabel={texts.loading.globeAriaLabel}
            onLabelClick={(datum: unknown) => {
              const label = toWorkCityLabel(datum);
              onActivateLocation?.(label.lat, label.lng);
            }}
          />
        </div>
      </div>
    </div>
  );
}
