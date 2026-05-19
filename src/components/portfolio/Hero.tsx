import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Globe } from "lucide-react";
import { Counter } from "./Counter";
import { useLanguage } from "@/contexts/LanguageContext";

const ROLES = [
  "AI Engineer",
  "Data Engineer",
  "Agent Architect",
  "LLM Systems Builder",
  "Multi-Agent Developer",
];

function useTypewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = ROLES[i];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDel(true), 1400);
      } else {
        const next = full.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next === "") {
          setDel(false);
          setI((p) => (p + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return text;
}

const counters = [
  { v: 5, s: "+", key: 0 },
  { v: 15, s: "+", key: 1 },
  { v: 3, s: "+", key: 2 },
  { v: 200, s: "+", key: 3 },
];

export function Hero() {
  const role = useTypewriter();
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-mono text-sm tracking-widest text-cyan-300/80 mb-4"
        >
          // PORTFOLIO · 2026
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
        >
          Aya <span className="text-gradient">Mekni</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-2xl md:text-4xl font-light h-12"
        >
          <span className="cursor-blink shimmer-text font-semibold">{role}</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl"
        >
          {counters.map((m) => (
            <div key={m.key} className="glass rounded-xl p-4">
              <div className="text-3xl md:text-4xl font-bold text-gradient">
                <Counter value={m.v} suffix={m.s} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {t.hero.counters[m.key].label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-slate-950 hover:opacity-90 transition glow-cyan"
          >
            {t.hero.viewWork} <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/Aya_Mekni_CV_.pdf"
            download="Aya_Mekni_CV.pdf"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium border-gradient hover:opacity-90 transition"
          >
            <Download className="w-4 h-4" /> {t.hero.downloadCV}
          </a>
          <div className="flex items-center gap-3 ml-2">
            <a aria-label="LinkedIn" href="https://linkedin.com/in/aya-mekni" className="p-2 rounded-full glass hover:glow-cyan transition">
              <Linkedin className="w-4 h-4" />
            </a>
            <a aria-label="GitHub" href="https://github.com/ayamekni" className="p-2 rounded-full glass hover:glow-cyan transition">
              <Github className="w-4 h-4" />
            </a>
            <a aria-label="Portfolio" href="https://aya-mekni-portfolio.vercel.app" className="p-2 rounded-full glass hover:glow-cyan transition">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
