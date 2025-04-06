'use client';

import { Car, Gamepad } from 'lucide-react';
import Image from 'next/image';

const TeamsSection = () => {
  return (
    <section id="teams" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">OUR TEAMS</h2>
          <div className="h-1 w-24 racing-gradient mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Apex Forge competes across multiple disciplines, from real-world
            FUNCUP events to professional simracing competitions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Track Team */}
          <div className="bg-card rounded-lg overflow-hidden shadow-lg card-hover">
            <div className="h-64 overflow-hidden relative">
              <Image
                src="/images/auriga-racing-car.jpg"
                alt="Track Racing Team"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6 text-racing-red" />
                <h3 className="text-2xl font-bold">Track Team</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Our track team competes in FUNCUP events across Europe,
                showcasing skill and precision in some of the most challenging
                circuits.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">✓</span>
                  <span>Professional drivers with years of experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">✓</span>
                  <span>State-of-the-art cars and equipment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">✓</span>
                  <span>Regular trackdays and training sessions</span>
                </li>
              </ul>
              <a href="#join" className="btn-primary w-full">
                Join Track Team
              </a>
            </div>
          </div>

          {/* SimRacing Team */}
          <div className="bg-card rounded-lg overflow-hidden shadow-lg card-hover">
            <div className="h-64 overflow-hidden relative">
              <Image
                src="/images/auriga-racing-car.jpg"
                alt="SimRacing Team"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Gamepad className="h-6 w-6 text-racing-blue" />
                <h3 className="text-2xl font-bold">SimRacing Team</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Our simracing division competes at the highest level in virtual
                motorsports, using cutting-edge simulation technology.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-racing-blue mr-2">✓</span>
                  <span>Compete in international e-motorsport leagues</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-blue mr-2">✓</span>
                  <span>Professional simulation rigs and equipment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-blue mr-2">✓</span>
                  <span>Dedicated coaching and strategy team</span>
                </li>
              </ul>
              <a href="#join" className="btn-secondary w-full">
                Join SimRacing Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;
