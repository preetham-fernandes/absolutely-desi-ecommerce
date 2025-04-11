// components/Testimonials.tsx
import React from "react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Priya Shah",
    role: "Fashion Influencer",
    text: "Partnering with Absolutely Desi has transformed my business. The quality and authenticity of their collection is unmatched.",
  },
  {
    name: "Rahul Mehta",
    role: "Boutique Owner",
    text: "The affiliate program is straightforward and profitable. My customers love the exclusive designs.",
  },
  {
    name: "Anjali Kapoor",
    role: "Style Consultant",
    text: "The catalog is extensive and the support team is always helpful. Best decision for my styling business.",
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Success Stories
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                <p className="text-maroon-600">{testimonial.role}</p>
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};