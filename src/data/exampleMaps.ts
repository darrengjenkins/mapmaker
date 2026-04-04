import { AMERICAS_COUNTRY_ISO_A3_TO_NAME } from "@/lib/americasCountryIso";
import { AFRICA_COUNTRY_ISO_A3_TO_NAME } from "@/lib/africaCountryIso";
import { ASIA_COUNTRY_ISO_A3_TO_NAME } from "@/lib/asiaCountryIso";
import { CARIBBEAN_COUNTRY_ISO_A3_TO_NAME } from "@/lib/caribbeanCountryIso";
import { EUROPE_COUNTRY_ISO_A3_TO_NAME } from "@/lib/europeCountryIso";
import { OCEANIA_COUNTRY_ISO_A3_TO_NAME } from "@/lib/oceaniaCountryIso";
import {
  CANADA_REGION_NAMES,
  MEXICO_REGION_NAMES,
  US_ATLAS_REGION_NAMES,
} from "./allNaRegions";

/** Sovereign members of the Commonwealth of Nations (ISO 3166-1 alpha-3). */
const COMMONWEALTH_MEMBER_ISO_A3 = new Set([
  "ATG",
  "AUS",
  "BHS",
  "BGD",
  "BRB",
  "BLZ",
  "BWA",
  "BRN",
  "CMR",
  "CAN",
  "CPV",
  "COK",
  "CYP",
  "DMA",
  "SWZ",
  "FJI",
  "GAB",
  "GMB",
  "GHA",
  "GRD",
  "GUY",
  "IND",
  "JAM",
  "KEN",
  "KIR",
  "LSO",
  "MWI",
  "MYS",
  "MLT",
  "MOZ",
  "NAM",
  "NRU",
  "NZL",
  "NGA",
  "NIU",
  "PAK",
  "PNG",
  "RWA",
  "KNA",
  "LCA",
  "VCT",
  "WSM",
  "SLE",
  "SGP",
  "SLB",
  "ZAF",
  "LKA",
  "TZA",
  "TGO",
  "TON",
  "TTO",
  "TUV",
  "UGA",
  "GBR",
  "VUT",
  "ZMB",
  "ZWE",
]);

/**
 * OIF (Organisation internationale de la Francophonie): full member states and
 * associate members that appear on our map layers. Excludes Mali, Burkina Faso,
 * and Niger (announced withdrawal in 2025). Subnational OIF members (e.g.
 * Quebec) are represented by colouring all of Canada.
 */
const OIF_FULL_MEMBER_ISO_A3 = new Set([
  "ALB",
  "AND",
  "ARM",
  "BEL",
  "BEN",
  "BGR",
  "BDI",
  "KHM",
  "CMR",
  "CAN",
  "CPV",
  "CAF",
  "TCD",
  "COM",
  "COG",
  "COD",
  "CIV",
  "CYP",
  "DJI",
  "DMA",
  "EGY",
  "GNQ",
  "FRA",
  "GAB",
  "GHA",
  "GRC",
  "GIN",
  "GNB",
  "HTI",
  "LAO",
  "LBN",
  "LUX",
  "MKD",
  "MDG",
  "MRT",
  "MDA",
  "MCO",
  "MAR",
  "ROU",
  "RWA",
  "LCA",
  "STP",
  "SEN",
  "CHE",
  "TGO",
  "TUN",
  "VUT",
  "VNM",
]);

/** Associate members of the OIF (sovereign states / jurisdictions on our map). */
const OIF_ASSOCIATE_MEMBER_ISO_A3 = new Set([
  "ARE",
  "KOS",
  "NCL",
  "QAT",
  "SRB",
]);

const OIF_MAP_ISO_A3 = new Set([
  ...OIF_FULL_MEMBER_ISO_A3,
  ...OIF_ASSOCIATE_MEMBER_ISO_A3,
]);

