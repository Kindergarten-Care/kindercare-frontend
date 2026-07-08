import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(17, 24, 39, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
`;

export const ModalDescription = styled.p`
  font-size: 0.875rem;
  color: #4B5563;
  margin-bottom: 24px;
  line-height: 1.5;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const CancelButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #D1D5DB;
  background: white;
  border-radius: 6px;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: #F3F4F6;
  }
`;

export const ConfirmButton = styled.button<{ $danger?: boolean }>`
  padding: 8px 16px;
  border: none;
  background: ${({ $danger }) => ($danger ? '#DC2626' : '#047857')};
  border-radius: 6px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: ${({ $danger }) => ($danger ? '#B91C1C' : '#065F46')};
  }
`;
