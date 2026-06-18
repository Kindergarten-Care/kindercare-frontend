import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: #F6FAF2;
  border-bottom: none;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  box-shadow: 0px 4px 20px rgba(14, 121, 60, 0.05);
  position: relative;
  z-index: 2;
  width: 100%;
  box-sizing: border-box;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #F0F5EC;
  border: 1px solid #BECABC;
  border-radius: 9999px;
  height: 40px;
  padding: 0 16px;
  gap: 10px;
  width: 100%;
  max-width: 480px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${props => props.theme.colors.green || '#15803d'};
    box-shadow: 0 0 0 2px rgba(21, 128, 61, 0.1);
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

export const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-size: 14px;
  color: #181D18;
  width: 100%;

  &::placeholder {
    color: #6B7280;
  }
`;

export const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const NotificationWrapper = styled.div`
  position: relative;
`;

export const ActionButton = styled.button`
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #3F493D;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    color: #181D18;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  background-color: #BA1A1A;
  border-radius: 50%;
`;

export const VerticalDivider = styled.div`
  width: 1px;
  height: 40px;
  background-color: #BECABC;
  margin: 0 8px;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #97F7AC;
  overflow: hidden;
  background: #F0F5EC;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

export const ProfileName = styled.span`
  color: #181D18;
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  line-height: 1.4;
`;

export const ProfileRole = styled.span`
  color: #3F493D;
  font-size: 12px;
  font-weight: 400;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  line-height: 1.3;
`;

export const MenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #3F493D;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    color: #181D18;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: flex;
  }
`;

