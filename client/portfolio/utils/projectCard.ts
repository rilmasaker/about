import type { Theme } from "@/client/portfolio/types";

/**
 * Clamps a number to the given [min, max] range.
 */
export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Returns the RGB glow color for a given theme.
 */
export function getGlowRgb(theme: Theme) {
  if (theme === "contrast") {
    return { b: 21, g: 204, r: 250 }; // #facc15
  }

  if (theme === "dark") {
    return { b: 129, g: 185, r: 16 }; // emerald-ish
  }

  return { b: 6, g: 119, r: 217 }; // amber-ish (light)
}

/**
 * Builds a layered box-shadow string for the "glow" effect based on theme and intensity.
 */
export function buildGlowShadow(theme: Theme, intensity: number) {
  const safeIntensity = clamp(intensity, 0, 1);
  const { r, g, b } = getGlowRgb(theme);

  const innerBlur = 10 + 10 * safeIntensity;
  const outerBlur = 18 + 26 * safeIntensity;

  const innerAlpha = 0.1 * safeIntensity;
  const outerAlpha = 0.69 * safeIntensity;

  return [
    `0 0 ${innerBlur}px rgba(${r}, ${g}, ${b}, ${innerAlpha})`,
    `0 0 ${outerBlur}px rgba(${r}, ${g}, ${b}, ${outerAlpha})`,
  ].join(", ");
}
