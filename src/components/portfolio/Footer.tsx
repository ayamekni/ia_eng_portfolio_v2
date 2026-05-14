import { Github, Linkedin, Globe, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-10 px-4 border-t border-white/5 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2026 <span className="text-gradient font-semibold">Aya Mekni</span> · AI Engineer · Built with passion
        </p>
        <div className="flex items-center gap-3">
          {[
            { I: Linkedin, href: "https://linkedin.com/in/aya-mekni", l: "LinkedIn" },
            { I: Github, href: "https://github.com/ayamekni", l: "GitHub" },
            { I: Globe, href: "https://aya-mekni-portfolio.vercel.app", l: "Portfolio" },
            { I: Mail, href: "mailto:aya.mekni@esprim.tn", l: "Email" },
          ].map(({ I, href, l }) => (
            <a key={l} aria-label={l} href={href} className="p-2 rounded-full glass hover:glow-cyan transition">
              <I className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}