'use client';

import Header from '@/components/Header';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { TouchEvent, useEffect, useMemo, useRef, useState } from 'react';

const GallerySection = () => {
  const t = useTranslations('gallery');
  const sliderRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Group images into slides with max 3 images per slide
  const [imagesPerSlide, setImagesPerSlide] = useState(3);
  const [prevImagesPerSlide, setPrevImagesPerSlide] = useState(3);

  // Define the image type
  type GalleryImage = {
    id: number | string;
    url: string;
    caption: string;
    isPlaceholder?: boolean;
  };

  const images = useMemo(
    () => [
      {
        id: 1,
        url: '/images/gallery/photo_1.jpg',
        caption: t('images.image1'),
      },
      {
        id: 2,
        url: '/images/gallery/photo_2.jpg',
        caption: t('images.image2'),
      },
      {
        id: 3,
        url: '/images/gallery/photo_3.jpg',
        caption: t('images.image3'),
      },
      {
        id: 4,
        url: '/images/gallery/photo_4.jpg',
        caption: t('images.image4'),
      },
      {
        id: 5,
        url: '/images/gallery/photo_5.jpg',
        caption: t('images.image5'),
      },
      {
        id: 6,
        url: '/images/gallery/photo_6.jpg',
        caption: t('images.image6'),
      },
      {
        id: 7,
        url: '/images/gallery/photo_7.jpg',
        caption: t('images.image7'),
      },
      {
        id: 8,
        url: '/images/gallery/photo_8.jpg',
        caption: t('images.image8'),
      },
      {
        id: 9,
        url: '/images/gallery/photo_9.jpg',
        caption: t('images.image9'),
      },
      {
        id: 10,
        url: '/images/gallery/photo_10.jpg',
        caption: t('images.image10'),
      },
      {
        id: 11,
        url: '/images/gallery/photo_11.jpg',
        caption: t('images.image11'),
      },
      {
        id: 12,
        url: '/images/gallery/photo_12.jpg',
        caption: t('images.image12'),
      },
      {
        id: 13,
        url: '/images/gallery/photo_13.jpg',
        caption: t('images.image13'),
      },
    ],
    [t],
  );

  const slides = useMemo(() => {
    const result = [];
    for (let i = 0; i < images.length; i += imagesPerSlide) {
      const slideImages = images.slice(i, i + imagesPerSlide) as GalleryImage[];
      
      // If this is the last slide and doesn't have the full number of images,
      // add placeholder objects to maintain grid layout
      if (slideImages.length < imagesPerSlide && i + imagesPerSlide > images.length) {
        const placeholdersNeeded = imagesPerSlide - slideImages.length;
        for (let j = 0; j < placeholdersNeeded; j++) {
          slideImages.push({
            id: `placeholder-${j}`,
            url: '',
            caption: '',
            isPlaceholder: true
          });
        }
      }
      
      result.push(slideImages);
    }
    return result;
  }, [images, imagesPerSlide]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1); // Now this represents number of slides visible, not images

  // Update slides per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      // Store previous value to detect changes
      setPrevImagesPerSlide(imagesPerSlide);
      
      // Set images per slide based on screen width
      if (window.innerWidth < 640) {
        setImagesPerSlide(1); // Mobile: 1 image per slide
      } else if (window.innerWidth < 1024) {
        setImagesPerSlide(2); // Tablet: 2 images per slide
      } else {
        setImagesPerSlide(3); // Desktop: 3 images per slide
      }

      if (window.innerWidth < 1024) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(1); // We could show more slides at once on larger screens if desired
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [imagesPerSlide]); // Add imagesPerSlide as dependency

  // Handle slide index adjustment when imagesPerSlide changes
  useEffect(() => {
    if (prevImagesPerSlide !== imagesPerSlide) {
      // Calculate the first image index of the current slide
      const firstImageIndex = currentIndex * prevImagesPerSlide;
      
      // Calculate what slide that image would be in with the new imagesPerSlide
      const newSlideIndex = Math.floor(firstImageIndex / imagesPerSlide);
      
      // Update the current index to keep roughly the same images in view
      setCurrentIndex(Math.min(newSlideIndex, Math.ceil(images.length / imagesPerSlide) - 1));
    }
  }, [imagesPerSlide, prevImagesPerSlide, currentIndex, images.length]);

  const totalSlides = slides.length;
  const maxIndex = Math.max(0, totalSlides - slidesPerView);

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
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {slides.map((slide, slideIndex) => (
                <div key={`slide-${slideIndex}`} className="min-w-full px-2">
                  <div className={`grid ${
                    slide.length === 1 
                      ? 'grid-cols-1' 
                      : slide.length === 2 
                        ? 'grid-cols-1 sm:grid-cols-2' 
                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  } gap-4`}>
                    {slide.map((image) => (
                      <div
                        key={image.id}
                        className="bg-card rounded-lg overflow-hidden shadow-md h-60 sm:h-64 md:h-72 card-hover"
                      >
                        {!image.isPlaceholder ? (
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
                        ) : (
                          <div className="h-full bg-muted/20"></div>
                        )}
                      </div>
                    ))}
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

        {/* Navigation dots */}
        <div className="flex justify-center mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full mx-1 ${
                currentIndex === index ? 'bg-racing-red' : 'bg-muted'
              }`}
              aria-label={t('aria.goToSlide', { index: index + 1 })}
            />
          ))}
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
