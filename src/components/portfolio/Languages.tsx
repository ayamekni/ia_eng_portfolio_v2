import { SectionHeading } from "./SectionHeading";
import { StaggerGroup, itemVariants } from "./Reveal";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const langs = [
  { flag: "🇸🇦", name: "Arabic", levelKey: "native" as const, value: 100 },
  { flag: "🇬🇧", name: "English", levelKey: "c1" as const, value: 90 },
  { flag: "🇫🇷", name: "French", levelKey: "c1" as const, value: 90 },
  { flag: "🇩🇪", name: "German", levelKey: "a1" as const, value: 15, learning: true },
];

export function Languages() {
  const { t } = useLanguage();

  return (
    <section id="languages" className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow={t.languages.eyebrow} title={t.languages.title} />
        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {langs.map((l) => (
            <motion.div key={l.name} variants={itemVariants} whileHover={{ y: -4 }} className="glass rounded-2xl p-6 text-center hover:glow-purple transition">
              <div className="text-5xl">{l.flag}</div>
              <div className="mt-3 text-lg font-semibold">{l.name}</div>
              <div className={`text-sm ${l.learning ? "text-amber-300/80" : "text-muted-foreground"}`}>
                {t.languages.levels[l.levelKey]}
              </div>
              <div className="mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${l.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className={`h-full ${l.learning ? "bg-gradient-to-r from-amber-400 to-orange-400" : "bg-gradient-to-r from-cyan-400 to-fuchsia-500"}`}
                />
              </div>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
