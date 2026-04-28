"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { HWASEONG_CENTER, DEFAULT_ZOOM, convertGeoJSONToWGS84 } from "@/lib/coordinates";
import { TrafficEvent, EdgeRSUData, AutonomousVehicle } from "@/lib/types";

interface MapViewProps {
  events: TrafficEvent[];
  edgeRSUs: EdgeRSUData[];
  autonomousVehicles: AutonomousVehicle[];
  selectedEvent: TrafficEvent | null;
  onEventClick: (event: TrafficEvent) => void;
}

export function MapView({
  events,
  edgeRSUs,
  autonomousVehicles,
  selectedEvent,
  onEventClick,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const loadGeoJSONData = useCallback(async (mapInstance: maplibregl.Map) => {
    const files = [
      { name: "A2_LINK", color: "#3b82f6", width: 3 },
      { name: "A3_DRIVEWAYSECTION", color: "#1e40af", width: 2 },
      { name: "B2_SURFACELINEMARK", color: "#94a3b8", width: 1 },
    ];

    for (const file of files) {
      try {
        const response = await fetch(`/data/${file.name}.json`);
        if (!response.ok) continue;
        
        const data = await response.json();
        const convertedData = convertGeoJSONToWGS84(data);
        
        const sourceId = `source-${file.name}`;
        const layerId = `layer-${file.name}`;

        if (!mapInstance.getSource(sourceId)) {
          mapInstance.addSource(sourceId, {
            type: "geojson",
            data: convertedData,
          });

          mapInstance.addLayer({
            id: layerId,
            type: "line",
            source: sourceId,
            paint: {
              "line-color": file.color,
              "line-width": file.width || 2,
              "line-opacity": 0.8,
            },
          });
        }
      } catch (error) {
        console.log(`[v0] Could not load ${file.name}:`, error);
      }
    }
  }, []);

  const addMarkers = useCallback((mapInstance: maplibregl.Map) => {
    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add event markers
    events.forEach((event) => {
      if (event.gpsCoordinates) {
        const el = document.createElement("div");
        el.className = "event-marker";
        el.innerHTML = `
          <div class="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 ${
            event.status === "신규"
              ? "bg-orange-500"
              : event.status === "트래킹"
              ? "bg-blue-500"
              : "bg-green-500"
          } ${selectedEvent?.id === event.id ? "ring-2 ring-white scale-125" : ""}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        `;
        
        el.addEventListener("click", () => onEventClick(event));

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([event.gpsCoordinates.lng, event.gpsCoordinates.lat])
          .addTo(mapInstance);
        
        markersRef.current.push(marker);
      }
    });

    // Add EdgeRSU markers
    edgeRSUs.forEach((rsu) => {
      const el = document.createElement("div");
      el.className = "rsu-marker";
      el.innerHTML = `
        <div class="w-5 h-5 rounded flex items-center justify-center ${
          rsu.status === "online"
            ? "bg-emerald-500"
            : rsu.status === "warning"
            ? "bg-yellow-500"
            : "bg-red-500"
        }">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
      `;

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([rsu.location.lng, rsu.location.lat])
        .addTo(mapInstance);
      
      markersRef.current.push(marker);
    });

    // Add autonomous vehicle markers
    autonomousVehicles.forEach((vehicle) => {
      const el = document.createElement("div");
      el.className = "vehicle-marker";
      el.innerHTML = `
        <div class="w-6 h-6 rounded flex items-center justify-center ${
          vehicle.status === "running"
            ? "bg-cyan-500"
            : vehicle.status === "stopped"
            ? "bg-gray-500"
            : "bg-yellow-500"
        }" style="transform: rotate(${vehicle.heading}deg)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
          </svg>
        </div>
      `;

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([vehicle.location.lng, vehicle.location.lat])
        .addTo(mapInstance);
      
      markersRef.current.push(marker);
    });
  }, [events, edgeRSUs, autonomousVehicles, selectedEvent, onEventClick]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
              "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
              "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
            ],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
        ],
      },
      center: HWASEONG_CENTER,
      zoom: DEFAULT_ZOOM,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "bottom-right");
    map.current.addControl(new maplibregl.ScaleControl(), "bottom-left");

    map.current.on("load", () => {
      setMapLoaded(true);
      if (map.current) {
        loadGeoJSONData(map.current);
      }
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      map.current?.remove();
      map.current = null;
    };
  }, [loadGeoJSONData]);

  useEffect(() => {
    if (mapLoaded && map.current) {
      addMarkers(map.current);
    }
  }, [mapLoaded, addMarkers]);

  useEffect(() => {
    if (selectedEvent?.gpsCoordinates && map.current) {
      map.current.flyTo({
        center: [selectedEvent.gpsCoordinates.lng, selectedEvent.gpsCoordinates.lat],
        zoom: 16,
        duration: 1000,
      });
    }
  }, [selectedEvent]);

  return (
    <div ref={mapContainer} className="absolute inset-0" />
  );
}
