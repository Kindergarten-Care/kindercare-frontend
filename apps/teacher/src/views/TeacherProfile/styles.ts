import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  gap: 24px;
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

export const ProfileHeader = styled.div`
  position: relative;
  width: 100%;
  border-radius: 24px;
  background: #fff;
  padding-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
`;

export const CoverImage = styled.div`
  width: 100%;
  height: 120px;
  background: #00794A;
  border-radius: 24px 24px 0 0;
`;

export const AvatarWrapper = styled.div`
  position: absolute;
  top: 56px;
  left: 40px;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background: #005A36;
  border: 10px solid #E9F1EC;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 52px;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .camera-icon {
    position: absolute;
    color: white;
    z-index: 10;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
    .camera-icon {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const HeaderInfo = styled.div`
  margin-top: 16px;
  margin-left: 200px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-right: 40px;
`;

export const TeacherName = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 4px 0;
`;

export const TeacherRole = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: #00794A;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid #E6EEE9;
  background: #fff;
  color: #374151;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F6FAF7;
    border-color: #D1E0D7;
  }
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 20px;
  border: 1px solid #E6EEE9;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
`;

export const CardTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 20px 0;
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #E6EEE9;
  margin-bottom: 24px;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${props => props.$active ? '700' : '600'};
  color: ${props => props.$active ? '#005A36' : '#9CA3AF'};
  transition: color 0.2s;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: #005A36;
    border-radius: 2px 2px 0 0;
    display: ${props => props.$active ? 'block' : 'none'};
  }
  
  &:hover {
    color: ${props => props.$active ? '#005A36' : '#4B5563'};
  }
`;

