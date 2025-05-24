"use client";

import { useEffect, useState, useRef } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Camera, Heart, MapPin, Clock } from "lucide-react";
import Image from "next/image";

export default function Gallery() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const galleryImages = [
    { 
      id: 1, 
      src: "/image1.png", 
      title: "Welcome to Dua Pharmacy", 
      description: "Step into our modern, welcoming space where healthcare meets comfort. Our pharmacy is designed to make you feel at ease while we take care of your health needs.",
      accent: "from-green-500 to-emerald-600"
    },
    { 
      id: 2, 
      src: "/image2.png", 
      title: "Comprehensive Medicine Collection", 
      description: "From prescription medications to over-the-counter remedies, we stock a wide range of quality pharmaceuticals to meet all your health requirements.",
      accent: "from-blue-500 to-cyan-600"
    },
    { 
      id: 3, 
      src: "/image3.png", 
      title: "Expert Pharmaceutical Care", 
      description: "Our qualified pharmacists provide professional consultation, ensuring you understand your medications and receive personalized healthcare guidance.",
      accent: "from-purple-500 to-violet-600"
    },
    { 
      id: 4, 
      src: "/image4.png", 
      title: "Health & Wellness Products", 
      description: "Beyond medicines, we offer a comprehensive range of health and wellness products to support your overall wellbeing and lifestyle.",
      accent: "from-rose-500 to-pink-600"
    },
    { 
      id: 5, 
      src: "/image5.png", 
      title: "Personalized Customer Service", 
      description: "Every customer receives individual attention. We take time to understand your needs and provide tailored solutions for your health concerns.",
      accent: "from-orange-500 to-amber-600"
    },
    { 
      id: 6, 
      src: "/image6.png", 
      title: "State-of-the-Art Equipment", 
      description: "We use the latest pharmacy technology and equipment to ensure accuracy, efficiency, and the highest standards of pharmaceutical care.",
      accent: "from-teal-500 to-cyan-600"
    },
    { 
      id: 7, 
      src: "/image7.png", 
      title: "Serving Our Community", 
      description: "Proud to be a cornerstone of healthcare in Thanesar, we're committed to improving the health and quality of life for our entire community.",
      accent: "from-indigo-500 to-blue-600"
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      {/* Gallery Title Section */}
      <div className="relative bg-gradient-to-br from-green-600 to-blue-600 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Camera className="h-10 w-10 text-white" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Visual Story
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the heart of Dua Pharmacy through our immersive gallery
          </motion.p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Large Format Image Gallery */}
      <div className="py-16">
        {galleryImages.map((image, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <ImageSection 
              key={image.id} 
              image={image} 
              index={index} 
              isEven={isEven}
            />
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Heart className="h-8 w-8 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Visit Us Today</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the difference at Dua Pharmacy. Your health and wellbeing are our top priorities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center text-white/90 mb-8">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Chanarthal Rd, near New Anaj Mandi, Thanesar</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>Mon-Sat: 9AM-9PM</span>
            </div>
          </div>
          
          <motion.a
            href="/contact"
            className="inline-block bg-white text-green-600 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Directions
          </motion.a>
        </div>
      </div>

      <Footer />
    </div>
  );
}

type GalleryImage = {
  id: number;
  src: string;
  title: string;
  description: string;
  accent: string;
};

type ImageSectionProps = {
  image: GalleryImage;
  index: number;
  isEven: boolean;
};

function ImageSection({ image, index, isEven } :ImageSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div 
      ref={ref}
      className={`relative mb-32 ${isEven ? 'ml-0' : 'mr-0'}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
          
          {/* Image Container */}
          <motion.div 
            className="w-full lg:w-3/5 relative"
            initial={{ opacity: 0, x: isEven ? -100 : 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -100 : 100 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative group cursor-pointer">
              {/* Decorative Background */}
              <div className={`absolute -inset-8 bg-gradient-to-br ${image.accent} rounded-3xl opacity-20 transform ${isEven ? 'rotate-3' : '-rotate-3'} group-hover:rotate-0 transition-transform duration-700`}></div>
              
              {/* Main Image Container - FIXED */}
              <div className="relative w-full h-0 pb-[75%] rounded-2xl overflow-hidden shadow-2xl">
                <motion.div style={{ y: y }} className="absolute inset-0">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 45vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority={index < 2} // Prioritize first 2 images for better loading
                  />
                </motion.div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Floating Number */}
              <div className={`absolute -top-6 ${isEven ? '-left-6' : '-right-6'} w-16 h-16 bg-gradient-to-br ${image.accent} rounded-full flex items-center justify-center shadow-xl`}>
                <span className="text-white font-bold text-xl">{index + 1}</span>
              </div>
            </div>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            className="w-full lg:w-2/5"
            initial={{ opacity: 0, x: isEven ? 100 : -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 100 : -100 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className={`${isEven ? 'lg:pl-8' : 'lg:pr-8'}`}>
              <div className={`h-1 w-16 bg-gradient-to-r ${image.accent} mb-6`}></div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {image.title}
              </h2>
              
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                {image.description}
              </p>
              
              {/* Stats or Additional Info */}
              <div className="flex items-center space-x-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${image.accent} rounded-full flex items-center justify-center`}>
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">Gallery</p>
                  <p className="text-lg font-semibold text-gray-900">Dua Pharmacy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Divider Line */}
      {index < 6 && (
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-gray-300 to-transparent"
          style={{ opacity }}
        />
      )}
    </div>
  );
}