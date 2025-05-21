"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const contactInfoRef = useRef(null);
  
  const isInViewForm = useInView(formRef, { once: true, amount: 0.3 });
  const isInViewMap = useInView(mapRef, { once: true, amount: 0.3 });
  const isInViewContactInfo = useInView(contactInfoRef, { once: true, amount: 0.3 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/place/DUA+PHARMACY,+Chanarthal+Rd,+near+New+Anaj+Mandi,+Thanesar,+Haryana+136118/@29.9516773,76.8391367,17z/data=!4m6!3m5!1s0x390e3b83dd0a5a13:0x8b2abc7cc9ceed3b!8m2!3d29.9517022!4d76.8392053!16s%2Fg%2F11wq0bj8_0?utm_campaign=ml-ardl&g_ep=Eg1tbF8yMDI1MDUxMl8wIJvbDyoASAJQAQ%3D%3D`, '_blank', 'noopener,noreferrer');
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/917206234875`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-800 py-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
        <div className="absolute top-10 left-10 w-40 h-40 bg-green-300 rounded-full opacity-10"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-300 rounded-full opacity-10"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-400 rounded-full opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              We're here to help you with all your healthcare needs. Reach out to us anytime.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Contact Information Cards - FIXED with grid and auto sizing */}
        <motion.div 
          ref={contactInfoRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 cards-container"
          initial={{ opacity: 0, y: 50 }}
          animate={isInViewContactInfo ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >
          {/* Card 1: Call Us */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInViewContactInfo ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="p-8 card-content">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Call Us</h3>
              <button 
                onClick={openWhatsApp}
                className="text-xl font-medium text-green-600 hover:text-green-700 mb-4 flex items-center"
              >
                072062 34875
                <MessageCircle className="ml-2 h-5 w-5" />
              </button>
              <p className="text-gray-600 mb-1">Monday - Saturday: 9:00 AM - 9:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
              <div className="mt-auto pt-6">
                <button 
                  onClick={openWhatsApp}
                  className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg flex items-center justify-center transition-colors w-full"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Card 2: Email Us */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInViewContactInfo ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="p-8 card-content">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Email Us</h3>
              <a href="mailto:info@duapharmacy.com" className="text-blue-600 hover:text-blue-700 block mb-2">
                info@duapharmacy.com
              </a>
              <a href="mailto:help@duapharmacy.com" className="text-blue-600 hover:text-blue-700 block mb-4">
                help@duapharmacy.com
              </a>
              <p className="text-gray-600">We usually respond within 24 hours</p>
              <div className="mt-auto pt-6">
                <a 
                  href="mailto:info@duapharmacy.com"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center transition-colors w-full"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Send Email
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Card 3: Visit Us */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInViewContactInfo ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="p-8 card-content">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Visit Us</h3>
              <p className="font-medium text-gray-900 mb-2">Dua Pharmacy</p>
              <p className="text-gray-600 mb-1">Chanarthal Rd, near New Anaj Mandi</p>
              <p className="text-gray-600 mb-4">Thanesar, Haryana 136118</p>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Operating Hours</h4>
                <p className="text-gray-600 mb-1">Monday - Saturday: 9:00 AM - 9:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
              <div className="mt-auto pt-2">
                <button 
                  onClick={openGoogleMaps}
                  className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg flex items-center justify-center transition-colors w-full"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  View on Map
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Contact Form and Map Section - IMPROVED SEPARATION */}
<div className="flex-container">
  {/* Contact Form */}
  <motion.div 
    ref={formRef}
    className="flex-child form-container"
    initial={{ opacity: 0, x: -50 }}
    animate={isInViewForm ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
    transition={{ duration: 0.8 }}
  >
    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 form-content">
      <div className="form-header mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Send Us a Message</h2>
      </div>
      <p className="text-gray-600 mb-8">
        Have a question or need assistance? Fill out the form below and we'll get back to you as soon as possible.
      </p>
      
      <form className="space-y-6">
        {/* Form field */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="john@example.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="+91 98765 43210"
          />
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="How can we help you?"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Please provide details about your inquiry..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Send Message
        </button>
      </form>
    </div>
  </motion.div>
  
  {/* Map - IMPROVED with distinct styling */}
  <motion.div 
    ref={mapRef}
    className="flex-child"
    initial={{ opacity: 0, x: 50 }}
    animate={isInViewMap ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
    transition={{ duration: 0.8 }}
  >
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full map-wrapper">
      <div className="map-header p-6 bg-blue-50 border-b border-blue-100">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <MapPin className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Visit Us</h2>
            <p className="text-gray-600">Dua Pharmacy, Thanesar, Haryana</p>
          </div>
        </div>
      </div>
      <div className="map-container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.0293083252143!2d76.83920529999999!3d29.9517022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e3b83dd0a5a13%3A0x8b2abc7cc9ceed3b!2sDUA%20PHARMACY!5e0!3m2!1sen!2sin!4v1653114124305!5m2!1sen!2sin" 
          className="map-iframe"
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        
        <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg border-2 border-blue-100">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div className="ml-3">
              <p className="font-medium text-gray-900">Dua Pharmacy</p>
              <p className="text-gray-600 text-sm">Chanarthal Rd, near New Anaj Mandi, Thanesar, Haryana 136118</p>
            </div>
          </div>
          <button 
            onClick={openGoogleMaps}
            className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded flex items-center justify-center"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in Google Maps
          </button>
        </div>
      </div>
    </div>
  </motion.div>
</div>
        
        {/* FAQ Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our services and operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What are your delivery hours?</h3>
              <p className="text-gray-600">
                We deliver medications from 10:00 AM to 8:00 PM every day except Sundays. For emergency deliveries, please call our helpline.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Do you accept online prescriptions?</h3>
              <p className="text-gray-600">
                Yes, you can upload your prescription through our website or WhatsApp. Our pharmacist will verify it before processing your order.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept cash on delivery, credit/debit cards, UPI payments, and all major digital wallets for your convenience.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Do you offer health consultations?</h3>
              <p className="text-gray-600">
                Yes, our qualified pharmacists can provide basic health consultations and medication guidance. For specialized advice, we recommend consulting a doctor.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                We're here to help you 24/7
              </h2>
              <p className="text-gray-700 max-w-xl">
                Have an urgent medical need or question? Our team is available around the clock to assist you. Reach out to us through any of our contact channels.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={openWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us
              </button>
              <a 
                href="tel:+917206234875"
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Updated CSS for better separation */}
<style jsx global>{`
  /* Container flexbox for form and map */
  .flex-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  @media (min-width: 1024px) {
    .flex-container {
      flex-direction: row;
    }
  }

  /* Children take full height */
  .flex-child {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    min-width: 0; /* Prevent overflow */
  }

  /* Map wrapper with distinct styling */
  .map-wrapper {
    display: flex;
    flex-direction: column;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  /* Map header styling */
  .map-header {
    border-bottom: 1px solid #dbeafe;
  }

  /* Map iframe container to fill height */
  .map-container {
    flex-grow: 1;
    position: relative;
    min-height: 400px; /* Minimum height for mobile */
    height: 100%;
    border-top: 4px solid #dbeafe;
  }

  .map-iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  /* Form container to fill height */
  .form-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .form-content {
    flex-grow: 1;
    border: 1px solid #e5e7eb;
    border-top: 4px solid #d1fae5;
  }

  /* Form header styling */
  .form-header {
    border-bottom: 1px solid #d1fae5;
    padding-bottom: 1rem;
  }

  /* Cards container for equal heights */
  .cards-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .cards-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`}</style>

      <Footer />
    </div>
  );
}
