export const PERFECT_CIRCLE_HEADING_ID = "perfect-circle-heading";

export const PERFECT_CIRCLE_MAX_SCORE = 100;

export const PERFECT_CIRCLE_SCORE_COLOR_THRESHOLDS = [
  { minScore: 90, className: "text-emerald-500" },
  { minScore: 75, className: "text-sky-500" },
  { minScore: 50, className: "text-amber-500" },
  { minScore: 0, className: "text-rose-500" },
] as const;
