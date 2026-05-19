import type { Metadata } from "next";

import { LandingNav } from "./components/landing-nav";
import { HeroSection } from "./components/hero-section";
import { PartnersMarquee } from "./components/partners-marquee";
import { ProblemSection } from "./components/problem-section";
import { MethodologySection } from "./components/methodology-section";
import { HowItWorksSection } from "./components/how-it-works-section";
import { StorySection } from "./components/story-section";
import { LearningSection } from "./components/learning-section";
import { FeaturesSection } from "./components/features-section";
import { CtaSection, LandingFooter } from "./components/cta-section";

export const metadata: Metadata = {
  title: "Cuéntame — Tu Coach Financiero",
  description:
    "El diario financiero para emprendedores. Separa tu plata personal de la del negocio, gana un score consciente y accede a convenios con cooperativas y aliados que sí prestan a las PYMEs.",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <LandingNav />
      <HeroSection />
      <PartnersMarquee />
      <ProblemSection />
      <HowItWorksSection />
      <MethodologySection />
      <StorySection />
      <LearningSection />
      <FeaturesSection />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
