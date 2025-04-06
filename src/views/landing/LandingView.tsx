import AboutSection from './components/AboutSection';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import UpcomingEventsSection from './components/UpcomingEventsSection';
import TeamsSection from './components/TeamsSection';

const LandingView = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <UpcomingEventsSection />
      <AboutSection />
      <TeamsSection />
    </>
  );
};

export default LandingView;
