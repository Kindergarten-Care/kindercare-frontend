"use client";
import styled, { css } from 'styled-components';

export const SidebarWrapper = styled.div`
  width: 280px;
  height: 94vh;
  position: fixed;
  left: 0;
  top: 0;
  background: white;
  box-shadow: 4px 0px 24px rgba(0, 0, 0, 0.02);
  border-right: 1px #F1F5F9 solid;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 0;
  z-index: 100;
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BrandContainer = styled.div`
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`;

export const LogoBox = styled.div`
  width: 32px;
  height: 32px;
  background: #005314;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BrandTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const BrandTitle = styled.div`
  color: #14532D;
  font-size: 18px;
  font-family: Montserrat, sans-serif;
  font-weight: 900;
  line-height: 18px;
`;

export const BrandSubtitle = styled.div`
  color: #6F7A6C;
  font-size: 10px;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 12.50px;
  letter-spacing: 0.50px;
`;

export const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 18px;
  gap: 5px;
  flex: 1;
  overflow-y: auto;
  
  /* Optional scrollbar styling */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
`;

export const MenuItem = styled.a<{ $active?: boolean; $isDanger?: boolean }>`
  height: 48px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  position: relative;
  border-radius: 0 8px 8px 0;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $active }) =>
    $active
      ? css`
          background: #F0FDF4;
          border-left: 4px solid #15803D;
          color: #046E1E;
        `
      : css`
          background: transparent;
          border-left: 4px solid transparent;
          color: #475569;

          &:hover {
            background: #F8FAFC;
          }
        `}

  ${({ $isDanger }) =>
    $isDanger &&
    css`
      color: #BA1A1A;
      &:hover {
        background: #FEF2F2;
      }
    `}
`;

export const MenuIconBox = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 14px;
`;

export const MenuText = styled.span<{ $active?: boolean; $isDanger?: boolean }>`
  font-size: 14px;
  font-family: Montserrat, sans-serif;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  line-height: 17.5px;
`;

export const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 18px 0 18px;
  gap: 5px;
  border-top: 1px solid #F1F5F9;
`;
