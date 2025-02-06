"use client";

import { useSidebar } from "@/contexts/SidebarContext"; // Update the path
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { PopoverDemo } from "./UserProfile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCallback } from "react";

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
    <header className="text-white shadow-sm sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center space-x-4">
          {token && (
            <button onClick={toggleSidebar}>
              <Menu size={24} className="text-gray-600" />
            </button>
          )}
          <h1 className="font-semibold text-xl text-gray-600">Intelligence GPT</h1>
        </div>
        <div>
          <p className="font-semibold text-gray-600">New Chat</p>
        </div>

        {token ? (
          <div className="flex items-center">
            {/* Pass user data to PopoverDemo */}
            <PopoverDemo  user={user?.name || "Guest"} />
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href={"/signin"}>
              <Button className="bg-black hover:bg-black">Log in</Button>
            </Link>
            <Link href={"/signup"}>
              <Button className="bg-black hover:bg-black">Sign up</Button>
            </Link>
            
          </div>
        )}
      </div>
      
    </header>
  );
};

export default Header;
