// components/PromotionCarousel.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
type CarouselItem = {
  id: string;
  name: string;
  description: string;
  offer: string;
  imageUrl: string;
};


export default function PromotionCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [items, setItems] = useState<CarouselItem[]>([]);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/promotion-carousel");
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data: CarouselItem[] = await res.json();
        if (!ignore) {
          setItems(data);
          setCurrentSlide(0);
        }
      } catch (e: any) {
        if (!ignore) setError(e?.message || "Failed to load");
        console.error("Error fetching promotion carousel:", e);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (isHovered || items.length <= 1) return;
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [items.length, isHovered]);

  const goToSlide = (slideIndex: number) => {
    if (items.length === 0) return;
    setCurrentSlide(slideIndex % items.length);
    if (!isHovered && items.length > 1) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % items.length);
      }, 5000);
    }
  };

  const goToPrevSlide = () => {
    const total = items.length || 1;
    const prevSlide = (currentSlide - 1 + total) % total;
    goToSlide(prevSlide);
  };

  const goToNextSlide = () => {
    const total = items.length || 1;
    const nextSlide = (currentSlide + 1) % total;
    goToSlide(nextSlide);
  };
  const totalSlides = items.length;
  const currentItem = items[currentSlide] || null;

  if (loading) {
    return (
      <div className="relative py-8 mt-14 mx-3 sm:mx-5 rounded-xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="h-64 bg-gray-200 animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative py-8 mt-14 mx-3 sm:mx-5 rounded-xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center text-red-600">
          Failed to load promotions
        </div>
      </div>
    );
  }

  if (!currentItem) return null;

  return (
    <div
      className="relative py-8 mt-14 mx-3 sm:mx-5 rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background */}
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/p2.jpg"
        alt=""
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col items-stretch justify-center">
          <div
            key={currentItem.id}
            className="w-full bg-white/80 backdrop-blur rounded-lg p-6 flex flex-col shadow-md transition-all duration-300"
          >
            <div className="mb-2 flex justify-between items-start">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  {currentItem.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 opacity-90">
                  {currentItem.description}
                </p>
              </div>
              <div className="bg-red-500 text-white px-2 py-1 text-xs rounded">
                {currentItem.offer}
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center py-4">
              <Image
                src={currentItem.imageUrl}
                alt={currentItem.name}
                width={500}
                height={350}
                className="object-contain max-h-56 sm:max-h-72"
                style={{ width: "auto" }}
              />
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-6 sm:w-8 h-1 rounded transition-colors ${
                index === currentSlide ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Nav buttons */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
}

// Helpers
function getRandomBgColor(): string {
  const colors = [
    "bg-orange-50",
    "bg-teal-50",
    "bg-purple-50",
    "bg-blue-50",
    "bg-green-50",
    "bg-pink-50",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
function getRandomTextColor(): string {
  const colors = [
    "text-orange-800",
    "text-teal-800",
    "text-purple-800",
    "text-blue-800",
    "text-green-800",
    "text-pink-800",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
function getRandomButtonColor(): string {
  const colors = [
    "bg-orange-600",
    "bg-teal-600",
    "bg-purple-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-pink-600",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
