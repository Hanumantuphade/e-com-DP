"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  Phone,
  ArrowRight,
  ChevronUp,
  Heart,
  CheckCircle,
} from "lucide-react";
import FooterHeader from "./FooterHeader";
import TopBrands from "./topBrands";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  // Scroll to top button visibility control
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle subscription
  const handleSubscribe = () => {
    if (email && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
      // In a real app, you'd send this to your API
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Footer Header Component */}

      <TopBrands />
      <FooterHeader />

      {/* Section break */}
      <div className="h-2 bg-green-300 w-full"></div>

      {/* Main content with green-300 background */}
      <div className="bg-green-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Main grid section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14">
            {/* Company section */}
            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-bold text-gray-900 mb-5 text-lg flex items-center">
                <span className="inline-block w-6 h-0.5 bg-green-500 mr-2"></span>
                Company
              </h3>
              <ul className="space-y-3">
                {[
                  "About Us",
                  "Health Article",
                  "Diseases & Health Conditions",
                  "Need Help",
                  "FAQ",
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-blue-600 transition-colors duration-300 flex items-center group"
                    >
                      <span className="inline-block w-0 group-hover:w-2 h-0.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal section */}
            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-bold text-gray-900 mb-5 text-lg flex items-center">
                <span className="inline-block w-6 h-0.5 bg-blue-500 mr-2"></span>
                Legal
              </h3>
              <ul className="space-y-3">
                {[
                  "Terms & Conditions",
                  "Privacy Policy",
                  "Editorial Policy",
                  "Returns & Cancellations",
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-blue-600 transition-colors duration-300 flex items-center group"
                    >
                      <span className="inline-block w-0 group-hover:w-2 h-0.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe section */}
            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-bold text-gray-900 mb-5 text-lg flex items-center">
                <span className="inline-block w-6 h-0.5 bg-purple-500 mr-2"></span>
                Subscribe
              </h3>
              <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                <p className="text-gray-600 mb-4">
                  Claim your complimentary health and fitness subscription and
                  stay updated on our newest promotions.
                </p>
                {isSubscribed ? (
                  <div className="bg-green-100 text-green-800 p-3 rounded-lg text-sm mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Thank you for subscribing!
                  </div>
                ) : (
                  <div className="mb-2">
                    <div className="flex overflow-hidden rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition-all">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email ID"
                        className="flex-1 px-4 py-3 border-0 focus:outline-none text-gray-800"
                      />
                      <button
                        onClick={handleSubscribe}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium px-4 py-3 hover:from-blue-700 hover:to-blue-800 transition-all flex items-center"
                      >
                        <span>Subscribe</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                )}
                <p className="text-xs text-gray-500 flex items-center">
                  <Heart className="w-3 h-3 mr-1 text-red-400" />
                  We respect your privacy. No spam, ever.
                </p>
              </div>
            </div>

            {/* Contact section */}
            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-bold text-gray-900 mb-5 text-lg flex items-center">
                <span className="inline-block w-6 h-0.5 bg-red-500 mr-2"></span>
                Contact Us
              </h3>
              <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                <p className="text-gray-600 mb-4 text-sm">
                  Our customer representative team is available 7 days a week
                  from 9 am - 9 pm.
                </p>
                <div className="space-y-3 mb-4">
                  <p className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-blue-600" />
                    <a
                      href="mailto:duapharmacy24@gmail.com"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      duapharmacy24@gmail.com
                    </a>
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-blue-600" />
                    <a
                      href="tel:09240250346"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      07206234875
                    </a>
                  </p>
                </div>

                <div className="flex space-x-4 mt-4">
                  {[
                    {
                      icon: <Facebook className="w-6 h-6" />,
                      color: "bg-blue-500",
                      url: "https://wa.me/c/916284824078",
                    },
                    {
                      icon: <Instagram className="w-6 h-6" />,
                      color: "bg-pink-500 ",
                      url: "https://wa.me/c/916284824078",
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 "
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      ),
                      color: "bg-green-400",
                      url: "https://wa.me/c/917206234875",
                    },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className={`${social.color} text-white p-2 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center`}
                      aria-label="Social media link"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Copyright section with animated border */}
          <div className="text-center relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1">
              <div className="animate-pulse bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 h-full rounded-full"></div>
            </div>
            <div className="pt-6">
              <p className="text-gray-700 text-sm">
                © {currentYear} Dua Pharmacy. All Rights Reserved.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Committed to providing quality healthcare solutions since 2018.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 bg-green-600 text-white rounded-full p-3 shadow-lg hover:bg-green-700 transition-all z-50 ${
          showScrollTop ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
