"use client"

import { MapPin, Search } from "lucide-react";

export default function HeroBanner() {
  return (
    <div className="bg-blue-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order medicines online from Dua Pharmacy at the best prices
          </h1>
          <p className="text-gray-600">An online pharmacy you can trust. Compare prices and save up to 71%</p>
        </div>
        <div className="flex items-center justify-center w-full max-w-2xl mx-auto">
          <div className="flex items-center bg-white rounded-l-md border border-r-0 px-3 py-2">
            <MapPin className="h-5 w-5 text-gray-400" />
            <span className="ml-2 text-sm text-gray-600">Deliver to</span>
          </div>
          <input
            type="text"
            className="flex-1 py-2 px-4 border focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search your Medicine or Healthcare essentials here"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}