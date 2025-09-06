"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const openWhatsApp = () => {
    window.open(`https://wa.me/917206234875`, "_blank", "noopener,noreferrer");
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/allproducts" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    { name: "About Us", path: "/aboutus" },
  ];

  return (
    <header className="w-full fixed top-0 z-50 bg-white shadow-lg">
      {/* === TOP BAR === */}
      <div className="w-full border-b">
        <div className="container mx-auto flex items-center justify-between py-2 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-14 w-44 sm:h-16 sm:w-48">
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

          {/* Search Bar (desktop only) */}
          <div className="hidden md:block flex-grow mx-6">
            <SearchBar />
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Account */}
            <Link
              href="/account"
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Account"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </Link>

            {/* WhatsApp */}
            <button
              onClick={openWhatsApp}
              className="hidden sm:flex items-center px-2 py-1 rounded-full hover:bg-gray-100"
              aria-label="Contact on WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="text-blue-500 px-1 text-sm sm:text-base font-medium">
                +91 7206234875
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* === MOBILE SEARCH === */}
      <div className="block md:hidden bg-white p-3 border-b">
        <SearchBar />
      </div>

      {/* === DESKTOP NAV === */}
      <div className="hidden md:block bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto">
          <nav className="flex justify-between items-center px-24">
            {menuItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className="px-6 py-3 text-lg font-medium hover:text-green-300 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* === MOBILE NAV (dropdown) === */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-green-300 to-blue-400 text-slate-900">
          <nav className="flex flex-col items-center py-4 space-y-16">
            {menuItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className="text-base font-medium hover:text-green-300 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
