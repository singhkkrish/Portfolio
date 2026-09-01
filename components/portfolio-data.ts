export const projects = [
  { id: "01", title: "Aurora Invoice AI", year: "2026", type: "AI invoicing SaaS", description: "A calm, capable workspace for creating invoices, managing clients, tracking payments, and turning plain-language prompts into professional communication.", impact: "AI-assisted financial workflows", stack: ["Next.js 16", "TypeScript", "Supabase", "Claude AI", "Resend"], live: "https://aurora-invoice.onrender.com", repo: "https://github.com/singhkkrish/AURORA_INVOICE", image: "/project-previews/aurora.png", color: "violet" },
  { id: "02", title: "TraceIt", year: "2025", type: "Lost & found platform", description: "A full-stack platform designed to make the stressful, human task of recovering lost items feel simple and trustworthy.", impact: "1,000+ active users served", stack: ["React", "Node.js", "Express", "MongoDB", "JWT"], live: "https://traceit-frontend.onrender.com", repo: "https://github.com/singhkkrish/TRACEIT", image: "/project-previews/traceit.png", color: "lime" },
  { id: "03", title: "Twitter Clone", year: "2026", type: "Social platform", description: "A feature-rich social experience with secure authentication, six-language support, subscription posting, audio tweets and real-time minded product details.", impact: "A real-world full-stack systems study", stack: ["React", "Node.js", "MongoDB", "Razorpay", "Twilio"], live: "https://twitterclone-frontend-bt0f.onrender.com", repo: "https://github.com/singhkkrish/TWITTERCLONE", image: "/project-previews/twitter.png", color: "blue" },
  { id: "04", title: "Restaurant POS", year: "2025", type: "Operations software", description: "An end-to-end point-of-sale experience that brings orders, state, and payments into one focused operational flow.", impact: "Built for 100+ concurrent users", stack: ["React", "Redux", "Node.js", "MongoDB", "Razorpay"], live: "https://restaurant-pos-frontend-8oj5.onrender.com/", repo: "https://github.com/singhkkrish/Restaurant", image: "/project-previews/restaurant-dashboard.png",imageFit: "contain", color: "coral" },
];

export const skills = [
  ["Product UI", "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  ["Applications", "Node.js", "Express", "REST APIs", "JWT", "Razorpay"],
  ["Data", "MongoDB", "PostgreSQL", "Supabase", "Mongoose"],
  ["Practice", "Git", "GitHub", "Postman", "Figma", "Problem solving"],
];

export const experience = [
  {
    period: "Mar 2026 — Jun 2026", role: "Freelance Full Stack Developer", company: "Self-employed · Remote", 
    summary: "Collaborated with a fellow developer to deliver operational platforms for schools and gyms.",
    highlights: ["School Management Portal: 20+ REST APIs for 500+ student records; JWT/RBAC for admins, teachers, and staff.", "Reduced manual record management by 60% and API response time by 30% through focused dashboards and query optimization.", "Gym Management System: 15+ REST APIs managing 300+ member records, attendance, subscriptions, and revenue insights."],
    tags: ["React", "Node.js", "Express", "MongoDB", "Cloudinary", "CI/CD"]
  },
  {
    period: "Dec 2025 — Jan 2026", role: "Full Stack Web Development Intern", company: "ElevanceSkills · Remote", 
    summary: "Built production-oriented product features across authentication, payments, notifications, and localization.",
    highlights: ["Developed JWT authentication, OTP verification, RBAC, and a login-tracking dashboard with browser, OS, IP geolocation, and session data.", "Shipped push notifications, voice recording/audio upload, six-language support, and Razorpay subscriptions with automated invoicing."],
    tags: ["MERN", "JWT", "Razorpay", "Twilio", "Mailgun", "Tailwind CSS"]
  }
];

export const education = {
  institution: "Indian Institute of Information Technology, Bhopal",
  degree: "Bachelor of Technology in Information Technology",
  date: "Expected June 2027",
  cgpa: "8.12 / 10",
  coursework: ["Data Structures & Algorithms", "Database Management Systems", "Object-Oriented Programming", "Operating Systems", "Competitive Programming"]
};
