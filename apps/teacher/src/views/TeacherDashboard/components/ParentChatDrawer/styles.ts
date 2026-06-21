import styled, { css, keyframes } from 'styled-components';

export const kcFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
`;

export const kcPop = keyframes`
  from { opacity: 0; transform: scale(0.85) translateY(10px); }
  to { opacity: 1; transform: none; }
`;

export const FloatingButton = styled.button<{ $hasUnread?: boolean }>`
  position: fixed;
  right: 28px;
  bottom: 28px;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #10B981, #059669);
  color: #fff;
  font-size: 26px;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(16, 185, 129, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${kcFloat} 3.4s ease-in-out infinite;
  transition: transform 0.15s;
  z-index: 9100;

  &:hover {
    transform: scale(1.08);
  }
`;

export const UnreadBadge = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  border-radius: 999px;
  background: #F43F5E;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 3px #F8FAF8;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
`;

export const ChatDrawerContainer = styled.div`
  position: fixed;
  right: 28px;
  bottom: 100px;
  z-index: 9100;
  width: 340px;
  height: 520px;
  background: #F7FBF8;
  border-radius: 22px;
  box-shadow: 0 22px 60px rgba(16, 24, 40, 0.28);
  border: 1px solid #E3F0E8;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${kcPop} 0.22s cubic-bezier(0.2, 0.8, 0.3, 1);
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 14px 16px;
  background: #fff;
  border-bottom: 1px solid #EEF2EF;
`;

export const ContactAvatar = styled.span<{ $color: string }>`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: #374151;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
`;

export const OnlineIndicator = styled.span`
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 0 2px #fff;
`;

export const ContactInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ContactName = styled.div`
  font-weight: 800;
  font-size: 14px;
  color: #1F2937;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
`;

export const ContactStatus = styled.div`
  font-size: 11px;
  color: #10B981;
  font-weight: 600;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
`;

export const CloseChatButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: none;
  background: #F1F5F3;
  color: #6B7280;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #E5EAE7;
  }
`;

export const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MessageRow = styled.div<{ $isMe: boolean }>`
  display: flex;
  width: 100%;
  justify-content: ${props => props.$isMe ? 'flex-end' : 'flex-start'};
`;

export const MessageBubble = styled.div<{ $isMe: boolean }>`
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 13.5px;
  line-height: 1.4;
  font-weight: 600;
  max-width: 240px;
  word-wrap: break-word;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;

  ${props => props.$isMe ? css`
    background: linear-gradient(135deg, #10B981, #059669);
    color: #ffffff;
    border-bottom-right-radius: 4px;
  ` : css`
    background: #ffffff;
    color: #1F2937;
    border: 1px solid #E3F0E8;
    border-bottom-left-radius: 4px;
  `}
`;

export const MessageTime = styled.div<{ $isMe: boolean }>`
  font-size: 10.5px;
  color: #9CA3AF;
  margin-top: 4px;
  text-align: ${props => props.$isMe ? 'right' : 'left'};
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
`;

export const QuickRepliesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 12px 14px;
  background: #fff;
  border-top: 1px solid #EEF2EF;
  animation: ${kcPop} 0.16s ease;
`;

export const QuickRepliesHeader = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #9CA3AF;
  margin-bottom: 1px;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
`;

export const QuickReplyButton = styled.button`
  text-align: left;
  padding: 9px 13px;
  border-radius: 11px;
  border: 1px solid #E3F0E8;
  background: #F7FBF8;
  color: #374151;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #ECFDF5;
  }
`;

export const ChatFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 12px 14px;
  background: #fff;
  border-top: 1px solid #EEF2EF;
`;

export const ToggleQuickButton = styled.button`
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  border: none;
  background: #ECFDF5;
  color: #059669;
  font-size: 17px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #D1FAE5;
  }
`;

export const ChatInput = styled.input`
  flex: 1;
  height: 40px;
  border: 1px solid #E3F0E8;
  border-radius: 12px;
  padding: 0 14px;
  font-family: 'Be Vietnam Pro', system-ui, sans-serif;
  font-size: 13.5px;
  outline: none;
  background: #F7FBF8;
  color: #1F2937;

  &:focus {
    border-color: #10B981;
    background: #fff;
  }
`;

export const SendButton = styled.button`
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #10B981, #059669);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.06);
  }
`;
