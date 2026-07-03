'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useDispatch, useSelector } from 'react-redux';
import { notificationService, type NotificationDto } from '@kindercare/core';
import {
  fetchNotifications,
  markOneRead,
  markAllRead,
  selectNotifications,
  selectNotifLoading,
  selectUnreadCount,
} from '@/store/slices/notificationSlice';
import type { AppDispatch } from '@/store';
import * as S from './styles';
import { X } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function relativeTime(ts: number, isVi: boolean): string {
  const diff = Math.floor(Date.now() / 1000) - ts;
  if (diff < 60)    return isVi ? 'Vừa xong' : 'Just now';
  if (diff < 3600)  return isVi ? `${Math.floor(diff / 60)} phút trước` : `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return isVi ? `${Math.floor(diff / 3600)} giờ trước` : `${Math.floor(diff / 3600)}h ago`;
  return isVi ? `${Math.floor(diff / 86400)} ngày trước` : `${Math.floor(diff / 86400)}d ago`;
}

const TYPE_LABEL: Record<string, string> = {
  ATTENDANCE:      'Điểm danh',
  LEAVE_REQUEST:   'Đơn nghỉ',
  HEALTH_ALERT:    'Sức khỏe',
  MEDICAL_REQUEST: 'Y tế',
};

const getIcon = (type: string) => {
  switch (type) {
    case 'ATTENDANCE':
      return (
        <S.IconWrapper $type="ATTENDANCE">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            <path d="m9 14 2 2 4-4" />
          </svg>
        </S.IconWrapper>
      );
    case 'LEAVE_REQUEST':
      return (
        <S.IconWrapper $type="LEAVE_REQUEST">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
          </svg>
        </S.IconWrapper>
      );
    case 'HEALTH_ALERT':
    case 'MEDICAL_REQUEST':
      return (
        <S.IconWrapper $type="HEALTH_ALERT">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
          </svg>
        </S.IconWrapper>
      );
    default:
      return (
        <S.IconWrapper $type="DEFAULT">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </S.IconWrapper>
      );
  }
};

// ─── Component ────────────────────────────────────────────────────────────────

interface NotificationPopupProps {
  isOpen:  boolean;
  onClose: () => void;
}

export const NotificationPopup: React.FC<NotificationPopupProps> = ({ isOpen, onClose }) => {
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const items   = useSelector(selectNotifications);
  const loading = useSelector(selectNotifLoading);
  const unread  = useSelector(selectUnreadCount);

  const [shouldRender, setShouldRender] = React.useState(isOpen);
  const [isClosing, setIsClosing]       = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      if (items.length === 0) dispatch(fetchNotifications());
    } else if (shouldRender) {
      setIsClosing(true);
      const t = setTimeout(() => { setShouldRender(false); setIsClosing(false); }, 300);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, shouldRender, dispatch]);

  if (!shouldRender) return null;

  const isVi = locale !== 'en';

  const handleMarkOne = (item: NotificationDto) => {
    if (item.isRead === 0) {
      dispatch(markOneRead(item.notifId));
      notificationService.markAsRead(item.notifId).catch(() => dispatch(fetchNotifications()));
    }

    switch (item.type) {
      case 'ATTENDANCE':
        router.push('/attendance');
        break;
      case 'LEAVE_REQUEST':
      case 'MEDICAL_REQUEST':
      case 'HEALTH_ALERT': {
        let url = '/';
        try {
          let data: any = {};
          if (typeof item.dataPayload === 'string') {
            data = JSON.parse(item.dataPayload);
          } else {
            data = item.dataPayload || {};
          }
          if (item.type === 'LEAVE_REQUEST') {
            url = data.requestId ? `/?openLeaveRequest=${data.requestId}` : `/?openRequestList=leave`;
          } else if (item.type === 'HEALTH_ALERT' || item.type === 'MEDICAL_REQUEST') {
            url = data.requestId ? `/?openMedRequest=${data.requestId}` : `/?openRequestList=medical`;
          }
        } catch (e) {
          console.error('Failed to extract data payload', e);
        }
        router.push(url);
        break;
      }
    }
    onClose();
  };

  const handleMarkAll = () => {
    dispatch(markAllRead());
    notificationService.markAllAsRead().catch(() => dispatch(fetchNotifications()));
  };

  return (
    <S.Overlay onClick={onClose} $isClosing={isClosing}>
      <S.ModalContainer onClick={e => e.stopPropagation()} $isClosing={isClosing}>

        {/* Header */}
        <S.HeadRow>
          <S.TitleWrap>
            <S.Title>{isVi ? 'Thông báo' : 'Notifications'}</S.Title>
            {unread > 0 && <S.Badge>{unread} {isVi ? 'chưa đọc' : 'unread'}</S.Badge>}
          </S.TitleWrap>
          <S.HeadActions>
            {unread > 0 && (
              <S.MarkAllBtn onClick={handleMarkAll}>
                {isVi ? 'Đọc tất cả' : 'Mark all read'}
              </S.MarkAllBtn>
            )}
            <S.CloseBtn onClick={onClose} aria-label="Đóng">
              <X size={16} />
            </S.CloseBtn>
          </S.HeadActions>
        </S.HeadRow>

        {/* Content */}
        {loading && items.length === 0 ? (
          <S.NotiList>
            {[...Array(4)].map((_, i) => <S.SkeletonItem key={i} />)}
          </S.NotiList>
        ) : items.length === 0 ? (
          <S.EmptyWrap>
            <S.SvgWrapper>
              <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="80" cy="80" r="64" fill="url(#r0)" opacity="0.4" />
                <circle cx="80" cy="80" r="48" fill="url(#r1)" opacity="0.6" />
                <path d="M42 48L44 43L49 41L44 39L42 34L40 39L35 41L40 43L42 48Z" fill="#F59E0B" opacity="0.85" />
                <path d="M118 112L119.5 108L123.5 106.5L119.5 105L118 101L116.5 105L112.5 106.5L116.5 108L118 112Z" fill="#F59E0B" opacity="0.85" />
                <ellipse cx="80" cy="122" rx="28" ry="6" fill="#D1E2D8" />
                <g filter="url(#bs)">
                  <path d="M80 32C76.7 32 74 34.7 74 38V42H86V38C86 34.7 83.3 32 80 32Z" fill="#005A36" />
                  <path d="M80 42C64.5 42 60 54 60 72C60 90 56 98 52 102H108C104 98 100 90 100 72C100 54 95.5 42 80 42Z" fill="url(#bg)" />
                  <path d="M50 102C50 100.9 50.9 100 52 100H108C109.1 100 110 100.9 110 102C110 103.1 109.1 104 108 104H52C50.9 104 50 103.1 50 102Z" fill="#004428" />
                  <path d="M74 104C74 104 74 114 80 114C86 114 86 104 86 104H74Z" fill="#F59E0B" />
                </g>
                <defs>
                  <radialGradient id="r0" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(80 80) rotate(90) scale(64)">
                    <stop stopColor="#E6F3ED" /><stop offset="1" stopColor="#E6F3ED" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="r1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(80 80) rotate(90) scale(48)">
                    <stop stopColor="#D1E2D8" /><stop offset="1" stopColor="#D1E2D8" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="bg" x1="60" y1="42" x2="100" y2="102" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#006C41" /><stop offset="0.6" stopColor="#005A36" /><stop offset="1" stopColor="#004428" />
                  </linearGradient>
                  <filter id="bs" x="46" y="30" width="68" height="92" filterUnits="userSpaceOnUse">
                    <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#002D1B" floodOpacity="0.15" />
                  </filter>
                </defs>
              </svg>
            </S.SvgWrapper>
            <S.EmptyTitle>{isVi ? 'Không có thông báo nào mới' : 'No new notifications'}</S.EmptyTitle>
            <S.EmptyDesc>
              {isVi
                ? 'Hệ thống sẽ cập nhật tại đây khi có thông báo mới từ nhà trường về hoạt động học tập và sinh hoạt của bé.'
                : 'We will notify you here when there are new announcements, activities, or learning updates for your child.'}
            </S.EmptyDesc>
          </S.EmptyWrap>
        ) : (
          <S.NotiList>
            {items.map((item, i) => (
              <S.NotiItem
                key={`${item.notifId}-${i}`}
                $unread={item.isRead === 0}
                $critical={item.isCritical === 1}
                onClick={() => handleMarkOne(item)}
              >
                <S.IconContainer>
                  {getIcon(item.type)}
                  {item.isRead === 0 && <S.UnreadDot />}
                </S.IconContainer>
                <S.NotiMeta>
                  <S.NotiHeader>
                    <S.NotiTitle $critical={item.isCritical === 1}>{item.title}</S.NotiTitle>
                    {item.type in TYPE_LABEL && (
                      <S.TypeTag $type={item.type}>{TYPE_LABEL[item.type]}</S.TypeTag>
                    )}
                  </S.NotiHeader>
                  <S.NotiMsg>{item.message}</S.NotiMsg>
                  <S.NotiTime>{relativeTime(item.createdAt, isVi)}</S.NotiTime>
                </S.NotiMeta>
              </S.NotiItem>
            ))}
          </S.NotiList>
        )}

      </S.ModalContainer>
    </S.Overlay>
  );
};
