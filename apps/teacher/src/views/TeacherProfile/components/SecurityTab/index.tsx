import React, { useState } from 'react';
import * as S from './styles';
import { AuthUser } from '@/contexts/AuthContext';

interface SecurityTabProps {
  user: AuthUser;
}

export const SecurityTab: React.FC<SecurityTabProps> = ({ user }) => {
  const [twoFactorActive, setTwoFactorActive] = useState(true);
  const [emailNotifActive, setEmailNotifActive] = useState(false);

  return (
    <div>
      <S.Section>
        <S.SectionTitle>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Thay đổi mật khẩu đăng nhập
        </S.SectionTitle>
        <S.FlexContainer>
          <S.FormContainer>
            <S.FieldGroup>
              <S.Label>Mật khẩu hiện tại</S.Label>
              <S.Input type="password" placeholder="••••••••" />
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label>Mật khẩu mới</S.Label>
              <S.Input type="password" placeholder="••••••••" />
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label>Xác nhận mật khẩu mới</S.Label>
              <S.Input type="password" placeholder="••••••••" />
            </S.FieldGroup>
            <S.SubmitButton>Lưu thay đổi</S.SubmitButton>
          </S.FormContainer>
          <S.RequirementsCard>
            <S.RequirementTitle>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Yêu cầu mật khẩu
            </S.RequirementTitle>
            <S.RequirementList>
              <S.RequirementItem>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Ít nhất 8 ký tự
              </S.RequirementItem>
              <S.RequirementItem>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                Có ít nhất 1 chữ số
              </S.RequirementItem>
              <S.RequirementItem>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                Có ít nhất 1 ký tự đặc biệt (!@#...)
              </S.RequirementItem>
            </S.RequirementList>
          </S.RequirementsCard>
        </S.FlexContainer>
      </S.Section>

      <S.Section>
        <S.SectionTitle>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Bảo mật 2 lớp & Thông báo
        </S.SectionTitle>
        <S.FlexContainer>
          <S.SettingBox style={{ flex: 1 }}>
            <S.SettingInfo>
              <S.SettingText>
                <S.SettingTitle>Xác thực 2 yếu tố (2FA)</S.SettingTitle>
                <S.SettingDescription>Bảo vệ tài khoản bằng mã xác nhận gửi qua điện thoại</S.SettingDescription>
              </S.SettingText>
            </S.SettingInfo>
            <S.ToggleSwitch $active={twoFactorActive} onClick={() => setTwoFactorActive(!twoFactorActive)} />
          </S.SettingBox>
          <S.SettingBox style={{ flex: 1 }}>
            <S.SettingInfo>
              <S.SettingText>
                <S.SettingTitle>Thông báo đăng nhập</S.SettingTitle>
                <S.SettingDescription>Nhận email khi có thiết bị mới đăng nhập</S.SettingDescription>
              </S.SettingText>
            </S.SettingInfo>
            <S.ToggleSwitch $active={emailNotifActive} onClick={() => setEmailNotifActive(!emailNotifActive)} />
          </S.SettingBox>
        </S.FlexContainer>
      </S.Section>

      <S.Section>
        <S.SectionTitle>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          Thiết bị đang đăng nhập
        </S.SectionTitle>
        <div style={{ border: '1px solid #E5E7EB', borderRadius: '12px' }}>
          <S.DeviceBox>
            <S.SettingInfo>
              <S.DeviceIconWrapper>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </S.DeviceIconWrapper>
              <S.SettingText>
                <S.SettingTitle>Google Chrome - Windows 11</S.SettingTitle>
                <S.SettingDescription>Thiết bị hiện tại • Hồ Chí Minh, Việt Nam</S.SettingDescription>
              </S.SettingText>
            </S.SettingInfo>
          </S.DeviceBox>
          <S.DeviceBox>
            <S.SettingInfo>
              <S.DeviceIconWrapper>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              </S.DeviceIconWrapper>
              <S.SettingText>
                <S.SettingTitle>Safari - iPhone 14 Pro</S.SettingTitle>
                <S.SettingDescription>Hoạt động 2 giờ trước • Hồ Chí Minh, Việt Nam</S.SettingDescription>
              </S.SettingText>
            </S.SettingInfo>
            <S.LogoutButton>Đăng xuất</S.LogoutButton>
          </S.DeviceBox>
        </div>
      </S.Section>
    </div>
  );
};
