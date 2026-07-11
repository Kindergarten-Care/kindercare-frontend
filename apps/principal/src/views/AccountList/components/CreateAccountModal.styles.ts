import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 12px;
  width: 450px;
  max-width: 90vw;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 16px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: #111827;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background: #f3f4f6;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

export const RequiredStar = styled.span`
  color: #ef4444;
  margin-left: 2px;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border-radius: 9999px;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#ef4444' : '#e2e8f0')};
  font-family: inherit;
  font-size: 14px;
  outline: none;
  background-color: #ffffff;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? '#ef4444' : '#047857')};
    box-shadow: 0 0 0 3px ${({ $hasError }) =>
      $hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(4, 120, 87, 0.1)'};
  }
`;

export const ErrorText = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
`;

export const NoteText = styled.p`
  font-size: 0.85rem;
  color: #6b7280;
  background: #f9fafb;
  padding: 10px;
  border-radius: 6px;
  border-left: 3px solid #047857;
  margin: 0;
  font-style: italic;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`;

export const CancelBtn = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background: transparent;
  color: #374151;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }
`;

export const SubmitBtn = styled.button<{ $isLoading?: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background: #047857;
  color: #fff;
  font-weight: 500;
  cursor: ${({ $isLoading }) => ($isLoading ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isLoading }) => ($isLoading ? 0.7 : 1)};
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: #065f46;
  }
`;
