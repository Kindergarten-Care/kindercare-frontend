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

const CloseBtn = styled.button.attrs({ type: 'button' })`
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
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button.attrs({ type: 'button' })<{ $primary?: boolean, $variant?: 'outline' | 'text' }>`
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  border: ${props => props.$variant === 'text' ? 'none' : `1px solid ${props.$primary ? (props.theme.colors.primary || '#047857') : (props.theme.colors.border || '#d1d5db')}`};
  background: ${props => props.$variant === 'text' ? 'transparent' : props.$primary ? (props.theme.colors.primary || '#047857') : 'white'};
  color: ${props => props.$primary ? 'white' : (props.theme.colors.fg || '#374151')};
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$variant === 'text' ? (props.theme.colors.neutralLight || '#f3f4f6') : props.$primary ? (props.theme.colors.greenDark || '#1a5c2d') : (props.theme.colors.neutralLighter || '#f9fafb')};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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
  padding: 10px 14px;
  border: 1.5px solid ${({ theme }) => theme.colors.border || '#d1d5db'};
  border-radius: 10px;
  font-size: 0.875rem;
  outline: none;
  background: white;
  color: ${({ theme }) => theme.colors.fg || '#111827'};
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary || '#047857'};
    box-shadow: 0 0 0 3px rgba(35, 122, 60, 0.12);
  }

  &::placeholder { color: ${({ theme }) => theme.colors.muted || '#9ca3af'}; }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid ${({ theme }) => theme.colors.border || '#d1d5db'};
  border-radius: 10px;
  font-size: 0.875rem;
  background: white;
  outline: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.fg || '#111827'};
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary || '#047857'};
    box-shadow: 0 0 0 3px rgba(35, 122, 60, 0.12);
  }
`;

const SearchBox = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  background: ${({ theme }) => theme.colors.neutralLight || '#f3f4f6'};
  padding: 16px;
  border-radius: 10px;
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

const NewParentToggle = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #d1d5db;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  span {
    font-size: 0.875rem;
    color: #6b7280;
  }
`;

