"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { feature } from "topojson-client";
import type { FeatureCollection } from "geojson";
import { normalizeRegionName } from "@/lib/normalizeRegionName";
import type { StyledRegion } from "@/lib/parseTable";
import { buildStyleLookup } from "@/lib/parseTable";

const US_TOPO =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const CA_GEO =
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/canada.geojson";

/** Geographic center for initial view (lon, lat) — framed for North America through South America. */
const MAP_CENTER: [number, number] = [-88, 16];
const ZOOM_MIN = 0.4;
const ZOOM_MAX = 12;

type NorthAmericaMapProps = {
  rows: StyledRegion[];
};

export function NorthAmericaMap({ rows }: NorthAmericaMapProps) {
  const [geo, setGeo] = useState<FeatureCollection | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [view, setView] = useState<{
    center: [number, number];
    zoom: number;
  }>({ center: MAP_CENTER, zoom: 1 });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [
          usRaw,
          canada,
          mexico,
          caSaCountries,
          europeCountries,
          asiaCountries,
          africaCountries,
          oceaniaCountries,
          caribbeanCountries,
        ] = await Promise.all([
          fetch(US_TOPO).then((r) => r.json()),
          fetch(CA_GEO).then((r) => r.json()) as Promise<FeatureCollection>,
          fetch("/geo/mexico-states.json").then((r) => r.json()) as Promise<FeatureCollection>,
          fetch("/geo/ca-sa-countries.json").then((r) => r.json()) as Promise<FeatureCollection>,
          fetch("/geo/europe-countries.json").then((r) => r.json()) as Promise<FeatureCollection>,
          fetch("/geo/asia-countries.json").then((r) => r.json()) as Promise<FeatureCollection>,
          fetch("/geo/africa-countries.json").then((r) => r.json()) as Promise<FeatureCollection>,
          fetch("/geo/oceania-countries.json").then((r) => r.json()) as Promise<FeatureCollection>,
          fetch("/geo/caribbean-countries.json").then((r) => r.json()) as Promise<FeatureCollection>,
        ]);
        if (cancelled) return;
        const usAtlas = usRaw as { objects: { states: object } };
        const usFc = feature(
          usRaw as unknown as Parameters<typeof feature>[0],
          usAtlas.objects.states as unknown as Parameters<typeof feature>[1],
        ) as FeatureCollection;
        const merged: FeatureCollection = {
          type: "FeatureCollection",
          features: [
            ...usFc.features,
            ...canada.features,
            ...mexico.features,
            ...caSaCountries.features,
            ...caribbeanCountries.features,
            ...europeCountries.features,
            ...asiaCountries.features,
            ...africaCountries.features,
            ...oceaniaCountries.features,
          ],
        };
        setGeo(merged);
      } catch (e) {
        if (!cancelled) {
          setLoadError(
            e instanceof Error ? e.message : "Failed to load map boundaries.",
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const lookup = useMemo(() => buildStyleLookup(rows), [rows]);
  const defaultFill = "#e4e4e7";

  if (loadError) {
    return (
      <p className="text-sm text-red-600 dark:text-red-400" role="alert">
        {loadError}
      </p>
    );
  }

  if (!geo) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading map…</p>
    );
  }

  const clampZoom = (z: number) =>
    Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z));

  return (
    <div className="w-full space-y-2">
      <div
        className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1.5 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
        aria-label="Map navigation"
      >
        <span className="select-none">Drag to pan · Scroll to zoom</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() =>
              setView((v) => ({
                ...v,
                zoom: clampZoom(v.zoom / 1.25),
              }))
            }
            className="rounded border border-zinc-300 bg-white px-2 py-1 font-medium text-zinc-800 shadow-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            onClick={() =>
              setView((v) => ({
                ...v,
                zoom: clampZoom(v.zoom * 1.25),
              }))
            }
            className="rounded border border-zinc-300 bg-white px-2 py-1 font-medium text-zinc-800 shadow-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            onClick={() =>
              setView({ center: MAP_CENTER, zoom: 1 })
            }
            className="rounded border border-zinc-300 bg-white px-2 py-1 font-medium text-zinc-800 shadow-sm hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Reset view
          </button>
        </div>
      </div>
      <div className="w-full overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-800 dark:bg-zinc-950 [&_svg]:max-h-[70vh] [&_svg]:max-w-full [&_svg]:cursor-grab [&_svg]:touch-none [&_svg:active]:cursor-grabbing">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: MAP_CENTER,
            scale: 320,
          }}
          width={880}
          height={560}
          className="mx-auto [&_svg]:h-auto [&_svg]:w-full"
        >
          <ZoomableGroup
            center={view.center}
            zoom={view.zoom}
            minZoom={ZOOM_MIN}
            maxZoom={ZOOM_MAX}
            onMoveEnd={(pos) => {
              setView({
                center: pos.coordinates,
                zoom: pos.zoom,
              });
            }}
          >
            <Geographies geography={geo}>
              {({ geographies }) =>
                geographies.map((g) => {
                  const p = g.properties as Record<string, unknown> | undefined;
                  const name = String(p?.name ?? p?.ADMIN ?? "");
                  const nk = normalizeRegionName(name);
                  const style = lookup.get(nk);
                  const fill = style?.color?.trim() || defaultFill;
                  return (
                    <Geography
                      key={g.rsmKey}
                      geography={g}
                      fill={fill}
                      stroke="#fafafa"
                      strokeWidth={0.45}
                      style={{
                        default: { outline: "none" },
                        hover: {
                          outline: "none",
                          fill,
                          opacity: 0.92,
                          cursor: "pointer",
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}
