"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import { categorizeChats, truncatePrompt } from "@/lib/action";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Link from "next/link";
import { Clipboard, ClipboardCheck, Trash2 } from "lucide-react";
import { useChats, useDeleteChat } from "@/hooks/useChats";

const Sidebar = () => {
  const { collapsed } = useSidebar();
  const { chats, loading, fetchChats } = useChats();
  const { deleteChat } = useDeleteChat();
  const [firstLoad, setFirstLoad] = useState(true);
  const [copiedChatId, setCopiedChatId] = useState<string | null>(null);

  useEffect(() => {
    fetchChats();

    const interval = setInterval(() => {
      fetchChats();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchChats]);

  useEffect(() => {
    if (!loading && firstLoad) {
      setFirstLoad(false);
    }
  }, [loading, firstLoad]);

  const handleDelete = async (chatId: string) => {
    const success = await deleteChat(chatId);
    if (success) {
      fetchChats();
    }
  };

  const copyToClipboard = (chatId: string) => {
    const chatUrl = `${window.location.origin}/?chatId=${chatId}`;
    navigator.clipboard.writeText(chatUrl);
    setCopiedChatId(chatId);
    setTimeout(() => setCopiedChatId(null), 2000);
  };

  const chatGroups = categorizeChats(chats);

  return (
    <div
      className={cn(
        "h-full lg:h-screen fixed shadow-sm bg-slate-100 text-white transition-all duration-300",
        collapsed ? "w-0" : "w-64",
        chats.length === 0 ? "overflow-hidden" : "overflow-auto"
      )}
    >
      <nav className="mt-6 mb-20">
        {loading && firstLoad ? (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        ) : chats.length > 0 ? (
          Object.entries(chatGroups).map(([label, group]) =>
            group.length > 0 ? (
              <div key={label}>
                <h3 className="text-gray-600 font-semibold text-sm px-4 py-2 uppercase">
                  {{
                    today: "Today",
                    yesterday: "Yesterday",
                    last7Days: "Previous 7 Days",
                    last30Days: "Previous 30 Days",
                  }[label] || "Older"}
                </h3>
                {group.map((chat) => (
                  <div
                    key={chat._id}
                    className="flex justify-between items-center px-2 py-2 text-sm rounded mx-2 text-gray-800 hover:bg-slate-200 transition group"
                  >
                    <Link
                      href={`/?chatId=${chat._id}`}
                      className="flex-1 truncate"
                    >
                      {truncatePrompt(chat.prompt, 30)}
                    </Link>
                    <div className="flex gap-1 items-center">
                      <button
                        onClick={() => copyToClipboard(chat._id)}
                        className="text-gray-600 hover:text-gray-900 transition opacity-0 group-hover:opacity-100"
                        aria-label="Copy chat link"
                      >
                        {copiedChatId === chat._id ? (
                          <ClipboardCheck size={16} />
                        ) : (
                          <Clipboard size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(chat._id)}
                        className="p-1 text-red-600 hover:text-red-900 transition opacity-0 group-hover:opacity-100"
                        aria-label="Delete chat"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null
          )
        ) : (
          <p className="text-gray-500 text-center">No chat history</p>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;