'use client';

import React, { useState } from 'react';
import {
  Modal, ModalHeader, ModalBody, KmField, KmLabel, KmInput, KmInputAffix, KmTextArea, KmErrorText, KmFoot, KmBtn,
  CreditCardIcon,
} from '@/components/Modal';

export interface EditFieldConfig {
  key: string;
  label: string;
  type: 'text' | 'number' | 'textarea';
  suffix?: string;
  required?: boolean;
}

const formatCurrency = (value: string | number) => {
  if (value === '' || value === null || value === undefined) return '';
  // Giá trị số (kể cả string số thập phân "2500000.00" từ API) phải parseFloat
  // trước, không được strip ký tự bằng regex — nếu không dấu chấm thập phân sẽ
  // bị xóa và số bị nhân bội (vd "2500000.00" -> "250000000").
  const amount = typeof value === 'number' ? value : parseFloat(value.replace(/,/g, ''));
  if (!Number.isFinite(amount)) return '';
  return Math.round(amount).toLocaleString('vi-VN');
};

const parseCurrency = (formatted: string) => {
  const digits = formatted.replace(/\D/g, '');
  return digits ? Number(digits) : 0;
};

interface EditFeeModalProps {
  title: string;
  fields: EditFieldConfig[];
  initialValues: Record<string, any>;
  submitLabel?: string;
  onClose: () => void;
  onSave: (values: Record<string, any>) => Promise<void> | void;
}

export default function EditFeeModal({ title, fields, initialValues, submitLabel, onClose, onSave }: EditFeeModalProps) {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (key: string, raw: string, type: EditFieldConfig['type']) => {
    setValues(prev => ({ ...prev, [key]: type === 'number' ? Number(raw) : raw }));
  };

  const handleCurrencyChange = (key: string, raw: string) => {
    setValues(prev => ({ ...prev, [key]: parseCurrency(raw) }));
  };

  const handleSubmit = async () => {
    const missing = fields.find(f => f.required && !String(values[f.key] ?? '').trim());
    if (missing) {
      setError(`Vui lòng điền "${missing.label}"`);
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await onSave(values);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal size="md" onClose={onClose}>
      <ModalHeader icon={<CreditCardIcon />} iconVariant="brand" title={title} onClose={onClose} />

      <ModalBody $padTop>
        {error && <KmErrorText>{error}</KmErrorText>}
        {fields.map(field => {
          const isCurrency = field.type === 'number' && field.suffix === 'đ';
          return (
            <KmField key={field.key}>
              <KmLabel>
                {field.label}
                {field.required ? ' *' : ''}
                {field.suffix && !isCurrency ? ` (${field.suffix})` : ''}
              </KmLabel>
              {field.type === 'textarea' ? (
                <KmTextArea
                  value={values[field.key] ?? ''}
                  onChange={e => handleChange(field.key, e.target.value, field.type)}
                />
              ) : isCurrency ? (
                <KmInputAffix>
                  <KmInput
                    type="text"
                    inputMode="numeric"
                    value={formatCurrency(values[field.key] ?? '')}
                    onChange={e => handleCurrencyChange(field.key, e.target.value)}
                  />
                  <span className="affix">đ</span>
                </KmInputAffix>
              ) : (
                <KmInput
                  type={field.type === 'number' ? 'number' : 'text'}
                  value={values[field.key] ?? ''}
                  onChange={e => handleChange(field.key, e.target.value, field.type)}
                />
              )}
            </KmField>
          );
        })}
      </ModalBody>

      <KmFoot>
        <KmBtn type="button" $variant="ghost" onClick={onClose} disabled={saving}>Hủy bỏ</KmBtn>
        <KmBtn type="button" $variant="brand" onClick={handleSubmit} disabled={saving}>
          {saving ? 'Đang lưu...' : (submitLabel || 'Lưu thay đổi')}
        </KmBtn>
      </KmFoot>
    </Modal>
  );
}
