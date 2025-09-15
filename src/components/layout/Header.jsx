import React from 'react';
import { CheckCircle2, Moon, Sun, Menu, X } from 'lucide-react';

export default function Header({ isDark, setIsDark, isMenuOpen, setIsMenuOpen }) {
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-lg border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <span className={`text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}>
              TaskFlow
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className={`hover:text-purple-600 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Features</a>
            <a href="#testimonials" className={`hover:text-purple-600 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Reviews</a>
            <button className={`px-4 py-2 rounded-lg transition-colors ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}>
              Login
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 hover:shadow-lg">
              Get Started
            </button>

            {/* Dark Mode Toggle at the End */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition-all hover:scale-110 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden border-t ${isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} py-4`}>
            <div className="flex flex-col space-y-3 px-4">
              <a href="#features" className={`py-2 hover:text-purple-600 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Features</a>
              <a href="#testimonials" className={`py-2 hover:text-purple-600 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Reviews</a>
              <button className={`text-left py-2 hover:text-purple-600 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Login</button>
              <button className="text-left py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
