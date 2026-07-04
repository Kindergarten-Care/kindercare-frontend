import React from 'react';
import * as S from './styles';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  Calendar, 
  Heart, 
  LogOut,
  ChevronRight,
  ChevronLeft,
  FileText,
  Star
} from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useAuth } from '@/contexts/AuthContext';

interface TeacherSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();
  
  const isDashboardActive = pathname === '/';
  const isAttendanceActive = pathname === '/attendance';
  const isActivitiesActive = pathname === '/activities';

  return (
    <S.SidebarContainer $isOpen={isOpen}>
      {onClose && (
        <S.CollapseBtn onClick={onClose} title="Thu gọn">
          <ChevronLeft size={16} strokeWidth={2.4} />
        </S.CollapseBtn>
      )}

      <S.LogoContainer>
        <S.LogoBlock>K</S.LogoBlock>
        <S.LogoTextContainer>
          <S.LogoText>KINDER CARE</S.LogoText>
          <S.LogoSubText>QUẢN LÝ GIÁO VIÊN</S.LogoSubText>
        </S.LogoTextContainer>
      </S.LogoContainer>

      <S.ClassProfileBtn onClick={() => router.push('/')}>
        <S.ClassAvatar>M1</S.ClassAvatar>
        <S.ClassInfo>
          <S.ClassName>Lớp Mầm 1</S.ClassName>
          <S.ClassDetails>42 học sinh</S.ClassDetails>
        </S.ClassInfo>
        <ChevronRight size={16} strokeWidth={2.2} color="#9CA3AF" />
      </S.ClassProfileBtn>

      <S.ScrollNav>
        <S.NavSectionTitle>HÔM NAY</S.NavSectionTitle>
        <S.NavItem $active={isDashboardActive} onClick={() => router.push('/')}>
          {isDashboardActive && <S.ActiveBar />}
          <S.IconWrapper>
            <LayoutDashboard size={20} strokeWidth={1.8} />
          </S.IconWrapper>
          <span>Tổng quan</span>
        </S.NavItem>
        <S.NavItem $active={isAttendanceActive} onClick={() => router.push('/attendance')}>
          {isAttendanceActive && <S.ActiveBar />}
          <S.IconWrapper>
            <CheckSquare size={20} strokeWidth={1.9} />
          </S.IconWrapper>
          <span>Điểm danh</span>
        </S.NavItem>
        <S.NavItem $active={isActivitiesActive} onClick={() => router.push('/activities')}>
          {isActivitiesActive && <S.ActiveBar />}
          <S.IconWrapper>
            <Calendar size={20} strokeWidth={1.8} />
          </S.IconWrapper>
          <span>Thực đơn & Lịch học</span>
        </S.NavItem>

        <S.NavSectionTitle>LỚP & HỌC TẬP</S.NavSectionTitle>
        <S.NavItem onClick={() => router.push('/')}>
          <S.IconWrapper>
            <Users size={20} strokeWidth={1.8} />
          </S.IconWrapper>
          <span>Danh sách lớp</span>
          <S.Badge>20</S.Badge>
        </S.NavItem>
        <S.NavItem onClick={() => router.push('/')}>
          <S.IconWrapper>
            <FileText size={20} strokeWidth={1.8} />
          </S.IconWrapper>
          <span>Soạn giáo án</span>
        </S.NavItem>

        <S.NavSectionTitle>CHĂM SÓC</S.NavSectionTitle>
        <S.NavItem onClick={() => router.push('/')}>
          <S.IconWrapper>
            <Heart size={20} strokeWidth={1.8} />
          </S.IconWrapper>
          <span>Y tế & Sức khỏe</span>
        </S.NavItem>
        <S.NavItem $isYellow onClick={() => router.push('/')}>
          <S.IconWrapper>
            <Star size={20} strokeWidth={1.8} />
          </S.IconWrapper>
          <span>Phiếu bé ngoan</span>
        </S.NavItem>
      </S.ScrollNav>
      
      <S.UserBar>
        <S.UserAvatar>
          {user?.username?.charAt(0).toUpperCase() || 'H'}
        </S.UserAvatar>
        <S.UserInfo>
          <S.UserName>{user?.username || 'Thầy Lê Quang Huy'}</S.UserName>
          <S.UserRole>Giáo viên</S.UserRole>
        </S.UserInfo>
        <S.LogoutBtn onClick={logout}>
          <LogOut size={16} strokeWidth={1.9} />
        </S.LogoutBtn>
      </S.UserBar>
    </S.SidebarContainer>
  );
};
