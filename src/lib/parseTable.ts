import { expandRegionKeys } from "./regionCodes";

export type RegionRow = {
  region: string;
  category: string;
  color: string;
};

export type StyledRegion = RegionRow & { keys: string[] };

const HEADER_RE = /^(state|province|region|subdivision)\b/i;

function splitTableLine(line: string): string[] {
  if (line.includes("\t")) {
    return line.split("\t").map((c) => c.trim());
  }
  const commaParts = line.split(",");
  if (commaParts.length >= 3) {
    return commaParts.map((c) => c.trim());
  }
  const wide = line.split(/\s{2,}/).map((c) => c.trim()).filter(Boolean);
  if (wide.length >= 3) return wide;
  const tok = line.split(/\s+/).filter(Boolean);
  if (tok.length >= 3) {
    const color = tok[tok.length - 1]!;
    const category = tok[tok.length - 2]!;
    const region = tok.slice(0, -2).join(" ");
    return [region, category, color];
  }
  return tok;
}

/**
 * Parse pasted 3-column rows: state/province, category, color.
 * Accepts tab-, comma-, or multi-space–separated values. Optional header row is skipped.
 */
export function parseTable(text: string): StyledRegion[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const rows: StyledRegion[] = [];

  for (let i = 0; i < lines.length; i++) {
    const parts = splitTableLine(lines[i]).filter((p) => p.length > 0);
    if (parts.length < 3) continue;
    const [a, b, c] = parts;
    if (i === 0 && HEADER_RE.test(a)) continue;
    const keys = expandRegionKeys(a);
    rows.push({ region: a, category: b, color: c, keys });
  }

  return rows;
}

export function buildStyleLookup(rows: StyledRegion[]): Map<
  string,
  { category: string; color: string }
> {
  const map = new Map<string, { category: string; color: string }>();
  for (const row of rows) {
    const entry = { category: row.category, color: row.color };
    for (const k of row.keys) {
      map.set(k, entry);
    }
  }
  return map;
}
