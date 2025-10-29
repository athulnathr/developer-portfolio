import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/ui/SmoothScroll";
import CustomCursor from "./components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "John Doe - Senior Frontend Engineer",
  description:
    "Portfolio of a passionate Senior Frontend Engineer specializing in React, Next.js, and interactive web experiences.",
  keywords: [
    "frontend",
    "developer",
    "react",
    "nextjs",
    "portfolio",
    "web development",
  ],
  authors: [{ name: "John Doe" }],
  openGraph: {
    title: "John Doe - Senior Frontend Engineer",
    description:
      "Portfolio showcasing modern web development projects and expertise",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
