import type { WorkCityLabel, WorkExperience } from "@/client/portfolio/types";

/**
 * Aggregates projects into unique city labels with a project count per city.
 * Skips projects that do not have valid latitude/longitude coordinates.
 */
export function buildWorkCityLabels(
  workExperience: WorkExperience[],
): WorkCityLabel[] {
  const map = new Map<string, WorkCityLabel>();

  for (const work of workExperience) {
    for (const project of work.projects) {
      const { city, country, lat, lng } = project.location;

      if (typeof lat !== "number" || typeof lng !== "number") {
        continue;
      }

      const key = `${city}__${country}`.toLowerCase();

      const previousLabel = map.get(key);

      if (!previousLabel) {
        map.set(key, { city, count: 1, country, lat, lng });
        continue;
      }

      map.set(key, { ...previousLabel, count: previousLabel.count + 1 });
    }
  }

  return Array.from(map.values());
}
