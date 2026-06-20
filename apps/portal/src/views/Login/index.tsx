'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button, Input, Checkbox } from '@kindercare/ui';
import { getSession } from '@kindercare/core';
import { useLoginState, UserRole } from './hooks';
import * as S from './styles';

interface RoleContent {
  title: string;
  subtitle: string;
  inputLabel: string;
  inputPlaceholder: string;
}

const ROLE_CONTENT: Record<UserRole, RoleContent> = {
  principal: {
    title: 'Đăng nhập quyền Hiệu Trưởng',
    subtitle: 'Vui lòng nhập thông tin tài khoản Hiệu trưởng nhà trường.',
    inputLabel: 'Email / Số điện thoại',
    inputPlaceholder: 'Nhập email hoặc số điện thoại...',
  },
  teacher: {
    title: 'Đăng nhập quyền Giáo Viên',
    subtitle: 'Vui lòng nhập thông tin tài khoản Giáo viên.',
    inputLabel: 'Email / Số điện thoại',
    inputPlaceholder: 'Nhập email hoặc số điện thoại...',
  },
};

const ROLE_TABS: { key: UserRole; label: string }[] = [
  { key: 'principal', label: 'Hiệu Trưởng' },
  { key: 'teacher', label: 'Giáo Viên' },
];

const GLASS_ITEMS = [
  {
    icon: '🔐',
    title: 'Bảo mật đa lớp',
    desc: 'Hệ thống mã hóa dữ liệu end-to-end đảm bảo an toàn tuyệt đối cho thông tin nhà trường.',
  },
  {
    icon: '⚡',
    title: 'Đồng bộ thời gian thực',
    desc: 'Kết nối và truyền tải tức thời dữ liệu giữa ban quản lý, giáo viên và phụ huynh.',
  },
  {
    icon: '📊',
    title: 'Giám sát hệ thống 24/7',
    desc: 'Báo cáo trạng thái hoạt động của các phân hệ tự động, phát hiện và cảnh báo sự cố lập tức.',
  },
];

export const LoginView: React.FC = () => {
  const {
    role,
    username,
    password,
    rememberMe,
    errors,
    isSubmitting,
    handleRoleChange,
    handleUsernameChange,
    handlePasswordChange,
    handleRememberMeChange,
    handleSubmit,
  } = useLoginState();

  useEffect(() => {
    const session = getSession();
    if (session) {
      const nextUrl = session.role === 'teacher'
        ? (process.env.NEXT_PUBLIC_TEACHER_APP_URL || 'http://localhost:3001') + '/teacher'
        : (process.env.NEXT_PUBLIC_PRINCIPAL_APP_URL || 'http://localhost:3002') + '/principal';
      window.location.href = nextUrl;
    }
  }, []);

  const content = ROLE_CONTENT[role];


  return (
    <S.Container>
      {/* Left Column - Interaction Pane */}
      <S.InteractionPane>
        <S.InteractionContent>
          {/* Brand */}
          <S.BrandHeader>
            <S.BrandLogo
              src="https://media.kindercare.app/KinderCare%20Logo/KinderCare_LogoTextHorizontal.png"
              alt="KinderCare Logo"
            />
          </S.BrandHeader>

          {/* Role Tabs */}
          <S.TabGroup>
            {ROLE_TABS.map(tab => (
              <S.TabButtonWrapper key={tab.key}>
                <Button
                  type="button"
                  variant={role === tab.key ? 'activeTab' : 'tab'}
                  onClick={() => handleRoleChange(tab.key)}
                  fullWidth
                >
                  {tab.label}
                </Button>
              </S.TabButtonWrapper>
            ))}
          </S.TabGroup>

          {/* Titles with animation key */}
          <S.FormTitleBlock key={role}>
            <S.FormTitle>{content.title}</S.FormTitle>
            <S.FormSubtitle>{content.subtitle}</S.FormSubtitle>
          </S.FormTitleBlock>

          {/* Login Form */}
          <S.LoginForm onSubmit={handleSubmit}>
            <Input
              id="username"
              type="text"
              label={content.inputLabel}
              placeholder={content.inputPlaceholder}
              value={username}
              onChange={handleUsernameChange}
              error={errors.username}
            />

            <S.FormGroup>
              <S.FormOptionsRow>
                <S.PasswordLabel htmlFor="password">Mật khẩu</S.PasswordLabel>
                <S.ForgotPasswordLink as={Link} href="/login/forgot-password">Quên mật khẩu?</S.ForgotPasswordLink>
              </S.FormOptionsRow>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                error={errors.password}
              />
            </S.FormGroup>

            <Checkbox
              id="remember"
              label="Ghi nhớ đăng nhập"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />

            <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Đang xử lý...' : 'Truy cập hệ thống'}
            </Button>
          </S.LoginForm>
        </S.InteractionContent>

        {/* Footer */}
        <S.FooterLinks>
          <a href="#">Tiếng Việt</a>
          <a href="#">Hỗ trợ kỹ thuật</a>
          <a href="#">Bảo mật</a>
        </S.FooterLinks>
      </S.InteractionPane>

      {/* Right Column - Visualization Pane */}
      <S.VisualizationPane>
        <S.GlassCard>
          <S.GlassTitle>Bảng điều khiển IT</S.GlassTitle>
          <S.GlassSubtitle>KinderCare Guardian System</S.GlassSubtitle>

          {GLASS_ITEMS.map((item, idx) => (
            <S.GlassItem key={idx}>
              <S.GlassItemTitle>
                <S.GlassItemIcon>{item.icon}</S.GlassItemIcon>
                {item.title}
              </S.GlassItemTitle>
              <S.GlassItemDesc>{item.desc}</S.GlassItemDesc>
            </S.GlassItem>
          ))}
        </S.GlassCard>
      </S.VisualizationPane>
    </S.Container>
  );
};

export default LoginView;
