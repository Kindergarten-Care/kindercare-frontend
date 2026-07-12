'use client';

import React from 'react';
import { useAcademicYear } from './hooks/useAcademicYear';
import YearListCard from './components/YearListCard';
import YearTransferForm from './components/YearTransferForm';
import {
  Container,
  PageHeader,
  Title,
  PageSubtitle,
  AlertBox,
  AlertIcon,
  SectionHeader,
  SectionTitle,
  StepsContainer,
} from './styles';

export default function AcademicYearView() {
  const {
    years,
    loadingYears,
    loadingEnd,
    loadingStart,
    loadingActivate,
    error,
    successMsg,
    yearName,
    startDate,
    endDate,
    activeYear,
    setYearName,
    setStartDate,
    setEndDate,
    handleEndYear,
    handleStartYear,
    handleActivate,
  } = useAcademicYear();

  return (
    <Container>
      <PageHeader>
        <Title>Quản lý Năm học</Title>
        <PageSubtitle>Xem, khởi tạo và kích hoạt năm học mới cho trường</PageSubtitle>
      </PageHeader>

      {error && (
        <AlertBox $variant="error">
          <AlertIcon>⚠️</AlertIcon>
          <div>{error}</div>
        </AlertBox>
      )}
      {successMsg && (
        <AlertBox $variant="success">
          <AlertIcon>✅</AlertIcon>
          <div>{successMsg}</div>
        </AlertBox>
      )}

      <SectionHeader>
        <SectionTitle>📅 Danh sách Năm học</SectionTitle>
      </SectionHeader>

      <YearListCard
        years={years}
        loading={loadingYears}
        onActivate={handleActivate}
        loadingActivate={loadingActivate}
      />

      <SectionHeader>
        <SectionTitle>🔄 Quy trình Chuyển giao Năm học</SectionTitle>
      </SectionHeader>

      <StepsContainer>
        <YearTransferForm
          activeYearName={activeYear?.YearName}
          loadingEnd={loadingEnd}
          loadingStart={loadingStart}
          yearName={yearName}
          startDate={startDate}
          endDate={endDate}
          onYearNameChange={setYearName}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onEndYear={handleEndYear}
          onStartYear={handleStartYear}
        />
      </StepsContainer>
    </Container>
  );
}
