import { SectionHeading } from "./SectionHeading";
import { StaggerGroup, itemVariants } from "./Reveal";
import { motion } from "framer-motion";

const langs = [
  { flag: "🇸🇦", name: "Arabic", level: "Native", value: 100 },
  { flag: "🇬🇧", name: "English", level: "C1 Professional", value: 90 },
  { flag: "🇫🇷", name: "French", level: "C1 Professional", value: 90 },
];

export function Languages() {
  return (
    <section id="languages" className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Languages" title="Multilingual Communication" />
        <StaggerGroup className="grid sm:grid-cols-3 gap-5">
          {langs.map((l) => (
            <motion.div key={l.name} variants={itemVariants} whileHover={{ y: -4 }} className="glass rounded-2xl p-6 text-center hover:glow-purple transition">
              <div className="text-5xl">{l.flag}</div>
              <div className="mt-3 text-lg font-semibold">{l.name}</div>
              <div className="text-sm text-muted-foreground">{l.level}</div>
              <div className="mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${l.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"
                />
              </div>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}