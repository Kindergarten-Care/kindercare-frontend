import styled from 'styled-components';

export const SidebarContainer = styled.aside<{ $isOpen?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 262px;
  background: #005A36;
  display: flex;
  flex-direction: column;
  padding: 18px 0 14px;
  z-index: 40;
  overflow: visible;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 1024px) {
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    box-shadow: ${props => props.$isOpen ? '4px 0 25px rgba(0, 0, 0, 0.15)' : 'none'};
  }
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
  box-shadow: 0 4px 12px -4px rgba(0,0,0,.25);
  z-index: 5;
  transition: transform 0.2s;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  margin: 0 14px 14px;
  padding: 11px 12px;
  border-radius: 15px;
  background: rgba(255,255,255,.1);
`;

export const LogoBlock = styled.div`
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #005A36;
`;

export const LogoTextContainer = styled.div`
  line-height: 1.15;
`;

export const LogoText = styled.div`
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-weight: 800;
  font-size: 13.5px;
  color: #fff;
  letter-spacing: .02em;
`;

export const LogoSubText = styled.div`
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: .12em;
  color: #9FD3BA;
  margin-top: 2px;
`;

export const ClassProfileBtn = styled.button`
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
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
`;

export const ClassInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ClassName = styled.div`
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-weight: 700;
  font-size: 13.5px;
  color: #1F2937;
`;

export const ClassDetails = styled.div`
  font-size: 11.5px;
  color: #9CA3AF;
`;

export const ScrollNav = styled.nav`
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

export const NavSectionTitle = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .12em;
  color: #7FB89E;
  padding: 14px 12px 7px;
  
  &:first-child {
    padding-top: 10px;
  }
`;

export const NavItem = styled.a<{ $active?: boolean; $isYellow?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 13px;
  height: 44px;
  margin-bottom: 3px;
  padding: 0 14px;
  border-radius: 13px;
  text-decoration: none;
  font-weight: ${props => props.$active ? '700' : '600'};
  font-size: 13.5px;
  color: ${props => props.$active ? '#005A36' : '#D7EEE2'};
  background: ${props => props.$active ? '#fff' : 'transparent'};
  transition: background 0.15s, color 0.15s;
  cursor: pointer;

  &:hover {
    background: ${props => props.$active ? '#fff' : 'rgba(255,255,255,.1)'};
  }
  
  ${props => props.$isYellow && !props.$active && `
    color: #D7EEE2;
    svg { color: #FBBF24; }
  `}
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

export const IconWrapper = styled.span`
  flex: none;
  display: flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
`;

export const Badge = styled.span`
  margin-left: auto;
  font-size: 10.5px;
  font-weight: 800;
  color: #005A36;
  background: #fff;
  padding: 1px 8px;
  border-radius: 999px;
`;

export const UserBar = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  margin: 8px 14px 0;
  padding: 10px 11px;
  border-radius: 15px;
  background: rgba(255,255,255,.1);
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
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
`;

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
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

export const LogoutBtn = styled.button`
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

  &:hover {
    background: rgba(255,255,255,.26);
  }
`;

