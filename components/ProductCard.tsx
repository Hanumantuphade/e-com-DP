// components/ProductCard.tsx
"use client";
import { Product } from "@/types";
import Image from "next/image";
import { formatPrice } from "@/utils/format";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { createProductSearchUrl } from "@/utils/google-search";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mainImage = product.images?.[0]?.url || "/placeholder.png";
  
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
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 transition-opacity duration-300">
              <button className="bg-white p-2 rounded-full mr-2 hover:bg-gray-100 shadow-lg transform hover:scale-105 transition-transform">
                <Heart className="h-5 w-5 text-red-500" />
              </button>
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
              {formatPrice(product.price)}
            </span>
            {product.size?.value && (
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                {product.size.value}
              </span>
            )}
          </div>
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

export default ProductCard;