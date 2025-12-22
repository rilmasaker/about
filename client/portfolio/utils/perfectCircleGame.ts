import type { Theme } from "@/client/portfolio/types";
import { PERFECT_CIRCLE_SCORE_COLOR_THRESHOLDS } from "@/client/portfolio/consts/perfectCircleGame";

/**
 * Returns a Tailwind text color class based on the score thresholds.
 */
export function getScoreColorClass(score: number) {
  const matchedThreshold = PERFECT_CIRCLE_SCORE_COLOR_THRESHOLDS.find(
    (threshold) => score >= threshold.minScore,
  );

  return matchedThreshold?.className ?? "text-rose-500";
}

/**
 * Returns the canvas CSS size (in CSS pixels) based on its internal buffer size (device pixels).
 */
export function getCanvasCssSize(
  canvas: HTMLCanvasElement,
  devicePixelRatioValue: number,
) {
  return {
    height: canvas.height / devicePixelRatioValue,
    width: canvas.width / devicePixelRatioValue,
  };
}

/**
 * Returns pen colors depending on the current theme.
 */
export function getPenColors(theme: Theme) {
  if (theme === "contrast") {
    return {
      glowShadow: "rgba(250, 204, 21, 0.60)", // #facc15
      glowStroke: "rgba(250, 204, 21, 0.30)",
      mainShadow: "rgba(250, 204, 21, 0.40)",
      mainStroke: "rgba(250, 204, 21, 0.95)",
    };
  }

  return {
    glowShadow: "rgba(34, 197, 94, 0.55)",
    glowStroke: "rgba(34, 197, 94, 0.28)",
    mainShadow: "rgba(34, 197, 94, 0.35)",
    mainStroke: "rgba(34, 197, 94, 0.92)",
  };
}

/**
 * Draws the dashed guide circle in the center of the canvas.
 */
export function drawGuideCircle(params: {
  canvas: HTMLCanvasElement;
  devicePixelRatioValue: number;
  theme: Theme;
}) {
  const { canvas, devicePixelRatioValue, theme } = params;

  const context = canvas.getContext("2d");
  if (!context) return;

  const { width, height } = getCanvasCssSize(canvas, devicePixelRatioValue);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.max(70, Math.min(width, height) * 0.34);

  const guideStrokeStyle =
    theme === "contrast"
      ? "rgba(250, 204, 21, 0.45)"
      : "rgba(148, 163, 184, 0.55)";

  context.save();
  context.setLineDash([8, 8]);
  context.lineWidth = 2;
  context.strokeStyle = guideStrokeStyle;
  context.shadowBlur = 0;

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.stroke();

  context.restore();
}
