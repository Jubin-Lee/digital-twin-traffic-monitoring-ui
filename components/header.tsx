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
    <header className="fixed top-0 left-0 right-0 h-12 bg-header border-b border-border flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
          <span className="text-white text-xs font-bold">A</span>
        </div>
        <h1 className="text-sm font-medium text-foreground">
          자율차-일반차 혼재상황 대비 AI기반 자율주행모빌리티 운영 플랫폼
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* View Mode Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">관제모드</span>
          <div className="flex bg-muted rounded-md p-0.5">
            {(["WIDE", "LIVE", "DIVE"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  viewMode === mode
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode}
                <span className="ml-1 text-primary">●</span>
              </button>
            ))}
          </div>
        </div>

        {/* Toast Alarm */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">토스트 알림</span>
          <div className="flex bg-muted rounded-md p-0.5">
            <button
              onClick={() => onToastEnabledChange(true)}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                toastEnabled
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ON<span className="ml-1 text-green-500">●</span>
            </button>
            <button
              onClick={() => onToastEnabledChange(false)}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                !toastEnabled
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              OFF<span className="ml-1 text-gray-500">●</span>
            </button>
          </div>
        </div>

        {/* Display Mode */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">표출화면</span>
          <select
            value={displayMode}
            onChange={(e) => onDisplayModeChange(e.target.value)}
            className="bg-muted border-none rounded-md px-3 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="통합 모니터링">통합 모니터링</option>
            <option value="트래킹 화면">트래킹 화면</option>
            <option value="이벤트 화면">이벤트 화면</option>
          </select>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-muted rounded-md transition-colors">
            <User size={18} className="text-foreground/70" />
          </button>
          <button className="p-2 hover:bg-muted rounded-md transition-colors">
            <Menu size={18} className="text-foreground/70" />
          </button>
        </div>
      </div>
    </header>
  );
}
