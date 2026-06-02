import React from 'react';
import styled from 'styled-components';
import { WidgetCard, WidgetHeader, WidgetTitle } from '../styles';
import { PickupInfo } from '@/config/types/dashboard';

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: #f0f5ec;
  padding: 16px;
  border-radius: 12px;
`;

const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoBox = styled.div`
  flex: 1;
`;

const PersonName = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #181d18;
  margin: 0 0 4px 0;
`;

const Relation = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #3f493f;
  margin: 0;
`;

const StatusBadge = styled.div<{ $status: 'Chờ đón' | 'Đã đón' }>`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
  background: ${props => props.$status === 'Đã đón' ? '#e2e8f0' : '#005e2c'};
  color: ${props => props.$status === 'Đã đón' ? '#64748b' : 'white'};
`;

export const PickupWidget = ({ data }: { data: PickupInfo }) => {
  if (!data) return null;
  
  return (
    <WidgetCard>
      <WidgetHeader>
        <WidgetTitle>Người đón hôm nay</WidgetTitle>
      </WidgetHeader>
      <ContentWrapper>
        <Avatar>
          <img src={data.imageUrl} alt={data.personName} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </Avatar>
        <InfoBox>
          <PersonName>{data.personName}</PersonName>
          <Relation>{data.relation}</Relation>
        </InfoBox>
        <StatusBadge $status={data.status}>{data.status}</StatusBadge>
      </ContentWrapper>
    </WidgetCard>
  );
};
