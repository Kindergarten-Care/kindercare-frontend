'use client';

import React, { useEffect, useState } from 'react';
import { Container, Title, Layout, LeftPanel, RightPanel, ClassItem, HeaderRow, Table, Th, Td, ActionButton, TeacherRow, Avatar } from './styles';
import { gradeService } from '@/services/grade/GradeService';
import { classService } from '@/services/Class/ClassService';
import { GradeDomainModel, ClassDomainModel } from '@/config/types/grade';
import { ClassDetailDomainModel } from '@/config/types/class';
import AssignTeacherModal from './components/AssignTeacherModal';

export default function HomeroomTeacherAssignmentView() {
  const [grades, setGrades] = useState<GradeDomainModel[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassDomainModel | null>(null);
  const [classDetail, setClassDetail] = useState<ClassDetailDomainModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const data = await gradeService.getGradesAndClasses();
      setGrades(data);
      if (data.length > 0 && data[0].classes.length > 0) {
        handleSelectClass(data[0].classes[0]);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleSelectClass = async (cls: ClassDomainModel) => {
    setSelectedClass(cls);
    fetchClassDetail(cls.classId);
  };

  const fetchClassDetail = async (classId: number) => {
    try {
      setLoading(true);
      const detail = await classService.getClassDetail(classId);
      setClassDetail(detail);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignSuccess = () => {
    if (selectedClass) {
      fetchClassDetail(selectedClass.classId);
    }
  };

  return (
    <Container>
      <Title>Bổ nhiệm Giáo viên</Title>
      
      <Layout>
        <LeftPanel>
          <div style={{ fontWeight: 600, marginBottom: 16, color: '#374151' }}>Danh sách Lớp học</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {grades.map(grade => (
              <div key={grade.gradeId} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{grade.gradeName}</div>
                {grade.classes.map(cls => (
                  <ClassItem 
                    key={cls.classId} 
                    $active={selectedClass?.classId === cls.classId}
                    onClick={() => handleSelectClass(cls)}
                  >
                    {cls.className}
                  </ClassItem>
                ))}
              </div>
            ))}
          </div>
        </LeftPanel>

        <RightPanel>
          {loading ? (
            <div>Đang tải dữ liệu lớp học...</div>
          ) : !classDetail ? (
            <div>Vui lòng chọn một lớp học để xem chi tiết.</div>
          ) : (
            <>
              <HeaderRow>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', margin: 0 }}>Lớp {classDetail.className}</h3>
                  <p style={{ margin: 0, marginTop: 4, color: '#6b7280', fontSize: '0.875rem' }}>Thuộc: {classDetail.gradeName} • Sĩ số: {classDetail.totalStudents}</p>
                </div>
                <ActionButton onClick={() => setIsModalOpen(true)}>+ Bổ nhiệm Giáo viên</ActionButton>
              </HeaderRow>

              {classDetail.teachers && classDetail.teachers.length > 0 ? (
                <Table>
                  <thead>
                    <tr>
                      <Th>Giáo viên</Th>
                      <Th>Vai trò</Th>
                      <Th>Số điện thoại</Th>
                      <Th>Email</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {classDetail.teachers.map(teacher => (
                      <tr key={teacher.id}>
                        <Td>
                          <TeacherRow>
                            <Avatar src={teacher.avatarUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(teacher.fullName)} alt={teacher.fullName} />
                            <div style={{ fontWeight: 500 }}>{teacher.fullName}</div>
                          </TeacherRow>
                        </Td>
                        <Td>
                          <span style={{ 
                            padding: '4px 8px', 
                            borderRadius: '999px', 
                            fontSize: '0.75rem', 
                            fontWeight: 500,
                            backgroundColor: teacher.roleInClass === 'Giáo viên chủ nhiệm' || teacher.roleInClass === 'MainTeacher' ? '#dbeafe' : '#f3f4f6',
                            color: teacher.roleInClass === 'Giáo viên chủ nhiệm' || teacher.roleInClass === 'MainTeacher' ? '#1d4ed8' : '#374151'
                          }}>
                            {teacher.roleInClass}
                          </span>
                        </Td>
                        <Td>{teacher.phoneNumber || '-'}</Td>
                        <Td>{teacher.email || '-'}</Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div style={{ padding: '32px 0', textAlign: 'center', color: '#6b7280' }}>
                  Lớp học này chưa có giáo viên nào được phân công.
                </div>
              )}
            </>
          )}
        </RightPanel>
      </Layout>

      {isModalOpen && selectedClass && (
        <AssignTeacherModal 
          classId={selectedClass.classId} 
          className={selectedClass.className}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleAssignSuccess}
        />
      )}
    </Container>
  );
}
