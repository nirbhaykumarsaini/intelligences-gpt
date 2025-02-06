"use client";

import { useSidebar } from "@/contexts/SidebarContext"; // Ensure correct import path
import { cn } from "@/lib/utils";

const Footer = () => {
  const { collapsed } = useSidebar(); // Get collapsed state from context

  return (
    <div
      className={cn(
        "flex items-center justify-center p-4 transition-all duration-300",
        collapsed ? "ml-0" : "ml-64" // Fade out when collapsed
      )}
    >
      <p className="text-gray-500 text-sm">Intelligence GPT can make mistakes. Check important info.</p>
    </div>
  );
};

export default Footer;
