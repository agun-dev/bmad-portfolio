import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-8 lg:px-12">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {year} Agun Gunawan. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/agun-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agun Gunawan's GitHub profile (opens in new tab)"
            className="inline-flex items-center gap-2 rounded text-sm text-muted-foreground hover:text-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none motion-safe:transition-colors motion-safe:duration-150"
          >
            <Github className="size-4" aria-hidden="true" />
            GitHub
          </a>
          <a
            href="https://id.linkedin.com/in/agun-awan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agun Gunawan's LinkedIn profile (opens in new tab)"
            className="inline-flex items-center gap-2 rounded text-sm text-muted-foreground hover:text-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none motion-safe:transition-colors motion-safe:duration-150"
          >
            <Linkedin className="size-4" aria-hidden="true" />
            LinkedIn
          </a>
          <a
            href="https://wa.me/6287830259648"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Agun Gunawan on WhatsApp (opens in new tab)"
            className="inline-flex items-center gap-2 rounded text-sm text-muted-foreground hover:text-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none motion-safe:transition-colors motion-safe:duration-150"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </a>
          <a
            href="mailto:agun.gunawan@outlook.com"
            aria-label="Send an email to Agun Gunawan"
            className="inline-flex items-center gap-2 rounded text-sm text-muted-foreground hover:text-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none motion-safe:transition-colors motion-safe:duration-150"
          >
            <Mail className="size-4" aria-hidden="true" />
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
