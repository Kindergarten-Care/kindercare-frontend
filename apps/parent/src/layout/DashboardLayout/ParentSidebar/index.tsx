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
import { useBillingBadge } from './useBillingBadge';
import {
  IconHome, IconDiary, IconMenu, IconProfile,
  IconChart, IconCalendar, IconCreditCard,
  IconChevronLeft, IconChevronRight,
  IconChevronDown, IconRequest, IconWave, IconClose,
} from '@/assets/icons/dashboard';

interface ParentSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const ParentSidebar: React.FC<ParentSidebarProps> = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const effectiveCollapsed = collapsed && !mobileOpen;
  const pathname = usePathname();
  const locale = useLocale();
  const { user } = useAuth();
  const { children: kids, activeStudent, setActiveStudent } = useStudent();
  const { parentProfile } = useParent();
  const pendingRequestCount = useRequestBadge();
  const unpaidCount = useBillingBadge();

  const [csOpen, setCsOpen] = useState<boolean>(false);
  const csRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      if (csRef.current && !csRef.current.contains(e.target as Node)) setCsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  const activeChild = activeStudent ? {
    id: activeStudent.studentId,
    name: activeStudent.fullName,
    className: activeStudent.className,
    gradient: getAvatarGradient(activeStudent.studentId),
    initial: getInitials(activeStudent.fullName)
  } : null;

  return (
    <>
      {mobileOpen && <S.MobileOverlay onClick={onMobileClose} />}
      <S.SidebarWrapper $mobileOpen={mobileOpen}>
      <S.SidebarContainer $collapsed={effectiveCollapsed}>

      <S.Brand $collapsed={effectiveCollapsed}>
        <S.BrandWrapper $collapsed={effectiveCollapsed}>
          <S.LogoImg
            src="https://media.kindercare.app/KinderCare%20Logo/KC_ParentDashboardLogo.png"
            alt="KinderCare"
            $collapsed={effectiveCollapsed}
          />
        </S.BrandWrapper>
      </S.Brand>

      {/* Child Switcher */}
      {activeChild && (
        <S.CSwitcher $collapsed={effectiveCollapsed} ref={csRef}>
          <S.CSTrigger $collapsed={effectiveCollapsed} onClick={() => setCsOpen(o => !o)}>
            <S.CSAv $gradient={activeChild.gradient}>
              {activeStudent && activeStudent.avatarUrl ? (
                <img src={activeStudent.avatarUrl} alt={activeChild.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
              ) : (
                activeChild.initial
              )}
            </S.CSAv>
            <S.CSInfo $hidden={effectiveCollapsed}>
              <S.CSName>{activeChild.name}</S.CSName>
              <S.CSClass>{activeChild.className}</S.CSClass>
            </S.CSInfo>
            <S.CSChev $open={csOpen} $hidden={effectiveCollapsed}>
              <IconChevronDown size={14} />
            </S.CSChev>
            {effectiveCollapsed && <S.Tooltip>{activeChild.name}</S.Tooltip>}
          </S.CSTrigger>

          <ChildSelectorDropdown
            isOpen={csOpen && !effectiveCollapsed}
            onClose={() => setCsOpen(false)}
            kids={kids}
            activeStudent={activeStudent}
            setActiveStudent={setActiveStudent}
            collapsed={effectiveCollapsed}
          />

          <ChildSelectorModal
            isOpen={csOpen && effectiveCollapsed}
            onClose={() => setCsOpen(false)}
            kids={kids}
            activeStudent={activeStudent}
            setActiveStudent={setActiveStudent}
          />
        </S.CSwitcher>
      )}

      <S.Divider />

      {/* Nav sections */}
      <S.NavLabel $hidden={effectiveCollapsed}>Hôm nay</S.NavLabel>
      <S.NavItem href={`/${locale}/dashboard`} $active={pathname.includes('/dashboard')} $collapsed={effectiveCollapsed} onClick={onMobileClose}>
        <S.NavIcon><IconHome size={18} /></S.NavIcon>
        <S.NavSpan $hidden={effectiveCollapsed}>Tổng quan</S.NavSpan>
        {effectiveCollapsed && <S.Tooltip>Tổng quan</S.Tooltip>}
      </S.NavItem>
      <S.NavItem href={`/${locale}/diary`} $active={pathname.includes('/diary')} $collapsed={effectiveCollapsed} onClick={onMobileClose}>
        <S.NavIcon><IconDiary size={18} /></S.NavIcon>
        <S.NavSpan $hidden={effectiveCollapsed}>Nhật ký bé</S.NavSpan>
        {!effectiveCollapsed && <S.NavBadge>MỚI</S.NavBadge>}
        {effectiveCollapsed && <S.NavBadge $collapsed>N</S.NavBadge>}
        {effectiveCollapsed && <S.Tooltip>Nhật ký bé</S.Tooltip>}
      </S.NavItem>
      <S.NavItem href={`/${locale}/schedule`} $active={pathname.includes('/schedule')} $collapsed={effectiveCollapsed} onClick={onMobileClose}>
        <S.NavIcon><IconMenu size={18} /></S.NavIcon>
        <S.NavSpan $hidden={effectiveCollapsed}>Thực đơn & Lịch học</S.NavSpan>
        {effectiveCollapsed && <S.Tooltip>Thực đơn & Lịch học</S.Tooltip>}
      </S.NavItem>

      <S.NavLabel $hidden={effectiveCollapsed}>Bé & Học tập</S.NavLabel>
      <S.NavItem href={`/${locale}/profile`} $active={pathname.includes('/profile')} $collapsed={effectiveCollapsed} onClick={onMobileClose}>
        <S.NavIcon><IconProfile size={18} /></S.NavIcon>
        <S.NavSpan $hidden={effectiveCollapsed}>Hồ sơ bé</S.NavSpan>
        {effectiveCollapsed && <S.Tooltip>Hồ sơ bé</S.Tooltip>}
      </S.NavItem>
      <S.NavItem href={`/${locale}/growth`} $active={pathname.includes('/growth')} $collapsed={effectiveCollapsed} onClick={onMobileClose}>
        <S.NavIcon><IconChart size={18} /></S.NavIcon>
        <S.NavSpan $hidden={effectiveCollapsed}>Lịch sử phát triển</S.NavSpan>
        {effectiveCollapsed && <S.Tooltip>Lịch sử phát triển</S.Tooltip>}
      </S.NavItem>
      <S.NavItem href={`/${locale}/calendar`} $active={pathname.includes('/calendar')} $collapsed={effectiveCollapsed} onClick={onMobileClose}>
        <S.NavIcon><IconCalendar size={18} /></S.NavIcon>
        <S.NavSpan $hidden={effectiveCollapsed}>Lịch & Sự kiện</S.NavSpan>
        {effectiveCollapsed && <S.Tooltip>Lịch & Sự kiện</S.Tooltip>}
      </S.NavItem>
      <S.NavItem href={`/${locale}/request`} $active={pathname.includes('/request')} $collapsed={effectiveCollapsed} onClick={onMobileClose}>
        <S.NavIcon><IconRequest size={18} /></S.NavIcon>
        <S.NavSpan $hidden={effectiveCollapsed}>Yêu cầu phụ huynh</S.NavSpan>
        {pendingRequestCount > 0 && !effectiveCollapsed && (
          <S.NavBadge>{pendingRequestCount > 99 ? '99+' : pendingRequestCount}</S.NavBadge>
        )}
        {pendingRequestCount > 0 && effectiveCollapsed && (
          <S.NavBadge $collapsed>{pendingRequestCount > 9 ? '9+' : pendingRequestCount}</S.NavBadge>
        )}
        {effectiveCollapsed && <S.Tooltip>Yêu cầu phụ huynh</S.Tooltip>}
      </S.NavItem>
      <S.NavItem href={`/${locale}/extracurricular`} $active={pathname.includes('/extracurricular')} $collapsed={effectiveCollapsed} onClick={onMobileClose}>
        <S.NavIcon><IconWave size={18} /></S.NavIcon>
        <S.NavSpan $hidden={effectiveCollapsed}>Hoạt động ngoại khóa</S.NavSpan>
        {effectiveCollapsed && <S.Tooltip>Hoạt động ngoại khóa</S.Tooltip>}
      </S.NavItem>

      <S.NavLabel $hidden={effectiveCollapsed}>Tài chính</S.NavLabel>
      <S.NavItem href={`/${locale}/billing`} $active={pathname.includes('/billing')} $collapsed={effectiveCollapsed} onClick={onMobileClose}>
        <S.NavIcon><IconCreditCard size={18} /></S.NavIcon>
        <S.NavSpan $hidden={effectiveCollapsed}>Học phí & Lệ phí</S.NavSpan>
        {unpaidCount > 0 && !effectiveCollapsed && (
          <S.NavBadge>{unpaidCount > 99 ? '99+' : unpaidCount}</S.NavBadge>
        )}
        {unpaidCount > 0 && effectiveCollapsed && (
          <S.NavBadge $collapsed>{unpaidCount > 9 ? '9+' : unpaidCount}</S.NavBadge>
        )}
        {effectiveCollapsed && <S.Tooltip>Học phí & Lệ phí</S.Tooltip>}
      </S.NavItem>

      {/* Footer */}
      <S.SideProfile $collapsed={effectiveCollapsed}>
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
        <S.ParentInfo $hidden={effectiveCollapsed}>
          <strong>{parentProfile?.fullName || user?.fullName || user?.username || 'Phụ huynh'}</strong>
          <span>Phụ huynh {user?.relationship ? `· ${user.relationship}` : ''}</span>
        </S.ParentInfo>
        {effectiveCollapsed && <S.Tooltip>{parentProfile?.fullName || user?.fullName || user?.username || 'Phụ huynh'}</S.Tooltip>}
      </S.SideProfile>
    </S.SidebarContainer>
    <S.ToggleBtn $collapsed={effectiveCollapsed} onClick={onToggle} title={collapsed ? 'Mở rộng' : 'Thu gọn'}>
      {collapsed ? <IconChevronRight size={16} /> : <IconChevronLeft size={16} />}
    </S.ToggleBtn>
    {mobileOpen && (
      <S.MobileCloseBtn onClick={onMobileClose} aria-label="Đóng menu">
        <IconClose size={18} />
      </S.MobileCloseBtn>
    )}
  </S.SidebarWrapper>
  </>
  );
};

export default ParentSidebar;
