"use client";

import React from "react";
import { Clock, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface Generation {
  id: string;
  createdAt: Date;
  type: string;
  content: string;
  linkedin: string;
  twitter: string;
  email: string;
}

export default function History({ history }: { history: any[] }) {
  if (!history || history.length === 0) return null;

  return (
    <section className="mt-32">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
          <Clock size={20} className="text-zinc-400" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Recent Noise</h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="group glass p-8 rounded-[2rem] hover:bg-zinc-900/40 transition-all duration-500 hover:scale-[1.02] active:scale-95 border border-white/5 hover:border-white/10"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                {item.type === "url" ? "Engineering Project" : "Project Design"}
              </span>
              <div className="flex gap-3">
                <Linkedin size={14} className="text-zinc-600 group-hover:text-white transition-colors" />
                <Twitter size={14} className="text-zinc-600 group-hover:text-white transition-colors" />
                <Mail size={14} className="text-zinc-600 group-hover:text-white transition-colors" />
              </div>
            </div>

            <p className="text-zinc-200 font-bold mb-8 line-clamp-2 leading-relaxed tracking-tight text-lg">
              {item.content}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <button className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest group-hover:gap-3 transition-all">
                <span>View Noise</span>
                <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
