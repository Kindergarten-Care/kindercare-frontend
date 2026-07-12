'use client';

import React, { useEffect, useState } from 'react';
import { kcToast } from '@kindercare/ui';
import { assignmentService } from '@/services/Principal/AssignmentService';
import { eventService } from '@/services/Principal/EventService';
import { HolidayDto } from '@/config/types/event';
import {
  Modal, ModalHeader, ModalBody, KmField, KmLabel, KmInput,
  KmErrorText, KmFoot, KmBtn, PartyIcon,
} from '@/components/Modal';

interface CreateHolidayModalProps {
  holiday?: HolidayDto;
  onClose: () => void;
  onSuccess: () => void;
}

function toDateInputValue(ts: number): string {
  const d = new Date(ts * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function CreateHolidayModal({ holiday, onClose, onSuccess }: CreateHolidayModalProps) {
  const isEditing = !!holiday;

  const [holidayName, setHolidayName] = useState(holiday?.holidayName ?? '');
  const [holidayDate, setHolidayDate] = useState(holiday ? toDateInputValue(holiday.holidayDate) : '');
  const [activeYear, setActiveYear] = useState<{ id: number; name: string } | null>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    assignmentService.getAcademicYears()
      .then(years => {
        const active = years.find((y: any) => y.IsActive === 1);
        if (active) setActiveYear({ id: active.YearID, name: active.YearName });
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async () => {
    if (!holidayDate) {
      setError('Vui lòng chọn ngày nghỉ lễ');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      const payload = {
        holidayDate: Math.floor(new Date(holidayDate).getTime() / 1000),
        holidayName: holidayName.trim() || undefined,
        yearId: activeYear?.id,
      };
      if (isEditing) {
        await eventService.updateHoliday(holiday.id, payload);
        kcToast.success('Đã cập nhật ngày nghỉ lễ thành công!');
      } else {
        await eventService.createHoliday(payload);
        kcToast.success('Đã tạo ngày nghỉ lễ thành công!');
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      const message = err.message || `Có lỗi xảy ra khi ${isEditing ? 'cập nhật' : 'tạo'} ngày nghỉ lễ`;
      setError(message);
      kcToast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal size="md" onClose={onClose}>
      <ModalHeader
        icon={<PartyIcon />}
        iconVariant="amber"
        title={isEditing ? 'Sửa ngày nghỉ lễ' : 'Tạo ngày nghỉ lễ'}
        subtitle="Ngày nghỉ lễ sẽ được loại trừ khi tính phí ăn hàng tháng"
        onClose={onClose}
      />

      <ModalBody $padTop>
        {error && <KmErrorText style={{ marginBottom: 12 }}>{error}</KmErrorText>}

        <KmField>
          <KmLabel>Ngày nghỉ lễ *</KmLabel>
          <KmInput type="date" value={holidayDate} onChange={e => setHolidayDate(e.target.value)} />
        </KmField>

        <KmField>
          <KmLabel>Tên ngày lễ <span className="opt">· tùy chọn</span></KmLabel>
          <KmInput value={holidayName} onChange={e => setHolidayName(e.target.value)} placeholder="Ví dụ: Quốc khánh 2/9" />
        </KmField>

        <KmField>
          <KmLabel>Năm học</KmLabel>
          <KmInput value={activeYear ? `${activeYear.name} (đang áp dụng)` : 'Không có năm học đang áp dụng'} disabled readOnly />
        </KmField>
      </ModalBody>

      <KmFoot>
        <KmBtn type="button" $variant="ghost" onClick={onClose} disabled={saving}>Hủy bỏ</KmBtn>
        <KmBtn type="button" $variant="brand" onClick={handleSubmit} disabled={saving}>
          {saving ? 'Đang lưu...' : (isEditing ? 'Lưu thay đổi' : 'Tạo ngày nghỉ lễ')}
        </KmBtn>
      </KmFoot>
    </Modal>
  );
}
