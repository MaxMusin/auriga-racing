'use client';

import Header from '@/components/Header';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect, useRef, TouchEvent } from 'react';

const GallerySection = () => {
  const t = useTranslations('gallery');
  const sliderRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const images = [
    {
      id: 1,
      url: '/images/auriga-racing-car.jpg',
      caption: t('images.image1'),
    },
    {
      id: 2,
      url: '/images/auriga-racing-car.jpg',
      caption: t('images.image2'),
    },
    {
      id: 3,
      url: '/images/auriga-racing-car.jpg',
      caption: t('images.image3'),
    },
    {
      id: 4,
      url: '/images/auriga-racing-car.jpg',
      caption: t('images.image4'),
    },
    {
      id: 5,
      url: '/images/auriga-racing-car.jpg',
      caption: t('images.image5'),
    },
    {
      id: 6,
      url: '/images/auriga-racing-car.jpg',
      caption: t('images.image6'),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [maxIndex, setMaxIndex] = useState(images.length - slidesPerView);

  // Update slides per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update maxIndex when slidesPerView changes
  useEffect(() => {
    setMaxIndex(Math.max(0, images.length - slidesPerView));
  }, [slidesPerView, images.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1,
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === maxIndex ? 0 : prevIndex + 1,
    );
  };

  // Touch event handlers
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section
      id="gallery"
      className="section-padding bg-card clip-diagonal-reverse"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <Header title={t('title')} subtitle={t('subtitle')} centered />
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            {t('description')}
          </p>
        </div>

        <div className="relative">
          <div 
            className="overflow-hidden"
            ref={sliderRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}
            >
              {images.map((image) => (
                <div 
                  key={image.id} 
                  className={`px-2 ${
                    slidesPerView === 1 
                      ? 'min-w-full' 
                      : slidesPerView === 2 
                        ? 'min-w-[50%]' 
                        : 'min-w-[33.333%]'
                  }`}
                >
                  <div className="bg-card rounded-lg overflow-hidden shadow-md h-60 sm:h-64 md:h-72 card-hover">
                    <div className="h-full relative group">
                      <Image
                        src={image.url}
                        alt={image.caption}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent sm:opacity-0 sm:group-hover:opacity-100 opacity-100 transition-opacity duration-300 flex items-end">
                        <p className="text-white p-3 md:p-4 text-sm md:text-base font-medium">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows - visible only on larger screens */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-1 -translate-y-1/2 -translate-x-1/2 bg-racing-red text-white p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-racing-red/90 transition-colors z-10 hidden sm:block"
            aria-label={t('aria.prevSlide')}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-1 -translate-y-1/2 translate-x-1/2 bg-racing-red text-white p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-racing-red/90 transition-colors z-10 hidden sm:block"
            aria-label={t('aria.nextSlide')}
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>
        </div>

        {/* Navigation dots - now visible on all screen sizes */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: Math.ceil(images.length / slidesPerView) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * slidesPerView)}
                className={`h-2 w-2 rounded-full mx-1 ${
                  currentIndex >= index * slidesPerView && 
                  currentIndex < (index + 1) * slidesPerView
                    ? 'bg-racing-red'
                    : 'bg-muted'
                }`}
                aria-label={t('aria.goToSlide', { index: index + 1 })}
              />
            ),
          )}
        </div>

        {/* <div className="mt-6 md:mt-10 text-center">
          <a href="#" className="btn-primary">
            {t('viewFullGallery')}
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default GallerySection;
