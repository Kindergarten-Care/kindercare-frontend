'use client';

import React from 'react';
import * as S from '../styles';
import type {
  CreateHealthLogPayload,
  HealthLogDomainModel,
  LogSeverity,
  LogType,
} from '@/config/types/studentHealth';

interface LogModalProps {
  open: boolean;
  initial: HealthLogDomainModel | null;
  onClose: () => void;
  onSubmit: (payload: CreateHealthLogPayload) => Promise<void>;
}

const formatInitial = (log: HealthLogDomainModel): CreateHealthLogPayload => ({
  logType: log.logType,
  value: log.value ?? '',
  description: log.description ?? '',
  severity: log.severity,
  actionTaken: log.actionTaken ?? '',
  loggedAt: Number(log.loggedAt),
});

export const LogModal: React.FC<LogModalProps> = ({ open, initial, onClose, onSubmit }) => {
  const [form, setForm] = React.useState<CreateHealthLogPayload>({
    logType: 'Observation',
    value: '',
    description: '',
    severity: 'Normal',
    actionTaken: '',
    loggedAt: Math.floor(Date.now() / 1000),
  });
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setForm(initial ? formatInitial(initial) : {
        logType: 'Observation',
        value: '',
        description: '',
        severity: 'Normal',
        actionTaken: '',
        loggedAt: Math.floor(Date.now() / 1000),
      });
    }
  }, [open, initial]);

  if (!open) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      await onSubmit({
        logType: form.logType,
        value: form.value?.trim() || null,
        description: form.description?.trim() || null,
        severity: form.severity,
        actionTaken: form.actionTaken?.trim() || null,
        loggedAt: form.loggedAt,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <S.ModalBackdrop onClick={() => !submitting && onClose()}>
      <S.ModalCard onClick={(e) => e.stopPropagation()}>
        <h3>{initial ? 'Sửa nhật ký' : 'Ghi nhật ký sức khỏe'}</h3>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          <S.Field>
            Loại nhật ký
            <select
              value={form.logType}
              onChange={(e) => setForm({ ...form, logType: e.target.value as LogType })}
            >
              <option value="Temperature">Nhiệt độ</option>
              <option value="Incident">Sự cố</option>
              <option value="Observation">Quan sát</option>
              <option value="Mood">Tâm trạng</option>
              <option value="Meal">Bữa ăn</option>
              <option value="Nap">Giấc ngủ</option>
            </select>
          </S.Field>
          <S.Field>
            Giá trị
            <input
              value={form.value ?? ''}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              placeholder="VD: 38.5°C"
              maxLength={100}
            />
          </S.Field>
          <S.Field>
            Mức độ
            <select
              value={form.severity}
              onChange={(e) =>
                setForm({ ...form, severity: e.target.value as LogSeverity })
              }
            >
              <option value="Normal">Bình thường</option>
              <option value="Mild">Nhẹ</option>
              <option value="Moderate">Trung bình</option>
              <option value="Severe">Nặng</option>
            </select>
          </S.Field>
          <S.Field>
            Mô tả
            <textarea
              value={form.description ?? ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </S.Field>
          <S.Field>
            Hành động đã xử lý
            <textarea
              value={form.actionTaken ?? ''}
              onChange={(e) => setForm({ ...form, actionTaken: e.target.value })}
            />
          </S.Field>
          <S.ModalActions>
            <S.ActionButton
              type="button"
              $variant="ghost"
              onClick={onClose}
              disabled={submitting}
            >
              Hủy
            </S.ActionButton>
            <S.AddButton type="submit" disabled={submitting}>
              {submitting ? 'Đang lưu…' : 'Lưu'}
            </S.AddButton>
          </S.ModalActions>
        </form>
      </S.ModalCard>
    </S.ModalBackdrop>
  );
};