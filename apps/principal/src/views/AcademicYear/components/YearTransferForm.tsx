'use client';

import React from 'react';
import {
  StepCard,
  CardTitle,
  CardDescription,
  DangerButton,
  PrimaryButton,
  FormGroup,
  Label,
  Input,
  Badge,
  WarningText,
  FormBody,
  DateRow,
} from '../styles';

interface YearTransferFormProps {
  activeYearName?: string;
  loadingEnd: boolean;
  loadingStart: boolean;
  yearName: string;
  startDate: string;
  endDate: string;
  onYearNameChange: (v: string) => void;
  onStartDateChange: (v: string) => void;
  onEndDateChange: (v: string) => void;
  onEndYear: () => void;
  onStartYear: (e: React.FormEvent) => void;
}

export default function YearTransferForm({
  activeYearName,
  loadingEnd,
  loadingStart,
  yearName,
  startDate,
  endDate,
  onYearNameChange,
  onStartDateChange,
  onEndDateChange,
  onEndYear,
  onStartYear,
}: YearTransferFormProps) {
  return (
    <>
      <StepCard $accent="danger">
        <CardTitle>
          <span>1️⃣</span> Bước 1: Tổng kết năm hiện tại
          {activeYearName && <Badge $active>{activeYearName}</Badge>}
        </CardTitle>
        <CardDescription>
          Tự động tốt nghiệp học sinh Khối Lá (5 tuổi) và gỡ lớp hiện tại của toàn bộ học sinh để chuẩn bị lên lớp mới.
          <WarningText>
            ⚠️ Hành động này <strong>không thể hoàn tác</strong>.
          </WarningText>
        </CardDescription>
        <DangerButton onClick={onEndYear} disabled={loadingEnd || loadingStart}>
          {loadingEnd ? '⏳ Đang xử lý...' : '🚨 Thực hiện Tổng kết'}
        </DangerButton>
      </StepCard>

      <StepCard $accent="primary">
        <CardTitle>
          <span>2️⃣</span> Bước 2: Khởi tạo năm học mới
        </CardTitle>
        <CardDescription>
          Tạo khung thời gian cho năm học mới. Hệ thống sẽ tự động sao chép danh sách lớp học (không bao gồm học sinh) từ năm cũ.
        </CardDescription>

        <form onSubmit={onStartYear}>
          <FormBody>
            <FormGroup>
              <Label>Tên năm học</Label>
              <Input
                type="text"
                value={yearName}
                onChange={e => onYearNameChange(e.target.value)}
                required
                placeholder="VD: Niên khóa 2027 - 2028"
              />
            </FormGroup>
            <DateRow>
              <FormGroup>
                <Label>Ngày bắt đầu</Label>
                <Input type="date" value={startDate} onChange={e => onStartDateChange(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Ngày kết thúc</Label>
                <Input type="date" value={endDate} onChange={e => onEndDateChange(e.target.value)} required />
              </FormGroup>
            </DateRow>
          </FormBody>
          <PrimaryButton type="submit" disabled={loadingStart || loadingEnd}>
            {loadingStart ? '⏳ Đang khởi tạo...' : '✨ Lưu & Khởi tạo Năm học'}
          </PrimaryButton>
        </form>
      </StepCard>

      <StepCard $accent="success">
        <CardTitle>
          <span>3️⃣</span> Bước 3: Kích hoạt năm học mới
        </CardTitle>
        <CardDescription>
          Sau khi khởi tạo, bấm <strong>Kích hoạt</strong> ở bảng danh sách bên trên. Năm học cũ sẽ tự động đóng lại.
        </CardDescription>
      </StepCard>
    </>
  );
}
