import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialCard({ testimonial, isDark }) {
  return (
    <div className={`p-8 rounded-2xl transition-all duration-500 hover:scale-105 ${isDark ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} hover:shadow-2xl`}>
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold mr-4">
          {testimonial.avatar}
        </div>
        <div>
          <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {testimonial.role} at {testimonial.company}
          </div>
        </div>
      </div>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed italic`}>
        "{testimonial.content}"
      </p>
      <div className="flex items-center mt-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>
    </div>
  );
}
