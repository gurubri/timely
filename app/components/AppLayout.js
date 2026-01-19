"use client";

import Sidebar from "./Sidebar";
import { useSidebar } from "@/app/context/SidebarContext";

export default function AppLayout({ children }) {
  const { isOpen } = useSidebar();

  return (
    <div className="flex">
      <Sidebar />
      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
