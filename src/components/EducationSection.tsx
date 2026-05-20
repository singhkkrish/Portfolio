import { motion, useInView } from 'framer-motion';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { useRef } from 'react';

const EducationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="education" ref={sectionRef} className="py-32 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label">Background</div>
          <h2 className="text-4xl md:text-6xl font-bold">Education</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.22 } }}
          className="glow-card p-10 md:p-12 max-w-4xl relative overflow-hidden"
        >
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-accent to-secondary" />

          {/* Corner glows */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary to-accent opacity-15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-secondary to-primary opacity-15 blur-3xl pointer-events-none" />

          <div className="flex items-start gap-6 md:gap-8">
            {/* Icon */}
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 10 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ boxShadow: "0 0 28px hsl(var(--primary) / 0.38)" }}
            >
              <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
            </motion.div>

            <div className="flex-1">
              <h3 className="text-xl md:text-3xl font-bold mb-2">
                B.Tech in Information Technology
              </h3>
              <p className="text-lg text-primary font-medium mb-4">IIIT Bhopal</p>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 text-muted-foreground mb-8">
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Bhopal, India</span>
                </div>
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>2023 – 2027</span>
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-border/40">
                {[
                  { value: "Current", sub: "2nd Year" },
                  { value: "Focus", sub: "Full Stack Development" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.sub}
                    className="p-5 rounded-2xl bg-muted/30 border border-border/30"
                    whileHover={{ scale: 1.03, y: -3 }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.sub}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;