'use client';

import styled from 'styled-components';

export const TopBarContainer = styled.header`
  position: fixed;
  top: 0;
  left: 280px;
  right: 0;
  height: 64px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-bottom: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  z-index: 90;
  font-family: 'Montserrat', sans-serif;
`;

export const ProductName = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #1e293b;
  line-height: 20px;
`;

export const TrailingActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
  position: relative;

  &:hover {
    background: #f1f5f9;
  }

  svg {
    width: 20px;
    height: 20px;
    color: #64748b;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  border: 2px solid white;
`;

export const ProfileAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  background: #dcfce7;
  border: 2px solid #bbf7d0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #15803d;
`;

export const NotificationDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 320px;
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 200;
`;

export const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px 13px;
  border-bottom: 1px solid #f1f5f9;
`;

export const DropdownTitle = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #1e293b;
  line-height: 20px;
`;

export const MarkReadLink = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #2563eb;
  line-height: 18px;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const NotificationItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border-bottom: 1px solid #f8fafc;
  gap: 12px;
  transition: background 0.15s ease;

  &:hover {
    background: #fafafa;
  }
`;

export const NotifIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const NotifContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NotifTitle = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #1e293b;
  line-height: 19.25px;
`;

export const NotifTime = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 11px;
  color: #94a3b8;
  line-height: 16.5px;
`;

export const ViewAllButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #64748b;
  border: none;
  background: #fafafa;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;
