import React, { useState } from 'react';
import styled from 'styled-components';
import { X, Eye, EyeOff, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useChangePassword } from '@/hooks/useTeacherQueries';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 16px;
  width: 90%;
  max-width: 440px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    color: #4b5563;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px 40px 12px 16px;
  font-size: 14px;
  border: 1px solid ${props => props.$hasError ? '#ef4444' : '#d1d5db'};
  border-radius: 8px;
  background-color: #fff;
  color: #111827;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ef4444' : '#005A36'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(0, 90, 54, 0.1)'};
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  
  &:hover {
    color: #4b5563;
  }
`;

const ErrorText = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ef4444;
  font-size: 13px;
  margin-top: 6px;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #f3f4f6;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background-color: #fafafa;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${props => props.$variant === 'primary' ? `
    background-color: #005A36;
    color: #fff;
    border: 1px solid #005A36;

    &:hover {
      background-color: #004d2e;
      border-color: #004d2e;
    }
    
    &:disabled {
      background-color: #a7f3d0;
      border-color: #a7f3d0;
      cursor: not-allowed;
    }
  ` : `
    background-color: #fff;
    color: #374151;
    border: 1px solid #d1d5db;

    &:hover {
      background-color: #f9fafb;
      border-color: #9ca3af;
    }
    
    &:disabled {
      color: #9ca3af;
      cursor: not-allowed;
    }
  `}
`;

const SuccessState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  background-color: #d1fae5;
  color: #059669;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @keyframes scaleIn {
    from { transform: scale(0); }
    to { transform: scale(1); }
  }
`;

const SuccessTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
`;

const SuccessDesc = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 24px 0;
`;

interface PasswordModalProps {
  onClose: () => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({ onClose }) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const changePasswordMutation = useChangePassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Vui lòng điền đầy đủ các trường.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp với mật khẩu mới.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }

    changePasswordMutation.mutate(
      { current: currentPassword, new: newPassword },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: (err: any) => {
          setError(err.message || 'Có lỗi xảy ra khi đổi mật khẩu.');
        }
      }
    );
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        {isSuccess ? (
          <SuccessState>
            <SuccessIcon>
              <CheckCircle2 size={32} />
            </SuccessIcon>
            <SuccessTitle>Đổi mật khẩu thành công!</SuccessTitle>
            <SuccessDesc>Mật khẩu của bạn đã được cập nhật an toàn.</SuccessDesc>
            <Button $variant="primary" onClick={onClose} style={{ width: '100%' }}>
              Hoàn tất
            </Button>
          </SuccessState>
        ) : (
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <ModalTitle>
                <Lock size={20} color="#005A36" />
                Đổi mật khẩu
              </ModalTitle>
              <CloseButton type="button" onClick={onClose}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <FormGroup>
                <Label>Mật khẩu hiện tại</Label>
                <InputWrapper>
                  <Input 
                    type={showCurrent ? 'text' : 'password'} 
                    placeholder="Nhập mật khẩu hiện tại"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    disabled={changePasswordMutation.isPending}
                  />
                  <PasswordToggle 
                    type="button" 
                    onClick={() => setShowCurrent(!showCurrent)}
                    title={showCurrent ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                  </PasswordToggle>
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <Label>Mật khẩu mới</Label>
                <InputWrapper>
                  <Input 
                    type={showNew ? 'text' : 'password'} 
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    disabled={changePasswordMutation.isPending}
                  />
                  <PasswordToggle 
                    type="button" 
                    onClick={() => setShowNew(!showNew)}
                    title={showNew ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </PasswordToggle>
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <Label>Xác nhận mật khẩu mới</Label>
                <InputWrapper>
                  <Input 
                    type={showNew ? 'text' : 'password'} 
                    placeholder="Nhập lại mật khẩu mới"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    disabled={changePasswordMutation.isPending}
                    $hasError={!!error && error.includes('không khớp')}
                  />
                </InputWrapper>
                {error && (
                  <ErrorText>
                    <AlertCircle size={14} />
                    {error}
                  </ErrorText>
                )}
              </FormGroup>
            </ModalBody>
            
            <ModalFooter>
              <Button 
                type="button" 
                $variant="secondary" 
                onClick={onClose}
                disabled={changePasswordMutation.isPending}
              >
                Huỷ bỏ
              </Button>
              <Button 
                type="submit" 
                $variant="primary"
                disabled={changePasswordMutation.isPending}
              >
                {changePasswordMutation.isPending ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};
