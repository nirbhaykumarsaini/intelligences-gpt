"use client";

import React, { FormEvent, useState, useRef, useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";
import { Textarea } from "./ui/textarea";

const SearchInput: React.FC<{ handleSubmit: (e: FormEvent, prompt: string) => void }> = ({ handleSubmit }) => {
  const { collapsed } = useSidebar();
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [prompt]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { 
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent, prompt); 
      setPrompt(''); 
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 flex items-center gap-2 px-64 bg-white shadow-none transition-all duration-300",
          collapsed ? "ml-0" : "ml-64"
        )}
      >
        <form
          onSubmit={(e) => {
            handleSubmit(e, prompt); 
            setPrompt(''); 
            e.preventDefault();
          }}
          className="flex w-full gap-2 items-center px-8 py-4 mb-4 border font-semibold bg-slate-100 text-gray-600 shadow-sm border-gray-300 rounded-[24px]"
        >
          <Textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown} 
            placeholder="Type your message..."
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              border: "none",
              outline: "none",
              boxShadow: "none",
              minHeight: "40px",
              maxHeight: "200px",
              overflowY: "auto",
              resize: "none",
            }}
            className="transition-all font-semibold"
          />
          <Button disabled={!prompt} type="submit" variant="outline" className="p-2 bg-black hover:bg-none text-white rounded-full">
            <ArrowUp className="" size={20} />
          </Button>
        </form>
      </div>
    </>
  );
};

export default SearchInput;
