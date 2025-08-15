"use client";
import React from "react";
import Link from "next/link";


export default function HeroBanner() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        preload="auto"
        playsInline
        loop
        muted
        autoPlay
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      {/* Centered Text Content */}
      <div className="relative top-16 z-20 flex items-center justify-center h-full px-4 sm:px-6 text-center">
        <div className=" bg-opacity-60 p-4 sm:p-6 rounded-xl max-w-[90%] sm:max-w-2xl mx-auto">
          <h1 className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
            Order medicines from Dua Pharmacy at the best prices
          </h1>
          <p className="text-white text-base sm:text-lg">
            An online pharmacy you can trust. Compare prices and save up to 71%.
          </p>
          <div className="flex flex-wrap justify-center my-7 gap-4">
            <Link
              href="/allproducts"
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
    </section>
  );
}
