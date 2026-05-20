import { motion, useInView } from "framer-motion";
import { Mail, Phone, Github, Linkedin, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { useRef } from "react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "krish212004singh@gmail.com",
    href: "mailto:krish212004singh@gmail.com",
    gradient: "from-primary to-accent",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9998554819",
    href: "tel:+919998554819",
    gradient: "from-accent to-secondary",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/singhkkrish",
    href: "https://github.com/singhkkrish",
    gradient: "from-secondary to-primary",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://www.linkedin.com/in/krish-singh-6903652ba/",
    gradient: "from-primary to-accent",
  },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto text-center">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="section-label justify-center">Get in Touch</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Let's Build Something
              <span className="block gradient-text">Amazing Together</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I'm always excited to connect with fellow developers, discuss new
              opportunities, or collaborate on interesting projects. Feel free to reach out!
            </p>
          </motion.div>

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-12"
          >
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm text-muted-foreground">
              Bhopal, India • Open to Remote
            </span>
          </motion.div>

          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid sm:grid-cols-2 gap-4 mb-12"
          >
            {contactLinks.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    contact.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.4 + index * 0.09 }}
                  whileHover={{ scale: 1.025, y: -3, transition: { duration: 0.18 } }}
                  className="glow-card p-6 flex items-center gap-4 group text-left"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                      {contact.label}
                    </div>
                    <div className="font-medium truncate group-hover:text-primary transition-colors duration-200 text-sm md:text-base">
                      {contact.value}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.a
            href="mailto:krish212004singh@gmail.com"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.72 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.18 } }}
            className="btn-gradient inline-flex group"
          >
            <Sparkles className="w-4 h-4" />
            Start a Conversation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;