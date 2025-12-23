"use client";

import type { CSSProperties, RefObject } from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";

import {
  clampNumber,
  getDevicePixelRatio,
  prefersReducedMotion,
  toLocalPoint,
} from "@/client/portfolio/utils/orbitGlow";

type PointerState = {
  hasPointer: boolean;
  isDown: boolean;
  radiusScale: number;
  x: number;
  y: number;
};

type TrailPoint = {
  alpha: number;
  x: number;
  y: number;
};

type OrbitParticle = {
  angle: number;
  angularSpeed: number;
  followSpeed: number;
  orbitRadius: number;
  positionX: number;
  positionY: number;
  targetX: number;
  targetY: number;
  trail: TrailPoint[];
};

export type OrbitGlowCursorEffectProps = {
  /** If provided, the effect is clipped & positioned inside this element. */
  boundsRef?: RefObject<HTMLElement | null>;

  className?: string;

  /** Glow color (for example: rgba(34, 197, 94, 0.92)). */
  color?: string;

  /** Disable effect entirely. */
  disabled?: boolean;

  /** Whether to follow pointer movement. */
  followMouse?: boolean;

  /** Glow blur (shadowBlur). */
  glowBlur?: number;

  /** Global speed/intensity multiplier (0..3 recommended). */
  intensity?: number;

  /** Number of orbit particles. */
  particleCount?: number;

  /** Base angular speed. */
  particleSpeed?: number;

  /** Orbit radius. */
  radius?: number;

  /** Extra orbit scale while pointer is pressed. */
  radiusScaleOnPress?: number;

  /** If true, pressing pointer increases orbit radius. */
  reactToPress?: boolean;

  /** If true, respects prefers-reduced-motion and disables itself. */
  respectReducedMotion?: boolean;

  /** Stroke width. */
  strokeWidth?: number;

  style?: CSSProperties;

  /** Trail length per particle. */
  trailLength?: number;
};

type HookResult = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  containerClassName: string;
  effectiveDisabled: boolean;
};

const DEFAULT_COLOR = "rgba(34, 197, 94, 0.92)";

function createParticles(params: {
  initialX: number;
  initialY: number;
  particleCount: number;
  particleSpeed: number;
  radius: number;
}) {
  const { initialX, initialY, particleCount, particleSpeed, radius } = params;

  const nextParticles: OrbitParticle[] = [];

  for (let index = 0; index < particleCount; index += 1) {
    const orbitRadius = radius * 0.5 + radius * 0.5 * Math.random();
    const angle = Math.random() * Math.PI * 2;

    nextParticles.push({
      angle,
      angularSpeed: particleSpeed + Math.random() * particleSpeed,
      followSpeed: 0.08 + Math.random() * 0.06,
      orbitRadius,
      positionX: initialX,
      positionY: initialY,
      targetX: initialX,
      targetY: initialY,
      trail: [],
    });
  }

  return nextParticles;
}

