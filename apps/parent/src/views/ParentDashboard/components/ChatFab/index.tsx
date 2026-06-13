'use client';

import React, { useState, useRef, useEffect } from 'react';
import * as S from './styles';
import { MessageInfo } from '@/config/types/dashboard';
import { IconChat, IconClose, IconSend } from '@/assets/icons/dashboard';

interface ChatFabProps {
  teacher: string;
  initialMessages: MessageInfo[];
  unreadCount?: number;
  classroom?: string;
}

const getInitials = (name: string): string => {
  if (!name) return '';
  const cleanName = name.replace(/^(cô|thầy|anh|chị|ông|bà)\s+/i, '').trim();
  const parts = cleanName.split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  const firstInitial = parts[0].charAt(0).toUpperCase();
  const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};

const ChatFab: React.FC<ChatFabProps> = ({ teacher, initialMessages, unreadCount = 2, classroom }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageInfo[]>(initialMessages);
  const [draft, setDraft] = useState<string>('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, messages]);

  const send = (): void => {
    const text = draft.trim();
    if (!text) return;
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'Phụ huynh',
        avatar: '👩',
        preview: text,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        unread: false,
        isMe: true,
      },
    ]);
    setDraft('');
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') send();
  };

  return (
    <>
      <S.Fab $hidden={open} onClick={() => setOpen(true)} aria-label="Nhắn tin với giáo viên">
        <IconChat size={22} color="#fff" />
        {unreadCount > 0 && <S.FabBadge>{unreadCount}</S.FabBadge>}
      </S.Fab>

      {open && (
        <S.Panel>
          <S.PanelHead>
            <S.TeacherAv>{getInitials(teacher)}</S.TeacherAv>
            <S.TeacherInfo>
              <S.TeacherName>{teacher}</S.TeacherName>
              <S.TeacherStatus>
                Đang hoạt động {classroom ? `· ${classroom}` : ''}
              </S.TeacherStatus>
            </S.TeacherInfo>
            <S.CloseBtn onClick={() => setOpen(false)}>
              <IconClose size={16} />
            </S.CloseBtn>
          </S.PanelHead>

          <S.Messages>
            {messages.map(msg => (
              <S.Bubble key={msg.id} $me={!!msg.isMe}>
                <S.BubbleText $me={!!msg.isMe}>{msg.preview}</S.BubbleText>
                <S.BubbleMeta $me={!!msg.isMe}>
                  {msg.time}
                </S.BubbleMeta>
              </S.Bubble>
            ))}
            <div ref={bottomRef} />
          </S.Messages>

          <S.InputRow>
            <S.Input
              placeholder="Nhắn tin cho cô..."
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={handleKey}
            />
            <S.SendBtn onClick={send} disabled={!draft.trim()}>
              <IconSend size={16} />
            </S.SendBtn>
          </S.InputRow>
        </S.Panel>
      )}
    </>
  );
};

export default ChatFab;
