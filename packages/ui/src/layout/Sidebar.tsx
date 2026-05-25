import React, { useState } from 'react';

interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    path: string;
    badge?: string;
}

interface SidebarProps {
    currentPath?: string;
    role?: 'admin' | 'principal' | 'teacher' | 'parent';
    onNavigate?: (path: string) => void;
}

export default function Sidebar({
    currentPath = '/dashboard',
    role = 'teacher',
    onNavigate
}: SidebarProps) {
    const [activeItem, setActiveItem] = useState(currentPath);

    const getRoleLabel = () => {
        switch (role) {
            case 'admin': return 'IT Admin';
            case 'principal': return 'Hiệu Trưởng';
            case 'teacher': return 'Giáo Viên';
            case 'parent': return 'Phụ Huynh';
            default: return 'Thành Viên';
        }
    };

    const menuItems: SidebarItem[] = [
        {
            id: 'dashboard',
            label: 'Tổng quan',
            path: '/dashboard',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                </svg>
            )
        },
        {
            id: 'classes',
            label: 'Quản lý lớp học',
            path: '/classes',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            id: 'attendance',
            label: 'Điểm danh',
            badge: 'Bé đã đến',
            path: '/attendance',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002-2h2a2 2 0 002-2" />
                </svg>
            )
        },
        {
            id: 'health',
            label: 'Y tế & Sức khỏe',
            path: '/health',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            )
        },
        {
            id: 'journal',
            label: 'Nhật ký sinh hoạt',
            path: '/journal',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        {
            id: 'billing',
            label: 'Học phí & Hóa đơn',
            path: '/billing',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            id: 'messages',
            label: 'Tin nhắn phụ huynh',
            path: '/messages',
            badge: '3',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            )
        }
    ];

    const handleItemClick = (path: string) => {
        setActiveItem(path);
        if (onNavigate) {
            onNavigate(path);
        }
    };

    return (
        <div className="w-[260px] h-screen bg-[#0E793C] flex flex-col text-white shadow-2xl relative select-none">
            {/* Brand & Logo Section */}
            <div className="h-[70px] border-b border-white/10 flex items-center px-6 gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-[#0E793C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-extrabold tracking-wide uppercase leading-tight">KinderCare</span>
                    <span className="text-[10px] text-white/70 font-semibold tracking-widest uppercase">Preschool</span>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-6 px-4 overflow-y-auto space-y-1 scrollbar-thin">
                <span className="px-3 text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-3">Menu Chính</span>

                {menuItems.map((item) => {
                    const isActive = activeItem === item.path;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item.path)}
                            className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-300 ${isActive
                                ? 'bg-white text-[#0E793C] font-bold shadow-lg scale-[1.02]'
                                : 'hover:bg-white/10 text-white/90 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={isActive ? 'text-[#0E793C]' : 'text-white/80'}>
                                    {item.icon}
                                </span>
                                <span className="text-sm font-medium">{item.label}</span>
                            </div>
                            {item.badge && (
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${isActive ? 'bg-[#0E793C] text-white' : 'bg-red-500 text-white'
                                    }`}>
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* User Information & Settings */}
            <div className="p-4 border-t border-white/10 bg-black/10 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center font-bold text-sm shadow-inner relative overflow-hidden">
                        {role === 'teacher' ? 'ML' : 'HT'}
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border border-[#0E793C] rounded-full"></div>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-xs font-bold truncate">
                            {role === 'teacher' ? 'Cô Mai Lan' : 'Thầy Minh Trí'}
                        </span>
                        <span className="text-[10px] text-white/60 font-semibold tracking-wider">
                            {getRoleLabel()}
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => console.log('Logout')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white/10 hover:bg-red-600/20 hover:text-red-200 border border-white/10 transition-all duration-300 text-xs font-bold"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}
