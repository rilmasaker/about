import type { WorkExperience } from "@/client/portfolio/types";

/**
 * Flattens work experience into a list of all project locations.
 * Each entry contains city/country + lat/lng coordinates.
 */
export function buildAllLocations(workExperience: WorkExperience[]) {
  return workExperience.flatMap((work) =>
    work.projects.map((project) => ({
      city: project.location.city,
      country: project.location.country,
      lat: project.location.lat,
      lng: project.location.lng,
    })),
  );
}
