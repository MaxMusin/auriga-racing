'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const GallerySection = () => {
  const images = [
    {
      id: 1,
      url: '/images/auriga-racing-car.jpg',
      caption: 'FUNCUP Race at Silverstone',
    },
    {
      id: 2,
      url: '/images/auriga-racing-car.jpg',
      caption: 'Team preparation before race day',
    },
    {
      id: 3,
      url: '/images/auriga-racing-car.jpg',
      caption: 'SimRacing competition finals',
    },
    {
      id: 4,
      url: '/images/auriga-racing-car.jpg',
      caption: 'Pit stop during endurance race',
    },
    {
      id: 5,
      url: '/images/auriga-racing-car.jpg',
      caption: 'Team celebration after podium finish',
    },
    {
      id: 6,
      url: '/images/auriga-racing-car.jpg',
      caption: 'SimRacing training session',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 3 : prevIndex - 1,
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 3 ? 0 : prevIndex + 1,
    );
  };

  return (
    <section id="gallery" className="section-padding bg-card clip-diagonal-reverse">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">GALLERY</h2>
          <div className="h-1 w-24 racing-gradient mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Moments captured from our racing adventures, both on the track and
            in the virtual world
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {images.map((image) => (
                <div key={image.id} className="min-w-[33.333%] px-2">
                  <div className="bg-card rounded-lg overflow-hidden shadow-md h-72 card-hover">
                    <div className="h-full relative group">
                      <Image
                        src={image.url}
                        alt={image.caption}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <p className="text-white p-4 font-medium">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-racing-red text-white p-2 rounded-full shadow-lg hover:bg-racing-red/90 transition-colors z-10 hidden md:block"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-racing-red text-white p-2 rounded-full shadow-lg hover:bg-racing-red/90 transition-colors z-10 hidden md:block"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile navigation dots */}
        <div className="flex justify-center mt-6 md:hidden">
          {Array.from({ length: Math.ceil(images.length / 3) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full mx-1 ${
                  index === Math.floor(currentIndex / 3)
                    ? 'bg-racing-red'
                    : 'bg-muted'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ),
          )}
        </div>

        <div className="mt-10 text-center">
          <a href="#" className="btn-primary">
            View Full Gallery
          </a>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
