'use client';

import React, { useState } from 'react';
import { useAuth } from '@kindercare/core';
import { Dropdown } from '@kindercare/ui';
import { useStudentList } from './hooks/useStudentList';
import StudentTable from './components/StudentTable';
import CreateStudentWizard from './CreateStudentWizard';
import StudentImportModal from './StudentImportModal';
import {
  Container,
  PageHeader,
  Title,
  StatBadge,
  ActionGroup,
  PrimaryButton,
  SecondaryButton,
  FilterBar,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  StatsGrid,
  StatCard,
  StatIconWrap,
  StatInfo,
  StatValue,
  StatLabel,
} from './styles';

export default function StudentListView() {
  const { isLoading: authLoading } = useAuth();
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const {
    loading,
    searchTerm,
    classFilter,
    sortBy,
    classes,
    currentPage,
    totalPages,
    currentData,
    students,
    setSearchTerm,
    setClassFilter,
    setSortBy,
    setCurrentPage,
    handleViewProfile,
    fetchStudents,
  } = useStudentList();

  if (authLoading) return null;

  const total = students.length;
  const assigned = students.filter(s => s.className).length;
  const pending = total - assigned;
  const male = students.filter(s => s.gender === 'Nam').length;
  const female = students.filter(s => s.gender === 'Nữ').length;

  const startIndex = (currentPage - 1) * 10;

  return (
    <Container>
      <PageHeader>
        <Title>
          Danh sách học sinh
          <StatBadge>Tìm kiếm &amp; quản lý hồ sơ học sinh toàn trường</StatBadge>
        </Title>
        <ActionGroup>
          <SecondaryButton onClick={() => setShowImportModal(true)}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M8 11l4 4 4-4" /><path d="M4 21h16" /></svg>
            Import CSV
          </SecondaryButton>
          <PrimaryButton onClick={() => setShowCreateWizard(true)}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
            Thêm học sinh
          </PrimaryButton>
        </ActionGroup>
      </PageHeader>

      <StatsGrid>
        <StatCard>
          <StatIconWrap $variant="green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
          </StatIconWrap>
          <StatInfo>
            <StatValue>{total}</StatValue>
            <StatLabel>Tổng học sinh</StatLabel>
          </StatInfo>
        </StatCard>

        <StatCard>
          <StatIconWrap $variant="blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
            </svg>
          </StatIconWrap>
          <StatInfo>
            <StatValue>{assigned}</StatValue>
            <StatLabel>Lớp đang hoạt động</StatLabel>
          </StatInfo>
        </StatCard>

        <StatCard>
          <StatIconWrap $variant="amber">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8v4l3 2" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </StatIconWrap>
          <StatInfo>
            <StatValue>{pending}</StatValue>
            <StatLabel>Chờ xếp lớp</StatLabel>
          </StatInfo>
        </StatCard>

        <StatCard>
          <StatIconWrap $variant="default">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </StatIconWrap>
          <StatInfo>
            <StatValue>{male} / {female}</StatValue>
            <StatLabel>Nam / Nữ</StatLabel>
          </StatInfo>
        </StatCard>
      </StatsGrid>

      <FilterBar>
        <SearchWrapper>
          <SearchIcon>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </SearchIcon>
          <SearchInput
            placeholder="Tìm theo tên hoặc mã học sinh…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>

        <Dropdown
          value={classFilter}
          onChange={setClassFilter}
          options={[
            { value: 'all', label: 'Tất cả lớp học' },
            ...classes.map(cls => ({ value: cls, label: cls })),
          ]}
          ariaLabel="Lọc theo lớp học"
        />

        <Dropdown<'name_asc' | 'name_desc'>
          value={sortBy}
          onChange={setSortBy}
          options={[
            { value: 'name_asc', label: 'Tên (A → Z)' },
            { value: 'name_desc', label: 'Tên (Z → A)' },
          ]}
          ariaLabel="Sắp xếp"
        />
      </FilterBar>

      <StudentTable
        students={currentData}
        loading={loading}
        error={null}
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        onViewProfile={handleViewProfile}
        onPrevPage={() => setCurrentPage(p => p - 1)}
        onNextPage={() => setCurrentPage(p => p + 1)}
        onGoToPage={(page) => setCurrentPage(page)}
      />

      {showCreateWizard && (
        <CreateStudentWizard
          onClose={() => setShowCreateWizard(false)}
          onSuccess={() => { setShowCreateWizard(false); fetchStudents(); }}
        />
      )}

      {showImportModal && (
        <StudentImportModal
          onClose={() => setShowImportModal(false)}
          onSuccess={() => { setShowImportModal(false); fetchStudents(); }}
        />
      )}
    </Container>
  );
}
