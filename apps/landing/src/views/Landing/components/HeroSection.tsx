"use client";

import React from 'react';

export default function HeroSection() {
  const handleRegisterClick = () => {
    // Chuyển hướng đến Cổng đăng nhập Portal chạy ở cổng 3005
    window.location.href = 'http://localhost:3005/login';
  };

  return (
    <section className="relative min-h-[calc(100vh-75px)] flex items-center justify-center overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-[#f0f9ff]/50 via-white to-slate-50">
      
      {/* Decorative Blur Spheres (Matching Figma specs) */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#FEFCE8] rounded-full blur-[100px] pointer-events-none mix-blend-multiply opacity-60" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] bg-[#ECFDF5] rounded-full blur-[120px] pointer-events-none mix-blend-multiply opacity-60" />
      <div className="absolute top-[30%] right-[10%] w-[200px] h-[200px] bg-[#7DD3FC]/10 rounded-full blur-[60px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Figma copy & action links */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
          
          {/* Welcome Badge (Figma styled) */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#FEFCE8] rounded-full text-xs font-bold text-slate-800 border border-[#FEF08A] uppercase tracking-wider shadow-sm">
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" className="shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.7 15.75L4.275 13.35L1.575 12.75L1.8375 9.975L0 7.875L1.8375 5.775L1.575 3L4.275 2.4L5.7 0L8.25 1.0875L10.8 0L12.225 2.4L14.925 3L14.6625 5.775L16.5 7.875L14.6625 9.975L14.925 12.75L12.225 13.35L10.8 15.75L8.25 14.6625L5.7 15.75ZM6.3375 13.8375L8.25 13.0125L10.2 13.8375L11.25 12.0375L13.3125 11.55L13.125 9.45L14.5125 7.875L13.125 6.2625L13.3125 4.1625L11.25 3.7125L10.1625 1.9125L8.25 2.7375L6.3 1.9125L5.25 3.7125L3.1875 4.1625L3.375 6.2625L1.9875 7.875L3.375 9.45L3.1875 11.5875L5.25 12.0375L6.3375 13.8375ZM7.4625 10.5375L11.7 6.3L10.65 5.2125L7.4625 8.4L5.85 6.825L4.8 7.875L7.4625 10.5375Z" fill="#EAB308"/>
            </svg>
            Môi trường giáo dục mầm non hạnh phúc
          </div>

          {/* Heading 1 Slogans (Figma styled with blue gradient highlight) */}
          <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.08] tracking-tight">
            Nơi Ươm Mầm <br />
            <span className="text-[#0E793C] relative inline-block">
              Tương Lai
              <span className="absolute left-0 bottom-1 w-full h-3 bg-emerald-100/70 -z-10 rounded" />
            </span>
          </h1>

          {/* Subtext description (Figma styled) */}
          <p className="text-[#475569] text-base sm:text-lg xl:text-xl leading-relaxed max-w-xl">
            Phát triển toàn diện. Chăm sóc tận tâm. Kết nối minh bạch. Khởi đầu hoàn hảo cho hành trình khám phá thế giới của bé yêu.
          </p>

          {/* Action CTAs (Figma styled) */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
            <button
              onClick={handleRegisterClick}
              className="px-8 py-4 bg-[#7DD3FC] hover:bg-[#56c1f5] text-[#0F172A] text-sm font-bold rounded-full shadow-lg shadow-[#7DD3FC]/20 hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              Đăng ký tham quan trường
            </button>
            
            <a
              href="#features"
              className="px-8 py-4 bg-white hover:bg-slate-50 text-[#0F172A] text-sm font-bold rounded-full shadow-md border border-slate-200 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Tìm hiểu thêm
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.1458 7.5H0V5.83333H10.1458L5.475 1.16667L6.66667 0L13.3333 6.66667L6.66667 13.3333L5.475 12.1667L10.1458 7.5Z" fill="#0F172A"/>
              </svg>
            </a>
          </div>

        </div>

        {/* Right Column: Hero Graphic Banner (Figma styled with Bento card layouts) */}
        <div className="lg:col-span-5 relative flex justify-center items-center select-none animate-in fade-in zoom-in-95 duration-1000 delay-200">
          
          <div className="relative w-full max-w-[460px] aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-100 shadow-[#7DD3FC]/10">
            <img 
              src="/images/hero-banner.png" 
              alt="Trẻ em mầm non đang vui chơi ngoài trời trong không gian xanh mát" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Floating Figma Accent Badge 1 */}
          <div className="absolute top-[8%] left-[-5%] sm:left-[-10%] bg-white/95 backdrop-blur-sm border border-slate-100 rounded-2xl p-4 shadow-xl flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-100 text-[#0E793C] rounded-xl flex items-center justify-center font-bold text-xs shrink-0">
              🌻
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Không gian</span>
              <span className="text-xs font-bold text-slate-800">Xanh mát & hiện đại</span>
            </div>
          </div>

          {/* Floating Figma Accent Badge 2 */}
          <div className="absolute bottom-[8%] right-[-5%] sm:right-[-10%] bg-white/95 backdrop-blur-sm border border-slate-100 rounded-2xl p-4 shadow-xl flex items-center gap-3">
            <div className="w-9 h-9 bg-[#7DD3FC]/20 text-[#0F172A] rounded-xl flex items-center justify-center font-bold text-xs shrink-0">
              🤝
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Kết nối</span>
              <span className="text-xs font-bold text-slate-800">Gia đình & Nhà trường</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
