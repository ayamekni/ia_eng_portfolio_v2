import { useEffect, useState } from "react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let rx = 0, ry = 0, tx = 0, ty = 0;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      setPos({ x: tx, y: ty });
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [role=button]"));
    };
    const tick = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      setRing({ x: rx, y: ry });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="fixed pointer-events-none z-[100] hidden md:block"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "oklch(0.82 0.16 210)",
          boxShadow: "0 0 12px oklch(0.82 0.16 210)",
        }}
      />
      <div
        aria-hidden
        className="fixed pointer-events-none z-[100] hidden md:block transition-[width,height,border-color] duration-200"
        style={{
          left: ring.x,
          top: ring.y,
          transform: "translate(-50%, -50%)",
          width: hover ? 44 : 28,
          height: hover ? 44 : 28,
          borderRadius: "50%",
          border: "1px solid oklch(0.82 0.16 210 / 0.6)",
        }}
      />
    </>
  );
}