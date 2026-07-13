'use client';

import React from 'react';
import { useClassPlacement } from './hooks/useClassPlacement';
import StudentPoolPanel from './components/StudentPoolPanel';
import TargetClassPanel from './components/TargetClassPanel';
import {
  Container, PageHeader, HeaderText, Title, PageSubtitle,
  SaveButton, SaveBadge, ErrorBanner,
  SplitView, MidCol, MoveButton,
} from './styles';

export default function ClassPlacementAssignmentView() {
  const {
    grades,
    sourceClassId,
    sourceStudents,
    selectedClassId,
    classDetail,
    selectedStudentIds,
    stagedStudents,
    loading,
    loadingClass,
    saving,
    error,
    handleSourceClassChange,
    handleTargetClassChange,
    toggleStudentSelection,
    selectAllSource,
    clearSourceSelection,
    moveSelectedToStaging,
    unstageStudent,
    handleSaveAssignment,
  } = useClassPlacement();

  const canMove = selectedStudentIds.length > 0 && !!selectedClassId;
  const canSave = stagedStudents.length > 0 && !!selectedClassId && !saving;

  return (
    <Container>
      <PageHeader>
        <HeaderText>
          <Title>Xếp lớp cho Học sinh</Title>
          <PageSubtitle>Chọn học sinh từ nguồn và xếp vào lớp học đích phù hợp</PageSubtitle>
        </HeaderText>
        <SaveButton disabled={!canSave} onClick={handleSaveAssignment}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" /></svg>
          {saving ? 'Đang lưu...' : 'Lưu xếp lớp'}
          {stagedStudents.length > 0 && <SaveBadge>{stagedStudents.length}</SaveBadge>}
        </SaveButton>
      </PageHeader>

      {error && <ErrorBanner>{error}</ErrorBanner>}

      <SplitView>
        <StudentPoolPanel
          sourceClassId={sourceClassId}
          sourceStudents={sourceStudents}
          grades={grades}
          loading={loading}
          onSourceClassChange={handleSourceClassChange}
          onToggleSelection={toggleStudentSelection}
          onSelectAll={selectAllSource}
          onClearSelection={clearSourceSelection}
          selectedStudentIds={selectedStudentIds}
        />

        <MidCol>
          <MoveButton
            $primary
            disabled={!canMove}
            onClick={moveSelectedToStaging}
            title={canMove ? `Chuyển ${selectedStudentIds.length} học sinh sang lớp đích` : 'Chọn học sinh và lớp đích'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </MoveButton>
        </MidCol>

        <TargetClassPanel
          selectedClassId={selectedClassId}
          classDetail={classDetail}
          stagedStudents={stagedStudents}
          grades={grades}
          loadingClass={loadingClass}
          onClassChange={handleTargetClassChange}
          onUnstage={unstageStudent}
        />
      </SplitView>
    </Container>
  );
}
