import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { NotificationDropdown } from './components/NotificationDropdown';
import { useRouter } from '@/i18n/routing';
import { ChevronDown, Menu, Search, Bell } from 'lucide-react';
import { NotificationService, NotificationItem } from '@/services/notifications';

interface TopAppBarProps {
  fullName: string;
  roleTitle: string;
  onMenuClick?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ fullName, roleTitle, onMenuClick }) => {
  const router = useRouter();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifs = async () => {
      setLoading(true);
      const data = await NotificationService.getNotifications();
      setNotifications(data);
      setLoading(false);
    };
    fetchNotifs();
  }, []);

  const handleMarkAllRead = async () => {
    await NotificationService.markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const unreadCount = notifications.filter(n => n.isUnread).length;

  // Helper to get first name
  const getFirstName = (name: string) => {
    if (!name) return 'Giáo viên';
    const parts = name.trim().split(' ');
    return parts[parts.length - 1];
  };

  const getInitials = (name: string) => {
    if (!name) return 'GV';
    return getFirstName(name).charAt(0).toUpperCase();
  };

  return (
    <S.HeaderContainer>
      {/* Search Input / Left Area */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: 1, minWidth: 0 }}>
        {onMenuClick && (
          <S.MenuButton onClick={onMenuClick} aria-label="Open sidebar">
            <Menu size={22} />
          </S.MenuButton>
        )}
        
        <S.SearchWrapper>
          <Search size={19} color="#9CA3AF" strokeWidth={2.2} />
          <S.SearchInput type="text" placeholder="Tìm bé, hoạt động hoặc danh mục…" />
        </S.SearchWrapper>
      </div>

      <div style={{ flex: 1 }}></div>
      
      {/* Actions / Right Area */}
      <S.ActionsSection>
        
        {/* Notification Bell */}
        <S.NotificationWrapper>
          <S.ActionButton aria-label="Notifications" onClick={() => setIsNotifOpen(!isNotifOpen)}>
            <Bell size={20} strokeWidth={2} />
            {unreadCount > 0 && <S.NotificationBadge>{unreadCount}</S.NotificationBadge>}
          </S.ActionButton>
          {isNotifOpen && (
            <NotificationDropdown 
              onClose={() => setIsNotifOpen(false)} 
              notifications={notifications}
              loading={loading}
              onMarkAllRead={handleMarkAllRead}
            />
          )}
        </S.NotificationWrapper>

        {/* Profile Card */}
        <div style={{ position: 'relative' }}>
          <S.ProfileSection onClick={() => router.push('/profile')}>
            <S.ProfileInfo>
              Chào buổi sáng,<br />
              <S.ProfileName>Thầy {getFirstName(fullName)}</S.ProfileName>
            </S.ProfileInfo>
            <S.Avatar>
              {getInitials(fullName)}
            </S.Avatar>
            <ChevronDown size={14} color="#9CA3AF" strokeWidth={2.4} />
          </S.ProfileSection>
        </div>

      </S.ActionsSection>
    </S.HeaderContainer>
  );
};
