// components/PromotionCarousel.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Billboard, PromotionCard } from "@/types";
import { getBillboards } from "@/services/billboard-service";

const staticPromotionCards: PromotionCard[] = [
  {
    id: 1,
    bgColor: "bg-orange-50",
    textColor: "text-orange-800",
    title: "Your Daily Dose of Energy",
    subtitle: "Superior Protein for Everyday Energy & Muscle Repair",
    buttonColor: "bg-orange-600",
    imageSrc: "/energy.png",
  },
  {
    id: 2,
    bgColor: "bg-teal-50",
    textColor: "text-teal-800",
    title: "Wellness simplified",
    subtitle: "with Dua Pharmacy products",
    buttonColor: "bg-teal-600",
    discount: "Up to 25% off",
    imageSrc: "/well.png",
  },
  {
    id: 3,
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
    title: "Natural Ayurvedic Products",
    subtitle: "Ancient wisdom for modern health challenges",
    buttonColor: "bg-purple-600",
    discount: "Up to 30% off",
    imageSrc: "/ayurveda.png",
  },
];

export default function PromotionCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [allPromotions, setAllPromotions] =
    useState<PromotionCard[]>(staticPromotionCards);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [totalSlides, setTotalSlides] = useState(staticPromotionCards.length);

  useEffect(() => {
    const fetchBillboards = async () => {
      try {
        const billboards = await getBillboards();

        // Convert billboards to promotion cards
        const billboardPromotions: PromotionCard[] = billboards.map(
          (billboard: Billboard, index) => ({
            id: 1000 + index, // Use a distinct ID range
            bgColor: getRandomBgColor(),
            textColor: getRandomTextColor(),
            title: billboard.label,
            subtitle: "Featured promotion",
            buttonColor: getRandomButtonColor(),
            imageSrc: billboard.imageUrl,
          })
        );

        // Combine static promotions with billboard promotions
        const combined = [...staticPromotionCards, ...billboardPromotions];
        setAllPromotions(combined);
        setTotalSlides(combined.length);
      } catch (error) {
        console.error("Error fetching billboards:", error);
      }
    };

    fetchBillboards();
  }, []);

  useEffect(() => {
    // Auto slide function
    const autoSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    // Start auto sliding
    autoPlayRef.current = setInterval(autoSlide, 5000);

    // Cleanup interval on component unmount
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [totalSlides]);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    // Reset the interval whenever manual navigation happens
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000);
  };

  const goToPrevSlide = () => {
    const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prevSlide);
  };

  const goToNextSlide = () => {
    const nextSlide = (currentSlide + 1) % totalSlides;
    goToSlide(nextSlide);
  };

  // Calculate visible cards (current + next)
  const startIndex = currentSlide;
  const endIndex = (currentSlide + 1) % totalSlides;
  const visibleCards = [allPromotions[startIndex]];

  // If not the last slide, add next card
  if (startIndex !== endIndex) {
    visibleCards.push(allPromotions[endIndex]);
  } else {
    // If we're showing the last slide, add the first one
    visibleCards.push(allPromotions[0]);
  }

  return (
    <div className=" py-8 mt-14 mx-5 rounded-xl  relative overflow-hidden">
      {/* Background image */}
      <img
        className="absolute  inset-0 w-full min-h-screen object-cover z-0"
        src="/p2.jpg"
        alt=""
      />

      {/* Content wrapper - keep above image */}
      <div className="relative z-10 max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex space-x-4 items-center overflow-hidden">
          {visibleCards.map((card) => (
            <div
              key={card.id}
              className={`min-w-[48%] min-h[50%] ${card.bgColor} rounded-lg p-6 flex flex-col shadow-md transition-all duration-300`}
            >
              <div className="mb-2 flex justify-between items-start">
                <div>
                  <h3 className={`text-xl font-bold ${card.textColor}`}>
                    {card.title}
                  </h3>
                  <p className={`${card.textColor} opacity-90`}>
                    {card.subtitle}
                  </p>
                </div>
                {card.discount && (
                  <div className="bg-red-500 text-white px-2 py-1 text-xs rounded">
                    {card.discount}
                  </div>
                )}
              </div>
              <div className="flex-1 flex items-center justify-center py-4">
                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  width={300}
                  height={150}
                  className="object-contain"
                />
              </div>
              <button
                className={`${card.buttonColor} text-white rounded-md py-2 px-4 mt-4 self-center hover:opacity-90 transition`}
              >
                Order now
              </button>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-8 h-1 rounded transition-colors ${
                index === currentSlide ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}

// Helper functions to generate random colors for billboard promotions
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
