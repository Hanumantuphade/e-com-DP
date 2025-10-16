"use client";
import { Product } from "@/types";
import Image from "next/image";
import { formatPrice } from "@/utils/format";
import { Heart, ShoppingCart, ExternalLink } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { openWhatsAppChat } from "@/utils/whatsapp";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const mainImage = product.images?.[0]?.url || "/placeholder.png";

  // Handle buy now button click - Open WhatsApp
  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    openWhatsAppChat(product);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-blue-100/50 hover:-translate-y-2 hover:border-blue-200 backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* Quick action buttons */}
          <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
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
        </div>
      </Link>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200" title={product.name}>
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
            <span className="text-xl font-bold text-gray-900 mb-1">
              {formatPrice(product.price)}
            </span>
            {product.size?.value && (
              <span className="text-xs bg-gray-50 border border-gray-200 px-2 py-1 rounded-md text-gray-600 font-medium">
                {product.size.value}
              </span>
            )}
          </div>
          
          <button
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 active:scale-95 flex items-center gap-1"
            onClick={handleBuyNowClick}
            title="Chat on WhatsApp"
          >
            <ShoppingCart className="h-3 w-3" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;