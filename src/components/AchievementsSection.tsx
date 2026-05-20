import { motion, useInView } from 'framer-motion';
import { Trophy, Star, Code, Cloud } from 'lucide-react';
import { useRef } from 'react';

const achievements = [
  {
    icon: Trophy,
    value: "1624",
    label: "CodeChef Rating",
    sublabel: "3-Star • singh_krish",
    gradient: "from-primary to-accent",
  },
  {
    icon: Star,
    value: "Top 0.58%",
    label: "Global Rank 164",
    sublabel: "CodeChef Starters 199",
    gradient: "from-primary to-accent",
  },
  {
    icon: Code,
    value: "400+",
    label: "Problems Solved",
    sublabel: "LeetCode & CodeChef",
    gradient: "from-accent to-secondary",
  },
  {
    icon: Cloud,
    value: "Certified",
    label: "Oracle OCI",
    sublabel: "AI Developer Pro",
    gradient: "from-secondary to-accent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.91 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.48 } },
};

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="achievements" ref={sectionRef} className="py-32 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label">Recognition</div>
          <h2 className="text-4xl md:text-6xl font-bold">Achievements</h2>
        </motion.div>

        {/* Single row — 4 equal columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.04, transition: { duration: 0.2 } }}
                className="glow-card p-8 text-center group relative overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Corner accents */}
                <div
                  className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-15 group-hover:opacity-35 transition-opacity duration-500 blur-2xl pointer-events-none`}
                />
                <div
                  className={`absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-15 group-hover:opacity-35 transition-opacity duration-500 blur-2xl pointer-events-none`}
                />

                {/* Floating icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-5`}
                  style={{ boxShadow: "0 0 24px hsl(var(--primary) / 0.25)" }}
                  whileHover={{ scale: 1.12, rotate: 8 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.22 }}
                >
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </motion.div>

                {/* Value */}
                <motion.div
                  className="text-3xl md:text-4xl font-bold mb-2 leading-tight"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.28 + index * 0.09 }}
                >
                  {item.value}
                </motion.div>

                <div className="text-sm font-medium text-foreground mb-1">
                  {item.label}
                </div>
                <div className="text-xs text-muted-foreground leading-snug">
                  {item.sublabel}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;