"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import PromotionCarousel from "@/components/PromotionCarousel";
import CategorySection from "@/components/CategorySection";
import ProductSection from "@/components/ProductSection";
import ServiceFeatures from "@/components/ServiceFeatures";
import CustomerTestimonials from "@/components/CustomerTestimonials";
import Footer from "@/components/Footer";
import ContactReview from "@/components/ContactReview";

// Define category data
const categoryData = [
  { 
    id: "all", 
    name: "All Products", 
    image: "/logo1.png" 
  },
  { 
    id: "ayurveda", 
    name: "Ayurveda", 
    image: "/ayu.png" 
  },
  { 
    id: "skin-care", 
    name: "Skin Care", 
    image: "/skin.png" 
  },
  { 
    id: "cough", 
    name: "Cold & Cough", 
    image: "/cold.png" 
  },
  { 
    id: "baby", 
    name: "Baby Care", 
    image: "/baby.png" 
  }
];

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
      
      <ServiceFeatures />
      <CustomerTestimonials />
      <ContactReview />
      {/* <Footer /> */}
    </main>
  );
}