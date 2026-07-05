import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Mail, Bell, Calendar, KeyRound } from 'lucide-react';
import { useTeacherSettings, useUpdateSettings } from '@/hooks/useTeacherQueries';
import { PasswordModal } from './PasswordModal';

const SettingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #F9FAFB;
  border-radius: 14px;
`;

const SettingLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SettingIcon = styled.div<{ $color: string; $bg: string }>`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
`;

const SettingInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SettingTitle = styled.h3`
  font-size: 14.5px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const SettingDesc = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  margin: 2px 0 0 0;
`;

const ToggleSwitch = styled.button<{ $on: boolean }>`
  flex: none;
  position: relative;
  width: 48px;
  height: 28px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: ${props => props.$on ? '#005A36' : '#D1D5DB'};
  transition: background 0.25s;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${props => props.$on ? '23px' : '3px'};
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const PasswordButton = styled.button`
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid #E6EEE9;
  background: #fff;
  color: #374151;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F6FAF7;
    border-color: #D1E0D7;
  }
`;

export const SettingsTab: React.FC = () => {
  const { data: initialSettings, isLoading } = useTeacherSettings();
  const updateSettingsMutation = useUpdateSettings();

  const [settings, setSettings] = useState({
    pushEnabled: true,
    emailEnabled: true,
    weeklyReportEnabled: false,
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Update local state when API data arrives
  useEffect(() => {
    if (initialSettings) {
      setSettings({
        pushEnabled: initialSettings.pushEnabled,
        emailEnabled: initialSettings.emailEnabled,
        weeklyReportEnabled: initialSettings.weeklyReportEnabled,
      });
    }
  }, [initialSettings]);

  const handleToggle = (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    // Call API to update server
    updateSettingsMutation.mutate(newSettings);
  };

  if (isLoading) return <div>Đang tải thông tin cài đặt...</div>;

  const items = [
    { k: 'emailEnabled', label: 'Thông báo qua Email', desc: 'Nhận cập nhật lớp học qua email', icon: <Mail size={20} />, color: '#2563EB', bg: '#E3EDFD' },
    { k: 'pushEnabled', label: 'Thông báo đẩy trên App', desc: 'Báo tức thì khi có sự kiện mới', icon: <Bell size={20} />, color: '#005A36', bg: '#E6F3ED' },
    { k: 'weeklyReportEnabled', label: 'Báo cáo tuần', desc: 'Tổng hợp hoạt động cuối tuần', icon: <Calendar size={20} />, color: '#D97706', bg: '#FEF3C7' },
  ];

  return (
    <SettingsList>
      {items.map(t => (
        <SettingItem key={t.k}>
          <SettingLeft>
            <SettingIcon $color={t.color} $bg={t.bg}>{t.icon}</SettingIcon>
            <SettingInfo>
              <SettingTitle>{t.label}</SettingTitle>
              <SettingDesc>{t.desc}</SettingDesc>
            </SettingInfo>
          </SettingLeft>
          <ToggleSwitch 
            $on={settings[t.k as keyof typeof settings]} 
            onClick={() => handleToggle(t.k as keyof typeof settings)} 
          />
        </SettingItem>
      ))}

      <SettingItem style={{ marginTop: '8px' }}>
        <SettingLeft>
          <SettingIcon $color="#DC2626" $bg="#FEE2E2"><KeyRound size={20} /></SettingIcon>
          <SettingInfo>
            <SettingTitle>Mật khẩu</SettingTitle>
            <SettingDesc>Đổi mật khẩu tài khoản của bạn</SettingDesc>
          </SettingInfo>
        </SettingLeft>
        <PasswordButton onClick={() => setIsPasswordModalOpen(true)}>Đổi mật khẩu</PasswordButton>
      </SettingItem>

      {isPasswordModalOpen && (
        <PasswordModal onClose={() => setIsPasswordModalOpen(false)} />
      )}
    </SettingsList>
  );
};
