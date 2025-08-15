// components/Header.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, MapPin, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Header() {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/917206234875`, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="w-full fixed top-0 z-50 shadow-lg">
      {/* Top Bar with Logo and Search */}
      <div className="bg-white w-full border-b">
        <div className="container mx-auto flex items-center justify-between py-2 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-16 w-48">
              <Image
                src="/logo.svg"
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
            <button 
              onClick={openWhatsApp} 
              className="p-2 rounded-full hover:bg-gray-100 flex items-center"
              aria-label="Contact on WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </button>
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
      <div className="bg-transparent text-gray-800">
        <div className="container mx-auto">
          <nav className="flex justify-center">
            {[
              { name: "Home", path: "/" },
              { name: "Products", path: "/allproducts" },
              { name: "Gallery", path: "/gallery" },
              { name: "Contact", path: "/contact" },
              { name: "About Us", path: "/aboutus" }
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className="px-8 py-4 hover:text-green-600 transition-colors text-lg font-medium text-center flex-1"
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
                <button 
                  onClick={openWhatsApp}
                  className="text-gray-600 flex items-center hover:text-green-600"
                >
                  072062 34875
                  <MessageCircle className="ml-2 h-4 w-4 text-green-600" />
                </button>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-1" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-600">Chanarthal Rd, near New Anaj Mandi, Thanesar, Haryana 136118</p>
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