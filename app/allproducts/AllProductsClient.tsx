"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import DiscountProductCard from "@/components/DiscountProductCard";
import { getProducts } from "@/services/product-service";
import { categoryData } from "@/services/category-service";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";

// Sort options
const sortOptions = [
  { value: "name-asc", label: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z-A" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name-asc");
  const [filterCategory, setFilterCategory] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        
        // Set initial max price based on highest product price
        const maxPrice = Math.max(...fetchedProducts.map(p => parseFloat(p.price)));
        setPriceRange(prev => ({ ...prev, max: Math.ceil(maxPrice) }));
        
        // Check for category in URL params
        const category = searchParams.get("category");
        if (category) {
          setFilterCategory(category);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (filterCategory) {
      result = result.filter(product => product.categoryId === filterCategory);
    }

    // Apply price filter
    result = result.filter(product => {
      const price = parseFloat(product.price);
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Apply sorting
    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, filterCategory, sortBy, priceRange]);

  // Reset all filters
  const handleResetFilters = () => {
    setFilterCategory("");
    setSortBy("name-asc");
    setPriceRange({ min: 0, max: Math.max(...products.map(p => parseFloat(p.price))) });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse h-10 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-md h-64 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-tr from-red-300 to-blue-300">
      <Header />
      
      {/* Page Header */}
      <section className="relative  w-full h-[300px] min-h-[500px] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        preload="auto"
        playsInline
        loop
        muted
        autoPlay
      >
        <source src="/product.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      {/* Centered Text Content */}
      <div className="relative z-20 flex items-center justify-center h-full px-4 sm:px-6 text-center">
        <div className=" bg-opacity-60 p-4 sm:p-6 rounded-xl max-w-[90%] sm:max-w-2xl mx-auto">
          <h1 className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
           Our Products
          </h1>
          <p className="text-white text-base sm:text-lg">
            Browse our complete collection of high-quality products
          </p>
        </div>
      </div>
    </section>
      
      {/* Filters and Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter sidebar - mobile version */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-md font-medium"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>
            
            {/* Sort dropdown for mobile */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="" disabled>Sort by</option>
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Mobile filters - slide in from left */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
              <div className="absolute top-0 left-0 w-80 h-full bg-white shadow-lg p-4 overflow-y-auto z-50">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                {/* Filter content */}
                <div className="space-y-6">
                  {/* Categories filter */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="all-category-mobile"
                          name="category-mobile"
                          type="radio"
                          checked={filterCategory === ""}
                          onChange={() => setFilterCategory("")}
                          className="h-4 w-4 text-green-600 focus:ring-green-500"
                        />
                        <label htmlFor="all-category-mobile" className="ml-3 text-sm text-gray-700">
                          All Categories
                        </label>
                      </div>
                      
                      {categoryData.map(category => (
                        <div key={category.id} className="flex items-center">
                          <input
                            id={`category-${category.id}-mobile`}
                            name="category-mobile"
                            type="radio"
                            checked={filterCategory === category.id}
                            onChange={() => setFilterCategory(category.id)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500"
                          />
                          <label htmlFor={`category-${category.id}-mobile`} className="ml-3 text-sm text-gray-700">
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range filter */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Min: ₹{priceRange.min}</span>
                      <span className="text-sm text-gray-700">Max: ₹{priceRange.max}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={Math.max(...products.map(p => parseFloat(p.price)))}
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  {/* Reset Filters */}
                  <button
                    onClick={handleResetFilters}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-6 text-gray-800">Filters</h3>
            
            {/* Sort Options */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Sort By</h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Categories filter */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="all-category"
                    name="category"
                    type="radio"
                    checked={filterCategory === ""}
                    onChange={() => setFilterCategory("")}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="all-category" className="ml-3 text-sm text-gray-700">
                    All Categories
                  </label>
                </div>
                
                {categoryData.map(category => (
                  <div key={category.id} className="flex items-center">
                    <input
                      id={`category-${category.id}`}
                      name="category"
                      type="radio"
                      checked={filterCategory === category.id}
                      onChange={() => setFilterCategory(category.id)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor={`category-${category.id}`} className="ml-3 text-sm text-gray-700">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range filter */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Min: ₹{priceRange.min}</span>
                <span className="text-sm text-gray-700">Max: ₹{priceRange.max}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(...products.map(p => parseFloat(p.price)))}
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            {/* Reset Filters */}
            <button
              onClick={handleResetFilters}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded"
            >
              Reset Filters
            </button>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile sort options already added above */}
            
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-700">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            
            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-700">
                  Try adjusting your filters to find what you're looking for.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id}>
                    {product.discountId ? (
                      <DiscountProductCard product={product} />
                    ) : (
                      <ProductCard product={product} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}