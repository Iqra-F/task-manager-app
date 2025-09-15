import React from 'react';

export default function PlatformCard({ icon: Icon, title, description, isDark, colorClass }) {
  return (
    <div className={`text-center p-8 rounded-2xl transition-all hover:scale-105 ${isDark ? 'bg-gray-800/30' : 'bg-white/30'} backdrop-blur-sm`}>
      <Icon className={`w-16 h-16 mx-auto mb-4 ${colorClass}`} />
      <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
    </div>
  );
}
