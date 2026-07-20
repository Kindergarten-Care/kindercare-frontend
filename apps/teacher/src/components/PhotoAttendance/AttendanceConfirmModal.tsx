import React, { useState, useMemo, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { AttendanceService } from '@/services/Attendance/AttendanceService';
import { Student } from '@/config/types/attendance';
import { kcToast } from '@kindercare/ui';

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

const DropdownTrigger = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: 11px 14px;
  border-radius: 11px;
  border: 1.5px solid ${p => p.$isOpen ? '#34D399' : '#E6EEE9'};
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  background: #fff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  user-select: none;
  transition: all 0.2s ease;
  box-shadow: ${p => p.$isOpen ? '0 0 0 3px rgba(52, 211, 153, 0.12)' : 'none'};

  &:hover {
    border-color: #34D399;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: white;
  border: 1.5px solid #E6EEE9;
  border-radius: 11px;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
  z-index: 1000;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DropdownSearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1.5px solid #E6EEE9;
  font-size: 13px;
  font-weight: 500;
  outline: none;
  background: #fff;
  color: #1F2937;
  transition: border-color 0.2s;

  &:focus {
    border-color: #34D399;
  }
`;

const DropdownOptionsList = styled.div`
  max-height: 180px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 99px;
  }
`;

const DropdownOption = styled.div<{ $active: boolean }>`
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13.5px;
  font-weight: 600;
  color: ${p => p.$active ? '#005A36' : '#374151'};
  background: ${p => p.$active ? '#E6F3ED' : 'transparent'};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: ${p => p.$active ? '#E6F3ED' : '#F9FAFB'};
  }
`;


const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 11px 14px;
  border-radius: 11px;
  border: 1.5px solid #E6EEE9;
  background: #F3F4F6;
  font-size: 14px;
  font-weight: 600;
  color: #4B5563;
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState('');

  const selectedStudent = useMemo(() => {
    return students.find(s => String(s.id) === selectedStudentId);
  }, [students, selectedStudentId]);

  const filteredStudentsForDropdown = useMemo(() => {
    return students.filter(s => s.name.toLowerCase().includes(dropdownSearch.toLowerCase().trim()));
  }, [students, dropdownSearch]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedStudentId('');
      setIsDropdownOpen(false);
      setDropdownSearch('');
    }
  }, [isOpen]);

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
      kcToast.warning('Vui lòng chọn học sinh!');
      return;
    }
    if (!photoBlob) {
      kcToast.error('Không có ảnh chụp!');
      return;
    }
    if (isFullyComplete) {
      kcToast.warning('Học sinh đã hoàn thành điểm danh 2 chiều trong ngày!');
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
        kcToast.success('Đã lưu ảnh nhận trẻ đầu ngày thành công!');
      } else if (returnedType === 'pickup') {
        kcToast.success('Đã lưu ảnh trả trẻ cuối ngày thành công!');
      } else {
        kcToast.success('Điểm danh thành công!');
      }

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (error: any) {
      console.error('Error submitting attendance:', error);
      if (error?.response?.status === 400) {
        kcToast.error('Học sinh đã điểm danh đủ 2 lần trong ngày, không thể chụp thêm');
      } else {
        kcToast.error('Có lỗi xảy ra khi điểm danh.');
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
          <FormGroup style={{ position: 'relative' }}>
            <Label>Học sinh</Label>
            <DropdownTrigger $isOpen={isDropdownOpen} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <span>{selectedStudent ? selectedStudent.name : 'Chọn học sinh...'}</span>
              <span style={{ fontSize: '10px', transition: 'transform 0.2s', transform: isDropdownOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
            </DropdownTrigger>
            {isDropdownOpen && (
              <DropdownMenu>
                <DropdownSearchInput
                  type="text"
                  placeholder="Tìm học sinh..."
                  value={dropdownSearch}
                  onChange={e => setDropdownSearch(e.target.value)}
                  onClick={e => e.stopPropagation()}
                  autoFocus
                />
                <DropdownOptionsList>
                  {filteredStudentsForDropdown.length === 0 ? (
                    <div style={{ padding: '8px 12px', fontSize: '12.5px', color: '#9CA3AF', textAlign: 'center', fontWeight: 500 }}>Không tìm thấy học sinh</div>
                  ) : (
                    filteredStudentsForDropdown.map(s => (
                      <DropdownOption
                        key={s.id}
                        $active={s.id === selectedStudentId}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudentId(s.id);
                          setIsDropdownOpen(false);
                          setDropdownSearch('');
                        }}
                      >
                        {s.name}
                      </DropdownOption>
                    ))
                  )}
                </DropdownOptionsList>
              </DropdownMenu>
            )}
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
