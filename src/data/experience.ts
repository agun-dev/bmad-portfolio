// src/data/experience.ts

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startYear: number;
  endYear: number | null;
  location: string;
  responsibilities: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "softwareseni",
    company: "PT Software Seni Indonesia",
    role: "Frontend Developer",
    startYear: 2021,
    endYear: 2026,
    location: "Yogyakarta, Indonesia",
    responsibilities: [
      "Led the frontend architecture and development of Cybermatika, a core internal enterprise product aimed at optimising company operations and internal workflows.",
      "Engineered pixel-perfect, highly responsive web platforms for high-end international real estate clients including Kay & Burton, Magain, and 1st City, ensuring seamless cross-browser compatibility.",
      "Overhauled and optimised the frontend execution of PT Software Seni Indonesia's official ID and AU corporate websites, significantly improving Core Web Vitals, page load speeds, and SEO performance.",
      "Utilised Tailwind CSS, SCSS, and modern layout techniques to build reusable UI components and streamline styling maintenance.",
      "Actively leveraged AI-assisted development tools (vibe coding) to accelerate code production, optimise debugging, and maintain high engineering efficiency.",
      "Collaborated closely with Project Managers, UI/UX designers, and cross-functional teams to translate complex wireframes into high-performance web applications.",
    ],
  },
  {
    id: "codelabs",
    company: "PT Codelabs Indonesia",
    role: "Software Developer",
    startYear: 2017,
    endYear: 2021,
    location: "Jakarta, Indonesia",
    responsibilities: [
      "Developed the frontend interface for StroTV, an online video streaming web platform.",
      "Built the frontend interface for Misteraladin Travels, specifically optimising the user flow for domestic and international flight booking systems.",
      "Maintained, performed bug-fixing, and optimised features for the Mayflower with Mastercard Travels frontend website.",
      "Developed and maintained prominent travel and loyalty platforms including KIA Tours and Travels, Instant OTA Travel, and Enreech Loyalty Program for City Tours.",
      "Developed the Codelabs suite of internal products and marketplaces including POS Marketplace, Sales Forces (technician management app), and internal utility apps for booking meeting rooms and vehicles.",
    ],
  },
];
