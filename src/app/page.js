'use client'
import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import PlatformSection from '../components/sections/PlatformSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTASection from '../components/sections/CTASection';
import { Zap, Users, Shield, Target } from 'lucide-react';

export default function TaskManagerHomepage() {
  const features = [
    { icon: <Zap className="w-8 h-8" />, title: "Lightning Fast", description: "Real-time updates across all your devices with instant synchronization", color: "from-yellow-400 to-orange-500" },
    { icon: <Users className="w-8 h-8" />, title: "Team Collaboration", description: "Work together seamlessly with live presence indicators and shared workspaces", color: "from-blue-400 to-purple-500" },
    { icon: <Shield className="w-8 h-8" />, title: "Secure & Private", description: "Enterprise-grade security with JWT authentication and encrypted data", color: "from-green-400 to-teal-500" },
    { icon: <Target className="w-8 h-8" />, title: "Smart Organization", description: "Advanced filtering, sorting, and search to find exactly what you need", color: "from-purple-400 to-pink-500" }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "2M+", label: "Tasks Completed" },
    { number: "24/7", label: "Support" }
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "Product Manager", company: "TechFlow", content: "TaskFlow transformed how our team collaborates. The real-time updates are game-changing!", avatar: "SC" },
    { name: "Marcus Rodriguez", role: "Startup Founder", company: "InnovateLab", content: "The most intuitive task manager I've ever used. My productivity increased by 40%.", avatar: "MR" },
    { name: "Emily Watson", role: "Design Lead", company: "Creative Studio", content: "Beautiful interface, powerful features. It's everything we needed in one place.", avatar: "EW" }
  ];

  return (
    <Layout>
      {({ isDark }) => (
        <>
          <HeroSection stats={stats} isDark={isDark} />
          <FeaturesSection features={features} isDark={isDark} />
          <PlatformSection isDark={isDark} />
          <TestimonialsSection testimonials={testimonials} isDark={isDark} />
          <CTASection isDark={isDark} />
        </>
      )}
    </Layout>
  );
}
