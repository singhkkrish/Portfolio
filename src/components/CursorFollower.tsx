import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────
   Trail dot — each dot is its own component so every
   useSpring call obeys the Rules of Hooks (no loops).
───────────────────────────────────────────────────────── */
interface TrailDotProps {
  sourceX: ReturnType<typeof useMotionValue<number>>;
  sourceY: ReturnType<typeof useMotionValue<number>>;
  damping: number;
  stiffness: number;
  index: number;
  visible: boolean;
}

const TrailDot = ({ sourceX, sourceY, damping, stiffness, index, visible }: TrailDotProps) => {
  const x = useSpring(sourceX, { damping, stiffness });
  const y = useSpring(sourceY, { damping, stiffness });

  const size   = Math.max(2, 11 - index * 1.8);
  const alpha  = Math.max(0.1, 0.75 - index * 0.13);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none rounded-full"
      style={{
        zIndex: 9997,
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width:  size,
        height: size,
        background: `radial-gradient(circle, hsl(var(--primary) / ${alpha}), hsl(var(--accent) / ${alpha * 0.65}))`,
        boxShadow: `0 0 ${size * 2.5}px hsl(var(--primary) / ${alpha * 0.55})`,
      }}
      animate={{ opacity: visible ? alpha : 0 }}
      transition={{ duration: 0.18 }}
    />
  );
};

/* ─────────────────────────────────────────────────────────
   Static spring configs for 5 trail dots
───────────────────────────────────────────────────────── */
const TRAIL = [
  { damping: 32, stiffness: 145 },
  { damping: 36, stiffness: 125 },
  { damping: 40, stiffness: 105 },
  { damping: 44, stiffness:  85 },
  { damping: 48, stiffness:  65 },
];

/* ─────────────────────────────────────────────────────────
   Main CursorFollower
───────────────────────────────────────────────────────── */
const CursorFollower = () => {
  const [visible,   setVisible]   = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);

  // Main cursor spring (tight)
  const x = useSpring(rawX, { damping: 26, stiffness: 230 });
  const y = useSpring(rawY, { damping: 26, stiffness: 230 });

  useEffect(() => {
    // Skip on touch devices — they have no hover
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);

      // Check if hovering a clickable element
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (el) setIsPointer(window.getComputedStyle(el).cursor === "pointer");
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* ── Main glow cursor ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none mix-blend-screen"
        style={{ zIndex: 9999, x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: isPointer ? 1.6 : 1 }}
        transition={{ duration: 0.14 }}
      >
        {/* Outer soft glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 72, height: 72, left: -36, top: -36,
            background: "radial-gradient(circle, hsl(var(--primary) / 0.22), hsl(var(--secondary) / 0.07), transparent 70%)",
            filter: "blur(8px)",
          }}
        />
        {/* Inner bright dot */}
        <div
          className="absolute rounded-full"
          style={{
            width: 13, height: 13, left: -6.5, top: -6.5,
            background: "radial-gradient(circle, hsl(var(--primary)), hsl(var(--secondary)))",
            boxShadow: "0 0 14px hsl(var(--primary) / 0.9), 0 0 28px hsl(var(--secondary) / 0.5)",
          }}
        />
      </motion.div>

      {/* ── Trail dots ── */}
      {TRAIL.map((cfg, i) => (
        <TrailDot
          key={i}
          sourceX={rawX}
          sourceY={rawY}
          damping={cfg.damping}
          stiffness={cfg.stiffness}
          index={i}
          visible={visible}
        />
      ))}
    </>
  );
};

export default CursorFollower;