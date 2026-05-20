import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: "Languages",
    gradient: "from-primary to-accent",
    skills: ["HTML", "CSS", "JavaScript", "C", "C++", "TypeScript"],
  },
  {
    title: "Frontend",
    gradient: "from-accent to-secondary",
    skills: ["React.js", "Tailwind CSS", "Redux", "Framer Motion", "Lucide Icons", "React Router"],
  },
  {
    title: "Backend",
    gradient: "from-secondary to-primary",
    skills: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST API", "JWT", "Razorpay", "Mailgun", "Twilio"],
  },
  {
    title: "Tools & Libraries",
    gradient: "from-primary via-accent to-secondary",
    skills: ["Git", "GitHub", "VS Code", "Postman", "Multer", "bcryptjs", "ua-parser-js", "geoip-lite"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.48, ease: "easeOut" } },
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={sectionRef} className="py-32 relative">
      <div className="container px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label">Expertise</div>
          <h2 className="text-4xl md:text-6xl font-bold">Tech Stack</h2>
        </motion.div>

        {/* Single row — 4 equal columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -8, transition: { duration: 0.2 } }}
              className="glow-card p-7 relative overflow-hidden group flex flex-col"
            >
              {/* Top accent line */}
              <div
                className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${category.gradient}`}
              />

              {/* Corner glow */}
              <div
                className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-22 transition-opacity duration-500 blur-3xl pointer-events-none`}
              />

              {/* Category header */}
              <h3 className="text-base font-semibold mb-6 flex items-center gap-2.5">
                <motion.span
                  className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${category.gradient} flex-shrink-0`}
                  animate={{ scale: [1, 1.35, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: catIndex * 0.3 }}
                />
                {category.title}
              </h3>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="skill-tag text-xs px-3 py-1.5 cursor-default"
                    initial={{ opacity: 0, scale: 0.78, y: 16 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.36,
                      delay: catIndex * 0.12 + skillIndex * 0.06,
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -3,
                      boxShadow: "0 0 18px hsl(var(--primary) / 0.32)",
                    }}
                  >
                    {skill}
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

export default SkillsSection;