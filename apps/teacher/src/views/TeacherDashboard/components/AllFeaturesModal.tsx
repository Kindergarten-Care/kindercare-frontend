import React from 'react';
import styled, { keyframes } from 'styled-components';
import { X, Grid } from 'lucide-react';

interface AllFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFeature: (featureId: string) => void;
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
  max-width: 680px;
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
  background: #005A36;
  color: #fff;
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
  padding: 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FeatureCard = styled.button`
  background: #fff;
  border: 1px solid #F3F4F6;
  border-radius: 20px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  font-family: inherit;

  &:hover {
    border-color: #005A36;
    box-shadow: 0 12px 24px -10px rgba(0, 90, 54, 0.15);
    transform: translateY(-2px);
  }
`;

const IconBox = styled.div<{ $bg: string; $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
`;

const FeatureName = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #1F2937;
`;

/**
 * Danh sách phím tắt → trang/chức năng.
 * `id` dùng để switch ở dashboard (KHÔNG dùng tên hiển thị vì dễ vỡ khi đổi label).
 * Xóa: 'students' (Hồ sơ bé) theo yêu cầu anh.
 */
const features = [
  { id: 'attendance',    name: 'Điểm danh',        icon: '📋', bg: '#EEF2FF', color: '#4338CA' },
  { id: 'students',      name: 'Danh sách lớp',    icon: '👥', bg: '#DBEAFE', color: '#1D4ED8' },
  { id: 'schedule',      name: 'Thời khoá biểu',   icon: '📅', bg: '#F3E8FF', color: '#7E22CE' },
  { id: 'activities',    name: 'Hoạt động',        icon: '🎨', bg: '#FCE7F3', color: '#BE185D' },
  { id: 'health',        name: 'Y tế & Sức khỏe',  icon: '💊', bg: '#FEE2E2', color: '#DC2626' },
  { id: 'leave',         name: 'Đơn xin nghỉ',     icon: '📬', bg: '#FEF9C3', color: '#854D0E' },
  { id: 'assessment',    name: 'Đánh giá định kỳ', icon: '📊', bg: '#FEF3C7', color: '#D97706' },
  { id: 'newsfeed',      name: 'Nhật ký lớp',      icon: '📸', bg: '#E0E7FF', color: '#4338CA' },
  { id: 'weekly-schedule', name: 'Lịch tuần',      icon: '🗓️', bg: '#FEF3C7', color: '#B45309' },
  { id: 'profile',       name: 'Hồ sơ cá nhân',    icon: '👤', bg: '#F3F4F6', color: '#4B5563' },
];

export const AllFeaturesModal: React.FC<AllFeaturesModalProps> = ({ isOpen, onClose, onSelectFeature }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <Header>
          <HeaderLeft>
            <HeaderIconBox>
              <Grid size={22} strokeWidth={2.5} />
            </HeaderIconBox>
            <HeaderText>
              <Title>Tất cả chức năng</Title>
              <Subtitle>Chọn nhanh công cụ bạn cần</Subtitle>
            </HeaderText>
          </HeaderLeft>
          <CloseBtn onClick={onClose}>
            <X size={20} strokeWidth={2} />
          </CloseBtn>
        </Header>

        <Content>
          {features.map(f => (
            <FeatureCard key={f.id} onClick={() => { onSelectFeature(f.id); onClose(); }}>
              <IconBox $bg={f.bg} $color={f.color}>{f.icon}</IconBox>
              <FeatureName>{f.name}</FeatureName>
            </FeatureCard>
          ))}
        </Content>
      </ModalBox>
    </Overlay>
  );
};