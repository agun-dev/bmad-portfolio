import { Sidebar } from "@/components/shared/Sidebar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* Skip to content — must be first focusable element in DOM */}
      <a
        href="#main-content"
        className="sr-only z-50 rounded bg-amber-400 px-4 py-2 font-semibold text-black focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main
          id="main-content"
          className="min-w-0 flex-1 pt-16 lg:ml-60 lg:pt-0"
        >
          <HeroSection />
          <AboutSection />
          <PortfolioSection />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </>
  );
}
