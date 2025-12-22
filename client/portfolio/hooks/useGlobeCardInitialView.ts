"use client";

import { useEffect, useRef } from "react";
import type { GlobeMethods } from "react-globe.gl";

import {
  DEFAULT_VIEW_LOCATION,
  INITIAL_VIEW_ALTITUDE,
  INITIAL_VIEW_DURATION_MS,
} from "@/client/portfolio/consts/globeCard";
import type { ActiveProject } from "@/client/portfolio/types";

type Params = {
  activeProject: ActiveProject;
  globeRef: React.MutableRefObject<GlobeMethods | null>;
};

/**
 * Sets the initial globe view (Warsaw) exactly once when there is no active project selected.
 * Waits until the globe ref is available and retries shortly to avoid race conditions.
 */
export function useGlobeCardInitialView(params: Params) {
  const { activeProject, globeRef } = params;

  const hasSetInitialViewRef = useRef(false);

  useEffect(() => {
    if (activeProject) return;
    if (hasSetInitialViewRef.current) return;

    let animationFrameId: number | null = null;
    let timeoutIdA: number | null = null;
    let timeoutIdB: number | null = null;

    const setInitialView = () => {
      const globe = globeRef.current;
      if (!globe) return;

      globe.pointOfView(
        {
          altitude: INITIAL_VIEW_ALTITUDE,
          lat: DEFAULT_VIEW_LOCATION.lat,
          lng: DEFAULT_VIEW_LOCATION.lng,
        },
        INITIAL_VIEW_DURATION_MS,
      );
    };

    const trySetInitialView = () => {
      const globe = globeRef.current;

      if (!globe) {
        animationFrameId = window.requestAnimationFrame(trySetInitialView);
        return;
      }

      hasSetInitialViewRef.current = true;

      // Try now + one retry shortly after (textures/controls race)
      timeoutIdA = window.setTimeout(() => setInitialView(), 0);
      timeoutIdB = window.setTimeout(() => setInitialView(), 150);
    };

    trySetInitialView();

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      if (timeoutIdA) window.clearTimeout(timeoutIdA);
      if (timeoutIdB) window.clearTimeout(timeoutIdB);
    };
  }, [activeProject, globeRef]);
}
