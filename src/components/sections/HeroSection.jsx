import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Play, Calendar, Users, BarChart3 } from 'lucide-react';

export default function HeroSection({ stats, isDark }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const todayTasks = ['Design homepage mockup', 'Review pull requests', 'Team standup meeting'];
  const teamAvatars = ['SC', 'MR', 'EW', 'JD'];

  return (
    <section className="pt-24 pb-16 relative overflow-hidden">
      {/* Animated background elements */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full border border-purple-200/20 mb-8">
            <Sparkles className="w-4 h-4 text-purple-500 mr-2" />
            <span className="text-sm font-medium text-purple-600">New: Real-time collaboration features</span>
          </div>

          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'} leading-tight`}>
            Manage Tasks Like a{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-pulse">
              Pro
            </span>
          </h1>

          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Experience the future of productivity with real-time collaboration, 
            intelligent organization, and seamless synchronization across all your devices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 hover:shadow-2xl flex items-center">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className={`group px-8 py-4 border-2 text-lg font-semibold rounded-xl transition-all transform hover:scale-105 flex items-center ${isDark ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform`}>
                  {stat.number}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating UI mockup */}
      <div className="mt-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-700 ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  taskflow.app/dashboard
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50/50'} backdrop-blur-sm`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Today's Tasks</h3>
                    <Calendar className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                  <div className="space-y-3">
                    {todayTasks.map((task, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded bg-gradient-to-r from-purple-400 to-pink-400"></div>
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50/50'} backdrop-blur-sm`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Team Activity</h3>
                    <Users className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex -space-x-2">
                    {teamAvatars.map((avatar, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-xs text-white font-semibold border-2 ${isDark ? 'border-gray-800' : 'border-white'}`}>
                        {avatar}
                      </div>
                    ))}
                    <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} font-semibold border-2 ${isDark ? 'border-gray-800' : 'border-white'}`}>
                      +5
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50/50'} backdrop-blur-sm`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Progress</h3>
                    <BarChart3 className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                  <div className="relative">
                    <div className={`h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} mb-2`}>
                      <div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 w-3/4"></div>
                    </div>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>75% Complete</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
