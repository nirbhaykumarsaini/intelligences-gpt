"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Navbar";
import { useSidebar } from "@/contexts/SidebarContext";
import { FormEvent, useEffect, useState } from "react";
import SearchInput from "@/components/SearchInput";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import LandingPage from "@/components/LandingPage";
import Loader from "@/components/Loader";
import { useSearchParams } from 'next/navigation';

interface Chat {
  prompt: string;
}




export default function Home() {
  const { collapsed } = useSidebar();
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get('chatId');

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
    if (id) {
      fetchChat(id as string); // Call the fetchChat function when id is available
    }
  }, [id]);

  const fetchChat = async (chatId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/chat/${chatId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch chat");

      const data = await response.json();
      setChat(data.chat);
    } catch (error) {
      console.error("Error fetching chat:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent, prompt: string) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const data = await res.json();
      setResponse(data.completion || "Error generating response");
    } catch (error) {
      if (error instanceof Error) {
        setResponse(`Error: ${error.message}`);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <Sidebar />
          <main
            className={cn(
              "flex-1 px-5 transition-all duration-300 overflow-x-auto mb-[130px]",
              collapsed ? "ml-0" : "ml-64"
            )}
          >
            {loading ? (
              <div className="flex gap-2 justify-center items-center h-full">
                <Loader />
                <span className="text-gray-600">Thinking...</span>
              </div>
            ) : response ? (
              <div className="mt-3 p-4 rounded-lg mx-48 text-gray-800 max-h-96">
                <MarkdownRenderer content={response} />
              </div>
            ) : chat ? (
              <div className="mt-3 p-4 rounded-lg mx-48 text-gray-800 max-h-96">
                <MarkdownRenderer content={chat.prompt} />
              </div>
            ) : (
              <LandingPage />
            )}
          </main>
        </div>

        <SearchInput handleSubmit={handleSubmit} />

        <Footer />
      </div>
    </>
  );
}