interface AddParentModalProps {
  studentId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddParentModal({ studentId, onClose, onSuccess }: AddParentModalProps) {
  const [mode, setMode] = useState<'search' | 'new'>('search');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search Mode
  const [searchPhone, setSearchPhone] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [foundParent, setFoundParent] = useState<any>(null);

  // Form Data
  const [relationship, setRelationship] = useState('Phụ huynh');
  const [isPrimary, setIsPrimary] = useState(false);
  
  const [newParent, setNewParent] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    occupation: '',
    address: ''
  });

  const handleSearchParent = async () => {
    if (!searchPhone) return;
    try {
      setSearchLoading(true);
      setError(null);
      const res = await accountService.searchParents(searchPhone);
      
      if (res) {
        setFoundParent(res);
      } else {
        setFoundParent(null);
        setError('Không tìm thấy phụ huynh với số điện thoại này.');
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

      let payload: any = {
        relationship,
        isPrimary
      };

      if (mode === 'search') {
        if (!foundParent) throw new Error('Vui lòng tìm và chọn phụ huynh trước');
        payload.isNewParent = false;
        payload.parentId = foundParent.id;
      } else {
        if (!newParent.fullName || !newParent.phoneNumber) {
          throw new Error('Vui lòng điền đủ họ tên và SĐT');
        }
        payload.isNewParent = true;
        payload.parent = newParent;
        payload.account = {
          username: newParent.phoneNumber,
          password: `KinderCare_${newParent.phoneNumber}`
        };
      }

      await studentService.addParentToStudent(studentId, payload);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Lỗi khi lưu thông tin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <Title>Thêm Người Thân / Phụ Huynh</Title>
          <CloseBtn onClick={onClose}>&times;</CloseBtn>
        </ModalHeader>
        
        <ModalBody>
          {error && <Alert $type="error">{error}</Alert>}

          {mode === 'search' ? (
            <>
              <SearchBox>
                <div style={{ flex: 1 }}>
                  <Label>Tìm kiếm phụ huynh đã có trên hệ thống</Label>
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

              {foundParent && (
                <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #34d399' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#065f46' }}>Đã tìm thấy phụ huynh:</h4>
                  <p style={{ margin: '4px 0', fontSize: '0.875rem' }}><strong>Họ tên:</strong> {foundParent.fullName}</p>
                  <p style={{ margin: '4px 0', fontSize: '0.875rem' }}><strong>SĐT:</strong> {foundParent.phoneNumber}</p>
                  <p style={{ margin: '4px 0', fontSize: '0.875rem' }}><strong>Email:</strong> {foundParent.email || 'N/A'}</p>
                </div>
              )}

              <NewParentToggle>
                <span>Chưa có hồ sơ phụ huynh?</span>
                <Button $variant="outline" onClick={() => { setMode('new'); setFoundParent(null); setError(null); }}>
                  Thêm mới ngay
                </Button>
              </NewParentToggle>
            </>
          ) : (
            <>
              <Alert $type="info">
                Hệ thống sẽ tạo mới thông tin phụ huynh và tự động tạo tài khoản App với Username là SĐT.
              </Alert>
              <FormGroup>
                <Label>Họ và tên phụ huynh *</Label>
                <Input 
                  value={newParent.fullName} 
                  onChange={e => setNewParent({...newParent, fullName: e.target.value})} 
                />
              </FormGroup>
              <FormGroup>
                <Label>Số điện thoại *</Label>
                <Input 
                  value={newParent.phoneNumber} 
                  onChange={e => setNewParent({...newParent, phoneNumber: e.target.value})} 
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input 
                  type="email"
                  value={newParent.email} 
                  onChange={e => setNewParent({...newParent, email: e.target.value})} 
                />
              </FormGroup>
              <div style={{ display: 'flex', gap: '16px' }}>
                <FormGroup style={{ flex: 1 }}>
                  <Label>Nghề nghiệp</Label>
                  <Input 
                    value={newParent.occupation} 
                    onChange={e => setNewParent({...newParent, occupation: e.target.value})} 
                  />
                </FormGroup>
                <FormGroup style={{ flex: 2 }}>
                  <Label>Địa chỉ</Label>
                  <Input 
                    value={newParent.address} 
                    onChange={e => setNewParent({...newParent, address: e.target.value})} 
                  />
                </FormGroup>
              </div>

              <NewParentToggle>
                <span>Đã có hồ sơ trên hệ thống?</span>
                <Button $variant="outline" onClick={() => { setMode('search'); setError(null); }}>
                  Quay lại tìm kiếm
                </Button>
              </NewParentToggle>
            </>
          )}

          <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
            <FormGroup style={{ flex: 1 }}>
              <Label>Mối quan hệ *</Label>
              <Select 
                value={relationship} 
                onChange={e => setRelationship(e.target.value)}
              >
                <option value="Phụ huynh">Phụ huynh (Cha/Mẹ)</option>
                <option value="Ông bà">Ông bà</option>
                <option value="Người giám hộ">Người giám hộ</option>
                <option value="Anh chị em">Anh chị em</option>
              </Select>
            </FormGroup>
            
            <FormGroup style={{ display: 'flex', alignItems: 'center', marginTop: '26px' }}>
              <input 
                type="checkbox" 
                id="isPrimary" 
                checked={isPrimary}
                onChange={e => setIsPrimary(e.target.checked)}
                style={{ marginRight: '8px', width: '16px', height: '16px' }}
              />
              <label htmlFor="isPrimary" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                Là người liên lạc chính
              </label>
            </FormGroup>
          </div>
        </ModalBody>
        
        <ModalFooter>
          <Button onClick={onClose}>Hủy bỏ</Button>
          <Button 
            $primary 
            onClick={handleSubmit} 
            disabled={loading || (mode === 'search' && !foundParent)}
          >
            {loading ? 'Đang lưu...' : (mode === 'search' ? 'Liên kết ngay' : 'Tạo mới & Liên kết')}
          </Button>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
}
