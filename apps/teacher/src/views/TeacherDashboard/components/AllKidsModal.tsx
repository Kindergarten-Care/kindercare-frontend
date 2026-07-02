import React from 'react';
import styled, { keyframes } from 'styled-components';
import { X, Trophy } from 'lucide-react';
import { FeaturedKid } from './FeaturedKidsWidget';

interface AllKidsModalProps {
  isOpen: boolean;
  onClose: () => void;
  kids: FeaturedKid[];
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const popUp = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.2s ease;
  padding: 20px;
`;

const ModalBox = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 650px;
  max-height: 85vh;
  border-radius: 24px;
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  animation: ${popUp} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #F3F4F6;
  flex-shrink: 0;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HeaderIconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: #FEF3C7;
  color: #D97706;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #111827;
`;

const Subtitle = styled.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
  margin-top: 2px;
`;

const CloseBtn = styled.button`
  background: #fff;
  border: 1px solid #E5E7EB;
  cursor: pointer;
  color: #6B7280;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 14px;
  transition: all 0.15s;
  &:hover {
    background: #F3F4F6;
    color: #1F2937;
  }
`;

const Content = styled.div`
  padding: 24px 32px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #E5E7EB;
    border-radius: 4px;
  }
`;

const KidRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #E5E7EB;
  background: #fff;
  transition: all 0.2s;
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    border-color: #D1D5DB;
  }
`;

const LeftArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Rank = styled.div<{ $rank: number }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
  color: ${props => props.$rank === 1 ? '#D97706' : (props.$rank === 2 ? '#4B5563' : (props.$rank === 3 ? '#92400E' : '#9CA3AF'))};
  background: ${props => props.$rank === 1 ? '#FEF3C7' : (props.$rank === 2 ? '#F3F4F6' : (props.$rank === 3 ? '#FFEDD5' : 'transparent'))};
`;

const Avatar = styled.div<{ $bg: string; $imgUrl?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: ${props => props.$imgUrl ? `url(${props.$imgUrl}) center/cover no-repeat` : props.$bg};
  color: ${props => props.$imgUrl ? 'transparent' : '#374151'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 20px;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #1F2937;
`;

const Badges = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const Badge = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #0F766E;
  background: #E6F3ED;
  padding: 2px 8px;
  border-radius: 999px;
`;

const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 18px;
  font-weight: 800;
  color: #005A36;
`;

const StarIcon = styled.span`
  color: #D97706;
`;

export const AllKidsModal: React.FC<AllKidsModalProps> = ({ isOpen, onClose, kids }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <Header>
          <HeaderLeft>
            <HeaderIconBox>
              <Trophy size={22} strokeWidth={2.5} />
            </HeaderIconBox>
            <HeaderText>
              <Title>Bảng vàng thành tích</Title>
              <Subtitle>Danh sách toàn bộ các bé trong lớp</Subtitle>
            </HeaderText>
          </HeaderLeft>
          <CloseBtn onClick={onClose}>
            <X size={20} strokeWidth={2} />
          </CloseBtn>
        </Header>
        
        <Content>
          {kids.map((kid, index) => (
            <KidRow key={kid.id}>
              <LeftArea>
                <Rank $rank={index + 1}>#{index + 1}</Rank>
                <Avatar $bg={kid.color} $imgUrl={kid.avatarUrl}>{!kid.avatarUrl && kid.initial}</Avatar>
                <NameBox>
                  <Name>{kid.name}</Name>
                  <Badges>
                    <Badge style={{ color: '#0F766E', background: '#E6F3ED' }}>
                      📅 {kid.attendancePoints}đ
                    </Badge>
                    <Badge style={{ color: '#92400E', background: '#FEF3C7' }}>
                      🍱 {kid.eatSleepPoints}đ
                    </Badge>
                    <Badge style={{ color: kid.violationPoints < 0 ? '#991B1B' : '#065F46', background: kid.violationPoints < 0 ? '#FEE2E2' : '#D1FAE5' }}>
                      ⚠️ {kid.violationPoints}đ
                    </Badge>
                  </Badges>
                </NameBox>
              </LeftArea>
              <RightArea>
                <StarIcon>★</StarIcon> {kid.attendancePoints + kid.eatSleepPoints + kid.violationPoints}
              </RightArea>
            </KidRow>
          ))}
        </Content>
      </ModalBox>
    </Overlay>
  );
};
