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
    // Define layer configurations - load in order (bottom to top)
    const files = [
      { name: "B3_SURFACEMARK", color: "#334155", width: 0.5, opacity: 0.3 },
      { name: "B2_SURFACELINEMARK", color: "#475569", width: 0.5, opacity: 0.4 },
      { name: "A3_DRIVEWAYSECTION", color: "#1e40af", width: 1.5, opacity: 0.5 },
      { name: "A2_LINK", color: "#3b82f6", width: 2.5, opacity: 0.9 },
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

          // Determine geometry type from first feature
          const firstFeature = convertedData.features[0];
          const geomType = firstFeature?.geometry?.type;

          if (geomType === "Polygon" || geomType === "MultiPolygon") {
            mapInstance.addLayer({
              id: layerId,
              type: "fill",
              source: sourceId,
              paint: {
                "fill-color": file.color,
                "fill-opacity": file.opacity || 0.5,
              },
            });
            // Add outline
            mapInstance.addLayer({
              id: `${layerId}-outline`,
              type: "line",
              source: sourceId,
              paint: {
                "line-color": file.color,
                "line-width": 0.5,
                "line-opacity": (file.opacity || 0.5) + 0.2,
              },
            });
          } else {
            mapInstance.addLayer({
              id: layerId,
              type: "line",
              source: sourceId,
              paint: {
                "line-color": file.color,
                "line-width": file.width || 2,
                "line-opacity": file.opacity || 0.8,
              },
            });
          }
        }
      } catch {
        // Skip files that fail to load
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
        
        const isSelected = selectedEvent?.id === event.id;
        const bgColor = event.status === "신규" ? "#f97316" : event.status === "트래킹" ? "#3b82f6" : "#22c55e";
        
        el.innerHTML = `
          <div style="
            width: ${isSelected ? "28px" : "22px"};
            height: ${isSelected ? "28px" : "22px"};
            border-radius: 50%;
            background: ${bgColor};
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            ${isSelected ? "ring: 2px solid white;" : ""}
          ">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
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
      const bgColor = rsu.status === "online" ? "#22c55e" : rsu.status === "warning" ? "#eab308" : "#ef4444";
      
      el.innerHTML = `
        <div style="
          width: 18px;
          height: 18px;
          border-radius: 4px;
          background: ${bgColor};
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        ">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
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
      const bgColor = vehicle.status === "running" ? "#06b6d4" : vehicle.status === "stopped" ? "#64748b" : "#eab308";
      
      el.innerHTML = `
        <div style="
          width: 24px;
          height: 24px;
          border-radius: 4px;
          background: ${bgColor};
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(${vehicle.heading}deg);
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        ">
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
          carto: {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
              "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
              "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
            ],
            tileSize: 256,
            attribution: 'MapLibre | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        },
        layers: [
          {
            id: "carto-basemap",
            type: "raster",
            source: "carto",
            minzoom: 0,
            maxzoom: 22,
          },
        ],
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
      },
      center: HWASEONG_CENTER,
      zoom: DEFAULT_ZOOM,
      maxZoom: 18,
      minZoom: 10,
    });

    // Add navigation controls
    map.current.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "bottom-right"
    );

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
        zoom: 15,
        duration: 800,
      });
    }
  }, [selectedEvent]);

  return (
    <div ref={mapContainer} className="absolute inset-0 bg-[#0d0d0d]" />
  );
}
