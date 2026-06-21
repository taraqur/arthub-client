"use client";

import { useEffect, useState } from 'react';

const heroImages = [
  '/hero/slide1.jpg',
  '/hero/slide2.jpg',
  '/hero/slide3.jpg'
];

export default function Home() {
  useEffect(() => {
    // Micro-interactions and parallax-ish effects
    const handleMouseMove = (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) / 50;
      const moveY = (e.clientY - window.innerHeight / 2) / 50;
      
      const floatingCards = document.querySelectorAll('.soft-shadow');
      floatingCards.forEach(card => {
        if (card.classList.contains('group')) return; // handled by css
        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="grain-overlay"></div>
      
      <main className="relative z-10">
        {/* Fullwidth Carousel Hero Section */}
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
              Placeholder Title
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md">
              Placeholder text goes here. The user will provide the actual text later.
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

        {/* Art Categories Section */}
        <section className="bg-gray-50 py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 relative inline-block">
              Art Categories
              <span className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-16 h-1 bg-indigo-500 rounded-full"></span>
            </h2>
            <p className="text-gray-600 mt-8 mb-12 max-w-2xl mx-auto text-sm md:text-base">
              Filter through our diverse creative collections of physical and digital products.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group">
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform drop-shadow-sm">🎨</span>
                <h3 className="text-gray-900 font-bold text-lg mb-1">Painting</h3>
                <p className="text-gray-500 text-sm">Oil & Watercolors</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group">
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform drop-shadow-sm">💻</span>
                <h3 className="text-gray-900 font-bold text-lg mb-1">Digital</h3>
                <p className="text-gray-500 text-sm">3D & Illustration</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group">
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform drop-shadow-sm">🗿</span>
                <h3 className="text-gray-900 font-bold text-lg mb-1">Sculpture</h3>
                <p className="text-gray-500 text-sm">Clay & Wire frame</p>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group">
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform drop-shadow-sm">🌀</span>
                <h3 className="text-gray-900 font-bold text-lg mb-1">Abstract</h3>
                <p className="text-gray-500 text-sm">Mixed Media</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Artworks Section */}
        <section className="py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Artworks
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the most captivating pieces carefully selected by our curators.
              </p>
            </div>
            
            {/* Masonry Layout using Tailwind Columns */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 relative">
                  <img 
                    src={`/featured/artwork${i + 1}.jpg`} 
                    alt={`Featured Artwork ${i + 1}`} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white text-gray-900 font-semibold px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>


    </>
  );
}
