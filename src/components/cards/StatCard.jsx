import React from 'react';

export default function StatCard({ stat, isDark }) {
  return (
    <div className="text-center group cursor-pointer">
      <div className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform`}>
        {stat.number}
      </div>
      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide`}>
        {stat.label}
      </div>
    </div>
  );
}
