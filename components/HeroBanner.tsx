"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    heading: "Welcome to DUA Pharma Store",
    subText:
      "Your trusted destination for genuine medicines, healthcare essentials and wellness products at fair prices.",
    bg: "/hero/hero4.jpg",
  },
  {
    heading: "Quality Medicines, Assured Care",
    subText:
      "DUA Pharma Store delivers only verified and authentic medicines from reputed manufacturers for your safety.",
    bg: "/hero/h4.png",
  },
  {
    heading: "Everything Your Family Needs",
    subText:
      "From prescription drugs to over-the-counter essentials, find all your healthcare needs under one roof.",
    bg: "/hero/hero2.jpg",
  },
  {
    heading: "Fast Delivery & Friendly Service",
    subText:
      "Order online and get your medicines quickly with our prompt and reliable doorstep delivery.",
    bg: "/hero/h3.png",
  },
  {
    heading: "Wellness Beyond Medicines",
    subText:
      "Explore vitamins, supplements, baby care and personal care products – all in one trusted store.",
    bg: "/hero/hero1.webp",
  },
  
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(slideTimer);
  }, []);

  const currentSlide = slides[current];

  return (
    <div className="relative">
      {/* section height adapts per device */}
      <section className="relative h-[75vh] sm:h-[90vh] lg:h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            /* 👇 bg-contain on mobile, bg-cover on bigger screens */
            className="
              absolute inset-0 w-full h-full 
              bg-contain sm:bg-cover 
              bg-no-repeat sm:bg-no-repeat 
              bg-top sm:bg-center
            "
            style={{ backgroundImage: `url(${currentSlide.bg})` }}
          >
            <div className="absolute inset-0 bg-blue-950/50" />
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-24 flex items-center min-h-[75vh] sm:min-h-[90vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              key={currentSlide.heading}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                <span className="text-blue-300">{currentSlide.heading}</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-200 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
                {currentSlide.subText}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/allproducts"
                  className="bg-blue-500 text-white text-center px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
                >
                  View Our Products
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-blue-500 text-blue-500 text-center px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition duration-300 w-full sm:w-auto"
                >
                  Call Now
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HeroBanner;
