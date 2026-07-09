'use client';

import React, { useEffect, useState } from 'react';
import { classService } from '@/services/Class/ClassService';
import { ClassDetailDomainModel } from '@/config/types/class';
import { useRouter } from '@/i18n/routing';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Dropdown } from '@kindercare/ui';
import {
  Container,
  Header,
  Title,
  Subtitle,
  MainGrid,
  LeftColumn,
  RightColumn,
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
  Td,
  TotalStudentsCard,
  TotalStudentsLabel,
  TotalStudentsValue,
  PaginationContainer,
  PaginationButton,
  PageInfo,
  ToolbarContainer,
  SearchInput
} from './styles';

interface ClassDetailProps {
  classId: string;
}

const getFirstName = (fullName: string) => {
  if (!fullName) return '';
  const parts = fullName.trim().split(' ');
  return parts.length > 0 ? parts[parts.length - 1] : '';
};

const getLastName = (fullName: string) => {
  if (!fullName) return '';
  const parts = fullName.trim().split(' ');
  if (parts.length <= 1) return '';
  parts.pop();
  return parts.join(' ');
};

export default function ClassDetailView({ classId }: ClassDetailProps) {
  const [classDetail, setClassDetail] = useState<ClassDetailDomainModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('students');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name_asc');
  const pageSize = 5;
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  const filteredAndSortedStudents = React.useMemo(() => {
    if (!classDetail) return [];
    let result = [...classDetail.students];
    
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(student => 
        student.fullName.toLowerCase().includes(lowerSearch) || 
        String(student.studentId).toLowerCase().includes(lowerSearch)
      );
    }

    result.sort((a, b) => {
      const nameA = getFirstName(a.fullName);
      const nameB = getFirstName(b.fullName);

      if (sortBy === 'name_asc') {
        const cmp = nameA.localeCompare(nameB);
        return cmp !== 0 ? cmp : a.fullName.localeCompare(b.fullName);
      }
      if (sortBy === 'name_desc') {
        const cmp = nameB.localeCompare(nameA);
        return cmp !== 0 ? cmp : b.fullName.localeCompare(a.fullName);
      }
      return 0;
    });

    return result;
  }, [classDetail, searchTerm, sortBy]);

  const totalStudentsCount = filteredAndSortedStudents.length;
  const totalPages = Math.ceil(totalStudentsCount / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentStudents = filteredAndSortedStudents.slice(startIndex, startIndex + pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <Container><LoadingText>Đang tải dữ liệu...</LoadingText></Container>;
  if (error) return <Container><ErrorText>{error}</ErrorText></Container>;
  if (!classDetail) return null;

  const attendanceData = [
    { name: `Có mặt: ${classDetail.attendanceToday.present}`, value: classDetail.attendanceToday.present, color: '#10b981' }, // Green
    { name: `Vắng phép: ${classDetail.attendanceToday.excused}`, value: classDetail.attendanceToday.excused, color: '#f59e0b' }, // Yellow
    { name: `Vắng không phép: ${classDetail.attendanceToday.absent}`, value: classDetail.attendanceToday.absent, color: '#ef4444' }, // Red
  ];

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const academicYear = currentMonth >= 7 ? `${currentYear}-${currentYear + 1}` : `${currentYear - 1}-${currentYear}`;

  return (
    <Container>
      <Header>
        <div>
          <Title>{classDetail.className} (Năm học {academicYear})</Title>
          <Subtitle>Khối: {classDetail.gradeName}</Subtitle>
        </div>
        <TotalStudentsCard>
          <TotalStudentsLabel>Sĩ số</TotalStudentsLabel>
          <TotalStudentsValue>{classDetail.totalStudents}</TotalStudentsValue>
        </TotalStudentsCard>
      </Header>

      <MainGrid>
        <LeftColumn>
          <Section>
            <SectionTitle>Giáo viên phụ trách</SectionTitle>
            <InfoGrid>
              {classDetail.teachers.length > 0 ? (
                classDetail.teachers.map((teacher) => (
                  <InfoCard 
                    key={teacher.id} 
                    style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                    onClick={() => router.push(`/accounts/teacher/${teacher.id}?from=class`)}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <AvatarPlaceholder>
                      {teacher.avatarUrl ? (
                        <img src={teacher.avatarUrl} alt={teacher.fullName} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        teacher.fullName.charAt(0)
                      )}
                    </AvatarPlaceholder>
                    <InfoDetails>
                      <InfoName style={{ color: '#0ea5e9' }}>{teacher.fullName}</InfoName>
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
            <SectionTitle>Điểm danh hôm nay ({new Date().toLocaleDateString('vi-VN')})</SectionTitle>
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
        </LeftColumn>

        <RightColumn>
          <TabContainer style={{ marginTop: 0 }}>
            <TabRow>
              <TabButton $active={activeTab === 'students'} onClick={() => setActiveTab('students')}>
                Danh sách học sinh
              </TabButton>
              {/* Thêm các tab khác ở đây sau này nếu cần */}
            </TabRow>

            {activeTab === 'students' && (
              <Section style={{ padding: 0 }}>
                <ToolbarContainer>
                  <SearchInput 
                    placeholder="Tìm kiếm theo tên hoặc mã học sinh..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div style={{ width: '200px' }}>
                    <Dropdown 
                      value={sortBy} 
                      onChange={(val) => setSortBy(val as string)}
                      options={[
                        { value: 'name_asc', label: 'Tên (A-Z)' },
                        { value: 'name_desc', label: 'Tên (Z-A)' }
                      ]}
                    />
                  </div>
                </ToolbarContainer>
                <div style={{ overflowX: 'auto', padding: '0 24px 24px 24px' }}>
                  <Table>
                    <thead>
                      <tr>
                        <Th style={{ width: '60px', textAlign: 'center' }}>STT</Th>
                        <Th style={{ width: '80px' }}></Th>
                        <Th>Họ và tên đệm</Th>
                        <Th>Tên</Th>
                        <Th>Mã học sinh</Th>
                        <Th>Ngày sinh</Th>
                        <Th>Ngày nhập học</Th>
                        <Th style={{ textAlign: 'center' }}>Thao tác</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStudents.length > 0 ? (
                        currentStudents.map((student, index) => (
                          <tr key={student.studentId}>
                            <Td style={{ textAlign: 'center' }}>{startIndex + index + 1}</Td>
                            <Td>
                              <AvatarPlaceholder style={{ width: '40px', height: '40px', fontSize: '1rem' }}>
                                {student.avatarUrl ? (
                                  <img src={student.avatarUrl} alt={student.fullName} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                ) : (
                                  student.fullName.charAt(0)
                                )}
                              </AvatarPlaceholder>
                            </Td>
                            <Td style={{ fontWeight: 500, color: '#0f172a' }}>{getLastName(student.fullName)}</Td>
                            <Td style={{ fontWeight: 500, color: '#0f172a' }}>{getFirstName(student.fullName)}</Td>
                            <Td>{student.studentId}</Td>
                            <Td>{student.dateOfBirth ? new Date(Number(student.dateOfBirth) * 1000).toLocaleDateString('vi-VN') : '—'}</Td>
                            <Td>{student.admissionDate ? new Date(Number(student.admissionDate) * 1000).toLocaleDateString('vi-VN') : '—'}</Td>
                            <Td style={{ textAlign: 'center' }}>
                              <button 
                                onClick={() => router.push(`/students/${student.studentId}`)}
                                style={{
                                  padding: '6px 12px',
                                  backgroundColor: '#f1f5f9',
                                  color: '#334155',
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '14px',
                                  fontWeight: 500,
                                  transition: 'background-color 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                              >
                                Xem hồ sơ
                              </button>
                            </Td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <Td colSpan={8} style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
                            Lớp học này chưa có học sinh nào.
                          </Td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
                {totalPages > 1 && (
                  <PaginationContainer>
                    <PaginationButton 
                      onClick={handlePrevPage} 
                      disabled={currentPage === 1}
                      $disabled={currentPage === 1}
                    >
                      &lt;
                    </PaginationButton>
                    <PageInfo>Trang {currentPage} / {totalPages}</PageInfo>
                    <PaginationButton 
                      onClick={handleNextPage} 
                      disabled={currentPage === totalPages}
                      $disabled={currentPage === totalPages}
                    >
                      &gt;
                    </PaginationButton>
                  </PaginationContainer>
                )}
              </Section>
            )}
          </TabContainer>
        </RightColumn>
      </MainGrid>
    </Container>
  );
}
