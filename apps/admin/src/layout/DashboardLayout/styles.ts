'use client';

import styled from 'styled-components';

const SIDEBAR_WIDTH = 240;

export const DashboardWrapper = styled.div`
  display: flex;
  background: #f8fafc;
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
  background: #f8fafc;
`;

export const TopBar = styled.header`
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 50;
  flex-shrink: 0;
  filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.04));
`;

export const PageArea = styled.div`
  flex: 1;
  padding: 32px 50px;
`;

export const TopBarTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

export const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #15803d, #22c55e);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
`;
