"use client";

import React from "react";
import { Megaphone, Github } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-2xl">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-white p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <Megaphone size={18} className="text-black" />
          </div>
          <span className="text-xl font-bold tracking-tight">LOUDSPEAKER</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            History
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium bg-zinc-900 hover:bg-zinc-800 px-4 py-2 rounded-xl transition-colors border border-zinc-800"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
