'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { kcToast, MonthYearPicker } from '@kindercare/ui';
import {
  Modal, ModalHeader, ModalBody, KmField, KmLabel, KmCallout, KmFoot, KmBtn, KmErrorText, CalendarIcon, AlertTriangleIcon,
} from '@/components/Modal';
import { financeService } from '@/services/Principal/FinanceService';
import { billingMonthToMonthYear, monthYearToBillingMonth } from '../utils/billingMonth';

const ToggleRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  margin-top: 4px;
`;

const ToggleCheckbox = styled.input`
  width: 16px;
  height: 16px;
  margin-top: 2px;
  cursor: pointer;
  accent-color: #047857;
  flex-shrink: 0;
`;

const ToggleText = styled.div`
  font-size: 0.85rem;
`;

const ToggleTitle = styled.div`
  font-weight: 600;
  color: #111827;
`;

const ToggleHint = styled.div`
  font-size: 0.78rem;
  color: #6b7280;
  margin-top: 2px;
`;

interface RunMonthlyModalProps {
  defaultBillingMonth: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RunMonthlyModal({ defaultBillingMonth, onClose, onSuccess }: RunMonthlyModalProps) {
  const initial = billingMonthToMonthYear(defaultBillingMonth);
  const [month, setMonth] = useState(initial.month);
  const [year, setYear] = useState(initial.year);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failedStudentIds, setFailedStudentIds] = useState<number[]>([]);
  const [partialMonth, setPartialMonth] = useState(false);

  const handleRun = async () => {
    try {
      setRunning(true);
      setError(null);
      setFailedStudentIds([]);
      const billingMonth = monthYearToBillingMonth(month, year);
      const result = await financeService.runMonthly({ billingMonth, partialMonth });
      kcToast.success(
        `Đã tạo ${result.generated.tuition} hóa đơn học phí, ${result.generated.monthly} hóa đơn tiền ăn, ${result.generated.extracurricular} hóa đơn ngoại khóa gia hạn`
      );
      if (result.partialMonth) {
        kcToast.info(`Đã tạo hóa đơn tính tiền ăn theo số ngày công đã qua, đến hết ngày ${result.partialUntilDay}.`);
      } else if (partialMonth) {
        kcToast.info('Tháng đã chọn không phải tháng hiện tại, hệ thống đã tính đủ cả tháng như bình thường.');
      }
      if (result.failedStudentIds.length > 0) {
        setFailedStudentIds(result.failedStudentIds);
      } else {
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      const message = err.message || 'Có lỗi xảy ra, vui lòng thử lại';
      setError(message);
      kcToast.error(message);
    } finally {
      setRunning(false);
    }
  };

  return (
    <Modal size="sm" onClose={onClose}>
      <ModalHeader
        icon={<CalendarIcon />}
        iconVariant="brand"
        title="Xuất hóa đơn thủ công"
        subtitle="Tạo hóa đơn ngay mà không cần đợi đến ngày 1 hàng tháng"
        onClose={onClose}
      />

      <ModalBody>
        {error && <KmErrorText style={{ marginBottom: 12 }}>{error}</KmErrorText>}

        <KmField>
          <KmLabel>Tháng billing</KmLabel>
          <MonthYearPicker month={month} year={year} onChange={(m, y) => { setMonth(m); setYear(y); }} ariaLabel="Tháng billing" />
        </KmField>

        <ToggleRow>
          <ToggleCheckbox
            type="checkbox"
            checked={partialMonth}
            onChange={e => setPartialMonth(e.target.checked)}
          />
          <ToggleText>
            <ToggleTitle>Tính tiền ăn đến thời điểm xuất hóa đơn</ToggleTitle>
            <ToggleHint>
              Chỉ áp dụng khi tháng chọn là tháng hiện tại — tính theo số ngày công đã qua tính đến hôm nay, thay vì thu trước cả tháng.
            </ToggleHint>
          </ToggleText>
        </ToggleRow>

        {failedStudentIds.length > 0 && (
          <KmCallout $variant="amber">
            <AlertTriangleIcon />
            <span>
              Có {failedStudentIds.length} học sinh chưa tạo được hóa đơn do thiếu cấu hình học phí (ID: {failedStudentIds.join(', ')}).
              Vào <b>Cấu hình học phí</b> để bổ sung.
            </span>
          </KmCallout>
        )}
      </ModalBody>

      <KmFoot>
        <KmBtn type="button" $variant="ghost" onClick={onClose} disabled={running}>Đóng</KmBtn>
        <KmBtn type="button" $variant="brand" onClick={handleRun} disabled={running}>
          {running ? 'Đang xuất...' : 'Xuất hóa đơn'}
        </KmBtn>
      </KmFoot>
    </Modal>
  );
}
