import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from '@/i18n/routing';

export interface FeaturedKid {
  id: string;
  name: string;
  initial: string;
  color: string;
  attendancePoints: number;
  eatSleepPoints: number;
  violationPoints: number;
  justAwarded?: boolean;
  avatarUrl?: string;
}

interface FeaturedKidsProps {
  kids: FeaturedKid[];
  onViewAll?: () => void;
}

const starpop = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.4) rotate(14deg); }
  100% { transform: scale(1); }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -.01em;
  color: #1F2937;
`;

const ViewMoreLink = styled.button`
  font-size: 13px;
  font-weight: 700;
  color: #005A36;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: ${props => props.theme.breakpoints?.lg || '1024px'}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints?.sm || '640px'}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  padding: 20px 12px 16px;
  border-radius: 18px;
  border: 1px solid #E6EEE9;
  background: #fff;
  box-shadow: 0 4px 18px -8px rgba(0, 90, 54, 0.08);
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 44px -16px rgba(0, 90, 54, 0.22) !important;
  }
`;

const Avatar = styled.span<{ $bg: string; $imgUrl?: string }>`
  position: relative;
  flex: none;
  width: 64px;
  height: 64px;
  border-radius: 20px;
  background: ${props => props.$imgUrl ? `url(${props.$imgUrl}) center/cover no-repeat` : props.$bg};
  color: ${props => props.$imgUrl ? 'transparent' : '#374151'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 24px;
`;

const NewStar = styled.span`
  position: absolute;
  top: -12px;
  right: -10px;
  font-size: 22px;
  animation: ${starpop} 0.5s ease;
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #1F2937;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Score = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 15px;
  font-weight: 800;
  color: #005A36;
`;

const StarIcon = styled.span`
  color: #D97706;
`;

const MaxScore = styled.span`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 600;
`;

const BadgesRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 9px;
  border-radius: 999px;
`;

const SmallBadge = styled(Badge)`
  background: #F3F4F6;
  color: #374151;
  border: 1px solid #E5E7EB;
`;

const FooterBtn = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #005A36;
  background: #E6F3ED;
  padding: 3px 11px;
  border-radius: 999px;
`;

export const FeaturedKidsWidget: React.FC<FeaturedKidsProps> = ({ kids, onViewAll }) => {
  const router = useRouter();
  const handleOpenAssessment = () => {
    if (onViewAll) {
      onViewAll();
      return;
    }
    router.push('/assessment');
  };
  return (
    <Wrapper>
      <HeaderRow>
        <Title>Đánh giá định kỳ</Title>
        <ViewMoreLink onClick={handleOpenAssessment}>Xem chi tiết</ViewMoreLink>
      </HeaderRow>
      <Grid>
        {kids.map(k => (
          <Card key={k.id}>
            <Avatar $bg={k.color} $imgUrl={k.avatarUrl}>
              {!k.avatarUrl && k.initial}
              {k.justAwarded && <NewStar>⭐</NewStar>}
            </Avatar>
            <Name>{k.name}</Name>
            <Score>
              <StarIcon>★</StarIcon> {k.attendancePoints + k.eatSleepPoints + k.violationPoints} <MaxScore>điểm</MaxScore>
            </Score>
            <BadgesRow>
              <SmallBadge>
                <span role="img" aria-label="Lỗi" style={{color: k.violationPoints < 0 ? '#DC2626' : '#10B981'}}>{k.violationPoints < 0 ? '⚠️' : '✓'}</span> {k.violationPoints}đ
              </SmallBadge>
              <SmallBadge>
                <span role="img" aria-label="Ăn/Ngủ">🍱</span> {k.eatSleepPoints}đ
              </SmallBadge>
            </BadgesRow>
            <FooterBtn>Xem cách tính</FooterBtn>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
};
