'use client';

import React, { useEffect, useState } from 'react';
import { classService } from '@/services/Class/ClassService';
import { ClassDetailDomainModel } from '@/config/types/class';
import { useRouter } from '@/i18n/routing';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Container,
  Header,
  Title,
  Subtitle,
  ContentGrid,
  Section,
  SectionTitle,
  InfoGrid,
  InfoCard,
  AvatarPlaceholder,
  InfoDetails,
  InfoName,
  InfoSubtext,
  TabContainer,
  TabRow,
  TabButton,
  LoadingText,
  ErrorText,
  ChartContainer,
  Table,
  Th,
  Td
} from './styles';

interface ClassDetailProps {
  classId: string;
}

export default function ClassDetailView({ classId }: ClassDetailProps) {
  const [classDetail, setClassDetail] = useState<ClassDetailDomainModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('students');
  const router = useRouter();

  useEffect(() => {
    fetchClassDetail();
  }, [classId]);

  const fetchClassDetail = async () => {
    try {
      setLoading(true);
      const data = await classService.getClassDetail(classId);
      setClassDetail(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải chi tiết lớp học');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Container><LoadingText>Đang tải dữ liệu...</LoadingText></Container>;
  if (error) return <Container><ErrorText>{error}</ErrorText></Container>;
  if (!classDetail) return null;

  const attendanceData = [
    { name: 'Có mặt', value: classDetail.attendanceToday.present, color: '#10b981' }, // Green
    { name: 'Vắng phép', value: classDetail.attendanceToday.excused, color: '#f59e0b' }, // Yellow
    { name: 'Vắng không phép', value: classDetail.attendanceToday.absent, color: '#ef4444' }, // Red
  ];

  return (
    <Container>
      <Header>
        <Title>{classDetail.className}</Title>
        <Subtitle>Khối: {classDetail.gradeName} • Sĩ số: {classDetail.totalStudents} học sinh</Subtitle>
      </Header>

      <ContentGrid>
        <Section>
          <SectionTitle>Giáo viên phụ trách</SectionTitle>
          <InfoGrid>
            {classDetail.teachers.length > 0 ? (
              classDetail.teachers.map((teacher) => (
                <InfoCard key={teacher.id}>
                  <AvatarPlaceholder>
                    {teacher.avatarUrl ? (
                      <img src={teacher.avatarUrl} alt={teacher.fullName} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      teacher.fullName.charAt(0)
                    )}
                  </AvatarPlaceholder>
                  <InfoDetails>
                    <InfoName>{teacher.fullName}</InfoName>
                    <InfoSubtext>{teacher.roleInClass}</InfoSubtext>
                    {teacher.phoneNumber && <InfoSubtext>📞 {teacher.phoneNumber}</InfoSubtext>}
                    {teacher.email && <InfoSubtext>✉️ {teacher.email}</InfoSubtext>}
                  </InfoDetails>
                </InfoCard>
              ))
            ) : (
              <InfoSubtext>Chưa có giáo viên được phân công.</InfoSubtext>
            )}
          </InfoGrid>
        </Section>

        <Section>
          <SectionTitle>Điểm danh hôm nay</SectionTitle>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} học sinh`, 'Số lượng']} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Section>
      </ContentGrid>

      <TabContainer>
        <TabRow>
          <TabButton $active={activeTab === 'students'} onClick={() => setActiveTab('students')}>
            Danh sách học sinh
          </TabButton>
          {/* Thêm các tab khác ở đây sau này nếu cần */}
        </TabRow>

        {activeTab === 'students' && (
          <Section>
            <div style={{ overflowX: 'auto' }}>
              <Table>
                <thead>
                  <tr>
                    <Th style={{ width: '60px', textAlign: 'center' }}>STT</Th>
                    <Th style={{ width: '80px' }}>Avatar</Th>
                    <Th>Họ và Tên</Th>
                    <Th>Mã học sinh</Th>
                    <Th>Ngày sinh</Th>
                    <Th>Ngày nhập học</Th>
                  </tr>
                </thead>
                <tbody>
                  {classDetail.students.length > 0 ? (
                    classDetail.students.map((student, index) => (
                      <tr key={student.studentId}>
                        <Td style={{ textAlign: 'center' }}>{index + 1}</Td>
                        <Td>
                          <AvatarPlaceholder style={{ width: '40px', height: '40px', fontSize: '1rem' }}>
                            {student.avatarUrl ? (
                              <img src={student.avatarUrl} alt={student.fullName} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                              student.fullName.charAt(0)
                            )}
                          </AvatarPlaceholder>
                        </Td>
                        <Td style={{ fontWeight: 500, color: '#0f172a' }}>{student.fullName}</Td>
                        <Td>{student.studentId}</Td>
                        <Td>{student.dateOfBirth ? new Date(Number(student.dateOfBirth) * 1000).toLocaleDateString('vi-VN') : '—'}</Td>
                        <Td>{student.admissionDate ? new Date(Number(student.admissionDate) * 1000).toLocaleDateString('vi-VN') : '—'}</Td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <Td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
                        Lớp học này chưa có học sinh nào.
                      </Td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Section>
        )}
      </TabContainer>
    </Container>
  );
}
