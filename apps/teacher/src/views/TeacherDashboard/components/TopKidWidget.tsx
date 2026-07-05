import React from 'react';
import styled from 'styled-components';
import { Crown, Star, Gift } from 'lucide-react';

interface TopKidProps {
  name: string;
  initial: string;
  attendancePoints: number;
  eatSleepPoints: number;
  violationPoints: number;
  avatarUrl?: string;
  onView: () => void;
}

const Card = styled.div`
  background: #005A36;
  border-radius: 22px;
  padding: 24px;
  color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 12px 32px -12px rgba(0, 90, 54, 0.4);
`;

const CrownIcon = styled.div`
  position: absolute;
  top: 18px;
  right: 18px;
  font-size: 22px;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
`;

const Avatar = styled.div<{ $imgUrl?: string }>`
  width: 68px;
  height: 68px;
  background: ${props => props.$imgUrl ? `url(${props.$imgUrl}) center/cover no-repeat` : '#fff'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
  color: ${props => props.$imgUrl ? 'transparent' : '#005A36'};
  margin-bottom: 12px;
  box-shadow: 0 8px 16px -8px rgba(0,0,0,0.3);
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 8px;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #fff;
  color: #005A36;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  margin-bottom: 16px;

  svg {
    color: #FBBF24;
  }
`;

const Description = styled.p`
  font-size: 12.5px;
  text-align: center;
  color: #A7E0C6;
  line-height: 1.5;
  margin: 0 0 20px 0;
  
  strong {
    color: #fff;
    font-weight: 700;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 24px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 4px;

  small {
    font-size: 13px;
    font-weight: 700;
    opacity: 0.8;
  }
`;

const StatLabel = styled.div`
  font-size: 10.5px;
  color: #A7E0C6;
  font-weight: 600;
  margin-top: 4px;
`;

const AwardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 44px;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 14px;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #fff;
    color: #005A36;
  }
`;

export const TopKidWidget: React.FC<TopKidProps> = ({ 
  name, 
  initial, 
  attendancePoints,
  eatSleepPoints,
  violationPoints,
  avatarUrl,
  onView 
}) => {
  return (
    <Card>
      <CrownIcon>👑</CrownIcon>
      
      <Avatar $imgUrl={avatarUrl}>{!avatarUrl && initial}</Avatar>
      <Name>{name}</Name>
      
      <Badge>
        <Star size={12} fill="#FBBF24" /> Bé ngoan nhất tháng
      </Badge>
      
      <Description>
        Xếp hạng được tính tự động dựa trên <strong>Điểm danh, Ăn/Ngủ</strong> và <strong>Trừ điểm Vi phạm</strong>. 
        {name} đạt điểm cao nhất tháng này 🎉
      </Description>
      
      <StatsContainer>
        <StatItem>
          <StatValue>{attendancePoints}</StatValue>
          <StatLabel>Điểm danh</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{eatSleepPoints}</StatValue>
          <StatLabel>Ăn/Ngủ</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue style={{ color: violationPoints < 0 ? '#FCA5A5' : '#86EFAC' }}>
            {violationPoints}
          </StatValue>
          <StatLabel>Vi phạm</StatLabel>
        </StatItem>
      </StatsContainer>
      
      <AwardButton onClick={onView}>
        Xem bảng điểm chi tiết
      </AwardButton>
    </Card>
  );
};
