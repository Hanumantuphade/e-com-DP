"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ChevronDown, Award, Heart, Users, MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  const [isLoaded, setIsLoaded] = useState(false);
  const bannerRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  const isInViewMission = useInView(missionRef, { once: true, amount: 0.3 });
  const isInViewTeam = useInView(teamRef, { once: true, amount: 0.3 });
  const isInViewValues = useInView(valuesRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: "smooth"
    });
  };

  return (
    <div className="bg-gradient-to-r from-green-300 to-blue-300 overflow-hidden min-h-screen">
      <Header />

      {/* Animated Banner Section */}
      <motion.div 
        ref={bannerRef}
        className="relative h-screen w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale, opacity }}
        >
          <Image
            src="/logo1.png" 
            alt="Dua Pharmacy"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 to-green-900/80 mix-blend-multiply" />
        </motion.div>

        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10"
          style={{ y, opacity }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            About Dua Pharmacy
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-green-50 max-w-3xl mb-10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Caring for your health since 2022 with dedication and excellence
          </motion.p>
          
          <motion.button
            className="bg-white text-green-700 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center"
            onClick={scrollToContent}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ y: -5 }}
          >
            Discover Our Story
            <ChevronDown className="ml-2 h-5 w-5" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Our Story Section */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-2xl transform -rotate-3 opacity-70"></div>
                <div className="relative overflow-hidden rounded-xl shadow-2xl">
                  <Image
                    src="/pharmacy-store.jpg"
                    alt="Dua Pharmacy Store"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 w-32 h-32 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-600">3+</p>
                    <p className="text-sm text-gray-600 font-medium">Years of Service</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="h-1 w-20 bg-green-500 mb-8"></div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Dua Pharmacy was founded in 2022 with a simple yet powerful mission: to make quality healthcare accessible to everyone in Thanesar and beyond. Located on Chanarthal Road near New Anaj Mandi, we started as a small neighborhood pharmacy with big dreams.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our founder, a passionate healthcare professional, recognized the need for a pharmacy that not only dispensed medications but also provided personalized care and guidance. From day one, we've been committed to building lasting relationships with our customers, understanding their unique health needs, and offering solutions that improve their quality of life.
              </p>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                <p className="text-green-700 italic font-medium">
                  "We believe that healthcare should be personal, accessible, and centered around the needs of the individual. That's the foundation of everything we do at Dua Pharmacy."
                </p>
                <p className="text-green-600 font-bold mt-2">— Founder, Dua Pharmacy</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Mission Section */}
        <motion.div 
          ref={missionRef}
          className="mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isInViewMission ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
            <div className="h-1 w-20 bg-green-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're on a mission to transform healthcare delivery by combining professional pharmaceutical care with compassion and innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide accessible, affordable, and high-quality pharmaceutical care to our community while educating and empowering individuals to take control of their health. We strive to be more than just a pharmacy—we aim to be a trusted healthcare partner for every person we serve.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be the leading healthcare provider in Haryana, recognized for our exceptional service, innovative approach to pharmaceutical care, and unwavering commitment to community health. We envision a future where everyone has access to personalized healthcare solutions that improve their quality of life.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Our Values Section */}
        <motion.div 
          ref={valuesRef}
          className="mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isInViewValues ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <div className="h-1 w-20 bg-green-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              These principles guide our decisions and actions every day, shaping how we serve our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 hover:border-green-200">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Compassion</h3>
              <p className="text-gray-700">
                We approach every interaction with empathy and understanding, recognizing that behind every prescription is a person with unique needs and concerns.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 hover:border-green-200">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-700">
                We are committed to the highest standards of pharmaceutical care, continuously improving our knowledge, services, and processes to deliver the best possible outcomes.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 hover:border-green-200">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-700">
                We believe in the power of community and strive to be an active, positive force in Thanesar, contributing to the health and wellbeing of all residents.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Meet Our Team (Single Member) */}
        <motion.div 
          ref={teamRef}
          className="mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isInViewTeam ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <div className="h-1 w-20 bg-green-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our dedicated professionals work together to provide you with exceptional pharmaceutical care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group col-span-1 md:col-start-2">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/team-member1.jpg"
                  alt="Team Member"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Dr. Rajesh Kumar</h3>
                <p className="text-green-600 font-medium mb-4">Lead Pharmacist</p>
                <p className="text-gray-700">
                  With over 15 years of experience in pharmaceutical care, Dr. Kumar leads our team with expertise and compassion.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Contact CTA Section */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-8 py-12 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Visit Us Today</h2>
              <p className="text-green-50 text-lg mb-6">
                Experience the Dua Pharmacy difference. Our team is ready to assist you with all your healthcare needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">Chanarthal Rd, near New Anaj Mandi, Thanesar, Haryana 136118</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">072062 34875</span>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-white mr-2" />
                <span className="text-white">Monday - Saturday: 9:00 AM - 9:00 PM | Sunday: Closed</span>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Link 
                href="/contact"
                className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all inline-block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
