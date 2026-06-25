import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const ModalContainer = styled.div`
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  padding: 24px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const CloseBtn = styled.button`
  background: #F3F4F6;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #E5E7EB;
    color: #374151;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  border: 1px solid #D1D5DB;
  border-radius: 12px;
  padding: 12px;
  font-size: 14px;
  color: #374151;
  resize: none;
  font-family: inherit;
  margin-bottom: 16px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

export const ImageUploadWrapper = styled.div`
  border: 2px dashed #D1D5DB;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 24px;
  transition: all 0.2s;
  background: #F9FAFB;

  &:hover {
    border-color: #3B82F6;
    background: #EFF6FF;
  }
`;

export const UploadIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
  color: #9CA3AF;
`;

export const UploadText = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 16px;
  border: 1px solid #E5E7EB;
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const Button = styled.button<{ $primary?: boolean }>`
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.$primary ? `
    background: #3B82F6;
    color: white;
    border: none;
    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);

    &:hover {
      background: #2563EB;
    }
    
    &:disabled {
      background: #9CA3AF;
      cursor: not-allowed;
      box-shadow: none;
    }
  ` : `
    background: #fff;
    color: #374151;
    border: 1px solid #D1D5DB;

    &:hover {
      background: #F9FAFB;
    }
  `}
`;
