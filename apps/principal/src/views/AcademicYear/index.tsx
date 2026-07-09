'use client';

import React, { useState } from 'react';
import { Container, Title, Card, CardTitle, InfoText, DangerButton, PrimaryButton, FormGroup, Label, Input } from './styles';
import { assignmentService } from '@/services/Principal/AssignmentService';

export default function AcademicYearView() {
  const [loadingEnd, setLoadingEnd] = useState(false);
  const [loadingStart, setLoadingStart] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [yearName, setYearName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleEndYear = async () => {
    if (!window.confirm('CẢNH BÁO: Hành động này sẽ TỐT NGHIỆP toàn bộ học sinh Khối Lá và GỠ LỚP toàn bộ học sinh khối khác. Bạn có chắc chắn muốn kết thúc năm học hiện tại?')) {
      return;
    }

    try {
      setLoadingEnd(true);
      setError(null);
      setSuccessMsg(null);
      const res = await assignmentService.endAcademicYear();
      setSuccessMsg(`Đã kết thúc năm học thành công. Cấp bằng tốt nghiệp cho ${res.graduatedStudents} học sinh.`);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi kết thúc năm học');
    } finally {
      setLoadingEnd(false);
    }
  };

  const handleStartYear = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!yearName || !startDate || !endDate) {
      setError('Vui lòng điền đầy đủ thông tin năm học mới.');
      return;
    }

    try {
      setLoadingStart(true);
      setError(null);
      setSuccessMsg(null);
      
      const payload = {
        yearName,
        startDate: Math.floor(new Date(startDate).getTime() / 1000),
        endDate: Math.floor(new Date(endDate).getTime() / 1000),
        monthlyTuition: 0,
        dailyMealFee: 0,
        isActive
      };

      const res = await assignmentService.startAcademicYear(payload);
      setSuccessMsg(`Khởi tạo năm học ${res.academicYear?.YearName || yearName} thành công. Đã sao chép ${res.clonedClassesCount || 0} lớp học.`);
      
      // Reset form
      setYearName('');
      setStartDate('');
      setEndDate('');
      setIsActive(false);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi khởi tạo năm học mới');
    } finally {
      setLoadingStart(false);
    }
  };

  return (
    <Container>
      <Title>Quản lý Năm học</Title>

      {error && (
        <div style={{ padding: 12, background: '#fef2f2', color: '#b91c1c', borderRadius: 8, marginBottom: 24 }}>
          {error}
        </div>
      )}

      {successMsg && (
        <div style={{ padding: 12, background: '#f0fdf4', color: '#15803d', borderRadius: 8, marginBottom: 24 }}>
          {successMsg}
        </div>
      )}

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <Card style={{ flex: 1 }}>
          <CardTitle>
            <span style={{ fontSize: '1.5rem' }}>🏁</span> Tổng kết năm học
          </CardTitle>
          <InfoText>
            Khi tổng kết năm học:
            <ul style={{ marginTop: 8, marginLeft: 20 }}>
              <li>Tất cả học sinh <b>Khối Lá</b> sẽ được tự động chuyển trạng thái sang <b>Đã tốt nghiệp</b>.</li>
              <li>Học sinh các khối khác sẽ được gỡ khỏi lớp hiện tại (đưa về trạng thái <b>Chờ xếp lớp</b>).</li>
            </ul>
            <i>Lưu ý: Hành động này không thể hoàn tác.</i>
          </InfoText>
          <DangerButton onClick={handleEndYear} disabled={loadingEnd || loadingStart}>
            {loadingEnd ? 'Đang xử lý...' : 'Thực hiện Tổng kết'}
          </DangerButton>
        </Card>

        <Card style={{ flex: 1 }}>
          <CardTitle>
            <span style={{ fontSize: '1.5rem' }}>🌱</span> Khởi tạo Năm học mới
          </CardTitle>
          <InfoText>
            Hành động này sẽ tạo một chu kỳ năm học mới, đồng thời <b>sao chép toàn bộ danh sách Lớp học</b> (không bao gồm học sinh & giáo viên) từ năm cũ sang.
          </InfoText>

          <form onSubmit={handleStartYear}>
            <FormGroup>
              <Label>Tên năm học (VD: 2024 - 2025)</Label>
              <Input type="text" value={yearName} onChange={e => setYearName(e.target.value)} required />
            </FormGroup>
            <div style={{ display: 'flex', gap: 16 }}>
              <FormGroup style={{ flex: 1 }}>
                <Label>Ngày bắt đầu</Label>
                <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
              </FormGroup>
              <FormGroup style={{ flex: 1 }}>
                <Label>Ngày kết thúc</Label>
                <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
              </FormGroup>
            </div>
            
            <FormGroup style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, marginBottom: 16 }}>
              <input type="checkbox" id="isActiveCheck" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
              <Label htmlFor="isActiveCheck" style={{ margin: 0, cursor: 'pointer' }}>Kích hoạt năm học này ngay lập tức</Label>
            </FormGroup>

            <PrimaryButton type="submit" style={{ marginTop: 8 }} disabled={loadingStart || loadingEnd}>
              {loadingStart ? 'Đang khởi tạo...' : 'Khởi tạo Năm học'}
            </PrimaryButton>
          </form>
        </Card>
      </div>
    </Container>
  );
}
