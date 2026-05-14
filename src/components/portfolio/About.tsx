import { Mail, MapPin, User, Briefcase, Bot, Hammer, BarChart3, Globe2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal, StaggerGroup, itemVariants } from "./Reveal";
import { motion } from "framer-motion";

const traits = [
  { icon: Bot, title: "Agent Architect", desc: "Designing multi-agent systems with LangGraph & ReAct" },
  { icon: Hammer, title: "Systems Builder", desc: "End-to-end from architecture to production deployment" },
  { icon: BarChart3, title: "Data-Driven", desc: "Every decision backed by metrics and observability" },
  { icon: Globe2, title: "Global Mindset", desc: "Building for enterprise clients across multiple markets" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="About" title="Get to Know Me" />
        <div className="grid lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 space-y-4">
              <Row icon={<User className="w-4 h-4" />} label="Name" value="Aya Mekni" />
              <Row icon={<MapPin className="w-4 h-4" />} label="Location" value="Monastir, Tunisia 🇹🇳" />
              <Row icon={<Mail className="w-4 h-4" />} label="Email" value="aya.mekni@esprim.tn" />
              <Row icon={<Briefcase className="w-4 h-4" />} label="Status" value="AI Engineer · Data Engineer · Open to on-site roles in Tunisia & relocation across Europe" />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-3">
            <p className="text-muted-foreground leading-relaxed">
              I'm an AI Engineer specializing in production-grade multi-agent systems, RAG architectures, and LLM deployment at scale. I build end-to-end AI products — from agent design and multi-tenant orchestration to observability and real-world deployment — for enterprise clients across call centers, EdTech, and procurement markets.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              I thrive at the intersection of AI complexity and real business constraints, shipping systems that handle real users, real data, and real stakes. Currently open to full-time roles across Europe.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {traits.map((t) => (
            <motion.div
              key={t.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="glass rounded-xl p-5 hover:glow-cyan transition"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 flex items-center justify-center mb-3">
                <t.icon className="w-5 h-5 text-cyan-300" />
              </div>
              <div className="font-semibold">{t.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{t.desc}</div>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-md bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 flex items-center justify-center text-cyan-300 mt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-medium break-words">{value}</div>
      </div>
    </div>
  );
}