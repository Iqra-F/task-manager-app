import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Footer({ isDark }) {
  return (
    <footer className={`py-12 border-t ${isDark ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-gray-50/50'} backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            © 2025 TaskFlow. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
