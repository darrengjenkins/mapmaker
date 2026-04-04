import { MEXICO_REGION_NAMES } from "./allNaRegions";

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
