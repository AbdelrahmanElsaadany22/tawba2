import { useScrollReveal } from '../hooks/useScrollReveal';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/home/HeroSection';
import WhySection from '../components/home/WhySection';
import PlansSection from '../components/home/PlansSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

const HomePage = () => {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      <Navbar />
      <HeroSection />
      <WhySection />
      <PlansSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
