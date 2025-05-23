"use client"
import React, { useState, useEffect } from 'react';
import { Pill, FileText, RotateCcw, Grid3x3, Shield, Star, Heart, Zap } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  shadowColor: string;
  delay: number;
}

function FeatureCard({ icon, title, description, gradient, shadowColor, delay }: FeatureCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`box-border transform transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`box-border relative group cursor-pointer transform transition-all duration-100 h-full ${
        isHovered ? '-translate-y-2 scale-105' : 'translate-y-0 scale-100'
      }`}>
        {/* Animated glow effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500`}></div>
        
        {/* Main card with flexible height */}
        <div className={`box-border relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 lg:p-8 ${shadowColor} border border-white/50 backdrop-blur-sm overflow-hidden h-full flex flex-col`}>
          {/* Floating orbs background */}
          <div className="absolute top-0 right-0 w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full blur-xl"></div>
          
          {/* Icon section with consistent sizing */}
          <div className="relative mb-4 lg:mb-6 flex justify-center flex-shrink-0">
            <div className={`relative p-4 lg:p-6 rounded-2xl bg-gradient-to-r ${gradient} transform transition-all duration-500 ${
              isHovered ? 'rotate-6 scale-110' : 'rotate-0 scale-100'
            } shadow-xl`}>
              {/* Icon glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-md opacity-50`}></div>
              <div className="relative text-white">
                {icon}
              </div>
              {/* Sparkle effects */}
              <Star className={`absolute -top-2 -right-2 w-4 h-4 lg:w-5 lg:h-5 text-yellow-300 transition-all duration-300 ${
                isHovered ? 'opacity-100 animate-spin' : 'opacity-0'
              }`} />
              <Zap className={`absolute -bottom-1 -left-1 w-3 h-3 lg:w-4 lg:h-4 text-yellow-300 transition-all duration-500 delay-100 ${
                isHovered ? 'opacity-100 animate-pulse' : 'opacity-0'
              }`} />
            </div>
          </div>
          
          {/* Content with flexible growth */}
          <div className="text-center space-y-3 lg:space-y-4 relative z-10 flex-grow flex flex-col justify-center">
            <h3 className={`text-lg lg:text-xl font-bold transition-all duration-300 ${
              isHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600' : 'text-gray-800'
            }`}>
              {title}
            </h3>
            <p className="text-sm lg:text-base text-gray-600 leading-relaxed flex-grow">
              {description}
            </p>
          </div>
          
          {/* Bottom accent with pulse */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} transform transition-all duration-500 ${
            isHovered ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-50'
          }`}></div>
          
          {/* Animated corner elements */}
          <div className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-r ${gradient} rounded-full transition-all duration-300 ${
            isHovered ? 'opacity-100 animate-ping' : 'opacity-0'
          }`}></div>
        </div>
      </div>
    </div>
  );
}

export default function ServiceFeatures() {
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTitleVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Pill className="w-8 h-8 lg:w-10 lg:h-10" />,
      title: "Order Medicine",
      description: "Genuine medicines with maximum discount and free delivery straight to your doorstep. Quality assured, prices that care for your wallet.",
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      shadowColor: "shadow-2xl shadow-blue-500/25",
      delay: 200
    },
    {
      icon: <FileText className="w-8 h-8 lg:w-10 lg:h-10" />,
      title: "Order by Prescription",
      description: "Upload your prescription securely and get authentic medicines delivered with complete professional care.",
      gradient: "from-emerald-500 via-teal-500 to-green-600",
      shadowColor: "shadow-2xl shadow-emerald-500/25",
      delay: 350
    },
    {
      icon: <RotateCcw className="w-8 h-8 lg:w-10 lg:h-10" />,
      title: "Reorder Medicine Easily",
      description: "Smart reordering from your history with automatic discounts and priority delivery for your regular medications.",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      shadowColor: "shadow-2xl shadow-orange-500/25",
      delay: 500
    },
    {
      icon: <Grid3x3 className="w-8 h-8 lg:w-10 lg:h-10" />,
      title: "Shop by Category",
      description: "Explore curated healthcare products and essentials with guaranteed authenticity and lightning-fast delivery.",
      gradient: "from-purple-500 via-violet-500 to-indigo-500",
      shadowColor: "shadow-2xl shadow-purple-500/25",
      delay: 650
    }
  ];

  return (
    <section className="box-border relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 lg:py-20 overflow-hidden">
      {/* Dynamic background elements - responsive sizing */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 lg:w-80 lg:h-80 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-36 h-36 lg:w-48 lg:h-48 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Floating geometric shapes - responsive sizing */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 lg:w-6 lg:h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg rotate-45 animate-float opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-float delay-1000 opacity-30"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg animate-float delay-2000 opacity-25"></div>
      </div>

      <div className="box-border relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className={`text-center mb-12 lg:mb-20 transform transition-all duration-1000 ease-out ${
          titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full px-4 py-2 lg:px-6 lg:py-3 mb-6 lg:mb-8 border border-white/20">
            <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 mr-2" />
            <span className="text-sm lg:text-base text-blue-700 font-semibold">Trusted Healthcare Platform</span>
            <Heart className="w-4 h-4 lg:w-5 lg:h-5 text-red-500 ml-2 animate-pulse" />
          </div>
          
          {/* Main title - responsive sizing */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 lg:mb-6 leading-tight">
            <span className="text-gray-800">Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-gradient">
              Premium
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600">
              Services
            </span>
          </h2>
          
          <p className="text-base lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium px-4">
            Experience healthcare reimagined with cutting-edge technology, uncompromising quality, 
            and personalized care that puts your well-being first.
          </p>
        </div>

        {/* Features grid with equal height cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              shadowColor={feature.shadowColor}
              delay={feature.delay}
            />
          ))}
        </div>

        {/* Stats section with responsive grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto transform transition-all duration-1000 delay-800 ${
          titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}>
          {[
            { number: "500K+", label: "Happy Customers", icon: <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-red-500" /> },
            { number: "24/7", label: "Support Available", icon: <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-green-500" /> },
            { number: "100%", label: "Delivery Success", icon: <Star className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-500" /> }
          ].map((stat, index) => (
            <div key={index} className="box-border text-center bg-white/40 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-white/30">
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
              <div className="text-sm lg:text-base text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
