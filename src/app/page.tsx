"use client";

import { useMemo, useState } from "react";
import { NorthAmericaMap } from "@/components/NorthAmericaMap";
import {
  buildCountryColoredRegionTable,
  buildFullRegionTable,
} from "@/data/allNaRegions";
import {
  buildCommonwealthExampleTable,
  buildRegionalNorthAmericaExampleTable,
} from "@/data/exampleMaps";
import { parseTable } from "@/lib/parseTable";

const EXAMPLE = `Region	Category	Color
California	NW	#2563eb
Texas	SW	#dc2626
Ontario	NE	#16a34a
Quebec	NE	#15803d
Florida	SE	#ca8a04`;

function uniqueLegendPairs(
  rows: ReturnType<typeof parseTable>,
): { category: string; color: string }[] {
  const seen = new Set<string>();
  const out: { category: string; color: string }[] = [];
  for (const r of rows) {
    const key = `${r.category}\t${r.color}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ category: r.category, color: r.color });
  }
  return out;
}

export default function Home() {
  const [text, setText] = useState(EXAMPLE);
  const rows = useMemo(() => parseTable(text), [text]);
  const legend = useMemo(() => uniqueLegendPairs(rows), [rows]);

  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:px-8">
        <header className="space-y-3">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-50">
              <a
                href="https://mapcreator.org"
                className="rounded-sm text-inherit underline-offset-[0.18em] transition-colors hover:text-zinc-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:hover:text-zinc-200"
              >
                mapcreator.org
              </a>
            </h1>
            <p className="text-base text-zinc-600 md:text-lg dark:text-zinc-400">
              Create your own color coded maps in seconds
            </p>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Paste a table with three columns: region (state, province, or
            country), a short category label, and a CSS color (for example hex,{" "}
            <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-800">
              rgb()
            </code>
            , or color names). Tabs, commas, or spaces work between columns.
            US states (including DC and territories on the map), Canadian
            provinces and territories,             Mexican states, Central American, Caribbean, and South
            American countries, European, Asian, African, and Oceania countries
            (whole country, not subdivisions) are supported.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="table-input"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Data table
            </label>
            <textarea
              id="table-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
              className="min-h-[220px] w-full resize-y rounded-lg border border-zinc-300 bg-white p-3 font-mono text-sm text-zinc-900 shadow-sm outline-none ring-zinc-400 placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500"
              placeholder={`Ontario\tNE\t#22c55e`}
            />
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setText(buildFullRegionTable())}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-left text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Fill with all states and provinces
              </button>
              <button
                type="button"
                onClick={() => setText(buildCountryColoredRegionTable())}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-left text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Fill by region group — US blue, Canada red, Mexico green,
                Central America orange, Caribbean teal, South America purple,
                Europe cyan, Asia rose, Africa emerald, Oceania sky blue
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Examples
              </p>
              <button
                type="button"
                onClick={() => setText(buildRegionalNorthAmericaExampleTable())}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-left text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                US & Canada — Regions (New England, Midwest, etc.)
              </button>
              <button
                type="button"
                onClick={() => setText(buildCommonwealthExampleTable())}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-left text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Commonwealth — one colour per member country
              </button>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {rows.length} row{rows.length === 1 ? "" : "s"} parsed
              {rows.length === 0 && text.trim().length > 0
                ? " — check that each line has three values."
                : ""}
            </p>
            {legend.length > 0 && (
              <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Legend
                </p>
                <ul className="flex flex-wrap gap-3 text-sm">
                  {legend.map((item) => (
                    <li
                      key={`${item.category}-${item.color}`}
                      className="flex items-center gap-2"
                    >
                      <span
                        className="size-4 shrink-0 rounded border border-zinc-300 dark:border-zinc-600"
                        style={{ backgroundColor: item.color }}
                        aria-hidden
                      />
                      <span>{item.category}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <NorthAmericaMap rows={rows} />
        </div>
      </div>
    </div>
  );
}
