"use client"

import Image from "next/image";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 text-center rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-center mb-4">
        <Image src={icon} alt={title} width={48} height={48} />
      </div>
      <h3 className="text-lg font-medium mb-2 text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default function ServiceFeatures() {
  const features = [
    {
      icon: "/med-icon.png",
      title: "Order Medicine",
      description: "Genuine Medicine, Maximum Discount Free Delivery at your door step"
    },
    {
      icon: "/pres.png",
      title: "Order by Prescription",
      description: "Submit Your Prescription and Get Your Medicines at Home"
    },
    {
      icon: "/reorder.png",
      title: "Reorder Medicine",
      description: "Maximum Discount Free Delivery at your door step"
    },
    {
      icon: "/cat.png",
      title: "Shop by Category",
      description: "Genuine Products, Low Price, Timely Delivery of Household Supplies."
    }
  ];

  return (
    <div className="bg-red-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}