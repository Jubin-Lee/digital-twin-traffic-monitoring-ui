"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { TrafficEvent } from "@/lib/types";

interface EventDetailProps {
  event: TrafficEvent;
  onConfirm: () => void;
  onComplete: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export function EventDetail({ event, onConfirm, onComplete, onNavigate }: EventDetailProps) {
  return (
    <div className="absolute left-16 top-0 w-[380px] h-full bg-panel/95 backdrop-blur-sm border-r border-border z-30 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span className="text-primary">←</span>
          <span>트래킹 모드</span>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded">인프라</span>
              <span className="text-sm font-medium text-foreground">{event.eventType}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">CCTV 영상</span>
              <div className="w-8 h-4 bg-primary/30 rounded-full flex items-center justify-end px-0.5">
                <div className="w-3 h-3 bg-primary rounded-full" />
              </div>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">{event.ipAddress}</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-muted-foreground block mb-1">분류</span>
            <span className="text-foreground">{event.category}</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">상세유형</span>
            <span className="text-foreground">{event.eventType}</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">센서 ID</span>
            <span className="text-foreground">{event.sensorId || "N/A"}</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">발생일시</span>
            <span className="text-foreground">{event.timestamp}</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">송신일시</span>
            <span className="text-foreground">{event.timestamp}</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">위치 (GPS)</span>
            <span className="text-foreground">
              {event.gpsCoordinates
                ? `${event.gpsCoordinates.lat.toFixed(7)}, ${event.gpsCoordinates.lng.toFixed(7)}`
                : "N/A"}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <span className="text-muted-foreground text-xs block mb-1">처리상태</span>
          <span className="text-foreground text-sm font-medium">{event.status}</span>
        </div>
      </div>

      {/* Event Screenshot */}
      <div className="px-4 flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-primary">이벤트 스틸컷</span>
          <button className="p-1 hover:bg-muted rounded">
            <MoreHorizontal size={14} className="text-muted-foreground" />
          </button>
        </div>
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <span className="text-muted-foreground text-xs">이벤트 이미지</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border flex items-center gap-2">
        <button
          onClick={() => onNavigate("prev")}
          className="p-2 hover:bg-muted rounded transition-colors"
        >
          <ChevronLeft size={20} className="text-muted-foreground" />
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2 bg-muted hover:bg-muted/80 text-foreground text-sm font-medium rounded transition-colors"
        >
          확인
        </button>
        <button
          onClick={onComplete}
          className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-foreground text-sm font-medium rounded transition-colors"
        >
          종료
        </button>
        <button
          onClick={() => onNavigate("next")}
          className="p-2 hover:bg-muted rounded transition-colors"
        >
          <ChevronRight size={20} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
