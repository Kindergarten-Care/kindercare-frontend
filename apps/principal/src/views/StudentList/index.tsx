'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@kindercare/core';
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
  Select,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbSep,
  BreadcrumbCurrent,
  StatsGrid,
  StatCard,
  StatIconWrap,
  StatInfo,
  StatValue,
  StatLabel,
} from './styles';

export default function StudentListView() {
  const { isLoading: authLoading } = useAuth();
  const router = useRouter();
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
      <Breadcrumb>
        <BreadcrumbLink onClick={() => router.push('/home')}>Trang chủ</BreadcrumbLink>
        <BreadcrumbSep>/</BreadcrumbSep>
        <BreadcrumbCurrent>Danh sách học sinh</BreadcrumbCurrent>
      </Breadcrumb>

      <PageHeader>
        <Title>
          Danh sách Học sinh
          <StatBadge>| Tìm kiếm &amp; quản lý hồ sơ</StatBadge>
        </Title>
        <ActionGroup>
          <SecondaryButton onClick={() => setShowImportModal(true)}>
            ↑ Import CSV
          </SecondaryButton>
          <PrimaryButton onClick={() => setShowCreateWizard(true)}>
            + Thêm học sinh
          </PrimaryButton>
        </ActionGroup>
      </PageHeader>

      <StatsGrid>
        <StatCard>
          <StatIconWrap $variant="green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </StatIconWrap>
          <StatInfo>
            <StatValue>{total}</StatValue>
            <StatLabel>Tổng số học sinh</StatLabel>
          </StatInfo>
        </StatCard>

        <StatCard>
          <StatIconWrap $variant="blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </StatIconWrap>
          <StatInfo>
            <StatValue>{assigned}</StatValue>
            <StatLabel>Đã xếp lớp</StatLabel>
          </StatInfo>
        </StatCard>

        <StatCard>
          <StatIconWrap $variant="amber">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </StatIconWrap>
          <StatInfo>
            <StatValue>{pending}</StatValue>
            <StatLabel>Chờ xếp lớp</StatLabel>
          </StatInfo>
        </StatCard>

        <StatCard>
          <StatIconWrap $variant="default">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </SearchIcon>
          <SearchInput
            placeholder="Tìm theo tên hoặc mã học sinh..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>

        <Select value={classFilter} onChange={e => setClassFilter(e.target.value)}>
          <option value="all">Tất cả lớp học</option>
          {classes.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </Select>

        <Select value={sortBy} onChange={e => setSortBy(e.target.value as 'name_asc' | 'name_desc')}>
          <option value="name_asc">Tên (A → Z)</option>
          <option value="name_desc">Tên (Z → A)</option>
        </Select>
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
