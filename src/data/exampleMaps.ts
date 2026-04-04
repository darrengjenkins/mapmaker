import { AMERICAS_COUNTRY_ISO_A3_TO_NAME } from "@/lib/americasCountryIso";
import { AFRICA_COUNTRY_ISO_A3_TO_NAME } from "@/lib/africaCountryIso";
import { ASIA_COUNTRY_ISO_A3_TO_NAME } from "@/lib/asiaCountryIso";
import { CARIBBEAN_COUNTRY_ISO_A3_TO_NAME } from "@/lib/caribbeanCountryIso";
import { EUROPE_COUNTRY_ISO_A3_TO_NAME } from "@/lib/europeCountryIso";
import { OCEANIA_COUNTRY_ISO_A3_TO_NAME } from "@/lib/oceaniaCountryIso";
import { CANADA_REGION_NAMES, MEXICO_REGION_NAMES } from "./allNaRegions";

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

type CommonwealthSortEntry =
  | { kind: "country"; label: string }
  | { kind: "canada" };

/**
 * Example: one distinct colour per sovereign Commonwealth member on this map.
 * Only those countries appear in the table — everything else stays the default map fill.
 */
export function buildCommonwealthExampleTable(): string {
  const header = `Region\tCategory\tColor`;
  const entries: CommonwealthSortEntry[] = [{ kind: "canada" }];

  for (const [iso, label] of Object.entries(MAP_COUNTRY_ISO_A3_TO_NAME)) {
    if (!COMMONWEALTH_MEMBER_ISO_A3.has(iso)) continue;
    entries.push({ kind: "country", label });
  }

  const collator = new Intl.Collator("en", { sensitivity: "base" });
  entries.sort((a, b) => {
    const nameA = a.kind === "canada" ? "Canada" : a.label;
    const nameB = b.kind === "canada" ? "Canada" : b.label;
    return collator.compare(nameA, nameB);
  });

  const lines: string[] = [];
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]!;
    const color = hslDistinct(i);
    if (entry.kind === "canada") {
      for (const prov of CANADA_REGION_NAMES) {
        lines.push(`${prov}\tCanada\t${color}`);
      }
    } else {
      lines.push(`${entry.label}\t${entry.label}\t${color}`);
    }
  }

  return [header, ...lines].join("\n");
}
