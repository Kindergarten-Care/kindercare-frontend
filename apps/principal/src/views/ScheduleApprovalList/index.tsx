'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from '@kindercare/ui';
import { useScheduleApprovalList, ApprovalStatusFilter } from './hooks/useScheduleApprovalList';
import {
  Container, PageHeader, Title, PageSubtitle, ErrorBanner,
  FilterBar, FGroup, FLabel, SearchBox, SearchInput, SearchIcon,
  SegTabs, SegTab, SegCount, ResultCount,
  SchedGrid, SCard, SCardTop, SCardAv, SCardCls, SCardGrade, SCardMonth, SCardMM, SCardYY,
  SCardTheme, SCardFoot, SCardUpdated, SCardGo, ABadge, ADot,
  LoadingText, EmptyState, EmptyIcon, EmptyTitle, EmptyDesc,
} from './styles';

const AVATAR_PALETTE = [
  'linear-gradient(140deg,#fcd34d,#f59e0b)',
  'linear-gradient(140deg,#6ee7b7,#10b981)',
  'linear-gradient(140deg,#60a5fa,#2563eb)',
  'linear-gradient(140deg,#fda4af,#f43f5e)',
  'linear-gradient(140deg,#c4b5fd,#8b5cf6)',
  'linear-gradient(140deg,#0a7a4c,#005a36)',
];

function avatarGradient(seed: number) {
  return AVATAR_PALETTE[seed % AVATAR_PALETTE.length];
}

function formatDateTime(ts: number) {
  const d = new Date(ts * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())} · ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export default function ScheduleApprovalListView() {
  const router = useRouter();
  const {
    grades, loading, error,
    year, month, classId, statusFilter, search,
    pendingCount, filteredSchedules,
    setYear, setMonth, setClassId, setStatusFilter, setSearch,
  } = useScheduleApprovalList();

  const yearOptions = useMemo(() => {
    const current = new Date().getFullYear();
    return [current, current - 1, current + 1].map(y => ({ value: String(y), label: `Năm ${y}` }));
  }, []);

  const monthOptions = useMemo(
    () => [
      { value: '', label: 'Tất cả tháng' },
      ...Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: `Tháng ${i + 1}` })),
    ],
    []
  );

  const classOptions = useMemo(
    () => [
      { value: '', label: 'Tất cả lớp' },
      ...grades.flatMap(g => g.classes.map(c => ({ value: String(c.classId), label: c.className, group: g.gradeName }))),
    ],
    [grades]
  );

  return (
    <Container>
      <PageHeader>
        <Title>Yêu cầu duyệt thời khóa biểu</Title>
        <PageSubtitle>Xét duyệt thời khóa biểu tháng do giáo viên gửi lên</PageSubtitle>
      </PageHeader>

      {error && <ErrorBanner>{error}</ErrorBanner>}

      <FilterBar>
        <FGroup>
          <FLabel>Năm học</FLabel>
          <Dropdown value={year} onChange={setYear} options={yearOptions} ariaLabel="Năm học" />
        </FGroup>
        <FGroup>
          <FLabel>Tháng</FLabel>
          <Dropdown value={month} onChange={setMonth} options={monthOptions} ariaLabel="Tháng" />
        </FGroup>
        <FGroup>
          <FLabel>Lớp</FLabel>
          <Dropdown value={classId} onChange={setClassId} options={classOptions} ariaLabel="Lớp" />
        </FGroup>
        <FGroup>
          <FLabel>Tìm kiếm</FLabel>
          <SearchBox>
            <SearchIcon>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            </SearchIcon>
            <SearchInput placeholder="Tìm lớp, chủ đề…" value={search} onChange={e => setSearch(e.target.value)} />
          </SearchBox>
        </FGroup>
        <FGroup>
          <FLabel>Trạng thái</FLabel>
          <SegTabs>
            {(['all', 0, 1] as ApprovalStatusFilter[]).map(s => (
              <SegTab key={String(s)} $active={statusFilter === s} onClick={() => setStatusFilter(s)}>
                {s === 'all' ? 'Tất cả' : s === 0 ? 'Chờ duyệt' : 'Đã duyệt'}
                {s === 0 && <SegCount $active={statusFilter === 0}>{pendingCount}</SegCount>}
              </SegTab>
            ))}
          </SegTabs>
        </FGroup>
        <ResultCount>{filteredSchedules.length} thời khóa biểu</ResultCount>
      </FilterBar>

      {loading ? (
        <LoadingText>Đang tải dữ liệu...</LoadingText>
      ) : (
        <SchedGrid>
          {filteredSchedules.length === 0 ? (
            <EmptyState>
              <EmptyIcon>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>
              </EmptyIcon>
              <EmptyTitle>Không có thời khóa biểu nào</EmptyTitle>
              <EmptyDesc>Thử đổi bộ lọc năm, tháng, lớp hoặc trạng thái phía trên.</EmptyDesc>
            </EmptyState>
          ) : (
            filteredSchedules.map((s, i) => (
              <SCard key={s.id} onClick={() => router.push(`/schedule-approvals/${s.id}`)}>
                <SCardTop>
                  <SCardAv $bg={avatarGradient(i)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                  </SCardAv>
                  <div style={{ minWidth: 0 }}>
                    <SCardCls>{s.className}</SCardCls>
                    <SCardGrade>{s.gradeName}</SCardGrade>
                  </div>
                  <SCardMonth>
                    <SCardMM>Tháng {s.month}</SCardMM>
                    <SCardYY>{s.year}</SCardYY>
                  </SCardMonth>
                </SCardTop>
                <SCardTheme>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 2 9 5M12 2l3 3" /><circle cx="12" cy="14" r="7" /><path d="M12 11v3l2 1.5" /></svg>
                  {s.monthTheme}
                </SCardTheme>
                <SCardFoot>
                  {s.approvedStatus === 0 ? (
                    <ABadge $variant="pending"><ADot />Chờ duyệt</ABadge>
                  ) : (
                    <ABadge $variant="approved"><ADot />Đã duyệt</ABadge>
                  )}
                  {!!s.isActive && <ABadge $variant="active" title="Tháng đang được sử dụng"><ADot />Đang áp dụng</ABadge>}
                  <SCardGo>
                    Xem chi tiết
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
                  </SCardGo>
                </SCardFoot>
                <SCardUpdated>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                  Cập nhật {formatDateTime(s.updatedAt)}
                </SCardUpdated>
              </SCard>
            ))
          )}
        </SchedGrid>
      )}
    </Container>
  );
}
