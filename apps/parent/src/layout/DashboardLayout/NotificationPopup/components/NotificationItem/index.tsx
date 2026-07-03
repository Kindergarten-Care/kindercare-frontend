'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import type { NotificationDto } from '@kindercare/core';
import * as S from './styles';
import { NotificationIcon } from '../NotificationIcon';
import { relativeTime, TYPE_LABEL } from '../../utils/notificationHelpers';

interface NotificationItemProps {
  item: NotificationDto;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

export function NotificationItem({ item, onClick, onDelete }: NotificationItemProps) {
  const locale = useLocale();
  const isVi = locale !== 'en';

  return (
    <S.NotiItem
      $unread={item.isRead === 0}
      $critical={item.isCritical === 1}
      onClick={onClick}
    >
      <S.DeleteButton
        onClick={(e) => {
          e.stopPropagation();
          onDelete(e);
        }}
        aria-label={isVi ? 'Xóa thông báo' : 'Delete notification'}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </S.DeleteButton>
      <S.IconContainer>
        <NotificationIcon type={item.type} />
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
  );
}
