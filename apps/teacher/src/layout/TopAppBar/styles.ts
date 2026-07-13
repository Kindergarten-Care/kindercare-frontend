import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 22px 32px 0;
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: ${props => props.theme.breakpoints?.lg || '1024px'}) {
    padding: 22px 16px 0;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  flex: 1;
  max-width: 460px;
  height: 48px;
  padding: 0 18px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #E6EEE9;
  box-shadow: 0 4px 18px -8px rgba(0, 90, 54, 0.08);
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #34D399;
    box-shadow: 0 4px 20px -6px rgba(0, 90, 54, 0.15);
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  color: #1F2937;

  &::placeholder {
    color: #9CA3AF;
  }
`;

export const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: none;
`;

export const NotificationWrapper = styled.div`
  position: relative;
`;

export const ActionButton = styled.button`
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  border: 1px solid #E6EEE9;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px -8px rgba(0, 90, 54, 0.12);
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 12px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #DC2626;
  box-shadow: 0 0 0 2px #fff;
`;

export const ProfileSection = styled.button`
  display: flex;
  align-items: center;
  gap: 11px;
  height: 48px;
  padding: 0 14px 0 8px;
  border-radius: 16px;
  border: 1px solid #E6EEE9;
  background: #fff;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 20px -8px rgba(0, 90, 54, 0.12);
  }
`;

export const ProfileInfo = styled.span`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
  text-align: right;
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints?.sm || '640px'}) {
    display: none;
  }
`;

export const ProfileName = styled.b`
  color: #1F2937;
  font-size: 13px;
  font-weight: 800;
  display: block;
`;

export const Avatar = styled.span`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #34D399, #005A36);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 800;
  font-size: 15px;
`;

export const MenuButton = styled.button`
  display: none;
  background: #fff;
  border: 1px solid #E6EEE9;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  color: #374151;
  transition: all 0.2s ease;
  flex-shrink: 0;
  box-shadow: 0 4px 18px -8px rgba(0, 90, 54, 0.08);

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${props => props.theme.breakpoints?.lg || '1024px'}) {
    display: flex;
  }
`;
