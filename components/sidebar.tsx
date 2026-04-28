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
  { id: "통합정보", icon: <Building2 size={18} />, label: "돌발정보" },
  { id: "이벤트정보", icon: <AlertTriangle size={18} />, label: "이벤트정보", hasAlert: true },
  { id: "EdgeRSU", icon: <Radio size={18} />, label: "EdgeRSU" },
  { id: "자율차", icon: <Car size={18} />, label: "자율차" },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-10 h-[calc(100vh-40px)] w-14 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col z-40">
      {/* Title */}
      <div className="px-2 py-3 border-b border-[#1a1a1a]">
        <h2 className="text-[11px] font-medium text-white/90 text-center leading-tight">통합상황판</h2>
      </div>
      
      {/* Menu Toggle */}
      <button className="flex items-center justify-center gap-1 py-2 px-1 text-[10px] font-medium text-white/70 hover:bg-white/5 transition-colors border-b border-[#1a1a1a]">
        <span>MENU</span>
        <ChevronDown size={10} />
      </button>
      
      {/* Navigation */}
      <nav className="flex-1 py-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex flex-col items-center gap-0.5 py-2.5 px-1 text-[10px] transition-all relative ${
              activeSection === item.id
                ? "bg-primary/10 text-primary"
                : "text-white/50 hover:bg-white/5 hover:text-white/70"
            }`}
          >
            {activeSection === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
            )}
            <div className="relative">
              {item.icon}
              {item.hasAlert && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
              )}
            </div>
            <span className="leading-tight text-center whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
