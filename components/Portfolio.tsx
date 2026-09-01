"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X } from "lucide-react";

import { education, experience, projects, skills } from "./portfolio-data";
import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";
import ParticleField from "./ParticleField";
import TiltCard from "./TiltCard";
import { MagneticLink, MagneticButton } from "./Magnetic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const nav = ["experience", "work", "education", "contact"];
const rise = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } };
const marqueeItems = [
  "React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB",
  "PostgreSQL", "Supabase", "Tailwind CSS", "Framer Motion", "GSAP", "Razorpay", "JWT", "Claude AI",
];

function Count({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current || reduce) return;
    const controls = animate(0, value, {
      duration: 1.25,
      ease: "easeOut",
      onUpdate: (n) => { if (ref.current) ref.current.textContent = String(Math.round(n)); },
    });
    return controls.stop;
  }, [inView, value, reduce]);
  return <span ref={ref} className="count-value">{reduce ? value : "0"}</span>;
}

export default function Portfolio() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const signalRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Scroll progress var + fixed-nav glass toggle, throttled via rAF.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      document.documentElement.style.setProperty("--scroll", `${window.scrollY}`);
      setScrolled(window.scrollY > 30);
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Mouse parallax for hero orbs/signal graphic via CSS custom properties.
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 2;
      const my = (e.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty("--mx", mx.toFixed(3));
      document.documentElement.style.setProperty("--my", my.toFixed(3));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  // Hero signal graphic intro animation.
  useLayoutEffect(() => {
    if (reduce || !signalRef.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(".node", { scale: 0.45, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.16, ease: "power3.out", delay: 0.7 });
      gsap.to(".signal path", { strokeDashoffset: -48, duration: 5, repeat: -1, ease: "none" });
    }, signalRef);
    return () => context.revert();
  }, [reduce]);

  // Scroll-triggered reveal for section headings not already covered by framer whileInView.
  useLayoutEffect(() => {
    if (reduce || !mainRef.current) return;
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 46, filter: "blur(6px)" },
          {
            autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
          }
        );
      });
    }, mainRef);
    return () => context.revert();
  }, [reduce]);

  return (
    <main ref={mainRef}>
      <CustomCursor />
      <ScrollProgress />
      <a className="skip" href="#content">Skip to content</a>

      <header className={`nav ${scrolled ? "nav--glass" : ""}`}>
        <MagneticLink href="#top" className="brand" aria-label="Krish Singh, home" data-cursor="link" strength={0.5}>
          KS<span>.</span>
        </MagneticLink>
        <nav aria-label="Primary">
          {nav.map((item) => (
            <MagneticLink key={item} href={`#${item}`} data-cursor="link" strength={0.6}>{item}</MagneticLink>
          ))}
        </nav>
        <MagneticLink className="availability" href="mailto:krish212004singh@gmail.com" data-cursor="link" strength={0.3}>
          <i />Available for work
        </MagneticLink>
        <MagneticButton className="menu" aria-label="Open navigation" onClick={() => setOpen(!open)} strength={0.3}>
          {open ? <X /> : <Menu />}
        </MagneticButton>
      </header>
      {open && (
        <nav className="mobile-nav">
          {nav.map((item) => <a key={item} href={`#${item}`} onClick={() => setOpen(false)}>{item}</a>)}
        </nav>
      )}

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="grain" />
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <ParticleField />
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.1, delayChildren: 0.12 }} className="hero-inner">
          <motion.p variants={rise} transition={{ duration: 0.7 }} className="eyebrow">Full-stack developer <span>↗</span> Bhopal, India</motion.p>
          <motion.h1 id="hero-title" variants={rise} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
            I build systems<br /><em>people enjoy using.</em>
          </motion.h1>
          <motion.div variants={rise} transition={{ duration: 0.7 }} className="hero-bottom">
            <p>Product-minded engineering for useful, resilient, and visually precise web experiences.</p>
            <MagneticLink href="#work" className="round-link" aria-label="Explore selected work" data-cursor="link" strength={0.45}>
              <ArrowDownRight />
            </MagneticLink>
          </motion.div>
        </motion.div>
        <div ref={signalRef} className="signal" aria-hidden="true">
          <span className="node n1" /><span className="node n2" /><span className="node n3" /><span className="node n4" />
          <svg viewBox="0 0 500 330">
            <path d="M45 260 C140 180 158 292 260 184 S390 78 470 112" />
            <path d="M45 260 C188 286 280 294 420 240" />
          </svg>
          <p>01 / SIGNAL FIELD</p>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
        </div>
      </div>

      <section id="content" className="intro section">
        <p className="section-index">(01) / THE THROUGHLINE</p>
        <div>
          <h2 className="reveal">Code is only the medium.<br />The <em>outcome</em> is the work.</h2>
          <p className="body-copy">I’m Krish, a B.Tech IT student at IIIT Bhopal and a full-stack developer who enjoys taking a product from a rough idea to an experience that feels considered at every edge.</p>
        </div>
      </section>

      <section id="experience" className="experience-section section">
        <div className="experience-heading">
          <p className="section-index">(02) / EXPERIENCE</p>
          <h2 className="reveal">Work that ships<br /><em>with intent.</em></h2>
          <p>Hands-on full-stack delivery across secure workflows, real-world data, payments, and operations.</p>
        </div>
        <div className="timeline">
          {experience.map((item, index) => (
            <motion.article
              key={item.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="timeline-side"><span>{String(index + 1).padStart(2, "0")}</span><p>{item.period}</p></div>
              <div className="timeline-content">
                <p>{item.company}</p>
                <h3>{item.role}</h3>
                <strong>{item.summary}</strong>
                <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                <div>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="work" className="work section">
        <div className="work-heading">
          <p className="section-index">(02) / SELECTED WORK</p>
          <h2 className="reveal">Built to be<br /><em>put to work.</em></h2>
          <p>Four projects, each rooted in a real user need—not a generic interface exercise.</p>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <motion.article
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.65, delay: index * 0.06 }}
              className={`project ${project.color}`}
              key={project.title}
            >
              <TiltCard
                className="project-art"
                style={project.imageFit ? { background: "#0b0d10" } : undefined}
                max={7}
                data-cursor="link"
                data-cursor-label="View"
              >
                <span>{project.id}</span>
                {project.image ? (
                  <img
                    className="project-preview"
                    src={project.image}
                    alt={`${project.title} interface preview`}
                    style={project.imageFit ? { objectFit: project.imageFit as "contain" } : undefined}
                  />
                ) : (
                  <div className="mock-window" aria-label="Restaurant POS dashboard illustration">
                    <b /><b /><b />
                    <div className="mock-content"><i /><i /><i /></div>
                  </div>
                )}
                <p className="preview-caption">Live product preview</p>
              </TiltCard>
              <div className="project-copy">
                <div className="project-meta"><span>{project.year}</span><span>{project.type}</span></div>
                <h3>{project.title}</h3>
<p>{project.description}</p>
{project.impact && <strong>{project.impact}</strong>}
<ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
                <div className="project-links">
                  <MagneticLink href={project.live} target="_blank" rel="noreferrer" data-cursor="link" strength={0.3}>
                    Live site <ArrowUpRight />
                  </MagneticLink>
                  <MagneticLink href={project.repo} target="_blank" rel="noreferrer" data-cursor="link" strength={0.3}>
                    Source <Github />
                  </MagneticLink>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="approach" className="approach section">
        <p className="section-index">(04) / HOW I WORK</p>
        <div className="approach-head">
          <h2 className="reveal">Clear intent.<br /><em>Quiet confidence.</em></h2>
          <p>I care about the unglamorous parts as much as the showpiece: interface states, data flow, sensible architecture, and the details people only notice when they are missing.</p>
        </div>
        <div className="principles">
          {[
            ["01", "Read the room", "Start with the user, the constraint, and the actual job to be done."],
            ["02", "Make it legible", "Turn complexity into calm, usable interfaces and reliable systems."],
            ["03", "Ship with care", "Polish the interaction, test the edges, and leave it easier to maintain."],
          ].map(([number, title, copy]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
        <div className="skill-grid">
          {skills.map(([title, ...items]) => (
            <article key={title}><p>{title}</p><div>{items.map((item) => <span key={item}>{item}</span>)}</div></article>
          ))}
        </div>
      </section>

      <section id="education" className="education section">
        <p className="section-index">(05) / EDUCATION</p>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="education-card"
        >
          <div>
            <p className="education-label">Academic foundation</p>
            <h2>{education.institution}</h2>
            <p className="degree">{education.degree}</p>
          </div>
          <div className="education-meta">
            <p><span>Graduation</span>{education.date}</p>
            <p><span>CGPA</span>{education.cgpa}</p>
          </div>
          <div className="coursework">
            <span>Core coursework</span>
            <div>{education.coursework.map((course) => <em key={course}>{course}</em>)}</div>
          </div>
        </motion.div>
      </section>

      <section id="proof" className="proof section">
        <p className="section-index">(06) / RECOGNITION</p>
        <div className="stat-grid reveal">
          <article><strong><Count value={3} /><sup>★</sup></strong><span>CodeChef</span><small>Rating 1624 · Top 0.58%</small></article>
          <article><strong><Count value={500} /><sup>+</sup></strong><span>DSA challenges</span><small>LeetCode &amp; CodeChef</small></article>
          <article><strong><Count value={20} /><sup>+</sup></strong><span>REST APIs shipped</span><small>School management portal</small></article>
          <article><strong>OCI</strong><span>AI Developer</span><small>Oracle Cloud Infrastructure 2024</small></article>
        </div>
        <div className="achievement-note">
          <span>CodeChef Starters 199</span>
          <p>Global Rank <b>164 / 28,222</b> — with top-10% results across multiple rated contests.</p>
        </div>
      </section>

      <section id="contact" className="contact">
        <p className="section-index">(07) / START A CONVERSATION</p>
        <h2 className="reveal">Have a product worth<br /><em>making unmistakable?</em></h2>
        <MagneticLink className="email" href="mailto:krish212004singh@gmail.com" data-cursor="link" data-cursor-label="Say hi" strength={0.25}>
          krish212004singh@gmail.com <ArrowUpRight />
        </MagneticLink>
        <div className="contact-foot">
          <p>Kanpur, India · Open to remote opportunities</p>
          <div>
            <MagneticLink href="https://github.com/singhkkrish" target="_blank" rel="noreferrer" data-cursor="link" strength={0.3}><Github /> GitHub</MagneticLink>
            <MagneticLink href="https://www.linkedin.com/in/krish-singh-6903652ba/" target="_blank" rel="noreferrer" data-cursor="link" strength={0.3}><Linkedin /> LinkedIn</MagneticLink>
            <MagneticLink href="mailto:krish212004singh@gmail.com" data-cursor="link" strength={0.3}><Mail /> Email</MagneticLink>
          </div>
        </div>
      </section>

      <footer>
        <span>© {new Date().getFullYear()} Krish Singh</span>
        <MagneticLink href="#top" data-cursor="link" strength={0.4}>Back to top ↑</MagneticLink>
      </footer>
    </main>
  );
}
