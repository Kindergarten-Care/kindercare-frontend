'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Dropdown, kcToast } from '@kindercare/ui';
import { gradeService } from '@/services/grade/GradeService';
import { studentService } from '@/services/Student/StudentService';
import { eventService } from '@/services/Principal/EventService';
import { EventDto, PrincipalEventType } from '@/config/types/event';
import { GradeDomainModel } from '@/config/types/grade';
import { StudentDetailApiDto } from '@/config/types/student';
import {
  Modal, ModalHeader, ModalBody, KmField, KmLabel, KmInput, KmTextArea,
  KmErrorText, KmFoot, KmBtn, CalendarIcon,
} from '@/components/Modal';
import { Row2, CheckboxGrid, CheckboxItem, StudentFilterRow } from '../styles';

interface CreateEventModalProps {
  event?: EventDto;
  onClose: () => void;
  onSuccess: () => void;
}

const TYPE_OPTIONS: { value: PrincipalEventType; label: string }[] = [
  { value: 'School', label: 'Toàn trường' },
  { value: 'Class', label: 'Theo lớp' },
  { value: 'Student', label: 'Theo học sinh' },
  { value: 'Holiday', label: 'Nghỉ lễ' },
];

function toDatetimeLocalValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function CreateEventModal({ event, onClose, onSuccess }: CreateEventModalProps) {
  const isEditing = !!event;

  const [title, setTitle] = useState(event?.title ?? '');
  const [description, setDescription] = useState(event?.description ?? '');
  const [eventType, setEventType] = useState<PrincipalEventType>(event?.eventType ?? 'School');
  const [location, setLocation] = useState(event?.location ?? '');

  const now = new Date();
  const defaultStart = new Date(now.getTime() + 60 * 60 * 1000);
  const defaultEnd = new Date(defaultStart.getTime() + 2 * 60 * 60 * 1000);
  const [startTime, setStartTime] = useState(
    event ? toDatetimeLocalValue(new Date(event.startTime * 1000)) : toDatetimeLocalValue(defaultStart)
  );
  const [endTime, setEndTime] = useState(
    event ? toDatetimeLocalValue(new Date(event.endTime * 1000)) : toDatetimeLocalValue(defaultEnd)
  );

  const [grades, setGrades] = useState<GradeDomainModel[]>([]);
  const [students, setStudents] = useState<StudentDetailApiDto[]>([]);
  const [selectedClassIds, setSelectedClassIds] = useState<number[]>(event?.classIds ?? []);
  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>(event?.studentIds ?? []);
  const [studentSearch, setStudentSearch] = useState('');
  const [studentClassFilter, setStudentClassFilter] = useState('all');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ((eventType === 'Class' || eventType === 'Student') && grades.length === 0) {
      gradeService.getGradesAndClasses().then(setGrades).catch(() => {});
    }
    if (eventType === 'Student' && students.length === 0) {
      studentService.getAllStudents().then(setStudents).catch(() => {});
    }
  }, [eventType, grades.length, students.length]);

  const studentClassNames = useMemo(
    () => Array.from(new Set(grades.flatMap(g => g.classes.map(c => c.className)))).sort(),
    [grades]
  );

  const filteredStudents = useMemo(() => {
    const term = studentSearch.trim().toLowerCase();
    return students.filter(s => {
      const studentClass = s.currentClass ?? s.className;
      if (studentClassFilter !== 'all' && studentClass !== studentClassFilter) return false;
      if (term && !s.fullName.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [students, studentSearch, studentClassFilter]);

  const toggleClassId = (id: number) => {
    setSelectedClassIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const toggleStudentId = (id: number) => {
    setSelectedStudentIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Vui lòng nhập tiêu đề sự kiện');
      return;
    }
    if (!startTime || !endTime) {
      setError('Vui lòng chọn thời gian bắt đầu và kết thúc');
      return;
    }
    if (eventType === 'Class' && selectedClassIds.length === 0) {
      setError('Vui lòng chọn ít nhất 1 lớp');
      return;
    }
    if (eventType === 'Student' && selectedStudentIds.length === 0) {
      setError('Vui lòng chọn ít nhất 1 học sinh');
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim() || undefined,
      startTime: Math.floor(new Date(startTime).getTime() / 1000),
      endTime: Math.floor(new Date(endTime).getTime() / 1000),
      location: location.trim() || undefined,
      eventType,
      classIds: eventType === 'Class' ? selectedClassIds : undefined,
      studentIds: eventType === 'Student' ? selectedStudentIds : undefined,
    };

    try {
      setSaving(true);
      setError(null);
      if (isEditing) {
        await eventService.updateEvent(event.id, payload);
        kcToast.success('Đã cập nhật sự kiện thành công!');
      } else {
        await eventService.createEvent(payload);
        kcToast.success('Đã tạo sự kiện mới thành công!');
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      const message = err.message || `Có lỗi xảy ra khi ${isEditing ? 'cập nhật' : 'tạo'} sự kiện`;
      setError(message);
      kcToast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal size="xl" onClose={onClose}>
      <ModalHeader
        icon={<CalendarIcon />}
        iconVariant="brand"
        title={isEditing ? 'Sửa sự kiện' : 'Tạo sự kiện mới'}
        subtitle="Sự kiện sẽ hiển thị cho đối tượng phù hợp theo loại đã chọn"
        onClose={onClose}
      />

      <ModalBody $padTop>
        {error && <KmErrorText style={{ marginBottom: 12 }}>{error}</KmErrorText>}

        <KmField>
          <KmLabel>Tiêu đề *</KmLabel>
          <KmInput value={title} onChange={e => setTitle(e.target.value)} placeholder="Ví dụ: Họp phụ huynh đầu năm" />
        </KmField>

        <KmField>
          <KmLabel>Loại sự kiện *</KmLabel>
          <Dropdown<PrincipalEventType>
            value={eventType}
            onChange={setEventType}
            options={TYPE_OPTIONS}
            fullWidth
            ariaLabel="Loại sự kiện"
          />
        </KmField>

        {eventType === 'Class' && (
          <KmField>
            <KmLabel>Chọn lớp *</KmLabel>
            <CheckboxGrid>
              {grades.flatMap(g => g.classes).map(cls => (
                <CheckboxItem key={cls.classId}>
                  <input
                    type="checkbox"
                    checked={selectedClassIds.includes(cls.classId)}
                    onChange={() => toggleClassId(cls.classId)}
                  />
                  {cls.className}
                </CheckboxItem>
              ))}
            </CheckboxGrid>
          </KmField>
        )}

        {eventType === 'Student' && (
          <KmField>
            <KmLabel>Chọn học sinh * <span className="opt">· đã chọn {selectedStudentIds.length}</span></KmLabel>
            <StudentFilterRow>
              <KmInput
                value={studentSearch}
                onChange={e => setStudentSearch(e.target.value)}
                placeholder="Tìm theo tên học sinh..."
              />
              <Dropdown
                value={studentClassFilter}
                onChange={setStudentClassFilter}
                options={[
                  { value: 'all', label: 'Tất cả lớp' },
                  ...studentClassNames.map(name => ({ value: name, label: name })),
                ]}
                ariaLabel="Lọc theo lớp"
              />
            </StudentFilterRow>
            <CheckboxGrid>
              {filteredStudents.length === 0 ? (
                <span style={{ gridColumn: '1 / -1', fontSize: 13, color: '#9ca3af', padding: '8px 4px' }}>
                  Không tìm thấy học sinh phù hợp.
                </span>
              ) : (
                filteredStudents.map(s => (
                  <CheckboxItem key={s.id}>
                    <input
                      type="checkbox"
                      checked={selectedStudentIds.includes(s.id)}
                      onChange={() => toggleStudentId(s.id)}
                    />
                    {s.fullName}
                  </CheckboxItem>
                ))
              )}
            </CheckboxGrid>
          </KmField>
        )}

        <Row2>
          <KmField>
            <KmLabel>Bắt đầu *</KmLabel>
            <KmInput type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} />
          </KmField>
          <KmField>
            <KmLabel>Kết thúc *</KmLabel>
            <KmInput type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} />
          </KmField>
        </Row2>

        <KmField>
          <KmLabel>Địa điểm <span className="opt">· tùy chọn</span></KmLabel>
          <KmInput value={location} onChange={e => setLocation(e.target.value)} placeholder="Ví dụ: Hội trường lớn" />
        </KmField>

        <KmField>
          <KmLabel>Mô tả <span className="opt">· tùy chọn</span></KmLabel>
          <KmTextArea value={description} onChange={e => setDescription(e.target.value)} placeholder="Nội dung chi tiết của sự kiện..." />
        </KmField>
      </ModalBody>

      <KmFoot>
        <KmBtn type="button" $variant="ghost" onClick={onClose} disabled={saving}>Hủy bỏ</KmBtn>
        <KmBtn type="button" $variant="brand" onClick={handleSubmit} disabled={saving}>
          {saving ? 'Đang lưu...' : (isEditing ? 'Lưu thay đổi' : 'Tạo sự kiện')}
        </KmBtn>
      </KmFoot>
    </Modal>
  );
}
