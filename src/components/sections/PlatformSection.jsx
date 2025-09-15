import React from 'react';
import PlatformCard from '../cards/PlatformCard';
import { Globe, Smartphone, Laptop } from 'lucide-react';

export default function PlatformSection({ isDark }) {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Works Everywhere You Do
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Seamless experience across all your devices with real-time synchronization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <PlatformCard icon={Globe} title="Web" description="Full-featured web application" isDark={isDark} colorClass={isDark ? 'text-blue-400' : 'text-blue-500'} />
          <PlatformCard icon={Smartphone} title="Mobile" description="iOS & Android apps" isDark={isDark} colorClass={isDark ? 'text-green-400' : 'text-green-500'} />
          <PlatformCard icon={Laptop} title="Desktop" description="Windows, Mac & Linux" isDark={isDark} colorClass={isDark ? 'text-purple-400' : 'text-purple-500'} />
        </div>
      </div>
    </section>
  );
}
