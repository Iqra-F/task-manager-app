import React from 'react';

export default function FeatureCard({ feature, isDark }) {
  return (
    <div 
      className={`group p-8 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer ${isDark ? 'bg-gray-800/50 hover:bg-gray-800/70' : 'bg-white hover:bg-gray-50'} backdrop-blur-sm border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} hover:shadow-2xl`}
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white`}>
        {feature.icon}
      </div>
      <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {feature.title}
      </h3>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
        {feature.description}
      </p>
    </div>
  );
}
