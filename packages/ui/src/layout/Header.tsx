import React, { useState } from 'react';

interface NotificationItem {
  id: string;
  title: string;
  time: string;
  isUnread: boolean;
  type: 'attendance' | 'medical' | 'message';
}

interface HeaderProps {
  pageTitle?: string;
  role?: 'admin' | 'principal' | 'teacher' | 'parent';
  notificationsCount?: number;
}

export default function Header({
  pageTitle = 'Quản lý điểm danh',
  role = 'teacher',
  notificationsCount = 2
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [locale, setLocale] = useState<'vi' | 'en'>('vi');

  const notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'Bé Nguyễn An đã được cô Lan điểm danh vào lớp.',
      time: '07:45 AM',
      isUnread: true,
      type: 'attendance'
    },
    {
      id: '2',
      title: 'Phụ huynh bé Tuấn Kiệt gửi tin nhắn xin phép nghỉ học.',
      time: '07:15 AM',
      isUnread: true,
      type: 'message'
    },
    {
      id: '3',
      title: 'Nhập chỉ số sức khỏe định kỳ cho Khối Chồi.',
      time: 'Hôm qua',
      isUnread: false,
      type: 'medical'
    }
  ];

  const currentDateString = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date().toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', options);
  };

  return (
    <header className="h-[70px] bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40 select-none w-full">
      {/* Page Title & Context */}
      <div className="flex flex-col">
        <h1 className="text-lg font-bold text-slate-800 leading-snug">{pageTitle}</h1>
        <span className="text-[11px] text-slate-400 font-medium">
          {currentDateString()}
        </span>
      </div>

      {/* Action Controls & Utilities */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative w-[240px] md:block hidden">
          <input
            type="text"
            placeholder="Tìm kiếm nhanh..."
            className="w-full text-xs py-2 pl-9 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0E793C] focus:ring-2 focus:ring-[#0E793C]/10 transition-all duration-300"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        {/* Language Selection */}
        <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200/50">
          <button
            onClick={() => setLocale('vi')}
            className={`text-[10px] font-bold px-2 py-1 rounded-md transition-all ${locale === 'vi' ? 'bg-[#0E793C] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            VI
          </button>
          <button
            onClick={() => setLocale('en')}
            className={`text-[10px] font-bold px-2 py-1 rounded-md transition-all ${locale === 'en' ? 'bg-[#0E793C] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            EN
          </button>
        </div>

        {/* Notification Center */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all duration-300 relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {notificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 bg-red-500 text-white text-[9px] font-extrabold flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                {notificationsCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">Thông báo mới nhất</span>
                <button className="text-[10px] text-[#0E793C] font-bold hover:underline">Đánh dấu tất cả đã đọc</button>
              </div>
              <div className="max-h-[300px] overflow-y-auto py-1">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`px-4 py-3 flex gap-3 hover:bg-slate-50 transition-all cursor-pointer border-b border-slate-50 last:border-0 ${item.isUnread ? 'bg-[#0E793C]/5' : ''
                      }`}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-slate-100 text-[#0E793C]">
                      {item.type === 'attendance' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      )}
                      {item.type === 'message' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                      )}
                      {item.type === 'medical' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-slate-700 leading-normal font-medium">{item.title}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 pt-2 border-t border-slate-100 text-center">
                <button className="text-xs text-[#0E793C] font-bold hover:underline w-full">Xem tất cả</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Control */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 hover:bg-slate-50 p-1.5 rounded-xl transition-all duration-300 border border-transparent hover:border-slate-100"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0E793C] text-white flex items-center justify-center font-bold text-xs shadow-md">
              {role === 'teacher' ? 'ML' : 'HT'}
            </div>
            <svg className={`w-4 h-4 text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {/* Profile Menu Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="px-4 py-2 border-b border-slate-100 flex flex-col">
                <span className="text-xs font-bold text-slate-800">
                  {role === 'teacher' ? 'Cô Mai Lan' : 'Thầy Minh Trí'}
                </span>
                <span className="text-[10px] text-slate-400">
                  {role === 'teacher' ? 'Lớp Chồi 1' : 'Phòng Hiệu Trưởng'}
                </span>
              </div>
              <button className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Hồ sơ của tôi
              </button>
              <button className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Cài đặt tài khoản
              </button>
              <div className="border-t border-slate-100 mt-1 pt-1">
                <button className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-bold">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
