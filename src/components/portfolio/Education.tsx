import { GraduationCap, Calendar, MapPin, Users } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const courses = [
  "AI Agents", "LLMs", "RAG", "AI Automation", "MLOps",
  "Machine Learning", "Deep Learning", "Data Mining", "Big Data Analytics",
  "Natural Language Processing", "Computer Vision",
  "Algorithms & Data Structures", "Operating Systems", "Database Management Systems",
  "Cloud Computing", "Distributed Systems", "Software Engineering",
  "Statistics & Probability", "Linear Algebra", "Optimization Methods",
  "Web Development",
];

export function Education() {
  const { t } = useLanguage();

  return (
    <section id="education" className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow={t.education.eyebrow} title={t.education.title} />
        <Reveal>
          <motion.div
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-6 md:p-8 hover:glow-purple transition"
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-cyan-300" />
              </div>
              <div>
                <div className="font-mono text-xs text-cyan-300/80 flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3" /> Sep 2021 – 2026
                </div>
                <h3 className="font-semibold text-lg leading-snug">{t.education.degree}</h3>
              </div>
            </div>

            {/* School + meta */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mb-4">
              <div>
                <span className="text-gradient font-semibold">ESPRIT</span>
                <span className="text-muted-foreground text-xs"> — Ecole Supérieure Privée d'Ingénierie et de Technologies</span>
              </div>
              <span className="text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Tunisia
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded border border-cyan-400/40 text-cyan-300">
                GPA 15.12 / 20
              </span>
              <span className="flex items-center gap-1 font-mono text-xs text-fuchsia-300/80">
                <Users className="w-3 h-3" /> {t.education.activity}
              </span>
            </div>

            {/* Coursework */}
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/60 mb-3">
                {t.education.coursework}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {courses.map((c) => (
                  <span
                    key={c}
                    className="font-mono text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-muted-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
