"use client"

import { useState } from "react";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import PromotionCarousel from "@/components/PromotionCarousel";
import ServiceFeatures from "@/components/ServiceFeatures";
import ProductSection from "@/components/ProductSection";
import CustomerTestimonials from "@/components/CustomerTestimonials";
import CategoryTabs from "@/components/CategoryTabs";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = [
    { id: "all", name: "All" },
    { id: "ayurveda", name: "Ayurveda" },
    { id: "allopathy", name: "Allopathy" },
    { id: "homeopathy", name: "Homeopathy" },
    { id: "personal-care", name: "Personal Care" },
    { id: "wellness", name: "Wellness" }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <HeroBanner />
      <PromotionCarousel />
      <ServiceFeatures />
      <CategoryTabs 
        categories={categories} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
      <ProductSection 
        title="Top Products" 
        category={activeCategory} 
      />
      <CustomerTestimonials />
      <Footer />
    </main>
  );
}