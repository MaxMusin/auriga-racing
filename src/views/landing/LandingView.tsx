import AboutSection from './components/AboutSection';
import HeroSection from './components/HeroSection';
import Navbar from '../../components/Navbar';
import UpcomingEventsSection from './components/UpcomingEventsSection';
import TeamsSection from './components/TeamsSection';
import JoinSection from './components/JoinSection';
import Footer from './components/Footer';
import GallerySection from './components/GallerySection';

const LandingView = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <UpcomingEventsSection />
      <AboutSection />
      <TeamsSection />
      <GallerySection />
      <JoinSection />
      <Footer />
    </>
  );
};

export default LandingView;
