"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Gives an element a subtle "magnetic" pull toward the cursor while hovered,
 * and springs back to rest on mouse leave. Disabled automatically when the
 * user prefers reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent<T>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, style: { x: springX, y: springY }, onMouseMove, onMouseLeave };
}
