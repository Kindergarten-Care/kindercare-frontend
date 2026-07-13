import React, { useState, useEffect } from 'react';
import {
  Modal, ModalHeader, ModalBody, KmField, KmLabel, KmFoot, KmBtn, KmErrorText,
  UserPlusIcon,
} from '@/components/Modal';
import { Dropdown } from '@kindercare/ui';
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

  useEffect(() => {
    fetchData();
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

  const classOptions = grades.flatMap(grade =>
    grade.classes.map(c => ({
      value: c.classId.toString(),
      label: c.className,
      group: grade.gradeName,
    }))
  );

  const teacherOptions = teachers.map(t => ({
    value: t.id.toString(),
    label: `${t.fullName} (@${t.username})`,
  }));

  const roleOptions: { value: string; label: string }[] = [
    { value: 'Giáo viên chủ nhiệm', label: 'Giáo viên chủ nhiệm' },
    { value: 'Giáo viên phụ', label: 'Giáo viên phụ' },
  ];

  return (
    <Modal size="md" onClose={onClose}>
      <ModalHeader
        icon={<UserPlusIcon />}
        iconVariant="brand"
        title="Bổ nhiệm Giáo viên"
        onClose={onClose}
      />

      <ModalBody $padTop>
        {error && <KmErrorText>{error}</KmErrorText>}

        <KmField>
          <KmLabel>Chọn Lớp học</KmLabel>
          <Dropdown
            value={selectedClassId === '' ? null : selectedClassId}
            onChange={(val) => setSelectedClassId(val)}
            options={classOptions}
            placeholder="-- Chọn một lớp học --"
            fullWidth
          />
        </KmField>

        <KmField>
          <KmLabel>Chọn Giáo viên</KmLabel>
          <Dropdown
            value={selectedTeacherId === '' ? null : selectedTeacherId}
            onChange={(val) => setSelectedTeacherId(val)}
            options={teacherOptions}
            placeholder="-- Chọn một giáo viên --"
            fullWidth
          />
        </KmField>

        <KmField>
          <KmLabel>Vai trò trong lớp</KmLabel>
          <Dropdown
            value={role}
            onChange={(val) => setRole(val)}
            options={roleOptions}
            fullWidth
          />
        </KmField>
      </ModalBody>

      <KmFoot>
        <KmBtn $variant="ghost" onClick={onClose} disabled={loading}>Hủy</KmBtn>
        <KmBtn $variant="brand" onClick={handleSubmit} disabled={loading || !selectedTeacherId || !selectedClassId}>
          {loading ? 'Đang lưu...' : 'Xác nhận Bổ nhiệm'}
        </KmBtn>
      </KmFoot>
    </Modal>
  );
}
