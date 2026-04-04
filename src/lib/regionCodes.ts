import { AMERICAS_COUNTRY_ISO_A3_TO_NAME } from "./americasCountryIso";
import { AFRICA_COUNTRY_ISO_A3_TO_NAME } from "./africaCountryIso";
import { ASIA_COUNTRY_ISO_A3_TO_NAME } from "./asiaCountryIso";
import { CARIBBEAN_COUNTRY_ISO_A3_TO_NAME } from "./caribbeanCountryIso";
import { EUROPE_COUNTRY_ISO_A3_TO_NAME } from "./europeCountryIso";
import { OCEANIA_COUNTRY_ISO_A3_TO_NAME } from "./oceaniaCountryIso";
import { normalizeRegionName } from "./normalizeRegionName";

const COUNTRY_ISO_A3_TO_NAME: Record<string, string> = {
  ...AMERICAS_COUNTRY_ISO_A3_TO_NAME,
  ...EUROPE_COUNTRY_ISO_A3_TO_NAME,
  ...ASIA_COUNTRY_ISO_A3_TO_NAME,
  ...AFRICA_COUNTRY_ISO_A3_TO_NAME,
  ...OCEANIA_COUNTRY_ISO_A3_TO_NAME,
  ...CARIBBEAN_COUNTRY_ISO_A3_TO_NAME,
};

/** Two-letter USPS codes → full state / district name (us-atlas / GeoJSON). */
export const US_STATE_CODE_TO_NAME: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District of Columbia",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

/** Canada Post–style province / territory abbreviations. */
export const CA_PROVINCE_CODE_TO_NAME: Record<string, string> = {
  AB: "Alberta",
  BC: "British Columbia",
  MB: "Manitoba",
  NB: "New Brunswick",
  NL: "Newfoundland and Labrador",
  NS: "Nova Scotia",
  NT: "Northwest Territories",
  NU: "Nunavut",
  ON: "Ontario",
  PE: "Prince Edward Island",
  QC: "Quebec",
  SK: "Saskatchewan",
  YT: "Yukon Territory",
};

const RARE_SYNONYMS: Record<string, string[]> = {
  dc: ["district of columbia"],
  "washington dc": ["district of columbia"],
  "washington d c": ["district of columbia"],
  yukon: ["yukon territory"],
  pei: ["prince edward island"],
  newfoundland: ["newfoundland and labrador"],
  nfld: ["newfoundland and labrador"],
  labrador: ["newfoundland and labrador"],
  "northwest territories": ["northwest territories"],
  nwt: ["northwest territories"],
  // Mexican Estado de México vs country; GeoJSON uses "México" for the state
  "state of mexico": ["méxico"],
  "mexico state": ["méxico"],
  edomex: ["méxico"],
  cdmx: ["distrito federal"],
  "mexico city": ["distrito federal"],
  malvinas: ["falkland islands"],
  "falkland islas": ["falkland islands"],
  serbia: ["republic of serbia"],
  "cote d'ivoire": ["Ivory Coast"],
  "cape verde": ["Cabo Verde"],
  drc: ["democratic republic of the congo"],
  "dr congo": ["democratic republic of the congo"],
  bahamas: ["the bahamas"],
};

/**
 * Normalized keys that should receive the same fill as a row (user label + codes + synonyms).
 */
export function expandRegionKeys(label: string): string[] {
  const n = normalizeRegionName(label);
  const keys = new Set<string>([n]);
  const upper2 = label.trim().length === 2 ? label.trim().toUpperCase() : null;
  const upper3 = label.trim().length === 3 ? label.trim().toUpperCase() : null;

  if (upper2 && US_STATE_CODE_TO_NAME[upper2]) {
    keys.add(normalizeRegionName(US_STATE_CODE_TO_NAME[upper2]));
  }
  if (upper2 && CA_PROVINCE_CODE_TO_NAME[upper2]) {
    keys.add(normalizeRegionName(CA_PROVINCE_CODE_TO_NAME[upper2]));
  }

  if (upper3 === "PEI") {
    keys.add(normalizeRegionName("Prince Edward Island"));
  }

  if (upper3 && COUNTRY_ISO_A3_TO_NAME[upper3]) {
    keys.add(normalizeRegionName(COUNTRY_ISO_A3_TO_NAME[upper3]));
  }

  for (const extra of RARE_SYNONYMS[n] ?? []) {
    keys.add(normalizeRegionName(extra));
  }

  return [...keys];
}
