import { TrafficEvent, EdgeRSUData, AutonomousVehicle } from "./types";

export const mockEvents: TrafficEvent[] = [
  {
    id: 1,
    category: "인프라",
    ipAddress: "127.0.0.1",
    eventType: "보행자침입",
    timestamp: "2026.04.07 10:58:53",
    status: "트래킹",
    sensorId: "FEQ1011001",
    gpsCoordinates: { lat: 37.4832300, lng: 127.0068600 },
  },
  {
    id: 2,
    category: "인프라",
    ipAddress: "127.0.0.1",
    eventType: "정지차량",
    timestamp: "2026.04.07 10:58:03",
    status: "신규",
    sensorId: "FEQ1011001",
    gpsCoordinates: { lat: 37.4815, lng: 127.0045 },
  },
  {
    id: 3,
    category: "인프라",
    ipAddress: "127.0.0.1",
    eventType: "보행자침입",
    timestamp: "2026.03.30 17:54:50",
    status: "트래킹",
    sensorId: "FEQ1011002",
    gpsCoordinates: { lat: 37.4850, lng: 127.0090 },
  },
  {
    id: 4,
    category: "인프라",
    ipAddress: "127.0.0.1",
    eventType: "정지차량",
    timestamp: "2026.03.30 14:25:56",
    status: "트래킹",
    sensorId: "FEQ1011003",
    gpsCoordinates: { lat: 37.4800, lng: 127.0020 },
  },
];

export const mockEdgeRSUs: EdgeRSUData[] = [
  {
    id: "RSU001",
    name: "동탄역 교차로",
    status: "online",
    vehicleCount: 83,
    zoneVehicleCount: 47,
    lastUpdate: "2026.04.07 10:58:03",
    location: { lat: 37.4832, lng: 127.0068 },
  },
  {
    id: "RSU002",
    name: "동탄 센트럴파크",
    status: "online",
    vehicleCount: 56,
    zoneVehicleCount: 32,
    lastUpdate: "2026.04.07 10:57:45",
    location: { lat: 37.4810, lng: 127.0040 },
  },
  {
    id: "RSU003",
    name: "화성시청 앞",
    status: "warning",
    vehicleCount: 42,
    zoneVehicleCount: 28,
    lastUpdate: "2026.04.07 10:56:30",
    location: { lat: 37.4780, lng: 127.0095 },
  },
];

export const mockAutonomousVehicles: AutonomousVehicle[] = [
  {
    id: "AV001",
    name: "자율차-001",
    status: "running",
    speed: 45,
    location: { lat: 37.4835, lng: 127.0055 },
    heading: 45,
  },
  {
    id: "AV002",
    name: "자율차-002",
    status: "running",
    speed: 32,
    location: { lat: 37.4820, lng: 127.0080 },
    heading: 180,
  },
  {
    id: "AV003",
    name: "자율차-003",
    status: "stopped",
    speed: 0,
    location: { lat: 37.4805, lng: 127.0030 },
    heading: 90,
  },
];
