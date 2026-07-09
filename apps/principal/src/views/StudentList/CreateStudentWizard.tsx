'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { accountService } from '@/services/account/AccountService';
import { studentService } from '@/services/Student/StudentService';

const Overlay = styled.div`
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

const ModalContainer = styled.div`
  background: white;
  width: 90%;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  &:hover { color: #111827; }
`;

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid ${props => props.$primary ? '#047857' : '#d1d5db'};
  background: ${props => props.$primary ? '#047857' : 'white'};
  color: ${props => props.$primary ? 'white' : '#374151'};
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$primary ? '#065f46' : '#f9fafb'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Step = styled.div<{ $active: boolean; $completed: boolean }>`
  flex: 1;
  text-align: center;
  padding-bottom: 8px;
  border-bottom: 3px solid ${props => props.$active ? '#047857' : props.$completed ? '#34d399' : '#e5e7eb'};
  color: ${props => props.$active || props.$completed ? '#047857' : '#9ca3af'};
  font-weight: 500;
  font-size: 0.875rem;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  &:focus { outline: none; border-color: #047857; box-shadow: 0 0 0 2px rgba(4,120,87,0.1); }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  &:focus { outline: none; border-color: #047857; }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 80px;
  &:focus { outline: none; border-color: #047857; }
`;

const SearchBox = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  background: #f3f4f6;
  padding: 16px;
  border-radius: 8px;
`;

const Alert = styled.div<{ $type: 'success' | 'error' | 'info' }>`
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 0.875rem;
  background: ${props => props.$type === 'error' ? '#fef2f2' : props.$type === 'success' ? '#ecfdf5' : '#eff6ff'};
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

  // Step 1 Data
  const [student, setStudent] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: 'Nam',
    admissionDate: new Date().toISOString().split('T')[0],
    allergies: ''
  });

  // Step 2 & 3 Data
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

      // Validate
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
          password: `KinderCare_${parent.phoneNumber}`
        } : null
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
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <Title>Thêm Hồ Sơ Học Sinh Mới</Title>
          <CloseBtn onClick={onClose}>&times;</CloseBtn>
        </ModalHeader>
        
        <ModalBody>
          <StepIndicator>
            <Step $active={step === 1} $completed={step > 1}>1. Thông tin Học sinh</Step>
            <Step $active={step === 2} $completed={step > 2}>2. Thông tin Phụ huynh</Step>
            <Step $active={step === 3} $completed={step > 3}>3. Cấu hình Tài khoản</Step>
          </StepIndicator>

          {error && <Alert $type={step === 2 && error.includes('Không tìm thấy') ? 'info' : 'error'}>{error}</Alert>}

          {step === 1 && (
            <>
              <FormGroup>
                <Label>Họ và tên học sinh *</Label>
                <Input 
                  value={student.fullName} 
                  onChange={e => setStudent({...student, fullName: e.target.value})} 
                  placeholder="Nhập họ và tên..."
                />
              </FormGroup>
              <div style={{ display: 'flex', gap: '16px' }}>
                <FormGroup style={{ flex: 1 }}>
                  <Label>Ngày sinh *</Label>
                  <Input 
                    type="date" 
                    value={student.dateOfBirth} 
                    onChange={e => setStudent({...student, dateOfBirth: e.target.value})} 
                  />
                </FormGroup>
                <FormGroup style={{ flex: 1 }}>
                  <Label>Giới tính</Label>
                  <Select 
                    value={student.gender} 
                    onChange={e => setStudent({...student, gender: e.target.value})}
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </Select>
                </FormGroup>
              </div>
              <FormGroup>
                <Label>Ngày nhập học</Label>
                <Input 
                  type="date" 
                  value={student.admissionDate} 
                  onChange={e => setStudent({...student, admissionDate: e.target.value})} 
                />
              </FormGroup>
              <FormGroup>
                <Label>Ghi chú dị ứng / bệnh lý (Nếu có)</Label>
                <Textarea 
                  value={student.allergies} 
                  onChange={e => setStudent({...student, allergies: e.target.value})} 
                  placeholder="Ví dụ: Dị ứng đậu phộng, hen suyễn..."
                />
              </FormGroup>
            </>
          )}

          {step === 2 && (
            <>
              <SearchBox>
                <div style={{ flex: 1 }}>
                  <Label>Tìm kiếm phụ huynh đã có con học tại trường</Label>
                  <Input 
                    placeholder="Nhập số điện thoại..." 
                    value={searchPhone}
                    onChange={e => setSearchPhone(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSearchParent()}
                  />
                </div>
                <Button 
                  $primary 
                  style={{ alignSelf: 'flex-end' }}
                  onClick={handleSearchParent}
                  disabled={searchLoading}
                >
                  {searchLoading ? 'Đang tìm...' : 'Tìm kiếm'}
                </Button>
              </SearchBox>

              <FormGroup>
                <Label>Họ và tên phụ huynh *</Label>
                <Input 
                  value={parent.fullName} 
                  onChange={e => setParent({...parent, fullName: e.target.value})} 
                  disabled={!isNewParent}
                />
              </FormGroup>
              <FormGroup>
                <Label>Số điện thoại *</Label>
                <Input 
                  value={parent.phoneNumber} 
                  onChange={e => setParent({...parent, phoneNumber: e.target.value})} 
                  disabled={!isNewParent}
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input 
                  type="email"
                  value={parent.email} 
                  onChange={e => setParent({...parent, email: e.target.value})} 
                  disabled={!isNewParent}
                />
              </FormGroup>
              <div style={{ display: 'flex', gap: '16px' }}>
                <FormGroup style={{ flex: 1 }}>
                  <Label>Nghề nghiệp</Label>
                  <Input 
                    value={parent.occupation} 
                    onChange={e => setParent({...parent, occupation: e.target.value})} 
                    disabled={!isNewParent}
                  />
                </FormGroup>
                <FormGroup style={{ flex: 2 }}>
                  <Label>Địa chỉ</Label>
                  <Input 
                    value={parent.address} 
                    onChange={e => setParent({...parent, address: e.target.value})} 
                    disabled={!isNewParent}
                  />
                </FormGroup>
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
                  <FormGroup>
                    <Label>Tên đăng nhập (Username)</Label>
                    <Input value={parent.phoneNumber} disabled style={{ background: '#f3f4f6' }} />
                    <small style={{ color: '#6b7280' }}>Sử dụng Số điện thoại làm tên đăng nhập</small>
                  </FormGroup>
                  <FormGroup>
                    <Label>Mật khẩu mặc định</Label>
                    <Input value={`KinderCare_${parent.phoneNumber}`} disabled style={{ background: '#f3f4f6' }} />
                  </FormGroup>
                </>
              )}
            </>
          )}
        </ModalBody>
        
        <ModalFooter>
          {step > 1 ? (
            <Button onClick={() => { setError(null); setStep(step - 1); }}>Quay lại</Button>
          ) : (
            <Button onClick={onClose}>Hủy bỏ</Button>
          )}
          
          {step < 3 ? (
            <Button 
              $primary 
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
            </Button>
          ) : (
            <Button $primary onClick={handleSubmit} disabled={loading}>
              {loading ? 'Đang lưu...' : 'Hoàn thành & Lưu'}
            </Button>
          )}
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
}
