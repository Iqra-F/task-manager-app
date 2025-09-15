import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <Header isDark={isDark} setIsDark={setIsDark} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>{children({ isDark })}</main>
      <Footer isDark={isDark} />
    </div>
  );
}
