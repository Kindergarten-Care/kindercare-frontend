import styled from 'styled-components';

export const SidebarContainer = styled.aside<{ $isOpen?: boolean; $isCollapsed?: boolean }>`
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
  transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${props => props.$isCollapsed ? '88px' : '262px'};

  @media (max-width: ${props => props.theme.breakpoints?.lg || '1024px'}) {
    width: 262px;
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    box-shadow: ${props => props.$isOpen ? '4px 0 25px rgba(0, 0, 0, 0.15)' : 'none'};
  }
`;

export const CollapseBtn = styled.button<{ $isCollapsed?: boolean }>`
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
  box-shadow: 0 4px 12px -4px rgba(0,0,0,.25);
  z-index: 5;
  transition: transform 0.2s;
  transform: ${props => props.$isCollapsed ? 'rotate(180deg)' : 'none'};

  @media (max-width: ${props => props.theme.breakpoints?.lg || '1024px'}) {
    display: none;
  }
`;

export const LogoContainer = styled.div<{ $isCollapsed?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 14px 8px;
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
`;

export const LogoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const FullOnly = styled.div<{ $isCollapsed?: boolean }>`
  display: ${props => props.$isCollapsed ? 'none' : 'flex'};
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

export const ProfileCard = styled.button<{ $isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 11px;
  margin: 0 14px 14px;
  padding: 10px 11px;
  border-radius: 15px;
  background: #fff;
  border: none;
  cursor: pointer;
  text-align: left;
  justify-content: ${props => props.$isCollapsed ? 'center' : 'flex-start'};
`;

export const ProfileAvatar = styled.span`
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg,#34D399,#005A36);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 16px;
`;

export const ProfileName = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: #1F2937;
  text-align: left;
  line-height: 1.3;
`;

export const ProfileDesc = styled.div`
  font-size: 13px;
  color: #9CA3AF;
  text-align: left;
  line-height: 1.2;
`;

export const NavSection = styled.nav`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 14px;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
    border-radius: 4px;
  }
`;

export const SectTitle = styled.div<{ $isCollapsed?: boolean }>`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .12em;
  color: #7FB89E;
  padding: 14px 12px 7px;
  display: ${props => props.$isCollapsed ? 'none' : 'block'};
`;

export const NavItem = styled.div<{ $active?: boolean; $isCollapsed?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 13px;
  height: 44px;
  margin-bottom: 3px;
  padding: 0 14px;
  border-radius: 13px;
  cursor: pointer;
  text-decoration: none;
  font-weight: ${props => props.$active ? '700' : '600'};
  font-size: 13.5px;
  background: ${props => props.$active ? '#fff' : 'transparent'};
  color: ${props => props.$active ? '#005A36' : '#D7EEE2'};
  justify-content: ${props => props.$isCollapsed ? 'center' : 'flex-start'};
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: ${props => props.$active ? '#fff' : 'rgba(255,255,255,.1)'};
  }
`;

export const ActiveBar = styled.span<{ $isCollapsed?: boolean }>`
  position: absolute;
  left: -14px;
  top: 10px;
  bottom: 10px;
  width: 4px;
  border-radius: 0 4px 4px 0;
  background: #FBBF24;
  display: ${props => props.$isCollapsed ? 'none' : 'block'};
`;

export const NavIcon = styled.span`
  flex: none;
  display: flex;
  width: 20px;
  height: 20px;
`;

export const NavLabel = styled.span<{ $isCollapsed?: boolean }>`
  display: ${props => props.$isCollapsed ? 'none' : 'block'};
`;

export const NavBadge = styled.span<{ $isCollapsed?: boolean; $urgent?: boolean }>`
  display: ${props => props.$isCollapsed ? 'none' : 'inline-block'};
  margin-left: auto;
  font-size: 10.5px;
  font-weight: 800;
  color: ${props => props.$urgent ? '#92400E' : '#005A36'};
  background: ${props => props.$urgent ? '#FCD34D' : '#fff'};
  padding: 1px 8px;
  border-radius: 999px;
`;

export const UserBar = styled.div<{ $isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 11px;
  margin: 8px 14px 0;
  padding: 10px 11px;
  border-radius: 15px;
  background: rgba(255,255,255,.1);
  justify-content: ${props => props.$isCollapsed ? 'center' : 'flex-start'};
`;

export const UserAvatar = styled.span`
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg,#FB923C,#F97316);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
`;

export const UserName = styled.div`
  font-weight: 700;
  font-size: 13px;
  color: #fff;
`;

export const UserRole = styled.div`
  font-size: 11px;
  color: #9FD3BA;
`;

export const SettingsBtn = styled.button`
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: rgba(255,255,255,.14);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
  margin-left: auto;

  &:hover {
    background: rgba(255,255,255,.26);
  }
`;
