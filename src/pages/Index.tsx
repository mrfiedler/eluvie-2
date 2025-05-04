
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import AudienceSection from '@/components/AudienceSection';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import ComparisonSection from '@/components/ComparisonSection';
import WaitlistSection from '@/components/WaitlistSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <AudienceSection />
      <FeaturesSection />
      <PricingSection />
      <ComparisonSection />
      <WaitlistSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
