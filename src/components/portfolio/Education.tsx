import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { StaggerGroup, itemVariants } from "./Reveal";
import { motion } from "framer-motion";

const items = [
  {
    period: "Sep 2023 – Jun 2026",
    title: "National Engineering Diploma — Computer Science (Data Science & AI)",
    school: "ESPRIM",
    location: "Monastir, Tunisia",
    extra: "GPA: 15.12 / 20",
    courses: [
      "Machine Learning",
      "Deep Learning",
      "Big Data Analytics",
      "MLOps",
      "Data Engineering",
      "NLP",
      "Computer Vision",
    ],
  },
  {
    period: "Sep 2021 – Jun 2023",
    title: "Pre-Engineering Diploma — Preparatory Cycle (Math–Physics–Informatics)",
    school: "FSM",
    location: "Monastir, Tunisia",
    courses: [
      "Calculus",
      "Linear Algebra",
      "Probability & Statistics",
      "Data Structures",
      "Algorithms",
      "Python",
      "SQL",
    ],
  },
];

export function Education() {
  return (
    <section id="education" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Education" title="My Learning Journey" />
        <StaggerGroup className="grid md:grid-cols-2 gap-6">
          {items.map((it) => (
            <motion.div
              key={it.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 hover:glow-purple transition"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <div className="font-mono text-xs text-cyan-300/80 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {it.period}
                  </div>
                  <h3 className="mt-1 font-semibold leading-tight">{it.title}</h3>
                </div>
              </div>
              <div className="text-sm">
                <span className="text-gradient font-semibold">{it.school}</span>
                <span className="text-muted-foreground"> · </span>
                <span className="text-muted-foreground inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {it.location}
                </span>
              </div>
              {it.extra && (
                <div className="mt-2 inline-block font-mono text-xs px-2 py-1 rounded border border-cyan-400/40 text-cyan-300">
                  {it.extra}
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {it.courses.map((c) => (
                  <span
                    key={c}
                    className="font-mono text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10 text-muted-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}