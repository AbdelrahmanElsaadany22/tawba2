import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/home/HeroSection';
import WhySection from '../components/home/WhySection';
import PlansSection from '../components/home/PlansSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import CTASection from '../components/home/CTASection';

const HomePage = () => (
  <>
    <Navbar />
    <HeroSection />
    <WhySection />
    <PlansSection />
    <HowItWorksSection />
    <CTASection />
    <Footer />
  </>
);

export default HomePage;
