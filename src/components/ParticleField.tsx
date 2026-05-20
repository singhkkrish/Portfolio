import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  driftX: number;
}

const ParticleField = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate deterministically so no hydration mismatch
    const list: Particle[] = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: (i * 37) % 100,
      y: (i * 53) % 100,
      size: 1.5 + (i % 3),
      delay: (i * 0.6) % 6,
      duration: 10 + (i % 8),
      driftX: ((i % 5) - 2) * 22,
    }));
    setParticles(list);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top:  `${p.y}%`,
            width:  p.size,
            height: p.size,
            background: `radial-gradient(circle,
              hsl(var(--primary) / 0.8),
              hsl(var(--accent)  / 0.4)
            )`,
            boxShadow: `0 0 ${p.size * 3}px hsl(var(--primary) / 0.45)`,
          }}
          animate={{
            y:       [0, -(160 + p.id * 4), 0],
            x:       [0, p.driftX, 0],
            opacity: [0.15, 0.7, 0.15],
            scale:   [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;