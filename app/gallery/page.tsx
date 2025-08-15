// app/gallery/page.tsx
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
      src: "/gallery/g1.jpeg",
      title: "Welcome to Dua Pharmacy",
      description:
        "Step into our modern, welcoming space where healthcare meets comfort. Our pharmacy is designed to make you feel at ease while we take care of your health needs.",
      accent: "from-green-500 to-emerald-600",
    },
    {
      id: 2,
      src: "/gallery/g3.jpeg",
      title: "Comprehensive Medicine Collection",
      description:
        "From prescription medications to over-the-counter remedies, we stock a wide range of quality pharmaceuticals to meet all your health requirements.",
      accent: "from-blue-500 to-cyan-600",
    },
    {
      id: 3,
      src: "/gallery/g2.jpeg",
      title: "Expert Pharmaceutical Care",
      description:
        "Our qualified pharmacists provide professional consultation, ensuring you understand your medications and receive personalized healthcare guidance.",
      accent: "from-purple-500 to-violet-600",
    },
    {
      id: 4,
      src: "/gallery/g5.jpeg",
      title: "Health & Wellness Products",
      description:
        "Beyond medicines, we offer a comprehensive range of health and wellness products to support your overall wellbeing and lifestyle.",
      accent: "from-rose-500 to-pink-600",
    },
    {
      id: 5,
      src: "/gallery/g6.jpeg",
      title: "Personalized Customer Service",
      description:
        "Every customer receives individual attention. We take time to understand your needs and provide tailored solutions for your health concerns.",
      accent: "from-orange-500 to-amber-600",
    },
    {
      id: 6,
      src: "/gallery/g7.jpg",
      title: "State-of-the-Art Equipment",
      description:
        "We use the latest pharmacy technology and equipment to ensure accuracy, efficiency, and the highest standards of pharmaceutical care.",
      accent: "from-teal-500 to-cyan-600",
    },
    {
      id: 7,
      src: "/gallery/g8.jpeg",
      title: "Serving Our Community",
      description:
        "Proud to be a cornerstone of healthcare in Thanesar, we're committed to improving the health and quality of life for our entire community.",
      accent: "from-indigo-500 to-blue-600",
    },
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      <Header />

      {/* Gallery Title Section */}
      <div className="relative bg-gradient-to-br min-h-screen from-green-600 to-blue-600 py-20 sm:py-24 overflow-hidden">
        <Image src="/gallery/g4.png" alt="" fill className="object-cover z-0" />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative top-16 max-w-4xl mx-auto text-center px-4">
          <motion.div
            className="flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 sm:mb-8 mx-auto"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Camera className="h-10 w-10 text-white" />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-200 mb-4 sm:mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Visual Story
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the heart of Dua Pharmacy through our immersive gallery
          </motion.p>
        </div>
      </div>

      {/* Large Format Image Gallery */}
      <div className="py-10 sm:py-16">
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
      <div className="relative py-8 sm:py-12 overflow-hidden">
        <Image
          src="/a2.png"
          alt="Pharmacy background"
          fill
          className="object-cover z-0"
        />
        <div className="relative max-w-4xl mx-auto text-center px-4 z-10">
          <motion.div
            className="inline-flex items-center justify-center w-14 sm:w-16 h-14 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Visit Us Today
          </h2>

          <p className="text-base text-black sm:text-lg md:text-xl  mb-6 sm:mb-8 max-w-2xl mx-auto">
            Experience the difference at Dua Pharmacy. Your health and wellbeing
            are our top priorities.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center justify-center text-black mb-6 sm:mb-8">
            <div className="flex items-center text-center sm:text-left">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-sm sm:text-base leading-snug">
                Chanarthal Rd, near New Anaj Mandi, Thanesar
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span className="text-sm sm:text-base leading-snug">
                Mon-Sat: 9AM-9PM
              </span>
            </div>
          </div>

          <motion.a
            href="/contact"
            className="inline-block bg-white text-green-600 px-5 sm:px-10 py-2.5 sm:py-4 rounded-full font-bold text-sm sm:text-lg shadow-lg hover:shadow-xl transition-all"
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

function ImageSection({ image, index, isEven }: ImageSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative mb-14 sm:mb-20 px-2 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div
          className={`flex flex-col ${
            isEven ? "lg:flex-row" : "lg:flex-row-reverse"
          } gap-6 sm:gap-10 lg:gap-14 items-center`}
        >
          {/* Image */}
          <motion.div
            className="w-full lg:w-1/2 max-w-2xl mx-auto relative"
            initial={{ opacity: 0, x: isEven ? -80 : 80 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: isEven ? -80 : 80 }
            }
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg">
              {/* New subtle glow background */}
              <div className="absolute inset-0 rounded-xl shadow-[0_0_35px_rgba(0,0,0,0.15)]"></div>

              <div className="relative w-full h-0 pb-[84%] rounded-lg overflow-hidden">
                <motion.div style={{ y: y }} className="absolute inset-0">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 45vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority={index < 2}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: isEven ? 80 : -80 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: isEven ? 80 : -80 }
            }
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className={`${isEven ? "lg:pl-4" : "lg:pr-4"}`}>
              <div
                className={`h-1 w-12 sm:w-16 bg-gradient-to-r ${image.accent} mb-3 sm:mb-5`}
              ></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-5 leading-tight">
                {image.title}
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-5 sm:mb-7">
                {image.description}
              </p>

              <div className="flex items-center space-x-3 sm:space-x-5">
                <div
                  className={`w-9 sm:w-10 h-9 sm:h-10 bg-gradient-to-br ${image.accent} rounded-full flex items-center justify-center`}
                >
                  <Camera className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide font-medium">
                    Gallery
                  </p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-900">
                    Dua Pharmacy
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {index < 6 && (
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-10 sm:h-16 bg-gradient-to-b from-gray-300 to-transparent"
          style={{ opacity }}
        />
      )}
    </div>
  );
}
