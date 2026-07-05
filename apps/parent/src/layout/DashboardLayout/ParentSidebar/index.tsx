'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useAuth } from '@kindercare/core';
import { useStudent } from '@/contexts/StudentContext';
import { useParent } from '@/contexts/ParentContext';
import { getInitials, getAvatarGradient } from '@/utils/Student/Avatar';
import * as S from './styles';
import ChildSelectorModal from './ChildSelectorModal';
import ChildSelectorDropdown from './ChildSelectorDropdown';
import { useRequestBadge } from './useRequestBadge';
import {
  IconHome, IconDiary, IconMenu, IconProfile,
  IconChart, IconCalendar, IconCreditCard,
  IconChevronLeft, IconChevronRight,
  IconChevronDown, IconRequest, IconWave,
} from '@/assets/icons/dashboard';

interface ParentSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const ParentSidebar: React.FC<ParentSidebarProps> = ({ collapsed, onToggle }) => {
  const pathname = usePathname();
  const locale = useLocale();
  const { user } = useAuth();
  const { children: kids, activeStudent, setActiveStudent } = useStudent();
  const { parentProfile } = useParent();
  const pendingRequestCount = useRequestBadge();

  const [csOpen, setCsOpen] = useState<boolean>(false);
  const csRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      if (csRef.current && !csRef.current.contains(e.target as Node)) setCsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const activeChild = activeStudent ? {
    id: activeStudent.studentId,
    name: activeStudent.fullName,
    className: activeStudent.className,
    gradient: getAvatarGradient(activeStudent.studentId),
    initial: getInitials(activeStudent.fullName)
  } : null;

