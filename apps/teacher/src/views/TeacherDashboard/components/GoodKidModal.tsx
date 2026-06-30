import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { X, Star, Calendar, Utensils, Gift } from 'lucide-react';

interface GoodKidDetails {
  id: string;
  studentName: string;
  totalStars: number;
  daysAttended: number;
  maxDays: number;
  mealsGood: number;
  maxMeals: number;
}

interface GoodKidModalProps {
  isOpen: boolean;
  data: GoodKidDetails | null;
  onClose: () => void;
  onAward: (id: string, notes: string) => void;
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
`;

const ModalBox = styled.div`
  background: #ffffff;
  width: 90%;
  max-width: 440px;
  border-radius: 24px;
  box-shadow: 0 24px 48px -12px rgba(0, 90, 54, 0.2);
  overflow: hidden;
  animation: ${popUp} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: relative;
  background: #005A36;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  text-align: center;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255,255,255,0.2);
  border: none;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 50%;
  transition: all 0.15s;

  &:hover {
    background: rgba(255,255,255,0.4);
  }
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #fff;
  color: #005A36;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 12px;
  box-shadow: 0 8px 16px -8px rgba(0,0,0,0.3);
`;

const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 4px;
`;

const Subtitle = styled.div`
  font-size: 13px;
  color: #A7E0C6;
  font-weight: 500;
`;

const Content = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const StatCard = styled.div`
  background: #F8FAF8;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
`;

const StatValue = styled.div<{ $highlight?: boolean }>`
  font-size: 20px;
  font-weight: 800;
  color: ${props => props.$highlight ? '#D97706' : '#1F2937'};
  display: flex;
  align-items: center;
  gap: 4px;

  small {
    font-size: 14px;
    opacity: 0.6;
    font-weight: 600;
  }
`;

const StatLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #6B7280;
  line-height: 1.3;
`;

const NoteArea = styled.textarea`
  width: 100%;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 16px;
  font-size: 14px;
  color: #1F2937;
  resize: none;
  height: 100px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #005A36;
    background: #fff;
  }
`;

const Footer = styled.div`
  display: flex;
  padding: 16px 24px;
  background: #fff;
`;

const ActionBtn = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 48px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 14.5px;
  cursor: pointer;
  border: none;
  background: #005A36;
  color: #fff;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -8px rgba(0, 90, 54, 0.4);
  }
`;

export const GoodKidModal: React.FC<GoodKidModalProps> = ({ isOpen, data, onClose, onAward }) => {
  const [note, setNote] = useState('');

  if (!isOpen || !data) return null;

  const initial = data.studentName.split(' ').pop()?.charAt(0).toUpperCase() || '?';

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <Header>
          <CloseBtn onClick={onClose}>
            <X size={20} strokeWidth={2.5} />
          </CloseBtn>
          <Avatar>{initial}</Avatar>
          <Title>{data.studentName}</Title>
          <Subtitle>Đánh giá Phiếu bé ngoan Tuần</Subtitle>
        </Header>
        
        <Content>
          <StatsGrid>
            <StatCard>
              <StatValue>
                {data.daysAttended}<small>/{data.maxDays}</small>
              </StatValue>
              <StatLabel><Calendar size={12} style={{ display: 'block', margin: '0 auto 4px' }} /> Ngày đi học</StatLabel>
            </StatCard>
            
            <StatCard>
              <StatValue>
                {data.mealsGood}<small>/{data.maxMeals}</small>
              </StatValue>
              <StatLabel><Utensils size={12} style={{ display: 'block', margin: '0 auto 4px' }} /> Bữa ăn tốt</StatLabel>
            </StatCard>

            <StatCard style={{ background: '#FEF3C7', borderColor: '#FDE68A' }}>
              <StatValue $highlight>
                {data.totalStars}
              </StatValue>
              <StatLabel style={{ color: '#92400E' }}><Star size={12} fill="#D97706" style={{ display: 'block', margin: '0 auto 4px' }} /> Tổng Sao</StatLabel>
            </StatCard>
          </StatsGrid>

          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
              Lời phê của Giáo viên (Tùy chọn)
            </div>
            <NoteArea 
              placeholder="VD: Tuần này con rất ngoan, ăn hết suất và hăng hái phát biểu..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </Content>

        <Footer>
          <ActionBtn onClick={() => { onAward(data.id, note); onClose(); }}>
            <Gift size={18} />
            Cấp phiếu Bé Ngoan ngay
          </ActionBtn>
        </Footer>
      </ModalBox>
    </Overlay>
  );
};
