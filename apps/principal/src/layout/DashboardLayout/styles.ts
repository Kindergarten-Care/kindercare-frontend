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
`;

export const SidebarItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  margin: 4px 16px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? '#e6f3ed' : 'transparent')};
  color: ${({ $active }) => ($active ? '#005a36' : '#4b5563')};
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  font-size: 0.9rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ $active }) => ($active ? '#e6f3ed' : '#f3f4f6')};
    color: ${({ $active }) => ($active ? '#005a36' : '#111827')};
    transform: translateX(2px);
  }
`;

export const SidebarItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SidebarItemIcon = styled.span`
  font-size: 1.1rem;
`;

export const ChevronIcon = styled.svg<{ $isOpen?: boolean; $active?: boolean }>`
  width: 16px;
  height: 16px;
  fill: none;
  stroke: ${({ $isOpen, $active }) => {
    if ($active) return '#005a36';
    if ($isOpen) return '#005a36';
    return '#9ca3af';
  }};
  stroke-width: 2;
  transition: transform 0.2s ease-in-out, stroke 0.2s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const SidebarSubMenuWrapper = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s ease-in-out;
`;

export const SidebarSubMenuInner = styled.div`
  overflow: hidden;
`;

export const SidebarSubMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
  margin-left: 36px;
  margin-right: 16px;
  border-left: 2px solid #e5e7eb;
`;

export const SidebarSubItem = styled.div<{ $active?: boolean }>`
  padding: 8px 16px;
  margin: 2px 0 2px -2px; /* Pull back to overlap the border-left */
  border-left: 2px solid ${({ $active }) => ($active ? '#005a36' : 'transparent')};
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#005a36' : '#6b7280')};
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  font-size: 0.85rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #005a36;
    border-left-color: #005a36;
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
  padding: 12px 24px 16px 24px;
  font-size: 0.875rem;
  color: #6b7280;
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const BreadcrumbItem = styled.span<{ $clickable?: boolean }>`
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
  ${({ $clickable }) => $clickable && `
    cursor: pointer;
    &:hover {
      color: #005a36;
    }
  `}

  &.active {
    font-weight: 600;
    color: #111827;
  }
`;

export const BreadcrumbSeparator = styled.span`
  margin: 0 8px;
  display: flex;
  align-items: center;
  color: #9ca3af;
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
