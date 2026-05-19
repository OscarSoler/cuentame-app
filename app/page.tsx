import type { Metadata } from "next";
import {
  CtaSection,
  LandingFooter,
} from "./(marketing)/landing/components/cta-section";
import { FeaturesSection } from "./(marketing)/landing/components/features-section";
import { HeroSection } from "./(marketing)/landing/components/hero-section";
import { HowItWorksSection } from "./(marketing)/landing/components/how-it-works-section";
import { LandingNav } from "./(marketing)/landing/components/landing-nav";
import { LearningSection } from "./(marketing)/landing/components/learning-section";
import { MethodologySection } from "./(marketing)/landing/components/methodology-section";
import { PartnersMarquee } from "./(marketing)/landing/components/partners-marquee";
import { ProblemSection } from "./(marketing)/landing/components/problem-section";
import { StorySection } from "./(marketing)/landing/components/story-section";

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
