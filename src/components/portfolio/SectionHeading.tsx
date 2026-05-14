import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-12 text-center">
      {eyebrow && (
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="shimmer-text text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      )}
    </Reveal>
  );
}