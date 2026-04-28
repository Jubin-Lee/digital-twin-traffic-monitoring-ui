export type ViewMode = "WIDE" | "LIVE" | "DIVE";

export type MenuSection = "통합정보" | "이벤트정보" | "EdgeRSU" | "자율차";

export interface TrafficEvent {
  id: number;
  category: string;
  ipAddress: string;
  eventType: string;
  timestamp: string;
  status: "트래킹" | "신규" | "완료";
  location?: {
    lat: number;
    lng: number;
  };
  sensorId?: string;
  gpsCoordinates?: {
    lat: number;
    lng: number;
  };
  cctvImage?: string;
}

export interface EdgeRSUData {
  id: string;
  name: string;
  status: "online" | "offline" | "warning";
  vehicleCount: number;
  zoneVehicleCount: number;
  lastUpdate: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface AutonomousVehicle {
  id: string;
  name: string;
  status: "running" | "stopped" | "warning";
  speed: number;
  location: {
    lat: number;
    lng: number;
  };
  heading: number;
}

export interface MapLayers {
  roads: boolean;
  intersections: boolean;
  edgeRSU: boolean;
  vehicles: boolean;
  events: boolean;
}
