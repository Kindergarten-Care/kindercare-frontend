'use client';

import styled, { css } from 'styled-components';

export const SideNavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: #F0F5EC;
  border-right: 1px solid rgba(190, 202, 188, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 100;
  box-shadow: 0px 1px 2px rgba(0, 94, 44, 0.05);
  font-family: var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif;
  padding: 16px 0;
  box-sizing: border-box;
`;

export const BrandSection = styled.div`
  padding: 16px 32px 24px 32px;
  display: flex;
  flex-direction: column;
`;

export const BrandName = styled.h1`
  font-family: var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #005E2C;
  line-height: 32px;
  margin: 0;
  letter-spacing: -0.5px;
`;
export const NavLinks = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NavLink = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  min-height: 48px;
  box-sizing: border-box;

  ${({ $active }) =>
    $active
      ? css`
          background: #E2EBE6;
          border-left-color: #005E2C;
        `
      : css`
          background: transparent;
          border-left-color: transparent;

          &:hover {
            background: rgba(226, 235, 230, 0.5);
          }
        `}
`;

export const NavIcon = styled.div<{ $active?: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ $active }) => ($active ? '#00522F' : '#3F493F')};

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const NavLabel = styled.span<{ $active?: boolean }>`
  font-family: var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: ${({ $active }) => ($active ? '#00522F' : '#3F493F')};
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
`;

export const BottomSection = styled.div`
  border-top: 1px solid rgba(191, 202, 185, 1);
  padding: 16px 16px 0 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BottomNavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  min-height: 36px;
  box-sizing: border-box;

  &:hover {
    background: rgba(226, 235, 230, 0.5);
  }
`;

export const BottomNavIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #3F493D;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const BottomNavLabel = styled.span`
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #3F493D;
  line-height: 17px;
  letter-spacing: 0.28px;
`;
