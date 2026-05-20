import { useRef } from "react";
import { Mail, MapPin, User, Briefcase, Bot, Hammer, BarChart3, Globe2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal, StaggerGroup, itemVariants } from "./Reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LucideIcon } from "lucide-react";

const traitIcons: LucideIcon[] = [Bot, Hammer, BarChart3, Globe2];

export function About() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blob1Y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 px-4 overflow-hidden">
      {/* Parallax background blobs */}
      <motion.div
        style={{ y: blob1Y }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-400/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: blob2Y }}
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-fuchsia-500/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
        <div className="grid lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 space-y-4">
              <Row icon={<User className="w-4 h-4" />} label={t.about.labels.name} value="Aya Mekni" />
              <Row icon={<MapPin className="w-4 h-4" />} label={t.about.labels.location} value="Monastir, Tunisia 🇹🇳" />
              <Row icon={<Mail className="w-4 h-4" />} label={t.about.labels.email} value="aya.mekni@esprim.tn" />
              <Row icon={<Briefcase className="w-4 h-4" />} label={t.about.labels.status} value={t.about.statusValue} />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-3">
            <p className="text-muted-foreground leading-relaxed">{t.about.bio1}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t.about.bio2}</p>
          </Reveal>
        </div>

        <StaggerGroup className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.about.traits.map((trait, i) => {
            const Icon = traitIcons[i];
            return (
              <motion.div
                key={trait.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="glass rounded-xl p-5 hover:glow-cyan transition"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-cyan-300" />
                </div>
                <div className="font-semibold">{trait.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{trait.desc}</div>
              </motion.div>
            );
          })}
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
