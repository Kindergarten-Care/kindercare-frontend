import React, { useState, useRef, useEffect } from 'react';
import * as S from './styles';

interface Message {
  id: string;
  from: 'parent' | 'me';
  text: string;
  time: string;
}

const MESSAGES_BY_PARTNER: Record<string, Message[]> = {
  'Mẹ bé Gia Bảo': [
    { id: 'gb1', from: 'parent', text: 'Bé Gia Bảo hôm nay ngoan không cô? Ăn hết suất không ạ?', time: '08:15' },
    { id: 'gb2', from: 'me', text: 'Dạ bé ăn rất giỏi, chơi ngoan và nghe lời cô lắm chị nha!', time: '08:20' }
  ],
  'Bố bé Bảo Long': [
    { id: 'bl1', from: 'parent', text: 'Chào thầy Huy, chiều nay mẹ bé qua đón trễ tí nhé ạ.', time: '08:05' },
    { id: 'bl2', from: 'me', text: 'Dạ vâng lớp mình trả trẻ tới 17h30 nên anh chị yên tâm ạ.', time: '08:10' }
  ],
  'Mẹ bé Thảo My': [
    { id: 'tm1', from: 'parent', text: 'Cô ơi gửi giúp em hình bé học vẽ hôm nay với nha cô.', time: '07:55' },
    { id: 'tm2', from: 'me', text: 'Dạ chút nữa giờ trả trẻ em sẽ gửi hình bé vẽ lên hệ thống ạ!', time: '08:00' }
  ]
};

const INITIAL_MESSAGES: Message[] = [
  { id: 'c1', from: 'parent', text: 'Chào cô, sáng nay bé Khang hơi ho, cô để ý giúp em nhé ạ.', time: '07:20' },
  { id: 'c2', from: 'me', text: 'Dạ vâng chị, em sẽ cho bé uống siro lúc 11h và theo dõi thêm ạ.', time: '07:22' },
  { id: 'c3', from: 'parent', text: 'Em cảm ơn cô nhiều ạ! 🥰', time: '07:22' },
];

const QUICK_TEMPLATES = [
  'Dạ vâng chị, em sẽ lưu ý thêm ạ!',
  'Bé hôm nay ăn ngoan lắm nhé chị.',
  'Dạ siro em đã cho bé uống đầy đủ rồi ạ.',
  'Chị yên tâm, có gì em báo liền nha.',
];

interface ParentChatDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  chatPartnerName?: string;
}

export const ParentChatDrawer: React.FC<ParentChatDrawerProps> = ({
  isOpen,
  onClose,
  onOpen,
  chatPartnerName = 'Mẹ bé Khang'
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [unread, setUnread] = useState(3);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const isChatOpen = isOpen !== undefined ? isOpen : internalOpen;

  // Load chat messages when partner name changes
  useEffect(() => {
    if (MESSAGES_BY_PARTNER[chatPartnerName]) {
      setMessages(MESSAGES_BY_PARTNER[chatPartnerName]);
    } else {
      setMessages(INITIAL_MESSAGES);
    }
  }, [chatPartnerName]);

  // Auto-scroll to bottom of chat when messages update or chat drawer opens
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isChatOpen]);

  const toggleChat = () => {
    if (isChatOpen) {
      if (onClose) onClose();
      else setInternalOpen(false);
    } else {
      if (onOpen) onOpen();
      else setInternalOpen(true);
    }
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

  const partnerInitial = chatPartnerName.trim().split(' ').pop()?.charAt(0).toUpperCase() || 'M';

  return (
    <>
      {/* FLOATING MSG TRIGGER */}
      <S.FloatingButton onClick={toggleChat}>
        💬
        {unread > 0 && <S.UnreadBadge>{unread}</S.UnreadBadge>}
      </S.FloatingButton>

      {/* CHAT DRAWER */}
      {isChatOpen && (
        <S.ChatDrawerContainer>
          {/* HEADER */}
          <S.ChatHeader>
            <S.ContactAvatar $color="#F9A8D4">
              {partnerInitial}
              <S.OnlineIndicator />
            </S.ContactAvatar>
            <S.ContactInfo>
              <S.ContactName>{chatPartnerName}</S.ContactName>
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
