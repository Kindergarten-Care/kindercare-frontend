"use client";

import React, { useState } from 'react';
import { AuthLayout } from '@kindercare/ui';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'principal' | 'teacher'>('admin');
  const [email, setEmail] = useState('admin@kindercare.edu.vn');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Hỗ trợ chọn vai trò qua thanh trượt (Cập nhật dữ liệu mẫu tương ứng)
  const handleRoleSelect = (role: 'teacher' | 'principal' | 'admin') => {
    setSelectedRole(role);
    setErrorMessage('');
    
    let targetEmail = '';
    let targetPassword = '';

    if (role === 'teacher') {
      targetEmail = 'giaovien@kindercare.edu.vn';
      targetPassword = 'giaovien123';
    } else if (role === 'principal') {
      targetEmail = 'hieuutruong@kindercare.edu.vn';
      targetPassword = 'hieutruong123';
    } else if (role === 'admin') {
      targetEmail = 'admin@kindercare.edu.vn';
      targetPassword = 'admin123';
    }

    setEmail(targetEmail);
    setPassword(targetPassword);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Vui lòng nhập Email hoặc tên đăng nhập.');
      return;
    }
    if (!password) {
      setErrorMessage('Vui lòng nhập mật khẩu.');
      return;
    }

    setIsLoading(true);

    // Giả lập gửi yêu cầu đăng nhập và so sánh vai trò với Database
    setTimeout(() => {
      setIsLoading(false);

      const dbUsers = {
        admin: { email: 'admin@kindercare.edu.vn', password: 'admin123', redirect: '/admin' },
        principal: { email: 'hieuutruong@kindercare.edu.vn', password: 'hieutruong123', redirect: '/principal' },
        teacher: { email: 'giaovien@kindercare.edu.vn', password: 'giaovien123', redirect: '/teacher' },
      };

      const matchedUser = dbUsers[selectedRole];

      // So sánh email và mật khẩu với vai trò đang được chọn
      if (email === matchedUser.email && password === matchedUser.password) {
        // Đăng nhập thành công và khớp vai trò -> chuyển hướng
        window.location.href = matchedUser.redirect;
      } else {
        // Kiểm tra xem thông tin đăng nhập nhập vào có thuộc về vai trò nào khác trong DB không
        let correctRoleName = '';
        if (email === dbUsers.admin.email && password === dbUsers.admin.password) {
          correctRoleName = 'IT Admin';
        } else if (email === dbUsers.principal.email && password === dbUsers.principal.password) {
          correctRoleName = 'Hiệu Trưởng';
        } else if (email === dbUsers.teacher.email && password === dbUsers.teacher.password) {
          correctRoleName = 'Giáo Viên';
        }

        if (correctRoleName) {
          setErrorMessage(`Tài khoản thuộc vai trò "${correctRoleName}", vui lòng chọn đúng vai trò trên thanh trượt để đăng nhập.`);
        } else {
          setErrorMessage('Tài khoản hoặc mật khẩu không chính xác.');
        }
      }
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="w-full space-y-6">

        {/* Tiêu đề & Lời Chào Mừng */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Chào mừng quay trở lại
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Hãy đăng nhập vào cổng thông tin hệ thống của KinderCare.
          </p>
        </div>

        {/* Biểu mẫu đăng nhập */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">

          {/* Thanh trượt chọn Role cao cấp */}
          <div className="relative flex bg-slate-100 p-1.5 rounded-full border border-slate-200/40 w-full select-none mb-6">
            {/* Sliding background pill */}
            <div 
              className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm transition-all duration-300 ease-out pointer-events-none"
              style={{
                width: 'calc(33.333% - 6px)',
                left: selectedRole === 'admin' 
                  ? '4px' 
                  : selectedRole === 'principal'
                  ? 'calc(33.333% + 2px)'
                  : 'calc(66.666% - 0px)'
              }}
            />
            
            {/* Tab 1: IT Admin */}
            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              className={`flex-1 relative z-10 text-center py-2.5 text-xs font-bold rounded-full transition-colors duration-300 cursor-pointer ${
                selectedRole === 'admin' ? 'text-[#0E793C]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              IT Admin
            </button>

            {/* Tab 2: Hiệu Trưởng */}
            <button
              type="button"
              onClick={() => handleRoleSelect('principal')}
              className={`flex-1 relative z-10 text-center py-2.5 text-xs font-bold rounded-full transition-colors duration-300 cursor-pointer ${
                selectedRole === 'principal' ? 'text-[#0E793C]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Hiệu Trưởng
            </button>

            {/* Tab 3: Giáo Viên */}
            <button
              type="button"
              onClick={() => handleRoleSelect('teacher')}
              className={`flex-1 relative z-10 text-center py-2.5 text-xs font-bold rounded-full transition-colors duration-300 cursor-pointer ${
                selectedRole === 'teacher' ? 'text-[#0E793C]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Giáo Viên
            </button>
          </div>

          {/* Thông báo lỗi nếu có */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              {errorMessage}
            </div>
          )}

          {/* Ô nhập Email/Tài khoản */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              Tài khoản / Email
            </label>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email hoặc mã nhân viên..."
                className="w-full text-sm py-3 pl-11 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0E793C] focus:ring-4 focus:ring-[#0E793C]/10 transition-all duration-300 bg-white"
              />
              <div className="absolute left-4 top-[14px] text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Ô nhập Mật khẩu */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Mật khẩu
              </label>
              <a
                href="/forgot-password"
                className="text-xs font-bold text-[#0E793C] hover:underline"
              >
                Quên mật khẩu?
              </a>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-sm py-3 pl-11 pr-11 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0E793C] focus:ring-4 focus:ring-[#0E793C]/10 transition-all duration-300 bg-white"
              />
              {/* Icon ổ khóa bên trái */}
              <div className="absolute left-4 top-[14px] text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              {/* Icon con mắt ẩn/hiện mật khẩu bên phải */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[14px] text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.558M2.93 2.93l18.14 18.14M15 15a3 3 0 01-4.243 0 3 3 0 010-4.243M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Checkbox Ghi nhớ đăng nhập */}
          <div className="flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-[#0E793C] border-slate-300 rounded focus:ring-[#0E793C]/20"
            />
            <label htmlFor="remember_me" className="ml-2.5 text-xs text-slate-600 font-bold cursor-pointer">
              Ghi nhớ đăng nhập
            </label>
          </div>

          {/* Nút Đăng nhập */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center py-3.5 px-4 bg-[#0E793C] hover:bg-[#0C6633] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#0E793C]/10 hover:shadow-xl hover:shadow-[#0E793C]/20 transition-all duration-300 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xác thực...
              </div>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>

      </div>
    </AuthLayout>
  );
}
