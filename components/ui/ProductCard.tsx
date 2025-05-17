// components/ui/ProductCard.tsx
"use client"

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [favorite, setFavorite] = useState(false);
  
  const mainImage = product.images[0]?.url || '/placeholder.jpg';
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
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
          <Image 
            src={mainImage} 
            alt={product.name} 
            width={150} 
            height={150} 
            className="object-contain h-40" 
          />
        </div>
        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-10">{product.name}</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold">₹{product.price}</span>
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