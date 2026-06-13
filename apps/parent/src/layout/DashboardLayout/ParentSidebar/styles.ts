'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';

const rise = keyframes`
  from { opacity: 0; transform: translateY(6px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const SidebarContainer = styled.aside<{ $collapsed: boolean }>`
  background: var(--surface, #fff);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${p => p.$collapsed ? '24px 14px 18px' : '24px 16px 18px'};
  align-items: ${p => p.$collapsed ? 'center' : 'stretch'};
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

export const ToggleBtn = styled.button`
  position: absolute;
  top: 30px;
  right: -13px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid var(--border);
  color: var(--muted);
  cursor: pointer;
  display: grid;
  place-items: center;
  z-index: 6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  font-size: 12px;
  transition: color 0.15s, border-color 0.15s;

  &:hover { color: var(--brand); border-color: #cfe0d5; }
`;

export const Brand = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${p => p.$collapsed ? '0' : '11px'};
  padding: 6px ${p => p.$collapsed ? '0' : '8px'} 22px;
  justify-content: ${p => p.$collapsed ? 'center' : 'flex-start'};
`;

export const BrandMark = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: var(--brand);
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 800;
  font-size: 18px;
  flex-shrink: 0;
  box-shadow: 0 6px 14px -4px rgba(0, 90, 54, 0.4);
`;

export const BrandText = styled.div<{ $hidden: boolean }>`
  display: ${p => p.$hidden ? 'none' : 'block'};
`;

export const BrandName = styled.div`
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.02em;
  white-space: nowrap;
`;

export const BrandSub = styled.div`
  font-size: 11px;
  color: var(--muted-2);
  font-weight: 500;
  margin-top: 1px;
`;

/* child switcher */
export const CSwitcher = styled.div<{ $collapsed: boolean }>`
  position: relative;
  margin: 4px 0 10px;
  ${p => p.$collapsed && 'margin: 4px auto 12px;'}
`;

export const CSTrigger = styled.button<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${p => p.$collapsed ? '0' : '10px'};
  width: ${p => p.$collapsed ? '54px' : '100%'};
  padding: ${p => p.$collapsed ? '8px' : '8px 10px'};
  justify-content: ${p => p.$collapsed ? 'center' : 'flex-start'};
  border-radius: 13px;
  border: 1px solid var(--border);
  background: #f7fbf8;
  cursor: pointer;
  font: inherit;
  text-align: left;
  transition: background 0.15s, border-color 0.15s;

  &:hover { background: #f1f7f3; border-color: #d5e5dc; }
`;

export const CSAv = styled.div<{ $gradient: string }>`
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: ${p => p.$gradient};
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const CSInfo = styled.div<{ $hidden: boolean }>`
  flex: 1;
  min-width: 0;
  display: ${p => p.$hidden ? 'none' : 'flex'};
  flex-direction: column;
`;

export const CSName = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: var(--fg);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CSClass = styled.span`
  font-size: 11.5px;
  color: var(--muted-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CSChev = styled.span<{ $open: boolean; $hidden: boolean }>`
  color: var(--muted-2);
  display: ${p => p.$hidden ? 'none' : 'grid'};
  place-items: center;
  transform: ${p => p.$open ? 'rotate(180deg)' : 'none'};
  transition: transform 0.2s;
  flex-shrink: 0;
  font-size: 12px;
`;

export const CSMenu = styled.div<{ $collapsed: boolean }>`
  position: absolute;
  top: calc(100% + 7px);
  left: 0;
  ${p => p.$collapsed ? 'right: auto; width: 240px;' : 'right: 0;'}
  z-index: 35;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 15px;
  box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.16);
  padding: 7px;
  animation: ${rise} 0.18s ease;
`;

export const CSMenuH = styled.div`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted-2);
  padding: 6px 8px 8px;
`;

export const CSOption = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px;
  border-radius: 11px;
  border: none;
  background: ${p => p.$active ? 'var(--brand-tint)' : 'none'};
  cursor: pointer;
  font: inherit;
  text-align: left;
  transition: background 0.15s;

  &:hover { background: ${p => p.$active ? 'var(--brand-tint)' : '#f4f8f5'}; }
`;

export const CSOptName = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: var(--fg);
`;

export const CSOptClass = styled.span`
  font-size: 12px;
  color: var(--muted);
  margin-top: 1px;
  display: block;
`;

export const CSCheck = styled.span`
  margin-left: auto;
  color: var(--brand);
  font-weight: 700;
  flex-shrink: 0;
