'use client';

import React, { useEffect, useState } from 'react';
import { classService } from '@/services/Class/ClassService';
import { ClassDetailDomainModel } from '@/config/types/class';
import { useRouter } from '@/i18n/routing';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { getInitials } from '@/views/AccountList/utils/getInitials';
import { Dropdown } from '@kindercare/ui';
import {
  Container,
  Hero, HeroBg, HeroBadge, HeroMain, HeroName, HeroYear, HeroMeta, Pill, HeroStat, HeroStatValue, HeroStatLabel,
  Layout, Stack, CardPad, CardHead, CardTitle, TitleIcon, CountChip,
  TeacherRow, TeacherAvatar, TeacherAvatarImg, TeacherName, TeacherRole, TeacherContact, ContactLine, EmptyText,
  DateText, DonutWrap, DonutChartWrap, DonutCenter, DonutPct, DonutSub, Legend, LegendRow, LegendSwatch, LegendValue,
  Toolbar, SearchWrapper, SearchIcon, SearchInput, SortDropdownWrap,
  TableScrollArea, Table, Th, Tr, Td, RowNum, StuCell, StuAvatar, StuAvatarImg, StuName, CodeText, DobText, ViewBtn,
  TableFoot, Pager, PageBtn,
  LoadingText, ErrorText,
} from './styles';

interface ClassDetailProps {
  classId: string;
}

const AVATAR_PALETTE = [
  ['#F97316', '#fdba74'],
  ['#2563EB', '#60a5fa'],
  ['#10b981', '#6ee7b7'],
  ['#DB2777', '#f9a8d4'],
  ['#8B5CF6', '#c4b5fd'],
  ['#0EA5E9', '#7dd3fc'],
  ['#F59E0B', '#fcd34d'],
  ['#14B8A6', '#5eead4'],
  ['#6366F1', '#a5b4fc'],
];

const avatarGradient = (seed: number) => {
  const [from, to] = AVATAR_PALETTE[seed % AVATAR_PALETTE.length];
  return `linear-gradient(140deg, ${from}, ${to})`;
};

type GradeKey = 'mam' | 'choi' | 'la' | 'default';

const GRADE_STYLES: Record<GradeKey, { gradient: string; shadow: string }> = {
  mam: { gradient: 'linear-gradient(140deg, #fbbf24, #fde68a)', shadow: 'rgba(217, 119, 6, 0.55)' },
  choi: { gradient: 'linear-gradient(140deg, #4ade80, #86efac)', shadow: 'rgba(34, 197, 94, 0.55)' },
  la: { gradient: 'linear-gradient(140deg, #60a5fa, #2563eb)', shadow: 'rgba(37, 99, 235, 0.55)' },
  default: { gradient: 'linear-gradient(140deg, #60a5fa, #2563eb)', shadow: 'rgba(37, 99, 235, 0.55)' },
};

const getGradeKey = (gradeName?: string): GradeKey => {
  const name = (gradeName || '').toLowerCase();
  if (name.includes('mầm') || name.includes('mam')) return 'mam';
  if (name.includes('chồi') || name.includes('choi')) return 'choi';
  if (name.includes('lá') || name.includes('la')) return 'la';
  return 'default';
};

function GradeIcon({ gradeKey, size = 34 }: { gradeKey: GradeKey; size?: number }) {
  switch (gradeKey) {
    case 'mam':
      // Mầm: hạt đang nảy mầm
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21v-8" />
          <path d="M12 13c0-4 3-6 7-6 0 4-3 6-7 6z" />
          <path d="M12 13c0-3-2.5-5-5.5-5 0 3 2.5 5 5.5 5z" />
        </svg>
      );
    case 'choi':
      // Chồi: chồi non hai lá
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21V10" />
          <path d="M12 12c0-3.5 2.5-6 6.5-6 0 3.5-2.5 6-6.5 6z" />
          <path d="M12 12c0-3.5-2.5-6-6.5-6 0 3.5 2.5 6 6.5 6z" />
        </svg>
      );
    case 'la':
      // Lá: cây lá đầy đủ
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21V9" />
          <path d="M12 9c0-4.5 3.5-7 8-7 0 4.5-3.5 7-8 7z" />
          <path d="M12 13c0-4.5-3.5-7-8-7 0 4.5 3.5 7 8 7z" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 15c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 3 1M3 9c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 3 1" />
        </svg>
      );
  }
}

