import React from 'react';
import * as S from './styles';
import { useDetailedStudents } from '@/hooks/useTeacherQueries';
import { useAuth } from '@/contexts/AuthContext';
import { Phone, Mail } from 'lucide-react';

export const StudentsListView: React.FC = () => {
  const { user } = useAuth();
  // Using user.classIds[0] assuming a teacher has at least 1 class
  const classId = user?.classIds?.[0];
  
  const { data: students, isLoading } = useDetailedStudents(classId);

  const calculateAge = (dobSeconds?: bigint | null) => {
    if (!dobSeconds) return 'N/A';
    const dob = new Date(Number(dobSeconds) * 1000);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff); 
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  if (isLoading) {
    return <S.Container><S.EmptyState>Đang tải danh sách học sinh...</S.EmptyState></S.Container>;
  }

  if (!students || students.length === 0) {
    return <S.Container><S.EmptyState>Lớp chưa có học sinh nào.</S.EmptyState></S.Container>;
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Sĩ số lớp: {students.length} bé</S.Title>
      </S.Header>

      <S.Grid>
        {students.map(student => (
          <S.Card key={student.studentId}>
            <S.StudentInfo>
              <S.AvatarWrapper>
                <S.StudentAvatar 
                  src={student.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.fullName)}&background=random`} 
                  alt={student.fullName}
                  fill
                  sizes="64px"
                />
              </S.AvatarWrapper>
              <S.InfoCol>
                <S.StudentName>{student.fullName}</S.StudentName>
                <S.StudentDetails>
                  {calculateAge(student.dateOfBirth)} tuổi • {student.gender === 'Male' ? 'Nam' : 'Nữ'}
                </S.StudentDetails>
              </S.InfoCol>
            </S.StudentInfo>

            {student.allergies && (
              <div style={{ fontSize: '13px', color: '#DC2626', background: '#FEE2E2', padding: '6px 12px', borderRadius: '8px' }}>
                <strong>Dị ứng:</strong> {student.allergies}
              </div>
            )}

            <S.MetricsRow>
              <S.MetricBox>
                <S.MetricLabel>Chiều cao</S.MetricLabel>
                <S.MetricValue>{student.healthRecord?.height || '--'} cm</S.MetricValue>
              </S.MetricBox>
              <S.MetricBox>
                <S.MetricLabel>Cân nặng</S.MetricLabel>
                <S.MetricValue>{student.healthRecord?.weight || '--'} kg</S.MetricValue>
              </S.MetricBox>
              <S.MetricBox>
                <S.MetricLabel>BMI</S.MetricLabel>
                <S.MetricValue>{student.healthRecord?.bmi || '--'}</S.MetricValue>
              </S.MetricBox>
            </S.MetricsRow>

            <S.Divider />

            <S.ContactSection>
              {student.parents && student.parents.length > 0 ? (
                student.parents.map(parent => (
                  <S.ParentItem key={parent.parentId}>
                    <S.ParentInfo>
                      <S.ParentName>{parent.fullName}</S.ParentName>
                      <S.ParentRel>{parent.relationship}</S.ParentRel>
                    </S.ParentInfo>
                    <S.ActionButtons>
                      <S.IconButton href={`tel:${parent.phone}`} title="Gọi điện">
                        <Phone size={16} />
                      </S.IconButton>
                      <S.IconButton href={`mailto:${parent.email}`} title="Gửi mail">
                        <Mail size={16} />
                      </S.IconButton>
                    </S.ActionButtons>
                  </S.ParentItem>
                ))
              ) : (
                <div style={{ fontSize: '13px', color: '#6B7280', textAlign: 'center' }}>Chưa có thông tin phụ huynh</div>
              )}
            </S.ContactSection>

          </S.Card>
        ))}
      </S.Grid>
    </S.Container>
  );
};
