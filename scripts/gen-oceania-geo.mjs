import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const url =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_50m_admin_0_countries.geojson";
const j = await fetch(url).then((r) => r.json());

/** Drawn as US atlas subdivisions — skip to avoid duplicate shapes. */
const US_ATLAS_OCEANIA = new Set([
  "Guam",
  "American Samoa",
  "Northern Mariana Islands",
]);

const picks = j.features.filter((f) => {
  if (f.properties.CONTINENT !== "Oceania") return false;
  return !US_ATLAS_OCEANIA.has(f.properties.ADMIN);
});

const fc = {
  type: "FeatureCollection",
  features: picks.map((f) => ({
    ...f,
    properties: { ...f.properties, name: f.properties.ADMIN },
  })),
};

function code(p) {
  let c = p.ISO_A3;
  if (typeof c === "string" && c.length === 3 && c !== "-99") return c;
  c = p.ADM0_A3;
  if (typeof c === "string" && c.length === 3 && c !== "-99") return c;
  c = p.ISO_A3_EH;
  if (typeof c === "string" && c.length === 3 && c !== "-99") return c;
  return null;
}

const noIso = [];
const isoMap = {};
for (const f of picks) {
  const p = f.properties;
  const iso = code(p);
  if (!iso) noIso.push(p.ADMIN);
  else isoMap[iso] = p.ADMIN;
}

if (noIso.length) console.warn("Missing ISO:", noIso);

const geoPath = path.join(root, "public/geo/oceania-countries.json");
const tsPath = path.join(root, "src/lib/oceaniaCountryIso.ts");

fs.writeFileSync(geoPath, JSON.stringify(fc));
console.log("Wrote", geoPath, fs.statSync(geoPath).size);

const keys = Object.keys(isoMap).sort();
let body =
  "/** ISO alpha-3 → map label (Natural Earth Oceania; Guam, American Samoa, N. Mariana omitted — US atlas). */\n";
body +=
  "export const OCEANIA_COUNTRY_ISO_A3_TO_NAME: Record<string, string> = {\n";
for (const k of keys) {
  body += `  ${k}: ${JSON.stringify(isoMap[k])},\n`;
}
body += "};\n";

fs.writeFileSync(tsPath, body);
console.log("Wrote", tsPath, keys.length, "codes");
