'use client';

import styled from 'styled-components';

const SIDEBAR_WIDTH = 240;

export const DashboardWrapper = styled.div`
  display: flex;
  background: #f8fafc;
  min-height: 100vh;
`;

export const MainContent = styled.main`
  flex: 1;
  margin-left: ${SIDEBAR_WIDTH}px;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  min-height: 100vh;
`;

export const TopBar = styled.header`
  position: sticky;
  top: 0;
  height: 88px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  z-index: 50;
  flex-shrink: 0;
`;

export const PageArea = styled.div`
  flex: 1;
  padding: 0 32px 64px 32px;
`;

export const TopBarTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #181d18;
  margin: 0;
`;

export const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e2e8f0;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const FloatingChatButton = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #005e2c;
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 94, 44, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  
  &:hover {
    background: #004a23;
  }
`;

export const ChatBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ba1a1a;
  color: white;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
`;
