"use client"
import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  title: string;
  content: string;
  author: string;
  rating?: number;
  index: number;
}

function TestimonialCard({ title, content, author, rating = 5, index }: TestimonialCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Stagger the animation based on index
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 150);
    
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div 
      className={`bg-white p-6 rounded-xl shadow-lg relative overflow-hidden transform transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {/* Decorative elements */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full opacity-30" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-100 rounded-full opacity-20" />
      
      {/* Quote icon */}
      <div className="relative z-10">
        <div className="text-blue-500 mb-4">
          <Quote size={32} className="text-blue-400 opacity-80" />
        </div>
        
        {/* Content */}
        <h3 className="font-bold text-lg mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-700 mb-6 leading-relaxed relative z-10">{content}</p>
        
        {/* Rating stars */}
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={`${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} mr-1`} 
            />
          ))}
        </div>
        
        {/* Author section */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
            {author.charAt(0)}
          </div>
          <p className="font-bold text-gray-800 ml-3">{author}</p>
        </div>
      </div>
    </div>
  );
}

export default function CustomerTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    {
      title: "Doorstep Delivery Convenience",
      content: "The ability to order from anywhere, anytime with Dua Pharmacy's doorstep delivery has been a game-changer for managing my medications. Their service is reliable and always on time!",
      author: "Subhash Sehgal",
      rating: 5
    },
    {
      title: "Timely & Cost-Effective",
      content: "Not only did I receive all my medications right on schedule, but the prices were significantly lower than what I've been paying elsewhere. Dua Pharmacy has earned my loyalty!",
      author: "Sumit Kumar",
      rating: 5
    },
    {
      title: "Genuinely Affordable Healthcare",
      content: "As someone on a fixed income, finding Dua Pharmacy has been a blessing. Their medicines are truly affordable compared to local options, without compromising on quality or service.",
      author: "Rachin",
      rating: 4
    }
  ];

  // Auto-rotate testimonials on larger screens
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="bg-blue-200 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section with decorative elements */}
        <div className="text-center mb-12 relative">
          <div className="inline-block">
            <span className="block h-1 w-12 bg-blue-500 mb-2 mx-auto"></span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Customer Stories</h2>
            <span className="block h-1 w-24 bg-blue-500 mt-2 mx-auto"></span>
          </div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            See what our customers have to say about their experience with Dua Pharmacy
          </p>
        </div>
        
        {/* Mobile view: Vertical stacked cards */}
        <div className="block md:hidden">
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                index={index}
                title={testimonial.title}
                content={testimonial.content}
                author={testimonial.author}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
        
        {/* Desktop view: Grid layout with hover effects */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                index={index}
                title={testimonial.title}
                content={testimonial.content}
                author={testimonial.author}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
        
        {/* Indicator dots */}
        <div className="flex justify-center mt-8 md:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 w-2 mx-1 rounded-full ${
                activeIndex === index ? "bg-blue-500" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}