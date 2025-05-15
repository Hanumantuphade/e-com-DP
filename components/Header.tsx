"use client";
import Image from "next/image";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useState } from "react";

interface NavItemProps {
  text: string;
  active?: boolean;
}

function NavItem({ text, active = false }: NavItemProps) {
  return (
    <a
      href="#"
      className={`py-3 px-4 text-sm font-medium transition-colors duration-200 ${
        active
          ? "text-white bg-blue-700 border-b-2 border-white"
          : "text-white hover:bg-blue-600"
      }`}
    >
      {text}
    </a>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 shadow-lg">
      {/* Top Bar */}
      <div className="bg-white w-full border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-2 flex-wrap gap-4">
          {/* Logo - Improved size and quality */}
          <div className="flex items-center">
            <div className="relative h-20 w-[220px]">
              <Image
                src="/logo1.png"
                alt="Pharmacy Logo"
                fill
                sizes="(max-width: 768px) 180px, 220px"
                className="object-contain"
                priority
                quality={100}
              />
            </div>
          </div>

          {/* Title */}
          <div className="flex-1 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 tracking-wide">DUA MEDS</h1>
          </div>

          {/* Cart and Login */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-700 transition-colors duration-200 group">
              <div className="p-2 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                <ShoppingCart className="h-5 w-5 text-blue-700" />
              </div>
              <span className="text-sm font-medium">Cart</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-700 transition-colors duration-200 group">
              <div className="p-2 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                <User className="h-5 w-5 text-blue-700" />
              </div>
              <span className="text-sm font-medium">Login / Signup</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Full width */}
      <div className="bg-blue-600 w-full shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center h-14 px-4">
              <button
                type="button"
                className="text-white hover:text-gray-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
                <span className="ml-2">Menu</span>
              </button>
            </div>

            {/* Desktop Navigation - Full width with scrolling */}
            <nav className="hidden md:block overflow-x-auto">
              <div className="flex h-14 items-center">
                <NavItem text="Medicines" active={true} />
                <NavItem text="Personal Care" />
                <NavItem text="Health Conditions" />
                <NavItem text="Vitamins & Supplements" />
                <NavItem text="Diabetes Care" />
                <NavItem text="Healthcare Devices" />
                <NavItem text="Health Articles" />
                <NavItem text="Ayurveda" />
                <NavItem text="Offers" />
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-600 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-white bg-blue-700 rounded-md text-base font-medium">
              Medicines
            </a>
            <a href="#" className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md text-base font-medium">
              Personal Care
            </a>
            <a href="#" className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md text-base font-medium">
              Health Conditions
            </a>
            <a href="#" className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md text-base font-medium">
              Vitamins & Supplements
            </a>
            <a href="#" className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md text-base font-medium">
              Diabetes Care
            </a>
            <a href="#" className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md text-base font-medium">
              Healthcare Devices
            </a>
            <a href="#" className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md text-base font-medium">
              Health Articles
            </a>
            <a href="#" className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md text-base font-medium">
              Ayurveda
            </a>
            <a href="#" className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md text-base font-medium">
              Offers
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
