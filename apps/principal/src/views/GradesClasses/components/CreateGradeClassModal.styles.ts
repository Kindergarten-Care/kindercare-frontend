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
  background: #fff;
  border-radius: 12px;
  width: 500px;
  max-width: 90vw;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 16px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: #333;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  
  &:hover {
    background: #f5f5f5;
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
  color: #333;
`;

export const RequiredStar = styled.span`
  color: #ef4444;
  margin-left: 2px;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid ${({ $hasError }) => $hasError ? '#ef4444' : '#ccc'};
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ $hasError }) => $hasError ? '#ef4444' : '#2196F3'};
  }
`;

export const ErrorText = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

export const CancelBtn = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: transparent;
  color: #333;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
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

  &:hover {
    background: ${({ $isLoading }) => !$isLoading && '#065F46'};
  }
`;

export const ClassRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

export const RemoveBtn = styled.button`
  background: #fee2e2;
  color: #ef4444;
  border: none;
  border-radius: 6px;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #fecaca;
    color: #b91c1c;
  }
`;

export const AddClassBtn = styled.button`
  align-self: flex-start;
  background: transparent;
  color: #2196F3;
  border: 1px dashed #2196F3;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 4px;
  transition: all 0.2s;

  &:hover {
    background: #eff6ff;
  }
`;

export const SectionDivider = styled.div`
  margin: 12px 0;
  border-bottom: 1px dashed #e5e7eb;
`;
