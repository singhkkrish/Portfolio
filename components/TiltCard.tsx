"use client";

import { useRef, type ComponentProps } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type TiltCardProps = Omit<ComponentProps<typeof motion.div>, "onMouseMove" | "onMouseLeave"> & {
  max?: number;
  liftScale?: number;
};

export default function TiltCard({
  children,
  className = "",
  style,
  max = 9,
  liftScale = 1.015,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 240, damping: 22, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 240, damping: 22, mass: 0.6 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);
  };

  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className}`}
      style={{ ...style, rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      whileHover={reduce ? undefined : { scale: liftScale }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
