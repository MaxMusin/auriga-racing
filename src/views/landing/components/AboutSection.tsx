import Header from '@/components/Header';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import AnimatedCounter from '@/components/AnimatedCounter';

const About = () => {
  const stats = [
    { value: 120, label: 'Trackday Events', suffix: '+' },
    { value: 15, label: 'Years Experience', suffix: '' },
    { value: 250, label: 'Race Drivers', suffix: '+' },
    { value: 42, label: 'Podium Finishes', suffix: '' },
  ];

  return (
    <section
      id="about"
      className="race-section bg-background clip-diagonal relative section-padding"
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <Header title="Passion for racing" subtitle="Our Story" />

            <p className="text-white/80 text-lg">
              Founded by passionate motorsport enthusiasts, our team has evolved
              from weekend racers to a professional racing organization with
              both real-world and virtual racing divisions.
            </p>

            <p className="text-white/80 text-lg">
              With a dedicated crew of experienced drivers, engineers, and
              strategists, we provide extraordinary trackday experiences and
              competitive simracing teams that push the boundaries of what's
              possible.
            </p>

            <a
              href="#trackdays"
              className="inline-flex items-center gap-2 text-racing-red hover:text-red-400 font-semibold transition-colors"
            >
              DISCOVER OUR SERVICES <ArrowRight size={16} />
            </a>
          </div>

          <div className="rounded-lg overflow-hidden shadow-xl">
            <div className="relative h-0 pb-[66%]">
              <Image
              fill
                src="/images/auriga-racing-car.jpg"
                alt="Racing team in pit lane"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-card rounded-lg shadow-lg"
            >
              <div className="text-3xl md:text-4xl font-bold text-racing-red mb-2">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  delay={index * 200}
                />
              </div>
              <p className="text-white/70 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
