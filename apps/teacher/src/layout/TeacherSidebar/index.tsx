import React from 'react';
import * as S from './styles';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  Users,
  BookOpen,
  Heart,
  Star,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useAuth } from '@/contexts/AuthContext';
import { useTeacherClasses, useTeacherProfile } from '@/hooks/useTeacherQueries';
import type { TeacherClassDomainModel } from '@/config/types/class';

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
  const { data: profile } = useTeacherProfile();
  
  const avatarUrl = profile?.avatarUrl;
  
  // Load classes using react query — returns TeacherClassDomainModel[]
  const { data: classes } = useTeacherClasses();
  
  // Default to first class if available — displayName and classInitial are pre-computed by ClassMapper
  const activeClass: TeacherClassDomainModel | null = classes && classes.length > 0 ? classes[0] : null;
  const studentCount  = activeClass?.studentCount  ?? 0;
  const displayClassName = activeClass?.displayName  ?? 'Lớp Mầm 1';
  const classInitial     = activeClass?.classInitial ?? 'M1';

  const isDashboardActive = pathname === '/';
  const isStudentsActive = pathname === '/students';
  const isAttendanceActive = pathname === '/attendance';
  const isScheduleActive = pathname === '/schedule';
  const isLessonPlanActive = pathname === '/lesson-plan';
  const isWeeklyScheduleActive = pathname === '/weekly-schedule';
  const isProfileActive = pathname === '/profile';

  // Extract user initials
  const getInitials = (name?: string) => {
    if (!name) return 'GV';
    const parts = name.trim().split(' ');
    return parts[parts.length - 1].charAt(0).toUpperCase();
  };

  // Helper to handle placeholder features
  const handleFeatureNotImplemented = (featureName: string) => {
    alert(`Tính năng "${featureName}" đang được phát triển.`);
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
          <img
            src="https://media.kindercare.app/KinderCare%20Logo/Kindercare_TeacherDashboardLogo.png"
            alt="KinderCare Logo"
            style={{ width: '100%', height: 'auto', maxWidth: 200, objectFit: 'contain' }}
          />
        </S.LogoBlock>
      </S.LogoContainer>

      {/* CLASS SELECTOR */}
      <S.ProfileCard $isCollapsed={isCollapsed} onClick={() => router.push('/students')}>
        <S.ProfileAvatar>{classInitial}</S.ProfileAvatar>
        <S.FullOnly $isCollapsed={isCollapsed}>
          <S.ProfileName>{displayClassName}</S.ProfileName>
          <S.ProfileDesc>{studentCount} học sinh</S.ProfileDesc>
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
          <S.NavBadge $isCollapsed={isCollapsed}>{studentCount}</S.NavBadge>
        </S.NavItem>

        <S.NavItem $active={isWeeklyScheduleActive} $isCollapsed={isCollapsed} onClick={() => router.push('/weekly-schedule')}>
          {isWeeklyScheduleActive && <S.ActiveBar $isCollapsed={isCollapsed} />}
          <S.NavIcon><Calendar size={20} strokeWidth={1.8} /></S.NavIcon>
          <S.NavLabel $isCollapsed={isCollapsed}>Thời khóa biểu</S.NavLabel>
          <S.NavBadge $isCollapsed={isCollapsed} $urgent>MỚI</S.NavBadge>
        </S.NavItem>

        <S.SectTitle $isCollapsed={isCollapsed}>CHĂM SÓC</S.SectTitle>
        <S.NavItem $isCollapsed={isCollapsed} onClick={() => handleFeatureNotImplemented('Y tế & Sức khỏe')}>
          <S.NavIcon><Heart size={20} strokeWidth={1.8} /></S.NavIcon>
          <S.NavLabel $isCollapsed={isCollapsed}>Y tế & Sức khỏe</S.NavLabel>
        </S.NavItem>
        <S.NavItem $isCollapsed={isCollapsed} onClick={() => handleFeatureNotImplemented('Phiếu bé ngoan')}>
          <S.NavIcon style={{ color: '#FBBF24' }}><Star size={20} strokeWidth={1.8} /></S.NavIcon>
          <S.NavLabel $isCollapsed={isCollapsed}>Phiếu bé ngoan</S.NavLabel>
          <S.NavBadge $isCollapsed={isCollapsed} $urgent>MỚI</S.NavBadge>
        </S.NavItem>
      </S.NavSection>

      {/* USER BAR */}
      <S.UserBar $isCollapsed={isCollapsed}>
        <S.UserAvatar onClick={() => router.push('/profile')} style={{ cursor: 'pointer', overflow: 'hidden' }}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={profile?.fullName || user?.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            getInitials(profile?.fullName || user?.fullName)
          )}
        </S.UserAvatar>
        <S.FullOnly $isCollapsed={isCollapsed}>
          <S.UserName>{profile?.fullName || user?.fullName || 'Giáo viên'}</S.UserName>
          <S.UserRole>{user?.roleName === 'Teacher' ? 'Giáo viên' : (user?.roleName || 'Giáo viên')}</S.UserRole>
        </S.FullOnly>
        <S.SettingsBtn onClick={logout} title="Đăng xuất" style={{ display: isCollapsed ? 'none' : 'flex' }}>
          <LogOut size={15} strokeWidth={1.9} />
        </S.SettingsBtn>
      </S.UserBar>

    </S.SidebarContainer>
  );
};
