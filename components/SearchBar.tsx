// components/SearchBar.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      // Navigate to search results page with the query
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        placeholder="Search medicines & more"
        className="w-full py-3 px-5 border-[1px] border-blue-200 rounded-full outline-none focus:outline-none focus:ring-[1px] focus:ring-blue-300 focus:border-blue-300 shadow-sm text-gray-700 font-medium"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button 
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
}