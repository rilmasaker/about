import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";

const font = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),

  title: {
    default: "Marcin Wydra - About Me",
    template: "%s | Marcin Wydra",
  },

  description:
    "Marcin Wydra portfolio website with accessibility features including light, dark, and high-contrast themes. Built with Next.js, React, and TypeScript.",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "/",
    title: "Marcin Wydra - About Me",
    description:
      "Portfolio website focused on performance and accessibility. Built with Next.js, React, and TypeScript.",
    siteName: "Marcin Wydra",
    locale: "en_US",
    images: [
      {
        url: "/MarcinWydra.jpg",
        width: 1200,
        height: 630,
        alt: "Marcin Wydra",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Marcin Wydra - About Me",
    description:
      "Portfolio website focused on performance and accessibility. Built with Next.js, React, and TypeScript.",
    images: ["/MarcinWydra.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  keywords: [
    "Marcin Wydra",
    "Full-stack developer",
    "Accessibility",
    "WCAG",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
  ],
  authors: [{ name: "Marcin Wydra" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={font.variable}>
      <body className="antialiased font-sans">
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
