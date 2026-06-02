import React from 'react';
import styled from 'styled-components';
import { WidgetCard } from '../styles';
import { ChildStatus } from '@/config/types/dashboard';

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const AvatarWrapper = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: 4px solid #97f7ac;
  overflow: hidden;
  margin-bottom: -16px;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StatusBadge = styled.div`
  background: #005e2c;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  z-index: 2;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 16px;
`;

const ChildName = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #181d18;
  margin: 0 0 4px 0;
`;

const ClassName = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #3f493f;
  margin: 0 0 24px 0;
`;

const InfoBox = styled.div`
  background: #f0f5ec;
  border-radius: 12px;
  padding: 16px 24px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const InfoLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  color: #3f493f;
  font-weight: 500;
`;

const InfoValue = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #005e2c;
`;

const ActionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
`;

const ActionButton = styled.button<{ $variant: 'primary' | 'outline' }>`
  font-family: 'Montserrat', sans-serif;
  padding: 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: ${props => props.$variant === 'outline' ? '1px solid #ba1a1a' : 'none'};
  background: ${props => props.$variant === 'primary' ? '#005e2c' : 'transparent'};
  color: ${props => props.$variant === 'primary' ? 'white' : '#ba1a1a'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const ChildStatusWidget = ({ data }: { data: ChildStatus }) => {
  return (
    <WidgetCard>
      <StatusContainer>
        <AvatarWrapper>
          <img src="/assets/mock/child_avatar.png" alt={data.name} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </AvatarWrapper>
        <StatusBadge>{data.status}</StatusBadge>
        <ChildName>{data.name}</ChildName>
        <ClassName>{data.class}</ClassName>

        <InfoBox>
          <div>
            <InfoLabel>Cân nặng (Tháng 5)</InfoLabel>
            <InfoValue>{data.weight} kg</InfoValue>
          </div>
          <div style={{ display: 'flex', gap: '4px', fontSize: '18px' }}>
            <span>⭐</span>
            <span>🎨</span>
            <span>🏆</span>
          </div>
        </InfoBox>

        <ActionRow>
          <ActionButton $variant="primary">Dặn dò</ActionButton>
          <ActionButton $variant="outline">Xin nghỉ</ActionButton>
        </ActionRow>
      </StatusContainer>
    </WidgetCard>
  );
};
