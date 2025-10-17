"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Camera } from "lucide-react";
import Image from "next/image";

export type GalleryImage = {
  id: number;
  src: string;
  title: string;
  description: string;
  accent: string; // Tailwind gradient classes like "from-green-500 to-emerald-600"
};

type ImageSectionProps = {
  image: GalleryImage;
  index: number;
  isEven: boolean;
};

const ImageSection: React.FC<ImageSectionProps> = ({ image, index, isEven }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative mb-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
          {/* Image */}
          <motion.div
            className="w-full lg:w-3/5 relative"
            initial={{ opacity: 0, x: isEven ? -100 : 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative group cursor-pointer">
              {/* Gradient Background */}
              <div className={`absolute -inset-8 rounded-3xl bg-gradient-to-br ${image.accent} opacity-20 transform ${isEven ? 'rotate-3' : '-rotate-3'} group-hover:rotate-0 transition-transform duration-700`} />

              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <motion.div style={{ y }}>
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Number Badge */}
              <div className={`absolute -top-6 ${isEven ? '-left-6' : '-right-6'} w-16 h-16 rounded-full bg-gradient-to-br ${image.accent} flex items-center justify-center shadow-xl`}>
                <span className="text-white text-xl font-bold">{index + 1}</span>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="w-full lg:w-2/5"
            initial={{ opacity: 0, x: isEven ? 100 : -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className={`${isEven ? 'lg:pl-8' : 'lg:pr-8'}`}>
              <div className={`h-1 w-16 mb-6 bg-gradient-to-r ${image.accent}`} />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {image.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                {image.description}
              </p>

              <div className="flex items-center space-x-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${image.accent} rounded-full flex items-center justify-center`}>
                  <Camera className="w-6 h-6 text-white" />
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

      {/* Scroll Fade Line */}
      {index < 6 && (
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-gray-300 to-transparent"
          style={{ opacity }}
        />
      )}
    </div>
  );
};

export default ImageSection;
