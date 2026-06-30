import React from 'react';
import styled, { keyframes } from 'styled-components';
import { X, Grid } from 'lucide-react';

interface AllFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFeature: (featureName: string) => void;
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

const features = [
  { id: '1', name: 'Điểm danh QR', icon: '✓', bg: '#E6F3ED', color: '#005A36' },
  { id: '2', name: 'Danh sách lớp', icon: '👥', bg: '#EEF2FF', color: '#4338CA' },
  { id: '3', name: 'Hồ sơ bé', icon: '👦', bg: '#FFEDD5', color: '#C2410C' },
  { id: '4', name: 'Thực đơn & Lịch học', icon: '📅', bg: '#F3E8FF', color: '#7E22CE' },
  { id: '5', name: 'Soạn giáo án', icon: '📝', bg: '#ECFDF5', color: '#047857' },
  { id: '6', name: 'Y tế & Sức khỏe', icon: '💊', bg: '#FEE2E2', color: '#DC2626' },
  { id: '7', name: 'Phiếu bé ngoan', icon: '⭐', bg: '#FEF3C7', color: '#D97706' },
  { id: '8', name: 'Nhật ký lớp', icon: '📸', bg: '#DBEAFE', color: '#1D4ED8' },
  { id: '9', name: 'Hồ sơ & Cài đặt', icon: '⚙️', bg: '#F3F4F6', color: '#4B5563' },
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
            <FeatureCard key={f.id} onClick={() => { onSelectFeature(f.name); onClose(); }}>
              <IconBox $bg={f.bg} $color={f.color}>{f.icon}</IconBox>
              <FeatureName>{f.name}</FeatureName>
            </FeatureCard>
          ))}
        </Content>
      </ModalBox>
    </Overlay>
  );
};
