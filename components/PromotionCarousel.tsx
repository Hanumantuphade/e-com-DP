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
  {
    id: 4,
    bgColor: "bg-green-50",
    textColor: "text-green-800",
    title: "Mamaearth Ubtan Face Wash",
    subtitle: "Gentle care for refreshed & clear skin",
    buttonColor: "bg-green-600",
    discount: "Flat 35% off",
    imageSrc: "/me1.jpg",
  },
  {
    id: 5,
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-800",
    title: "Mamaearth Daily Glow Sunscreen",
    subtitle: "Shield your skin with SPF protection",
    buttonColor: "bg-yellow-600",
    discount: "Save up to 35%",
    imageSrc: "/me2.jpg",
  },
  {
    id: 6,
    bgColor: "bg-teal-50",
    textColor: "text-teal-800",
    title: "Derma Face Wash + Anti-Acne Serum + Sunscreen Aqua Gel Combo",
    subtitle: "Complete daily skincare routine for clear & protected skin",
    buttonColor: "bg-teal-600",
    discount: "Up to 30% off",
    imageSrc: "/d1.jpg",
  },
  {
    id: 7,
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-800",
    title: "Derma Face Wash + Acid Face Serum + Daily Moisturizer Combo",
    subtitle: "Cleanse, treat & hydrate in one effective pack",
    buttonColor: "bg-indigo-600",
    discount: "Flat 30% off",
    imageSrc: "/d2.jpg",
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

        const billboardPromotions: PromotionCard[] = billboards.map(
          (billboard: Billboard, index) => ({
            id: 1000 + index,
            bgColor: getRandomBgColor(),
            textColor: getRandomTextColor(),
            title: billboard.label,
            subtitle: "Featured promotion",
            buttonColor: getRandomButtonColor(),
            imageSrc: billboard.imageUrl,
          })
        );

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
    const autoSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    autoPlayRef.current = setInterval(autoSlide, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [totalSlides]);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
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

  const startIndex = currentSlide;
  const endIndex = (currentSlide + 1) % totalSlides;
  const visibleCards = [allPromotions[startIndex]];

  if (startIndex !== endIndex) {
    visibleCards.push(allPromotions[endIndex]);
  } else {
    visibleCards.push(allPromotions[0]);
  }

  return (
    <div className="relative py-8 mt-14 mx-3 sm:mx-5 rounded-xl overflow-hidden">
      {/* Background */}
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/p2.jpg"
        alt=""
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:space-x-4 items-stretch justify-center">
          {visibleCards.map((card) => (
            <div
              key={card.id}
              className={`w-full sm:w-1/2 ${card.bgColor} rounded-lg p-6 flex flex-col mb-4 sm:mb-0 shadow-md transition-all duration-300`}
            >
              <div className="mb-2 flex justify-between items-start">
                <div>
                  <h3
                    className={`text-lg sm:text-xl font-bold ${card.textColor}`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-base ${card.textColor} opacity-90`}
                  >
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
                  width={500}
                  height={350}
                  className="object-contain max-h-56 sm:max-h-72"
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
