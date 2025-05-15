"use client"

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

interface MedCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  mrp: number;
  discount?: string;
  category: string;
}

function MedCard({ id, title, image, price, mrp, discount }: MedCardProps) {
  const [favorite, setFavorite] = useState(false);
  
  const discountPercentage = Math.round(((mrp - price) / mrp) * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {discount && (
        <div className="bg-blue-600 text-white text-xs font-medium px-2 py-1 absolute top-2 left-2 rounded">
          {discount}
        </div>
      )}
      <button
        onClick={() => setFavorite(!favorite)}
        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
      >
        <Heart
          className={`h-5 w-5 ${favorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
        />
      </button>
      <div className="p-4 relative">
        <div className="mb-4 flex justify-center">
          <Image src={image} alt={title} width={150} height={150} className="object-contain h-40" />
        </div>
        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-10">{title}</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold">₹{price}</span>
              <span className="text-sm text-gray-500 line-through">₹{mrp}</span>
            </div>
            <div className="text-xs text-green-600 font-medium">
              {discountPercentage}% off
            </div>
          </div>
        </div>
      </div>
      <button className="w-full bg-green-500 text-white py-2 font-medium hover:bg-green-600 transition">
        Add To Cart
      </button>
    </div>
  );
}

interface ProductSectionProps {
  title: string;
  category: string;
}

export default function ProductSection({ title, category }: ProductSectionProps) {
  // Mock data for products
  const allProducts: MedCardProps[] = [
    {
      id: "1",
      title: "Vaidyaratnam Dooshivishari Gulika Tablets",
      image: "/product1.jpg",
      price: 378,
      mrp: 420,
      discount: "10% off",
      category: "ayurveda"
    },
    {
      id: "2",
      title: "Dabur Chyawanprash - Immunity Booster",
      image: "/product2.jpg",
      price: 315,
      mrp: 350,
      category: "ayurveda"
    },
    {
      id: "3",
      title: "Himalaya Wellness Pure Herbs Ashwagandha",
      image: "/product3.jpg",
      price: 165,
      mrp: 195,
      discount: "15% off",
      category: "ayurveda"
    },
    {
      id: "4",
      title: "Dettol Antiseptic Liquid",
      image: "/product4.jpg",
      price: 210,
      mrp: 230,
      category: "baby"
    },
    {
      id: "5",
      title: "Crocin Advance Tablets",
      image: "/product5.jpg",
      price: 48,
      mrp: 53,
      discount: "10% off",
      category: "cough"
    },
    {
      id: "6",
      title: "Cetaphil Gentle Skin Cleanser",
      image: "/product6.jpg",
      price: 405,
      mrp: 450,
      category: "skin-care"
    },
    {
      id: "7",
      title: "Dr. Reckeweg R89 Homeopathic Medicine",
      image: "/product7.jpg",
      price: 495,
      mrp: 550,
      category: "baby"
    },
    {
      id: "8",
      title: "Centrum Adults Multivitamin/Mineral Supplement",
      image: "/product8.jpg",
      price: 585,
      mrp: 650,
      discount: "10% off",
      category: "wellness"
    },
    {
      id: "9",
      title: "SBL Arnica Montana Homeopathic Medicine",
      image: "/product9.jpg",
      price: 135,
      mrp: 150,
      category: "homeopathy"
    }
  ];

  // Filter products based on category
  const products = category === "all" 
    ? allProducts 
    : allProducts.filter(product => product.category === category);

  return (
    <div className="bg-blue-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <a href="#" className="text-blue-600 hover:underline">
            View All
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.slice(0, 5).map((product) => (
            <MedCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              mrp={product.mrp}
              discount={product.discount}
              category={product.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}