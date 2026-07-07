// src/data/projects.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  stack: string[];
  liveUrl?: string;
  thumbnail: string;
}

export const projects: Project[] = [
  {
    id: "sofwaresenicom",
    title: "Software Seni",
    description:
      "Contributed to the frontend of SoftwareSeni, Australia's leading custom software development company, offering managed team extensions and tailored digital solutions to 180+ clients across industries including real estate, SaaS, and eCommerce.",
    problem: "Developed the frontend for SoftwareSeni, Australia's leading custom software development company, delivering a seamless user experience across various digital solutions.",
    stack: ["WordPress", "PHP", "CSS", "SASS/SCSS", "JavaScript", "Custom Plugins"],
    liveUrl: "https://www.softwareseni.com/",
    thumbnail: "/images/projects/softwareseni.webp",
  },
  {
    id: "sofwaresenicoid",
    title: "Software Seni Indonesia",
    description:
      "Contributed to the frontend of SoftwareSeni, Australia's leading custom software development company, offering managed team extensions and tailored digital solutions to 180+ clients across industries including real estate, SaaS, and eCommerce.",
    problem: "Developed the frontend for SoftwareSeni, Australia's leading custom software development company, delivering a seamless user experience across various digital solutions.",
    stack: ["Webflow", "CSS", "JavaScript", "Lottie Animations", "Custom Interactions"],
    liveUrl: "https://www.softwareseni.co.id/",
    thumbnail: "/images/projects/softwaresenicoid.webp",
  },
  {
    id: "teskacarson",
    title: "Teskacarson",
    description:
      "Welcome to Melbourne's largest independent commercial estate agency. At Teska Carson, we know the market. We back our confidence with capability. We treat every single negotiation with the same diligence, creativity and respect. And we always aim to exceed your expectations. That’s how we’ve achieved the exceptional results that have built our reputation, our loyal clientele and our business.",
    problem: "Developed the frontend for Teska Carson — Melbourne's largest independent commercial real estate agency. The website serves as a professional property marketing platform featuring dynamic listings, auction schedules, and property detail pages.",
    stack: ["WordPress", "PHP", "CSS", "SASS/SCSS", "JavaScript", "Custom Plugins", "Custom Maps"],
    liveUrl: "https://www.teskacarson.com.au/",
    thumbnail: "/images/projects/teskacarson.webp",
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
  },
  {
    id: "boatdeck",
    title: "Product of Boatdeck",
    description:
      "Boat Deck offer a full suite of web development services and boating website design for the marine industry in Australia and New Zealand. Boat dealers, manufacturers, importers and marine businesses can have a new website in just days. All our websites for boats and marine services are easy to edit and update and you have full control over your website management.",
    problem: "Created a dynamic web application for Boatdeck, a marine industry service provider, integrating real-time data and enhancing user engagement and decision-making.",
    stack: ["WordPress", "SASS/SCSS", "HTML", "JavaScript", "Custom Plugins", "Custom Themes"],
    liveUrl: "https://www.marinewebsites.com.au/portfolio/",
    thumbnail: "/images/projects/boatdeck.webp",
  },
  {
    id: "gumtree",
    title: "Product of Gumtree",
    description:
      "Sell anything on gumtree. Gumtree is the UK's biggest online classifieds site, with over 10 million live ads. Buy and sell anything from cars and property to electronics and furniture.",
    problem: "Developed the frontend for Product of Gumtree, such as Pets, Guides, Real Estate, and other products of Gumtree, created a custom theme and integrated with the Gumtree API to provide a seamless user experience for buying and selling items.",
    stack: ["WordPress", "CSS", "HTML", "JavaScript", "Elementor", "Custom Themes", "Custom Plugins"],
    liveUrl: "https://gumtree.com.au/real-estate",
    thumbnail: "/images/projects/gumtree.webp",
  },
];
