// components/DiscountProductCard.tsx
"use client";
import { Product } from "@/types";
import Image from "next/image";
import { formatPrice } from "@/utils/format";
import { Heart, ShoppingCart, Tag } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { calculateDiscountedPrice } from "@/services/discount-service";
import { createProductSearchUrl } from "@/utils/google-search";

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
  
  // Calculate amount saved
  const amountSaved = originalPrice - discountedPrice;
  
  // Handle buy now button click
  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    
    // Create search URL
    const searchUrl = createProductSearchUrl(
      product.name,
      product.category?.name
    );
    
    // Open in new tab
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]"
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
          {/* Quick action buttons on hover */}
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 transition-opacity duration-300">
              <button className="bg-white p-2 rounded-full mr-2 hover:bg-gray-100 shadow-lg transform hover:scale-105 transition-transform">
                <Heart className="h-5 w-5 text-red-500" />
              </button>
            </div>
          )}
          {/* Discount badge */}
          <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {discountPercentage}% OFF
          </div>
          {/* Amount saved badge */}
          {amountSaved > 0 && (
            <div className="absolute left-2 bottom-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-lg shadow flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              <span>Save {formatPrice(amountSaved)}</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800 mb-1 truncate" title={product.name}>
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-blue-600">
              {formatPrice(discountedPrice)}
            </span>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 line-through mr-2">
                {formatPrice(originalPrice)}
              </span>
              {product.size?.value && (
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                  {product.size.value}
                </span>
              )}
            </div>
          </div>
          {/* Buy now button */}
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-full transition-colors"
            onClick={handleBuyNowClick}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountProductCard;