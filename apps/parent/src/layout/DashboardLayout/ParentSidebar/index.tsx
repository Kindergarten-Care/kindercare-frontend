'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useAuth } from '@kindercare/core';
import { useStudent } from '@/contexts/StudentContext';
import { getInitials, getAvatarGradient } from '@/utils/Student/Avatar';
import * as S from './styles';
import ChildSelectorModal from './ChildSelectorModal';
import ChildSelectorDropdown from './ChildSelectorDropdown';
import {
  IconHome, IconDiary, IconChat, IconMenu, IconProfile,
  IconChart, IconCalendar, IconCreditCard, IconReceipt,
  IconSettings, IconLogout, IconChevronLeft, IconChevronRight,
  IconChevronDown,
} from '@/assets/icons/dashboard';

interface ParentSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const ParentSidebar: React.FC<ParentSidebarProps> = ({ collapsed, onToggle }) => {
  const pathname = usePathname();
  const locale = useLocale();
  const { user, logout } = useAuth();
  const { children: kids, activeStudent, setActiveStudent } = useStudent();

  const [csOpen, setCsOpen] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const csRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      if (csRef.current && !csRef.current.contains(e.target as Node)) setCsOpen(false);
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) setShowSettings(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async (e: React.MouseEvent): Promise<void> => {
    e.stopPropagation();
    await logout();
  };

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
      </S.NavItem>
      <S.NavItem href="#" $collapsed={collapsed}>
        <S.NavIcon><IconDiary size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Nhật ký bé</S.NavSpan>
        {!collapsed && <S.NavBadge>MỚI</S.NavBadge>}
        {collapsed && <S.NavBadge $collapsed>N</S.NavBadge>}
      </S.NavItem>
      <S.NavItem href="#" $collapsed={collapsed}>
        <S.NavIcon><IconChat size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Tin nhắn</S.NavSpan>
        {!collapsed && <S.NavBadge>3</S.NavBadge>}
        {collapsed && <S.NavBadge $collapsed>3</S.NavBadge>}
      </S.NavItem>
      <S.NavItem href="#" $collapsed={collapsed}>
        <S.NavIcon><IconMenu size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Thực đơn & Lịch học</S.NavSpan>
      </S.NavItem>

      <S.NavLabel $hidden={collapsed}>Bé & Học tập</S.NavLabel>
      <S.NavItem href="#" $collapsed={collapsed}>
        <S.NavIcon><IconProfile size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Hồ sơ bé</S.NavSpan>
      </S.NavItem>
      <S.NavItem href="#" $collapsed={collapsed}>
        <S.NavIcon><IconChart size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Lịch sử phát triển</S.NavSpan>
      </S.NavItem>
      <S.NavItem href="#" $collapsed={collapsed}>
        <S.NavIcon><IconCalendar size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Lịch & Sự kiện</S.NavSpan>
      </S.NavItem>

      <S.NavLabel $hidden={collapsed}>Tài chính</S.NavLabel>
      <S.NavItem href="#" $collapsed={collapsed}>
        <S.NavIcon><IconCreditCard size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Học phí & Lệ phí</S.NavSpan>
        {!collapsed && <S.NavBadge style={{ background: '#d97706' }}>!</S.NavBadge>}
      </S.NavItem>
      <S.NavItem href="#" $collapsed={collapsed}>
        <S.NavIcon><IconReceipt size={18} /></S.NavIcon>
        <S.NavSpan $hidden={collapsed}>Lịch sử thanh toán</S.NavSpan>
      </S.NavItem>

      {/* Footer */}
      <S.SideProfile $collapsed={collapsed}>
        <S.ParentAv>{user?.relationship?.toLowerCase() === 'cha' ? '👨' : '👩'}</S.ParentAv>
        <S.ParentInfo $hidden={collapsed}>
          <strong>{user?.fullName || user?.username || 'Phụ huynh'}</strong>
          <span>Phụ huynh {user?.relationship ? `· ${user.relationship}` : ''}</span>
        </S.ParentInfo>

        {!collapsed && (
          <S.DropdownContainer ref={settingsRef}>
            <S.SettingsBtn onClick={e => { e.stopPropagation(); setShowSettings(s => !s); }}>
              <IconSettings size={16} />
            </S.SettingsBtn>
            {showSettings && (
              <S.DropdownMenu>
                <S.DropdownItem onClick={handleLogout}>
                  <IconLogout size={15} /> Đăng xuất
                </S.DropdownItem>
              </S.DropdownMenu>
            )}
          </S.DropdownContainer>
        )}
      </S.SideProfile>
    </S.SidebarContainer>
    <S.ToggleBtn $collapsed={collapsed} onClick={onToggle} title={collapsed ? 'Mở rộng' : 'Thu gọn'}>
      {collapsed ? <IconChevronRight size={16} /> : <IconChevronLeft size={16} />}
    </S.ToggleBtn>
  </S.SidebarWrapper>
  );
};

export default ParentSidebar;
