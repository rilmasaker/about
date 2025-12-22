export type Point2D = {
  x: number;
  y: number;
  time: number;
};

type ScoreBreakdown = {
  score: number;
  radialConsistency: number;
  coverage: number;
  closure: number;
  lengthMatch: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function mean(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  const sum = values.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  return sum / values.length;
}

function standardDeviation(values: number[], valuesMean: number) {
  if (values.length === 0) {
    return 0;
  }

  const variance =
    values.reduce((accumulator, currentValue) => {
      const delta = currentValue - valuesMean;
      return accumulator + delta * delta;
    }, 0) / values.length;

  return Math.sqrt(variance);
}

function distance(a: Point2D, b: Point2D) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function pathLength(points: Point2D[]) {
  if (points.length < 2) {
    return 0;
  }

  let total = 0;
  for (let index = 1; index < points.length; index += 1) {
    total += distance(points[index - 1], points[index]);
  }
  return total;
}

export function computePerfectCircleScore(points: Point2D[]): ScoreBreakdown {
  if (points.length < 20) {
    return {
      score: 0,
      radialConsistency: 0,
      coverage: 0,
      closure: 0,
      lengthMatch: 0,
    };
  }

  const centerX = mean(points.map((point) => point.x));
  const centerY = mean(points.map((point) => point.y));

  const radii = points.map((point) => {
    const dx = point.x - centerX;
    const dy = point.y - centerY;
    return Math.sqrt(dx * dx + dy * dy);
  });

  const meanRadius = mean(radii);
  if (meanRadius <= 1) {
    return {
      score: 0,
      radialConsistency: 0,
      coverage: 0,
      closure: 0,
      lengthMatch: 0,
    };
  }

  const radiusStdDev = standardDeviation(radii, meanRadius);
  const radiusCoeffOfVariation = radiusStdDev / meanRadius;

  // 0..1, im mniejsze odchylenie promienia tym lepiej
  const radialConsistency = clamp(1 - radiusCoeffOfVariation * 2.8, 0, 1);

  // Coverage: ile „kąta” okręgu pokryłeś (binning kątów)
  const binCount = 36;
  const bins = new Array<boolean>(binCount).fill(false);

  for (const point of points) {
    const angle = Math.atan2(point.y - centerY, point.x - centerX); // -PI..PI
    const normalized = (angle + Math.PI) / (2 * Math.PI); // 0..1
    const binIndex = clamp(Math.floor(normalized * binCount), 0, binCount - 1);
    bins[binIndex] = true;
  }

  const filledBins = bins.filter(Boolean).length;
  const rawCoverage = filledBins / binCount;

  // wymagamy sensownego pokrycia, ale nie karzemy brutalnie jeśli brakuje trochę
  const coverage = clamp((rawCoverage - 0.25) / 0.75, 0, 1);

  // Closure: jak blisko startu kończysz
  const startPoint = points[0];
  const endPoint = points[points.length - 1];
  const startEndDistance = distance(startPoint, endPoint);
  const closure = clamp(1 - (startEndDistance / meanRadius) * 1.6, 0, 1);

  // Length match: długość śladu vs obwód idealnego okręgu
  const length = pathLength(points);
  const idealCircumference = 2 * Math.PI * meanRadius;
  const ratio = idealCircumference > 0 ? length / idealCircumference : 0;
  const lengthMatch = clamp(1 - Math.abs(1 - ratio) * 1.2, 0, 1);

  // Final: mieszanka z wagami
  const combined =
    Math.pow(radialConsistency, 0.75) *
    Math.pow(coverage, 0.55) *
    Math.pow(closure, 0.45) *
    Math.pow(lengthMatch, 0.35);

  const score = Math.round(clamp(combined, 0, 1) * 100);

  return { score, radialConsistency, coverage, closure, lengthMatch };
}

export function getCanvasCssSize(
  canvas: HTMLCanvasElement,
  devicePixelRatio: number,
) {
  return {
    width: canvas.width / devicePixelRatio,
    height: canvas.height / devicePixelRatio,
  };
}

export function drawGuideCircle(params: {
  canvas: HTMLCanvasElement;
  devicePixelRatio: number;
}) {
  const { canvas, devicePixelRatio } = params;

  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  const { width, height } = getCanvasCssSize(canvas, devicePixelRatio);
  const centerX = width / 2;
  const centerY = height / 2;

  const radius = Math.max(60, Math.min(width, height) * 0.32);

  context.save();

  context.setLineDash([8, 8]);
  context.lineWidth = 2;
  context.strokeStyle = "rgba(148, 163, 184, 0.55)";
  context.shadowBlur = 0;

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.stroke();

  context.restore();
}
