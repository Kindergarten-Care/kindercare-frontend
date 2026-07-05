import styled from 'styled-components';

export const SidebarWrapper = styled.aside<{ $collapsed?: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 40;
  display: flex;
  flex-direction: column;
  padding: 18px 0 14px;
  background: #005A36;
  overflow: visible;
  width: ${({ $collapsed }) => ($collapsed ? '88px' : '262px')};
  transition: width 0.2s ease;
`;

export const CollapseBtn = styled.button`
  position: absolute;
  right: -13px;
  top: 64px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid #E6EEE9;
  background: #fff;
  color: #005A36;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.25);
  z-index: 5;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    transition: transform 0.2s ease;
  }
`;

export const Logo = styled.div<{ $hidden?: boolean }>`
  display: flex;
  align-items: center;
  gap: 11px;
  margin: 0 14px 14px;
  padding: 11px 12px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

export const LogoIcon = styled.span`
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoText = styled.div`
  line-height: 1.15;
`;

export const LogoTitle = styled.div`
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-weight: 800;
  font-size: 13.5px;
  color: #fff;
  letter-spacing: 0.02em;
`;

export const LogoSubtitle = styled.div`
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #9FD3BA;
  margin-top: 2px;
`;

export const ClassSelector = styled.button<{ $hidden?: boolean }>`
  display: flex;
  align-items: center;
  gap: 11px;
  margin: 0 14px 14px;
  padding: 9px 11px;
  border-radius: 15px;
  background: #fff;
  border: none;
  cursor: pointer;
  text-align: left;
  width: ${({ $hidden }) => ($hidden ? '60px' : 'calc(100% - 28px)')};
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  transition: all 0.2s ease;
  overflow: hidden;

  &:hover {
    background: #F6FAF7;
  }
`;

export const ClassAvatar = styled.span`
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #34D399, #005A36);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 16px;
`;

export const ClassInfo = styled.div<{ $hidden?: boolean }>`
  flex: 1;
  min-width: 0;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

export const ClassName = styled.div`
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-weight: 700;
  font-size: 13.5px;
  color: #1F2937;
`;

export const ClassCount = styled.div`
  font-size: 11.5px;
  color: #9CA3AF;
`;

export const ChevronIcon = styled.span<{ $hidden?: boolean }>`
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

export const Nav = styled.nav`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 14px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

export const NavSection = styled.div<{ $hidden?: boolean }>`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #7FB89E;
  padding: 10px 12px 7px;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  white-space: nowrap;
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

export const NavItem = styled.a<{ $active?: boolean; $hidden?: boolean }>`
  display: flex;
  align-items: center;
  gap: 13px;
  height: 44px;
  margin-bottom: 3px;
  padding: 0 14px;
  border-radius: 13px;
  text-decoration: none;
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
  font-size: 13.5px;
  color: ${({ $active }) => ($active ? '#005A36' : '#D7EEE2')};
  background: ${({ $active }) => ($active ? '#fff' : 'transparent')};
  position: relative;
  transition: all 0.15s ease;
  overflow: hidden;

  &:hover {
    background: ${({ $active }) => ($active ? '#fff' : 'rgba(255, 255, 255, 0.1)')};
  }

  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  justify-content: ${({ $hidden }) => ($hidden ? 'center' : 'flex-start')};
`;

export const ActiveBar = styled.span`
  position: absolute;
  left: -14px;
  top: 10px;
  bottom: 10px;
  width: 4px;
  border-radius: 0 4px 4px 0;
  background: #FBBF24;
`;

export const NavIcon = styled.span`
  flex: none;
  display: flex;
  width: 20px;
  height: 20px;
`;

export const NavLabel = styled.span<{ $hidden?: boolean }>`
  flex: 1;
  white-space: nowrap;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

export const NavBadge = styled.span<{ $hidden?: boolean }>`
  margin-left: auto;
  font-size: 10.5px;
  font-weight: 800;
  color: #005A36;
  background: #fff;
  padding: 1px 8px;
  border-radius: 999px;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

export const UserBar = styled.div<{ $hidden?: boolean }>`
  display: flex;
  align-items: center;
  gap: 11px;
  margin: 8px 14px 0;
  padding: 10px 11px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  transition: opacity 0.2s ease, visibility 0.2s ease;
  overflow: hidden;
`;

export const UserAvatar = styled.span`
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FB923C, #F97316);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
`;

export const UserInfo = styled.div<{ $hidden?: boolean }>`
  flex: 1;
  min-width: 0;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

export const UserName = styled.div`
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-weight: 700;
  font-size: 13px;
  color: #fff;
`;

export const UserRole = styled.div`
  font-size: 11px;
  color: #9FD3BA;
`;

export const SettingsLink = styled.a<{ $hidden?: boolean }>`
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.26);
  }
`;
