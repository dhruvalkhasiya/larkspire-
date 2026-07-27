import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Larkspire Studios | Premium 3D Web Design & Development Agency",
  description: "We Design | We Develop | We Deliver. Larkspire Studios is a cinematic 3D digital agency crafting bespoke, high-performance web experiences. Founded by Parmar Tirthraj & Dhruval Khasiya.",
  keywords: ["Larkspire Studios", "3D Website", "Web Development Agency", "Parmar Tirthraj", "Dhruval Khasiya", "Creative Agency", "Next.js 3D", "Three.js Portfolio"],
  authors: [{ name: "Parmar Tirthraj" }, { name: "Dhruval Khasiya" }],
  openGraph: {
    title: "Larkspire Studios | Premium 3D Web Design & Development Agency",
    description: "We Design | We Develop | We Deliver. Cinematic 3D digital agency founded by Parmar Tirthraj & Dhruval Khasiya.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Larkspire Studios | Premium 3D Web Agency",
    description: "Cinematic 3D web experiences founded by Parmar Tirthraj & Dhruval Khasiya.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased dark`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="min-h-full bg-bg text-text font-body selection:bg-gold selection:text-bg">
        {children}
      </body>
    </html>
  );
}
