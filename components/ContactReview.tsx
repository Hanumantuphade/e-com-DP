"use client"

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Star, ExternalLink, Navigation } from "lucide-react";

export default function ContactReview() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showEnlargedQR, setShowEnlargedQR] = useState(false);

  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/place/?q=place_id:ChIJE1oK3YM7DjkRO-3OyXy8Kos`, '_blank', 'noopener,noreferrer');
  };

  const openReviewPage = () => {
    window.open('https://search.google.com/local/writereview?placeid=ChIJE1oK3YM7DjkRO-3OyXy8Kos', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-gradient-to-br from-red-300 to-blue-500 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Us Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transform transition-all hover:shadow-xl">
            <div className="bg-gradient-to-r from-blue-400 to-blue-300 py-5 px-6">
              <h2 className="text-2xl font-bold text-white">Contact Us</h2>
              <p className="text-blue-50 text-lg">We're here to help you 24/7</p>
            </div>
            
            <div className="p-7">
              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start">
                  <div className="bg-blue-100 p-4 rounded-full mr-5 shadow-sm">
                    <Phone className="h-7 w-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-800 text-xl font-bold">
                      <a href="tel:07206234875" className="hover:text-blue-600 transition-colors">
                        072062 34875
                      </a>
                    </p>
                    <p className="text-gray-600 mt-2">Monday - Saturday: 9:00 AM - 9:00 PM</p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start">
                  <div className="bg-purple-100 p-4 rounded-full mr-5 shadow-sm">
                    <Mail className="h-7 w-7 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-800">
                      <a href="mailto:info@duapharmacy.com" className="hover:text-blue-600 transition-colors">
                        info@duapharmacy.com
                      </a>
                    </p>
                    <p className="text-gray-800">
                      <a href="mailto:help@duapharmacy.com" className="hover:text-blue-600 transition-colors">
                        help@duapharmacy.com
                      </a>
                    </p>
                    <p className="text-gray-600 mt-2">We usually respond within 24 hours</p>
                  </div>
                </div>
                
                {/* Address */}
                <div className="flex items-start">
                  <div className="bg-orange-100 p-4 rounded-full mr-5 shadow-sm">
                    <MapPin className="h-7 w-7 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Visit Us</h3>
                    <p className="text-gray-800 font-semibold text-lg">Dua Pharmacy</p>
                    <p className="text-gray-700 font-medium">Chanarthal Rd, near New Anaj Mandi</p>
                    <p className="text-gray-700 font-medium">Thanesar, Haryana 136118</p>
                    
                    <button 
                      onClick={openGoogleMaps}
                      className="mt-4 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 px-5 rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition-all transform hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto"
                      aria-label="View location on Google Maps"
                    >
                      <Navigation className="mr-2 h-5 w-5" />
                      <span>VIEW ON MAP</span>
                    </button>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-lg mt-6 shadow-sm border border-gray-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">Operating Hours</h3>
                  <div className="grid grid-cols-2 gap-y-2">
                    <p className="text-gray-700 font-medium">Monday - Saturday:</p>
                    <p className="text-gray-800 font-semibold">9:00 AM - 9:00 PM</p>
                    
                    <p className="text-gray-700 font-medium">Sunday:</p>
                    <p className="text-gray-800 font-semibold">Closed</p>
                    
                    {/* <p className="text-gray-700 font-medium">Holidays:</p> */}
                    {/* <p className="text-gray-800 font-semibold">4:00 PM - 9:00 PM </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Us Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transform transition-all hover:shadow-xl">
            <div className="bg-gradient-to-r from-purple-500 to-purple-400 py-5 px-6">
              <h2 className="text-2xl font-bold text-white">Review Us</h2>
              <p className="text-purple-50 text-lg">Your feedback helps us improve</p>
            </div>
            
            <div className="p-7 flex flex-col items-center text-center">
              <div className="flex space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-9 w-9 cursor-pointer transition-all ${
                      (hoverRating || rating) >= star
                        ? "fill-yellow-400 text-yellow-400 scale-110"
                        : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 text-lg">
                Tell us about your experience. Scan this QR Code to discover more ways to share your feedback with us.
              </p>
              
              <div 
                className="relative h-64 w-64 mb-4 cursor-pointer hover:opacity-90 transition-opacity bg-white p-2 rounded-lg shadow-md hover:shadow-lg"
                onClick={() => setShowEnlargedQR(true)}
                role="button"
                aria-label="Enlarge QR code"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setShowEnlargedQR(true);
                  }
                }}
              >
                <Image 
                  src="/qr.png" 
                  alt="Review QR Code" 
                  fill
                  className="object-contain p-1"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 256px"
                  priority
                />
              </div>
              
              <p className="text-gray-500 text-sm">Click on QR Code to enlarge</p>
              
              <div className="mt-8 w-full">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg flex items-center shadow-sm border border-blue-100">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Star className="h-5 w-5 text-blue-600 fill-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-gray-800 font-medium">Rated 5/5 based on the Google Reviews</p>
                    <p className="text-gray-600 text-sm">Join our satisfied customers in sharing your experience</p>
                  </div>
                </div>
              </div>
              
              <button 
                className="mt-6 bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 px-6 rounded-lg font-bold hover:from-purple-700 hover:to-purple-600 transition-all transform hover:scale-105 w-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-lg"
                onClick={openReviewPage}
                aria-label="Write a review on Google"
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showEnlargedQR && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setShowEnlargedQR(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged QR Code"
        >
          <div 
            className="relative h-[80vh] w-[80vh] max-w-[90vw] max-h-[90vh] bg-white p-2 rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 bg-gray-200 rounded-full p-1.5 hover:bg-gray-300 transition-colors z-10 shadow-sm"
              onClick={() => setShowEnlargedQR(false)}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image 
              src="/qr.png" 
              alt="Enlarged QR Code" 
              fill
              className="object-contain p-4"
              quality={100}
              sizes="(max-width: 768px) 90vw, 80vh"
            />
          </div>
        </div>
      )}
    </div>
  );
}
