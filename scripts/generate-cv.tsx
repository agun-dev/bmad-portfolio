/**
 * scripts/generate-cv.tsx
 * Run: npm run generate-cv
 * Output: public/cv.pdf
 */

import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Link,
  StyleSheet,
  renderToFile,
} from "@react-pdf/renderer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────

const COLOR = {
  ink: "#111111",
  secondary: "#444444",
  muted: "#666666",
  rule: "#cccccc",
  accent: "#b45309", // amber-700 — used sparingly for ATS safety
};

const FONT = {
  body: 9.5,
  small: 8.5,
  sectionLabel: 9,
  jobTitle: 10.5,
  name: 22,
  tagline: 11,
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: FONT.body,
    color: COLOR.ink,
    paddingTop: 44,
    paddingBottom: 44,
    paddingLeft: 52,
    paddingRight: 52,
    lineHeight: 1.45,
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: { marginBottom: 14 },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: FONT.name,
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  tagline: {
    fontFamily: "Helvetica",
    fontSize: FONT.tagline,
    color: COLOR.secondary,
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    fontSize: FONT.small,
    color: COLOR.muted,
  },
  contactSep: { color: COLOR.rule },

  // ── Section ─────────────────────────────────────────────────────────────────
  section: { marginBottom: 12 },
  sectionLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: FONT.sectionLabel,
    letterSpacing: 1.2,
    color: COLOR.accent,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  rule: {
    borderBottomWidth: 0.75,
    borderBottomColor: COLOR.rule,
    marginBottom: 8,
  },

  // ── Experience entry ─────────────────────────────────────────────────────────
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 1,
  },
  jobTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: FONT.jobTitle,
  },
  jobDate: {
    fontFamily: "Helvetica",
    fontSize: FONT.small,
    color: COLOR.muted,
  },
  jobMeta: {
    fontSize: FONT.small,
    color: COLOR.secondary,
    marginBottom: 5,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2.5,
    paddingLeft: 2,
  },
  bulletDot: {
    width: 12,
    color: COLOR.secondary,
  },
  bulletText: {
    flex: 1,
    color: COLOR.secondary,
  },

  // ── Education ────────────────────────────────────────────────────────────────
  eduTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: FONT.body,
    marginBottom: 1,
  },
  eduMeta: {
    fontSize: FONT.small,
    color: COLOR.secondary,
  },

  // ── Skills ───────────────────────────────────────────────────────────────────
  skillRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  skillCategory: {
    fontFamily: "Helvetica-Bold",
    fontSize: FONT.small,
    width: 110,
    color: COLOR.ink,
  },
  skillList: {
    flex: 1,
    fontSize: FONT.small,
    color: COLOR.secondary,
  },

  // ── Summary ──────────────────────────────────────────────────────────────────
  summaryText: {
    color: COLOR.secondary,
    lineHeight: 1.55,
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <View style={styles.rule} />
    </View>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <View style={styles.bullet}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CV Document
// ─────────────────────────────────────────────────────────────────────────────

function CvDocument() {
  return (
    <Document
      title="Agun Gunawan — Senior Frontend Developer CV"
      author="Agun Gunawan"
      subject="Frontend Developer CV / Resume"
      keywords="frontend developer, react, next.js, typescript, webflow, wordpress"
      creator="agun-gunawan.netlify.app"
    >
      <Page size="A4" style={styles.page}>
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.name}>Agun Gunawan</Text>
          <Text style={styles.tagline}>Senior Frontend Developer</Text>

          <View style={styles.contactRow}>
            <Text>Indramayu, Jawa Barat, Indonesia</Text>
            <Text style={styles.contactSep}> · </Text>
            <Link src="mailto:agun.gunawan@outlook.com">
              agun.gunawan@outlook.com
            </Link>
            <Text style={styles.contactSep}> · </Text>
            <Text>+62 878-3025-9648</Text>
            <Text style={styles.contactSep}> · </Text>
            <Link src="https://linkedin.com/in/agun-awan">
              linkedin.com/in/agun-awan
            </Link>
            <Text style={styles.contactSep}> · </Text>
            <Link src="https://github.com/agun-dev">github.com/agun-dev</Link>
          </View>
        </View>

        {/* ── Professional Summary ──────────────────────────────────────── */}
        <SectionHeader label="Professional Summary" />
        <View style={{ marginBottom: 12, marginTop: -6 }}>
          <Text style={styles.summaryText}>
            Senior Frontend Developer with 8+ years of experience delivering
            fast, accessible, and pixel-perfect web products for international
            clients in Australia, Ireland, and Indonesia. Specialised in React,
            Next.js, TypeScript, Webflow, and WordPress. Strong Figma-to-code
            pipeline with a proven track record of improving Core Web Vitals and
            shipping production-ready interfaces across real estate, SaaS,
            eCommerce, and cybersecurity industries. Early adopter of
            AI-assisted development workflows.
          </Text>
        </View>

        {/* ── Experience ───────────────────────────────────────────────── */}
        <SectionHeader label="Work Experience" />
        <View style={{ marginTop: -6, marginBottom: 10 }}>
          {/* SoftwareSeni */}
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>Frontend Developer</Text>
            <Text style={styles.jobDate}>January 2021 – Present</Text>
          </View>
          <Text style={styles.jobMeta}>
            SoftwareSeni · Yogyakarta, Indonesia (Remote — AU &amp; ID clients)
          </Text>
          <Bullet text="Led frontend architecture and development of Cybermatika, a B2B cybersecurity SaaS platform, using Next.js, TypeScript, Payload CMS, and Tailwind CSS." />
          <Bullet text="Engineered pixel-perfect, responsive platforms for international real estate clients including Kay & Burton, Magain, and 1st City, ensuring seamless cross-browser compatibility." />
          <Bullet text="Overhauled SoftwareSeni's AU and ID corporate websites, significantly improving Core Web Vitals, page load speeds, and SEO performance." />
          <Bullet text="Built and maintained reusable UI component systems using Tailwind CSS and SCSS to streamline styling and reduce development time." />
          <Bullet text="Leveraged AI-assisted development tools (GitHub Copilot, LLM workflows) to accelerate code delivery without sacrificing quality." />
          <Bullet text="Collaborated with Project Managers, UI/UX designers, and cross-functional teams to translate Figma wireframes into production-ready web applications." />
        </View>

        <View style={{ marginBottom: 10 }}>
          {/* PT Codelabs Indonesia */}
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>Software Developer</Text>
            <Text style={styles.jobDate}>January 2017 – December 2020</Text>
          </View>
          <Text style={styles.jobMeta}>
            PT Codelabs Indonesia · Jakarta, Indonesia
          </Text>
          <Bullet text="Developed frontend interface for StroTV, an online video streaming web platform." />
          <Bullet text="Built the flight booking UI for Misteraladin Travels, optimising user flows for domestic and international bookings." />
          <Bullet text="Maintained and optimised the Mayflower with Mastercard Travels frontend website, resolving bugs and improving performance." />
          <Bullet text="Delivered travel and loyalty platforms: KIA Tours and Travels, Instant OTA Travel, and Enreech Loyalty Program for City Tours." />
          <Bullet text="Developed internal products: POS Marketplace, Sales Forces (technician management app), and booking utilities for meeting rooms and vehicles." />
        </View>

        {/* ── Education ────────────────────────────────────────────────── */}
        <SectionHeader label="Education" />
        <View style={{ marginTop: -6, marginBottom: 12 }}>
          <Text style={styles.eduTitle}>
            D3 — Teknik Informatika (Computer Engineering Technology)
          </Text>
          <Text style={styles.eduMeta}>
            Politeknik Negeri Indramayu · 2014 – 2017
          </Text>
        </View>

        {/* ── Skills ───────────────────────────────────────────────────── */}
        <SectionHeader label="Technical Skills" />
        <View style={{ marginTop: -6 }}>
          <View style={styles.skillRow}>
            <Text style={styles.skillCategory}>Languages</Text>
            <Text style={styles.skillList}>
              HTML, CSS, JavaScript, TypeScript, PHP
            </Text>
          </View>
          <View style={styles.skillRow}>
            <Text style={styles.skillCategory}>Frameworks</Text>
            <Text style={styles.skillList}>
              React JS, Next.js, Tailwind CSS, SASS/SCSS
            </Text>
          </View>
          <View style={styles.skillRow}>
            <Text style={styles.skillCategory}>CMS &amp; No-Code</Text>
            <Text style={styles.skillList}>
              WordPress, Webflow, Elementor, Payload CMS
            </Text>
          </View>
          <View style={styles.skillRow}>
            <Text style={styles.skillCategory}>Tools</Text>
            <Text style={styles.skillList}>
              Git, Figma, GitHub Copilot, VS Code
            </Text>
          </View>
          <View style={styles.skillRow}>
            <Text style={styles.skillCategory}>Practices</Text>
            <Text style={styles.skillList}>
              Core Web Vitals Optimisation, SEO, Responsive Design,
              Cross-browser Compatibility, AI-Assisted Development, REST APIs
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Generate
// ─────────────────────────────────────────────────────────────────────────────

const outputPath = path.resolve(__dirname, "../public/cv.pdf");

async function main() {
  console.log("Generating CV…");
  await renderToFile(<CvDocument />, outputPath);
  console.log(`✓ CV saved to ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
