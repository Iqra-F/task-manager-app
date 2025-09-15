import React from 'react';
import TestimonialCard from '../cards/TestimonialCard';
import { Star } from 'lucide-react';

export default function TestimonialsSection({ testimonials, isDark }) {
  return (
    <section id="testimonials" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Loved by{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <div className="flex justify-center items-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
            <span className={`ml-2 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>4.9/5 from 2,500+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}
