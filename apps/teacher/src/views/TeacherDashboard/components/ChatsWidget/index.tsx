'use client';

import React from 'react';
import * as S from './styles';

interface ChatItem {
  id: string;
  name: string;
  text: string;
  time: string;
  initial: string;
  grad: string;
}

interface ChatsWidgetProps {
  onOpenChat: (name: string) => void;
}

const CHATS_DATA: ChatItem[] = [
  { id: '1', name: 'Mẹ bé Gia Bảo', text: 'Bé Gia Bảo hôm nay ngoan không cô? Ăn hết suất không ạ?', time: '08:15', initial: 'B', grad: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' },
  { id: '2', name: 'Bố bé Bảo Long', text: 'Chào thầy Huy, chiều nay mẹ bé qua đón trễ tí nhé ạ.', time: '08:05', initial: 'L', grad: 'linear-gradient(135deg, #10B981, #047857)' },
  { id: '3', name: 'Mẹ bé Thảo My', text: 'Cô ơi gửi giúp em hình bé học vẽ hôm nay với nha cô.', time: '07:55', initial: 'M', grad: 'linear-gradient(135deg, #F59E0B, #B45309)' },
];

export const ChatsWidget: React.FC<ChatsWidgetProps> = ({ onOpenChat }) => {
  return (
    <S.WidgetContainer>
      <S.WidgetHeader>
        <S.HeaderIconWrapper>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-9 8.34 8.5 8.5 0 0 1-3.6-.8L3 21l1.96-4.4A8.45 8.45 0 0 1 12 3a8.38 8.38 0 0 1 9 8.5z" />
          </svg>
        </S.HeaderIconWrapper>
        <S.WidgetTitle>Tin nhắn mới</S.WidgetTitle>
        <S.UnreadCount>3</S.UnreadCount>
      </S.WidgetHeader>

      <S.ChatsList>
        {CHATS_DATA.map((c) => (
          <S.ChatButton key={c.id} onClick={() => onOpenChat(c.name)}>
            <S.AvatarCircle $background={c.grad}>{c.initial}</S.AvatarCircle>
            <S.ChatContent>
              <S.ChatHeaderRow>
                <S.PartnerName>{c.name}</S.PartnerName>
                <S.MessageTime>{c.time}</S.MessageTime>
              </S.ChatHeaderRow>
              <S.MessagePreview>{c.text}</S.MessagePreview>
            </S.ChatContent>
          </S.ChatButton>
        ))}
      </S.ChatsList>
    </S.WidgetContainer>
  );
};
