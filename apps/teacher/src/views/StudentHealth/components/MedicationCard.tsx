'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import * as S from '../styles';
import type {
  CreateMedicationPayload,
  MedicationDomainModel,
  MedicationStatus,
} from '@/config/types/studentHealth';

interface MedicationCardProps {
  medications: MedicationDomainModel[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  isReadOnly: boolean;
  onRetry: () => void;
  activeTab: MedicationStatus | 'All';
  onTabChange: (tab: MedicationStatus | 'All') => void;
  onSubmit: (payload: CreateMedicationPayload) => Promise<void>;
  onUpdateStatus: (
    medicationId: number,
    payload: { status: MedicationStatus; notes?: string | null }
  ) => Promise<void>;
  onDelete: (medicationId: number) => Promise<void>;
}

const DEFAULT_FORM: CreateMedicationPayload = {
  medicineName: '',
  dosage: '',
  scheduledTime: '',
  frequency: '',
  status: 'Pending',
  notes: '',
};

export const MedicationCard: React.FC<MedicationCardProps> = ({
  medications,
  isLoading,
  isError,
  error,
  isReadOnly,
  onRetry,
  activeTab,
  onTabChange,
  onSubmit,
  onUpdateStatus,
  onDelete,
}) => {
  const [openForm, setOpenForm] = React.useState(false);
  const [form, setForm] = React.useState<CreateMedicationPayload>(DEFAULT_FORM);
  const [submitting, setSubmitting] = React.useState(false);
  const [busyId, setBusyId] = React.useState<number | null>(null);

  const filtered = React.useMemo(() => {
    if (activeTab === 'All') return medications;
    return medications.filter((m) => m.status === activeTab);
  }, [medications, activeTab]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.medicineName.trim() || !form.dosage.trim()) return;
    try {
      setSubmitting(true);
      await onSubmit({
        medicineName: form.medicineName.trim(),
        dosage: form.dosage.trim(),
        scheduledTime: form.scheduledTime?.trim() || null,
        frequency: form.frequency?.trim() || null,
        status: form.status,
        notes: form.notes?.trim() || null,
      });
      setOpenForm(false);
      setForm(DEFAULT_FORM);
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusToggle = async (med: MedicationDomainModel) => {
    const next: MedicationStatus = med.status === 'Done' ? 'Pending' : 'Done';
    setBusyId(med.medicationId);
    try {
      await onUpdateStatus(med.medicationId, { status: next });
    } finally {
      setBusyId(null);
    }
  };

  const renderBody = () => {
    if (isLoading) {
      return <S.SpinnerOverlay>Đang tải thuốc…</S.SpinnerOverlay>;
    }

    if (isError) {
      return (
        <S.ErrorBox>
          <span>{(error as Error)?.message || 'Không thể tải danh sách thuốc'}</span>
          <button type="button" onClick={() => onRetry()}>
            Thử lại
          </button>
        </S.ErrorBox>
      );
    }

    if (filtered.length === 0) {
      return (
        <S.EmptyStateBox>
          {activeTab === 'Pending'
            ? 'Không có thuốc nào đang chờ.'
            : activeTab === 'Done'
            ? 'Chưa có thuốc nào được cho uống hôm nay.'
            : 'Chưa có thuốc nào được ghi nhận.'}
        </S.EmptyStateBox>
      );
    }

    return (
      <S.ItemList>
        {filtered.map((med) => (
          <S.ItemRow key={med.medicationId}>
            <div className="row1">
              <strong style={{ fontSize: 14 }}>{med.medicineName}</strong>
              <S.SeverityPill $severity={med.status}>{med.status}</S.SeverityPill>
            </div>
            <div className="row2">
              Liều: <strong>{med.dosage}</strong>
              {med.scheduledTime ? ` · ${med.scheduledTime}` : ''}
              {med.frequency ? ` · ${med.frequency}` : ''}
            </div>
            {med.notes && <div className="row2">Ghi chú: {med.notes}</div>}
            {med.administeredAt && (
              <div className="row2">
                Đã cho lúc:{' '}
                {new Date(Number(med.administeredAt) * 1000).toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: '2-digit',
                  month: '2-digit',
                })}
              </div>
            )}
            {!isReadOnly && (
              <div className="row3">
                <S.ActionButton
                  type="button"
                  $variant={med.status === 'Done' ? 'ghost' : 'primary'}
                  onClick={() => handleStatusToggle(med)}
                  disabled={busyId === med.medicationId}
                >
                  {med.status === 'Done' ? 'Đánh dấu Pending' : 'Đánh dấu Done'}
                </S.ActionButton>
                <S.ActionButton
                  type="button"
                  $variant="danger"
                  onClick={() => onDelete(med.medicationId)}
                >
                  <Trash2 size={12} style={{ marginRight: 4 }} />
                  Xóa
                </S.ActionButton>
              </div>
            )}
          </S.ItemRow>
        ))}
      </S.ItemList>
    );
  };

  return (
    <S.Card $accent="amber">
      <S.CardHeader>
        <h2>Thuốc</h2>
        <S.Tabs>
          <S.TabButton
            type="button"
            $active={activeTab === 'Pending'}
            onClick={() => onTabChange('Pending')}
          >
            Pending
          </S.TabButton>
          <S.TabButton
            type="button"
            $active={activeTab === 'Done'}
            onClick={() => onTabChange('Done')}
          >
            Done
          </S.TabButton>
          <S.TabButton
            type="button"
            $active={activeTab === 'All'}
            onClick={() => onTabChange('All')}
          >
            Tất cả
          </S.TabButton>
        </S.Tabs>
      </S.CardHeader>

      {renderBody()}

      {!isReadOnly && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <S.AddButton type="button" onClick={() => setOpenForm(true)}>
            <Plus size={14} /> Thêm thuốc
          </S.AddButton>
        </div>
      )}

      {openForm && (
        <S.ModalBackdrop onClick={() => !submitting && setOpenForm(false)}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Thêm thuốc mới</h3>
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <S.Field>
                Tên thuốc
                <input
                  value={form.medicineName}
                  onChange={(e) => setForm({ ...form, medicineName: e.target.value })}
                  maxLength={150}
                  required
                />
              </S.Field>
              <S.Field>
                Liều dùng
                <input
                  value={form.dosage}
                  onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                  maxLength={100}
                  required
                />
              </S.Field>
              <S.Field>
                Thời điểm
                <input
                  value={form.scheduledTime ?? ''}
                  onChange={(e) => setForm({ ...form, scheduledTime: e.target.value })}
                  maxLength={50}
                  placeholder="VD: Sau bữa trưa"
                />
              </S.Field>
              <S.Field>
                Tần suất
                <input
                  value={form.frequency ?? ''}
                  onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                  maxLength={100}
                  placeholder="VD: 2 lần/ngày"
                />
              </S.Field>
              <S.Field>
                Ghi chú
                <textarea
                  value={form.notes ?? ''}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </S.Field>
              <S.ModalActions>
                <S.ActionButton
                  type="button"
                  $variant="ghost"
                  onClick={() => setOpenForm(false)}
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
      )}
    </S.Card>
  );
};