`;

export const CSAdd = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 8px 6px;
  margin-top: 5px;
  border-top: 1px solid var(--border-soft);
  background: none;
  border-left: none;
  border-right: none;
  border-bottom: none;
  cursor: pointer;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--brand);

  &:hover { color: var(--brand-hover); }
`;

/* nav */
export const NavLabel = styled.div<{ $hidden: boolean }>`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--muted-2);
  padding: 6px 12px;
  margin-top: 8px;
  display: ${p => p.$hidden ? 'none' : 'block'};
`;

export const NavItem = styled(Link)<{ $active?: boolean; $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${p => p.$collapsed ? '0' : '12px'};
  padding: ${p => p.$collapsed ? '11px 0' : '10px 12px'};
  width: ${p => p.$collapsed ? '46px' : '100%'};
  ${p => p.$collapsed && 'margin: 2px auto; justify-content: center;'}
  border-radius: 11px;
  color: ${p => p.$active ? 'var(--brand)' : 'var(--muted)'};
  font-weight: ${p => p.$active ? '600' : '500'};
  font-size: 14px;
  background: ${p => p.$active ? 'var(--brand-tint)' : 'transparent'};
  cursor: pointer;
  position: relative;
  transition: background 0.15s, color 0.15s;
  text-decoration: none;

  &:hover {
    background: ${p => p.$active ? 'var(--brand-tint)' : '#f4f8f5'};
    color: ${p => p.$active ? 'var(--brand)' : 'var(--fg)'};
  }

  ${p => p.$active && !p.$collapsed && `
    &::before {
      content: '';
      position: absolute;
      left: -16px;
      top: 8px;
      bottom: 8px;
      width: 3px;
      border-radius: 0 3px 3px 0;
      background: var(--brand);
    }
  `}
`;

export const NavIcon = styled.span`
  font-size: 17px;
  flex-shrink: 0;
`;

export const NavSpan = styled.span<{ $hidden: boolean }>`
  flex: 1;
  display: ${p => p.$hidden ? 'none' : 'block'};
`;

export const NavBadge = styled.span<{ $collapsed?: boolean }>`
  margin-left: ${p => p.$collapsed ? 'auto' : '0'};
  background: #dc2626;
  color: #fff;
  font-size: ${p => p.$collapsed ? '9px' : '11px'};
  font-weight: 700;
  min-width: ${p => p.$collapsed ? '16px' : '19px'};
  height: ${p => p.$collapsed ? '16px' : '19px'};
  padding: 0 ${p => p.$collapsed ? '4px' : '5px'};
  border-radius: 10px;
  display: grid;
  place-items: center;
  ${p => p.$collapsed && `
    position: absolute;
    top: 3px;
    right: 5px;
    border: 1.5px solid #fff;
  `}
`;

export const SideProfile = styled.div<{ $collapsed: boolean }>`
  margin-top: auto;
  border-top: 1px solid var(--border-soft);
  padding-top: 14px;
  display: flex;
  align-items: center;
  gap: ${p => p.$collapsed ? '0' : '11px'};
  cursor: pointer;
  border-radius: 12px;
  padding: 12px ${p => p.$collapsed ? '0' : '8px'};
  justify-content: ${p => p.$collapsed ? 'center' : 'flex-start'};

  &:hover { background: #f4f8f5; }
`;

export const ParentAv = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--brand-tint);
  display: grid;
  place-items: center;
  font-size: 17px;
  flex-shrink: 0;
`;

export const ParentInfo = styled.div<{ $hidden: boolean }>`
  flex: 1;
  min-width: 0;
  display: ${p => p.$hidden ? 'none' : 'block'};

  strong { display: block; font-size: 12.5px; font-weight: 600; }
  span { font-size: 11px; color: var(--muted); }
`;

export const DropdownContainer = styled.div`
  position: relative;
  margin-left: auto;
`;

export const SettingsBtn = styled.button`
  width: 26px;
  height: 26px;
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  display: grid;
  place-items: center;
  font-size: 12px;
  cursor: pointer;
  color: var(--muted);

  &:hover { background: #f4f8f5; }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  right: 0;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 4px;
  min-width: 140px;
  z-index: 100;
  animation: ${rise} 0.15s ease;
`;

export const DropdownItem = styled.div`
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  color: #dc2626;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.15s;

  &:hover { background: #fee2e2; }
`;
