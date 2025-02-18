import { useState, useCallback } from "react";
import toast from "react-hot-toast";

type Chat = {
  _id: string;
  prompt: string;
  createdAt: string;
  updatedAt: string;
};

export const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/chat", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch chats");
      const data = await response.json();
      setChats(data.chats || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch chats");
    } finally {
      setLoading(false);
    }
  }, []);

  return { chats, loading, error, fetchChats };
};

export const useDeleteChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteChat = useCallback(async (chatId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/chat/${chatId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete chat");
      setError(null);
      toast.success("Chat deleted successfully!");
      return true;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete chat");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteChat, loading, error };
};