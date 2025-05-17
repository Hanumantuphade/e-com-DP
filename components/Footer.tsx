"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Facebook, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  ArrowRight, 
  ChevronUp,
  Heart,
  CheckCircle
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
      behavior: "smooth"
    });
  };

  // Handle subscription
  const handleSubscribe = () => {
    if (email && email.includes('@')) {
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
                {["About Us", "Health Article", "Diseases & Health Conditions", "Need Help", "FAQ"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 flex items-center group">
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
                {["Terms & Conditions", "Privacy Policy", "Editorial Policy", "Returns & Cancellations"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 flex items-center group">
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
                  Claim your complimentary health and fitness subscription and stay updated
                  on our newest promotions.
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
                  Our customer representative team is available 7 days a week from 9 am - 9 pm.
                </p>
                <div className="space-y-3 mb-4">
                  <p className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-blue-600" />
                    <a href="mailto:support@duapharmacy.in" className="text-blue-600 hover:text-blue-800 transition-colors">support@duapharmacy.in</a>
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-blue-600" />
                    <a href="tel:09240250346" className="text-blue-600 hover:text-blue-800 transition-colors">09240250346</a>
                  </p>
                </div>
                
                <div className="flex space-x-4 mt-4">
                  {[
                    { icon: <Facebook className="w-4 h-4" />, color: "bg-blue-600" },
                    { icon: <Linkedin className="w-4 h-4" />, color: "bg-blue-700" },
                    { icon: <Twitter className="w-4 h-4" />, color: "bg-blue-400" }
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
          
          {/* Payment partners section */}
          <div className="border-t border-green-400 pt-10 relative">
            <h3 className="font-bold text-gray-900 mb-6 text-center">
              <span className="bg-gradient-to-r from-green-700 to-blue-600 bg-clip-text text-transparent">OUR PAYMENT PARTNERS</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {[
                "google-pay", "phonepe", "rupay", "paytm", 
                "visa", "stripe", "mastercard"
              ].map((partner, index) => (
                <div 
                  key={index} 
                  className="transform hover:-translate-y-1 hover:shadow-md transition-all duration-300 bg-white p-3 rounded-lg"
                >
                  <Image 
                    src={`/${partner}.png`} 
                    alt={partner.charAt(0).toUpperCase() + partner.slice(1).replace("-", " ")} 
                    width={60} 
                    height={30}
                    className="object-contain"
                  />
                </div>
              ))}
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
      </div>
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 bg-green-600 text-white rounded-full p-3 shadow-lg hover:bg-green-700 transition-all z-50 ${
          showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </footer>
  );
}