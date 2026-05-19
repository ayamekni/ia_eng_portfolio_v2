import { useEffect, useState } from "react";
import { Download, Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navbar() {
  const { lang, t, toggle } = useLanguage();
  const links = t.nav.links;
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120;
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(l.id);
          return;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [links]);

  return (
    <>
      {/* Floating language toggle — top-right, below navbar */}
      <button
        onClick={toggle}
        aria-label="Toggle language"
        className="fixed top-20 right-5 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-strong border border-white/15 text-xs font-mono font-semibold text-foreground hover:border-cyan-400/50 hover:text-cyan-300 transition shadow-lg"
      >
        <Globe className="w-3.5 h-3.5" />
        {lang === "en" ? "FR" : "EN"}
      </button>

      <header className="fixed top-0 inset-x-0 z-50 px-3 pt-3">
        <nav className="glass-strong mx-auto max-w-6xl rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between">
          <a href="/#home" className="font-mono text-sm font-semibold">
            <span className="text-gradient">{"<"}aya.mekni{"/>"}</span>
          </a>
          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`/#${l.id}`}
                  className={`relative px-3 py-1.5 text-sm transition-colors rounded-md ${
                    active === l.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active === l.id && (
                    <span className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-400/20 to-fuchsia-400/20 -z-10" />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href="/Aya_Mekni_CV_.pdf"
              download="Aya_Mekni_CV.pdf"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium border-gradient text-foreground hover:opacity-90 transition"
            >
              <Download className="w-4 h-4" />
              {t.nav.downloadCV}
            </a>
            <button
              className="lg:hidden p-2 rounded-md hover:bg-white/5"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
        {open && (
          <div className="lg:hidden glass-strong mx-auto max-w-6xl mt-2 rounded-2xl p-3">
            <ul className="grid grid-cols-2 gap-1">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`/#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm ${
                      active === l.id ? "text-gradient font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
