import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { AttendanceService } from '@/services/attendance';
import { Student } from '@/config/types/attendance';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: white;
  width: 90%;
  max-width: 380px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.3);
`;

const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #111827;
`;

const Desc = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: #6b7280;
`;

const Body = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ImagePreview = styled.img`
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  outline: none;
  &:focus { border-color: #10B981; }
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #f3f4f6;
  font-size: 14px;
  color: #6b7280;
`;

const Footer = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Btn = styled.button<{ $primary?: boolean }>`
  padding: 10px 18px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border: ${props => props.$primary ? 'none' : '1px solid #d1d5db'};
  background: ${props => props.$primary ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'white'};
  color: ${props => props.$primary ? 'white' : '#374151'};
  transition: all 0.2s ease;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
  &:hover:not(:disabled) { 
    transform: ${props => props.$primary ? 'translateY(-1px)' : 'none'};
    box-shadow: ${props => props.$primary ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'};
    background: ${props => props.$primary ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : '#f3f4f6'}; 
  }
  &:active:not(:disabled) { transform: scale(0.96); }
`;



interface AttendanceConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoBlob: Blob | null;
  photoUrl: string | null;
  students: Student[];
  classId: string;
  className: string;
  teacherId: string;
  onSuccess: () => void;
}

export const AttendanceConfirmModal: React.FC<AttendanceConfirmModalProps> = ({
  isOpen,
  onClose,
  photoBlob,
  photoUrl,
  students,
  classId,
  className,
  teacherId,
  onSuccess,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedStudent = useMemo(() => {
    return students.find(s => String(s.id) === selectedStudentId);
  }, [students, selectedStudentId]);

  const isDropoffComplete = !!selectedStudent?.dropoffImage;
  const isPickupComplete = !!selectedStudent?.pickupImage;
  const isFullyComplete = isDropoffComplete && isPickupComplete;

  const attendanceType = !isDropoffComplete ? 'dropoff' : 'pickup';
  const modalTitle = !selectedStudent
    ? 'Xác nhận điểm danh'
    : !isDropoffComplete
    ? 'Xác nhận Nhận trẻ (Đầu ngày)'
    : isFullyComplete
    ? 'Hoàn thành điểm danh'
    : 'Xác nhận Trả trẻ (Cuối ngày)';

  const arrivalTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  const handleSubmit = async () => {
    if (!selectedStudentId) {
      alert('Vui lòng chọn học sinh!');
      return;
    }
    if (!photoBlob) {
      alert('Không có ảnh chụp!');
      return;
    }
    if (isFullyComplete) {
      alert('Học sinh đã hoàn thành điểm danh 2 chiều trong ngày!');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('photo', photoBlob, 'attendance.jpg');
      formData.append('studentId', selectedStudentId);
      formData.append('classId', classId);
      formData.append('teacherId', teacherId);
      formData.append('arrivalTime', arrivalTime);
      formData.append('type', attendanceType);

      // Call API
      const res = await AttendanceService.uploadPhotoAttendance(formData);

      const returnedType = res?.data?.type || res?.type;

      if (returnedType === 'dropoff') {
        alert('Đã lưu ảnh nhận trẻ đầu ngày thành công!');
      } else if (returnedType === 'pickup') {
        alert('Đã lưu ảnh trả trẻ cuối ngày thành công!');
      } else {
        alert('Điểm danh thành công!');
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error submitting attendance:', error);
      if (error?.response?.status === 400) {
        alert('Học sinh đã điểm danh đủ 2 lần trong ngày, không thể chụp thêm');
      } else {
        alert('Có lỗi xảy ra khi điểm danh.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <Header>
          <Title>{modalTitle}</Title>
          <Desc>
            {isFullyComplete && selectedStudent
              ? 'Học sinh đã hoàn thành điểm danh 2 chiều trong ngày.'
              : 'Kiểm tra thông tin và xác nhận.'}
          </Desc>
        </Header>
        <Body>
          {photoUrl && <ImagePreview src={photoUrl} alt="Preview" />}
          <FormGroup>
            <Label>Học sinh</Label>
            <Select value={selectedStudentId} onChange={e => setSelectedStudentId(e.target.value)}>
              <option value="" disabled>Chọn học sinh...</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </Select>
          </FormGroup>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <FormGroup>
              <Label>Lớp học</Label>
              <Input readOnly value={className} />
            </FormGroup>
            <FormGroup>
              <Label>Thời gian</Label>
              <Input readOnly value={arrivalTime} />
            </FormGroup>
          </div>
        </Body>
        <Footer>
          <Btn onClick={onClose} disabled={isSubmitting}>Hủy</Btn>
          <Btn 
            $primary 
            onClick={handleSubmit} 
            disabled={isSubmitting || (!!selectedStudent && isFullyComplete)}
          >
            {isSubmitting ? 'Đang gửi...' : 'Xác nhận'}
          </Btn>
        </Footer>
      </ModalBox>
    </Overlay>
  );
};
