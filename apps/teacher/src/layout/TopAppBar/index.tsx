import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { NotificationPopup } from './components/NotificationPopup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, prependItem, selectUnreadCount } from '@/store/slices/notificationSlice';
import type { AppDispatch } from '@/store';
import { useRouter } from '@/i18n/routing';
import { ChevronDown, Menu, Search, Bell } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTeacherProfile } from '@/hooks/useTeacherQueries';
import { initPushNotification, socketService } from '@kindercare/core';
import { useSocketContext } from '@/contexts/SocketContext';

interface TopAppBarProps {
  fullName: string;
  roleTitle: string;
  onMenuClick?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ fullName, roleTitle, onMenuClick }) => {
  const router = useRouter();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { data: profile } = useTeacherProfile();
  
  const avatarUrl = profile?.avatarUrl;
  
  const dispatch = useDispatch<AppDispatch>();
  const unreadCount = useSelector(selectUnreadCount);
  const { isConnected } = useSocketContext();

  // Lấy inbox khi mount
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  // Lắng nghe Push FCM Foreground
  useEffect(() => {
    initPushNotification().catch(() => {});
    let counter = 0;
    const handler = (e: Event) => {
      const payload = (e as CustomEvent).detail;
      const notif = {
        notifId:     --counter,
        userId:      0,
        title:       payload.notification?.title ?? '',
        message:     payload.notification?.body  ?? '',
        type:        payload.data?.type           ?? 'OTHER',
        isRead:      0 as 0 | 1,
        isCritical:  Number(payload.data?.isCritical ?? 0) as 0 | 1,
        dataPayload: payload.data  ?? {},
        createdAt:   Math.floor(Date.now() / 1000),
        updatedAt:   Math.floor(Date.now() / 1000),
      };
      // Ngăn prepend nếu payload trống
      if (notif.title || notif.message) {
        dispatch(prependItem(notif as any));
        
        toast.info(notif.title || 'Bạn có thông báo mới!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
    window.addEventListener('kc:push:message', handler);
    return () => window.removeEventListener('kc:push:message', handler);
  }, [dispatch]);

  // Lắng nghe Socket sự kiện new_notification
  useEffect(() => {
    if (!isConnected) return;
    const socket = socketService.getSocket();
    if (!socket) return;

    const onNewNotification = (payload: any) => {
      let dataObj = payload.dataPayload || {};
      if (typeof dataObj === 'string') {
        try { dataObj = JSON.parse(dataObj); } catch(e) {}
      }
      const notif = {
        ...payload,
        dataPayload: dataObj,
      };
      
      // Ngăn prepend nếu payload trống
      if (notif.title || notif.message) {
        dispatch(prependItem(notif as any));
        
        toast.info(notif.title || 'Bạn có thông báo mới!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    socket.on('new_notification', onNewNotification);
    return () => {
      socket.off('new_notification', onNewNotification);
    };
  }, [isConnected, dispatch]);

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
          <NotificationPopup isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
        </S.NotificationWrapper>

        {/* Profile Card */}
        <div style={{ position: 'relative' }}>
          <S.ProfileSection onClick={() => router.push('/profile')}>
            <S.ProfileInfo>
              Chào buổi sáng,<br />
              <S.ProfileName>Thầy {getFirstName(fullName)}</S.ProfileName>
            </S.ProfileInfo>
            <S.Avatar style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {avatarUrl ? (
                <img src={avatarUrl} alt={fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                getInitials(fullName)
              )}
            </S.Avatar>
            <ChevronDown size={14} color="#9CA3AF" strokeWidth={2.4} />
          </S.ProfileSection>
        </div>
      </S.ActionsSection>
    </S.HeaderContainer>
  );
};
