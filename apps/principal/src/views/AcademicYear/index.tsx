'use client';

import React, { useState, useEffect } from 'react';
import { Container, Title, Card, CardTitle, InfoText, DangerButton, PrimaryButton, FormGroup, Label, Input, Table, Th, Td, Badge } from './styles';
import { assignmentService } from '@/services/Principal/AssignmentService';

export default function AcademicYearView() {
  const [loadingEnd, setLoadingEnd] = useState(false);
  const [loadingStart, setLoadingStart] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [loadingActivate, setLoadingActivate] = useState<number | null>(null);
  
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [yearName, setYearName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isActive, setIsActive] = useState(false);

  const [years, setYears] = useState<any[]>([]);

  const fetchYears = async () => {
    try {
      setLoadingYears(true);
      const data = await assignmentService.getAcademicYears();
      setYears(data);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải danh sách năm học');
    } finally {
      setLoadingYears(false);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  const activeYear = years.find(y => y.IsActive === 1);

  const handleEndYear = async () => {
    if (!activeYear) {
      window.alert('Không có năm học nào đang hoạt động để tổng kết!');
      return;
    }
    if (!window.confirm(`CẢNH BÁO: Hành động này sẽ tổng kết năm học "${activeYear.YearName}".\n\n- Học sinh Khối Lá sẽ TỐT NGHIỆP.\n- Học sinh khối khác sẽ bị GỠ KHỎI LỚP (Chờ xếp lớp lại).\n\nBạn có chắc chắn muốn tiếp tục?`)) {
      return;
    }

    try {
      setLoadingEnd(true);
      setError(null);
      setSuccessMsg(null);
      const res = await assignmentService.endAcademicYear();
      setSuccessMsg(`Đã kết thúc năm học ${activeYear.YearName} thành công. Cấp bằng tốt nghiệp cho ${res.graduatedStudents} học sinh.`);
      fetchYears();
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
      fetchYears();
    } catch (err: any) {
      setError(err.message || 'Lỗi khi khởi tạo năm học mới');
    } finally {
      setLoadingStart(false);
    }
  };

  const handleActivate = async (yearId: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn kích hoạt năm học này? Các năm học khác sẽ bị vô hiệu hóa.')) {
      return;
    }
    
    try {
      setLoadingActivate(yearId);
      setError(null);
      setSuccessMsg(null);
      await assignmentService.activateAcademicYear(yearId);
      setSuccessMsg('Kích hoạt năm học thành công!');
      fetchYears();
    } catch (err: any) {
      setError(err.message || 'Lỗi khi kích hoạt năm học');
    } finally {
      setLoadingActivate(null);
    }
  };

  const formatDate = (ts: number) => new Date(ts * 1000).toLocaleDateString('vi-VN');

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

      <Card>
        <CardTitle>
          <span style={{ fontSize: '1.5rem' }}>📅</span> Danh sách Năm học
        </CardTitle>
        <InfoText>Dưới đây là danh sách các năm học đã được khởi tạo trên hệ thống.</InfoText>
        
        {loadingYears ? (
          <div>Đang tải dữ liệu...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <thead>
                <tr>
                  <Th>ID</Th>
                  <Th>Tên năm học</Th>
                  <Th>Ngày bắt đầu</Th>
                  <Th>Ngày kết thúc</Th>
                  <Th>Trạng thái</Th>
                  <Th>Thao tác</Th>
                </tr>
              </thead>
              <tbody>
                {years.map(y => (
                  <tr key={y.YearID}>
                    <Td>#{y.YearID}</Td>
                    <Td style={{ fontWeight: 600 }}>{y.YearName}</Td>
                    <Td>{formatDate(y.StartDate)}</Td>
                    <Td>{formatDate(y.EndDate)}</Td>
                    <Td>
                      <Badge $active={y.IsActive === 1}>
                        {y.IsActive === 1 ? 'Đang hoạt động' : 'Chưa kích hoạt'}
                      </Badge>
                    </Td>
                    <Td>
                      {y.IsActive === 0 && (
                        <PrimaryButton 
                          style={{ padding: '6px 12px', fontSize: '0.875rem' }}
                          onClick={() => handleActivate(y.YearID)}
                          disabled={loadingActivate === y.YearID}
                        >
                          {loadingActivate === y.YearID ? 'Đang xử lý...' : 'Kích hoạt'}
                        </PrimaryButton>
                      )}
                    </Td>
                  </tr>
                ))}
                {years.length === 0 && (
                  <tr>
                    <Td colSpan={6} style={{ textAlign: 'center', color: '#6b7280' }}>
                      Chưa có dữ liệu năm học nào.
                    </Td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
      </Card>

      <Title style={{ marginTop: '32px', borderTop: '1px solid #e5e7eb', paddingTop: '32px' }}>
        Quy trình Chuyển giao Năm học
      </Title>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        
        {/* Left Column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Bước 1 */}
          <Card style={{ borderLeft: '4px solid #ef4444', margin: 0 }}>
            <CardTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div><span style={{ fontSize: '1.25rem', marginRight: '8px' }}>1️⃣</span> <b>Bước 1:</b> Tổng kết năm hiện tại</div>
              {activeYear && (
                <Badge $active={true} style={{ fontSize: '0.85rem', padding: '4px 8px' }}>
                  {activeYear.YearName}
                </Badge>
              )}
            </CardTitle>
            <InfoText style={{ fontSize: '0.9rem' }}>
              Tự động tốt nghiệp học sinh Khối Lá (5 tuổi) và gỡ lớp hiện tại của toàn bộ học sinh để chuẩn bị lên lớp mới.
              <div style={{ color: '#991b1b', marginTop: '8px' }}>
                <b>⚠️ Lưu ý:</b> Hành động này không thể hoàn tác.
              </div>
            </InfoText>
            <DangerButton onClick={handleEndYear} disabled={loadingEnd || loadingStart} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              {loadingEnd ? 'Đang xử lý...' : 'Thực hiện Tổng kết'}
            </DangerButton>
          </Card>

          {/* Bước 3 */}
          <Card style={{ borderLeft: '4px solid #10b981', margin: 0 }}>
            <CardTitle>
              <span style={{ fontSize: '1.25rem', marginRight: '8px' }}>3️⃣</span> <b>Bước 3:</b> Kích hoạt năm học mới
            </CardTitle>
            <InfoText style={{ margin: 0, fontSize: '0.9rem' }}>
              Sau khi khởi tạo, hãy tìm năm học mới trên <b>Bảng danh sách</b> và bấm <b>Kích hoạt</b>. Năm học cũ sẽ tự động đóng lại.
            </InfoText>
          </Card>
        </div>

        {/* Right Column - Bước 2 */}
        <Card style={{ flex: 1, borderLeft: '4px solid #0ea5e9', margin: 0 }}>
          <CardTitle>
            <span style={{ fontSize: '1.25rem', marginRight: '8px' }}>2️⃣</span> <b>Bước 2:</b> Khởi tạo năm học mới
          </CardTitle>
          <InfoText style={{ fontSize: '0.9rem' }}>
            Tạo khung thời gian cho năm học mới. Hệ thống sẽ tự động sao chép danh sách lớp học (không bao gồm học sinh) từ năm cũ.
          </InfoText>

          <form onSubmit={handleStartYear} style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <FormGroup>
              <Label style={{ fontSize: '0.9rem' }}>Tên năm học (VD: Niên khóa 2027 - 2028)</Label>
              <Input type="text" value={yearName} onChange={e => setYearName(e.target.value)} required placeholder="Nhập tên năm học..." style={{ padding: '8px 12px' }} />
            </FormGroup>
            <div style={{ display: 'flex', gap: 16 }}>
              <FormGroup style={{ flex: 1 }}>
                <Label style={{ fontSize: '0.9rem' }}>Ngày bắt đầu</Label>
                <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required style={{ padding: '8px 12px' }} />
              </FormGroup>
              <FormGroup style={{ flex: 1 }}>
                <Label style={{ fontSize: '0.9rem' }}>Ngày kết thúc</Label>
                <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required style={{ padding: '8px 12px' }} />
              </FormGroup>
            </div>
            
            <PrimaryButton type="submit" style={{ marginTop: 8, padding: '8px 16px', fontSize: '0.9rem' }} disabled={loadingStart || loadingEnd}>
              {loadingStart ? 'Đang khởi tạo...' : 'Lưu & Khởi tạo Năm học'}
            </PrimaryButton>
          </form>
        </Card>

      </div>
    </Container>
  );
}
