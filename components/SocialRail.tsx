"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin } from "lucide-react";
import { MagneticLink } from "./Magnetic";
import { LeetCodeIcon, CodeChefIcon } from "./PlatformIcons";

const links = [
  { href: "https://leetcode.com/singhKrish/", label: "LeetCode", Icon: LeetCodeIcon },
  { href: "https://www.codechef.com/users/singh_krish", label: "CodeChef", Icon: CodeChefIcon },
  { href: "https://github.com/singhkkrish", label: "GitHub", Icon: Github },
  { href: "https://www.linkedin.com/in/krish-singh-6903652ba/", label: "LinkedIn", Icon: Linkedin },
];

export default function SocialRail() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.4);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`social-rail ${visible ? "social-rail--visible" : ""}`}>
      <span className="social-rail-line" />
      {links.map(({ href, label, Icon }) => (
        <MagneticLink
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          data-cursor="link"
          data-cursor-label={label}
          aria-label={`${label} profile`}
          strength={0.3}
        >
          <Icon />
        </MagneticLink>
      ))}
      <span className="social-rail-line" />
    </div>
  );
}