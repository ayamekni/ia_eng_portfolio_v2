import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  // Tight inner dot
  const dotX = useSpring(cursorX, { stiffness: 1200, damping: 60 });
  const dotY = useSpring(cursorY, { stiffness: 1200, damping: 60 });

  // Lagging outer ring — creates the trail effect
  const ringX = useSpring(cursorX, { stiffness: 180, damping: 28 });
  const ringY = useSpring(cursorY, { stiffness: 180, damping: 28 });

  useEffect(() => {
    // Skip on touch / coarse-pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setVisible(true);
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [role='button'], input, textarea, label, select"));
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring — lags behind, expands on hover */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan-400 pointer-events-none z-[9999]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 48 : 26,
          height: hovering ? 48 : 26,
          opacity: hovering ? 0.85 : 0.55,
          borderColor: hovering ? "oklch(0.65 0.22 310)" : "oklch(0.82 0.16 210)",
          boxShadow: hovering
            ? "0 0 12px oklch(0.65 0.22 310 / 0.5)"
            : "0 0 6px oklch(0.82 0.16 210 / 0.3)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />

      {/* Inner dot — snappy, hides on hover */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400 pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hovering ? 0 : 1, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
