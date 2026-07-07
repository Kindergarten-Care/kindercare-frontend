'use client';

import React from 'react';
import { Lock, Plus, Trash2 } from 'lucide-react';
import * as S from '../styles';
import type {
  AllergyDomainModel,
  AllergySeverity,
  CreateAllergyPayload,
} from '@/config/types/studentHealth';

interface AllergyCardProps {
  allergies: AllergyDomainModel[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  isReadOnly: boolean;
  onRetry: () => void;
  onSubmit: (payload: CreateAllergyPayload) => Promise<void>;
  onDelete: (allergyId: number) => Promise<void>;
  onEdit: (allergy: AllergyDomainModel) => void;
  editingAllergyId: number | null;
  editingAllergy: AllergyDomainModel | null;
  onCancelEdit: () => void;
  onUpdate: (
    allergyId: number,
    payload: { allergen?: string; severity?: AllergySeverity; reaction?: string | null; notes?: string | null }
  ) => Promise<void>;
}

const DEFAULT_FORM: CreateAllergyPayload = {
  allergen: '',
  severity: 'Mild',
  reaction: '',
  notes: '',
};

export const AllergyCard: React.FC<AllergyCardProps> = ({
  allergies,
  isLoading,
  isError,
  error,
  isReadOnly,
  onRetry,
  onSubmit,
  onDelete,
  onEdit,
  editingAllergyId,
  editingAllergy,
  onCancelEdit,
  onUpdate,
}) => {
  const [openForm, setOpenForm] = React.useState(false);
  const [form, setForm] = React.useState<CreateAllergyPayload>(DEFAULT_FORM);
  const [submitting, setSubmitting] = React.useState(false);

  const openCreate = () => {
    onCancelEdit();
    setForm(DEFAULT_FORM);
    setOpenForm(true);
  };

  const startEdit = (allergy: AllergyDomainModel) => {
    setOpenForm(false);
    onEdit(allergy);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.allergen.trim()) return;
    try {
      setSubmitting(true);
      await onSubmit({
        allergen: form.allergen.trim(),
        severity: form.severity,
        reaction: form.reaction?.trim() || null,
        notes: form.notes?.trim() || null,
      });
      setOpenForm(false);
      setForm(DEFAULT_FORM);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingAllergy) return;
    await onUpdate(editingAllergy.allergyId, {
      allergen: editingAllergy.allergen,
      severity: editingAllergy.severity,
      reaction: editingAllergy.reaction,
      notes: editingAllergy.notes,
    });
  };

  const renderBody = () => {
    if (isLoading) {
      return <S.SpinnerOverlay>Đang tải dị ứng…</S.SpinnerOverlay>;
    }

    if (isError) {
      return (
        <S.ErrorBox>
          <span>{(error as Error)?.message || 'Không thể tải dị ứng'}</span>
          <button type="button" onClick={() => onRetry()}>
            Thử lại
          </button>
        </S.ErrorBox>
      );
    }

    if (allergies.length === 0) {
      return <S.EmptyStateBox>Chưa có dị ứng nào được ghi nhận.</S.EmptyStateBox>;
    }

    return (
      <S.ItemList>
        {allergies.map((allergy) => (
          <S.ItemRow key={allergy.allergyId} $severity={allergy.severity}>
            <div className="row1">
              <strong style={{ fontSize: 14 }}>{allergy.allergen}</strong>
              <S.SeverityPill $severity={allergy.severity}>{allergy.severity}</S.SeverityPill>
            </div>
            {allergy.reaction && <div className="row2">Triệu chứng: {allergy.reaction}</div>}
            {allergy.notes && <div className="row2">Ghi chú: {allergy.notes}</div>}
            {!isReadOnly && (
              <div className="row3">
                <span style={{ fontSize: 11, color: '#94a3b8' }}>
                  Cập nhật:{' '}
                  {new Date(Number(allergy.updatedAt) * 1000).toLocaleDateString('vi-VN')}
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <S.ActionButton
                    type="button"
                    $variant="ghost"
                    onClick={() => startEdit(allergy)}
                  >
                    Sửa
                  </S.ActionButton>
                  <S.ActionButton
                    type="button"
                    $variant="danger"
                    onClick={() => onDelete(allergy.allergyId)}
                  >
                    <Trash2 size={12} style={{ marginRight: 4 }} />
                    Xóa
                  </S.ActionButton>
                </div>
              </div>
            )}
          </S.ItemRow>
        ))}
      </S.ItemList>
    );
  };

  return (
    <S.Card $accent="red">
      <S.CardHeader>
        <h2>Dị ứng</h2>
        {!isReadOnly && (
          <S.AddButton type="button" onClick={openCreate}>
            <Plus size={14} /> Thêm
          </S.AddButton>
        )}
      </S.CardHeader>

      {renderBody()}

      {openForm && (
        <S.ModalBackdrop onClick={() => !submitting && setOpenForm(false)}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Thêm dị ứng</h3>
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <S.Field>
                Tên dị nguyên
                <input
                  value={form.allergen}
                  onChange={(e) => setForm({ ...form, allergen: e.target.value })}
                  maxLength={150}
                  required
                />
              </S.Field>
              <S.Field>
                Mức độ
                <select
                  value={form.severity}
                  onChange={(e) =>
                    setForm({ ...form, severity: e.target.value as AllergySeverity })
                  }
                >
                  <option value="Mild">Nhẹ</option>
                  <option value="Moderate">Trung bình</option>
                  <option value="Severe">Nặng</option>
                </select>
              </S.Field>
              <S.Field>
                Triệu chứng
                <input
                  value={form.reaction ?? ''}
                  onChange={(e) => setForm({ ...form, reaction: e.target.value })}
                  maxLength={255}
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

      {editingAllergy && (
        <S.ModalBackdrop onClick={() => !isReadOnly && onCancelEdit()}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Sửa dị ứng</h3>
            <form
              onSubmit={handleUpdateSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <S.Field>
                Tên dị nguyên
                <input
                  value={editingAllergy.allergen}
                  onChange={(e) =>
                    onEdit({ ...editingAllergy, allergen: e.target.value })
                  }
                  required
                />
              </S.Field>
              <S.Field>
                Mức độ
                <select
                  value={editingAllergy.severity}
                  onChange={(e) =>
                    onEdit({
                      ...editingAllergy,
                      severity: e.target.value as AllergySeverity,
                    })
                  }
                >
                  <option value="Mild">Nhẹ</option>
                  <option value="Moderate">Trung bình</option>
                  <option value="Severe">Nặng</option>
                </select>
              </S.Field>
              <S.Field>
                Triệu chứng
                <input
                  value={editingAllergy.reaction ?? ''}
                  onChange={(e) =>
                    onEdit({ ...editingAllergy, reaction: e.target.value || null })
                  }
                />
              </S.Field>
              <S.Field>
                Ghi chú
                <textarea
                  value={editingAllergy.notes ?? ''}
                  onChange={(e) =>
                    onEdit({ ...editingAllergy, notes: e.target.value || null })
                  }
                />
              </S.Field>
              <S.ModalActions>
                <S.ActionButton
                  type="button"
                  $variant="ghost"
                  onClick={onCancelEdit}
                >
                  Hủy
                </S.ActionButton>
                <S.AddButton type="submit">Lưu thay đổi</S.AddButton>
              </S.ModalActions>
            </form>
          </S.ModalCard>
        </S.ModalBackdrop>
      )}

      {isReadOnly && allergies.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            color: '#5b6b66',
          }}
        >
          <Lock size={12} /> Đang ở chế độ chỉ xem
        </div>
      )}
    </S.Card>
  );
};