"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    id: 1,
    image: "/hero/h1.jpg",
    title: "Your Trusted Online Pharmacy",
    subtitle1:
      "Order genuine medicines and healthcare essentials from the comfort of your home.",
    subtitle2:
      "Fast delivery and expert advice to keep your family healthy and safe.",
  },
  {
    id: 2,
    image: "/hero/h2.jpg",
    title: "Health & Wellness Products",
    subtitle1:
      "Explore vitamins, supplements, and personal care items from top brands.",
    subtitle2:
      "Everything you need for a healthier lifestyle delivered to your doorstep.",
  },
  {
    id: 3,
    image: "/hero/h3.jpg",
    title: "Prescription Medicines Made Easy",
    subtitle1:
      "Upload your prescription and get authentic medicines delivered securely.",
    subtitle2:
      "Confidential, reliable, and hassle-free process for your convenience.",
  },
  {
    id: 4,
    image: "/hero/h4.jpg",
    title: "Baby & Mother Care Essentials",
    subtitle1:
      "From diapers to nutritional supplements, find everything for mom and baby.",
    subtitle2:
      "Top quality products to support healthy growth and comfort.",
  },
  {
    id: 5,
    image: "/hero/h5.jpg",
    title: "Immunity Boosters & Wellness Kits",
    subtitle1:
      "Stay strong and protected with curated immunity-boosting products.",
    subtitle2:
      "Shop herbal remedies, multivitamins, and more at great prices.",
  },
  {
    id: 6,
    image: "/hero/h6.jpg",
    title: "Personal & Home Healthcare Devices",
    subtitle1:
      "Get blood pressure monitors, glucometers, thermometers, and more.",
    subtitle2:
      "Reliable devices to help you track your health at home with ease.",
  },
  {
    id: 7,
    image: "/hero/h7.jpg",
    title: "Beauty & Skincare Products",
    subtitle1:
      "Explore dermatologist-recommended skincare and beauty essentials.",
    subtitle2:
      "Healthy skin starts with trusted, high-quality products.",
  },
  {
    id: 8,
    image: "/hero/h8.jpg",
    title: "24/7 Customer Support",
    subtitle1:
      "Need help choosing the right product? Our pharmacists are here for you.",
    subtitle2:
      "Get expert guidance and quick responses anytime you need.",
  },
  {
    id: 9,
    image: "/hero/h9.jpg",
    title: "Health Check-ups & Lab Tests",
    subtitle1:
      "Book diagnostic tests from the comfort of your home.",
    subtitle2:
      "Affordable, accurate, and trusted by leading healthcare providers.",
  },
];


export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [mounted, nextSlide]);

  const currentSlideData = slides[currentSlide] || slides[0];

  if (!mounted) {
    return (
      <div className="relative sm:h-[200px] md:max-h-screen lg:max-h-screen overflow-hidden bg-gray-100">
        <div className="absolute inset-0">
          <Image
            src={slides[0].image || "/placeholder.svg"}
            alt={`${slides[0].title} ${slides[0].subtitle1}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={`${slide.title} ${slide.subtitle1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center px-4">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
              {slide.title}
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2">
              {slide.subtitle1}
            </p>
            <span className="hidden md:block text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl mt-1">
              {slide.subtitle2}
            </span>
            <div className="flex flex-wrap mt-7 gap-4">
              <Link
                href="/products"
                className="btn bg-white text-primary-800 hover:bg-primary-50 hover:text-primary-900 transition-all p-3 rounded-lg duration-300"
              >
                View Our Products
              </Link>
              <Link
                href="/contact"
                className="btn border-2 border-white text-white hover:bg-white hover:text-black transition-all p-3 rounded-lg duration-300"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
