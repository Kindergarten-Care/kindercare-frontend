'use client';

import React, { useState } from 'react';
import { Dropdown, kcToast } from '@kindercare/ui';
import { studentService } from '@/services/Student/StudentService';
import { StudentDetailDomainModel, UpdateStudentPayload } from '@/config/types/student';
import {
  Modal, ModalHeader, ModalBody, KmField, KmLabel, KmInput, KmTextArea,
  KmErrorText, KmFoot, KmBtn, EditIcon,
} from '@/components/Modal';

const GENDER_OPTIONS = [
  { value: 'Nam', label: 'Nam' },
  { value: 'Nữ', label: 'Nữ' },
];

interface EditStudentProfileModalProps {
  student: StudentDetailDomainModel;
  onClose: () => void;
  onSuccess: (updated: UpdateStudentPayload) => void;
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

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    if (Object.keys(payload).length === 0) {
      onClose();
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await studentService.updateStudent(student.id, payload);
      kcToast.success('Đã cập nhật hồ sơ học sinh thành công!');
      onSuccess(payload);
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
