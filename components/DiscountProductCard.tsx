// components/DiscountProductCard.tsx
"use client";

import { Product, Discount } from "@/types";
import Image from "next/image";
import { formatPrice } from "@/utils/format";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { calculateDiscountedPrice } from "@/services/discount-service";

interface DiscountProductCardProps {
  product: Product;
}

const DiscountProductCard: React.FC<DiscountProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the main image or use a placeholder
  const mainImage = product.images?.[0]?.url || "/placeholder.png";
  
  // Calculate the discounted price
  const discountPercentage = product.discount?.percentage || 0;
  const originalPrice = parseFloat(product.price);
  const discountedPrice = calculateDiscountedPrice(product.price, discountPercentage);
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-48">
          <Image 
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover"
          />
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
              <button className="bg-white p-2 rounded-full mr-2 hover:bg-gray-100">
                <Heart className="h-5 w-5 text-gray-700" />
              </button>
              <button className="bg-white p-2 rounded-full hover:bg-gray-100">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          )}
          
          {/* Discount badge */}
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% OFF
          </div>
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800 mb-1">{product.name}</h3>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-blue-600 mr-2">
              {formatPrice(discountedPrice)}
            </span>
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(originalPrice)}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {product.size?.value || ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DiscountProductCard;