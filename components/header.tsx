"use client";

import { User, Menu } from "lucide-react";
import { ViewMode } from "@/lib/types";

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  toastEnabled: boolean;
  onToastEnabledChange: (enabled: boolean) => void;
  displayMode: string;
  onDisplayModeChange: (mode: string) => void;
}

export function Header({
  viewMode,
  onViewModeChange,
  toastEnabled,
  onToastEnabledChange,
  displayMode,
  onDisplayModeChange,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-10 bg-[#0a0a0a] border-b border-[#1a1a1a] flex items-center justify-between px-3 z-50">
      {/* Left: Logo and Title */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">A</span>
        </div>
        <h1 className="text-xs font-medium text-white/90">
          자율차-일반차 혼재상황 대비 AI기반 자율주행모빌리티 운영 플랫폼
        </h1>
      </div>

      {/* Center: View Mode Controls */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
        {/* View Mode Selector */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/60">관제모드</span>
          <div className="flex bg-[#1a1a1a] rounded p-0.5 gap-0.5">
            {(["WIDE", "LIVE", "DIVE"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded transition-all flex items-center gap-1 ${
                  viewMode === mode
                    ? "bg-[#252525] text-white"
                    : "text-white/50 hover:text-white/70"
                }`}
              >
                {mode}
                <span className={`w-1.5 h-1.5 rounded-full ${viewMode === mode ? "bg-cyan-400" : "bg-white/30"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Toast + Display Mode + User */}
      <div className="flex items-center gap-4">
        {/* Toast Alarm */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/60">토스트 알림</span>
          <div className="flex bg-[#1a1a1a] rounded p-0.5 gap-0.5">
            <button
              onClick={() => onToastEnabledChange(true)}
              className={`px-2 py-1 text-[11px] font-medium rounded transition-all flex items-center gap-1 ${
                toastEnabled
                  ? "bg-[#252525] text-white"
                  : "text-white/50 hover:text-white/70"
              }`}
            >
              ON
              <span className={`w-1.5 h-1.5 rounded-full ${toastEnabled ? "bg-green-500" : "bg-white/30"}`} />
            </button>
            <button
              onClick={() => onToastEnabledChange(false)}
              className={`px-2 py-1 text-[11px] font-medium rounded transition-all flex items-center gap-1 ${
                !toastEnabled
                  ? "bg-[#252525] text-white"
                  : "text-white/50 hover:text-white/70"
              }`}
            >
              OFF
              <span className={`w-1.5 h-1.5 rounded-full ${!toastEnabled ? "bg-gray-500" : "bg-white/30"}`} />
            </button>
          </div>
        </div>

        {/* Display Mode */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/60">표출화면</span>
          <select
            value={displayMode}
            onChange={(e) => onDisplayModeChange(e.target.value)}
            className="bg-[#1a1a1a] border-none rounded px-2.5 py-1 text-[11px] text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 cursor-pointer"
          >
            <option value="통합 모니터링">통합 모니터링</option>
            <option value="트래킹 화면">트래킹 화면</option>
            <option value="이벤트 화면">이벤트 화면</option>
          </select>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-1 pl-2 border-l border-[#222]">
          <button className="p-1.5 hover:bg-white/5 rounded transition-colors">
            <User size={16} className="text-white/60" />
          </button>
          <button className="p-1.5 hover:bg-white/5 rounded transition-colors">
            <Menu size={16} className="text-white/60" />
          </button>
        </div>
      </div>
    </header>
  );
}
