import { useState, useEffect } from 'react';
import { Menu, X } from "lucide-react";
import Image from 'next/image';
import { scrollToAnchor } from '@/utils';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslations } from 'next-intl';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('navbar');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check scroll position immediately on component mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('links.events'), href: "#events" },
    { name: t('links.about'), href: "#about" },
    { name: t('links.teams'), href: "#teams" },
    { name: t('links.gallery'), href: "#gallery" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToAnchor(href);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <a 
            href="#home" 
            className="relative h-10 w-40"
            onClick={(e) => handleNavClick(e, 'home')}
          >
            <Image
              src="/images/auriga_racing__logo.svg"
              alt="Auriga Racing Logo"
              fill
              priority
              className="object-contain"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white/80 hover:text-white font-medium text-sm transition-colors relative group"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
              <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-racing-red transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="#join"
            className="btn-primary mx-2"
            onClick={(e) => handleNavClick(e, 'join')}
          >
            {t('cta')}
          </a>
          <div className="navbar-language-switcher">  
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-racing-gray/95 backdrop-blur-sm p-4 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-white font-medium text-lg py-2 transition-colors relative group"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
                <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-racing-red transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <div className="py-2">
              <LanguageSwitcher />
            </div>
            <a
                href="#join"
                className="btn-primary mx-2"
                onClick={(e) => handleNavClick(e, 'join')}
              >
                {t('cta')}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
