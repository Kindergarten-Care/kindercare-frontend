import React, { useRef } from 'react';
import { Bell, Info, Calendar, MessageCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import * as S from './styles';
import { useClickOutside } from '@/hooks/useClickOutside';
import { NotificationItem } from '@/services/notifications';

interface NotificationDropdownProps {
  onClose: () => void;
  notifications: NotificationItem[];
  loading: boolean;
  onMarkAllRead: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ 
  onClose, 
  notifications, 
  loading, 
  onMarkAllRead 
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, onClose);

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle size={20} />;
      case 'message':
        return <MessageCircle size={20} />;
      case 'event':
        return <Calendar size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <S.DropdownContainer ref={dropdownRef}>
      <S.Header>
        <S.Title>Thông báo</S.Title>
        <S.MarkReadAction onClick={onMarkAllRead}>Đánh dấu đã đọc</S.MarkReadAction>
      </S.Header>
      
      <S.NotificationList>
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280', fontSize: '13px' }}>Đang tải...</div>
        ) : notifications.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280', fontSize: '13px' }}>Không có thông báo mới</div>
        ) : (
          notifications.map((notif) => (
            <S.NotificationItem key={notif.id} $isUnread={notif.isUnread}>
              <S.IconContainer $type={notif.type}>
                {getIcon(notif.type)}
              </S.IconContainer>
              <S.ItemContent>
                <S.ItemTitle $isUnread={notif.isUnread}>{notif.title}</S.ItemTitle>
                <S.ItemMessage>{notif.message}</S.ItemMessage>
                <S.ItemTime>{notif.time}</S.ItemTime>
              </S.ItemContent>
              {notif.isUnread && <S.UnreadDot />}
            </S.NotificationItem>
          ))
        )}
      </S.NotificationList>

      <S.Footer>
        <S.ViewAllLink>Xem tất cả thông báo</S.ViewAllLink>
      </S.Footer>
    </S.DropdownContainer>
  );
};
