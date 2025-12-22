export type AboutData = {
  description: LocalizedText;
  email: string;
  github: string;
  image: string;
  linkedin: string;
  name: string;
  title: LocalizedText;
};

export type ActiveProject = { lat: number; lng: number } | null;

export type GeoLocation = {
  city: string;
  country: string;
  lat?: number;
  lng?: number;
};

export type HomeArc = {
  city: string;
  count: number;
  country: string;
  dstLat: number;
  dstLng: number;
  id: string;
  srcLat: number;
  srcLng: number;
};

export type HomeLocation = {
  city: string;
  country: string;
  lat: number;
  lng: number;
};

export type Locale = "en" | "pl";

export type LocalizedText = Record<Locale, string>;

export interface ProjectLocation {
  city: string;
  country: string;
  lat: number;
  lng: number;
}

export type Project = {
  description: LocalizedText;
  image?: string;
  isConfidential?: boolean;
  link?: string;
  location: GeoLocation;
  period: string;
  technologies: Technology[];
  title: LocalizedText;
};

export type Technology = {
  iconKey: TechnologyIconKey;
  name: string;
};

export type TechnologyIconKey =
  | "javascript"
  | "typescript"
  | "react"
  | "nextjs"
  | "nodejs"
  | "meteor"
  | "mongodb"
  | "graphql"
  | "apollo"
  | "redux"
  | "materialui"
  | "reactnative"
  | "firebase"
  | "stripe"
  | "vue"
  | "django"
  | "python"
  | "tailwind"
  | "storybook"
  | "radixui"
  | "styledcomponents"
  | "azuredevops"
  | "jira"
  | "git"
  | "sanity"
  | "docusaurus"
  | "shopify"
  | "threejs"
  | "openai"
  | "postgres"
  | "express"
  | "unknown";

export type Theme = "light" | "dark" | "contrast";

export type WorkCityLabel = {
  city: string;
  count: number;
  country: string;
  lat: number;
  lng: number;
};

export type WorkExperience = {
  company: string;
  period: string;
  position: LocalizedText;
  projects: Project[];
};
