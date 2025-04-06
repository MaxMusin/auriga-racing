import { useState, useEffect } from 'react';
import { Menu, X } from "lucide-react";
import Image from 'next/image';
import { scrollToAnchor } from '@/utils';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Events", href: "#events" },
    { name: "About", href: "#about" },
    { name: "Teams", href: "#teams" },
    { name: "Gallery", href: "#gallery" },
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
              className="text-white/80 hover:text-racing-red font-medium text-sm transition-colors"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#join"
            className="btn-primary mx-2"
            onClick={(e) => handleNavClick(e, 'join')}
          >
            Join Us
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-racing-dark/95 backdrop-blur-sm p-4 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-racing-red font-medium text-lg py-2 transition-colors"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
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
                Join Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
