import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingTag {
  id: number;
  label: string;
  x: number;
  y: number;
  size: "sm" | "md" | "lg";
  delay: number;
  duration: number;
  opacity: number;
  driftX: number;
  driftY: number;
}

const TAGS = [
  "React.js", "Node.js", "MongoDB", "TypeScript", "Express.js",
  "Full Stack", "REST API", "Tailwind CSS", "Redux", "JWT",
  "MERN Stack", "Git", "JavaScript", "C++", "Razorpay",
  "Web Dev", "Framer Motion", "Bhopal", "CodeChef", "LeetCode",
];

const FloatingTags = () => {
  const [tags, setTags] = useState<FloatingTag[]>([]);

  useEffect(() => {
    const generated: FloatingTag[] = TAGS.map((label, i) => {
      const angle  = (i / TAGS.length) * Math.PI * 2;
      const radius = 25 + (i % 4) * 8;
      return {
        id: i,
        label,
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
        size: i < 5 ? "lg" : i < 12 ? "md" : "sm",
        delay:    (i * 0.4) % 4,
        duration: 14 + (i % 6) * 2,
        opacity:  i < 8 ? 0.85 : 0.4 + (i % 3) * 0.12,
        driftX: ((i % 5) - 2) * 28,
        driftY: ((i % 3) - 1) * 28,
      };
    });
    setTags(generated);
  }, []);

  const sizeClasses = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-sm px-5 py-2.5 font-semibold",
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {tags.map((tag) => (
        <motion.div
          key={tag.id}
          className={`floating-tag absolute ${sizeClasses[tag.size]}`}
          style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity:  [0, tag.opacity, tag.opacity, 0],
            scale:    [0.8, 1, 1, 0.8],
            x:        [0, tag.driftX, tag.driftX / 2, 0],
            y:        [0, tag.driftY, tag.driftY / 2, 0],
          }}
          transition={{
            duration: tag.duration,
            repeat: Infinity,
            delay: tag.delay,
            ease: "easeInOut",
          }}
        >
          {tag.label}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingTags;