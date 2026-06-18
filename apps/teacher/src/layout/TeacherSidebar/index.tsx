import React from 'react';
import * as S from './styles';
import { LayoutDashboard, Users, CheckSquare, Calendar, MessageSquare, Settings, HelpCircle, LogOut } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useAuth } from '@/contexts/AuthContext';

interface TeacherSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  
  const isDashboardActive = pathname === '/';
  const isAttendanceActive = pathname === '/attendance';

  return (
    <S.SidebarContainer $isOpen={isOpen}>
      <S.LogoContainer>
        {/* Placeholder for Logo */}
        <h2>KinderCare</h2>
        {onClose && (
          <S.CloseButton onClick={onClose} aria-label="Close sidebar">
            ✕
          </S.CloseButton>
        )}
      </S.LogoContainer>

      <S.NavList>
        <S.NavItem $active={isDashboardActive} onClick={() => router.push('/')}>
          <LayoutDashboard size={20} />
          Bảng điều khiển
        </S.NavItem>
        <S.NavItem>
          <Users size={20} />
          Danh sách lớp
        </S.NavItem>
        <S.NavItem $active={isAttendanceActive} onClick={() => router.push('/attendance')}>
          <CheckSquare size={20} />
          Điểm danh
        </S.NavItem>
        <S.NavItem $active={pathname === '/activities'} onClick={() => router.push('/activities')}>
          <Calendar size={20} />
          Hoạt động
        </S.NavItem>
        <S.NavItem>
          <MessageSquare size={20} />
          Liên lạc phụ huynh
        </S.NavItem>
        <S.NavItem>
          <Settings size={20} />
          Cài đặt
        </S.NavItem>
      </S.NavList>
      <S.BottomNav>
        <S.NavItem>
          <HelpCircle size={20} />
          Trợ giúp
        </S.NavItem>
        <S.NavItem onClick={logout}>
          <LogOut size={20} />
          Đăng xuất
        </S.NavItem>
      </S.BottomNav>
    </S.SidebarContainer>
  );
};
