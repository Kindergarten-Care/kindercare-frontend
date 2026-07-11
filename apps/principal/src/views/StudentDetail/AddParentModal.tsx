'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown } from '@kindercare/ui';
import { accountService } from '@/services/account/AccountService';
import { studentService } from '@/services/Student/StudentService';
import {
  Modal, ModalHeader, ModalBody, KmField, KmLabel, KmInput, KmFoot, KmBtn,
  KmCallout, UserPlusIcon, AlertCircleIcon,
} from '@/components/Modal';

const RELATIONSHIP_OPTIONS = [
  { value: 'Phụ huynh', label: 'Phụ huynh (Cha/Mẹ)' },
  { value: 'Ông bà', label: 'Ông bà' },
  { value: 'Người giám hộ', label: 'Người giám hộ' },
  { value: 'Anh chị em', label: 'Anh chị em' },
];

const SearchBox = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  background: #f4f8f5;
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
          password: '123456'
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
    <Modal size="lg" onClose={onClose}>
      <ModalHeader
        icon={<UserPlusIcon />}
        iconVariant="brand"
        title="Thêm Người Thân / Phụ Huynh"
        subtitle="Liên kết phụ huynh đã có hoặc tạo mới hồ sơ cho học sinh"
        onClose={onClose}
      />

      <ModalBody>
        {error && (
          <KmCallout $variant="red" style={{ marginBottom: 16 }}>
            <AlertCircleIcon />
            <span>{error}</span>
          </KmCallout>
        )}

        {mode === 'search' ? (
          <>
            <SearchBox>
              <div style={{ flex: 1 }}>
                <KmLabel>Tìm kiếm phụ huynh đã có trên hệ thống</KmLabel>
                <KmInput
                  placeholder="Nhập số điện thoại..."
                  value={searchPhone}
                  onChange={e => setSearchPhone(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearchParent()}
                />
              </div>
              <KmBtn
                type="button"
                $variant="brand"
                style={{ alignSelf: 'flex-end' }}
                onClick={handleSearchParent}
                disabled={searchLoading}
              >
                {searchLoading ? 'Đang tìm...' : 'Tìm kiếm'}
              </KmBtn>
            </SearchBox>

            {foundParent && (
              <Alert $type="success">
                <h4 style={{ margin: '0 0 8px 0', color: '#065f46' }}>Đã tìm thấy phụ huynh:</h4>
                <p style={{ margin: '4px 0', fontSize: '0.875rem' }}><strong>Họ tên:</strong> {foundParent.fullName}</p>
                <p style={{ margin: '4px 0', fontSize: '0.875rem' }}><strong>SĐT:</strong> {foundParent.phoneNumber}</p>
                <p style={{ margin: '4px 0', fontSize: '0.875rem' }}><strong>Email:</strong> {foundParent.email || 'N/A'}</p>
              </Alert>
            )}

            <NewParentToggle>
              <span>Chưa có hồ sơ phụ huynh?</span>
              <KmBtn type="button" $variant="ghost" onClick={() => { setMode('new'); setFoundParent(null); setError(null); }}>
                Thêm mới ngay
              </KmBtn>
            </NewParentToggle>
          </>
        ) : (
          <>
            <Alert $type="info">
              Hệ thống sẽ tạo mới thông tin phụ huynh và tự động tạo tài khoản App với Username là SĐT.
            </Alert>
            <KmField>
              <KmLabel>Họ và tên phụ huynh *</KmLabel>
              <KmInput
                value={newParent.fullName}
                onChange={e => setNewParent({...newParent, fullName: e.target.value})}
              />
            </KmField>
            <KmField>
              <KmLabel>Số điện thoại *</KmLabel>
              <KmInput
                value={newParent.phoneNumber}
                onChange={e => setNewParent({...newParent, phoneNumber: e.target.value})}
              />
            </KmField>
            <KmField>
              <KmLabel>Email</KmLabel>
              <KmInput
                type="email"
                value={newParent.email}
                onChange={e => setNewParent({...newParent, email: e.target.value})}
              />
            </KmField>
            <div style={{ display: 'flex', gap: '16px' }}>
              <KmField style={{ flex: 1 }}>
                <KmLabel>Nghề nghiệp</KmLabel>
                <KmInput
                  value={newParent.occupation}
                  onChange={e => setNewParent({...newParent, occupation: e.target.value})}
                />
              </KmField>
              <KmField style={{ flex: 2 }}>
                <KmLabel>Địa chỉ</KmLabel>
                <KmInput
                  value={newParent.address}
                  onChange={e => setNewParent({...newParent, address: e.target.value})}
                />
              </KmField>
            </div>

            <NewParentToggle>
              <span>Đã có hồ sơ trên hệ thống?</span>
              <KmBtn type="button" $variant="ghost" onClick={() => { setMode('search'); setError(null); }}>
                Quay lại tìm kiếm
              </KmBtn>
            </NewParentToggle>
          </>
        )}

        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
          <KmField style={{ flex: 1 }}>
            <KmLabel>Mối quan hệ *</KmLabel>
            <Dropdown
              value={relationship}
              onChange={setRelationship}
              options={RELATIONSHIP_OPTIONS}
              fullWidth
              ariaLabel="Mối quan hệ"
            />
          </KmField>

          <KmField style={{ display: 'flex', alignItems: 'center', marginTop: '26px' }}>
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
          </KmField>
        </div>
      </ModalBody>

      <KmFoot>
        <KmBtn type="button" $variant="ghost" onClick={onClose}>Hủy bỏ</KmBtn>
        <KmBtn
          type="button"
          $variant="brand"
          onClick={handleSubmit}
          disabled={loading || (mode === 'search' && !foundParent)}
        >
          {loading ? 'Đang lưu...' : (mode === 'search' ? 'Liên kết ngay' : 'Tạo mới & Liên kết')}
        </KmBtn>
      </KmFoot>
    </Modal>
  );
}
