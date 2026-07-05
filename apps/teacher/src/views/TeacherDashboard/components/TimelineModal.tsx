import React from 'react';
import styled, { keyframes } from 'styled-components';
import { X, Calendar } from 'lucide-react';
import TimelineWidget from './TimelineWidget';

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  classId?: number | null;
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
  background: #F9FAFB;
  width: 100%;
  max-width: 500px;
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
  border-bottom: 1px solid #E5E7EB;
  background: #ffffff;
  flex-shrink: 0;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const IconWrapper = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #EEF2FF;
  color: #4F46E5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 19px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.01em;
`;

const Subtitle = styled.span`
  font-size: 13px;
  color: #6B7280;
  font-weight: 500;
  margin-top: 2px;
`;

const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: #F3F4F6;
  color: #6B7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #E5E7EB;
    color: #111827;
    transform: rotate(90deg);
  }
`;

const Content = styled.div`
  padding: 24px 32px;
  overflow-y: auto;
  flex: 1;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #D1D5DB;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #9CA3AF;
  }
`;

export const TimelineModal: React.FC<TimelineModalProps> = ({ isOpen, onClose, classId }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderLeft>
            <IconWrapper>
              <Calendar size={22} strokeWidth={2.5} />
            </IconWrapper>
            <TitleBlock>
              <Title>Lịch trình sinh hoạt</Title>
              <Subtitle>Hoạt động trong ngày của lớp</Subtitle>
            </TitleBlock>
          </HeaderLeft>
          <CloseButton onClick={onClose}>
            <X size={20} strokeWidth={2.5} />
          </CloseButton>
        </Header>

        <Content>
          <TimelineWidget classId={classId} />
        </Content>
      </ModalBox>
    </Overlay>
  );
};
