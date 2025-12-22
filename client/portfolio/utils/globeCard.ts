import type { WorkCityLabel } from "@/client/portfolio/types";

/**
 * Type guard/cast helper for Globe label callbacks.
 * react-globe.gl passes label datum as `unknown` in callbacks.
 */
export function toWorkCityLabel(datum: unknown): WorkCityLabel {
  return datum as WorkCityLabel;
}

/**
 * Calculates label text size based on the number of projects in the given city.
 */
export function getLabelSize(count: number) {
  return 0.3 + Math.sqrt(count) * 0.1;
}

/**
 * Calculates label dot radius based on the number of projects in the given city.
 */
export function getLabelDotRadius(count: number) {
  return 0.1 + Math.sqrt(count) * 0.25;
}

/**
 * Checks whether two geo points represent the same location.
 */
export function isSameLocation(
  firstLocation: { lat: number; lng: number },
  secondLocation: { lat: number; lng: number },
) {
  return (
    firstLocation.lat === secondLocation.lat &&
    firstLocation.lng === secondLocation.lng
  );
}
