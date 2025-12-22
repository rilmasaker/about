import * as React from "react";
import { cn } from "../utils/cn";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "subtitle"
  | "body"
  | "bodySm"
  | "caption"
  | "label"
  | "mono";

type TypographyTone =
  | "default"
  | "muted"
  | "accent"
  | "danger"
  | "success"
  | "warning";

type TypographyAlign = "left" | "center" | "right";
type TypographyWeight = "regular" | "medium" | "semibold" | "bold";

const defaultElementByVariant: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  subtitle: "p",
  body: "p",
  bodySm: "p",
  caption: "p",
  label: "span",
  mono: "span",
};

const variantClass: Record<TypographyVariant, string> = {
  h1: "text-4xl leading-tight tracking-tight",
  h2: "text-3xl leading-tight tracking-tight",
  h3: "text-2xl leading-snug",
  h4: "text-xl leading-snug",
  subtitle: "text-lg leading-relaxed",
  body: "text-base leading-relaxed",
  bodySm: "text-sm leading-relaxed",
  caption: "text-xs leading-snug",
  label: "text-sm leading-none",
  mono: "text-sm font-mono",
};

const toneClass: Record<TypographyTone, string> = {
  default: "text-inherit",
  muted: "text-slate-500 dark:text-slate-400",
  accent: "text-emerald-500",
  danger: "text-red-500",
  success: "text-emerald-500",
  warning: "text-amber-500",
};

const alignClass: Record<TypographyAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const weightClass: Record<TypographyWeight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export type TypographyProps<T extends React.ElementType = "p"> = {
  variant?: TypographyVariant;
  tone?: TypographyTone;
  align?: TypographyAlign;
  weight?: TypographyWeight;
  truncate?: boolean;
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children">;

export function Text<T extends React.ElementType = "p">(
  props: TypographyProps<T>,
) {
  const {
    variant = "body",
    tone = "default",
    align = "left",
    weight,
    truncate,
    as,
    className,
    ...rest
  } = props;

  const Component = (as ??
    defaultElementByVariant[variant]) as React.ElementType;

  // domyślne wagi dla headingów
  const computedWeight: TypographyWeight | undefined =
    weight ??
    (variant === "h1" || variant === "h2"
      ? "bold"
      : variant === "h3" || variant === "h4"
        ? "semibold"
        : undefined);

  return (
    <Component
      className={cn(
        variantClass[variant],
        toneClass[tone],
        alignClass[align],
        truncate ? "truncate" : undefined,
        className,
        computedWeight ? weightClass[computedWeight] : undefined,
      )}
      {...rest}
    />
  );
}
