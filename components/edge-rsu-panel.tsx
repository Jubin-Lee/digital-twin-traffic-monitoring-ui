"use client";

import { MoreHorizontal } from "lucide-react";
import { EdgeRSUData } from "@/lib/types";

interface EdgeRSUPanelProps {
  data: EdgeRSUData;
}

export function EdgeRSUPanel({ data }: EdgeRSUPanelProps) {
  const total = data.vehicleCount + data.zoneVehicleCount;
  const edgeRSUPercent = Math.round((data.vehicleCount / 130) * 100);
  const zonePercent = Math.round((data.zoneVehicleCount / 130) * 100);

  // Circle circumference = 2 * PI * radius
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const edgeDashArray = `${(edgeRSUPercent / 100) * circumference} ${circumference}`;
  const zoneDashArray = `${(zonePercent / 100) * circumference} ${circumference}`;

  return (
    <div className="absolute right-3 top-3 w-[260px] bg-[#0f0f0f]/95 backdrop-blur-sm rounded border border-[#222] overflow-hidden z-30">
      {/* Header - Red banner */}
      <div className="bg-gradient-to-r from-[#8b1a1a] to-[#6b1515] px-3 py-2 flex items-center justify-between">
        <span className="text-xs font-medium text-white">{data.name || "정지차량"}</span>
        <button className="text-white/90 hover:text-white px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded text-[10px] transition-colors flex items-center gap-1">
          위치보기
          <span className="text-white/70">+</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-white/50">EdgeRSU 상태현황</span>
          <button className="p-0.5 hover:bg-white/5 rounded">
            <MoreHorizontal size={12} className="text-white/40" />
          </button>
        </div>

        {/* Circular Charts */}
        <div className="flex items-center justify-center gap-5 py-3">
          {/* EdgeRSU Count */}
          <div className="relative flex flex-col items-center">
            <svg className="w-20 h-20" viewBox="0 0 80 80">
              {/* Background circle */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="5"
              />
              {/* Progress arc */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                fill="none"
                stroke="url(#purpleGradient)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={edgeDashArray}
                transform="rotate(-90 40 40)"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-white">{data.vehicleCount}</span>
            </div>
            <span className="text-[9px] text-white/40 mt-1">EdgeRSU</span>
          </div>

          {/* Zone Count */}
          <div className="relative flex flex-col items-center">
            <svg className="w-20 h-20" viewBox="0 0 80 80">
              {/* Background circle */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="5"
              />
              {/* Progress arc */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                fill="none"
                stroke="url(#blueGradient)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={zoneDashArray}
                transform="rotate(-90 40 40)"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-white">{data.zoneVehicleCount}</span>
            </div>
            <span className="text-[9px] text-white/40 mt-1">Zone 별 세부현황</span>
          </div>
        </div>

        {/* Total Stats */}
        <div className="text-center text-[10px] text-white/50 mb-2">
          연계차: {total}대
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-3 text-[9px] pt-2 border-t border-[#1a1a1a]">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-white/40">정상</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            <span className="text-white/40">주의</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-white/40">경고</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="text-white/40">장애발생</span>
          </div>
        </div>
      </div>
    </div>
  );
}
