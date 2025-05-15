"use client"

import Image from "next/image";
import { Facebook, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Order medicines online from Dua Pharmacy at the best prices.
          </h2>
          <p className="text-gray-600 mb-6">An online pharmacy you can trust.</p>
          
          <div className="flex justify-center mb-8">
            <Image 
              src="/pharmacy-illustration.png" 
              alt="Dua Pharmacy Illustration"
              width={300}
              height={150}
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Health Article</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Diseases & Health Conditions</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Need Help</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Editorial Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Returns & Cancellations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Subscribe</h3>
            <p className="text-gray-600 mb-4">
              Claim your complimentary health and fitness subscription and stay updated
              on our newest promotions.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter Email ID" 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-r hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Contact Us</h3>
            <p className="text-gray-600 mb-2">
              Our customer representative team is available 7 days a week from 9 am - 9 pm.
            </p>
            <p className="text-gray-600 mb-1">
              Email: <a href="mailto:support@duapharmacy.in" className="text-blue-600">support@duapharmacy.in</a>
            </p>
            <p className="text-gray-600">
              Mob: <a href="tel:09240250346" className="text-blue-600">09240250346</a>
            </p>
            
            <div className="flex space-x-3 mt-4">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <Facebook />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <Linkedin />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <Twitter />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <h3 className="font-bold text-gray-900 mb-4 text-center">OUR PAYMENT PARTNERS</h3>
          <div className="flex justify-center space-x-6 mb-6">
            <Image src="/google-pay.png" alt="Google Pay" width={60} height={30} />
            <Image src="/phonepe.png" alt="PhonePe" width={60} height={30} />
            <Image src="/rupay.png" alt="RuPay" width={60} height={30} />
            <Image src="/paytm.png" alt="Paytm" width={60} height={30} />
            <Image src="/visa.png" alt="Visa" width={60} height={30} />
            <Image src="/stripe.png" alt="Stripe" width={60} height={30} />
            <Image src="/mastercard.png" alt="Mastercard" width={60} height={30} />
          </div>
          
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Dua Pharmacy. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
