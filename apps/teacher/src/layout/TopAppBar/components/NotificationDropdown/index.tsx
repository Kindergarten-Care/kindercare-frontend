import React, { useRef } from 'react';
import { Bell, Info, Calendar, MessageCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import * as S from './styles';
import { useClickOutside } from '@/hooks/useClickOutside';

interface NotificationDropdownProps {
  onClose: () => void;
}

const DUMMY_NOTIFICATIONS = [
  {
    id: 1,
    type: 'alert' as const,
    title: 'Lưu ý y tế: Bé Bảo Long',
    message: 'Bé bị dị ứng đậu phộng (Rất nghiêm trọng), vui lòng chú ý bữa ăn trưa.',
    time: '10 phút trước',
    isUnread: true,
  },
  {
    id: 2,
    type: 'event' as const,
    title: 'Sự kiện sắp diễn ra',
    message: 'Họp giao ban giáo viên cuối tháng lúc 16:30 chiều nay.',
    time: '2 giờ trước',
    isUnread: true,
  },
  {
    id: 3,
    type: 'message' as const,
    title: 'Tin nhắn từ phụ huynh',
    message: 'Mẹ bé Vy nhắn: "Cô ơi chiều nay mẹ đến đón bé sớm lúc 15:30 nhé".',
    time: '3 giờ trước',
    isUnread: false,
  },
  {
    id: 4,
    type: 'event' as const,
    title: 'Nhắc nhở công việc',
    message: 'Bạn chưa hoàn thành báo cáo đánh giá tuần cho lớp Mầm 1.',
    time: 'Hôm qua',
    isUnread: false,
  }
];

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
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
        <S.MarkReadAction>Đánh dấu đã đọc</S.MarkReadAction>
      </S.Header>
      
      <S.NotificationList>
        {DUMMY_NOTIFICATIONS.map((notif) => (
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
        ))}
      </S.NotificationList>

      <S.Footer>
        <S.ViewAllLink>Xem tất cả thông báo</S.ViewAllLink>
      </S.Footer>
    </S.DropdownContainer>
  );
};
