import { motion, useInView } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

const experiences = [
  {
    number: "01",
    title: "Twitter Clone",
    company: "Personal Project",
    date: "2026",
    description: "Full-stack Twitter clone with React, Node.js, Express & MongoDB featuring advanced auth, multi-language support (6 languages), subscription-based posting with Razorpay, audio tweets, push notifications, and browser-based login tracking.",
    tech: ["React 18", "Node.js", "Express.js", "MongoDB", "JWT", "Razorpay", "Tailwind CSS", "Mailgun", "Twilio"],
    liveUrl: "https://twitterclone-frontend-bt0f.onrender.com",
    repoUrl: "https://github.com/singhkkrish/TWITTERCLONE",
    gradient: "from-primary to-accent",
  },
  {
    number: "02",
    title: "TraceIt - Lost & Found Platform",
    company: "Personal Project",
    date: "2025",
    description: "Engineered full-stack web application using MERN architecture with RESTful APIs, serving 1000+ active users with 99% uptime.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "REST API"],
    liveUrl: "https://traceit-frontend.onrender.com",
    repoUrl: "https://github.com/singhkkrish/TRACEIT",
    gradient: "from-accent to-secondary",
  },
  {
    number: "03",
    title: "Restaurant POS System",
    company: "Personal Project",
    date: "2025",
    description: "Constructed end-to-end POS solution with Redux Toolkit for state management, deployed on Render supporting 100+ concurrent users.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux", "Razorpay"],
    liveUrl: "https://restaurant-pos-frontend-8oj5.onrender.com/",
    repoUrl: "https://github.com/singhkkrish/Restaurant",
    gradient: "from-secondary to-primary",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={sectionRef} className="py-32 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label">Featured Work</div>
          <h2 className="text-4xl md:text-6xl font-bold">Projects</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8 max-w-5xl"
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.22 } }}
              className="glow-card p-10 md:p-12 relative group"
            >
              {/* Corner accent glows */}
              <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden pointer-events-none">
                <div className={`absolute -top-12 -left-12 w-24 h-24 bg-gradient-to-br ${exp.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-xl`} />
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                <div className={`absolute -bottom-12 -right-12 w-24 h-24 bg-gradient-to-br ${exp.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-xl`} />
              </div>

              {/* Number badge */}
              <motion.div
                className={`absolute -top-5 -left-5 w-14 h-14 rounded-2xl flex items-center justify-center font-mono text-base font-bold bg-gradient-to-br ${exp.gradient} text-primary-foreground z-10`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                style={{ boxShadow: "0 0 24px hsl(var(--primary) / 0.35)" }}
              >
                {exp.number}
              </motion.div>

              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pt-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors duration-200">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span>{exp.company}</span>
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="font-mono text-sm">{exp.date}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 relative z-20">
                  <a
                    href={exp.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted/50 hover:bg-muted border border-border/50 hover:scale-110 transition-all duration-200"
                    title="View Repository"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={exp.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 hover:from-primary/40 hover:to-secondary/40 border border-primary/30 hover:scale-110 hover:rotate-12 transition-all duration-200"
                    style={{ boxShadow: "0 0 16px hsl(var(--primary) / 0.2)" }}
                    title="View Live Site"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-7">
                {exp.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="skill-tag text-sm px-4 py-2"
                    whileHover={{ scale: 1.08, y: -3 }}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.045 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;