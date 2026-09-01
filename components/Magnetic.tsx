"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

type MagneticLinkProps = ComponentProps<typeof motion.a> & { strength?: number };

export function MagneticLink({ strength = 0.35, children, className, ...rest }: MagneticLinkProps) {
  const { ref, style, onMouseMove, onMouseLeave } = useMagnetic<HTMLAnchorElement>(strength);
  return (
    <motion.a
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      {...rest}
    >
      {children}
    </motion.a>
  );
}

type MagneticButtonProps = ComponentProps<typeof motion.button> & { strength?: number };

export function MagneticButton({ strength = 0.35, children, className, ...rest }: MagneticButtonProps) {
  const { ref, style, onMouseMove, onMouseLeave } = useMagnetic<HTMLButtonElement>(strength);
  return (
    <motion.button
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
