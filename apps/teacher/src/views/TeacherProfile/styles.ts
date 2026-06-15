import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 0;
  gap: 24px;
`;

export const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  color: #4b5563;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  font-family: inherit;

  &:hover {
    background-color: #f3f4f6;
    color: #111827;
    border-color: #d1d5db;
  }
`;

export const ProfileTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 32px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Column1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 600px;
`;
