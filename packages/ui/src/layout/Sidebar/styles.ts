'use client';

import styled, { css } from 'styled-components';

export const SideNavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background: #ffffff;
  border-right: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  z-index: 100;
  filter: drop-shadow(4px 0px 12px rgba(0, 0, 0, 0.02));
  font-family: 'Montserrat', sans-serif;
`;

export const BrandSection = styled.div`
  padding: 24px 24px 32px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BrandIcon = styled.div`
  width: 32px;
  height: 32px;
  background: #005314;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 13.5px;
    height: 13.5px;
    color: white;
  }
`;

export const BrandInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const BrandName = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 18px;
  color: #14532d;
  letter-spacing: -0.45px;
  line-height: 18px;
`;

export const BrandSub = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 10px;
  color: #6f7a6c;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  line-height: 12.5px;
`;

export const NavLinks = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 18px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const NavLink = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 20px;
  border-radius: 0 8px 8px 0;
  border-left: 4px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  min-height: 40px;

  ${({ $active }) =>
    $active
      ? css`
          background: #f0fdf4;
          border-left-color: #15803d;
        `
      : css`
          background: transparent;
          border-left-color: transparent;

          &:hover {
            background: #f8fafc;
          }
        `}
`;

export const NavIcon = styled.div<{ $active?: boolean }>`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ $active }) => ($active ? '#046e1e' : '#475569')};

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const NavLabel = styled.span<{ $active?: boolean }>`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  line-height: 17.5px;
  color: ${({ $active }) => ($active ? '#046e1e' : '#475569')};
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
`;

export const BottomSection = styled.div`
  border-top: 1px solid #f1f5f9;
  padding: 17px 18px 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
