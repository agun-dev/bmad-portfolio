export interface NavItem {
  label: string;
  href: string;
  sectionId: string; // e.g. 'hero', 'about', 'portfolio', 'contact'
}

export interface SiteConfig {
  name: string;
  title: string;
  availability: boolean;
  cvPath: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}
