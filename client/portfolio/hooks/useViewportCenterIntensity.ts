"use client";

import { useEffect, useState, type RefObject } from "react";

import { clamp } from "@/client/portfolio/utils/projectCard";

type Params = {
  elementRef: RefObject<HTMLElement | null>;
};

/**
 * Returns an intensity value (0..1) based on how close the element's vertical center
 * is to the viewport center. Useful for scroll-based highlight effects.
 */
export function useViewportCenterIntensity(params: Params) {
  const { elementRef } = params;

  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationFrameId: number | null = null;
    let lastValue = 0;

    const update = () => {
      const rect = element.getBoundingClientRect();

      const elementCenterY = rect.top + rect.height / 2;
      const viewportCenterY = window.innerHeight / 2;

      const distance = Math.abs(elementCenterY - viewportCenterY);

      const maxDistance = window.innerHeight * 0.45;

      const raw = 1 - distance / maxDistance;
      const next = clamp(raw, 0, 1);
      const eased = next * next;

      if (Math.abs(eased - lastValue) > 0.03) {
        lastValue = eased;
        setIntensity(eased);
      }
    };

    const schedule = () => {
      if (animationFrameId) return;

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = null;
        update();
      });
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [elementRef]);

  return intensity;
}
