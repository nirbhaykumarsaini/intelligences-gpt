"use client"

import { SidebarContext } from "@/contexts/SidebarContext";
import { useState } from "react";
import "./globals.css";
import { Toaster } from "react-hot-toast";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <html lang="en">
      <body className="overflow-hidden"> {/* Prevent vertical scroll */}
        <main >
        <SidebarContext.Provider value={{ collapsed, toggleSidebar }}>
        <Toaster position="top-right" />
          {children}
        </SidebarContext.Provider>
        </main>
      </body>
    </html>
  );
}
