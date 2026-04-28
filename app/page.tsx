"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { EventPanel } from "@/components/event-panel";
import { EventDetail } from "@/components/event-detail";
import { EdgeRSUPanel } from "@/components/edge-rsu-panel";
import { CCTVPanel } from "@/components/cctv-panel";
import { mockEvents, mockEdgeRSUs, mockAutonomousVehicles } from "@/lib/mock-data";
import { ViewMode, MenuSection, TrafficEvent } from "@/lib/types";

// Dynamically import map to avoid SSR issues
const MapView = dynamic(() => import("@/components/map-view").then((mod) => mod.MapView), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-background flex items-center justify-center">
      <div className="text-muted-foreground">지도 로딩중...</div>
    </div>
  ),
});

export default function Home() {
  // UI State
  const [viewMode, setViewMode] = useState<ViewMode>("WIDE");
  const [toastEnabled, setToastEnabled] = useState(true);
  const [displayMode, setDisplayMode] = useState("통합 모니터링");
  const [activeSection, setActiveSection] = useState<MenuSection>("이벤트정보");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // Data State
  const [selectedEvent, setSelectedEvent] = useState<TrafficEvent | null>(null);
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [showCCTV, setShowCCTV] = useState(false);

  const handleEventSelect = useCallback((event: TrafficEvent) => {
    setSelectedEvent(event);
    setShowEventDetail(true);
  }, []);

  const handleEventConfirm = useCallback(() => {
    // Handle event confirmation
    setShowEventDetail(false);
  }, []);

  const handleEventComplete = useCallback(() => {
    setShowEventDetail(false);
    setSelectedEvent(null);
  }, []);

  const handleEventNavigate = useCallback(
    (direction: "prev" | "next") => {
      if (!selectedEvent) return;
      
      const currentIndex = mockEvents.findIndex((e) => e.id === selectedEvent.id);
      let newIndex: number;
      
      if (direction === "prev") {
        newIndex = currentIndex > 0 ? currentIndex - 1 : mockEvents.length - 1;
      } else {
        newIndex = currentIndex < mockEvents.length - 1 ? currentIndex + 1 : 0;
      }
      
      setSelectedEvent(mockEvents[newIndex]);
    },
    [selectedEvent]
  );

  const handleCloseEventPanel = useCallback(() => {
    setActiveSection("통합정보");
    setShowEventDetail(false);
    setSelectedEvent(null);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      {/* Header */}
      <Header
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        toastEnabled={toastEnabled}
        onToastEnabledChange={setToastEnabled}
        displayMode={displayMode}
        onDisplayModeChange={setDisplayMode}
      />

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isExpanded={sidebarExpanded}
        onExpandedChange={setSidebarExpanded}
      />

      {/* Main Content */}
      <main className="absolute top-12 left-16 right-0 bottom-0">
        {/* Map */}
        <MapView
          events={mockEvents}
          edgeRSUs={mockEdgeRSUs}
          autonomousVehicles={mockAutonomousVehicles}
          selectedEvent={selectedEvent}
          onEventClick={handleEventSelect}
        />

        {/* Event Panel (Left Side) */}
        {activeSection === "이벤트정보" && !showEventDetail && (
          <EventPanel
            events={mockEvents}
            onEventSelect={handleEventSelect}
            selectedEvent={selectedEvent}
            onClose={handleCloseEventPanel}
          />
        )}

        {/* Event Detail Panel (Left Side) */}
        {showEventDetail && selectedEvent && (
          <EventDetail
            event={selectedEvent}
            onConfirm={handleEventConfirm}
            onComplete={handleEventComplete}
            onNavigate={handleEventNavigate}
          />
        )}

        {/* EdgeRSU Panel (Right Side) */}
        <EdgeRSUPanel data={mockEdgeRSUs[0]} />

        {/* CCTV Panel (Right Side) */}
        {showCCTV && (
          <CCTVPanel id="127.0.0.1" onClose={() => setShowCCTV(false)} />
        )}

        {/* Map Attribution */}
        <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground bg-background/80 px-2 py-1 rounded">
          MapLibre | &copy; OpenMapTiles &copy; OpenStreetMap contributors
        </div>
      </main>

      {/* Title Overlay */}
      <div className="absolute top-16 left-20 z-20">
        <h2 className="text-lg font-medium text-foreground">통합상황판</h2>
      </div>
    </div>
  );
}