/** European Union member states (27), ISO 3166-1 alpha-3 — post-UK withdrawal. */
const EU_MEMBER_ISO_A3 = new Set([
  "AUT",
  "BEL",
  "BGR",
  "HRV",
  "CYP",
  "CZE",
  "DNK",
  "EST",
  "FIN",
  "FRA",
  "DEU",
  "GRC",
  "HUN",
  "IRL",
  "ITA",
  "LVA",
  "LTU",
  "LUX",
  "MLT",
  "NLD",
  "POL",
  "PRT",
  "ROU",
  "SVK",
  "SVN",
  "ESP",
  "SWE",
]);

/** ASEAN member states (includes Timor-Leste from October 2025). */
const ASEAN_MEMBER_ISO_A3 = new Set([
  "BRN",
  "KHM",
  "IDN",
  "LAO",
  "MYS",
  "MMR",
  "PHL",
  "SGP",
  "THA",
  "TLS",
  "VNM",
]);

/** APEC member economies (Chinese Taipei = Taiwan on this map). */
const APEC_MEMBER_ISO_A3 = new Set([
  "AUS",
  "BRN",
  "CAN",
  "CHL",
  "CHN",
  "HKG",
  "IDN",
  "JPN",
  "KOR",
  "MYS",
  "MEX",
  "NZL",
  "PNG",
  "PER",
  "PHL",
  "RUS",
  "SGP",
  "THA",
  "TWN",
  "USA",
  "VNM",
]);

/** Gulf Cooperation Council member states. */
const GCC_MEMBER_ISO_A3 = new Set([
  "SAU",
  "ARE",
  "KWT",
  "QAT",
  "BHR",
  "OMN",
]);

/**
 * OPEC member countries (12 as of 2024–2026). Angola withdrew 2024; Qatar left
 * 2019. Names match `MAP_COUNTRY_ISO_A3_TO_NAME` (Congo = Republic of the Congo).
 */
const OPEC_MEMBER_ISO_A3 = new Set([
  "DZA",
  "COG",
  "GNQ",
  "GAB",
  "IRN",
  "IRQ",
  "KWT",
  "LBY",
  "NGA",
  "SAU",
  "ARE",
  "VEN",
]);

/**
 * NATO accession calendar year per member (ISO alpha-3). Founding: 4 April
 * 1949. Germany: Federal Republic joined 1955; Spain 1982; Czechia/Hungary/Poland
 * 1999; 2004 wave; Albania/Croatia 2009; Montenegro 2017; North Macedonia 2020;
 * Finland 2023; Sweden 2024.
 */
const NATO_ACCESSION_YEAR: Record<string, number> = {
  ALB: 2009,
  BEL: 1949,
  BGR: 2004,
  CAN: 1949,
  HRV: 2009,
  CZE: 1999,
  DNK: 1949,
  EST: 2004,
  FIN: 2023,
  FRA: 1949,
  DEU: 1955,
  GRC: 1952,
  HUN: 1999,
  ISL: 1949,
  ITA: 1949,
  LVA: 2004,
  LTU: 2004,
  LUX: 1949,
  MNE: 2017,
  NLD: 1949,
  MKD: 2020,
  NOR: 1949,
  POL: 1999,
  PRT: 1949,
  ROU: 2004,
  SVK: 2004,
  SVN: 2004,
  ESP: 1982,
  SWE: 2024,
  TUR: 1952,
  GBR: 1949,
  USA: 1949,
};

const NATO_MEMBER_ISO_A3 = new Set(Object.keys(NATO_ACCESSION_YEAR));

const MAP_COUNTRY_ISO_A3_TO_NAME: Record<string, string> = {
  ...AMERICAS_COUNTRY_ISO_A3_TO_NAME,
  ...CARIBBEAN_COUNTRY_ISO_A3_TO_NAME,
  ...EUROPE_COUNTRY_ISO_A3_TO_NAME,
  ...ASIA_COUNTRY_ISO_A3_TO_NAME,
  ...AFRICA_COUNTRY_ISO_A3_TO_NAME,
  ...OCEANIA_COUNTRY_ISO_A3_TO_NAME,
};

