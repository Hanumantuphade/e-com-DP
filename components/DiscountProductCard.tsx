// components/DiscountProductCard.tsx
"use client";
import { Product } from "@/types";
import Image from "next/image";
import { formatPrice } from "@/utils/format";
import { Heart, ShoppingCart, Tag, ExternalLink, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { calculateDiscountedPrice } from "@/services/discount-service";
import { createProductSearchUrl } from "@/utils/google-search";

interface DiscountProductCardProps {
  product: Product;
}

const DiscountProductCard: React.FC<DiscountProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
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
    e.preventDefault();
    e.stopPropagation();
    
    const searchUrl = createProductSearchUrl(
      product.name,
      product.category?.name
    );
    
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-red-100/30 hover:-translate-y-2 hover:border-red-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* Clean discount badge */}
          <div className="absolute top-3 right-3">
            <div className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg">
              {discountPercentage}% OFF
            </div>
          </div>
          
          {/* Quick action buttons */}
          <div className={`absolute top-3 left-3 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            <button 
              onClick={handleLikeClick}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white hover:scale-110 shadow-lg transition-all duration-200 group/heart"
            >
              <Heart 
                className={`h-4 w-4 transition-colors duration-200 ${
                  isLiked 
                    ? 'text-red-500 fill-red-500' 
                    : 'text-gray-600 group-hover/heart:text-red-500'
                }`} 
              />
            </button>
          </div>

          {/* Simple savings indicator on hover */}
          {amountSaved > 0 && (
            <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center">
                <span className="text-xs font-semibold text-green-600">
                  You save {formatPrice(amountSaved)}
                </span>
              </div>
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-red-600 transition-colors duration-200" title={product.name}>
            {product.name}
          </h3>
          {product.category?.name && (
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              {product.category.name}
            </p>
          )}
        </div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xl font-bold text-red-600">
                {formatPrice(discountedPrice)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            </div>
            
            {product.size?.value && (
              <span className="text-xs bg-gray-50 border border-gray-200 px-2 py-1 rounded-md text-gray-600 font-medium w-fit">
                {product.size.value}
              </span>
            )}
          </div>
          
          <button
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 active:scale-95 flex items-center gap-1"
            onClick={handleBuyNowClick}
          >
            <ShoppingCart className="h-3 w-3" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountProductCard;