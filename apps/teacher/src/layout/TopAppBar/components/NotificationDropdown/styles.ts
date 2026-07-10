import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const DropdownContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 360px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  border: 1px solid #e5e7eb;
  z-index: 100;
  display: flex;
  flex-direction: column;
  animation: ${slideDown} 0.2s ease-out;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  font-family: 'Inter', sans-serif;
`;

export const MarkReadAction = styled.button`
  background: none;
  border: none;
  color: #2563eb;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  font-family: 'Inter', sans-serif;

  &:hover {
    text-decoration: underline;
  }
`;

export const NotificationList = styled.div`
  max-height: 380px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 4px;
  }
`;

export const NotificationItem = styled.div<{ $isUnread?: boolean }>`
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
  background-color: ${props => props.$isUnread ? '#eff6ff' : '#ffffff'};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.$isUnread ? '#dbeafe' : '#f9fafb'};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const IconContainer = styled.div<{ $type?: 'alert' | 'message' | 'event' | 'default' }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;

  background-color: ${props => {
    switch(props.$type) {
      case 'alert': return '#fef2f2';
      case 'message': return '#eff6ff';
      case 'event': return '#fffbeb';
      default: return '#eff6ff';
    }
  }};

  color: ${props => {
    switch(props.$type) {
      case 'alert': return '#dc2626';
      case 'message': return '#2563eb';
      case 'event': return '#d97706';
      default: return '#2563eb';
    }
  }};
`;

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ItemTitle = styled.h4<{ $isUnread?: boolean }>`
  font-size: 14px;
  font-weight: ${props => props.$isUnread ? '700' : '600'};
  color: #111827;
  margin: 0 0 4px 0;
  font-family: 'Inter', sans-serif;
`;

export const ItemMessage = styled.p`
  font-size: 13px;
  color: #4b5563;
  margin: 0 0 6px 0;
  line-height: 1.4;
  font-family: 'Inter', sans-serif;
`;

export const ItemTime = styled.span`
  font-size: 11px;
  color: #9ca3af;
  font-family: 'Inter', sans-serif;
`;

export const UnreadDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #2563eb;
  margin-top: 6px;
  flex-shrink: 0;
`;

export const Footer = styled.div`
  padding: 12px 20px;
  text-align: center;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
`;

export const ViewAllLink = styled.a`
  color: #2563eb;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  font-family: 'Inter', sans-serif;

  &:hover {
    text-decoration: underline;
  }
`;
