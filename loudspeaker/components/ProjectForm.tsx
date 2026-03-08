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
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-4 mb-10">
          <button
            type="button"
            onClick={() => setType("url")}
            className={`flex items-center gap-2 px-8 py-3 rounded-2xl transition-all duration-300 font-bold text-xs tracking-widest uppercase ${type === "url"
                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                : "bg-zinc-900/50 text-zinc-500 hover:text-white glass"
              }`}
          >
            <Github size={16} />
            GitHub URL
          </button>
          <button
            type="button"
            onClick={() => setType("description")}
            className={`flex items-center gap-2 px-8 py-3 rounded-2xl transition-all duration-300 font-bold text-xs tracking-widest uppercase ${type === "description"
                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                : "bg-zinc-900/50 text-zinc-500 hover:text-white glass"
              }`}
          >
            <FileText size={16} />
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
            className="w-full min-h-[250px] p-8 glass rounded-[2.5rem] text-lg text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all resize-none shadow-2xl"
            required
          />
          <button
            type="submit"
            disabled={isLoading || !content.trim()}
            className="absolute bottom-6 right-6 p-5 bg-white text-black rounded-3xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-2xl"
          >
            {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
