import React from "react";
import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Priya Shah",
    role: "Fashion Influencer",
    text: "Partnering with Absolutely Desi has transformed my business. The quality and authenticity of their collection is unmatched, and their support has been exceptional.",
    image: "/testimonial1.jpg"
  },
  {
    name: "Rahul Mehta",
    role: "Boutique Owner",
    text: "The affiliate program is straightforward and profitable. My customers love the exclusive designs and I appreciate the prompt delivery and professional service.",
    image: "/testimonial2.jpg"
  },
  {
    name: "Anjali Kapoor",
    role: "Style Consultant",
    text: "The catalog is extensive and the support team is always helpful. Best decision for my styling business - my clients are consistently impressed with the quality.",
    image: "/testimonial3.jpg"
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block mb-4 text-tan text-sm font-medium uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-tan">
            Success Stories
          </h2>
          <p className="text-gray-300">
            Hear from our affiliates who have built successful businesses with Absolutely Desi
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-gray-900 p-8 border border-tan/20 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-5 left-8 bg-tan text-black p-2 rounded-full">
                <Quote size={20} />
              </div>
              
              <div className="mb-8">
                <p className="text-gray-300 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
              
              <div className="flex items-center">
                {testimonial.image ? (
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-tan/20 text-tan rounded-full flex items-center justify-center mr-4">
                    <span className="font-serif text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-serif text-tan text-lg">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};