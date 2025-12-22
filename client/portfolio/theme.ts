import type { Theme } from "./types";

export const themeClasses: Record<Theme, string> = {
  light: "bg-stone-50 text-stone-900",
  dark: "bg-slate-950 text-slate-50",
  contrast: "bg-black text-yellow-400",
};

export const cardClasses: Record<Theme, string> = {
  light: "bg-white border-stone-200 shadow-sm",
  dark: "bg-slate-900 border-slate-800 shadow-xl",
  contrast: "bg-black border-yellow-400 border-2",
};

export const buttonClasses: Record<Theme, string> = {
  light: "bg-stone-200 hover:bg-stone-300 text-stone-900",
  dark: "bg-slate-800 hover:bg-slate-700 text-slate-100",
  contrast: "bg-yellow-400 hover:bg-yellow-500 text-black",
};

export const accentClasses: Record<Theme, string> = {
  light: "text-amber-600",
  dark: "text-emerald-400",
  contrast: "text-yellow-400",
};

export function getNavBg(theme: Theme) {
  return theme === "light"
    ? "rgba(250, 250, 249, 0.9)"
    : theme === "dark"
      ? "rgba(2, 6, 23, 0.9)"
      : "rgba(0, 0, 0, 0.95)";
}

export function getTechBadgeClass(theme: Theme) {
  return theme === "light"
    ? "bg-amber-100 text-amber-800"
    : theme === "dark"
      ? "bg-emerald-900/50 text-emerald-300 border border-emerald-800"
      : "bg-yellow-400 text-black";
}

export function getGlobePointColor(theme: Theme) {
  return theme === "light"
    ? "#d97706"
    : theme === "dark"
      ? "#10b981"
      : "#facc15";
}
