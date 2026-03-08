"use client";

import { useState } from "react";
import HolographicTerminalView from "@/components/canvas/HolographicTerminal";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Github, Send, Twitter, Linkedin, Mail, Loader2, Copy, Check } from "lucide-react";
import { FadeInOnScroll } from "@/components/ui/ScrollExperience";

export default function HomePage() {
  const { userId } = useAuth();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleTransform = async () => {
    if (!url) return;
    setLoading(true);
    setResults(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
      } else {
        alert(data.error);
      }
    } catch (e) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="relative">
      <HolographicTerminalView />

      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center border-b border-primary/10 bg-surface/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center animate-pulse">
            <span className="text-primary font-bold text-xs">T</span>
          </div>
          <h1 className="text-xl font-bold tracking-tighter text-glow uppercase">Trial AI</h1>
        </div>
        <div className="flex items-center gap-4">
          {!userId ? (
            <button className="px-4 py-1.5 rounded-full border border-primary/30 text-sm hover:bg-primary/10 transition-colors">SignIn</button>
          ) : (
            <UserButton />
          )}
        </div>
      </header>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] uppercase tracking-widest text-primary font-semibold">
            v1.0.0 Stable // AI CONTENT TRANSFORMER
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none uppercase">
            Proof of <span className="text-primary italic">Work</span> <br />
            Proof of <span className="underline decoration-accent underline-offset-8">Brand</span>
          </h2>

          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-surface-brighter border border-primary/20 rounded-xl p-2 h-16">
              <Github className="ml-4 text-primary/60" size={20} />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="github.com/username/repository"
                className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-sm font-mono tracking-tight text-primary placeholder:text-primary/30"
              />
              <button
                onClick={handleTransform}
                disabled={loading || !url}
                className="h-full px-8 bg-primary text-surface font-bold rounded-lg flex items-center gap-2 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 group/btn"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <span>TRANSFORM</span>}
                {!loading && <Send size={16} className="group-hover/btn:translate-x-1 transition-transform" />}
              </button>
            </div>
          </div>
        </div>

        {results ? (
          <FadeInOnScroll>
            <div className="mt-20 space-y-20 max-w-5xl mx-auto">
              <ResultSection
                title="LinkedIn Drafts"
                icon={<Linkedin />}
                data={results.linkedin}
                onCopy={copyToClipboard}
                copiedId={copied}
              />
              <ResultSection
                title="Twitter Threads"
                icon={<Twitter />}
                data={results.twitter}
                onCopy={copyToClipboard}
                copiedId={copied}
              />
              <ResultSection
                title="Cold Emails"
                icon={<Mail />}
                data={results.email}
                onCopy={copyToClipboard}
                copiedId={copied}
              />
            </div>
          </FadeInOnScroll>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-5xl mx-auto">
            <FeatureCard
              icon={<Linkedin className="text-primary" />}
              title="LinkedIn Posts"
              description="Professional, impact-driven summaries highlighting your project's technical architecture."
            />
            <FeatureCard
              icon={<Twitter className="text-primary" />}
              title="Twitter Threads"
              description="High-engagement threads with hooks and developer-focused insights."
            />
            <FeatureCard
              icon={<Mail className="text-primary" />}
              title="Cold Emails"
              description="Hyper-personalized emails for recruiters, referencing specific code strengths."
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ResultSection({ title, icon, data, onCopy, copiedId }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-primary/20 pb-4">
        <div className="text-primary">{icon}</div>
        <h3 className="text-2xl font-bold uppercase tracking-tighter">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((draft: any, i: number) => {
          const id = `${title}-${i}`;
          return (
            <div key={id} className="holographic-card p-6 rounded-xl flex flex-col justify-between group">
              <p className="text-xs text-foreground/70 leading-relaxed font-mono whitespace-pre-wrap mb-4">
                {draft.content}
              </p>
              <button
                onClick={() => onCopy(draft.content, id)}
                className="mt-auto flex items-center gap-2 text-[10px] font-bold text-primary/60 hover:text-primary transition-colors"
              >
                {copiedId === id ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedId === id ? "COPIED" : "COPY DRAFT"}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="holographic-card p-8 rounded-2xl group cursor-pointer">
      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-3 uppercase tracking-tight">{title}</h3>
      <p className="text-sm text-foreground/50 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
}
