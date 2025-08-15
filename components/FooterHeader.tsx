"use client"

import Image from "next/image";
import { useState, useEffect } from "react";

const FooterHeader: React.FC = () => {
  // States and hooks related to the header part can be kept here
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top button visibility control
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-200 pt-20 pb-10 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
      <div className="absolute top-10 left-10 w-40 h-40 bg-green-300 rounded-full opacity-10"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-blue-300 rounded-full opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main header section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <div className="relative">
              <Image 
                src="/logo.svg" 
                alt="Dua Pharmacy Illustration"
                width={300}
                height={150}
                className="object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-6 w-full">
                <div className="h-1 w-72 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
            Order medicines online from Dua Pharmacy at the best prices.
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            An online pharmacy you can trust, delivering healthcare solutions right to your doorstep with care and precision.
          </p>
          
          <div className="flex justify-center space-x-1 mb-10">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Trusted</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Fast Delivery</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Affordable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterHeader;