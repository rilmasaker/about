import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Theme } from "@/client/portfolio/types";
import {
  computePerfectCircleScore,
  type Point2D,
} from "@/client/ui/utils/perfect-circle-score";
import {
  drawGuideCircle,
  getPenColors,
} from "@/client/portfolio/utils/perfectCircleGame";

export type ScoreState = {
  closure: number;
  coverage: number;
  lengthMatch: number;
  radialConsistency: number;
  score: number;
};

type Params = {
  theme: Theme;
};

/**
 * Manages the canvas drawing flow, resizing, and scoring for the Perfect Circle game.
 */
export function usePerfectCircleGame(params: Params) {
  const { theme } = params;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [bestScore, setBestScore] = useState<number>(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Point2D[]>([]);
  const [scoreState, setScoreState] = useState<ScoreState | null>(null);

  const devicePixelRatioValue = useMemo(() => {
    if (typeof window === "undefined") return 1;
    return window.devicePixelRatio || 1;
  }, []);

  const redrawBase = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGuideCircle({ canvas, devicePixelRatioValue, theme });
  }, [devicePixelRatioValue, theme]);

  const resizeCanvasToContainer = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const containerRect = container.getBoundingClientRect();
    const cssWidth = Math.floor(containerRect.width);
    const cssHeight = Math.floor(containerRect.height);

    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;

    canvas.width = Math.floor(cssWidth * devicePixelRatioValue);
    canvas.height = Math.floor(cssHeight * devicePixelRatioValue);

    const context = canvas.getContext("2d");
    if (context) {
      context.setTransform(
        devicePixelRatioValue,
        0,
        0,
        devicePixelRatioValue,
        0,
        0,
      );
      context.lineCap = "round";
      context.lineJoin = "round";
    }

    redrawBase();
  }, [devicePixelRatioValue, redrawBase]);

  useEffect(() => {
    resizeCanvasToContainer();

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => resizeCanvasToContainer());
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [resizeCanvasToContainer]);

  const getCanvasRelativePoint = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const canvasRect = canvas.getBoundingClientRect();

      return {
        x: event.clientX - canvasRect.left,
        y: event.clientY - canvasRect.top,
      };
    },
    [],
  );

  const drawSegment = useCallback(
    (fromPoint: Point2D, toPoint: Point2D) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      const penColors = getPenColors(theme);

      // Pass 1: soft glow
      context.save();
      context.globalCompositeOperation = "lighter";
      context.strokeStyle = penColors.glowStroke;
      context.lineWidth = 10;
      context.shadowColor = penColors.glowShadow;
      context.shadowBlur = 14;

      context.beginPath();
      context.moveTo(fromPoint.x, fromPoint.y);
      context.lineTo(toPoint.x, toPoint.y);
      context.stroke();
      context.restore();

      // Pass 2: crisp stroke
      context.save();
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = penColors.mainStroke;
      context.lineWidth = 3.5;
      context.shadowColor = penColors.mainShadow;
      context.shadowBlur = 6;

      context.beginPath();
      context.moveTo(fromPoint.x, fromPoint.y);
      context.lineTo(toPoint.x, toPoint.y);
      context.stroke();
      context.restore();
    },
    [theme],
  );

  const finalizeAttempt = useCallback(() => {
    setIsDrawing(false);

    setPoints((currentPoints) => {
      const breakdown = computePerfectCircleScore(currentPoints);
      setScoreState(breakdown);
      setBestScore((previousBestScore) =>
        Math.max(previousBestScore, breakdown.score),
      );
      return currentPoints;
    });
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      event.preventDefault();

      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.setPointerCapture(event.pointerId);

      redrawBase();
      setScoreState(null);

      const { x, y } = getCanvasRelativePoint(event);
      const timestampMs = Date.now();

      setIsDrawing(true);
      setPoints([{ x, y, time: timestampMs }]);
    },
    [getCanvasRelativePoint, redrawBase],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;

      event.preventDefault();

      const { x, y } = getCanvasRelativePoint(event);
      const timestampMs = Date.now();

      setPoints((previousPoints) => {
        const nextPoint: Point2D = { x, y, time: timestampMs };
        const lastPoint = previousPoints[previousPoints.length - 1];

        if (lastPoint) {
          drawSegment(lastPoint, nextPoint);
        }

        return [...previousPoints, nextPoint];
      });
    },
    [drawSegment, getCanvasRelativePoint, isDrawing],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;
      event.preventDefault();
      finalizeAttempt();
    },
    [finalizeAttempt, isDrawing],
  );

  const handlePointerCancel = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;
      event.preventDefault();
      finalizeAttempt();
    },
    [finalizeAttempt, isDrawing],
  );

  return {
    bestScore,
    canvasRef,
    containerRef,
    handlePointerCancel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    isDrawing,
    points,
    scoreState,
  };
}
