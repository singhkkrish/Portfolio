import { motion } from "framer-motion";

const MorphingBlobs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary blob — top-left */}
      <motion.div
        className="blob blob-1 w-[580px] h-[580px] -top-52 -left-52"
        animate={{ x: [0, 90, 40, 0], y: [0, 45, 90, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      {/* Accent blob — right */}
      <motion.div
        className="blob blob-2 w-[480px] h-[480px] top-1/3 -right-44"
        animate={{ x: [0, -70, -35, 0], y: [0, 70, 35, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      {/* Secondary blob — bottom */}
      <motion.div
        className="blob blob-3 w-[380px] h-[380px] bottom-0 left-1/4"
        animate={{ x: [0, 55, -25, 0], y: [0, -55, -28, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Small floating particles */}
      {Array.from({ length: 6 }, (_, i) => {
        const sizes   = [8, 5, 7, 4, 6, 5];
        const lefts   = [15, 70, 40, 85, 25, 60];
        const tops    = [20, 60, 80, 30, 50, 10];
        const delays  = [0, 2, 4, 1, 3, 5];
        const durations = [12, 14, 11, 15, 13, 16];

        return (
          <motion.div
            key={i}
            className="particle"
            style={{
              width: sizes[i],
              height: sizes[i],
              left: `${lefts[i]}%`,
              top:  `${tops[i]}%`,
              background: `radial-gradient(circle,
                hsl(var(--primary) / 0.55),
                hsl(var(--accent)  / 0.35)
              )`,
              boxShadow: `0 0 ${sizes[i] * 3}px hsl(var(--primary) / 0.4)`,
            }}
            animate={{
              y:       [0, -(90 + i * 12), 0],
              x:       [0, (i % 2 === 0 ? 40 : -40), 0],
              scale:   [1, 1.4, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: durations[i],
              repeat: Infinity,
              ease: "easeInOut",
              delay: delays[i],
            }}
          />
        );
      })}
    </div>
  );
};

export default MorphingBlobs;