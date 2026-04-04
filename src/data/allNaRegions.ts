import { ASIA_COUNTRY_ISO_A3_TO_NAME } from "@/lib/asiaCountryIso";
import { EUROPE_COUNTRY_ISO_A3_TO_NAME } from "@/lib/europeCountryIso";

/**
 * Names as they appear on the map:
 * us-atlas, Click That Hood Canada, public/geo/mexico-states.json,
 * public/geo/ca-sa-countries.json, public/geo/europe-countries.json,
 * public/geo/asia-countries.json.
 */

/** Europe (+ Georgia, Cyprus, Turkey, Armenia, Azerbaijan) at country level; labels match `europeCountryIso`. */
export const EUROPE_COUNTRY_NAMES: readonly string[] = Object.values(
  EUROPE_COUNTRY_ISO_A3_TO_NAME,
).sort((a, b) => a.localeCompare(b));

/** Asia at country level (excludes Turkey, Georgia, Armenia, Azerbaijan, Cyprus on the Europe layer). */
export const ASIA_COUNTRY_NAMES: readonly string[] = Object.values(
  ASIA_COUNTRY_ISO_A3_TO_NAME,
).sort((a, b) => a.localeCompare(b));

export const US_ATLAS_REGION_NAMES: readonly string[] = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Commonwealth of the Northern Mariana Islands",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "United States Virgin Islands",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export const CANADA_REGION_NAMES: readonly string[] = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon Territory",
];

export const MEXICO_REGION_NAMES: readonly string[] = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Coahuila",
  "Colima",
  "Distrito Federal",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "México",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
];

/** Country-level boundaries (Central America). Mexico / US / Canada excluded — subdivisions used instead. */
export const CENTRAL_AMERICA_COUNTRY_NAMES: readonly string[] = [
  "Belize",
  "Costa Rica",
  "El Salvador",
  "Guatemala",
  "Honduras",
  "Nicaragua",
  "Panama",
];

/** Country-level boundaries (South America). */
export const SOUTH_AMERICA_COUNTRY_NAMES: readonly string[] = [
  "Argentina",
  "Bolivia",
  "Brazil",
  "Chile",
  "Colombia",
  "Ecuador",
  "Falkland Islands",
  "Guyana",
  "Paraguay",
  "Peru",
  "Suriname",
  "Uruguay",
  "Venezuela",
];

const DEFAULT_CATEGORY = "-";
/** Same default fill as unmatched regions on the map. */
const DEFAULT_COLOR = "#e4e4e7";

/** Tab-separated table with header: all regions the map supports, grouped by area. */
export function buildFullRegionTable(): string {
  const header = `Region\tCategory\tColor`;
  const lines: string[] = [header];
  for (const name of US_ATLAS_REGION_NAMES) {
    lines.push(`${name}\t${DEFAULT_CATEGORY}\t${DEFAULT_COLOR}`);
  }
  for (const name of CANADA_REGION_NAMES) {
    lines.push(`${name}\t${DEFAULT_CATEGORY}\t${DEFAULT_COLOR}`);
  }
  for (const name of MEXICO_REGION_NAMES) {
    lines.push(`${name}\t${DEFAULT_CATEGORY}\t${DEFAULT_COLOR}`);
  }
  for (const name of CENTRAL_AMERICA_COUNTRY_NAMES) {
    lines.push(`${name}\t${DEFAULT_CATEGORY}\t${DEFAULT_COLOR}`);
  }
  for (const name of SOUTH_AMERICA_COUNTRY_NAMES) {
    lines.push(`${name}\t${DEFAULT_CATEGORY}\t${DEFAULT_COLOR}`);
  }
  for (const name of EUROPE_COUNTRY_NAMES) {
    lines.push(`${name}\t${DEFAULT_CATEGORY}\t${DEFAULT_COLOR}`);
  }
  for (const name of ASIA_COUNTRY_NAMES) {
    lines.push(`${name}\t${DEFAULT_CATEGORY}\t${DEFAULT_COLOR}`);
  }
  return lines.join("\n");
}

const US_CATEGORY = "United States";
const US_COLOR = "#2563eb";
const CANADA_CATEGORY = "Canada";
const CANADA_COLOR = "#dc2626";
const MEXICO_CATEGORY = "Mexico";
const MEXICO_COLOR = "#16a34a";
const CENTRAL_AMERICA_CATEGORY = "Central America";
const CENTRAL_AMERICA_COLOR = "#ea580c";
const SOUTH_AMERICA_CATEGORY = "South America";
const SOUTH_AMERICA_COLOR = "#7c3aed";
const EUROPE_CATEGORY = "Europe";
const EUROPE_COLOR = "#0891b2";
const ASIA_CATEGORY = "Asia";
const ASIA_COLOR = "#db2777";

/** Same regions as `buildFullRegionTable`, with colors by country grouping. */
export function buildCountryColoredRegionTable(): string {
  const header = `Region\tCategory\tColor`;
  const lines: string[] = [header];
  for (const name of US_ATLAS_REGION_NAMES) {
    lines.push(`${name}\t${US_CATEGORY}\t${US_COLOR}`);
  }
  for (const name of CANADA_REGION_NAMES) {
    lines.push(`${name}\t${CANADA_CATEGORY}\t${CANADA_COLOR}`);
  }
  for (const name of MEXICO_REGION_NAMES) {
    lines.push(`${name}\t${MEXICO_CATEGORY}\t${MEXICO_COLOR}`);
  }
  for (const name of CENTRAL_AMERICA_COUNTRY_NAMES) {
    lines.push(`${name}\t${CENTRAL_AMERICA_CATEGORY}\t${CENTRAL_AMERICA_COLOR}`);
  }
  for (const name of SOUTH_AMERICA_COUNTRY_NAMES) {
    lines.push(`${name}\t${SOUTH_AMERICA_CATEGORY}\t${SOUTH_AMERICA_COLOR}`);
  }
  for (const name of EUROPE_COUNTRY_NAMES) {
    lines.push(`${name}\t${EUROPE_CATEGORY}\t${EUROPE_COLOR}`);
  }
  for (const name of ASIA_COUNTRY_NAMES) {
    lines.push(`${name}\t${ASIA_CATEGORY}\t${ASIA_COLOR}`);
  }
  return lines.join("\n");
}
