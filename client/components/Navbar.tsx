"use client";

import { useSidebar } from "@/contexts/SidebarContext"; // Update the path
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { PopoverDemo } from "./UserProfile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";


type User = {
  name:string,
}


const Header = () => {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);


  const getUser = useCallback(async () => {
    try {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }
  
      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      router.push("/signin");
    } else {
      getUser();
      router.push("/");
    }
  }, [token, router, getUser]);

  

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-4">
          {token && (
            <Button 
              onClick={toggleSidebar}
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100"
            >
              <Menu className="h-10 w-10 text-gray-600" />
            </Button>
          )}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-800 hover:text-gray-900 transition-colors">
              IntelligenceGPT
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {token && (
            <Button 
             
              className="shadow-none hidden sm:flex items-center gap-2 border-gray-200 bg-white  text-gray-700"
              onClick={() => {/* Add new chat handler */}}
            >
              <span>New Chat</span>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-gray-100 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>N
              </kbd>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {token && (
            <div className="flex items-center gap-4">
              <PopoverDemo user={user?.name || "G"} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
