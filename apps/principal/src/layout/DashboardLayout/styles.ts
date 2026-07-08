'use client';

import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  overflow: hidden;
`;

export const TopNavbar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid #eaeaea;
  background-color: #ffffff;
  z-index: 10;
`;

export const BrandArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 250px; /* matches sidebar width */
`;

export const Logo = styled.img`
  height: 32px;
  object-fit: contain;
`;

export const SearchArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  height: 36px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 10px;
  background-color: #fcfcfc;
`;

export const SearchIcon = styled.svg`
  width: 16px;
  height: 16px;
  fill: #888;
  margin-right: 8px;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font-size: 0.9rem;
  color: #333;
`;

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const UserIconSvg = styled.svg`
  width: 24px;
  height: 24px;
  fill: #555;
  cursor: pointer;
`;

export const MainArea = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const SidebarItemText = styled.span`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    height: 2px;
    background-color: #166534;
    transition: width 0.3s ease-in-out;
    width: 0;
  }
`;

export const SidebarItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? '#dcfce7' : 'transparent')};
  color: ${({ $active }) => ($active ? '#166534' : '#4b5563')};
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background-color: #dcfce7;
    color: #166534;
  }

  ${({ $active }) => $active && `
    ${SidebarItemText}::after {
      width: 100%;
    }
  `}
`;

export const SidebarItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SidebarItemIcon = styled.span`
  font-size: 1.1rem;
`;

export const ChevronIcon = styled.svg<{ $isOpen?: boolean }>`
  width: 16px;
  height: 16px;
  fill: none;
  stroke: ${({ $isOpen }) => ($isOpen ? '#166534' : '#9ca3af')};
  stroke-width: 2;
  transition: transform 0.2s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const SidebarSubMenu = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  background-color: #dcfce7;
  padding-bottom: 8px;
`;

export const SidebarSubItem = styled.div<{ $active?: boolean }>`
  padding: 10px 20px 10px 50px;
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#166534' : '#4b5563')};
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  font-size: 0.85rem;
  transition: all 0.2s;

  &:hover {
    background-color: #bbf7d0;
    color: #166534;
  }
`;

export const Timestamp = styled.div`
  margin-top: auto;
  padding: 16px 20px;
  font-size: 0.85rem;
  color: #9ca3af;
  text-align: center;
  border-top: 1px solid #e5e7eb;
`;

export const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 16px 0;
  font-size: 0.875rem;
  color: #6b7280;
`;

export const BreadcrumbItem = styled.span<{ $clickable?: boolean }>`
  display: flex;
  align-items: center;
  ${({ $clickable }) => $clickable && `
    cursor: pointer;
    &:hover {
      color: #111827;
      text-decoration: underline;
    }
  `}

  &:not(:last-child)::after {
    content: '/';
    margin: 0 8px;
    color: #9ca3af;
    text-decoration: none;
    cursor: default;
  }

  &.active {
    font-weight: 500;
    color: #111827;
  }
`;

export const ContentContainer = styled.main`
  flex: 1;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const Sidebar = styled.aside`
  width: 250px;
  background-color: #ffffff;
  border-right: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-top: 10px;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1; 
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8; 
  }
`;
