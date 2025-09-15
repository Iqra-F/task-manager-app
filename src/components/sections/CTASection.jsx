import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTASection({ isDark }) {
  return (
    <section id='cta' className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`p-12 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ready to Transform Your{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Productivity?
            </span>
          </h2>
          <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of teams already using TaskFlow to achieve more together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 hover:shadow-2xl flex items-center">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No credit card required • 14-day free trial
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
