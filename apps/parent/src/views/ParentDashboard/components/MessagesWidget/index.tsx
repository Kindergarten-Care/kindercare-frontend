import React from 'react';
import * as S from './styles';
import { MessageInfo } from '@/config/types/dashboard';

interface MessagesWidgetProps {
  messages: MessageInfo[];
}

const MessagesWidget: React.FC<MessagesWidgetProps> = ({ messages }) => {
  const unreadCount = messages.filter(m => m.unread).length;

  return (
    <S.Card>
      <S.SectionHead>
        <S.SectionTitle>
          <span>💬</span> Tin nhắn mới nhất {unreadCount > 0 && `(${unreadCount})`}
        </S.SectionTitle>
        <S.SectionLink>Mở hộp thư &rarr;</S.SectionLink>
      </S.SectionHead>

      <div>
        {messages.map((msg) => (
          <S.MsgItem key={msg.id} $unread={msg.unread}>
            <S.MsgAv $bg={msg.avatarColor}>{msg.avatar}</S.MsgAv>
            <S.MsgContent>
              <S.MsgHeader>
                <S.MsgName className="msg-name">{msg.sender}</S.MsgName>
                <S.MsgTime className="msg-time">{msg.time}</S.MsgTime>
              </S.MsgHeader>
              <S.MsgPreview className="msg-prev">{msg.preview}</S.MsgPreview>
            </S.MsgContent>
            {msg.unread && <S.UnreadDot />}
          </S.MsgItem>
        ))}
      </div>
    </S.Card>
  );
};

export default MessagesWidget;
