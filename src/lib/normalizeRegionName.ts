/** Lowercase, trim, strip accents, collapse spaces — for matching pasted labels to map features. */
export function normalizeRegionName(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "")
    .replace(/\s+/g, " ");
}
