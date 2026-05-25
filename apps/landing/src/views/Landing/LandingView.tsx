"use client";

import React from 'react';
import HeroSection from './components/HeroSection';

export default function LandingView() {
  const handleLoginClick = () => {
    window.location.href = 'http://localhost:3005/login';
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Landing Page Sticky Navigation Bar */}
      <nav className="h-[75px] bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 flex items-center justify-between px-6 sm:px-12 w-full">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0E793C] rounded-xl flex items-center justify-center shadow-lg shadow-[#0E793C]/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-slate-800 tracking-wider uppercase leading-none">KinderCare</span>
            <span className="text-[9px] text-[#0E793C] font-extrabold tracking-widest uppercase">Smart Platform</span>
          </div>
        </div>

        {/* Navigation Menu (Desktop Only) */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm text-slate-600">
          <a href="#features" className="hover:text-[#0E793C] transition-colors">Tính năng</a>
          <a href="#stats" className="hover:text-[#0E793C] transition-colors">Số liệu</a>
          <a href="#testimonials" className="hover:text-[#0E793C] transition-colors">Khách hàng</a>
          <a href="#pricing" className="hover:text-[#0E793C] transition-colors">Bảng phí</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLoginClick}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Cổng Đăng Nhập
          </button>
          
          <button
            onClick={handleLoginClick}
            className="px-5 py-2.5 bg-[#7DD3FC] hover:bg-[#56c1f5] text-[#0F172A] text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            Đăng ký tư vấn
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1">
        <HeroSection />
        
        {/* Placeholder for future sections */}
        <section id="features" className="py-20 bg-white text-center">
          <div className="max-w-4xl mx-auto px-6 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-800">Tính năng đang trong quá trình phát triển</h2>
            <p className="text-slate-500 text-sm">Các mục FeaturesSection, StatisticsSection, Testimonials và Footer đang được triển khai theo đúng lộ trình thiết kế của KinderCare.</p>
          </div>
        </section>
      </main>
      
    </div>
  );
}
