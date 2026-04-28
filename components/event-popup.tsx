"use client";

import { TrafficEvent } from "@/lib/types";

interface EventPopupProps {
  event: TrafficEvent;
  onTrackingMode: () => void;
}

export function EventPopup({ event, onTrackingMode }: EventPopupProps) {
  return (
    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-panel/95 backdrop-blur-sm rounded-lg border border-border overflow-hidden z-40 min-w-[300px]">
      {/* Header */}
      <div className="bg-primary/90 px-4 py-2 flex items-center gap-2">
        <span className="px-2 py-0.5 bg-white/20 rounded text-xs text-white">이벤트</span>
        <span className="text-sm font-medium text-white">{event.eventType}</span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">분류/ID</span>
          <span className="text-foreground">{event.category} / {event.ipAddress}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">센서 ID</span>
          <span className="text-foreground">{event.sensorId || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">발생일</span>
          <span className="text-foreground">{event.timestamp.split(" ")[0]}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">시</span>
          <span className="text-foreground">{event.timestamp.split(" ")[1]}+00:00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">처리상태</span>
          <span className="text-foreground">{event.status}</span>
        </div>
      </div>

      {/* Action */}
      <div className="px-4 pb-4">
        <button
          onClick={onTrackingMode}
          className="w-full py-2 bg-primary/20 hover:bg-primary/30 text-primary text-sm font-medium rounded transition-colors"
        >
          트래킹모드
        </button>
      </div>
    </div>
  );
}
