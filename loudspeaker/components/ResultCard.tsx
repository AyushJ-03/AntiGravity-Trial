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
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="p-8 glass rounded-[2.5rem] flex flex-col h-full group hover:bg-zinc-900/40 transition-all duration-500 hover:scale-[1.02] active:scale-95"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl text-black">
            {icon}
          </div>
          <h3 className="text-xl font-black tracking-tight text-white">{title}</h3>
        </div>
        <button
          onClick={copyToClipboard}
          className="p-3 hover:bg-white hover:text-black glass rounded-xl transition-all duration-300"
          title="Copy to clipboard"
        >
          {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
        </button>
      </div>
      <div className="flex-1 overflow-auto max-h-[500px] pr-4 scrollbar-thin scrollbar-thumb-zinc-800">
        <pre className="text-zinc-400 whitespace-pre-wrap font-sans leading-relaxed text-sm lg:text-base font-medium">
          {content}
        </pre>
      </div>
    </motion.div>
  );
}
