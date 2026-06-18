import styled from 'styled-components';

export const SidebarContainer = styled.aside<{ $isOpen?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background-color: #fff;
  border-right: 1px solid rgba(190, 202, 188, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 10000;
  transition: transform 0.3s ease-in-out;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    box-shadow: ${props => props.$isOpen ? '4px 0 25px rgba(0, 0, 0, 0.15)' : 'none'};
  }
`;

export const LogoContainer = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid rgba(190, 202, 188, 0.2);

  h2 {
    color: #005e2c;
    font-size: 24px;
    font-weight: bold;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
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

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: flex;
  }
`;


export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  gap: 8px;
`;

export const NavItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => props.$active ? '#e8f5e9' : 'transparent'};
  color: ${props => props.$active ? '#005e2c' : '#3f493f'};
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  font-family: 'Montserrat', sans-serif;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.$active ? '#e8f5e9' : '#f6fbf2'};
  }
`;

export const BottomNav = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
  margin-top: auto;
  border-top: 1px solid rgba(190, 202, 188, 0.4);
`;
