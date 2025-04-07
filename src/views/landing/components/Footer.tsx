'use client';

import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-white pt-16 pb-8">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
            <div className="relative h-10 w-40">
              <Image
                src="/images/auriga_racing__logo.svg"
                alt="Auriga Racing Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Pushing limits on track & online.
              <br />
              Experience the thrill of motorsport with our introductory track driving lessons and a close-knit racing simulation team.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-racing-red transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-racing-red transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-racing-red transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-racing-red transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#teams"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  Our Teams
                </a>
              </li>
              <li>
                <a
                  href="#results"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  Results
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#join"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  Join Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  Race Calendar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  Training Programs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  Sponsors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  Equipment
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates and racing
              news.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                required
              />
              <button type="submit" className="btn-primary w-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              {currentYear} Auriga Racing. All rights reserved.
            </p>
            {/* <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-racing-red transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-racing-red transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-racing-red transition-colors"
              >
                Cookie Policy
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
