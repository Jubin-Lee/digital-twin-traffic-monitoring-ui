"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from "lucide-react";
import { TrafficEvent } from "@/lib/types";

interface EventPanelProps {
  events: TrafficEvent[];
  onEventSelect: (event: TrafficEvent) => void;
  selectedEvent: TrafficEvent | null;
  onClose: () => void;
}

export function EventPanel({ events, onEventSelect, selectedEvent, onClose }: EventPanelProps) {
  const [dateRange] = useState({ start: "2026.03.28", end: "2026.04.28" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(events.length / itemsPerPage);

  return (
    <div className="absolute left-16 top-0 w-[440px] h-full bg-panel/95 backdrop-blur-sm border-r border-border z-30 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
            <span className="text-primary">←</span>
            트래킹 모드
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded">
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">
            {dateRange.start} ~ {dateRange.end}
          </span>
          <select className="bg-muted border-none rounded px-2 py-1 text-foreground">
            <option>전체</option>
          </select>
          <select className="bg-muted border-none rounded px-2 py-1 text-foreground">
            <option>월단위</option>
          </select>
          <input
            type="text"
            placeholder="검색"
            className="bg-muted border-none rounded px-2 py-1 text-foreground placeholder:text-muted-foreground w-20"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="bg-muted/50 sticky top-0">
            <tr className="text-muted-foreground">
              <th className="py-2 px-3 text-left font-medium">No</th>
              <th className="py-2 px-3 text-left font-medium">분류</th>
              <th className="py-2 px-3 text-left font-medium">아이디</th>
              <th className="py-2 px-3 text-left font-medium">유형</th>
              <th className="py-2 px-3 text-left font-medium">발생일시 ↓</th>
              <th className="py-2 px-3 text-left font-medium">처리</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                onClick={() => onEventSelect(event)}
                className={`border-b border-border/50 cursor-pointer transition-colors ${
                  selectedEvent?.id === event.id
                    ? "bg-primary/20"
                    : "hover:bg-muted/30"
                }`}
              >
                <td className="py-2 px-3 text-foreground">{event.id}</td>
                <td className="py-2 px-3 text-foreground">{event.category}</td>
                <td className="py-2 px-3 text-foreground">{event.ipAddress}</td>
                <td className="py-2 px-3 text-foreground">{event.eventType}</td>
                <td className="py-2 px-3 text-foreground">{event.timestamp}</td>
                <td className="py-2 px-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      event.status === "트래킹"
                        ? "bg-blue-500/20 text-blue-400"
                        : event.status === "신규"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {event.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-3 border-t border-border flex items-center justify-between">
        <span className="text-xs text-primary">
          Total <span className="font-medium">{events.length}</span> / {events.length}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-1 hover:bg-muted rounded disabled:opacity-50"
          >
            <ChevronsLeft size={14} />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 hover:bg-muted rounded disabled:opacity-50"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="px-3 py-1 bg-muted rounded text-xs">{currentPage}</span>
          <span className="text-xs text-muted-foreground">/ {totalPages || 1}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 hover:bg-muted rounded disabled:opacity-50"
          >
            <ChevronRight size={14} />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-1 hover:bg-muted rounded disabled:opacity-50"
          >
            <ChevronsRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
