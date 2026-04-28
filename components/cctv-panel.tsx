"use client";

import { X, RefreshCw } from "lucide-react";

interface CCTVPanelProps {
  id: string;
  onClose: () => void;
}

export function CCTVPanel({ id, onClose }: CCTVPanelProps) {
  return (
    <div className="absolute right-4 top-16 w-[280px] bg-panel/95 backdrop-blur-sm rounded-lg border border-border overflow-hidden z-30">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <span className="text-sm font-medium text-primary">{id} CCTV</span>
        <button onClick={onClose} className="p-1 hover:bg-muted rounded">
          <X size={14} className="text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-3">
          <span className="text-xs text-muted-foreground">
            해당 EdgeRSU에 CCTV 정보를 찾을 수 없습니다.
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">자동 재시도</span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-4 bg-muted rounded-full flex items-center px-0.5">
              <div className="w-3 h-3 bg-muted-foreground rounded-full" />
            </div>
            <button className="p-1 hover:bg-muted rounded">
              <RefreshCw size={14} className="text-muted-foreground" />
            </button>
            <button className="p-1 hover:bg-muted rounded">
              <X size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
