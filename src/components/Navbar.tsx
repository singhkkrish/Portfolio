import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const NAV_LINKS = [
  { href: "#experience",      label: "Projects"      },
  { href: "#skills",          label: "Skills"        },
  { href: "#achievements",    label: "Achievements"  },
  { href: "#work-experience", label: "Experience"    },
  { href: "#education",       label: "Education"     },
];

/* ─── Animated toggle button ─── */
const ThemeToggle = ({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) => (
  <motion.button
    onClick={onToggle}
    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    whileHover={{ scale: 1.12 }}
    whileTap={{ scale: 0.88 }}
    className="relative w-9 h-9 rounded-full flex items-center justify-center
               border border-border/60 bg-muted/50
               hover:bg-muted hover:border-primary/50
               transition-all duration-200 cursor-pointer flex-shrink-0"
  >
    {/* Sun — shown in dark mode */}
    <motion.span
      className="absolute"
      initial={false}
      animate={{
        opacity: isDark ? 1 : 0,
        rotate:  isDark ? 0 : 90,
        scale:   isDark ? 1 : 0.4,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <Sun size={16} className="text-primary" />
    </motion.span>

    {/* Moon — shown in light mode */}
    <motion.span
      className="absolute"
      initial={false}
      animate={{
        opacity: isDark ? 0 : 1,
        rotate:  isDark ? -90 : 0,
        scale:   isDark ? 0.4 : 1,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <Moon size={16} className="text-primary" />
    </motion.span>
  </motion.button>
);

/* ─── Navbar ─── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme }  = useTheme();
  const isDark                  = theme === "dark";

  const { scrollY } = useScroll();

  const navBg = useTransform(
    scrollY,
    [0, 80],
    isDark
      ? ["rgba(9,11,17,0)", "rgba(9,11,17,0.92)"]
      : ["rgba(248,250,252,0)", "rgba(248,250,252,0.92)"]
  );

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{ backgroundColor: navBg }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl border-b border-border/30 shadow-lg shadow-black/10"
          : ""
      }`}
    >
      <div className="container px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <motion.a
          href="#"
          className="relative group text-2xl font-bold"
          whileHover={{ scale: 1.05 }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          K<span className="gradient-text">S</span>
          <motion.span
            className="absolute -bottom-1 left-0 w-full h-0.5 origin-left"
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
            }}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.28 }}
          />
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1,  y: 0   }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="relative text-sm font-medium text-muted-foreground
                         hover:text-foreground transition-colors group
                         bg-transparent border-none cursor-pointer"
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full
                           bg-gradient-to-r from-primary to-accent
                           group-hover:w-full transition-all duration-300"
              />
            </motion.button>
          ))}

          {/* Theme toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1,  scale: 1   }}
            transition={{ duration: 0.4, delay: 0.38 }}
          >
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </motion.div>

          {/* Contact CTA */}
          <motion.button
            onClick={() => handleNavClick("#contact")}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1,  scale: 1   }}
            transition={{ duration: 0.4, delay: 0.46 }}
            whileHover={{ scale: 1.05 }}
            className="px-5 py-2.5 rounded-full text-sm font-semibold
                       text-primary-foreground transition-all duration-300
                       border-none cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
            }}
          >
            Contact
          </motion.button>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="text-foreground p-2 rounded-lg hover:bg-muted/50
                       transition-colors border-none bg-transparent cursor-pointer"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="md:hidden overflow-hidden bg-card/95 backdrop-blur-xl
                   border-t border-border/30"
      >
        <div className="container px-6 py-5 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-sm font-medium text-muted-foreground
                         hover:text-primary transition-colors py-2
                         border-b border-border/20 last:border-0
                         bg-transparent border-x-0 border-t-0 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contact")}
            className="btn-gradient text-center mt-2 justify-center border-none cursor-pointer"
          >
            Contact
          </button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;