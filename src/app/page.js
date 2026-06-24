"use client";

import { useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import TopArtists from '@/components/home/TopArtists';
import FeaturedArtworks from '@/components/home/FeaturedArtworks';
import Pricing from '@/components/home/Pricing';

export default function Home() {
  const { data: session } = useSession();
  const userRole = session?.user?.role || 'buyer';
  const showPricing = !session || userRole === 'buyer' || userRole === 'user';

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

    document.querySelectorAll('section, .hero-content').forEach(section => {
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

  return (
    <>
      <div className="grain-overlay"></div>
      
      <main className="relative z-10">
        <Hero />
        <Categories />
        <FeaturedArtworks />
        <TopArtists />
        {showPricing && <Pricing />}
      </main>
    </>
  );
}
