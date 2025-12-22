import * as React from "react";
import { cn } from "../utils/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "link";

export type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 " +
  "disabled:opacity-50 disabled:pointer-events-none select-none";

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-emerald-500 text-black hover:bg-emerald-400",
  secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700",
  ghost: "bg-transparent hover:bg-slate-800/40",
  danger: "bg-red-500 text-white hover:bg-red-400",
  link: "bg-transparent underline underline-offset-4 hover:opacity-80 p-0 h-auto",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      loading,
      leftIcon,
      rightIcon,
      className,
      disabled,
      children,
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
        className={cn(
          base,
          variantClass[variant],
          variant !== "link" ? sizeClass[size] : undefined,
          className,
        )}
        {...rest}
      >
        {loading ? <Spinner /> : leftIcon}
        <span>{children}</span>
        {rightIcon}
      </button>
    );
  },
);
