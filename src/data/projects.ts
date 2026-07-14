// src/data/projects.ts

export type ProjectCategory = "react" | "wordpress" | "webflow";

export interface CaseStudy {
  challenge: string;
  outcome: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  stack: string[];
  liveUrl?: string;
  thumbnail: string;
  featured?: boolean;
  category: ProjectCategory;
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    id: "cybermatika",
    title: "Cybermatika",
    description:
      "Cybermatika is a B2B cybersecurity platform offering rapid penetration testing services to companies across Indonesia. The platform markets and delivers professional pentest engagements, helping businesses identify vulnerabilities before attackers do.",
    problem:
      "Led the UI/UX frontend build for Cybermatika — a cybersecurity SaaS platform at SoftwareSeni. Translated Figma designs into a pixel-perfect, animated Next.js site with Payload CMS-powered content, smooth scroll transitions, and a fully responsive layout optimised for Core Web Vitals.",
    stack: ["Next.js", "TypeScript", "Payload CMS", "Tailwind CSS"],
    liveUrl: "https://cybermatika.com/",
    thumbnail: "/images/projects/cybermatika.webp",
    featured: true,
    category: "react",
    caseStudy: {
      challenge:
        "Translating a complex cybersecurity product into a visually polished, animated marketing site — with content managed by a non-technical team via headless CMS.",
      outcome:
        "Delivered a pixel-perfect Next.js site with smooth scroll transitions, fully responsive layouts, and strong Core Web Vitals — reducing content update time from hours to minutes with Payload CMS.",
    },
  },
  {
    id: "sofwaresenicom",
    title: "Software Seni",
    description:
      "SoftwareSeni is Australia's leading custom software development company, delivering managed team extensions and tailored digital solutions to 180+ clients across real estate, SaaS, and eCommerce industries.",
    problem:
      "Rebuilt and optimised the AU corporate website frontend using WordPress, PHP, and custom plugins — improving page load speed, cross-browser compatibility, and overall Core Web Vitals scores.",
    stack: ["WordPress", "PHP", "CSS", "SASS/SCSS", "JavaScript", "Custom Plugins"],
    liveUrl: "https://www.softwareseni.com/",
    thumbnail: "/images/projects/softwareseni.webp",
    category: "wordpress",
    caseStudy: {
      challenge:
        "The existing AU corporate site was slow and visually dated, making it harder for the agency to attract and convert enterprise clients.",
      outcome:
        "Rebuilt the frontend with optimised asset loading, semantic HTML, and clean CSS architecture — measurably improving Core Web Vitals, SEO rankings, and cross-browser consistency.",
    },
  },
  {
    id: "sofwaresenicoid",
    title: "Software Seni Indonesia",
    description:
      "The Indonesian-market corporate site for SoftwareSeni, serving as the primary touchpoint for local enterprise clients seeking nearshore software development services.",
    problem:
      "Rebuilt the ID corporate site on Webflow with Lottie-powered animations and custom interactions, delivering a modern, high-fidelity visual experience with zero reliance on custom backend code.",
    stack: ["Webflow", "CSS", "JavaScript", "Lottie Animations", "Custom Interactions"],
    liveUrl: "https://www.softwareseni.co.id/",
    thumbnail: "/images/projects/softwaresenicoid.webp",
    category: "webflow",
    caseStudy: {
      challenge:
        "The legacy site required developer involvement for every content update and lacked the modern, animated feel expected by international technology clients.",
      outcome:
        "Rebuilt on Webflow with Lottie micro-animations and custom interactions — enabling the marketing team to self-manage all content with zero developer dependency.",
    },
  },
  {
    id: "teskacarson",
    title: "Teskacarson",
    description:
      "Welcome to Melbourne's largest independent commercial estate agency. At Teska Carson, we know the market. We back our confidence with capability. We treat every single negotiation with the same diligence, creativity and respect.",
    problem: "Developed the frontend for Teska Carson — Melbourne's largest independent commercial real estate agency. The website serves as a professional property marketing platform featuring dynamic listings, auction schedules, and property detail pages.",
    stack: ["WordPress", "PHP", "CSS", "SASS/SCSS", "JavaScript", "Custom Plugins", "Custom Maps"],
    liveUrl: "https://www.teskacarson.com.au/",
    thumbnail: "/images/projects/teskacarson.webp",
    category: "wordpress",
    caseStudy: {
      challenge:
        "Present a large, content-heavy commercial real estate brand in a fast, accessible format that supported listings, auctions, and lead generation without sacrificing editorial polish.",
      outcome:
        "Delivered a WordPress frontend that balanced performance, clarity, and user experience, helping the agency present property content more effectively across desktop and mobile.",
    },
  },
  {
    id: "kay-and-burton",
    title: "Kay & Burton",
    description:
      "Kay & Burton is a leading luxury real estate agency in Melbourne, Australia, with over 85 years of experience helping high-net-worth clients buy, sell, and lease prestigious properties across Melbourne and the Mornington Peninsula.",
    problem: "Developed the frontend for Kay & Burton, one of Australia's most prestigious luxury real estate agencies since 1938, delivering a premium multi-feature platform for high-net-worth clients locally and internationally.",
    stack: ["WordPress", "PHP", "CSS", "SASS/SCSS", "JavaScript", "Custom Plugins"],
    liveUrl: "https://kayburton.com.au/",
    thumbnail: "/images/projects/knb.webp",
    category: "wordpress",
    caseStudy: {
      challenge:
        "Building a premium, multi-feature property platform for one of Australia's most prestigious luxury agencies — required flawless cross-browser consistency and a high-end visual feel.",
      outcome:
        "Delivered a pixel-perfect, fully responsive platform with custom WordPress plugins supporting dynamic property listings and a luxury-tier UX tailored for high-net-worth clients.",
    },
  },
  {
    id: "eddempsey",
    title: "Ed Dempsey & Associates",
    description:
      "Ed Dempsey & Associates, a trusted South Dublin estate agency with over 25 years of experience specialising in residential and commercial property sales, lettings, and management.",
    problem: "Developed the frontend for Ed Dempsey & Associates, a trusted South Dublin estate agency with over 25 years of experience specialising in residential and commercial property sales, lettings, and management.",
    stack: ["WordPress", "PHP", "CSS", "SASS/SCSS", "JavaScript", "Custom Plugins"],
    liveUrl: "https://eddempsey.ie/",
    thumbnail: "/images/projects/eddempsey.webp",
    category: "wordpress",
    caseStudy: {
      challenge:
        "Create a polished property website for a long-established agency that needed to feel modern and trustworthy while still reflecting local market expertise.",
      outcome:
        "Built a responsive WordPress experience with clear service messaging and streamlined property browsing, improving usability and strengthening the agency’s digital presence.",
    },
  },
  {
    id: "nobelrealtors",
    title: "Nobel Realtors",
    description:
      "Nobel Realtors, a boutique real estate agency and the #1 agents in Brisbane's Inner West Corridor, serving residential buyers and sellers across Corinda, Sherwood, Graceville, Chelmer, and Oxley.",
    problem: "Developed the frontend for Nobel Realtors, a boutique real estate agency and the #1 agents in Brisbane's Inner West Corridor, serving residential buyers and sellers across Corinda, Sherwood, Graceville, Chelmer, and Oxley.",
    stack: ["WordPress", "PHP", "CSS", "SASS/SCSS", "JavaScript", "Custom Plugins"],
    liveUrl: "https://nobelrealtors.com.au/",
    thumbnail: "/images/projects/nobelrea.webp",
    category: "wordpress",
    caseStudy: {
      challenge:
        "Translate a boutique agency’s local-market positioning into a website that felt premium, credible, and easy to navigate for buyers and sellers.",
      outcome:
        "Delivered a tailored WordPress frontend with intuitive content structure and strong visual hierarchy, helping the agency showcase its expertise and local coverage more effectively.",
    },
  },
  {
    id: "sweeneyea",
    title: "Sweeney Estate Agent",
    description:
      "Sweeney EA, a leading estate agency with a strong presence in the local market, providing comprehensive property services.",
    problem: "Developed the frontend for Sweeney EA, enhancing user experience and accessibility for property listings and client interactions.",
    stack: ["WordPress", "PHP", "CSS", "SASS/SCSS", "JavaScript", "Custom Plugins"],
    liveUrl: "https://sweeneyea.com.au/",
    thumbnail: "/images/projects/sweeneyea.webp",
    category: "wordpress",
    caseStudy: {
      challenge:
        "Refresh the digital experience for an established agency that needed better presentation of listings and an easier path for client enquiry.",
      outcome:
        "Implemented a cleaner, more accessible frontend that improved content presentation and conversion flow, giving the brand a more modern and conversion-focused online presence.",
    },
  },
  {
    id: "boatdeck",
    title: "Product of Boatdeck",
    description:
      "Boat Deck offer a full suite of web development services and boating website design for the marine industry in Australia and New Zealand.",
    problem: "Created a dynamic web application for Boatdeck, a marine industry service provider, integrating real-time data and enhancing user engagement and decision-making.",
    stack: ["WordPress", "SASS/SCSS", "HTML", "JavaScript", "Custom Plugins", "Custom Themes"],
    liveUrl: "https://www.marinewebsites.com.au/portfolio/",
    thumbnail: "/images/projects/boatdeck.webp",
    category: "wordpress",
    caseStudy: {
      challenge:
        "Build a dynamic marketing site for a marine service provider that needed to stand out in a niche industry while keeping content updates simple.",
      outcome:
        "Created a flexible WordPress experience with custom styling and interaction patterns, enabling the brand to present services and portfolio work in a more compelling and maintainable way.",
    },
  },
  {
    id: "gumtree",
    title: "Product of Gumtree",
    description:
      "Gumtree is Australia's leading classifieds platform with millions of live listings across categories including real estate, pets, and vehicles.",
    problem: "Developed the frontend for Product of Gumtree, such as Pets, Guides, Real Estate, and other products of Gumtree, created a custom theme and integrated with the Gumtree API to provide a seamless user experience for buying and selling items.",
    stack: ["WordPress", "CSS", "HTML", "JavaScript", "Elementor", "Custom Themes", "Custom Plugins"],
    liveUrl: "https://gumtree.com.au/real-estate",
    thumbnail: "/images/projects/gumtree.webp",
    category: "wordpress",
    caseStudy: {
      challenge:
        "Support a large-scale classifieds product experience with a custom frontend that needed to remain consistent, scalable, and easy for editorial teams to manage.",
      outcome:
        "Delivered a tailored WordPress implementation with reusable themes and plugins, helping the product present content clearly while maintaining a consistent experience across key marketplace pages.",
    },
  },
  {
    id: "clubworx",
    title: "Clubworx",
    description:
      "Clubworx is a fitness business management platform helping gyms and studios streamline scheduling, billing, and member management. The website serves as the primary marketing presence to attract and convert fitness business owners.",
    problem:
      "Developed the Clubworx website on Webflow — translating Figma designs into a polished, responsive webpage. Handcrafted CSS for pixel-perfect styling, JavaScript for custom interactions and animations, and optimised performance with smooth page transitions and fast load times.",
    stack: ["Webflow", "CSS", "JavaScript", "Custom Animations"],
    liveUrl: "https://www.clubworx.com/",
    thumbnail: "/images/projects/clubworx.webp",
    category: "webflow",
    caseStudy: {
      challenge:
        "Translating complex Figma designs into a high-fidelity Webflow site that felt both polished and performant — requiring custom CSS architecture and JavaScript-driven animations without bloating page weight.",
      outcome:
        "Delivered a pixel-perfect, responsive Webflow site with smooth scroll transitions and optimised Core Web Vitals, enabling the marketing team to self-manage content while maintaining a fast, engaging user experience.",
    },
  },
];

