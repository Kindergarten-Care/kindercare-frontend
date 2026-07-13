import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  KmField,
  KmLabel,
  KmInput,
  KmErrorText,
  KmCallout,
  KmFoot,
  KmBtn,
  UserPlusIcon,
} from '@/components/Modal';
import { Dropdown, kcToast } from '@kindercare/ui';
import { accountService } from '../../../services/account/AccountService';

const GENDER_OPTIONS = [
  { value: 'Nam', label: 'Nam' },
  { value: 'Nữ', label: 'Nữ' },
  { value: 'Khác', label: 'Khác' },
];

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
    gender: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUsernameTouched, setIsUsernameTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const title = role === 'teacher' ? 'Thêm Giáo viên' : 'Thêm Phụ huynh';
  const subtitle = role === 'teacher' ? 'Tạo tài khoản giáo viên mới' : 'Tạo tài khoản phụ huynh mới';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'username') {
      setIsUsernameTouched(true);
    }
    if (name === 'email') {
      setIsEmailTouched(true);
    }

    setFormData(prev => {
      const newData = { ...prev, [name]: value };

      // Auto-generate username if fullName changes and username hasn't been manually touched (only for teachers)
      if (role === 'teacher' && name === 'fullName' && !isUsernameTouched) {
        newData.username = generateUsername(value);
      }

      // Auto-generate email from username if not manually touched (only for teachers)
      if (role === 'teacher' && (name === 'fullName' || name === 'username') && !isEmailTouched) {
        newData.email = newData.username ? `${newData.username}@kindercare.edu.vn` : '';
      }

      return newData;
    });

    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleGenderChange = (value: string) => {
    setFormData(prev => ({ ...prev, gender: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (role === 'teacher' && !formData.username.trim()) newErrors.username = 'Tên đăng nhập là bắt buộc';
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

    const payload: any = { ...formData };
    if (role === 'parent') {
      payload.username = formData.phoneNumber;
      delete payload.gender;
    } else if (!payload.gender) {
      delete payload.gender;
    }

    setIsSubmitting(true);
    try {
      await accountService.createAccount(role, payload);
      kcToast.success('Tạo tài khoản thành công!');
      onSuccess();
    } catch (error: any) {
      kcToast.error(error.message || 'Có lỗi xảy ra khi tạo tài khoản');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal size="md" onClose={onClose}>
      <ModalHeader
        icon={<UserPlusIcon />}
        iconVariant="brand"
        title={title}
        subtitle={subtitle}
        onClose={onClose}
      />

      <form onSubmit={handleSubmit}>
        <ModalBody>
          <KmField>
            <KmLabel>Họ và tên <span className="opt">*</span></KmLabel>
            <KmInput
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
            />
            {errors.fullName && <KmErrorText>{errors.fullName}</KmErrorText>}
          </KmField>

          {role === 'teacher' && (
            <KmField>
              <KmLabel>Tên đăng nhập <span className="opt">*</span></KmLabel>
              <KmInput
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nhập tên đăng nhập (VD: nguyenvan_a)"
              />
              {errors.username && <KmErrorText>{errors.username}</KmErrorText>}
            </KmField>
          )}

          <KmField>
            <KmLabel>
              Số điện thoại
              {role === 'parent' && <span className="opt"> *</span>}
            </KmLabel>
            <KmInput
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
            />
            {errors.phoneNumber && <KmErrorText>{errors.phoneNumber}</KmErrorText>}
          </KmField>

          <KmField>
            <KmLabel>Email</KmLabel>
            <KmInput
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
            />
          </KmField>

          {role === 'teacher' && (
            <KmField>
              <KmLabel>Giới tính</KmLabel>
              <Dropdown
                value={formData.gender}
                onChange={handleGenderChange}
                options={GENDER_OPTIONS}
                placeholder="Chọn giới tính"
                fullWidth
                ariaLabel="Giới tính"
              />
            </KmField>
          )}

          <KmCallout $variant="amber">
            {role === 'teacher' ? (
              <span>Mật khẩu mặc định của tài khoản sẽ là <b>123456</b>.</span>
            ) : (
              <span>Hệ thống sẽ dùng Số điện thoại làm Tên đăng nhập. Mật khẩu mặc định là <b>123456</b>.</span>
            )}
          </KmCallout>
        </ModalBody>

        <KmFoot>
          <KmBtn type="button" $variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Hủy
          </KmBtn>
          <KmBtn type="submit" $variant="brand" disabled={isSubmitting}>
            {isSubmitting ? 'Đang xử lý...' : 'Lưu'}
          </KmBtn>
        </KmFoot>
      </form>
    </Modal>
  );
};
