import React, { useState } from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  FormGroup,
  Label,
  RequiredStar,
  Input,
  ErrorText,
  NoteText,
  ButtonGroup,
  CancelBtn,
  SubmitBtn
} from './CreateAccountModal.styles';
import { kcToast } from '@kindercare/ui';
import { accountService } from '../../../services/account/AccountService';

interface CreateAccountModalProps {
  role: 'teacher' | 'parent';
  onClose: () => void;
  onSuccess: () => void;
}

const removeVietnameseTones = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
};

const generateUsername = (name: string) => {
  const cleanName = removeVietnameseTones(name.trim()).toLowerCase();
  if (!cleanName) return '';
  const parts = cleanName.split(/\s+/);
  if (parts.length === 1) return parts[0];
  const last = parts.pop() || '';
  const initials = parts.map(p => p.charAt(0)).join('');
  return initials + last;
};

export const CreateAccountModal: React.FC<CreateAccountModalProps> = ({ role, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    phoneNumber: '',
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUsernameTouched, setIsUsernameTouched] = useState(false);

  const title = role === 'teacher' ? 'Thêm Giáo viên' : 'Thêm Phụ huynh';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'username') {
      setIsUsernameTouched(true);
    }

    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Auto-generate username if fullName changes and username hasn't been manually touched
      if (name === 'fullName' && !isUsernameTouched) {
        newData.username = generateUsername(value);
      }
      
      return newData;
    });

    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username.trim()) newErrors.username = 'Tên đăng nhập là bắt buộc';
    if (!formData.fullName.trim()) newErrors.fullName = 'Họ và tên là bắt buộc';
    
    if (role === 'parent' && !formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Số điện thoại là bắt buộc đối với phụ huynh';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await accountService.createAccount(role, formData);
      kcToast.success('Tạo tài khoản thành công!');
      onSuccess();
    } catch (error: any) {
      kcToast.error(error.message || 'Có lỗi xảy ra khi tạo tài khoản');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <NoteText>Mật khẩu mặc định của tài khoản sẽ là <strong>123456</strong>.</NoteText>
          
          <FormGroup>
            <Label>Tên đăng nhập <RequiredStar>*</RequiredStar></Label>
            <Input 
              name="username"
              value={formData.username}
              onChange={handleChange}
              $hasError={!!errors.username}
              placeholder="Nhập tên đăng nhập (VD: nguyenvan_a)"
            />
            {errors.username && <ErrorText>{errors.username}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Họ và tên <RequiredStar>*</RequiredStar></Label>
            <Input 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              $hasError={!!errors.fullName}
              placeholder="Nhập họ và tên"
            />
            {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>
              Số điện thoại 
              {role === 'parent' && <RequiredStar>*</RequiredStar>}
            </Label>
            <Input 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              $hasError={!!errors.phoneNumber}
              placeholder="Nhập số điện thoại"
            />
            {errors.phoneNumber && <ErrorText>{errors.phoneNumber}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email (Tùy chọn)"
            />
          </FormGroup>

          <ButtonGroup>
            <CancelBtn type="button" onClick={onClose} disabled={isSubmitting}>Hủy</CancelBtn>
            <SubmitBtn type="submit" $isLoading={isSubmitting} disabled={isSubmitting}>
              {isSubmitting ? 'Đang xử lý...' : 'Lưu'}
            </SubmitBtn>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};
