import styled from 'styled-components';

export const SidebarContainer = styled.aside<{ $isOpen?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 80px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-right: 1px solid rgba(16, 24, 40, 0.05);
  display: flex;
  flex-direction: column;
  z-index: 10000;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s, transform 0.3s ease-in-out;
  overflow: hidden;

  &:hover {
    @media (min-width: 1025px) {
      width: 284px;
      box-shadow: 8px 0 40px rgba(16, 24, 40, 0.08);
    }
  }

  @media (max-width: 1024px) {
    width: 280px;
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    box-shadow: ${props => props.$isOpen ? '4px 0 25px rgba(0, 0, 0, 0.15)' : 'none'};
  }
`;

export const LogoContainer = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 18px;
  gap: 14px;
  flex-shrink: 0;
`;

export const LogoBlock = styled.div`
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 13px;
  background: linear-gradient(135deg, #10B981, #34D399);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 800;
  font-size: 20px;
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.35);
  font-family: 'Montserrat', sans-serif;
`;

export const LogoText = styled.h2`
  color: #065F46;
  font-size: 19px;
  font-weight: 800;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -0.02em;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.22s, transform 0.22s;
  white-space: nowrap;

  ${SidebarContainer}:hover & {
    @media (min-width: 1025px) {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 1024px) {
    opacity: 1;
    transform: none;
  }
`;

export const CloseButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  font-size: 20px;
  color: #3f493f;
  cursor: pointer;
  padding: 8px;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f5ec;
  }

  @media (max-width: 1024px) {
    display: flex;
  }
`;

export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

export const NavItem = styled.div<{ $active?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  height: 48px;
  margin: 1px 16px;
  padding: 0 16px;
  border-radius: 14px;
  cursor: pointer;
  text-decoration: none;
  background-color: ${props => props.$active ? '#ECFDF5' : 'transparent'};
  color: ${props => props.$active ? '#059669' : '#6B7280'};
  font-weight: ${props => props.$active ? '700' : '600'};
  font-family: 'Montserrat', sans-serif;
  font-size: 14.5px;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background-color: ${props => props.$active ? '#ECFDF5' : '#F1F5F3'};
    color: ${props => props.$active ? '#059669' : '#10B981'};
  }

  /* Left border indicator for active tab */
  ${props => props.$active && `
    &::before {
      content: '';
      position: absolute;
      left: -16px;
      top: 9px;
      bottom: 9px;
      width: 4px;
      border-radius: 0 4px 4px 0;
      background: #10B981;
    }
  `}
`;

export const Label = styled.span`
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.22s, transform 0.22s;
  white-space: nowrap;

  ${SidebarContainer}:hover & {
    @media (min-width: 1025px) {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 1024px) {
    opacity: 1;
    transform: none;
  }
`;

export const BottomNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-top: 10px;
  border-top: 1px solid rgba(16, 24, 40, 0.05);
  margin-top: auto;
  margin-bottom: 18px;
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 23px;
  height: 23px;
  flex-shrink: 0;
  flex-grow: 0;
  flex: none;
`;
