import React, { useState, useEffect, useRef } from 'react';
import { 
  Overlay, ModalContainer, ModalHeader, Title, CloseButton, 
  ModalBody, Label, Select, ModalFooter, Button,
  CustomSelectContainer, CustomSelectTrigger, CustomSelectDropdown, 
  CustomSelectOption, TeacherAvatar, TeacherAvatarPlaceholder, 
  TeacherInfo, TeacherName, TeacherUsername
} from './modalStyles';
import { accountService } from '@/services/account/AccountService';
import { assignmentService } from '@/services/Principal/AssignmentService';
import { gradeService } from '@/services/grade/GradeService';
import { AccountDomainModel } from '@/config/types/account';
import { GradeDomainModel, ClassDomainModel } from '@/config/types/grade';

interface Props {
  classId: number;
  className: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AssignTeacherModal({ classId, className, onClose, onSuccess }: Props) {
  const [teachers, setTeachers] = useState<AccountDomainModel[]>([]);
  const [grades, setGrades] = useState<GradeDomainModel[]>([]);
  
  const [selectedClassId, setSelectedClassId] = useState<string>(classId.toString());
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('');
  const [role, setRole] = useState<string>('Giáo viên chủ nhiệm');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTeacherDropdownOpen, setIsTeacherDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTeacherDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchData = async () => {
    try {
      const [teachersData, gradesData] = await Promise.all([
        accountService.getAccountsByRole('teacher'),
        gradeService.getGradesAndClasses()
      ]);
      setTeachers(teachersData);
      setGrades(gradesData);
    } catch (err: any) {
      setError('Lỗi tải dữ liệu.');
    }
  };

  const handleSubmit = async () => {
    if (!selectedClassId) {
      setError('Vui lòng chọn lớp học.');
      return;
    }
    if (!selectedTeacherId) {
      setError('Vui lòng chọn giáo viên.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      await assignmentService.assignTeacherToClass(parseInt(selectedClassId), parseInt(selectedTeacherId), role);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi bổ nhiệm.');
    } finally {
      setLoading(false);
    }
  };

  const selectedTeacher = teachers.find(t => t.id.toString() === selectedTeacherId);

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>Bổ nhiệm Giáo viên</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          {error && <div style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</div>}
          
          <div>
            <Label>Chọn Lớp học</Label>
            <Select value={selectedClassId} onChange={(e) => setSelectedClassId(e.target.value)}>
              <option value="">-- Chọn một lớp học --</option>
              {grades.map(grade => (
                <optgroup key={grade.gradeId} label={grade.gradeName}>
                  {grade.classes.map(c => (
                    <option key={c.classId} value={c.classId}>
                      {c.className}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Select>
          </div>

          <div>
            <Label>Chọn Giáo viên</Label>
            <CustomSelectContainer ref={dropdownRef}>
              <CustomSelectTrigger 
                $isOpen={isTeacherDropdownOpen} 
                onClick={() => setIsTeacherDropdownOpen(!isTeacherDropdownOpen)}
              >
                {selectedTeacher ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {selectedTeacher.avatarUrl ? (
                      <TeacherAvatar src={selectedTeacher.avatarUrl} alt={selectedTeacher.fullName} style={{ width: 24, height: 24 }} />
                    ) : (
                      <TeacherAvatarPlaceholder style={{ width: 24, height: 24, fontSize: '0.7rem' }}>
                        {selectedTeacher.fullName.charAt(0)}
                      </TeacherAvatarPlaceholder>
                    )}
                    <span>{selectedTeacher.fullName}</span>
                  </div>
                ) : (
                  <span style={{ color: '#6b7280' }}>-- Chọn một giáo viên --</span>
                )}
                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>▼</span>
              </CustomSelectTrigger>
              
              {isTeacherDropdownOpen && (
                <CustomSelectDropdown>
                  {teachers.map(teacher => (
                    <CustomSelectOption 
                      key={teacher.id} 
                      $selected={selectedTeacherId === teacher.id.toString()}
                      onClick={() => {
                        setSelectedTeacherId(teacher.id.toString());
                        setIsTeacherDropdownOpen(false);
                      }}
                    >
                      {teacher.avatarUrl ? (
                        <TeacherAvatar src={teacher.avatarUrl} alt={teacher.fullName} />
                      ) : (
                        <TeacherAvatarPlaceholder>
                          {teacher.fullName.charAt(0)}
                        </TeacherAvatarPlaceholder>
                      )}
                      <TeacherInfo>
                        <TeacherName>{teacher.fullName}</TeacherName>
                        <TeacherUsername>{teacher.username}</TeacherUsername>
                      </TeacherInfo>
                    </CustomSelectOption>
                  ))}
                  {teachers.length === 0 && (
                    <div style={{ padding: '12px', textAlign: 'center', color: '#6b7280' }}>
                      Không có dữ liệu giáo viên
                    </div>
                  )}
                </CustomSelectDropdown>
              )}
            </CustomSelectContainer>
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
          <Button $primary onClick={handleSubmit} disabled={loading || !selectedTeacherId || !selectedClassId}>
            {loading ? 'Đang lưu...' : 'Xác nhận Bổ nhiệm'}
          </Button>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
}
