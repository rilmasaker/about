import type {
  HomeArc,
  HomeLocation,
  WorkCityLabel,
} from "@/client/portfolio/types";

/**
 * Builds globe arc definitions from the given home location to each work city label.
 * Each arc id is stable and includes home city and destination city/country.
 */
export function buildHomeArcs(
  labels: WorkCityLabel[],
  home: HomeLocation,
): HomeArc[] {
  return labels.map((label) => ({
    city: label.city,
    country: label.country,
    count: label.count,
    dstLat: label.lat,
    dstLng: label.lng,
    id: `${home.city}->${label.city}__${label.country}`.toLowerCase(),
    srcLat: home.lat,
    srcLng: home.lng,
  }));
}
