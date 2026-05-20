import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FULL_TEXT = "Krish Singh";

const AnimatedDesktop = () => {
  const [displayed,    setDisplayed]    = useState("");
  const [showSub,      setShowSub]      = useState(false);
  const [cursorBlink,  setCursorBlink]  = useState(true);

  // Typewriter
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      if (i <= FULL_TEXT.length) {
        setDisplayed(FULL_TEXT.slice(0, i));
        i++;
      } else {
        clearInterval(iv);
        setShowSub(true);
      }
    }, 110);
    return () => clearInterval(iv);
  }, []);

  // Cursor blink
  useEffect(() => {
    const iv = setInterval(() => setCursorBlink((v) => !v), 520);
    return () => clearInterval(iv);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 45, scale: 0.88 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      transition={{ duration: 0.85, delay: 0.3, ease: "easeOut" }}
      className="relative mx-auto"
      style={{ maxWidth: 480 }}
    >
      {/* Monitor */}
      <div className="relative">
        {/* Gradient bezel */}
        <div
          className="rounded-2xl p-[2px]"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary) / 0.45), hsl(var(--accent) / 0.3), hsl(var(--secondary) / 0.45))",
          }}
        >
          <div
            className="bg-background rounded-xl overflow-hidden relative"
            style={{ aspectRatio: "16/10" }}
          >
            {/* Screen glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, hsl(var(--primary) / 0.07), transparent 70%)",
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              {/* Top bar */}
              <div className="absolute top-0 left-0 right-0 h-7 bg-muted/60 flex items-center px-3 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(0 80% 60%)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(45 80% 60%)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(var(--accent))" }} />
                <span className="text-[10px] text-muted-foreground ml-auto font-mono">portfolio.tsx</span>
              </div>

              {/* Content */}
              <div className="text-center mt-4">
                <div className="text-xs text-muted-foreground font-mono mb-2 opacity-55">
                  {"// Welcome to my world"}
                </div>

                <h2 className="text-2xl md:text-3xl font-bold">
                  <span className="gradient-text">{displayed}</span>
                  <span
                    className="inline-block w-0.5 h-7 ml-0.5 align-middle rounded-sm"
                    style={{
                      background: "hsl(var(--primary))",
                      opacity: cursorBlink ? 1 : 0,
                      transition: "opacity 0.1s",
                    }}
                  />
                </h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showSub ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-2"
                >
                  <span className="text-sm font-mono" style={{ color: "hsl(var(--primary))" }}>
                    {"<"}
                    <span style={{ color: "hsl(var(--accent))" }}>Developer</span>
                    {" />"}
                  </span>
                </motion.div>

                {/* Code snippet */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showSub ? 0.48 : 0 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="mt-4 space-y-0.5 text-[10px] font-mono text-muted-foreground text-left mx-auto"
                  style={{ maxWidth: 195 }}
                >
                  <div><span style={{ color: "hsl(var(--secondary))" }}>const</span>{" "}<span style={{ color: "hsl(var(--accent))" }}>skills</span> = [</div>
                  <div className="pl-3">"React", "Node.js",</div>
                  <div className="pl-3">"MongoDB", "TypeScript"</div>
                  <div>];</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Monitor stand */}
        <div className="flex flex-col items-center">
          <div
            className="w-16 h-5"
            style={{ background: "linear-gradient(180deg, hsl(var(--border)), hsl(var(--muted)))" }}
          />
          <div
            className="w-28 h-2 rounded-b-xl"
            style={{ background: "linear-gradient(180deg, hsl(var(--muted)), hsl(var(--border)))" }}
          />
        </div>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute -inset-10 -z-10 blur-3xl opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, hsl(var(--primary) / 0.35), hsl(var(--accent) / 0.18), transparent 70%)",
        }}
      />
    </motion.div>
  );
};

export default AnimatedDesktop;