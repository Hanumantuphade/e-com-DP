// app/page.tsx
"use client";
import { useState } from "react";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import PromotionCarousel from "@/components/PromotionCarousel";
import CategorySection from "@/components/CategorySection";
import TopDiscounts from "@/components/TopDiscounts";
import ServiceFeatures from "@/components/ServiceFeatures";
import CustomerTestimonials from "@/components/CustomerTestimonials";
import Footer from "@/components/Footer";
import ContactReview from "@/components/ContactReview";
import { categoryData } from "@/services/category-service";
import ProductSection from "@/components/ProductSection";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("");

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <HeroBanner />
      <PromotionCarousel />
      
      {/* Category Selector - now navigates to category pages */}
      <CategorySection
        categories={categoryData}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      {/* No longer showing category-specific products here */}
      {/* They'll be shown on dedicated category pages */}
      
      {/* Always visible sections */}
      <TopDiscounts />
      <ProductSection
        title="Featured Products"
        category="all"
        isFeatured={true}
      />
      <ServiceFeatures />
      <CustomerTestimonials />
      <ContactReview />
      <Footer />
    </main>
  );
}