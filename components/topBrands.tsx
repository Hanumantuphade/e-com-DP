"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Brand {
  name: string;
  logo: string;
  description: string;
}

const TopBrands = () => {
  // Top pharmaceutical brands in India
  const brands: Brand[] = [
    {
      name: "Sun Pharma",
      logo: "/sun-pharma.png",
      description: "India's largest pharmaceutical company by market capitalization"
    },
    {
      name: "Cipla",
      logo: "/cipla.png",
      description: "Leading global pharmaceutical company with presence in over 80 countries"
    },
    {
      name: "Dr. Reddy's",
      logo: "/red.png",
      description: "Specialized in affordable medications and innovative solutions"
    },
    {
      name: "Himalaya",
      logo: "/himalya.png",
      description: "Herbal healthcare products combining Ayurveda with modern science"
    },
    {
      name: "Zydus Cadila",
      logo: "/zydus.png",
      description: "Healthcare solutions from wellness to complex therapeutics"
    },
    {
      name: "Mankind Pharma",
      logo: "/mankind.png",
      description: "Focused on healthcare products and reaching rural populations"
    },
    {
      name: "Patanjali",
      logo: "/patanjali.png",
      description: "Ayurvedic products blending ancient wisdom with modern distribution"
    },
    {
      name: "Dabur",
      logo: "/dabur.png",
      description: "Pioneering biopharmaceuticals and innovative healthcare solutions"
    },
    {
      name: "Lupin",
      logo: "/lupin.png",
      description: "Global pharmaceutical company delivering high-quality medications"
    },
    {
      name: "johnson and johnson",
      logo: "/jnj.png",
      description: "Healthcare and pharmaceutical solutions for people of all ages"
    }
  ];

  // Create duplicate array for seamless infinite scroll effect
  const combinedBrands = [...brands, ...brands, ...brands];
  
  // State to handle hover and pause animation
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Ref for the carousel container
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Custom hook for smooth animation with faster speed
  useEffect(() => {
    // Apply animation only if not paused
    if (carouselRef.current && !isPaused) {
      const scrollWidth = carouselRef.current.scrollWidth / 3;
      const animate = () => {
        if (!carouselRef.current || isPaused) return;
        
        const currentScroll = carouselRef.current.scrollLeft;
        
        // If we've scrolled to the end of the first set of brands, jump back to start
        if (currentScroll >= scrollWidth - 10) {
          carouselRef.current.scrollLeft = 0;
        } else {
          // Increased speed from 1px to 2px per frame
          carouselRef.current.scrollLeft += 2;
        }
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      const animationRef = { current: requestAnimationFrame(animate) };
      
      return () => {
        cancelAnimationFrame(animationRef.current);
      };
    }
  }, [isPaused]);
  
  // Add CSS for hiding scrollbar
  useEffect(() => {
    // Add a style tag to hide scrollbars cross-browser
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-200 to-green-200 py-8 w-full overflow-hidden">
      <div className="w-full relative">
        {/* Title with minimal design */}
        <div className="text-center mb-6 relative">
          <h2 className="text-2xl font-bold text-gray-800">
            OUR TOP BRANDS
          </h2>
          <div className="h-1 w-16 bg-blue-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Main carousel container - full width */}
        <div 
          className="relative overflow-hidden w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient overlays for smooth fade effect on sides */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-blue-50 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-blue-50 to-transparent z-10"></div>
          
          {/* Carousel track */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide gap-8 py-4 px-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {combinedBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className={`flex-none transform transition-all duration-300 ${
                  activeIndex === index ? 'scale-105' : 'scale-100'
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-3 flex flex-col items-center justify-center border border-gray-100">
                  {/* Much larger image container */}
                  <div className="relative h-48 w-72 mb-2">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        width={220}
                        height={160}
                        className="object-contain transition-all duration-300 hover:scale-110"
                      />
                    </div>
                  </div>
                  
                  {/* Brand name with subtle styling */}
                  <p className="text-gray-800 font-medium text-lg text-center mt-2">
                    {brand.name}
                  </p>
                  
                  {/* Active indicator */}
                  {activeIndex === index && (
                    <div className="absolute -bottom-1 left-0 right-0 mx-auto w-16 h-1 bg-blue-500 rounded-full"></div>
                  )}
                  
                  {/* Tooltip that appears on hover */}
                  {activeIndex === index && (
                    <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg w-64 text-sm text-gray-600 z-20 border border-gray-100">
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                      {brand.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBrands;