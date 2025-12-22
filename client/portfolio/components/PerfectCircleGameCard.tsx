"use client";

import { FaAward } from "react-icons/fa";
import { PiSmileyFill } from "react-icons/pi";

import {
  PERFECT_CIRCLE_HEADING_ID,
  PERFECT_CIRCLE_MAX_SCORE,
} from "@/client/portfolio/consts/perfectCircleGame";
import {
  t,
  usePortfolioTexts,
} from "@/client/portfolio/hooks/usePortfolioTexts";
import { usePerfectCircleGame } from "@/client/portfolio/hooks/usePerfectCircleGame";
import { cardClasses } from "@/client/portfolio/theme";
import type { Locale, Theme } from "@/client/portfolio/types";
import { getScoreColorClass } from "@/client/portfolio/utils/perfectCircleGame";
import { Text } from "@/client/ui/components/Text";

type Props = {
  className?: string;
  locale: Locale;
  theme: Theme;
};

export function PerfectCircleGameCard(props: Props) {
  const { className, locale, theme } = props;

  const {
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
  } = usePerfectCircleGame({ theme });

  const texts = usePortfolioTexts({ locale, key: "perfectCircleGameCard" });

  const score = scoreState?.score ?? null;
  // @ts-expect-error - intentional text factory localization
  const outOfText = t(locale, texts.scoreOutOf(PERFECT_CIRCLE_MAX_SCORE));

  const scoreMessage =
    score === null
      ? null
      : (texts.messages.find((entry) => score >= entry.minScore)?.text ??
        texts.messages[texts.messages.length - 1]?.text ??
        "");

  return (
    <section
      aria-label={texts.aria.sectionLabel}
      aria-labelledby={PERFECT_CIRCLE_HEADING_ID}
      className={`${cardClasses[theme]} border rounded-2xl p-6 ${
        className ?? ""
      }`}
    >
      <div className="flex justify-center items-center gap-4">
        <div>
          <Text id={PERFECT_CIRCLE_HEADING_ID} variant="h3">
            {texts.heading}
          </Text>
        </div>
        <PiSmileyFill size={24} />
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <FaAward className="opacity-80" size={18} />

          <Text as="span" tone="muted" variant="bodySm">
            {texts.bestLabel}
          </Text>

          <Text
            as="span"
            className="font-semibold tabular-nums"
            variant="bodySm"
          >
            {bestScore}
          </Text>

          <Text as="span" tone="muted" variant="bodySm">
            {outOfText}
          </Text>
        </div>
      </div>

      <div className="mt-4">
        <div
          aria-label={texts.aria.drawingAreaLabel}
          className="relative w-full h-90 sm:h-105"
          ref={containerRef}
        >
          <canvas
            aria-label={texts.aria.canvasLabel}
            className="block w-full h-full cursor-crosshair"
            onPointerCancel={handlePointerCancel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            ref={canvasRef}
            style={{ touchAction: "none" }}
          />

          {!isDrawing && points.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Text align="center" className="px-6 opacity-70" variant="bodySm">
                {texts.hint}
              </Text>
            </div>
          ) : null}

          {score !== null ? (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div
                  className={`text-6xl font-semibold tabular-nums ${getScoreColorClass(
                    score,
                  )}`}
                >
                  {score}
                  <Text
                    as="span"
                    className="ml-2 text-base font-normal opacity-70"
                    variant="bodySm"
                  >
                    {outOfText}
                  </Text>
                </div>

                <Text className="mt-2 opacity-90" variant="subtitle">
                  {scoreMessage}
                </Text>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
