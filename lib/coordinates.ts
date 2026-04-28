import proj4 from "proj4";

// Define EPSG:5186 (Korean 2000 / Central Belt 2010)
proj4.defs(
  "EPSG:5186",
  "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);

// Convert from EPSG:5186 to WGS84 (EPSG:4326)
export function convertToWGS84(x: number, y: number): [number, number] {
  const [lng, lat] = proj4("EPSG:5186", "EPSG:4326", [x, y]);
  return [lng, lat];
}

// Convert GeoJSON coordinates from EPSG:5186 to WGS84
export function convertGeoJSONToWGS84(geojson: GeoJSON.FeatureCollection): GeoJSON.FeatureCollection {
  const converted: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: geojson.features.map((feature) => {
      const geometry = feature.geometry;
      
      if (geometry.type === "LineString") {
        return {
          ...feature,
          geometry: {
            ...geometry,
            coordinates: (geometry.coordinates as [number, number][]).map(([x, y]) => 
              convertToWGS84(x, y)
            ),
          },
        };
      }
      
      if (geometry.type === "MultiLineString") {
        return {
          ...feature,
          geometry: {
            ...geometry,
            coordinates: (geometry.coordinates as [number, number][][]).map((line) =>
              line.map(([x, y]) => convertToWGS84(x, y))
            ),
          },
        };
      }
      
      if (geometry.type === "Point") {
        const [x, y] = geometry.coordinates as [number, number];
        return {
          ...feature,
          geometry: {
            ...geometry,
            coordinates: convertToWGS84(x, y),
          },
        };
      }
      
      if (geometry.type === "Polygon") {
        return {
          ...feature,
          geometry: {
            ...geometry,
            coordinates: (geometry.coordinates as [number, number][][]).map((ring) =>
              ring.map(([x, y]) => convertToWGS84(x, y))
            ),
          },
        };
      }
      
      if (geometry.type === "MultiPolygon") {
        return {
          ...feature,
          geometry: {
            ...geometry,
            coordinates: (geometry.coordinates as [number, number][][][]).map((polygon) =>
              polygon.map((ring) => ring.map(([x, y]) => convertToWGS84(x, y)))
            ),
          },
        };
      }
      
      return feature;
    }),
  };
  
  return converted;
}

// Get center of Hwaseong area (approximate)
export const HWASEONG_CENTER: [number, number] = [127.0068, 37.4832];
export const DEFAULT_ZOOM = 13;
