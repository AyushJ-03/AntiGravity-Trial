"use client";

import React, { useState, useEffect } from "react";
import ProjectForm from "@/components/ProjectForm";
import ResultCard from "@/components/ResultCard";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });
import Navbar from "@/components/Navbar";
import History from "@/components/History";
import { Linkedin, Twitter, Mail, Megaphone, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generatePRAssets, getHistory } from "./actions";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [results, setResults] = useState<{
    linkedin: string;
    twitter: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getHistory();
      setHistory(data);
    };
    fetchHistory();
  }, [results]);

  const handleGenerate = async (data: { type: "url" | "description"; content: string }) => {
    setIsLoading(true);
    try {
      const assets = await generatePRAssets(data);
      setResults(assets);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen text-zinc-50 selection:bg-white selection:text-black">
      <Scene3D />
      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            rotateX: -mousePos.y * 0.5,
            rotateY: mousePos.x * 0.5,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 perspective-1000"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
            style={{ transform: "translateZ(50px)" }}
          >
            <Sparkles size={14} className="text-white" />
            <span className="text-xs font-bold tracking-widest uppercase text-zinc-400">AI-Powered PR Agent</span>
          </motion.div>

          <h1
            className="text-6xl lg:text-8xl font-black tracking-tight mb-8 leading-[0.9] gradient-text"
            style={{ transform: "translateZ(100px)" }}
          >
            MAKE SOME <br /> NOISE.
          </h1>

          <p
            className="text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed"
            style={{ transform: "translateZ(70px)" }}
          >
            Transform your engineering work into high-impact social media narratives.
            Loudspeaker amplifies your projects for LinkedIn, Twitter, and Recruiter outreach.
          </p>
        </motion.div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          {!results ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ProjectForm onSubmit={handleGenerate} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <div className="flex justify-center">
                <button
                  onClick={() => setResults(null)}
                  className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-bold text-sm tracking-widest uppercase"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  New Project
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <ResultCard
                  title="LinkedIn Post"
                  content={results.linkedin}
                  icon={<Linkedin size={20} />}
                  delay={0.1}
                />
                <ResultCard
                  title="Twitter Thread"
                  content={results.twitter}
                  icon={<Twitter size={20} />}
                  delay={0.2}
                />
                <ResultCard
                  title="Cold Email"
                  content={results.email}
                  icon={<Mail size={20} />}
                  delay={0.3}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History Section */}
        <History history={history} />
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1 rounded-md">
              <Megaphone size={14} className="text-black" />
            </div>
            <span className="text-sm font-bold tracking-tight">LOUDSPEAKER</span>
          </div>
          <p className="text-xs text-zinc-600 font-medium">
            Built with ❤️ for Developers. &copy; 2026 Loudspeaker AI.
          </p>
        </div>
      </footer>
    </main>
  );
}
