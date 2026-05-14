import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export function ParticlesBg() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options: ISourceOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      number: { value: 90, density: { enable: true } },
      color: { value: ["#00d4ff", "#64ffda", "#b44fff"] },
      shape: { type: "circle" },
      opacity: { value: { min: 0.2, max: 0.6 } },
      size: { value: { min: 1, max: 2.5 } },
      links: {
        enable: true,
        distance: 140,
        color: "#00d4ff",
        opacity: 0.18,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.6,
        direction: "none",
        random: true,
        outModes: { default: "bounce" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
      },
      modes: {
        grab: { distance: 160, links: { opacity: 0.5 } },
      },
    },
    detectRetina: true,
  };

  if (!ready) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Particles id="tsparticles" options={options} className="h-full w-full" />
    </div>
  );
}