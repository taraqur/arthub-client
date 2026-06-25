"use client";

import { useEffect, useState } from 'react';

const heroImages = [
  '/hero/slide1.jpg',
  '/hero/slide2.jpg',
  '/hero/slide3.jpg'
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden flex items-center justify-center">
      {/* Background Images Slider */}
      {heroImages.map((src, index) => (
        <div 
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{ backgroundImage: `url('${src}')` }}
        >
          {/* Overlay to darken image so text is readable later */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Carousel Content Container */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg tracking-tight">
          Art That Speaks To Your Soul
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md">
          Unlock a world of imagination with our curated collection of original artworks.
        </p>
        <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
          Explore Collection
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroImages.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
