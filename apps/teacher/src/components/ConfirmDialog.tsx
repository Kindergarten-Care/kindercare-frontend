import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.2s ease-out;
`;

const Dialog = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  color: #1a202c;
`;

const Message = styled.p`
  margin: 0 0 20px;
  font-size: 14px;
  color: #4a5568;
  line-height: 1.5;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const CancelBtn = styled.button`
  padding: 10px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #4a5568;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f7fafc;
    border-color: #cbd5e0;
  }
`;

const ConfirmBtn = styled.button<{ $variant?: 'danger' | 'primary' }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${props => props.$variant === 'danger' ? '#e53e3e' : '#667eea'};
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$variant === 'danger' ? '#c53030' : '#5a67d8'};
  }
`;

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  variant = 'primary',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onCancel}>
      <Dialog onClick={e => e.stopPropagation()}>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Actions>
          <CancelBtn onClick={onCancel}>{cancelText}</CancelBtn>
          <ConfirmBtn $variant={variant} onClick={onConfirm}>
            {confirmText}
          </ConfirmBtn>
        </Actions>
      </Dialog>
    </Overlay>
  );
};
