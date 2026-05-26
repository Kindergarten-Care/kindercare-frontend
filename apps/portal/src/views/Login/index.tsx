'use client';

import React from 'react';
import { Button, Input, Checkbox } from '@kindercare/ui';
import { useLoginState, UserRole } from './hooks';
import * as S from './styles';

export const LoginView: React.FC = () => {
  const {
    role,
    username,
    password,
    rememberMe,
    errors,
    handleRoleChange,
    handleUsernameChange,
    handlePasswordChange,
    handleRememberMeChange,
    handleSubmit,
  } = useLoginState();

  // Dynamic content based on selected role
  const getRoleContent = (currentRole: UserRole) => {
    switch (currentRole) {
      case 'admin':
        return {
          title: 'Đăng nhập quyền IT Admin',
          subtitle: 'Vui lòng nhập thông tin xác thực hệ thống.',
          inputLabel: 'Tên đăng nhập / Mã nhân viên',
          inputPlaceholder: 'Nhập mã nhân viên...',
        };
      case 'principal':
        return {
          title: 'Đăng nhập quyền Hiệu Trưởng',
          subtitle: 'Vui lòng nhập thông tin tài khoản Hiệu trưởng nhà trường.',
          inputLabel: 'Email công tác',
          inputPlaceholder: 'Nhập email của bạn...',
        };
      case 'teacher':
        return {
          title: 'Đăng nhập quyền Giáo Viên',
          subtitle: 'Vui lòng nhập thông tin tài khoản Giáo viên.',
          inputLabel: 'Tên tài khoản / Email',
          inputPlaceholder: 'Nhập tên tài khoản...',
        };
    }
  };

  const content = getRoleContent(role);

  return (
    <S.Container>
      {/* Left Column - Interaction Pane */}
      <S.InteractionPane>
        <S.InteractionContent>
          {/* Header */}
          <S.BrandHeader>
            <img
              src="/KinderCare_LogoTextHorizontal.png"
              alt="KinderCare Logo"
              style={{ height: '40px', objectFit: 'contain' }}
            />
          </S.BrandHeader>

          {/* Role Selection */}
          <S.TabGroup>
            <S.TabButtonWrapper>
              <Button
                type="button"
                variant={role === 'admin' ? 'activeTab' : 'tab'}
                onClick={() => handleRoleChange('admin')}
                fullWidth
              >
                IT Admin
              </Button>
            </S.TabButtonWrapper>
            <S.TabButtonWrapper>
              <Button
                type="button"
                variant={role === 'principal' ? 'activeTab' : 'tab'}
                onClick={() => handleRoleChange('principal')}
                fullWidth
              >
                Hiệu Trưởng
              </Button>
            </S.TabButtonWrapper>
            <S.TabButtonWrapper>
              <Button
                type="button"
                variant={role === 'teacher' ? 'activeTab' : 'tab'}
                onClick={() => handleRoleChange('teacher')}
                fullWidth
              >
                Giáo Viên
              </Button>
            </S.TabButtonWrapper>
          </S.TabGroup>

          {/* Titles */}
          <S.FormTitle>{content.title}</S.FormTitle>
          <S.FormSubtitle>{content.subtitle}</S.FormSubtitle>

          {/* Form */}
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
                <label
                  htmlFor="password"
                  style={{ fontSize: '12px', fontWeight: 600, color: '#181C1E' }}
                >
                  Mật khẩu
                </label>
                <S.ForgotPasswordLink href="/forgot-password">Quên mật khẩu?</S.ForgotPasswordLink>
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

            <Button type="submit" variant="primary" fullWidth>
              Truy cập hệ thống
            </Button>
          </S.LoginForm>
        </S.InteractionContent>

        {/* Footer Links */}
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

          <S.GlassItem>
            <S.GlassItemTitle>Bảo mật đa lớp</S.GlassItemTitle>
            <S.GlassItemDesc>
              Hệ thống mã hóa dữ liệu end-to-end đảm bảo an toàn tuyệt đối cho thông tin nhà trường.
            </S.GlassItemDesc>
          </S.GlassItem>

          <S.GlassItem>
            <S.GlassItemTitle>Đồng bộ thời gian thực</S.GlassItemTitle>
            <S.GlassItemDesc>
              Kết nối và truyền tải tức thời dữ liệu giữa ban quản lý, giáo viên và phụ huynh.
            </S.GlassItemDesc>
          </S.GlassItem>

          <S.GlassItem>
            <S.GlassItemTitle>Giám sát hệ thống 24/7</S.GlassItemTitle>
            <S.GlassItemDesc>
              Báo cáo trạng thái hoạt động của các phân hệ tự động, phát hiện và cảnh báo sự cố lập tức.
            </S.GlassItemDesc>
          </S.GlassItem>
        </S.GlassCard>
      </S.VisualizationPane>
    </S.Container>
  );
};
export default LoginView;
