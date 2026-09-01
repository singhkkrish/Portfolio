"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Point = { x: number; y: number; z: number; vx: number; vy: number };

export default function ParticleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let points: Point[] = [];

    const pointCount = () => Math.min(70, Math.max(24, Math.floor((window.innerWidth * window.innerHeight) / 22000)));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouseX = width / 2;
      mouseY = height / 2;
      targetX = mouseX;
      targetY = mouseY;
      points = Array.from({ length: pointCount() }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: 0.4 + Math.random() * 0.8,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const step = () => {
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;
      ctx.clearRect(0, 0, width, height);

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      const parallax = (p: Point) => ({
        x: p.x + (mouseX - width / 2) * 0.025 * p.z,
        y: p.y + (mouseY - height / 2) * 0.025 * p.z,
      });

      for (let i = 0; i < points.length; i++) {
        const a = parallax(points[i]);
        for (let j = i + 1; j < points.length; j++) {
          const b = parallax(points[j]);
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(200,255,56,${0.14 * (1 - dist / 130) * points[i].z})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(243,240,233,${0.55 * points[i].z})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.1 * points[i].z + 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduce]);

  if (reduce) return null;
  return <canvas ref={canvasRef} className={`particle-field ${className}`} aria-hidden="true" />;
}
