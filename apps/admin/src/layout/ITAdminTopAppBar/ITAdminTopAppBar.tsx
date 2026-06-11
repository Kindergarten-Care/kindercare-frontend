'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  TopBarContainer,
  ProductName,
  TrailingActions,
  IconButton,
  NotificationBadge,
  ProfileAvatar,
  NotificationDropdown,
  DropdownHeader,
  DropdownTitle,
  MarkReadLink,
  NotificationItem,
  NotifIcon,
  NotifContent,
  NotifTitle,
  NotifTime,
  ViewAllButton,
} from './styles';

interface Notification {
  id: string;
  title: string;
  time: string;
  iconColor: string;
  icon: React.ReactNode;
}

const BellIcon: React.FC = () => (
  <svg viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0a6 6 0 00-6 6v4l-2 3h16l-2-3V6a6 6 0 00-6-6zM5.5 17a2.5 2.5 0 005 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SettingsIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 1v2M10 17v2M17.07 2.93l-1.41 1.41M4.34 15.66l-1.41 1.41M19 10h-2M3 10H1M17.07 17.07l-1.41-1.41M4.34 4.34L2.93 2.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HelpIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.5 8a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="15" r="0.75" fill="currentColor" />
  </svg>
);

const AlertTriangleIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1l7 13H1L8 1z" stroke="#ef4444" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8 6v3M8 11.5v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckCircleIcon: React.FC = () => (
  <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8.5" cy="8.5" r="7.5" stroke="#16a34a" strokeWidth="1.5" />
    <path d="M5.5 8.5l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InfoIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="#eab308" strokeWidth="1.5" />
    <path d="M8 11V8M8 5.5v-.5" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Phát hiện đăng nhập lạ từ IP 192.x.x',
    time: '10 phút trước',
    iconColor: '#fee2e2',
    icon: <AlertTriangleIcon />,
  },
  {
    id: '2',
    title: 'Backup CSDL thành công',
    time: '2 giờ trước',
    iconColor: '#dcfce7',
    icon: <CheckCircleIcon />,
  },
  {
    id: '3',
    title: 'Giáo viên Lan Anh xin nghỉ phép',
    time: 'Hôm qua',
    iconColor: '#fef9c3',
    icon: <InfoIcon />,
  },
];

export default function ITAdminTopAppBar(): React.ReactElement {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <TopBarContainer>
      <ProductName>Admin Workspace</ProductName>
      <TrailingActions>
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <IconButton
            onClick={() => setShowNotifications((prev) => !prev)}
            aria-label="Notifications"
          >
            <BellIcon />
            <NotificationBadge />
          </IconButton>

          {showNotifications && (
            <NotificationDropdown>
              <DropdownHeader>
                <DropdownTitle>Thông báo mới (3)</DropdownTitle>
                <MarkReadLink>Đánh dấu đã đọc</MarkReadLink>
              </DropdownHeader>
              {notifications.map((notif) => (
                <NotificationItem key={notif.id}>
                  <NotifIcon $color={notif.iconColor}>{notif.icon}</NotifIcon>
                  <NotifContent>
                    <NotifTitle>{notif.title}</NotifTitle>
                    <NotifTime>{notif.time}</NotifTime>
                  </NotifContent>
                </NotificationItem>
              ))}
              <ViewAllButton>Xem tất cả thông báo</ViewAllButton>
            </NotificationDropdown>
          )}
        </div>

        <IconButton aria-label="Settings">
          <SettingsIcon />
        </IconButton>

        <IconButton aria-label="Help">
          <HelpIcon />
        </IconButton>

        <ProfileAvatar>AD</ProfileAvatar>
      </TrailingActions>
    </TopBarContainer>
  );
}
