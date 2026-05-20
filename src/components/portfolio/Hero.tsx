import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
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
        if (next === "") { setDel(false); setI((p) => (p + 1) % ROLES.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return text;
}

// Per-letter hover spring
const letterSpring = { type: "spring" as const, stiffness: 500, damping: 20 };
function LetterHover({ char, withColor }: { char: string; withColor?: boolean }) {
  if (char === " ") return <span style={{ display: "inline-block", width: "0.3em" }} />;
  return (
    <motion.span
      style={{ display: "inline-block" }}
      whileHover={withColor ? { y: -10, color: "oklch(0.82 0.16 210)" } : { y: -10 }}
      transition={letterSpring}
    >
      {char}
    </motion.span>
  );
}

// Magnetic CTA — pulls toward cursor when nearby
function MagneticCTA({ children, className, href, download }: {
  children: React.ReactNode;
  className: string;
  href: string;
  download?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 18 });
  const sy = useSpring(my, { stiffness: 180, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.32);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: "inline-flex" }}
    >
      <motion.a
        href={href}
        download={download}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={className}
      >
        {children}
      </motion.a>
    </motion.div>
  );
}

const counters = [
  { value: 5,     suffix: "+",   decimals: 0, key: 0 },
  { value: 15,    suffix: "+",   decimals: 0, key: 1 },
  { value: 3,     suffix: "+",   decimals: 0, key: 2 },
  { value: 15.12, suffix: "/20", decimals: 2, key: 3 },
  { value: null,  display: "1st",             key: 4 },
] as const;

export function Hero() {
  const role = useTypewriter();
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  // Spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setSpotlight({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  // Scroll parallax on hero content
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, -90]);

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-32 pb-20 px-4 overflow-hidden"
      style={{
        background: `radial-gradient(900px circle at ${spotlight.x}% ${spotlight.y}%, oklch(0.82 0.16 210 / 0.07), transparent 60%)`,
      }}
    >
      <motion.div style={{ y: contentY }} className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-mono text-sm tracking-widest text-cyan-300/80 mb-4"
        >
          // PORTFOLIO · 2026
        </motion.div>

        {/* Per-letter hover name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
        >
          {"Aya ".split("").map((c, i) => <LetterHover key={`a${i}`} char={c} withColor />)}
          <span className="text-gradient">
            {"Mekni".split("").map((c, i) => <LetterHover key={`m${i}`} char={c} />)}
          </span>
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

        {/* 5-stat counter grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl"
        >
          {counters.map((m) => (
            <div key={m.key} className="glass rounded-xl p-4">
              <div className="text-3xl md:text-4xl font-bold text-gradient">
                {"display" in m
                  ? m.display
                  : <Counter value={m.value} suffix={m.suffix} decimals={m.decimals} />
                }
              </div>
              <div className="text-xs text-muted-foreground mt-1 leading-snug">
                {t.hero.counters[m.key].label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Magnetic CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticCTA
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-slate-950 glow-cyan"
          >
            {t.hero.viewWork} <ArrowRight className="w-4 h-4" />
          </MagneticCTA>

          <MagneticCTA
            href="/Aya_Mekni_CV_.pdf"
            download="Aya_Mekni_CV.pdf"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium border-gradient"
          >
            <Download className="w-4 h-4" /> {t.hero.downloadCV}
          </MagneticCTA>

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
      </motion.div>
    </section>
  );
}
