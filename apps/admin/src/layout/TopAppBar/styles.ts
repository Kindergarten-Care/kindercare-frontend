import styled from 'styled-components';

export const TopBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 280px; /* Offset for Sidebar */
  width: calc(100vw - 280px);
  box-sizing: border-box;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  z-index: 10;
`;

export const BrandName = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 900; /* Black */
  font-size: 18px;
  color: #1e293b;
  letter-spacing: -0.45px;
`;

export const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  background-color: #f7fafc;
  border: none;
  border-radius: 9999px;
  padding: 9px 16px 9px 40px;
  width: 256px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #6b7280;
  outline: none;

  &::placeholder {
    color: #6b7280;
  }
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6b7280;
  border-radius: 9999px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f5f9;
  }
`;

export const ProfileAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  background-color: #f1f5f9;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
