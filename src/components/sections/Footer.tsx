import { Linkedin, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 lg:px-12 border-t border-border">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {year} Agun Gunawan. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {/* ⚠️ Replace with actual LinkedIn URL before launch */}
          <a
            href="https://linkedin.com/in/agun-awan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agun Gunawan's LinkedIn profile (opens in new tab)"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-amber-400 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>
          {/* ⚠️ Replace with actual email before launch */}
          <a
            href="mailto:hello@agungunawan.dev"
            aria-label="Send an email to Agun Gunawan"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-amber-400 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
