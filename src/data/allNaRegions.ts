/**
 * Names as they appear in map boundaries (us-atlas, Click That Hood Canada,
 * public/geo/mexico-states.json) so pasted rows resolve correctly.
 */

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

const DEFAULT_CATEGORY = "-";
/** Same default fill as unmatched regions on the map. */
const DEFAULT_COLOR = "#e4e4e7";

/** Tab-separated table with header: every US division on the map, then Canada, then Mexico. */
export function buildFullRegionTable(): string {
  const header = `State/province\tCategory\tColor`;
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
  return lines.join("\n");
}