function AvatarContent({
  avatarUrl,
  fullName,
  ImgComponent,
}: {
  avatarUrl?: string | null;
  fullName: string;
  ImgComponent: typeof TeacherAvatarImg | typeof StuAvatarImg;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const Img = ImgComponent;
  return avatarUrl && !imgFailed ? (
    <Img src={avatarUrl} alt={fullName} onError={() => setImgFailed(true)} />
  ) : (
    <>{getInitials(fullName)}</>
  );
}

const getFirstName = (fullName: string) => {
  if (!fullName) return '';
  const parts = fullName.trim().split(' ');
  return parts.length > 0 ? parts[parts.length - 1] : '';
};

const formatDate = (ts: bigint | null) => {
  if (!ts) return '—';
  return new Date(Number(ts) * 1000).toLocaleDateString('vi-VN');
};

const buildPageList = (currentPage: number, totalPages: number): (number | '…')[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages = new Set<number>([1, 2, totalPages - 1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const sorted = Array.from(pages).filter(p => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  const result: (number | '…')[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push('…');
    result.push(p);
  });
  return result;
};

export default function ClassDetailView({ classId }: ClassDetailProps) {
  const [classDetail, setClassDetail] = useState<ClassDetailDomainModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name_asc' | 'name_desc'>('name_asc');
  const pageSize = 6;
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
      const cmp = sortBy === 'name_asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      return cmp !== 0 ? cmp : a.fullName.localeCompare(b.fullName);
    });

    return result;
  }, [classDetail, searchTerm, sortBy]);

  const totalStudentsCount = filteredAndSortedStudents.length;
  const totalPages = Math.ceil(totalStudentsCount / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentStudents = filteredAndSortedStudents.slice(startIndex, startIndex + pageSize);
  const pageList = buildPageList(currentPage, totalPages);

  if (loading) return <Container><LoadingText>Đang tải dữ liệu...</LoadingText></Container>;
  if (error) return <Container><ErrorText>{error}</ErrorText></Container>;
  if (!classDetail) return null;

  const { present, absent, excused } = classDetail.attendanceToday;
  const notMarked = Math.max(classDetail.totalStudents - present - absent - excused, 0);
  const attendanceRate = classDetail.totalStudents > 0 ? Math.round((present / classDetail.totalStudents) * 100) : 0;

  const attendanceData = [
    { name: 'Có mặt', value: present, color: '#237a3c' },
    { name: 'Vắng không phép', value: absent, color: '#dc2626' },
    { name: 'Vắng có phép', value: excused, color: '#d97706' },
    { name: 'Chưa điểm danh', value: notMarked, color: '#eef4f0' },
  ];

  const gradeKey = getGradeKey(classDetail.gradeName);
  const gradeStyle = GRADE_STYLES[gradeKey];

  return (
    <Container>
      <Hero>
        <HeroBg />
        <HeroBadge $gradient={gradeStyle.gradient} $shadow={gradeStyle.shadow}>
          <GradeIcon gradeKey={gradeKey} />
        </HeroBadge>
        <HeroMain>
          <HeroName>
            {classDetail.className}
            {classDetail.yearName && <HeroYear>{classDetail.yearName}</HeroYear>}
          </HeroName>
          <HeroMeta>
            <Pill $variant="grade">
              <GradeIcon gradeKey={gradeKey} size={14} />
              Khối {classDetail.gradeName}
            </Pill>
          </HeroMeta>
        </HeroMain>
        <HeroStat>
          <HeroStatValue>{classDetail.totalStudents}</HeroStatValue>
          <HeroStatLabel>Sĩ số</HeroStatLabel>
        </HeroStat>
        <HeroStat>
          <HeroStatValue>{classDetail.teachers.length}</HeroStatValue>
          <HeroStatLabel>Giáo viên</HeroStatLabel>
        </HeroStat>
      </Hero>

      <Layout>
        <Stack>
          <CardPad>
            <CardTitle>
              <TitleIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
              </TitleIcon>
              Giáo viên phụ trách
            </CardTitle>

            {classDetail.teachers.length > 0 ? (
              classDetail.teachers.map((teacher, index) => (
                <React.Fragment key={teacher.id}>
                  <TeacherRow onClick={() => router.push(`/accounts/teacher/${teacher.id}?from=class`)}>
                    <TeacherAvatar $bg={avatarGradient(index)}>
                      <AvatarContent
                        avatarUrl={teacher.avatarUrl}
                        fullName={teacher.fullName}
                        ImgComponent={TeacherAvatarImg}
                      />
                    </TeacherAvatar>
                    <div style={{ minWidth: 0 }}>
                      <TeacherName>{teacher.fullName}</TeacherName>
                      <TeacherRole>{teacher.roleInClass}</TeacherRole>
                    </div>
                  </TeacherRow>
                  {index === 0 && (teacher.phoneNumber || teacher.email) && (
                    <TeacherContact>
                      {teacher.phoneNumber && (
                        <ContactLine>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
                          {teacher.phoneNumber}
                        </ContactLine>
                      )}
                      {teacher.email && (
                        <ContactLine>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>
                          {teacher.email}
                        </ContactLine>
                      )}
                    </TeacherContact>
                  )}
                </React.Fragment>
              ))
            ) : (
              <EmptyText>Chưa có giáo viên được phân công.</EmptyText>
            )}
          </CardPad>

          <CardPad>
            <CardTitle>
              <TitleIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
              </TitleIcon>
              Điểm danh hôm nay
            </CardTitle>
            <DateText>{new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}</DateText>

            <DonutWrap>
              <DonutChartWrap>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={attendanceData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value} học sinh`, name]} />
                  </PieChart>
                </ResponsiveContainer>
                <DonutCenter>
                  <DonutPct>{attendanceRate}%</DonutPct>
                  <DonutSub>{present}/{classDetail.totalStudents} có mặt</DonutSub>
                </DonutCenter>
              </DonutChartWrap>

              <Legend>
                {attendanceData.map(item => (
                  <LegendRow key={item.name}>
                    <LegendSwatch $color={item.color} />
                    {item.name}
                    <LegendValue $color={item.color === '#eef4f0' ? '#9ca3af' : item.color}>{item.value}</LegendValue>
                  </LegendRow>
                ))}
              </Legend>
            </DonutWrap>
          </CardPad>
        </Stack>

        <CardPad>
          <CardHead>
            <CardTitle>
              <TitleIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
              </TitleIcon>
              Danh sách học sinh <CountChip>{classDetail.totalStudents}</CountChip>
            </CardTitle>
          </CardHead>

          <Toolbar>
            <SearchWrapper>
              <SearchIcon>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
              </SearchIcon>
              <SearchInput
                placeholder="Tìm theo tên hoặc mã học sinh…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchWrapper>
            <SortDropdownWrap>
              <Dropdown<'name_asc' | 'name_desc'>
                value={sortBy}
                onChange={(val) => setSortBy(val)}
                options={[
                  { value: 'name_asc', label: 'Tên (A → Z)' },
                  { value: 'name_desc', label: 'Tên (Z → A)' },
                ]}
                fullWidth
                ariaLabel="Sắp xếp theo tên"
              />
            </SortDropdownWrap>
          </Toolbar>

          <TableScrollArea $minRows={pageSize}>
            <Table>
              <thead>
                <tr>
                  <Th style={{ width: 44, textAlign: 'center' }}>#</Th>
                  <Th>Học sinh</Th>
                  <Th>Mã HS</Th>
                  <Th>Ngày sinh</Th>
                  <Th>Ngày nhập học</Th>
                  <Th style={{ textAlign: 'right' }}>Thao tác</Th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.length > 0 ? (
                  currentStudents.map((student, index) => (
                    <Tr key={student.studentId}>
                      <Td style={{ textAlign: 'center' }}>
                        <RowNum>{startIndex + index + 1}</RowNum>
                      </Td>
                      <Td>
                        <StuCell>
                          <StuAvatar $bg={avatarGradient(startIndex + index)}>
                            <AvatarContent
                              avatarUrl={student.avatarUrl}
                              fullName={student.fullName}
                              ImgComponent={StuAvatarImg}
                            />
                          </StuAvatar>
                          <StuName>{student.fullName}</StuName>
                        </StuCell>
                      </Td>
                      <Td><CodeText>HS-{String(student.studentId).padStart(4, '0')}</CodeText></Td>
                      <Td><DobText>{formatDate(student.dateOfBirth)}</DobText></Td>
                      <Td><DobText>{formatDate(student.admissionDate)}</DobText></Td>
                      <Td style={{ textAlign: 'right' }}>
                        <ViewBtn onClick={() => router.push(`/students/${student.studentId}?from=class`)}>
                          Xem hồ sơ
                        </ViewBtn>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <tr>
                    <Td colSpan={6}>
                      <EmptyText>Lớp học này chưa có học sinh nào.</EmptyText>
                    </Td>
                  </tr>
                )}
              </tbody>
            </Table>
          </TableScrollArea>

          {totalStudentsCount > 0 && (
            <TableFoot>
              <span>
                Hiển thị {startIndex + 1}–{Math.min(startIndex + pageSize, totalStudentsCount)} trong {totalStudentsCount} học sinh
              </span>
              <Pager>
                <PageBtn $disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>←</PageBtn>
                {pageList.map((p, i) =>
                  p === '…' ? (
                    <PageBtn key={`ellipsis-${i}`} $disabled>…</PageBtn>
                  ) : (
                    <PageBtn key={p} $active={p === currentPage} onClick={() => setCurrentPage(p)}>
                      {p}
                    </PageBtn>
                  )
                )}
                <PageBtn $disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>→</PageBtn>
              </Pager>
            </TableFoot>
          )}
        </CardPad>
      </Layout>
    </Container>
  );
}
