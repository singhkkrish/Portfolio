"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type Variant = "default" | "hover" | "label";

export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState("");

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 260, damping: 26, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 260, damping: 26, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setActive(true);
    document.body.classList.add("cursor-ready");

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (target) {
        const lbl = target.getAttribute("data-cursor-label") || "";
        setLabel(lbl);
        setVariant(lbl ? "label" : "hover");
      } else {
        setVariant("default");
        setLabel("");
      }
    };

    const down = () => document.body.classList.add("cursor-down");
    const up = () => document.body.classList.remove("cursor-down");

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.body.classList.remove("cursor-ready", "cursor-down");
    };
  }, [reduce, dotX, dotY]);

  if (!active) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: variant === "default" ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />
      <motion.div
        className={`cursor-ring cursor-ring--${variant}`}
        style={{ x: ringX, y: ringY }}
        animate={{ scale: variant === "default" ? 1 : variant === "label" ? 2.6 : 1.7 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        aria-hidden="true"
      >
        {variant === "label" && <span className="cursor-label">{label}</span>}
      </motion.div>
    </>
  );
}
