'use client';

import React, { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { fetchNotifications } from '@/store/slices/notificationSlice';
import { useNotificationActions } from './hooks/useNotificationActions';
import { NOTIF_TABS } from './utils/notificationHelpers';
import { NotificationItem } from './components/NotificationItem';
import { IconClose } from '@/assets/icons/dashboard';
import * as S from './styles';

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ isOpen, onClose }) => {
  const locale = useLocale();
  const isVi = locale !== 'en';

  const {
    items,
    filteredItems,
    loading,
    unread,
    activeTab,
    setActiveTab,
    handleMarkOne,
    handleMarkAll,
    handleDeleteOne,
    handleDeleteAll,
    dispatch,
  } = useNotificationActions();

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      if (items.length === 0) {
        dispatch(fetchNotifications());
      }
    } else if (shouldRender) {
      setIsClosing(true);
      const t = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen, shouldRender, items.length, dispatch]);

  if (!shouldRender) return null;

  const handleItemClick = (item: any) => {
    handleMarkOne(item);
    onClose();
  };

  return (
    <S.Overlay onClick={onClose} $isClosing={isClosing}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()} $isClosing={isClosing}>
        {/* Header */}
        <S.HeadRow>
          <S.TitleWrap>
            <S.Title>{isVi ? 'Thông báo' : 'Notifications'}</S.Title>
            {unread > 0 && (
              <S.Badge>
                {unread} {isVi ? 'chưa đọc' : 'unread'}
              </S.Badge>
            )}
          </S.TitleWrap>
          <S.HeadActions>
            {unread > 0 && (
              <S.MarkAllBtn onClick={handleMarkAll}>
                {isVi ? 'Đọc tất cả' : 'Mark all read'}
              </S.MarkAllBtn>
            )}
            <S.CloseBtn onClick={onClose} aria-label="Đóng">
              <IconClose size={16} />
            </S.CloseBtn>
          </S.HeadActions>
        </S.HeadRow>

        {/* Filter Tabs */}
        <S.TabsContainer>
          {NOTIF_TABS.map((tab) => (
            <S.TabButton
              key={tab.id}
              $active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {isVi ? tab.labelVi : tab.labelEn}
            </S.TabButton>
          ))}
        </S.TabsContainer>

        {/* Action Bar with Delete All */}
        {items.length > 0 && (
          <S.ActionBar>
            <S.DeleteAllBtn onClick={handleDeleteAll}>
              {isVi ? 'Xóa tất cả thông báo' : 'Delete all notifications'}
            </S.DeleteAllBtn>
          </S.ActionBar>
        )}

        {/* Content */}
        {loading && items.length === 0 ? (
          <S.NotiList>
            {[...Array(4)].map((_, i) => (
              <S.SkeletonItem key={i} />
            ))}
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
                    <stop stopColor="#E6F3ED" />
                    <stop offset="1" stopColor="#E6F3ED" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="r1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(80 80) rotate(90) scale(48)">
                    <stop stopColor="#D1E2D8" />
                    <stop offset="1" stopColor="#D1E2D8" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="bg" x1="60" y1="42" x2="100" y2="102" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#006C41" />
                    <stop offset="0.6" stopColor="#005A36" />
                    <stop offset="1" stopColor="#004428" />
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
        ) : filteredItems.length === 0 ? (
          <S.EmptyWrap style={{ padding: '80px 24px' }}>
            <span style={{ fontSize: '36px', marginBottom: '16px', display: 'block' }}>📬</span>
            <S.EmptyTitle>{isVi ? 'Không có thông báo' : 'No notifications'}</S.EmptyTitle>
            <S.EmptyDesc>
              {isVi
                ? 'Không tìm thấy thông báo nào trong phân loại này.'
                : 'There are no notifications in this category yet.'}
            </S.EmptyDesc>
          </S.EmptyWrap>
        ) : (
          <S.NotiList>
            {filteredItems.map((item, i) => (
              <NotificationItem
                key={`${item.notifId}-${i}`}
                item={item}
                onClick={() => handleItemClick(item)}
                onDelete={() => handleDeleteOne(item.notifId)}
              />
            ))}
          </S.NotiList>
        )}
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default NotificationPopup;
