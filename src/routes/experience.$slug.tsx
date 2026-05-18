import { useState, useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, FileImage, PlayCircle, Sparkles, Workflow, X, ZoomIn } from "lucide-react";
import { ParticlesBg } from "@/components/portfolio/ParticlesBg";
import { Cursor } from "@/components/portfolio/Cursor";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";
import { Reveal } from "@/components/portfolio/Reveal";
import { experiences, getExperience, type ExperienceDetail } from "@/lib/experiences";

export const Route = createFileRoute("/experience/$slug")({
  loader: ({ params }) => {
    const exp = getExperience(params.slug);
    if (!exp) throw notFound();
    return exp;
  },
notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-3xl font-bold">Experience not found</h1>
      <Link to="/" className="text-cyan-300 hover:underline">
        Back to home
      </Link>
    </div>
  ),
  component: ExperienceDetailPage,
});

type LightboxItem = { title: string; caption?: string; url: string };

function ExperienceDetailPage() {
  const exp = Route.useLoaderData() as ExperienceDetail;
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <AnimatePresence>
        {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
      <ParticlesBg />
      <Cursor />
      <Navbar />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            hash="experience"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to experience
          </Link>

          {/* Hero */}
          <Reveal className="mt-6">
            <div className="glass rounded-3xl p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-md border border-cyan-400/30 text-cyan-200/90 bg-cyan-400/5">
                  {exp.period}
                </span>
                {exp.current && (
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-md border border-fuchsia-400/40 text-fuchsia-200/90 bg-fuchsia-400/10">
                    Current
                  </span>
                )}
              </div>
              <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
                {exp.role}{" "}
                <span className="text-muted-foreground">·</span>{" "}
                <span className="text-gradient">{exp.company}</span>
              </h1>
              {exp.meta && (
                <div className="text-sm text-muted-foreground mt-2">{exp.meta}</div>
              )}
              <p className="mt-5 text-base md:text-lg text-foreground/85 leading-relaxed max-w-3xl">
                {exp.summary}
              </p>

              {exp.metrics && exp.metrics.length > 0 && (
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {exp.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-cyan-400/20 bg-white/[0.02] p-4 text-center"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-gradient">
                        {m.value}
                      </div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          {/* Context / Problem / Approach */}
          {(exp.context || exp.problem || exp.approach) && (
            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {exp.context && (
                <Reveal>
                  <Section title="Context">
                    <p className="text-sm text-foreground/80 leading-relaxed">{exp.context}</p>
                  </Section>
                </Reveal>
              )}
              {exp.problem && (
                <Reveal delay={0.05}>
                  <Section title="Problem">
                    <p className="text-sm text-foreground/80 leading-relaxed">{exp.problem}</p>
                  </Section>
                </Reveal>
              )}
              {exp.approach && (
                <Reveal delay={0.1} className="md:col-span-2">
                  <Section title="Approach">
                    <ul className="space-y-2">
                      {exp.approach.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                          <Sparkles className="w-3.5 h-3.5 mt-1 shrink-0 text-cyan-300" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </Section>
                </Reveal>
              )}
            </div>
          )}

          {/* Architecture */}
          {exp.architecture && exp.architecture.length > 0 && (
            <Reveal className="mt-10">
              <Section title="Architecture" icon={<Workflow className="w-4 h-4 text-cyan-300" />}>
                <div className="grid md:grid-cols-2 gap-4">
                  {exp.architecture.map((a) => (
                    <div
                      key={a.title}
                      className="rounded-xl border border-cyan-400/15 bg-white/[0.02] p-4"
                    >
                      <div className="font-semibold text-foreground/95">{a.title}</div>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {a.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>
            </Reveal>
          )}

          {/* Achievements (full bullets) */}
          <Reveal className="mt-10">
            <Section title="Key achievements">
              <ul className="space-y-2.5">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm text-foreground/85 leading-relaxed">
                    <span className="text-cyan-400 mt-1">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </Reveal>

          {/* Tech stack */}
          {exp.techStack && exp.techStack.length > 0 && (
            <Reveal className="mt-10">
              <Section title="Tech stack">
                <div className="space-y-5">
                  {exp.techStack.map((g) => (
                    <div key={g.label}>
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/70 mb-2">
                        {g.label}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {g.items.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[11px] px-2 py-1 rounded-md border"
                            style={{
                              backgroundColor: "rgba(100,255,218,0.08)",
                              borderColor: "rgba(100,255,218,0.4)",
                              color: "rgba(200,255,240,0.92)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </Reveal>
          )}

          {/* Media */}
          {exp.media && (exp.media.diagrams || exp.media.videos || exp.media.gallery) && (
            <Reveal className="mt-10">
              <Section title="Diagrams, demos & gallery">
                <div className="space-y-8">
                  {exp.media.diagrams && exp.media.diagrams.length > 0 && (
                    <MediaGroup
                      label="Architecture diagrams"
                      icon={<Workflow className="w-4 h-4" />}
                      items={exp.media.diagrams}
                      fallback="Diagram coming soon"
                      onOpen={setLightbox}
                    />
                  )}
                  {exp.media.videos && exp.media.videos.length > 0 && (
                    <MediaGroup
                      label="Demo videos"
                      icon={<PlayCircle className="w-4 h-4" />}
                      items={exp.media.videos}
                      fallback="Video coming soon"
                      onOpen={setLightbox}
                    />
                  )}
                  {exp.media.gallery && exp.media.gallery.length > 0 && (
                    <MediaGroup
                      label="Gallery"
                      icon={<FileImage className="w-4 h-4" />}
                      items={exp.media.gallery}
                      fallback="Image coming soon"
                      onOpen={setLightbox}
                    />
                  )}
                </div>
              </Section>
            </Reveal>
          )}

          {/* Links */}
          {exp.links && exp.links.length > 0 && (
            <Reveal className="mt-10">
              <Section title="Links">
                <div className="flex flex-wrap gap-2">
                  {exp.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/[0.03] px-3 py-1.5 text-sm hover:bg-white/[0.06] transition"
                    >
                      {l.label}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </Section>
            </Reveal>
          )}

          <ExperiencePrevNext currentSlug={exp.slug} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ExperiencePrevNext({ currentSlug }: { currentSlug: string }) {
  const idx = experiences.findIndex((e) => e.slug === currentSlug);
  const prev = idx > 0 ? experiences[idx - 1] : null;
  const next = idx < experiences.length - 1 ? experiences[idx + 1] : null;

  return (
    <Reveal className="mt-14">
      <div className="grid grid-cols-2 gap-3">
        {prev ? (
          <Link
            to="/experience/$slug"
            params={{ slug: prev.slug }}
            className="group glass rounded-2xl p-5 hover:glow-cyan transition flex flex-col gap-2"
          >
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-cyan-300 transition">
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous
            </div>
            <div className="font-semibold leading-snug">
              <span className="text-gradient">{prev.company}</span>
            </div>
            <div className="font-mono text-[11px] text-muted-foreground">{prev.role}</div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            to="/experience/$slug"
            params={{ slug: next.slug }}
            className="group glass rounded-2xl p-5 hover:glow-purple transition flex flex-col gap-2 text-right items-end"
          >
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-fuchsia-300 transition">
              Next
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <div className="font-semibold leading-snug">
              <span className="text-gradient">{next.company}</span>
            </div>
            <div className="font-mono text-[11px] text-muted-foreground">{next.role}</div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </Reveal>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-xl md:text-2xl font-semibold text-gradient">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function MediaGroup({
  label,
  icon,
  items,
  fallback,
  onOpen,
}: {
  label: string;
  icon: React.ReactNode;
  items: { title: string; caption?: string; url?: string }[];
  fallback: string;
  onOpen: (item: LightboxItem) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/70 mb-3">
        {icon}
        <span>{label}</span>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((m, i) => (
          <div
            key={i}
            onClick={() => m.url && onOpen(m as LightboxItem)}
            className={`rounded-xl border bg-white/[0.02] overflow-hidden transition ${
              m.url
                ? "border-cyan-400/15 cursor-zoom-in group/card hover:border-cyan-400/40 hover:bg-white/[0.04]"
                : "border-white/[0.06]"
            }`}
          >
            <div className="aspect-video relative flex items-center justify-center bg-gradient-to-br from-cyan-500/5 to-fuchsia-500/5 text-xs text-muted-foreground overflow-hidden">
              {m.url ? (
                <>
                  <img
                    src={m.url}
                    alt={m.title}
                    className="w-full h-full object-contain transition duration-300 group-hover/card:scale-[1.03]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity bg-slate-950/40">
                    <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-white/10 border border-white/20 backdrop-blur-sm text-white text-xs font-mono">
                      <ZoomIn className="w-3.5 h-3.5" />
                      click to expand
                    </div>
                  </div>
                </>
              ) : (
                <span className="font-mono">{fallback}</span>
              )}
            </div>
            <div className="p-3">
              <div className="text-sm font-medium">{m.title}</div>
              {m.caption && (
                <div className="text-xs text-muted-foreground mt-0.5">{m.caption}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Lightbox({ item, onClose }: { item: LightboxItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      {/* Blurry galaxy backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(6,182,212,0.07)_0%,rgba(168,85,247,0.04)_40%,transparent_70%)]" />

      {/* Panel */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 24 }}
        transition={{ type: "spring", damping: 26, stiffness: 300, mass: 0.85 }}
        className="relative z-10 w-full max-w-5xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="glass rounded-2xl overflow-hidden flex flex-col"
          style={{
            boxShadow:
              "0 0 0 1px rgba(100,220,255,0.13), 0 32px 90px rgba(0,0,0,0.65), 0 0 80px rgba(6,182,212,0.07)",
          }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07] shrink-0">
            <div className="flex items-center gap-2.5">
              <Workflow className="w-4 h-4 text-cyan-300/60 shrink-0" />
              <div>
                <div className="text-sm font-semibold leading-snug">{item.title}</div>
                {item.caption && (
                  <div className="text-xs text-muted-foreground mt-0.5">{item.caption}</div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="ml-4 shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:border-cyan-400/40 hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Image */}
          <div className="p-5 md:p-7 flex items-center justify-center overflow-auto">
            <img
              src={item.url}
              alt={item.title}
              className="max-w-full max-h-[72vh] w-auto h-auto object-contain rounded-xl"
              style={{ filter: "drop-shadow(0 6px 32px rgba(6,182,212,0.14))" }}
            />
          </div>
        </div>

        <p className="text-center font-mono text-[10px] text-muted-foreground/40 mt-3 tracking-widest">
          ESC or click outside to close
        </p>
      </motion.div>
    </motion.div>
  );
}