// app/page.tsx
"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import PromotionCarousel from "@/components/PromotionCarousel";
import CategorySection from "@/components/CategorySection";
import ProductSection from "@/components/ProductSection";
import TopDiscounts from "@/components/TopDiscounts";
import ServiceFeatures from "@/components/ServiceFeatures";
import CustomerTestimonials from "@/components/CustomerTestimonials";
import Footer from "@/components/Footer";
import ContactReview from "@/components/ContactReview";
import { categoryData } from "@/services/category-service";

export default function Home() {
  // State to track active category
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <HeroBanner />
      <PromotionCarousel />
      
      {/* Category Section */}
      <CategorySection
        categories={categoryData}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      {/* Product Section filtered by active category */}
      <ProductSection
        title="Featured Products"
        category={activeCategory}
      />
      
      {/* Top Discounts Section */}
      <TopDiscounts />
      
      
      
      <ServiceFeatures />
      <CustomerTestimonials />
      <ContactReview />
      <Footer />
    </main>
  );
}