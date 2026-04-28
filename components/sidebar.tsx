"use client";

import { Building2, AlertTriangle, Radio, Car, ChevronDown } from "lucide-react";
import { MenuSection } from "@/lib/types";

interface SidebarProps {
  activeSection: MenuSection;
  onSectionChange: (section: MenuSection) => void;
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

const menuItems: { id: MenuSection; icon: React.ReactNode; label: string; hasAlert?: boolean }[] = [
  { id: "통합정보", icon: <Building2 size={20} />, label: "통합정보" },
  { id: "이벤트정보", icon: <AlertTriangle size={20} />, label: "이벤트정보", hasAlert: true },
  { id: "EdgeRSU", icon: <Radio size={20} />, label: "EdgeRSU" },
  { id: "자율차", icon: <Car size={20} />, label: "자율차" },
];

export function Sidebar({ activeSection, onSectionChange, isExpanded, onExpandedChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-12 h-[calc(100vh-48px)] w-16 bg-sidebar border-r border-border flex flex-col z-40">
      <button
        onClick={() => onExpandedChange(!isExpanded)}
        className="flex items-center justify-center gap-2 py-3 px-2 text-xs font-medium text-foreground/80 hover:bg-muted/50 transition-colors border-b border-border"
      >
        <span>MENU</span>
        <ChevronDown
          size={14}
          className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>
      
      <nav className="flex-1 py-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex flex-col items-center gap-1 py-3 px-2 text-xs transition-colors relative ${
              activeSection === item.id
                ? "bg-primary/20 text-primary border-l-2 border-primary"
                : "text-foreground/60 hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            <div className="relative">
              {item.icon}
              {item.hasAlert && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
              )}
            </div>
            <span className="text-[10px] leading-tight text-center">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
