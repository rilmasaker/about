"use client";

import { useEffect, useRef } from "react";
import type { GlobeMethods } from "react-globe.gl";

import type { ActiveProject } from "@/client/portfolio/types";

type Params = {
  activeProject: ActiveProject;
  altitude: number;
  durationMs: number;
  globeEl: React.MutableRefObject<GlobeMethods | null>;
  lat: number;
  lng: number;
};

/**
 * Sets the initial globe point-of-view once (e.g. Warsaw) when there is no active project selected.
 * Waits until the globe ref is available and avoids overriding user-selected locations.
 */
export function useGlobeInitialView(params: Params) {
  const { activeProject, altitude, durationMs, globeEl, lat, lng } = params;

  const hasSetInitialView = useRef(false);

  useEffect(() => {
    if (activeProject) return;
    if (hasSetInitialView.current) return;

    let animationFrameId: number | null = null;
    let timeoutId: number | null = null;

    const trySetInitialView = () => {
      const globe = globeEl.current;

      if (!globe) {
        animationFrameId = window.requestAnimationFrame(trySetInitialView);
        return;
      }

      hasSetInitialView.current = true;

      // Small delay helps when textures/controls initialize.
      timeoutId = window.setTimeout(() => {
        globe.pointOfView({ altitude, lat, lng }, durationMs);
      }, 0);
    };

    trySetInitialView();

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [activeProject, altitude, durationMs, globeEl, lat, lng]);
}
