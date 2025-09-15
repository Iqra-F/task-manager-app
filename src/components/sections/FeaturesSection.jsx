import React from 'react';
import FeatureCard from '../cards/FeatureCard';

export default function FeaturesSection({ features, isDark }) {
  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Modern Teams
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Everything you need to stay organized, collaborate effectively, and boost productivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}
