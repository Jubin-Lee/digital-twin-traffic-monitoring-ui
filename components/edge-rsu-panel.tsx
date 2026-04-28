"use client";

import { MoreHorizontal } from "lucide-react";
import { EdgeRSUData } from "@/lib/types";

interface EdgeRSUPanelProps {
  data: EdgeRSUData;
}

export function EdgeRSUPanel({ data }: EdgeRSUPanelProps) {
  const totalVehicles = data.vehicleCount + data.zoneVehicleCount;
  const edgePercent = (data.vehicleCount / totalVehicles) * 100;
  const zonePercent = (data.zoneVehicleCount / totalVehicles) * 100;

  return (
    <div className="absolute right-4 top-4 w-[280px] bg-panel/95 backdrop-blur-sm rounded-lg border border-border overflow-hidden z-30">
      {/* Header */}
      <div className="bg-destructive/90 px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-medium text-white">{data.name || "정지차량"}</span>
        <button className="text-white/80 hover:text-white px-3 py-1 bg-white/10 rounded text-xs">
          위치보기 +
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground">EdgeRSU 상태현황</span>
          <button className="p-1 hover:bg-muted rounded">
            <MoreHorizontal size={14} className="text-muted-foreground" />
          </button>
        </div>

        {/* Circular Charts */}
        <div className="flex items-center justify-center gap-6 py-4">
          {/* EdgeRSU Count */}
          <div className="relative">
            <svg className="w-20 h-20 -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-muted/30"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="6"
                strokeDasharray={`${edgePercent * 2.01} ${200 - edgePercent * 2.01}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{data.vehicleCount}</span>
            </div>
            <span className="block text-center text-[10px] text-muted-foreground mt-1">EdgeRSU</span>
          </div>

          {/* Zone Count */}
          <div className="relative">
            <svg className="w-20 h-20 -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-muted/30"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="url(#gradient2)"
                strokeWidth="6"
                strokeDasharray={`${zonePercent * 2.01} ${200 - zonePercent * 2.01}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{data.zoneVehicleCount}</span>
            </div>
            <span className="block text-center text-[10px] text-muted-foreground mt-1">Zone 별 세부현황</span>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center text-[10px] text-muted-foreground mb-3">
          연계차: {totalVehicles}대
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 text-[10px]">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-muted-foreground">정상</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="text-muted-foreground">주의</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-muted-foreground">경고</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-muted-foreground">장애발생</span>
          </div>
        </div>
      </div>
    </div>
  );
}