  return (
    <S.SidebarWrapper>
      <S.SidebarContainer $collapsed={collapsed}>

      <S.Brand $collapsed={collapsed}>
        <S.BrandWrapper $collapsed={collapsed}>
          <S.LogoImg
            src="https://media.kindercare.app/KinderCare%20Logo/KC_ParentDashboardLogo.png"
            alt="KinderCare"
            $collapsed={collapsed}
          />
        </S.BrandWrapper>
      </S.Brand>

      {/* Child Switcher */}
      {activeChild && (
        <S.CSwitcher $collapsed={collapsed} ref={csRef}>
          <S.CSTrigger $collapsed={collapsed} onClick={() => setCsOpen(o => !o)}>
            <S.CSAv $gradient={activeChild.gradient}>
              {activeStudent && activeStudent.avatarUrl ? (
                <img src={activeStudent.avatarUrl} alt={activeChild.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
              ) : (
                activeChild.initial
              )}
            </S.CSAv>
            <S.CSInfo $hidden={collapsed}>
              <S.CSName>{activeChild.name}</S.CSName>
              <S.CSClass>{activeChild.className}</S.CSClass>
            </S.CSInfo>
            <S.CSChev $open={csOpen} $hidden={collapsed}>
              <IconChevronDown size={14} />
            </S.CSChev>
            {collapsed && <S.Tooltip>{activeChild.name}</S.Tooltip>}
          </S.CSTrigger>

          <ChildSelectorDropdown
            isOpen={csOpen && !collapsed}
            onClose={() => setCsOpen(false)}
            kids={kids}
            activeStudent={activeStudent}
            setActiveStudent={setActiveStudent}
            collapsed={collapsed}
          />

          <ChildSelectorModal
            isOpen={csOpen && collapsed}
            onClose={() => setCsOpen(false)}
            kids={kids}
            activeStudent={activeStudent}
            setActiveStudent={setActiveStudent}
          />
        </S.CSwitcher>
      )}

      <S.Divider />

      {/* Nav sections */}
      <S.NavLabel $hidden={collapsed}>Hôm nay</S.NavLabel>
      <S.NavItem href={`/${locale}/dashboard`} $active={pathname.includes('/dashboard')} $collapsed={collapsed}>
        <S.NavIcon><IconHome size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Tổng quan</S.NavSpan>
        {collapsed && <S.Tooltip>Tổng quan</S.Tooltip>}
      </S.NavItem>
      <S.NavItem href={`/${locale}/diary`} $active={pathname.includes('/diary')} $collapsed={collapsed}>
        <S.NavIcon><IconDiary size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Nhật ký bé</S.NavSpan>
        {!collapsed && <S.NavBadge>MỚI</S.NavBadge>}
        {collapsed && <S.NavBadge $collapsed>N</S.NavBadge>}
        {collapsed && <S.Tooltip>Nhật ký bé</S.Tooltip>}
      </S.NavItem>
      <S.NavItem href={`/${locale}/schedule`} $active={pathname.includes('/schedule')} $collapsed={collapsed}>
        <S.NavIcon><IconMenu size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Thực đơn & Lịch học</S.NavSpan>
        {collapsed && <S.Tooltip>Thực đơn & Lịch học</S.Tooltip>}
      </S.NavItem>

      <S.NavLabel $hidden={collapsed}>Bé & Học tập</S.NavLabel>
      <S.NavItem href={`/${locale}/profile`} $active={pathname.includes('/profile')} $collapsed={collapsed}>
        <S.NavIcon><IconProfile size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Hồ sơ bé</S.NavSpan>
        {collapsed && <S.Tooltip>Hồ sơ bé</S.Tooltip>}
      </S.NavItem>
      <S.NavItem href={`/${locale}/growth`} $active={pathname.includes('/growth')} $collapsed={collapsed}>
        <S.NavIcon><IconChart size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Lịch sử phát triển</S.NavSpan>
        {collapsed && <S.Tooltip>Lịch sử phát triển</S.Tooltip>}
      </S.NavItem>
      <S.NavItem href={`/${locale}/calendar`} $active={pathname.includes('/calendar')} $collapsed={collapsed}>
        <S.NavIcon><IconCalendar size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Lịch & Sự kiện</S.NavSpan>
        {collapsed && <S.Tooltip>Lịch & Sự kiện</S.Tooltip>}
      </S.NavItem>
      <S.NavItem href={`/${locale}/request`} $active={pathname.includes('/request')} $collapsed={collapsed}>
        <S.NavIcon><IconRequest size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Yêu cầu phụ huynh</S.NavSpan>
        {pendingRequestCount > 0 && !collapsed && (
          <S.NavBadge>{pendingRequestCount > 99 ? '99+' : pendingRequestCount}</S.NavBadge>
        )}
        {pendingRequestCount > 0 && collapsed && (
          <S.NavBadge $collapsed>{pendingRequestCount > 9 ? '9+' : pendingRequestCount}</S.NavBadge>
        )}
        {collapsed && <S.Tooltip>Yêu cầu phụ huynh</S.Tooltip>}
      </S.NavItem>
      <S.NavItem href={`/${locale}/extracurricular`} $active={pathname.includes('/extracurricular')} $collapsed={collapsed}>
        <S.NavIcon><IconWave size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Hoạt động ngoại khóa</S.NavSpan>
        {collapsed && <S.Tooltip>Hoạt động ngoại khóa</S.Tooltip>}
      </S.NavItem>

      <S.NavLabel $hidden={collapsed}>Tài chính</S.NavLabel>
      <S.NavItem href={`/${locale}/billing`} $active={pathname.includes('/billing')} $collapsed={collapsed}>
        <S.NavIcon><IconCreditCard size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Học phí & Lệ phí</S.NavSpan>
        {collapsed && <S.Tooltip>Học phí & Lệ phí</S.Tooltip>}
      </S.NavItem>

      {/* Footer */}
      <S.SideProfile $collapsed={collapsed}>
        <S.ParentAv>
          {parentProfile?.avatarUrl ? (
            <img
              src={parentProfile.avatarUrl}
              alt={parentProfile.fullName}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
            />
          ) : (
            user?.relationship?.toLowerCase() === 'cha' ? '👨' : '👩'
          )}
        </S.ParentAv>
        <S.ParentInfo $hidden={collapsed}>
          <strong>{parentProfile?.fullName || user?.fullName || user?.username || 'Phụ huynh'}</strong>
          <span>Phụ huynh {user?.relationship ? `· ${user.relationship}` : ''}</span>
        </S.ParentInfo>
        {collapsed && <S.Tooltip>{parentProfile?.fullName || user?.fullName || user?.username || 'Phụ huynh'}</S.Tooltip>}
      </S.SideProfile>
    </S.SidebarContainer>
    <S.ToggleBtn $collapsed={collapsed} onClick={onToggle} title={collapsed ? 'Mở rộng' : 'Thu gọn'}>
      {collapsed ? <IconChevronRight size={16} /> : <IconChevronLeft size={16} />}
    </S.ToggleBtn>
  </S.SidebarWrapper>
  );
};

export default ParentSidebar;
