import { Text } from "@/client/ui/components/Text";
import { cn } from "@/client/ui/utils/cn";
import * as React from "react";

type TechBadgeTone = "default" | "accent";

type Props = {
  label?: string;
  icon?: React.ReactNode;
  tone?: TechBadgeTone;
  className?: string;
};

export function TechBadge({ label, icon, tone = "default", className }: Props) {
  const toneClassName =
    tone === "accent"
      ? "bg-emerald-900/50 text-emerald-300 border border-emerald-800"
      : "bg-slate-800/50 text-slate-200 border border-slate-700";

  const hasLabel = typeof label === "string" && label.trim().length > 0;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full",
        hasLabel ? "gap-2 px-4 py-2" : "p-2 justify-center",
        toneClassName,
        className,
      )}
      role="listitem"
    >
      {icon ? <span className="text-base leading-none">{icon}</span> : null}

      {hasLabel ? (
        <Text as="span" variant="label" className="leading-none">
          {label}
        </Text>
      ) : null}
    </span>
  );
}
