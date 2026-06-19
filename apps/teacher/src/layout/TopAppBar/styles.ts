import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background: rgba(248, 250, 248, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(16, 24, 40, 0.04);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 30;
  width: 100%;
  box-sizing: border-box;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #EAEFEA;
  border-radius: 9999px;
  height: 46px;
  padding: 0 18px;
  gap: 11px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 2px 10px rgba(16, 24, 40, 0.03);
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #10B981;
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
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
  color: #1F2937;
  width: 100%;

  &::placeholder {
    color: #9CA3AF;
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
  background: #ffffff;
  border: 1px solid #EAEFEA;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  color: #374151;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 14px rgba(16, 24, 40, 0.08);
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 9px;
  right: 11px;
  width: 9px;
  height: 9px;
  background-color: #F43F5E;
  border-radius: 50%;
  box-shadow: 0 0 0 2px #fff;
`;

export const VerticalDivider = styled.div`
  width: 1px;
  height: 30px;
  background-color: rgba(16, 24, 40, 0.08);
  margin: 0 4px;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid #EAEFEA;
  padding: 6px 8px 6px 18px;
  border-radius: 9999px;
  transition: box-shadow 0.15s;

  &:hover {
    box-shadow: 0 4px 14px rgba(16, 24, 40, 0.08);
  }
`;

export const Avatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #34D399, #10B981);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 800;
  font-size: 15px;
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
  text-align: left;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

export const ProfileName = styled.span`
  color: #1F2937;
  font-size: 13.5px;
  font-weight: 700;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  line-height: 1.1;
`;

export const ProfileRole = styled.span`
  color: #9CA3AF;
  font-size: 11.5px;
  font-weight: 500;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  line-height: 1.3;
  margin-top: 1px;
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
