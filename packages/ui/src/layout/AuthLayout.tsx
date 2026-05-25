import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

export default function AuthLayout({
    children,
    title = 'KinderCare Guardian System',
    subtitle = 'Hệ thống quản lý mầm non toàn diện, hiện đại và bảo mật'
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen w-full flex bg-[#F8FAFC] font-sans overflow-hidden select-none">

            {/* Cột Trái: Hình nền / Branding / Carousel Taglines (Chỉ hiện trên màn hình LG trở lên) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0E793C] via-[#0B5C2E] to-[#063319] text-white p-16 flex-col justify-between relative overflow-hidden">

                {/* Lớp phủ họa tiết trang trí hình tròn mờ ảo (Glassmorphic Decoration) */}
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[80px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-emerald-400/10 rounded-full blur-[100px]" />
                <div className="absolute top-[30%] right-[10%] w-[200px] h-[200px] bg-[#0E793C]/30 rounded-full blur-[50px] animate-pulse" />

                {/* Header Branding */}
                <div className="flex items-center gap-3 relative z-10">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#063319]/50">
                        <svg className="w-7 h-7 text-[#0E793C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black tracking-wider uppercase leading-none">KinderCare</span>
                        <span className="text-[10px] text-emerald-300 font-bold tracking-widest uppercase">Guardian System</span>
                    </div>
                </div>

                {/* Carousel / Hộp thoại chứa thông điệp nổi bật từ thiết kế Figma */}
                <div className="my-auto relative z-10 max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="space-y-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-emerald-300 border border-white/10 uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            Bảo mật 100%
                        </span>
                        <h2 className="text-4xl xl:text-5xl font-extrabold leading-[1.15] tracking-tight">
                            Nơi Ươm Mầm <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-100">
                                Tương Lai Cho Bé
                            </span>
                        </h2>
                        <p className="text-slate-200/80 text-base xl:text-lg leading-relaxed">
                            Môi trường giáo dục hạnh phúc, chăm sóc tận tâm và kết nối minh bạch giữa nhà trường với gia đình.
                        </p>
                    </div>

                    {/* Cards Hiển thị các tiêu chuẩn kỹ thuật (đọc từ IT Admin panel trong Figma) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:bg-white/10">
                            <span className="text-xs text-emerald-300 font-bold block mb-1">MÃ HÓA DỮ LIỆU</span>
                            <span className="text-sm font-bold text-white block">AES-256 Bit</span>
                            <span className="text-[10px] text-slate-300/70 mt-1 block">Bảo mật đa lớp end-to-end</span>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:bg-white/10">
                            <span className="text-xs text-emerald-300 font-bold block mb-1">UPTIME GIÁM SÁT</span>
                            <span className="text-sm font-bold text-white block">99.9% Uptime</span>
                            <span className="text-[10px] text-slate-300/70 mt-1 block">Đồng bộ đám mây thời gian thực</span>
                        </div>
                    </div>
                </div>

                {/* Footer Cột Trái */}
                <div className="flex items-center justify-between text-xs text-slate-300/60 relative z-10 border-t border-white/10 pt-6">
                    <span>© 2024 KinderCare Preschool.</span>
                    <div className="flex gap-4 font-medium">
                        <a href="#" className="hover:text-white transition-colors">Điều khoản</a>
                        <a href="#" className="hover:text-white transition-colors">Bảo mật</a>
                    </div>
                </div>
            </div>

            {/* Cột Phải: Nơi chứa Form xác thực (Children) - Đầy đủ responsive */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 relative">

                {/* Thêm logo nổi trên đầu khi xem ở màn hình Mobile/Tablet (khi cột trái bị ẩn) */}
                <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-[#0E793C] rounded-xl flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                    </div>
                    <span className="text-md font-extrabold text-[#0E793C] tracking-wide uppercase">KinderCare</span>
                </div>

                {/* Card chứa Form xác thực (Children) */}
                <div className="w-full max-w-[440px] flex flex-col justify-center animate-in fade-in zoom-in-95 duration-500">

                    {/* Vùng Render Form */}
                    {children}

                    {/* Copyright Mobile (chỉ hiện dưới chân khi xem trên Mobile) */}
                    <div className="lg:hidden mt-8 text-center text-[11px] text-slate-400 font-medium">
                        © 2024 KinderCare Preschool. Nurturing with love and technology.
                    </div>
                </div>
            </div>
        </div>
    );
}