function hslDistinct(i: number): string {
  const h = Math.round((i * 137.508) % 360);
  return `hsl(${h} 62% 46%)`;
}

type RegionalRow = { names: readonly string[]; category: string; color: string };

const US_CA_REGIONS_NA: readonly RegionalRow[] = [
  {
    category: "New England",
    color: "#be123c",
    names: [
      "Maine",
      "New Hampshire",
      "Vermont",
      "Massachusetts",
      "Rhode Island",
      "Connecticut",
    ],
  },
  {
    category: "US Mid-Atlantic",
    color: "#7c3aed",
    names: [
      "New York",
      "New Jersey",
      "Pennsylvania",
      "Delaware",
      "Maryland",
      "District of Columbia",
    ],
  },
  {
    category: "US Midwest",
    color: "#2563eb",
    names: [
      "Ohio",
      "Michigan",
      "Indiana",
      "Illinois",
      "Wisconsin",
      "Minnesota",
      "Iowa",
      "Missouri",
      "North Dakota",
      "South Dakota",
      "Nebraska",
      "Kansas",
    ],
  },
  {
    category: "US South-East",
    color: "#ea580c",
    names: [
      "Virginia",
      "West Virginia",
      "Kentucky",
      "Tennessee",
      "North Carolina",
      "South Carolina",
      "Georgia",
      "Florida",
      "Alabama",
      "Mississippi",
      "Louisiana",
      "Arkansas",
      "Texas",
      "Oklahoma",
      "Puerto Rico",
      "United States Virgin Islands",
    ],
  },
  {
    category: "US West",
    color: "#16a34a",
    names: [
      "Washington",
      "Oregon",
      "California",
      "Nevada",
      "Idaho",
      "Montana",
      "Wyoming",
      "Utah",
      "Colorado",
      "Arizona",
      "New Mexico",
      "Alaska",
      "Hawaii",
      "Guam",
      "American Samoa",
      "Commonwealth of the Northern Mariana Islands",
    ],
  },
  {
    category: "Canadian Atlantic",
    color: "#0891b2",
    names: [
      "Newfoundland and Labrador",
      "Nova Scotia",
      "New Brunswick",
      "Prince Edward Island",
    ],
  },
  {
    category: "Canadian East",
    color: "#0f766e",
    names: ["Ontario", "Quebec"],
  },
  {
    category: "Canadian Prairies",
    color: "#ca8a04",
    names: ["Manitoba", "Saskatchewan", "Alberta"],
  },
  {
    category: "Canadian West",
    color: "#6366f1",
    names: ["British Columbia"],
  },
  {
    category: "Canadian North",
    color: "#64748b",
    names: ["Northwest Territories", "Nunavut", "Yukon Territory"],
  },
];

const MEXICO_SINGLE_REGION = {
  category: "Mexico",
  color: "#78716c",
} as const;

function rowsFromRegionalDef(defs: readonly RegionalRow[]): string[] {
  const out: string[] = [];
  for (const { names, category, color } of defs) {
    for (const name of names) {
      out.push(`${name}\t${category}\t${color}`);
    }
  }
  return out;
}

/**
 * Example: US states & territories, Canadian provinces & territories, and Mexican
 * states grouped into broad cultural/geographic regions (Texas/Central South with
 * South-East; Pacific/Intermountain/Hawaii/Alaska with US West).
 */
export function buildRegionalNorthAmericaExampleTable(): string {
  const header = `Region\tCategory\tColor`;
  const lines = [
    ...rowsFromRegionalDef(US_CA_REGIONS_NA),
    ...MEXICO_REGION_NAMES.map(
      (name) =>
        `${name}\t${MEXICO_SINGLE_REGION.category}\t${MEXICO_SINGLE_REGION.color}`,
    ),
  ];
  return [header, ...lines].join("\n");
}

type CountryExampleSortEntry =
  | { kind: "country"; label: string }
  | { kind: "canada" }
  | { kind: "usa" };

function sortKeyForCountryEntry(e: CountryExampleSortEntry): string {
  if (e.kind === "canada") return "Canada";
  if (e.kind === "usa") return "United States";
  return e.label;
}

