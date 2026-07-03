import React, { useState } from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';

const Overlay = styled.div<{ $active: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.4);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$active ? 1 : 0};
  visibility: ${props => props.$active ? 'visible' : 'hidden'};
  transition: all 0.25s;
`;

const ModalContent = styled.div<{ $active: boolean }>`
  width: 90%;
  max-width: 480px;
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px -8px rgba(0,0,0,0.15);
  transform: scale(${props => props.$active ? 1 : 0.95}) translateY(${props => props.$active ? '0' : '10px'});
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EEE9;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 800;
  color: #111827;
  margin: 0;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #F3F4F6;
  color: #4B5563;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #E5E7EB;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 13.5px;
  font-weight: 700;
  color: #374151;
`;

const Input = styled.input`
  height: 44px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid #D1D5DB;
  background: #fff;
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  transition: border-color 0.2s;
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: #005A36;
    box-shadow: 0 0 0 3px rgba(0,90,54,0.1);
  }
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #E6EEE9;
  display: flex;
  gap: 12px;
  background: #F9FAFB;
`;

const CancelBtn = styled.button`
  flex: none;
  height: 46px;
  padding: 0 18px;
  border-radius: 12px;
  border: 1px solid #E6EEE9;
  background: #fff;
  color: #6B7280;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #F6FAF7;
  }
`;

const SaveBtn = styled.button`
  flex: 1;
  height: 46px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #00794A, #005A36);
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 8px 18px -6px rgba(0,90,54,0.45);
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.02);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const EditProfileModal: React.FC<any> = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    phoneNumber: user?.phoneNumber || '',
    email: user?.email || '',
    address: user?.address || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (onSave) onSave(formData);
    onClose();
  };

  return (
    <Overlay $active={isOpen} onClick={onClose}>
      <ModalContent $active={isOpen} onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Chỉnh sửa hồ sơ</ModalTitle>
          <CloseButton onClick={onClose}><X size={18} /></CloseButton>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Số điện thoại</Label>
            <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="VD: 0901234567" />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="VD: email@example.com" />
          </FormGroup>
          <FormGroup>
            <Label>Địa chỉ</Label>
            <Input name="address" value={formData.address} onChange={handleChange} placeholder="VD: 123 Đường ABC..." />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <CancelBtn onClick={onClose}>Hủy</CancelBtn>
          <SaveBtn onClick={handleSave}>Lưu thay đổi</SaveBtn>
        </ModalFooter>
      </ModalContent>
    </Overlay>
  );
};
