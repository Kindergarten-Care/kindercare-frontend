import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  width: 500px;
  max-width: 90vw;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

export const CloseButton = styled.button.attrs({ type: 'button' })`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  line-height: 1;
  &:hover {
    color: #111827;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: #374151;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  
  &:focus {
    border-color: #0284c7;
    box-shadow: 0 0 0 1px #0284c7;
  }
`;

export const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: #f9fafb;
`;

export const Button = styled.button.attrs({ type: 'button' })<{ $primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.$primary ? `
    background: #0284c7;
    color: white;
    border: none;
    &:hover:not(:disabled) { background: #0369a1; }
  ` : `
    background: white;
    color: #374151;
    border: 1px solid #d1d5db;
    &:hover:not(:disabled) { background: #f3f4f6; }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CustomSelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const CustomSelectTrigger = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ $isOpen }) => ($isOpen ? '#0284c7' : '#d1d5db')};
  border-radius: 6px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-shadow: ${({ $isOpen }) => ($isOpen ? '0 0 0 1px #0284c7' : 'none')};
  
  &:hover {
    border-color: #9ca3af;
  }
`;

export const CustomSelectDropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  max-height: 250px;
  overflow-y: auto;
  z-index: 50;
`;

export const CustomSelectOption = styled.div<{ $selected?: boolean }>`
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  background: ${({ $selected }) => ($selected ? '#f0f9ff' : 'transparent')};
  
  &:hover {
    background: ${({ $selected }) => ($selected ? '#e0f2fe' : '#f9fafb')};
  }
`;

export const TeacherAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  background: #f3f4f6;
`;

export const TeacherAvatarPlaceholder = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
`;

export const TeacherInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TeacherName = styled.span`
  font-weight: 500;
  color: #111827;
  font-size: 0.95rem;
`;

export const TeacherUsername = styled.span`
  color: #6b7280;
  font-size: 0.8125rem;
`;