export function useOrbitGlow(
  props: OrbitGlowCursorEffectProps
): HookResult {
  const {
    boundsRef,
    color = DEFAULT_COLOR,
    disabled = false,
    followMouse = true,
    glowBlur = 10,
    intensity = 1,
    particleCount = 22,
    particleSpeed = 0.018,
    radius = 70,
    radiusScaleOnPress = 1.35,
    reactToPress = true,
    respectReducedMotion = true,
    strokeWidth = 1,
    trailLength = 26,
  } = props;

  const animationFrameRef = useRef<number | null>(null);
  const boundsRectRef = useRef<DOMRect | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<OrbitParticle[]>([]);
  const pointerRef = useRef<PointerState>({
    hasPointer: false,
    isDown: false,
    radiusScale: 1,
    x: 0,
    y: 0,
  });

  const effectiveDisabled = useMemo(() => {
    return disabled || (respectReducedMotion && prefersReducedMotion());
  }, [disabled, respectReducedMotion]);

  const containerClassName = useMemo(() => {
    return boundsRef
      ? "absolute inset-0 pointer-events-none overflow-hidden"
      : "fixed inset-0 pointer-events-none";
  }, [boundsRef]);

  const measureBounds = useCallback(() => {
    if (boundsRef?.current) {
      boundsRectRef.current = boundsRef.current.getBoundingClientRect();
      return;
    }
    boundsRectRef.current = null;
  }, [boundsRef]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    measureBounds();

    const pixelRatio = getDevicePixelRatio();

    const width = boundsRectRef.current
      ? Math.max(1, Math.round(boundsRectRef.current.width))
      : window.innerWidth;
    const height = boundsRectRef.current
      ? Math.max(1, Math.round(boundsRectRef.current.height))
      : window.innerHeight;

    canvas.width = Math.floor(width * pixelRatio);
    canvas.height = Math.floor(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d");
    if (context) {
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    if (!pointerRef.current.hasPointer) {
      pointerRef.current.x = width / 2;
      pointerRef.current.y = height / 2;
      pointerRef.current.hasPointer = true;
    }

    particlesRef.current = createParticles({
      initialX: pointerRef.current.x,
      initialY: pointerRef.current.y,
      particleCount,
      particleSpeed,
      radius,
    });
  }, [measureBounds, particleCount, particleSpeed, radius]);

  useEffect(() => {
    if (effectiveDisabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const targetElement: HTMLElement | Window = boundsRef?.current ?? window;

    const handlePointerDown = () => {
      pointerRef.current.isDown = true;
    };

    const handlePointerLeave = () => {
      pointerRef.current.hasPointer = false;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!followMouse) return;

      measureBounds();

      const local = toLocalPoint(
        event.clientX,
        event.clientY,
        boundsRectRef.current
      );
      pointerRef.current.x = local.x;
      pointerRef.current.y = local.y;
      pointerRef.current.hasPointer = true;
    };

    const handlePointerUp = () => {
      pointerRef.current.isDown = false;
    };

    resizeCanvas();

    const resizeObserver =
      boundsRef?.current && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            resizeCanvas();
          })
        : null;

    if (resizeObserver && boundsRef?.current) {
      resizeObserver.observe(boundsRef.current);
    }

    if (targetElement === window) {
      window.addEventListener("resize", resizeCanvas);
      window.addEventListener("pointerdown", handlePointerDown, {
        passive: true,
      });
      window.addEventListener("pointerleave", handlePointerLeave);
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      window.addEventListener("pointerup", handlePointerUp, { passive: true });
    } else {
      const element = targetElement as HTMLElement;
      element.addEventListener("pointerdown", handlePointerDown, {
        passive: true,
      });
      element.addEventListener("pointerleave", handlePointerLeave);
      element.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      element.addEventListener("pointerup", handlePointerUp, { passive: true });
    }

    const drawFrame = () => {
      const canvasElement = canvasRef.current;
      if (!canvasElement) return;

      const width = canvasElement.clientWidth;
      const height = canvasElement.clientHeight;

      const targetScale =
        reactToPress && pointerRef.current.isDown ? radiusScaleOnPress : 1;
      pointerRef.current.radiusScale +=
        (targetScale - pointerRef.current.radiusScale) * 0.05;

      context.clearRect(0, 0, width, height);

      context.globalCompositeOperation = "lighter";
      context.lineCap = "round";
      context.lineJoin = "round";
      context.shadowBlur = glowBlur;
      context.shadowColor = color;

      const safeIntensity = clampNumber(intensity, 0, 3);
      const maxTrailLength = Math.max(6, Math.floor(trailLength));

      for (let index = 0; index < particlesRef.current.length; index += 1) {
        const particle = particlesRef.current[index];

        particle.targetX +=
          (pointerRef.current.x - particle.targetX) *
          particle.followSpeed *
          safeIntensity;
        particle.targetY +=
          (pointerRef.current.y - particle.targetY) *
          particle.followSpeed *
          safeIntensity;

        particle.angle += particle.angularSpeed * safeIntensity;

        const orbitRadius =
          particle.orbitRadius * pointerRef.current.radiusScale * safeIntensity;
        const nextX =
          particle.targetX + Math.cos(particle.angle + index) * orbitRadius;
        const nextY =
          particle.targetY + Math.sin(particle.angle + index) * orbitRadius;

        particle.positionX = clampNumber(nextX, 0, width);
        particle.positionY = clampNumber(nextY, 0, height);

        particle.trail.push({
          alpha: 1,
          x: particle.positionX,
          y: particle.positionY,
        });

        if (particle.trail.length > maxTrailLength) {
          particle.trail.splice(0, particle.trail.length - maxTrailLength);
        }

        for (
          let trailIndex = 0;
          trailIndex < particle.trail.length;
          trailIndex += 1
        ) {
          const point = particle.trail[trailIndex];
          point.alpha = (trailIndex + 1) / particle.trail.length;
        }

        if (particle.trail.length > 1) {
          for (
            let trailIndex = 1;
            trailIndex < particle.trail.length;
            trailIndex += 1
          ) {
            const previousPoint = particle.trail[trailIndex - 1];
            const currentPoint = particle.trail[trailIndex];

            context.globalAlpha = currentPoint.alpha * 0.32;

            context.beginPath();
            context.strokeStyle = color;
            context.lineWidth = strokeWidth;
            context.moveTo(previousPoint.x, previousPoint.y);
            context.lineTo(currentPoint.x, currentPoint.y);
            context.stroke();
          }
        }

        context.globalAlpha = 0.28;
        context.beginPath();
        context.fillStyle = color;
        context.arc(
          particle.positionX,
          particle.positionY,
          strokeWidth * 0.9,
          0,
          Math.PI * 2
        );
        context.fill();
      }

      context.globalAlpha = 1;
      context.shadowBlur = 0;
      context.globalCompositeOperation = "source-over";

      animationFrameRef.current = window.requestAnimationFrame(drawFrame);
    };

    animationFrameRef.current = window.requestAnimationFrame(drawFrame);

    return () => {
      if (animationFrameRef.current)
        window.cancelAnimationFrame(animationFrameRef.current);
      resizeObserver?.disconnect();

      if (targetElement === window) {
        window.removeEventListener("resize", resizeCanvas);
        window.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerleave", handlePointerLeave);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      } else {
        const element = targetElement as HTMLElement;
        element.removeEventListener("pointerdown", handlePointerDown);
        element.removeEventListener("pointerleave", handlePointerLeave);
        element.removeEventListener("pointermove", handlePointerMove);
        element.removeEventListener("pointerup", handlePointerUp);
      }
    };
  }, [
    boundsRef,
    color,
    effectiveDisabled,
    followMouse,
    glowBlur,
    intensity,
    measureBounds,
    radiusScaleOnPress,
    reactToPress,
    resizeCanvas,
    strokeWidth,
    trailLength,
  ]);

  return { canvasRef, containerClassName, effectiveDisabled };
}
