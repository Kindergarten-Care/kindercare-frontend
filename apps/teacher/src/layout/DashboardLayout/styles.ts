'use client';

import styled from 'styled-components';

const SIDEBAR_WIDTH = 280;

export const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme.colors.bg};
  font-family: ${props => props.theme.colors.fg};
`;

export const MainContent = styled.main`
  position: fixed;
  top: 0;
  bottom: 0;
  left: ${SIDEBAR_WIDTH}px;
  right: 0;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.bg};
  transition: all 0.3s ease;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    left: 0;
  }
`;

export const TopBar = styled.header`
  height: 80px;
  background: #F6FAF2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 40;
  flex-shrink: 0;
  box-shadow: 0px 4px 20px rgba(14, 121, 60, 0.05);

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 20px;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #F0F5EC;
  border: 1px solid #BECABC;
  border-radius: 9999px;
  height: 40px;
  padding: 0 16px;
  gap: 10px;
  width: 100%;
  max-width: 480px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${props => props.theme.colors.green || '#15803d'};
    box-shadow: 0 0 0 2px rgba(21, 128, 61, 0.1);
  }
`;

export const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  font-family: var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  color: #181D18;
  width: 100%;

  &::placeholder {
    color: #6B7280;
  }
`;

export const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ActionButton = styled.button`
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #3F493D;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    color: #181D18;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  background-color: #BA1A1A;
  border-radius: 50%;
`;

export const VerticalDivider = styled.div`
  width: 1px;
  height: 40px;
  background-color: #BECABC;
  margin: 0 8px;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

export const ProfileName = styled.span`
  font-family: var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #181D18;
  line-height: 1.4;
`;

export const ProfileRole = styled.span`
  font-family: var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #3F493D;
  line-height: 1.3;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #97F7AC;
  background: #F0F5EC;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PageArea = styled.div`
  flex: 1;
  padding: 40px;
  max-width: ${props => props.theme.layout.maxWidth};
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 20px;
  }
`;
