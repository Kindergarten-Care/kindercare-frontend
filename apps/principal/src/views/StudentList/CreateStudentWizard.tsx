'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Dropdown } from '@kindercare/ui';
import { accountService } from '@/services/account/AccountService';
import { studentService } from '@/services/Student/StudentService';
import {
  Modal, ModalHeader, ModalBody,
  KmField, KmLabel, KmInput, KmTextArea, KmFoot, KmBtn,
  UsersIcon,
} from '@/components/Modal';

const GENDER_OPTIONS = [
  { value: 'Nam', label: 'Nam' },
  { value: 'Nữ', label: 'Nữ' },
];

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Step = styled.div<{ $active: boolean; $completed: boolean }>`
  flex: 1;
  text-align: center;
  padding-bottom: 8px;
  border-bottom: 3px solid ${props => props.$active ? (props.theme.colors.primary || '#047857') : props.$completed ? '#34d399' : (props.theme.colors.border || '#e5e7eb')};
  color: ${props => props.$active || props.$completed ? (props.theme.colors.primary || '#047857') : (props.theme.colors.muted || '#9ca3af')};
  font-weight: 500;
  font-size: 0.875rem;
`;

const SearchBox = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  background: ${({ theme }) => theme.colors.neutralLight || '#f3f4f6'};
  padding: 16px;
  border-radius: 10px;
`;

const Alert = styled.div<{ $type: 'success' | 'error' | 'info' }>`
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 0.875rem;
  background: ${props => props.$type === 'error' ? '#fef2f2' : props.$type === 'success' ? (props.theme.colors.successLight || '#ecfdf5') : '#eff6ff'};
  color: ${props => props.$type === 'error' ? '#991b1b' : props.$type === 'success' ? '#065f46' : '#1e40af'};
  border: 1px solid ${props => props.$type === 'error' ? '#f87171' : props.$type === 'success' ? '#34d399' : '#93c5fd'};
