"use client";

import React, { useState } from "react";
import ProjectForm from "@/components/ProjectForm";
import ResultCard from "@/components/ResultCard";
import { Linkedin, Twitter, Mail, Megaphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generatePRAssets } from "./actions";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    linkedin: string;
    twitter: string;
    email: string;
  } | null>(null);

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

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-50 selection:bg-zinc-100 selection:text-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 mb-6">
            <Megaphone size={16} className="text-zinc-400" />
            <span className="text-sm font-medium text-zinc-400">Your AI PR Agent</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Make some noise.
          </h1>
          <p className="text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto">
            Loudspeaker transforms your GitHub repositories and project descriptions into professional PR assets in seconds.
          </p>
        </motion.div>

        {/* Form Section */}
        <AnimatePresence mode="wait">
          {!results ? (
            <ProjectForm onSubmit={handleGenerate} isLoading={isLoading} />
          ) : (
            <div className="space-y-8">
              <div className="flex justify-center">
                <button 
                  onClick={() => setResults(null)}
                  className="text-zinc-500 hover:text-zinc-100 transition-colors"
                >
                  ← Start Over
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
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
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-zinc-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-zinc-800/20 rounded-full blur-[120px]" />
      </div>
    </main>
  );
}
