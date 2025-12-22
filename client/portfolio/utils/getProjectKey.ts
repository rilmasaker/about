/**
 * Builds a stable key for project refs and lookups.
 * Useful for mapping DOM refs to a specific project within a company.
 */
export function getProjectKey(workCompany: string, projectTitle: string) {
  return `${workCompany}__${projectTitle}`;
}
