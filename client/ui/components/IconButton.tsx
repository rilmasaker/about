import * as React from "react";
import { cn } from "../utils/cn";
import type { ButtonVariant, ButtonSize } from "./Button";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Exclude<ButtonVariant, "link">;
  size?: ButtonSize;
  loading?: boolean;
  icon: React.ReactNode;
  "aria-label": string; // wymagane dla a11y
};

const base =
  "inline-flex items-center justify-center rounded-lg transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variantClass: Record<Exclude<ButtonVariant, "link">, string> = {
  primary: "bg-emerald-500 text-black hover:bg-emerald-400",
  secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700",
  ghost: "bg-transparent hover:bg-slate-800/40",
  danger: "bg-red-500 text-white hover:bg-red-400",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-12 w-12",
};

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  );
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      variant = "ghost",
      size = "md",
      loading,
      icon,
      className,
      disabled,
      type,
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type ?? "button"}
        disabled={isDisabled}
        className={cn(base, variantClass[variant], sizeClass[size], className)}
        {...rest}
      >
        {loading ? <Spinner /> : icon}
      </button>
    );
  },
);
