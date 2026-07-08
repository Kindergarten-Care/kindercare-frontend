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
  background: ${({ theme }) => theme.colors?.surface || '#fff'};
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
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border || '#eee'};
  padding-bottom: 16px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors?.text?.primary || '#333'};
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors?.text?.secondary || '#666'};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  
  &:hover {
    background: ${({ theme }) => theme.colors?.background || '#f5f5f5'};
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
  color: ${({ theme }) => theme.colors?.text?.primary || '#333'};
`;

export const RequiredStar = styled.span`
  color: #ef4444;
  margin-left: 2px;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme, $hasError }) => $hasError ? '#ef4444' : (theme.colors?.border || '#ccc')};
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme, $hasError }) => $hasError ? '#ef4444' : (theme.colors?.primary || '#2196F3')};
  }
`;

export const ErrorText = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
`;

export const NoteText = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors?.text?.secondary || '#666'};
  background: ${({ theme }) => theme.colors?.background || '#f9f9f9'};
  padding: 10px;
  border-radius: 6px;
  border-left: 3px solid ${({ theme }) => theme.colors?.primary || '#2196F3'};
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
  border: 1px solid ${({ theme }) => theme.colors?.border || '#ccc'};
  background: transparent;
  color: ${({ theme }) => theme.colors?.text?.primary || '#333'};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors?.background || '#f5f5f5'};
  }
`;

export const SubmitBtn = styled.button<{ $isLoading?: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background: ${({ theme }) => theme.colors?.primary || '#2196F3'};
  color: #fff;
  font-weight: 500;
  cursor: ${({ $isLoading }) => ($isLoading ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isLoading }) => ($isLoading ? 0.7 : 1)};
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${({ theme, $isLoading }) => !$isLoading && (theme.colors?.primaryDark || '#1976D2')};
  }
`;
