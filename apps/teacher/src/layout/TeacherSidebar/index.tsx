import React from 'react';
import * as S from './styles';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  Users,
  Contact,
  BookOpen,
  Heart,
  Star,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useAuth } from '@/contexts/AuthContext';

interface TeacherSidebarProps {
  isOpen?: boolean;
  isCollapsed?: boolean;
  onClose?: () => void;
  onToggleCollapse?: () => void;
}

export const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ 
  isOpen, 
  isCollapsed, 
  onClose,
  onToggleCollapse 
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  
  const isDashboardActive = pathname === '/';
  const isStudentsActive = pathname === '/students';
  const isAttendanceActive = pathname === '/attendance';
  const isScheduleActive = pathname === '/schedule';
  const isProfileActive = pathname === '/profile';

  // Extract user initials
  const getInitials = (name?: string) => {
    if (!name) return 'GV';
    const parts = name.trim().split(' ');
    return parts[parts.length - 1].charAt(0).toUpperCase();
  };

  return (
    <S.SidebarContainer $isOpen={isOpen} $isCollapsed={isCollapsed}>
      {/* COLLAPSE BUTTON */}
      {onToggleCollapse && (
        <S.CollapseBtn $isCollapsed={isCollapsed} onClick={onToggleCollapse} title="Thu gọn">
          <ChevronLeft size={16} strokeWidth={2.4} />
        </S.CollapseBtn>
      )}

      {/* LOGO */}
      <S.LogoContainer $isCollapsed={isCollapsed}>
        <S.LogoBlock>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#005A36" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        </S.LogoBlock>
        <S.FullOnly $isCollapsed={isCollapsed}>
          <S.LogoTitle>KINDER CARE</S.LogoTitle>
          <S.LogoSub>QUẢN LÝ GIÁO VIÊN</S.LogoSub>
        </S.FullOnly>
      </S.LogoContainer>

      {/* CLASS SELECTOR */}
      <S.ProfileCard $isCollapsed={isCollapsed}>
        <S.ProfileAvatar>M1</S.ProfileAvatar>
        <S.FullOnly $isCollapsed={isCollapsed}>
          <S.ProfileName>Lớp Mầm 1</S.ProfileName>
          <S.ProfileDesc>42 học sinh</S.ProfileDesc>
        </S.FullOnly>
        {!isCollapsed && (
          <ChevronRight size={16} color="#9CA3AF" style={{ marginLeft: 'auto' }} />
        )}
      </S.ProfileCard>

      {/* NAVIGATION */}
      <S.NavSection>
        <S.SectTitle $isCollapsed={isCollapsed}>HÔM NAY</S.SectTitle>
        <S.NavItem $active={isDashboardActive} $isCollapsed={isCollapsed} onClick={() => router.push('/')}>
          {isDashboardActive && <S.ActiveBar $isCollapsed={isCollapsed} />}
          <S.NavIcon><LayoutDashboard size={20} strokeWidth={1.9} /></S.NavIcon>
          <S.NavLabel $isCollapsed={isCollapsed}>Tổng quan</S.NavLabel>
        </S.NavItem>
        <S.NavItem $active={isAttendanceActive} $isCollapsed={isCollapsed} onClick={() => router.push('/attendance')}>
          {isAttendanceActive && <S.ActiveBar $isCollapsed={isCollapsed} />}
          <S.NavIcon><CheckSquare size={20} strokeWidth={1.8} /></S.NavIcon>
          <S.NavLabel $isCollapsed={isCollapsed}>Điểm danh</S.NavLabel>
        </S.NavItem>
        <S.NavItem $active={isScheduleActive} $isCollapsed={isCollapsed} onClick={() => router.push('/schedule')}>
          {isScheduleActive && <S.ActiveBar $isCollapsed={isCollapsed} />}
          <S.NavIcon><Calendar size={20} strokeWidth={1.8} /></S.NavIcon>
          <S.NavLabel $isCollapsed={isCollapsed}>Thực đơn & Lịch học</S.NavLabel>
        </S.NavItem>

        <S.SectTitle $isCollapsed={isCollapsed}>LỚP & HỌC TẬP</S.SectTitle>
        <S.NavItem $active={isStudentsActive} $isCollapsed={isCollapsed} onClick={() => router.push('/students')}>
          {isStudentsActive && <S.ActiveBar $isCollapsed={isCollapsed} />}
          <S.NavIcon><Users size={20} strokeWidth={1.8} /></S.NavIcon>
          <S.NavLabel $isCollapsed={isCollapsed}>Danh sách lớp</S.NavLabel>
          <S.NavBadge $isCollapsed={isCollapsed}>20</S.NavBadge>
        </S.NavItem>

        <S.NavItem $isCollapsed={isCollapsed}>
          <S.NavIcon><BookOpen size={20} strokeWidth={1.8} /></S.NavIcon>
          <S.NavLabel $isCollapsed={isCollapsed}>Soạn giáo án</S.NavLabel>
        </S.NavItem>

        <S.SectTitle $isCollapsed={isCollapsed}>CHĂM SÓC</S.SectTitle>
        <S.NavItem $isCollapsed={isCollapsed}>
          <S.NavIcon><Heart size={20} strokeWidth={1.8} /></S.NavIcon>
          <S.NavLabel $isCollapsed={isCollapsed}>Y tế & Sức khỏe</S.NavLabel>
        </S.NavItem>
        <S.NavItem $isCollapsed={isCollapsed}>
          <S.NavIcon style={{ color: '#FBBF24' }}><Star size={20} strokeWidth={1.8} /></S.NavIcon>
          <S.NavLabel $isCollapsed={isCollapsed}>Phiếu bé ngoan</S.NavLabel>
          <S.NavBadge $isCollapsed={isCollapsed} $urgent>MỚI</S.NavBadge>
        </S.NavItem>
      </S.NavSection>

      {/* USER BAR */}
      <S.UserBar $isCollapsed={isCollapsed}>
        <S.UserAvatar>{getInitials(user?.fullName)}</S.UserAvatar>
        <S.FullOnly $isCollapsed={isCollapsed}>
          <S.UserName>{user?.fullName || 'Giáo viên'}</S.UserName>
          <S.UserRole>Giáo viên</S.UserRole>
        </S.FullOnly>
        <S.SettingsBtn onClick={logout} title="Đăng xuất" style={{ display: isCollapsed ? 'none' : 'flex' }}>
          <LogOut size={15} strokeWidth={1.9} />
        </S.SettingsBtn>
      </S.UserBar>

    </S.SidebarContainer>
  );
};
