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
  const [activeCategory, setActiveCategory] = useState("");

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <HeroBanner />
      <PromotionCarousel />

      {/* Category Selector */}
      <CategorySection
        categories={categoryData}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Show products only when a category is selected */}
      {activeCategory && (
        <ProductSection
          title="Products"
          category={activeCategory}
        />
      )}

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
      {/* <FooterHeader /> */}
      <Footer />
    </main>
  );
}
