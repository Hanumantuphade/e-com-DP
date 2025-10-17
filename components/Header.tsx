"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const openWhatsApp = () => {
    window.open(`https://wa.me/917206234875`, "_blank", "noopener,noreferrer");
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/aboutus" },
    { name: "Products", path: "/allproducts" },
    { name: "Contact", path: "/contact" },
  ];

  // transparent only on home
  const isHome = pathname === "/";
  const headerBg = isHome ? "bg-transparent" : "bg-white shadow-md";
  const navText = isHome ? "text-gray-900" : "text-gray-700";
  const hoverText = isHome ? "hover:text-green-300" : "hover:text-green-600";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${headerBg}`}
    >
      {/* === TOP BAR === */}
      <div
        className={`w-full border-b ${
          isHome ? "border-transparent" : "border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-40 sm:h-14 sm:w-44 md:h-16 md:w-48">
              <Image
                src="/logo.svg"
                alt="DUA Pharmacy"
                fill
                sizes="(max-width: 768px) 10rem, 12rem"
                className="object-contain object-left"
                priority
                quality={100}
              />
            </div>
          </Link>

          {/* Desktop NAV LINKS */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-32">
            {menuItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className={`text-base font-medium transition-colors ${navText} ${hoverText}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
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
                  className={`h-6 w-6 ${navText}`}
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
                  className={`h-6 w-6 ${navText}`}
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

      {/* === MOBILE NAV (dropdown) === */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-green-300 to-blue-400 text-slate-900">
          <nav className="flex flex-col items-center py-20 space-y-8">
            {menuItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className="text-base font-medium hover:text-green-700 transition-colors"
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
