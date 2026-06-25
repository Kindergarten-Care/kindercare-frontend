import React from 'react';
import * as S from './styles';
import { LayoutDashboard, Users, CheckSquare, Calendar, Heart, User, LogOut } from 'lucide-react';
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
  const isStudentsActive = pathname === '/students';
  const isAttendanceActive = pathname === '/attendance';
  const isScheduleActive = pathname === '/schedule';
  const isActivitiesActive = pathname === '/activities';
  const isProfileActive = pathname === '/profile';

  return (
    <S.SidebarContainer $isOpen={isOpen}>
      <S.LogoContainer>
        <S.LogoBlock>K</S.LogoBlock>
        <S.LogoText>KinderCare</S.LogoText>
        {onClose && (
          <S.CloseButton onClick={onClose} aria-label="Close sidebar">
            ✕
          </S.CloseButton>
        )}
      </S.LogoContainer>

      <S.NavList>
        <S.NavItem $active={isDashboardActive} onClick={() => router.push('/')}>
          <S.IconWrapper>
            <LayoutDashboard size={23} />
          </S.IconWrapper>
          <S.Label>Bảng điều khiển</S.Label>
        </S.NavItem>
        <S.NavItem $active={isStudentsActive} onClick={() => router.push('/students')}>
          <S.IconWrapper>
            <Users size={23} />
          </S.IconWrapper>
          <S.Label>Danh sách lớp</S.Label>
        </S.NavItem>
        <S.NavItem $active={isAttendanceActive} onClick={() => router.push('/attendance')}>
          <S.IconWrapper>
            <CheckSquare size={23} />
          </S.IconWrapper>
          <S.Label>Điểm danh</S.Label>
        </S.NavItem>
        <S.NavItem $active={isScheduleActive} onClick={() => router.push('/schedule')}>
          <S.IconWrapper>
            <Calendar size={23} />
          </S.IconWrapper>
          <S.Label>Lịch trình</S.Label>
        </S.NavItem>
        <S.NavItem $active={isActivitiesActive} onClick={() => router.push('/activities')}>
          <S.IconWrapper>
            <Calendar size={23} />
          </S.IconWrapper>
          <S.Label>Hoạt động</S.Label>
        </S.NavItem>
        <S.NavItem onClick={() => router.push('/')}>
          <S.IconWrapper>
            <Heart size={23} />
          </S.IconWrapper>
          <S.Label>Y tế &amp; Dinh dưỡng</S.Label>
        </S.NavItem>
      </S.NavList>
      
      <S.BottomNav>
        <S.NavItem $active={isProfileActive} onClick={() => router.push('/profile')}>
          <S.IconWrapper>
            <User size={23} />
          </S.IconWrapper>
          <S.Label>Hồ sơ</S.Label>
        </S.NavItem>
        <S.NavItem onClick={logout}>
          <S.IconWrapper>
            <LogOut size={23} />
          </S.IconWrapper>
          <S.Label>Đăng xuất</S.Label>
        </S.NavItem>
      </S.BottomNav>
    </S.SidebarContainer>
  );
};
