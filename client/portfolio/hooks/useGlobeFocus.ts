"use client";

import { useEffect, useRef } from "react";
import type { GlobeMethods } from "react-globe.gl";

import type { ActiveProject } from "@/client/portfolio/types";

type Params = {
  activeProject: ActiveProject;
  globeEl: React.MutableRefObject<GlobeMethods | null>;
};

/**
 * Moves the globe camera to the active project location whenever it changes.
 * Skips the first run to avoid overriding the initial globe view (e.g. Warsaw).
 */
export function useGlobeFocus(params: Params) {
  const { activeProject, globeEl } = params;

  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    if (!activeProject) return;

    const globe = globeEl.current;
    if (!globe) return;

    globe.pointOfView(
      { altitude: 2, lat: activeProject.lat, lng: activeProject.lng },
      1000,
    );
  }, [activeProject, globeEl]);
}
