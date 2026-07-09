import React, { useState, useEffect } from 'react';
import { Overlay, ModalContainer, ModalHeader, Title, CloseButton, ModalBody, Label, Select, ModalFooter, Button } from './modalStyles';
import { accountService } from '@/services/account/AccountService';
import { assignmentService } from '@/services/Principal/AssignmentService';
import { AccountDomainModel } from '@/config/types/account';

interface Props {
  classId: number;
  className: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AssignTeacherModal({ classId, className, onClose, onSuccess }: Props) {
  const [teachers, setTeachers] = useState<AccountDomainModel[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('');
  const [role, setRole] = useState<string>('Giáo viên chủ nhiệm');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const data = await accountService.getAccountsByRole('teacher');
      setTeachers(data);
    } catch (err: any) {
      setError('Lỗi tải danh sách giáo viên.');
    }
  };

  const handleSubmit = async () => {
    if (!selectedTeacherId) {
      setError('Vui lòng chọn giáo viên.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      await assignmentService.assignTeacherToClass(classId, parseInt(selectedTeacherId), role);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi bổ nhiệm.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <Title>Bổ nhiệm cho lớp {className}</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          {error && <div style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</div>}
          
          <div>
            <Label>Chọn Giáo viên</Label>
            <Select value={selectedTeacherId} onChange={(e) => setSelectedTeacherId(e.target.value)}>
              <option value="">-- Chọn một giáo viên --</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.fullName} ({teacher.username})
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label>Vai trò trong lớp</Label>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Giáo viên chủ nhiệm">Giáo viên chủ nhiệm</option>
              <option value="Giáo viên phụ">Giáo viên phụ</option>
            </Select>
          </div>
        </ModalBody>
        
        <ModalFooter>
          <Button onClick={onClose} disabled={loading}>Hủy</Button>
          <Button $primary onClick={handleSubmit} disabled={loading || !selectedTeacherId}>
            {loading ? 'Đang lưu...' : 'Xác nhận Bổ nhiệm'}
          </Button>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
}