function buildPerCountryIsoExampleTable(memberIso: Set<string>): string {
  const header = `Region\tCategory\tColor`;
  const entries: CountryExampleSortEntry[] = [];
  if (memberIso.has("CAN")) {
    entries.push({ kind: "canada" });
  }
  if (memberIso.has("USA")) {
    entries.push({ kind: "usa" });
  }

  for (const [iso, label] of Object.entries(MAP_COUNTRY_ISO_A3_TO_NAME)) {
    if (!memberIso.has(iso)) continue;
    entries.push({ kind: "country", label });
  }

  const collator = new Intl.Collator("en", { sensitivity: "base" });
  entries.sort((a, b) =>
    collator.compare(sortKeyForCountryEntry(a), sortKeyForCountryEntry(b)),
  );

  const lines: string[] = [];
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]!;
    const color = hslDistinct(i);
    if (entry.kind === "canada") {
      for (const prov of CANADA_REGION_NAMES) {
        lines.push(`${prov}\tCanada\t${color}`);
      }
    } else if (entry.kind === "usa") {
      for (const state of US_ATLAS_REGION_NAMES) {
        lines.push(`${state}\tUnited States\t${color}`);
      }
    } else {
      lines.push(`${entry.label}\t${entry.label}\t${color}`);
    }
  }

  return [header, ...lines].join("\n");
}

/**
 * Example: one distinct colour per sovereign Commonwealth member on this map.
 * Only those countries appear in the table — everything else stays the default map fill.
 */
export function buildCommonwealthExampleTable(): string {
  return buildPerCountryIsoExampleTable(COMMONWEALTH_MEMBER_ISO_A3);
}

/**
 * Example: OIF members and associates on this map — one colour per country
 * (all Canadian provinces share Canada’s colour). Observers omitted.
 */
export function buildOifFrancophonieExampleTable(): string {
  return buildPerCountryIsoExampleTable(OIF_MAP_ISO_A3);
}

/**
 * Example: EU member states on this map — one colour per country. The United
 * Kingdom and other non‑EU neighbours stay the default fill.
 */
export function buildEuMemberExampleTable(): string {
  return buildPerCountryIsoExampleTable(EU_MEMBER_ISO_A3);
}

/**
 * Example: NATO members coloured by accession year — category is the four-digit
 * year; US states/territories and Canadian provinces use the same year as their
 * country.
 */
export function buildNatoMemberExampleTable(): string {
  const header = `Region\tCategory\tColor`;
  const uniqueYears = [
    ...new Set(Object.values(NATO_ACCESSION_YEAR)),
  ].sort((a, b) => a - b);
  const yearToColor = new Map<number, string>();
  uniqueYears.forEach((y, i) => {
    yearToColor.set(y, hslDistinct(i));
  });

  const lines: string[] = [];
  const isos = [...NATO_MEMBER_ISO_A3].sort((a, b) => a.localeCompare(b));

  for (const iso of isos) {
    const year = NATO_ACCESSION_YEAR[iso];
    if (year === undefined) continue;
    const category = String(year);
    const color = yearToColor.get(year)!;

    if (iso === "CAN") {
      for (const prov of CANADA_REGION_NAMES) {
        lines.push(`${prov}\t${category}\t${color}`);
      }
    } else if (iso === "USA") {
      for (const state of US_ATLAS_REGION_NAMES) {
        lines.push(`${state}\t${category}\t${color}`);
      }
    } else {
      const label = MAP_COUNTRY_ISO_A3_TO_NAME[iso];
      if (!label) continue;
      lines.push(`${label}\t${category}\t${color}`);
    }
  }

  return [header, ...lines].join("\n");
}

const ASEAN_APEC_BOTH_CATEGORY = "ASEAN & APEC";
const ASEAN_APEC_BOTH_COLOR = "#5b21b6";
const ASEAN_ONLY_CATEGORY = "ASEAN only";
const ASEAN_ONLY_COLOR = "#047857";
const APEC_ONLY_CATEGORY = "APEC only";
const APEC_ONLY_COLOR = "#c2410c";

