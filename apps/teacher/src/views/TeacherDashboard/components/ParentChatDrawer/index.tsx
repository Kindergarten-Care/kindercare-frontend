import React, { useState, useRef, useEffect } from 'react';
import * as S from './styles';

interface Message {
  id: string;
  from: 'parent' | 'me';
  text: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  { id: 'c1', from: 'parent', text: 'Chào cô, sáng nay bé Khang hơi ho, cô để ý giúp em nhé ạ.', time: '07:20' },
  { id: 'c2', from: 'me', text: 'Dạ vâng chị, em sẽ cho bé uống siro lúc 11h và theo dõi thêm ạ.', time: '07:22' },
  { id: 'c3', from: 'parent', text: 'Em cảm ơn cô nhiều ạ! 🥰', time: '07:22' },
];

const QUICK_TEMPLATES = [
  'Dạ vâng chị, em sẽ lưu ý thêm ạ!',
  'Bé Khang hôm nay ăn ngoan lắm nhé chị.',
  'Dạ siro em đã cho bé uống đầy đủ rồi ạ.',
  'Chị yên tâm, có gì em báo liền nha.',
];

export const ParentChatDrawer: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [unread, setUnread] = useState(3);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');

  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat when messages update or chat drawer opens
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
    if (unread > 0) {
      setUnread(0); // Mark all as read when chat is opened
    }
  };

  const getNowTime = () => {
    const d = new Date();
    return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMessage: Message = {
      id: 'c' + Date.now(),
      from: 'me',
      text,
      time: getNowTime(),
    };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage(inputValue);
    }
  };

  const handleTemplateSend = (text: string) => {
    sendMessage(text);
    setQuickOpen(false);
  };

  return (
    <>
      {/* FLOATING MSG TRIGGER */}
      <S.FloatingButton onClick={toggleChat}>
        💬
        {unread > 0 && <S.UnreadBadge>{unread}</S.UnreadBadge>}
      </S.FloatingButton>

      {/* CHAT DRAWER */}
      {chatOpen && (
        <S.ChatDrawerContainer>
          {/* HEADER */}
          <S.ChatHeader>
            <S.ContactAvatar $color="#F9A8D4">
              M
              <S.OnlineIndicator />
            </S.ContactAvatar>
            <S.ContactInfo>
              <S.ContactName>Mẹ bé Khang</S.ContactName>
              <S.ContactStatus>● Đang trực tuyến</S.ContactStatus>
            </S.ContactInfo>
            <S.CloseChatButton onClick={toggleChat}>✕</S.CloseChatButton>
          </S.ChatHeader>

          {/* CHAT BODY */}
          <S.ChatBody ref={chatBodyRef}>
            {messages.map(m => (
              <S.MessageRow key={m.id} $isMe={m.from === 'me'}>
                <div>
                  <S.MessageBubble $isMe={m.from === 'me'}>
                    {m.text}
                  </S.MessageBubble>
                  <S.MessageTime $isMe={m.from === 'me'}>
                    {m.time}
                  </S.MessageTime>
                </div>
              </S.MessageRow>
            ))}
          </S.ChatBody>

          {/* QUICK TEMPLATE RESPONSES */}
          {quickOpen && (
            <S.QuickRepliesContainer>
              <S.QuickRepliesHeader>
                ⚡ Tin nhắn mẫu — chạm để gửi ngay
              </S.QuickRepliesHeader>
              {QUICK_TEMPLATES.map((tpl, i) => (
                <S.QuickReplyButton 
                  key={i} 
                  onClick={() => handleTemplateSend(tpl)}
                >
                  {tpl}
                </S.QuickReplyButton>
              ))}
            </S.QuickRepliesContainer>
          )}

          {/* FOOTER */}
          <S.ChatFooter>
            <S.ToggleQuickButton 
              onClick={() => setQuickOpen(!quickOpen)} 
              title="Tin nhắn mẫu"
            >
              ⚡
            </S.ToggleQuickButton>
            <S.ChatInput 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Nhắn tin cho phụ huynh…"
            />
            <S.SendButton onClick={() => sendMessage(inputValue)}>
              ➤
            </S.SendButton>
          </S.ChatFooter>
        </S.ChatDrawerContainer>
      )}
    </>
  );
};
export default ParentChatDrawer;