`;

interface WizardProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateStudentWizard({ onClose, onSuccess }: WizardProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [paymentConfigs, setPaymentConfigs] = useState<{ packages: any[], baseFee: any }>({ packages: [], baseFee: null });
  const [packageId, setPackageId] = useState<number | ''>('');

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const configs = await studentService.getPaymentConfigs();
        setPaymentConfigs(configs);
        if (configs.packages.length > 0) {
          setPackageId(configs.packages[0].id);
        }
      } catch (err) {
        console.error('Error fetching payment configs', err);
      }
    };
    fetchConfigs();
  }, []);

  const [student, setStudent] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: 'Nam',
    admissionDate: new Date().toISOString().split('T')[0],
    allergies: ''
  });

  const [parent, setParent] = useState({
    id: null as number | null,
    fullName: '',
    phoneNumber: '',
    email: '',
    occupation: '',
    address: ''
  });

  const [isNewParent, setIsNewParent] = useState(true);
  const [searchPhone, setSearchPhone] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearchParent = async () => {
    if (!searchPhone) return;
    try {
      setSearchLoading(true);
      setError(null);
      const foundParent = await accountService.searchParents(searchPhone);

      if (foundParent) {
        setIsNewParent(false);
        setParent({
          id: foundParent.id,
          fullName: foundParent.fullName,
          phoneNumber: foundParent.phoneNumber,
          email: foundParent.email || '',
          occupation: foundParent.occupation || '',
          address: foundParent.address || ''
        });
      } else {
        setIsNewParent(true);
        setParent({
          id: null,
          fullName: '',
          phoneNumber: searchPhone,
          email: '',
          occupation: '',
          address: ''
        });
        setError('Không tìm thấy phụ huynh. Vui lòng nhập thông tin mới.');
      }
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tìm kiếm');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!student.fullName || !student.dateOfBirth) {
        throw new Error('Vui lòng nhập đủ tên và ngày sinh học sinh');
      }
      if (!parent.fullName || !parent.phoneNumber) {
        throw new Error('Vui lòng nhập đủ tên và SĐT phụ huynh');
      }

      const payload = {
        student: {
          ...student,
          dateOfBirth: Math.floor(new Date(student.dateOfBirth).getTime() / 1000),
          admissionDate: Math.floor(new Date(student.admissionDate).getTime() / 1000)
        },
        parent: {
          ...parent
        },
        isNewParent,
        account: isNewParent ? {
          username: parent.phoneNumber,
          password: '123456'
        } : null,
        packageId: packageId === '' ? null : packageId
      };

      await studentService.enrollStudent(payload);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Lỗi khi lưu hồ sơ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal size="lg" onClose={onClose}>
      <ModalHeader
        icon={<UsersIcon />}
        iconVariant="brand"
        title="Thêm Hồ Sơ Học Sinh Mới"
        onClose={onClose}
      />

      <ModalBody>
        <StepIndicator>
          <Step $active={step === 1} $completed={step > 1}>1. Thông tin Học sinh</Step>
          <Step $active={step === 2} $completed={step > 2}>2. Thông tin Phụ huynh</Step>
          <Step $active={step === 3} $completed={step > 3}>3. Cấu hình Tài khoản</Step>
        </StepIndicator>

        {error && <Alert $type={step === 2 && error.includes('Không tìm thấy') ? 'info' : 'error'}>{error}</Alert>}

        {step === 1 && (
          <>
            <KmField>
              <KmLabel>Họ và tên học sinh *</KmLabel>
              <KmInput
                value={student.fullName}
                onChange={e => setStudent({...student, fullName: e.target.value})}
                placeholder="Nhập họ và tên..."
              />
            </KmField>
            <div style={{ display: 'flex', gap: '16px' }}>
              <KmField style={{ flex: 1 }}>
                <KmLabel>Ngày sinh *</KmLabel>
                <KmInput
                  type="date"
                  value={student.dateOfBirth}
                  onChange={e => setStudent({...student, dateOfBirth: e.target.value})}
                />
              </KmField>
              <KmField style={{ flex: 1 }}>
                <KmLabel>Giới tính</KmLabel>
                <Dropdown
                  value={student.gender}
                  onChange={(val) => setStudent({...student, gender: val})}
                  options={GENDER_OPTIONS}
                  fullWidth
                  ariaLabel="Giới tính"
                />
              </KmField>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <KmField style={{ flex: 1 }}>
                <KmLabel>Ngày nhập học</KmLabel>
                <KmInput
                  type="date"
                  value={student.admissionDate}
                  onChange={e => setStudent({...student, admissionDate: e.target.value})}
                />
              </KmField>
              <KmField style={{ flex: 1 }}>
                <KmLabel>Gói học phí</KmLabel>
                <Dropdown
                  value={packageId === '' ? null : String(packageId)}
                  onChange={(val) => setPackageId(Number(val))}
                  options={paymentConfigs.packages.map(pkg => ({
                    value: String(pkg.id),
                    label: `${pkg.name} (${pkg.duration} tháng - Giảm ${pkg.discount}%)`,
                  }))}
                  fullWidth
                  ariaLabel="Gói học phí"
                />
              </KmField>
            </div>
            <KmField>
              <KmLabel>Ghi chú dị ứng / bệnh lý (Nếu có)</KmLabel>
              <KmTextArea
                value={student.allergies}
                onChange={e => setStudent({...student, allergies: e.target.value})}
                placeholder="Ví dụ: Dị ứng đậu phộng, hen suyễn..."
              />
            </KmField>
          </>
        )}

        {step === 2 && (
          <>
            <SearchBox>
              <div style={{ flex: 1 }}>
                <KmLabel>Tìm kiếm phụ huynh đã có con học tại trường</KmLabel>
                <KmInput
                  placeholder="Nhập số điện thoại..."
                  value={searchPhone}
                  onChange={e => setSearchPhone(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearchParent()}
                />
              </div>
              <KmBtn
                $variant="brand"
                type="button"
                style={{ alignSelf: 'flex-end' }}
                onClick={handleSearchParent}
                disabled={searchLoading}
              >
                {searchLoading ? 'Đang tìm...' : 'Tìm kiếm'}
              </KmBtn>
            </SearchBox>

            <KmField>
              <KmLabel>Họ và tên phụ huynh *</KmLabel>
              <KmInput
                value={parent.fullName}
                onChange={e => setParent({...parent, fullName: e.target.value})}
                disabled={!isNewParent}
              />
            </KmField>
            <KmField>
              <KmLabel>Số điện thoại *</KmLabel>
              <KmInput
                value={parent.phoneNumber}
                onChange={e => setParent({...parent, phoneNumber: e.target.value})}
                disabled={!isNewParent}
              />
            </KmField>
            <KmField>
              <KmLabel>Email</KmLabel>
              <KmInput
                type="email"
                value={parent.email}
                onChange={e => setParent({...parent, email: e.target.value})}
                disabled={!isNewParent}
              />
            </KmField>
            <div style={{ display: 'flex', gap: '16px' }}>
              <KmField style={{ flex: 1 }}>
                <KmLabel>Nghề nghiệp</KmLabel>
                <KmInput
                  value={parent.occupation}
                  onChange={e => setParent({...parent, occupation: e.target.value})}
                  disabled={!isNewParent}
                />
              </KmField>
              <KmField style={{ flex: 2 }}>
                <KmLabel>Địa chỉ</KmLabel>
                <KmInput
                  value={parent.address}
                  onChange={e => setParent({...parent, address: e.target.value})}
                  disabled={!isNewParent}
                />
              </KmField>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            {!isNewParent ? (
              <Alert $type="success">
                Học sinh sẽ được liên kết với tài khoản phụ huynh đã tồn tại (SĐT: {parent.phoneNumber}). Không cần tạo tài khoản mới.
              </Alert>
            ) : (
              <>
                <Alert $type="info">
                  Hệ thống sẽ tự động tạo tài khoản đăng nhập KinderCare App cho phụ huynh mới.
                </Alert>
                <KmField>
                  <KmLabel>Tên đăng nhập (Username)</KmLabel>
                  <KmInput value={parent.phoneNumber} disabled />
                  <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>Sử dụng Số điện thoại làm tên đăng nhập</small>
                </KmField>
                <KmField>
                  <KmLabel>Mật khẩu mặc định</KmLabel>
                  <KmInput value="123456" disabled />
                </KmField>
              </>
            )}
          </>
        )}
      </ModalBody>

      <KmFoot $spread>
        {step > 1 ? (
          <KmBtn $variant="ghost" type="button" onClick={() => { setError(null); setStep(step - 1); }}>Quay lại</KmBtn>
        ) : (
          <KmBtn $variant="ghost" type="button" onClick={onClose}>Hủy bỏ</KmBtn>
        )}

        {step < 3 ? (
          <KmBtn
            $variant="brand"
            type="button"
            onClick={() => {
              setError(null);
              if (step === 1 && (!student.fullName || !student.dateOfBirth)) {
                setError('Vui lòng điền đủ họ tên và ngày sinh');
                return;
              }
              setStep(step + 1);
            }}
          >
            Tiếp tục
          </KmBtn>
        ) : (
          <KmBtn $variant="brand" type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Đang lưu...' : 'Hoàn thành & Lưu'}
          </KmBtn>
        )}
      </KmFoot>
    </Modal>
  );
}
