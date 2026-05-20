import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { useRef } from 'react';

const highlights = [
  "Built a full-stack app with React, Node.js, Express & MongoDB",
  "Implemented auth, payments, notifications & multi-language support",
  "Focused on security, scalability and real-world edge cases",
];

const techStack = [
  "React", "Node.js", "Express.js", "MongoDB", "JWT", "Razorpay", "Tailwind CSS",
];

const WorkExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="work-experience" ref={sectionRef} className="py-32 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label">Career</div>
          <h2 className="text-4xl md:text-6xl font-bold">Experience</h2>
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
              <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl md:text-3xl font-bold mb-2">
                Full Stack Web Development Intern
              </h3>
              <p className="text-lg text-primary font-medium mb-4">ElevanceSkills</p>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Dec 2025 – Jan 2026</span>
                </div>
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Remote</span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">
                Completed a Full Stack Web Development Internship, building a production-ready
                application and gaining hands-on experience in end-to-end system development.
              </p>

              {/* Highlights */}
              <div className="space-y-3 pt-5 border-t border-border/40 mb-7">
                {highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -18 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.38 + i * 0.1 }}
                  >
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm md:text-base">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="skill-tag text-sm px-4 py-2"
                    whileHover={{ scale: 1.09, y: -3 }}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.55 + i * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;