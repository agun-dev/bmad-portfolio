import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Agun Gunawan — Senior React & Webflow Developer",
    template: "%s | Agun Gunawan",
  },
  description:
    "Senior Frontend Developer with 8+ years of experience in React, Next.js, and Webflow. Crafting fast, accessible web experiences. Open to opportunities.",
  keywords: [
    "senior react developer",
    "webflow developer",
    "next.js developer",
    "frontend developer",
    "agun gunawan",
    "typescript",
  ],
  authors: [{ name: "Agun Gunawan" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Agun Gunawan — Senior React & Webflow Developer",
    description:
      "Senior Frontend Developer with 8+ years of experience in React, Next.js, and Webflow. Crafting fast, accessible web experiences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Agun Gunawan — Senior React & Webflow Developer",
      },
    ],
    siteName: "Agun Gunawan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agun Gunawan — Senior React & Webflow Developer",
    description:
      "Senior Frontend Developer with 8+ years of experience in React, Next.js, and Webflow.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Agun Gunawan",
  jobTitle: "Senior Frontend Developer",
  url: SITE_URL,
  sameAs: [
    "https://linkedin.com/in/agun-awan", // ⚠️ Replace with actual LinkedIn URL
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Webflow",
    "HTML",
    "CSS",
    "Tailwind CSS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
