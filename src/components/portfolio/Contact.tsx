import { Mail, Linkedin, Github, Globe, MapPin, Download } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const cards = [
  { icon: Mail, label: "aya.mekni@esprim.tn", href: "mailto:aya.mekni@esprim.tn" },
  { icon: Linkedin, label: "linkedin.com/in/aya-mekni", href: "https://linkedin.com/in/aya-mekni" },
  { icon: Github, label: "github.com/ayamekni", href: "https://github.com/ayamekni" },
  { icon: Globe, label: "aya-mekni-portfolio.vercel.app", href: "https://aya-mekni-portfolio.vercel.app" },
  { icon: MapPin, label: "Monastir, Tunisia · Open to relocation (Europe)", href: "#" },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Get In Touch" title="Let's Connect" />
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <Reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm actively looking for full-time AI Engineer roles across Europe. Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is open.
            </p>
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-slate-950 hover:opacity-90 transition glow-cyan"
            >
              <Download className="w-4 h-4" /> Download CV
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