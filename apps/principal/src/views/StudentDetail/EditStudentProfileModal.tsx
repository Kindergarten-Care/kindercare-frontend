'use client';

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Dropdown, kcToast } from '@kindercare/ui';
import { studentService } from '@/services/Student/StudentService';
import { StudentDetailDomainModel, UpdateStudentPayload } from '@/config/types/student';
import Avatar from '@/components/Avatar';
import {
  Modal, ModalHeader, ModalBody, KmField, KmLabel, KmInput, KmTextArea,
  KmErrorText, KmFoot, KmBtn, EditIcon,
} from '@/components/Modal';

const GENDER_OPTIONS = [
  { value: 'Nam', label: 'Nam' },
  { value: 'Nữ', label: 'Nữ' },
];

const MAX_AVATAR_SIZE = 20 * 1024 * 1024; // 20MB
const ACCEPTED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const AVATAR_SIZE = 76;

const AvatarPickRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 20px;
`;

const AvatarDropzone = styled.button`
  position: relative;
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  flex-shrink: 0;
  background: none;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const AvatarOverlay = styled.div<{ $alwaysVisible?: boolean }>`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: rgba(17, 24, 39, 0.55);
  opacity: ${({ $alwaysVisible }) => ($alwaysVisible ? 1 : 0)};
  transition: opacity 0.15s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  ${AvatarDropzone}:hover & {
    opacity: 1;
  }
`;

const Spinner = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: white;
  display: inline-block;
  animation: km-avatar-spin 0.7s linear infinite;

  @keyframes km-avatar-spin {
    to { transform: rotate(360deg); }
  }
`;

const AvatarInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AvatarTitle = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
`;

const AvatarHint = styled.span`
  font-size: 0.78rem;
  color: #6b7280;
`;

const AvatarRemoveBtn = styled.button`
  align-self: flex-start;
  margin-top: 2px;
  background: none;
  border: none;
  padding: 0;
  color: #b91c1c;
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="14" r="3.5" />
    </svg>
  );
}

/** undefined = giữ nguyên avatar cũ (không gửi field); null = đã xóa (gửi avatarUrl: null); string = ảnh mới. */
type AvatarState = string | null | undefined;

interface EditStudentProfileModalProps {
  student: StudentDetailDomainModel;
  onClose: () => void;
  onSuccess: () => void;
}

function toDateInputValue(ts: bigint | null): string {
  if (!ts) return '';
  const d = new Date(Number(ts) * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function EditStudentProfileModal({ student, onClose, onSuccess }: EditStudentProfileModalProps) {
  const [fullName, setFullName] = useState(student.fullName);
  const [dateOfBirth, setDateOfBirth] = useState(toDateInputValue(student.dateOfBirth));
  const [gender, setGender] = useState(student.gender || 'Nam');
  const [allergies, setAllergies] = useState(student.allergies || '');

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarState, setAvatarState] = useState<AvatarState>(undefined);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const displayedAvatarUrl = avatarState === undefined ? student.avatarUrl : avatarState;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAvatarPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!ACCEPTED_AVATAR_TYPES.includes(file.type)) {
      kcToast.error('Chỉ chấp nhận file ảnh (jpg, jpeg, png, webp, gif)');
      return;
    }
    if (file.size > MAX_AVATAR_SIZE) {
      kcToast.error('Kích thước ảnh tối đa 20MB');
      return;
    }

    try {
      setAvatarUploading(true);
      const url = await studentService.uploadAvatar(file);
      setAvatarState(url);
    } catch (err: any) {
      kcToast.error(err.message || 'Có lỗi xảy ra khi tải ảnh lên');
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleAvatarRemove = () => {
    setAvatarState(null);
  };

  const handleSubmit = async () => {
    if (!fullName.trim()) {
      setError('Vui lòng nhập họ và tên');
      return;
    }

    const payload: UpdateStudentPayload = {};
    if (fullName.trim() !== student.fullName) payload.fullName = fullName.trim();
    if (dateOfBirth) {
      const ts = Math.floor(new Date(dateOfBirth).getTime() / 1000);
      if (ts !== Number(student.dateOfBirth ?? -1)) payload.dateOfBirth = ts;
    }
    if (gender !== student.gender) payload.gender = gender;
    const trimmedAllergies = allergies.trim() || null;
    if (trimmedAllergies !== student.allergies) payload.allergies = trimmedAllergies;
    if (avatarState !== undefined) payload.avatarUrl = avatarState;

    if (Object.keys(payload).length === 0) {
      onClose();
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await studentService.updateStudent(student.id, payload);
      kcToast.success('Đã cập nhật hồ sơ học sinh thành công!');
      onSuccess();
      onClose();
    } catch (err: any) {
      const message = err.message || 'Có lỗi xảy ra khi cập nhật hồ sơ học sinh';
      setError(message);
      kcToast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal size="md" onClose={onClose}>
      <ModalHeader
        icon={<EditIcon />}
        iconVariant="brand"
        title="Chỉnh sửa hồ sơ học sinh"
        subtitle="Cập nhật thông tin cá nhân cơ bản của học sinh"
        onClose={onClose}
      />

      <ModalBody $padTop>
        {error && <KmErrorText style={{ marginBottom: 12 }}>{error}</KmErrorText>}

        <AvatarPickRow>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            style={{ display: 'none' }}
            onChange={handleAvatarPick}
          />
          <AvatarDropzone
            type="button"
            onClick={() => avatarInputRef.current?.click()}
            disabled={avatarUploading}
            aria-label={displayedAvatarUrl ? 'Đổi ảnh đại diện' : 'Tải ảnh đại diện'}
          >
            <Avatar src={displayedAvatarUrl} name={fullName} size={AVATAR_SIZE} />
            <AvatarOverlay $alwaysVisible={avatarUploading}>
              {avatarUploading ? <Spinner /> : <CameraIcon />}
            </AvatarOverlay>
          </AvatarDropzone>

          <AvatarInfo>
            <AvatarTitle>Ảnh đại diện</AvatarTitle>
            <AvatarHint>JPG, PNG, WEBP, GIF · tối đa 20MB</AvatarHint>
            {displayedAvatarUrl && !avatarUploading && (
              <AvatarRemoveBtn type="button" onClick={handleAvatarRemove}>
                Xóa ảnh
              </AvatarRemoveBtn>
            )}
          </AvatarInfo>
        </AvatarPickRow>

        <KmField>
          <KmLabel>Họ và tên *</KmLabel>
          <KmInput value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Nhập họ và tên" />
        </KmField>

        <KmField>
          <KmLabel>Ngày sinh</KmLabel>
          <KmInput type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
        </KmField>

        <KmField>
          <KmLabel>Giới tính</KmLabel>
          <Dropdown
            value={gender}
            onChange={setGender}
            options={GENDER_OPTIONS}
            fullWidth
            ariaLabel="Giới tính"
          />
        </KmField>

        <KmField>
          <KmLabel>Dị ứng / Bệnh lý <span className="opt">· tùy chọn</span></KmLabel>
          <KmTextArea value={allergies} onChange={e => setAllergies(e.target.value)} placeholder="Ví dụ: Dị ứng lạc, hải sản" />
        </KmField>
      </ModalBody>

      <KmFoot>
        <KmBtn type="button" $variant="ghost" onClick={onClose} disabled={saving}>Hủy bỏ</KmBtn>
        <KmBtn type="button" $variant="brand" onClick={handleSubmit} disabled={saving}>
          {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
        </KmBtn>
      </KmFoot>
    </Modal>
  );
}
