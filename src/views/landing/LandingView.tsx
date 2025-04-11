import Navbar from '../../components/Navbar';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import HeroSection from './components/HeroSection';
import JoinSection from './components/JoinSection';
import TeamsSection from './components/TeamsSection';
import UpcomingEventsSection from './components/UpcomingEventsSection';

const LandingView = () => {
  return (
    <div>
      <HeroSection />
      <UpcomingEventsSection />
      <AboutSection />
      <TeamsSection />
      <GallerySection />
      <JoinSection />
    </div>
  );
};

export default LandingView; 
