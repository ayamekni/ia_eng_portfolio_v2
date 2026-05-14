import { Award } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { StaggerGroup, itemVariants } from "./Reveal";
import { motion } from "framer-motion";
import ceremonyImg from "@/assets/ceremony.jpg";

const groups: { issuer: string; color: string; items: { name: string; date: string }[] }[] = [
  {
    issuer: "NVIDIA",
    color: "from-emerald-400 to-cyan-400",
    items: [
      { name: "Building Transformer-Based NLP Applications", date: "Nov 2025" },
      { name: "Building RAG Agents with LLMs", date: "Oct 2025" },
      { name: "Introduction to Transformer-Based NLP", date: "Aug 2025" },
      { name: "Generative AI with Diffusion Models", date: "Jun 2025" },
      { name: "Applications of AI for Predictive Maintenance", date: "Apr 2025" },
      { name: "Fundamentals of Deep Learning", date: "Mar 2025" },
      { name: "Anomaly Detection in Time Series Data", date: "2025" },
    ],
  },
  {
    issuer: "Microsoft",
    color: "from-cyan-400 to-blue-500",
    items: [{ name: "AI-900: Azure AI Fundamentals", date: "Feb 2025" }],
  },
  {
    issuer: "DataCamp",
    color: "from-fuchsia-400 to-cyan-400",
    items: [
      { name: "Introduction to MLflow", date: "Aug 2025" },
      { name: "RAG with LangChain", date: "Aug 2025" },
      { name: "Working with Llama 3", date: "Aug 2025" },
      { name: "Understanding Cloud Computing", date: "Oct 2025" },
      { name: "Introduction to Power BI", date: "May 2025" },
      { name: "AWS Cloud Practitioner Track", date: "In Progress" },
    ],
  },
  {
    issuer: "KodeKloud",
    color: "from-purple-500 to-fuchsia-500",
    items: [
      { name: "Docker Training", date: "Feb 2025" },
      { name: "Fundamentals of DevOps", date: "Feb 2025" },
      { name: "Shell Scripts for Beginners", date: "Feb 2025" },
      { name: "12 Factor App", date: "Feb 2025" },
    ],
  },
  {
    issuer: "Other",
    color: "from-amber-400 to-pink-400",
    items: [{ name: "Scrum Fundamentals Certified (SFC™) — Vabro.ai", date: "Apr 2024" }],
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Certifications" title="Proud Milestones" />
        <StaggerGroup className="space-y-8">
          {groups.map((g) => (
            <motion.div key={g.issuer} variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center`}>
                  <Award className="w-5 h-5 text-slate-950" />
                </div>
                <h3 className="text-xl font-semibold text-gradient">{g.issuer}</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {g.items.map((c) => (
                  <div key={c.name} className="glass rounded-xl p-4 hover:glow-cyan transition">
                    <div className="text-sm font-medium leading-snug">{c.name}</div>
                    <div className="font-mono text-xs text-cyan-300/80 mt-1">{c.date}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </StaggerGroup>

        {/* Distinctions */}
        <div id="distinctions" className="mt-20">
          <SectionHeading eyebrow="Distinctions" title="Achievements" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative max-w-3xl mx-auto group/flip"
            style={{ perspective: "1600px" }}
          >
            <div
              className="relative w-full min-h-[260px] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flip:[transform:rotateY(180deg)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-2xl p-8 glass-strong overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  boxShadow: "0 0 50px oklch(0.85 0.17 85 / 0.35)",
                  borderColor: "oklch(0.85 0.17 85 / 0.5)",
                }}
              >
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-amber-400/20 blur-3xl" />
                <div className="relative flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Award className="w-7 h-7 text-slate-950" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-amber-300 uppercase tracking-widest">Winner</div>
                    <h3 className="text-2xl font-bold mt-1">AI Camera Challenge Hackathon</h3>
                    <div className="text-sm text-muted-foreground mt-1">Global AI Conference (GAICA) 2025</div>
                    <p className="mt-3 text-muted-foreground">
                      Real-time computer vision system with an automated alerting pipeline on NVIDIA GPU infrastructure, built in 24 hours.
                    </p>
                    <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-amber-300/70">
                      Hover to see the ceremony
                    </div>
                  </div>
                </div>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden glass-strong"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  boxShadow: "0 0 50px oklch(0.85 0.17 85 / 0.45)",
                  borderColor: "oklch(0.85 0.17 85 / 0.5)",
                }}
              >
                <img
                  src={ceremonyImg}
                  alt="GAICA 2025 award ceremony"
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
                <div className="relative h-full min-h-[260px] flex flex-col justify-end p-8">
                  <div className="font-mono text-xs text-amber-300 uppercase tracking-widest">Ceremony</div>
                  <h3 className="text-xl font-bold mt-1">GAICA 2025 · Award Night</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    On stage receiving the AI Camera Challenge trophy.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}