'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import * as S from './styles';

const ParentSidebar: React.FC = () => {
  const pathname = usePathname();
  const locale = useLocale();

  const handleOpenAbsence = () => {
    alert('Báo nghỉ clicked');
  };

  return (
    <S.SidebarContainer id="sidebar">
      <S.SidebarLogo>
        <S.LogoMark>K</S.LogoMark>
        <S.LogoText>
          <strong>KinderCare</strong>
          <span>Cổng phụ huynh</span>
        </S.LogoText>
      </S.SidebarLogo>

      <S.ChildSwitcher>
        <S.CsAv>👧</S.CsAv>
        <S.CsInfo>
          <strong>Nguyễn Bảo Châu</strong>
          <span>Hoa Hướng Dương · K3</span>
        </S.CsInfo>
        <S.CsChevron>⌄</S.CsChevron>
      </S.ChildSwitcher>

      <S.AbsenceCta onClick={handleOpenAbsence}>
        <S.AbsenceCtaIcon>🚫</S.AbsenceCtaIcon>
        <S.AbsenceCtaText>
          <strong>Báo nghỉ học</strong>
          <span>Gửi đơn nhanh · Alt N</span>
        </S.AbsenceCtaText>
        <S.AbsenceBadge>NHANH</S.AbsenceBadge>
      </S.AbsenceCta>

      <S.NavSection>
        <S.NavLabel>Hôm nay</S.NavLabel>
        <S.NavItem href={`/${locale}/dashboard_view`} $active={pathname.includes('dashboard_view')}>
          <S.NavIcon>🏠</S.NavIcon>Tổng quan
        </S.NavItem>
        <S.NavItem href="#">
          <S.NavIcon>📓</S.NavIcon>Nhật ký bé
          <S.NavBadge style={{ backgroundColor: '#16a34a' }}>MỚI</S.NavBadge>
        </S.NavItem>
        <S.NavItem href="#">
          <S.NavIcon>💬</S.NavIcon>Tin nhắn
          <S.NavBadge>3</S.NavBadge>
        </S.NavItem>
        <S.NavItem href="#">
          <S.NavIcon>🍱</S.NavIcon>Thực đơn & Lịch học
        </S.NavItem>
      </S.NavSection>

      <S.NavSection>
        <S.NavLabel>Bé & Học tập</S.NavLabel>
        <S.NavItem href="#">
          <S.NavIcon>👤</S.NavIcon>Hồ sơ bé
        </S.NavItem>
        <S.NavItem href="#">
          <S.NavIcon>📊</S.NavIcon>Lịch sử phát triển
        </S.NavItem>
        <S.NavItem href="#">
          <S.NavIcon>📅</S.NavIcon>Lịch & Sự kiện
        </S.NavItem>
      </S.NavSection>

      <S.NavSection>
        <S.NavLabel>Tài chính</S.NavLabel>
        <S.NavItem href="#">
          <S.NavIcon>💳</S.NavIcon>Học phí & Lệ phí
          <S.NavBadge $warn>!</S.NavBadge>
        </S.NavItem>
        <S.NavItem href="#">
          <S.NavIcon>🧾</S.NavIcon>Lịch sử thanh toán
        </S.NavItem>
      </S.NavSection>

      <S.SidebarFooter>
        <S.ParentRow>
          <S.ParentAv>👩</S.ParentAv>
          <S.ParentInfo>
            <strong>Nguyễn Thị Mai</strong>
            <span>Phụ huynh · Mẹ</span>
          </S.ParentInfo>
          <S.SettingsBtn>⚙</S.SettingsBtn>
        </S.ParentRow>
      </S.SidebarFooter>
    </S.SidebarContainer>
  );
};

export default ParentSidebar;
