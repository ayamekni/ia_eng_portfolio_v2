import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 60,
        background: "linear-gradient(to right, oklch(0.82 0.16 210), oklch(0.65 0.22 310))",
        boxShadow: "0 0 8px oklch(0.82 0.16 210 / 0.6)",
      }}
    />
  );
}
