"use client";

import React, { useState } from 'react';
import { AuthLayout } from '@kindercare/ui';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim()) {
      setErrorMessage('Vui lòng điền địa chỉ email của bạn.');
      return;
    }

    // Kiểm tra định dạng email cơ bản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Địa chỉ email không đúng định dạng. Vui lòng kiểm tra lại.');
      return;
    }

    setIsLoading(true);

    // Giả lập gửi liên kết đặt lại mật khẩu qua email
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(
        'Yêu cầu thành công! Chúng tôi đã gửi liên kết khôi phục mật khẩu đến hộp thư của bạn. Vui lòng kiểm tra email.'
      );
      setEmail('');
    }, 1500);
  };

  return (
    <AuthLayout>
      <div className="w-full space-y-6">

        {/* Tiêu đề & Hướng dẫn */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Khôi phục mật khẩu
          </h1>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Nhập email tài khoản của bạn dưới đây. Chúng tôi sẽ gửi liên kết xác nhận để bạn thiết lập lại mật khẩu mới.
          </p>
        </div>

        {/* Biểu mẫu khôi phục */}
        <form onSubmit={handleRecoverySubmit} className="space-y-4">

          {/* Thông báo lỗi nếu có */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              {errorMessage}
            </div>
          )}

          {/* Thông báo thành công nếu có */}
          {successMessage && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200 leading-relaxed">
              <svg className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Ô nhập Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              Email đã đăng ký
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kindercare.edu.vn"
                disabled={isLoading}
                className="w-full text-sm py-3 pl-11 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0E793C] focus:ring-4 focus:ring-[#0E793C]/10 transition-all duration-300 bg-white disabled:opacity-50"
              />
              {/* Icon Email bên trái */}
              <div className="absolute left-4 top-[14px] text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Nút gửi yêu cầu */}
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
                Đang gửi yêu cầu...
              </div>
            ) : (
              'Gửi mã xác nhận'
            )}
          </button>
        </form>

        {/* Nút quay lại đăng nhập */}
        <div className="pt-2 text-center">
          <a
            href="/login"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0E793C] transition-colors py-2 px-4 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Quay lại Đăng nhập
          </a>
        </div>

      </div>
    </AuthLayout>
  );
}
