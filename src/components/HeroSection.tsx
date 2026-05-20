import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Github, Mail } from "lucide-react";
import { useRef } from "react";
import FloatingTags from "./FloatingTags";
import AnimatedDesktop from "./AnimatedDesktop";

const STATS = [
  { value: "IIIT",   label: "Bhopal",   sublabel: "B.Tech IT '27" },
  { value: "1000+",  label: "Users",    sublabel: "Served"         },
  { value: "3★",     label: "CodeChef", sublabel: "Top 0.58%"      },
  { value: "400+",   label: "Problems", sublabel: "Solved"          },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y       = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen relative overflow-hidden flex items-center"
    >
      {/* Background floating tech tags */}
      <FloatingTags />

      {/* Gradient overlay so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/88 to-background pointer-events-none z-10" />

      <motion.div
        style={{ y, opacity }}
        className="container px-6 py-4 relative z-20 w-full"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── Left: text ── */}
            <div className="text-center lg:text-left">

              {/* Available badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-primary/8 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-medium tracking-wider uppercase">
                  Available for opportunities
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.68, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-4"
              >
                <span className="block text-foreground">Krish</span>
                <span className="block gradient-text">Singh</span>
              </motion.h1>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.28 }}
                className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                Building scalable products with{" "}
                <span className="text-primary font-medium">React</span>,{" "}
                <span style={{ color: "hsl(var(--accent))" }} className="font-medium">Node.js</span>{" "}
                &{" "}
                <span style={{ color: "hsl(var(--secondary))" }} className="font-medium">MongoDB</span>.{" "}
                Passionate about creating seamless digital experiences.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.38 }}
                className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10"
              >
                <a
                  href="https://github.com/singhkkrish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline group"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a href="mailto:krish212004singh@gmail.com" className="btn-outline">
                  <Mail className="w-4 h-4" />
                  Email Me
                </a>
                <a
                  href="https://drive.google.com/file/d/14VkR-rANkD5JYUreuBh26pOT0cfKxeab/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline group"
                >
                  <Download className="w-4 h-4" />
                  Resume
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-gradient group"
                >
                  Let's Connect
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>

            {/* ── Right: animated desktop ── */}
            <div className="hidden lg:block">
              <AnimatedDesktop />
            </div>
          </div>

          {/* ── Stats grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.52 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.62 + i * 0.09 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.18 } }}
                className="stat-card text-center py-5"
              >
                <div className="metric-value text-2xl md:text-3xl mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm font-semibold text-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5"
        >
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;