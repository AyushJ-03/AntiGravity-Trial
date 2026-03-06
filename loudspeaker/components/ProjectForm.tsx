"use client";

import React, { useState } from "react";
import { Send, Github, FileText, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectFormProps {
  onSubmit: (data: { type: "url" | "description"; content: string }) => void;
  isLoading: boolean;
}

export default function ProjectForm({ onSubmit, isLoading }: ProjectFormProps) {
  const [content, setContent] = useState("");
  const [type, setType] = useState<"url" | "description">("url");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit({ type, content });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => setType("url")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${
              type === "url" 
                ? "bg-zinc-100 text-zinc-900 font-medium" 
                : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Github size={18} />
            GitHub URL
          </button>
          <button
            type="button"
            onClick={() => setType("description")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${
              type === "description" 
                ? "bg-zinc-100 text-zinc-900 font-medium" 
                : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FileText size={18} />
            Description
          </button>
        </div>

        <div className="relative group">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              type === "url" 
                ? "https://github.com/username/repo" 
                : "Describe your project's features, tech stack, and impact..."
            }
            className="w-full min-h-[200px] p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl text-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent transition-all resize-none"
            required
          />
          <button
            type="submit"
            disabled={isLoading || !content.trim()}
            className="absolute bottom-4 right-4 p-4 bg-zinc-100 text-zinc-900 rounded-2xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
