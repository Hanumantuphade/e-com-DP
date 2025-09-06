import React from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../components/SectionTitle";

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Subhash Sehgal",
    quote:
      "The ability to order from anywhere, anytime with Dua Pharmacy's doorstep delivery has been a game-changer for managing my medications. Their service is reliable and always on time!",
    rating: 5,
  },
  {
    id: 2,
    name: "Anita Verma",
    quote:
      "I’ve been ordering my medicines from Dua Pharmacy for the past year, and I must say the convenience and speed of their service is unmatched. The app is easy to use, and deliveries are always prompt.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rohit Mehra",
    quote:
      "Dua Pharmacy has made managing my parents’ prescriptions so easy. I no longer have to rush to a pharmacy – everything comes to my doorstep on time with genuine medicines.",
    rating: 5,
  },
  {
    id: 4,
    name: "Pooja Sharma",
    quote:
      "The best thing about Dua Pharmacy is their reliability. Even during emergencies, they have delivered medicines quickly. Truly a lifesaver for my family!",
    rating: 5,
  },
  {
    id: 5,
    name: "Arvind Gupta",
    quote:
      "I really appreciate the professionalism of Dua Pharmacy. Their team is polite, delivery is fast, and medicines are always properly packed and authentic.",
    rating: 5,
  },
  {
    id: 6,
    name: "Sneha Kapoor",
    quote:
      "Dua Pharmacy is my go-to for all healthcare needs. Not only do they provide medicines, but also health essentials, and everything is just a click away.",
    rating: 5,
  },
  {
    id: 7,
    name: "Vikas Malhotra",
    quote:
      "Excellent service! Ordering repeat medicines is super simple with Dua Pharmacy’s app. They even remind me when it’s time to refill. Highly recommended!",
    rating: 5,
  },
  {
    id: 8,
    name: "Neha Bansal",
    quote:
      "I love how Dua Pharmacy ensures quality and affordability at the same time. Their doorstep delivery has saved me so much time and effort.",
    rating: 5,
  },
  {
    id: 9,
    name: "Rahul Khanna",
    quote:
      "Dua Pharmacy’s service is trustworthy and customer-friendly. The delivery staff are always courteous, and I never worry about getting the wrong medicine.",
    rating: 5,
  },
  {
    id: 10,
    name: "Kirti Jain",
    quote:
      "I’m impressed with Dua Pharmacy’s seamless service. Ordering medicines online was new for me, but their platform is so user-friendly that I’ve completely switched over.",
    rating: 5,
  },
];

const CustomerTestimonials = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 2, // desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 768, // mobile
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 480, // small mobile
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <motion.div className="flex justify-center sm:justify-start mb-3">
      {[...Array(5)].map((_, index) => (
        <motion.svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-4 h-4 sm:w-5 sm:h-5 ${
            index < rating ? "text-yellow-400" : "text-gray-400"
          }`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.971c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.971a1 1 0 00-.364-1.118L2.88 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
        </motion.svg>
      ))}
    </motion.div>
  );

  return (
    <section
      className="relative py-12 sm:py-16 lg:py-20 bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/a1.png')" }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <SectionTitle
          title="What Our Clients Say"
          subtitle="Testimonials"
          center
          light
        />

        <Slider {...settings} className="testimonial-slider">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="px-2 sm:px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-black/40 p-5 sm:p-7 rounded-xl backdrop-blur-md h-full text-center sm:text-left"
                >
                  <motion.h4
                    variants={childVariants}
                    className="text-lg sm:text-xl font-semibold mb-2 text-white"
                  >
                    {testimonial.name}
                  </motion.h4>
                  <StarRating rating={testimonial.rating} />
                  <motion.svg
                    variants={childVariants}
                    className="w-6 h-6 sm:w-8 sm:h-8 mx-auto sm:mx-0 text-primary-400/50 mb-2"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M10 8v6a6 6 0 01-6 6H4v4h4a10 10 0 0010-10V8h-8zm18 0v6a6 6 0 01-6 6h0v4h4a10 10 0 0010-10V8h-8z" />
                  </motion.svg>
                  <motion.p
                    variants={childVariants}
                    className="text-sm sm:text-base leading-relaxed text-gray-100"
                  >
                    {testimonial.quote}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