function aseanApecClassify(
  iso: string,
): "both" | "asean_only" | "apec_only" | null {
  const a = ASEAN_MEMBER_ISO_A3.has(iso);
  const p = APEC_MEMBER_ISO_A3.has(iso);
  if (a && p) return "both";
  if (a) return "asean_only";
  if (p) return "apec_only";
  return null;
}

/**
 * ASEAN vs APEC overlap: three colours — members of both organisations,
 * ASEAN-only, and APEC-only (including US states, Canadian provinces, and
 * Mexican states for the APEC economies United States, Canada, and Mexico).
 */
export function buildAseanApecExampleTable(): string {
  const header = `Region\tCategory\tColor`;
  const lines: string[] = [];

  const pushRow = (region: string, kind: "both" | "asean_only" | "apec_only") => {
    if (kind === "both") {
      lines.push(
        `${region}\t${ASEAN_APEC_BOTH_CATEGORY}\t${ASEAN_APEC_BOTH_COLOR}`,
      );
    } else if (kind === "asean_only") {
      lines.push(`${region}\t${ASEAN_ONLY_CATEGORY}\t${ASEAN_ONLY_COLOR}`);
    } else {
      lines.push(`${region}\t${APEC_ONLY_CATEGORY}\t${APEC_ONLY_COLOR}`);
    }
  };

  for (const [iso, label] of Object.entries(MAP_COUNTRY_ISO_A3_TO_NAME)) {
    const k = aseanApecClassify(iso);
    if (k) pushRow(label, k);
  }

  for (const name of US_ATLAS_REGION_NAMES) {
    pushRow(name, "apec_only");
  }
  for (const name of CANADA_REGION_NAMES) {
    pushRow(name, "apec_only");
  }
  for (const name of MEXICO_REGION_NAMES) {
    pushRow(name, "apec_only");
  }

  return [header, ...lines].join("\n");
}

const GCC_OPEC_BOTH_CATEGORY = "GCC & OPEC";
const GCC_OPEC_BOTH_COLOR = "#4338ca";
const GCC_ONLY_CATEGORY = "GCC only";
const GCC_ONLY_COLOR = "#0d9488";
const OPEC_ONLY_CATEGORY = "OPEC only";
const OPEC_ONLY_COLOR = "#d97706";

function gccOpecClassify(
  iso: string,
): "both" | "gcc_only" | "opec_only" | null {
  const g = GCC_MEMBER_ISO_A3.has(iso);
  const o = OPEC_MEMBER_ISO_A3.has(iso);
  if (g && o) return "both";
  if (g) return "gcc_only";
  if (o) return "opec_only";
  return null;
}

/**
 * GCC vs OPEC overlap: three colours for both, GCC-only (e.g. Bahrain, Oman,
 * Qatar), and OPEC-only. Uses current OPEC membership excluding Angola
 * (withdrew 2024) and Qatar (left OPEC 2019; remains in GCC).
 */
export function buildGccOpecExampleTable(): string {
  const header = `Region\tCategory\tColor`;
  const lines: string[] = [];

  const pushRow = (
    region: string,
    kind: "both" | "gcc_only" | "opec_only",
  ) => {
    if (kind === "both") {
      lines.push(
        `${region}\t${GCC_OPEC_BOTH_CATEGORY}\t${GCC_OPEC_BOTH_COLOR}`,
      );
    } else if (kind === "gcc_only") {
      lines.push(`${region}\t${GCC_ONLY_CATEGORY}\t${GCC_ONLY_COLOR}`);
    } else {
      lines.push(`${region}\t${OPEC_ONLY_CATEGORY}\t${OPEC_ONLY_COLOR}`);
    }
  };

  for (const [iso, label] of Object.entries(MAP_COUNTRY_ISO_A3_TO_NAME)) {
    const k = gccOpecClassify(iso);
    if (k) pushRow(label, k);
  }

  return [header, ...lines].join("\n");
}
