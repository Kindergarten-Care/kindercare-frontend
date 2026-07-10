import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.04);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #F3F4F6;
`;

export const AvatarWrapper = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: #E5E7EB;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const EditAvatarButton = styled.button`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #FFFFFF;
  border: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #F9FAFB;
  }
`;

export const TeacherName = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
  text-align: center;
`;

export const RoleBadge = styled.div`
  background-color: #FEF3C7;
  color: #D97706;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
`;

export const InfoList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
  border-top: 1px solid #F3F4F6;
  padding-top: 24px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

export const InfoLabel = styled.span`
  color: #6B7280;
`;

export const InfoValue = styled.span`
  color: #111827;
  font-weight: 500;
`;

export const UpdateRequestButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: #F3F4F6;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  &:hover {
    background-color: #E5E7EB;
  }
`;

export const QuickStatsContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

export const StatBox = styled.div`
  flex: 1;
  background-color: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #F3F4F6;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const StatLabel = styled.span`
  font-size: 12px;
  color: #6B7280;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
`;

export const StatValue = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`;
