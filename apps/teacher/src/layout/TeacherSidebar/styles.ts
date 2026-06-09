import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background-color: #fff;
  border-right: 1px solid rgba(190, 202, 188, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 100;
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
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
`;

export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  gap: 8px;
`;

export const NavItem = styled.div<{ active?: boolean }>`
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => props.active ? '#e8f5e9' : 'transparent'};
  color: ${props => props.active ? '#005e2c' : '#3f493f'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  font-family: 'Plus Jakarta Sans', sans-serif;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.active ? '#e8f5e9' : '#f6fbf2'};
  }
`;
