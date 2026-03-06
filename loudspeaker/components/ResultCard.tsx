"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ResultCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  delay?: number;
}

export default function ResultCard({ title, content, icon, delay = 0 }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl flex flex-col h-full group hover:border-zinc-700 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-800 rounded-xl text-zinc-300">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-zinc-100">{title}</h3>
        </div>
        <button
          onClick={copyToClipboard}
          className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 transition-all"
        >
          {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
        </button>
      </div>
      <div className="flex-1 overflow-auto max-h-[400px] scrollbar-thin scrollbar-thumb-zinc-800">
        <pre className="text-zinc-300 whitespace-pre-wrap font-sans leading-relaxed">
          {content}
        </pre>
      </div>
    </motion.div>
  );
}
