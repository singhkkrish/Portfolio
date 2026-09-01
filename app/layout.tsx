import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krish Singh — Full-stack developer",
  description: "Portfolio of Krish Singh, a product-minded full-stack developer from Bhopal, India.",
  keywords: ["Krish Singh", "full-stack developer", "React", "Next.js", "Bhopal"],
  openGraph: { title: "Krish Singh — Full-stack developer", description: "I build systems people enjoy using.", type: "website" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}