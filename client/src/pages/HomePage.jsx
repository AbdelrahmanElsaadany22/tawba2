import { useState, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/home/HeroSection';
import WhySection from '../components/home/WhySection';
import PlansSection from '../components/home/PlansSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import ChatButton from '../components/chat/ChatButton';
import ChatWindow from '../components/chat/ChatWindow';
import ErrorBoundary from '../components/common/ErrorBoundary';

const HomePage = () => {
  const revealRef = useScrollReveal();
  const [chatOpen, setChatOpen] = useState(false);

  const toggleChat = useCallback(() => {
    setChatOpen((prev) => !prev);
  }, []);

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

      <ChatButton isOpen={chatOpen} onClick={toggleChat} />
      <ErrorBoundary>
        <ChatWindow isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
