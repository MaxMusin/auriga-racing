import AboutSection from './components/AboutSection';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import UpcomingEventsSection from './components/UpcomingEventsSection';

const LandingView = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <UpcomingEventsSection />
      <AboutSection />
    </>
  );
};

export default LandingView;
