"use client";

import {
  OrbitGlowCursorEffectProps,
  useOrbitGlow,
} from "@/client/portfolio/hooks/useOrbitGlow";
import { cn } from "@/client/ui/utils/cn";

export function OrbitGlowCursorEffect(props: OrbitGlowCursorEffectProps) {
  const { className, style } = props;

  const { canvasRef, containerClassName, effectiveDisabled } =
    useOrbitGlow(props);

  if (effectiveDisabled) return null;

  return (
    <div
      className={cn(containerClassName, "z-20", className)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" style={style} />
    </div>
  );
}
