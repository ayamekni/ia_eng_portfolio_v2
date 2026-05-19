import { Mail, Linkedin, Github, MapPin, Download } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

const cards = [
  { icon: Mail, label: "aya.mekni@esprim.tn", href: "mailto:aya.mekni@esprim.tn" },
  { icon: Linkedin, label: "linkedin.com/in/aya-mekni", href: "https://linkedin.com/in/aya-mekni" },
  { icon: Github, label: "github.com/ayamekni", href: "https://github.com/ayamekni" },
  { icon: MapPin, label: "Monastir, Tunisia · Open to relocation (Europe)", href: "#" },
];

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} />
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <Reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.contact.bio}</p>
            <a
              href="/Aya_Mekni_CV_.pdf"
              download="Aya_Mekni_CV.pdf"
              className="mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-slate-950 hover:opacity-90 transition glow-cyan"
            >
              <Download className="w-4 h-4" /> {t.contact.downloadCV}
            </a>
          </Reveal>
          <Reveal delay={0.15} className="space-y-3">
            {cards.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-4 glass rounded-xl p-4 hover:glow-cyan transition group"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition">
                  <c.icon className="w-5 h-5" />
                </div>
                <span className="text-sm break-all">{c.label}</span>
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
