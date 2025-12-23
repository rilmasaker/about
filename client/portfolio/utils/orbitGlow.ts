/**
 * Utility helpers for the OrbitGlowCursorEffect.
 * Kept in a separate file for readability and easier testing.
 */

export function clampNumber(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

/**
 * Returns device pixel ratio for crisp canvas rendering.
 * Falls back to 1 during SSR or when unavailable.
 */
export function getDevicePixelRatio() {
  if (typeof window === "undefined") return 1;
  return window.devicePixelRatio || 1;
}

/**
 * Checks whether the user prefers reduced motion.
 * If true, effects should be disabled or toned down.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  );
}

/**
 * Converts absolute client coordinates to element-local coordinates.
 * When boundsRect is null, it returns the input coordinates unchanged.
 */
export function toLocalPoint(
  clientX: number,
  clientY: number,
  boundsRect: DOMRect | null
) {
  if (!boundsRect) return { x: clientX, y: clientY };
  return { x: clientX - boundsRect.left, y: clientY - boundsRect.top };
}
