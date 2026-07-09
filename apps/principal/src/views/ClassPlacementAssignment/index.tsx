'use client';

import React, { useEffect, useState } from 'react';
import { Container, Title, SplitView, Panel, PanelHeader, Select, ActionCenter, MoveButton, ListContainer, StudentItem, Avatar, EmptyState } from './styles';
import { studentService } from '@/services/Student/StudentService';
import { gradeService } from '@/services/grade/GradeService';
import { classService } from '@/services/Class/ClassService';
import { assignmentService } from '@/services/Principal/AssignmentService';
import { GradeDomainModel, ClassDomainModel } from '@/config/types/grade';
import { ClassDetailDomainModel } from '@/config/types/class';

export default function ClassPlacementAssignmentView() {
  const [unassignedStudents, setUnassignedStudents] = useState<any[]>([]);
  const [grades, setGrades] = useState<GradeDomainModel[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [classDetail, setClassDetail] = useState<ClassDetailDomainModel | null>(null);
  
  const [selectedUnassigned, setSelectedUnassigned] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingClass, setLoadingClass] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUnassignedStudents();
    fetchGrades();
  }, []);

  const fetchUnassignedStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getUnassignedStudents();
      setUnassignedStudents(data);
      setSelectedUnassigned([]);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGrades = async () => {
    try {
      const data = await gradeService.getGradesAndClasses();
      setGrades(data);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleClassChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const classId = e.target.value;
    setSelectedClassId(classId);
    
    if (classId) {
      try {
        setLoadingClass(true);
        const detail = await classService.getClassDetail(parseInt(classId));
        setClassDetail(detail);
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoadingClass(false);
      }
    } else {
      setClassDetail(null);
    }
  };

  const toggleStudentSelection = (studentId: number) => {
    setSelectedUnassigned(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId) 
        : [...prev, studentId]
    );
  };

  const handleAssignToClass = async () => {
    if (!selectedClassId || selectedUnassigned.length === 0) return;
    
    try {
      setLoading(true);
      await assignmentService.assignStudentsToClass(selectedUnassigned, parseInt(selectedClassId));
      
      // Refresh both lists
      await fetchUnassignedStudents();
      const detail = await classService.getClassDetail(parseInt(selectedClassId));
      setClassDetail(detail);
      
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi xếp lớp');
      alert(err.message || 'Có lỗi xảy ra khi xếp lớp');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Xếp lớp cho Học sinh</Title>

      <SplitView>
        {/* Left Panel: Unassigned Students */}
        <Panel>
          <PanelHeader>
            <div style={{ fontWeight: 600, color: '#111827' }}>Học sinh chờ xếp lớp</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: 4 }}>
              Đã chọn: {selectedUnassigned.length} / {unassignedStudents.length}
            </div>
          </PanelHeader>
          <ListContainer>
            {loading ? (
              <EmptyState>Đang tải...</EmptyState>
            ) : unassignedStudents.length === 0 ? (
              <EmptyState>Không có học sinh nào cần xếp lớp.</EmptyState>
            ) : (
              unassignedStudents.map(student => (
                <StudentItem 
                  key={student.studentId}
                  $selected={selectedUnassigned.includes(student.studentId)}
                  onClick={() => toggleStudentSelection(student.studentId)}
                >
                  <input 
                    type="checkbox" 
                    checked={selectedUnassigned.includes(student.studentId)} 
                    readOnly 
                    style={{ cursor: 'pointer', width: 16, height: 16 }}
                  />
                  <Avatar src={student.avatarUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(student.fullName)} />
                  <div>
                    <div style={{ fontWeight: 500, color: '#111827' }}>{student.fullName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>ID: {student.studentId}</div>
                  </div>
                </StudentItem>
              ))
            )}
          </ListContainer>
        </Panel>

        {/* Action Center */}
        <ActionCenter>
          <MoveButton 
            disabled={!selectedClassId || selectedUnassigned.length === 0 || loading}
            onClick={handleAssignToClass}
            title="Chuyển vào lớp"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </MoveButton>
        </ActionCenter>

        {/* Right Panel: Class Selection & Students */}
        <Panel>
          <PanelHeader>
            <div style={{ fontWeight: 600, color: '#111827', marginBottom: 8 }}>Chọn lớp học đích</div>
            <Select value={selectedClassId} onChange={handleClassChange}>
              <option value="">-- Chọn một lớp học --</option>
              {grades.map(grade => (
                <optgroup key={grade.gradeId} label={grade.gradeName}>
                  {grade.classes.map(cls => (
                    <option key={cls.classId} value={cls.classId}>
                      {cls.className}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Select>
            {classDetail && (
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: 8 }}>
                Sĩ số hiện tại: {classDetail.totalStudents}
              </div>
            )}
          </PanelHeader>
          <ListContainer>
            {!selectedClassId ? (
              <EmptyState>Vui lòng chọn một lớp học</EmptyState>
            ) : loadingClass ? (
              <EmptyState>Đang tải danh sách học sinh...</EmptyState>
            ) : classDetail?.students?.length === 0 ? (
              <EmptyState>Lớp học này chưa có học sinh nào.</EmptyState>
            ) : (
              classDetail?.students?.map(student => (
                <StudentItem key={student.studentId} style={{ cursor: 'default' }}>
                  <Avatar src={student.avatarUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(student.fullName)} />
                  <div>
                    <div style={{ fontWeight: 500, color: '#111827' }}>{student.fullName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>ID: {student.studentId}</div>
                  </div>
                </StudentItem>
              ))
            )}
          </ListContainer>
        </Panel>
      </SplitView>
    </Container>
  );
}
