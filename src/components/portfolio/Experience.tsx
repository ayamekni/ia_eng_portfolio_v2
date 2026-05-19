import { Briefcase, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { StaggerGroup, itemVariants } from "./Reveal";
import { experiences } from "@/lib/experiences";
import { useLanguage } from "@/contexts/LanguageContext";

export function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />

        <div className="relative">
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/60 via-fuchsia-500/40 to-transparent" />

          <StaggerGroup className="space-y-10">
            {experiences.map((it) => {
              const summary = t.experience.summaries[it.slug as keyof typeof t.experience.summaries] ?? it.summary;
              return (
                <motion.article
                  key={it.slug}
                  variants={itemVariants}
                  className="relative pl-12 md:pl-16"
                >
                  {/* Timeline node */}
                  <span className="absolute left-2 md:left-4 top-4 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center glow-cyan">
                    {it.current && (
                      <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-50" />
                    )}
                    <Briefcase className="w-2.5 h-2.5 text-slate-950 relative" />
                  </span>

                  <div className="glass rounded-2xl p-6 md:p-8 hover:glow-purple transition">
                    {/* Header row */}
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[11px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-md border border-cyan-400/30 text-cyan-200/90 bg-cyan-400/5">
                            {it.period}
                          </span>
                          {it.current && (
                            <span className="font-mono text-[11px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-md border border-fuchsia-400/40 text-fuchsia-200/90 bg-fuchsia-400/10">
                              {t.experience.current}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-2 text-xl md:text-2xl font-semibold leading-tight">
                          {it.role}
                          <span className="text-muted-foreground"> · </span>
                          <span className="text-gradient">{it.company}</span>
                        </h3>
                        {it.meta && (
                          <div className="text-xs text-muted-foreground mt-1">{it.meta}</div>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="mt-4 text-sm md:text-base text-foreground/85 leading-relaxed">
                      {summary}
                    </p>

                    {/* Highlights */}
                    {it.highlights?.length > 0 && (
                      <ul className="mt-5 grid sm:grid-cols-2 gap-2">
                        {it.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 rounded-lg border border-cyan-400/15 bg-white/[0.02] px-3 py-2 text-sm"
                          >
                            <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-300" />
                            <span className="text-foreground/85">{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {it.tags.slice(0, 8).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] px-2 py-1 rounded-md bg-white/5 border border-cyan-400/20 text-cyan-200/90"
                        >
                          {tag}
                        </span>
                      ))}
                      {it.tags.length > 8 && (
                        <span className="font-mono text-[11px] px-2 py-1 rounded-md text-muted-foreground">
                          +{it.tags.length - 8} {t.experience.more}
                        </span>
                      )}
                    </div>

                    {/* Action */}
                    <div className="mt-6 flex items-center justify-end">
                      <Link
                        to="/experience/$slug"
                        params={{ slug: it.slug }}
                        className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition"
                        style={{
                          background: "linear-gradient(135deg, #00d4ff, #b44fff)",
                          boxShadow: "0 0 20px rgba(0,212,255,0.25), 0 0 30px rgba(180,79,255,0.2)",
                        }}
                      >
                        {t.experience.viewDetails}
                        <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
