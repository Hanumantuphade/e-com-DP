"use client"

interface TestimonialCardProps {
    title: string;
    content: string;
    author: string;
  }
  
  function TestimonialCard({ title, content, author }: TestimonialCardProps) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm relative hover:shadow-md transition-shadow">
        <div className="text-6xl text-gray-200 absolute top-0 left-0 opacity-20 leading-none">"</div>
        <h3 className="font-bold mb-3 text-gray-800 relative">{title}</h3>
        <p className="text-gray-700 mb-4">{content}</p>
        <p className="font-bold text-gray-800">- {author}</p>
      </div>
    );
  }
  
  export default function CustomerTestimonials() {
    const testimonials = [
      {
        title: "Provides doorstep delivery",
        content: "Can order from anywhere and any time since Dua Pharmacy provides doorstep delivery. Highly recommended!",
        author: "Subhash Sehgal"
      },
      {
        title: "Got all my meds on time",
        content: "Got all my meds on time and at such a lower cost! Love this brand and will definitely order again!",
        author: "Sumit Kumar"
      },
      {
        title: "Truly Affordable",
        content: "Affordable medicines on this app. Dua Pharmacy is trustworthy and truly affordable compared to local pharmacies.",
        author: "Rachin"
      }
    ];
  
    return (
      <div className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">What our customers have to say</h2>
            <p className="text-gray-600">Customer Testimonials from satisfied Dua Pharmacy users</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                title={testimonial.title}
                content={testimonial.content}
                author={testimonial.author}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }