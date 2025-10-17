"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types";
import { getProduct } from "@/services/product-service";
import { formatPrice } from "@/utils/format";
import { calculateDiscountedPrice } from "@/services/discount-service";
import { createProductSearchUrl } from "@/utils/google-search";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Tag, ArrowLeft, Check, Star, Share2 } from "lucide-react";

// Import components
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import Footer from "@/components/Footer";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.productId as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        if (!productId) {
          setError("Invalid product ID");
          setLoading(false);
          return;
        }
        
        const data = await getProduct(productId);
        
        if (!data) {
          setError("Product not found");
          setLoading(false);
          return;
        }
        
        setProduct(data);
        if (data.images && data.images.length > 0 && data.images[0].url) {
          setSelectedImage(data.images[0].url);
        } else {
          setSelectedImage("/placeholder.png");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load product details");
        setLoading(false);
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleBuyNowClick = () => {
    if (!product) return;
    
    try {
      const searchUrl = createProductSearchUrl(
        product.name,
        product.category?.name || ""
      );
      
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error("Error opening search URL:", err);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Product content component
  const ProductContent = () => {
    if (loading) {
      return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      );
    }

    if (error || !product) {
      return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full max-w-lg">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error || "Product not found"}</span>
          </div>
          <Link href="/" className="mt-8 inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to home page
          </Link>
        </div>
      );
    }

    // Calculate the discounted price
    const discountPercentage = product.discount?.percentage || 0;
    const originalPrice = parseFloat(product.price);
    const discountedPrice = calculateDiscountedPrice(product.price, discountPercentage);
    
    // Calculate amount saved
    const amountSaved = originalPrice - discountedPrice;

    return (
      <div className="container mx-auto px-4 py-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product images section */}
          <div className="lg:w-1/2">
            <div className="relative aspect-square w-full overflow-hidden bg-gray-100 rounded-lg mb-4">
              <Image
                src={selectedImage || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {discountPercentage > 0 && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-md">
                  {discountPercentage}% OFF
                </div>
              )}
            </div>
            
            {/* Thumbnail gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((image) => (
                  <div 
                    key={image.id} 
                    className={`aspect-square relative cursor-pointer rounded-md overflow-hidden border-2 ${selectedImage === image.url ? 'border-blue-500' : 'border-transparent'}`}
                    onClick={() => setSelectedImage(image.url)}
                  >
                    <Image
                      src={image.url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product details section */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Rating placeholder */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">(125 reviews)</span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-blue-600 mr-3">
                  {formatPrice(discountedPrice)}
                </span>
                {discountPercentage > 0 && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>
              
              {amountSaved > 0 && (
                <div className="mt-1 inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  <Tag className="h-3 w-3 mr-1" />
                  <span>You save {formatPrice(amountSaved)}</span>
                </div>
              )}
            </div>
            
            {/* Product attributes */}
            <div className="space-y-4 mb-6">
              {product.size && (
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500 w-24">Size:</span>
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800">
                    {product.size.value}
                  </span>
                </div>
              )}
              
              {product.color && (
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500 w-24">Color:</span>
                  <div className="flex items-center">
                    <div 
                      className="h-6 w-6 rounded-full border shadow-sm mr-2" 
                      style={{ backgroundColor: product.color.value }}
                    ></div>
                    <span className="text-sm font-medium text-gray-800">{product.color.name}</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 w-24">Availability:</span>
                <div className="flex items-center text-green-600">
                  <Check className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">In Stock</span>
                </div>
              </div>
            </div>
            
            {/* Quantity selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-600 h-10 w-10 rounded-l-md flex items-center justify-center"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  -
                </button>
                <div className="h-10 w-16 flex items-center justify-center border-y border-gray-200">
                  {quantity}
                </div>
                <button 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-600 h-10 w-10 rounded-r-md flex items-center justify-center"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-4 mb-8">
              <button 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center"
                onClick={handleBuyNowClick}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Buy Now
              </button>
              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 p-3 rounded-lg">
                <Heart className="h-5 w-5" />
              </button>
              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 p-3 rounded-lg">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
            
            {/* Product description */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
              <div className="prose prose-sm text-gray-700">
                <p>
                  {`Experience the superior quality of ${product.name}. 
                  Perfect for everyday use.`}
                </p>
                {product.category && (
                  <p className="mt-2">
                    Category: <strong>{product.category.name}</strong>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <HeroBanner />
      <ProductContent />
      <Footer />
    </>
  );
}
