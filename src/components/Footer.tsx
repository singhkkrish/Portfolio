import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/singhkkrish",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/krish-singh-6903652ba/",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:krish212004singh@gmail.com",
  },
];

const navLinks = [
  { label: "Projects",     href: "#experience"      },
  { label: "Skills",       href: "#skills"           },
  { label: "Achievements", href: "#achievements"     },
  { label: "Experience",   href: "#work-experience"  },
  { label: "Education",    href: "#education"        },
  { label: "Contact",      href: "#contact"          },
];

const Footer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="relative border-t border-border/30 bg-background/50 backdrop-blur-sm">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-3xl font-bold cursor-pointer bg-transparent border-none"
            whileHover={{ scale: 1.06 }}
          >
            K<span className="gradient-text">S</span>
          </motion.button>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="hover:text-primary transition-colors duration-200 bg-transparent border-none cursor-pointer text-sm text-muted-foreground"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.12, y: -2 }}
                  className="p-3 rounded-full bg-muted/50 hover:bg-primary/20 border border-border/50 hover:border-primary/35 transition-all duration-200 group"
                  title={s.label}
                >
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                </motion.a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            © {year} Krish Singh. Built with React + Vite + TailwindCSS.
          </p>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.06, y: -2 }}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors duration-200 bg-transparent border-none cursor-pointer"
          >
            Back to top
            <ArrowUpRight className="w-3 h-3" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;