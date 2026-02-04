import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar"; import ComparisonSection from "./components/ComparisonSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import Forms from './components/Forms';
import HowItWorksSection from "./components/HowItWorksSection";
import LoanTabsSection from "./components/LoanTabsSection";
import PartnersSection from "./components/PartnersSection";
import StatsSection from "./components/StatsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import WhyChooseSection from "./components/WhyChooseSection";

import SmartCalculatorsSection from './components/SmartCalculatorsSection';
import RevealOnScroll from "./components/RevealOnScroll";

export default function Home() {
  return (
    <main className="min-h-screen font-sans bg-white">
      <Navbar />

      <HeroSection />

      <RevealOnScroll delay={100} className="relative z-30">
        <LoanTabsSection />
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <SmartCalculatorsSection />
      </RevealOnScroll>

      {/* <CalculatorsSection /> */}

      <RevealOnScroll delay={100}>
        <WhyChooseSection />
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <PartnersSection />
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <StatsSection />
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <HowItWorksSection />
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <ComparisonSection />
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <TestimonialsSection />
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <FAQSection />
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <Forms />
      </RevealOnScroll>

      <Footer />
    </main>
  );
}
