"use client";
import React from 'react';
import * as S from './Sidebar.styles';

import { LogoIcon } from '@kindercare/ui/src/svgs/LogoIcon';
import { DashboardIcon } from '@kindercare/ui/src/svgs/DashboardIcon';
import { SetupDatabaseIcon } from '@kindercare/ui/src/svgs/SetupDatabaseIcon';
import { FeeConfigIcon } from '@kindercare/ui/src/svgs/FeeConfigIcon';
import { ParentsManagerIcon } from '@kindercare/ui/src/svgs/ParentsManagerIcon';
import { AuditBackupIcon } from '@kindercare/ui/src/svgs/AuditBackupIcon';
import { SupportIcon } from '@kindercare/ui/src/svgs/SupportIcon';
import { LogoutIcon } from '@kindercare/ui/src/svgs/LogoutIcon';

export const Sidebar: React.FC = () => {
  return (
    <S.SidebarWrapper>
      <S.BrandContainer>
        <S.LogoBox>
          <LogoIcon fill="white" size={14} />
        </S.LogoBox>
        <S.BrandTextWrapper>
          <S.BrandTitle>KinderCare</S.BrandTitle>
          <S.BrandSubtitle>GUARDIAN SYSTEM</S.BrandSubtitle>
        </S.BrandTextWrapper>
      </S.BrandContainer>

      <S.MenuSection>
        <S.MenuItem href="/system-overview" $active>
          <S.MenuIconBox>
            <DashboardIcon fill="#046E1E" size={18} />
          </S.MenuIconBox>
          <S.MenuText $active>Tổng quan</S.MenuText>
        </S.MenuItem>

        <S.MenuItem href="#">
          <S.MenuIconBox>
            <SetupDatabaseIcon fill="#475569" size={18} />
          </S.MenuIconBox>
          <S.MenuText>Thiết lập Niên khóa & CSDL</S.MenuText>
        </S.MenuItem>

        <S.MenuItem href="#">
          <S.MenuIconBox>
            <FeeConfigIcon fill="#475569" size={20} />
          </S.MenuIconBox>
          <S.MenuText>Cấu hình Biểu phí</S.MenuText>
        </S.MenuItem>

        <S.MenuItem href="#">
          <S.MenuIconBox>
            <ParentsManagerIcon fill="#475569" size={20} />
          </S.MenuIconBox>
          <S.MenuText>Quản lý Phụ huynh</S.MenuText>
        </S.MenuItem>

        <S.MenuItem href="#">
          <S.MenuIconBox>
            <AuditBackupIcon fill="#475569" size={18} />
          </S.MenuIconBox>
          <S.MenuText>Audit & Backup</S.MenuText>
        </S.MenuItem>
      </S.MenuSection>

      <S.BottomSection>
        <S.MenuItem href="#">
          <S.MenuIconBox>
            <SupportIcon fill="#475569" size={20} />
          </S.MenuIconBox>
          <S.MenuText>Hỗ trợ</S.MenuText>
        </S.MenuItem>

        <S.MenuItem href="#" $isDanger>
          <S.MenuIconBox>
            <LogoutIcon fill="#BA1A1A" size={18} />
          </S.MenuIconBox>
          <S.MenuText $isDanger>Đăng xuất</S.MenuText>
        </S.MenuItem>
      </S.BottomSection>
    </S.SidebarWrapper>
  );
};
