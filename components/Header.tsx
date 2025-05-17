// components/Header.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, MapPin, X } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Header() {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  return (
    <header className="w-full sticky top-0 z-50 shadow-lg">
      {/* Top Bar with Logo and Search */}
      <div className="bg-white w-full border-b">
        <div className="container mx-auto flex items-center justify-between py-2 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-16 w-48">
              <Image
                src="/logo1.png"
                alt="DUA Pharmacy"
                fill
                sizes="(max-width: 768px) 12rem, 14rem"
                className="object-contain object-left"
                priority
                quality={100}
              />
            </div>
          </Link>

          {/* Search Bar - Now using the SearchBar component */}
          <div className="hidden md:block flex-grow mx-8">
            <SearchBar />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/account" className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentStroke">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <Link href="/cart" className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentStroke">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            <Link href="https://wa.me/yourphonenumber" className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c... (unchanged)" />
              </svg>
            </Link>
            <button 
              onClick={toggleSideNav} 
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-full md:ml-2"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Show on mobile */}
      <div className="block md:hidden bg-white p-3 border-b">
        <SearchBar />
      </div>

      {/* Main Navigation */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container mx-auto">
          <nav className="flex justify-center">
            {[
              { name: "Home", path: "/" },
              { name: "Location", path: "/location" },
              { name: "Gallery", path: "/gallery" },
              { name: "Contact", path: "/contact" },
              { name: "About Us", path: "/aboutus" }
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className="px-8 py-4 hover:bg-blue-700 transition-colors text-base font-medium text-center flex-1"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Side Navigation */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${sideNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={toggleSideNav} className="p-1 hover:bg-blue-700 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">Contact Details</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-blue-600 mr-2 mt-1" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-1" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-600">123 Main Street, City, State, 123456</p>
              </div>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { name: "About Us", path: "/aboutus" },
              { name: "Services", path: "/services" },
              { name: "Gallery", path: "/gallery" },
              { name: "Location", path: "/location" },
              { name: "Contact Us", path: "/contactus" }
            ].map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.path}
                  className="block py-2 px-4 hover:bg-blue-50 rounded text-blue-800 hover:text-blue-900 font-medium"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 bg-blue-50 text-center">
          <p className="text-blue-800 text-sm">© 2025 DUA Pharmacy</p>
          <p className="text-blue-700 text-xs mt-1">Your Health, Our Priority</p>
        </div>
      </div>

      {/* Overlay for when sidenav is open */}
      {sideNavOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={toggleSideNav}
        />
      )}
    </header>
  );
}
