'use client';

import React from 'react';
import { useClassPlacement } from './hooks/useClassPlacement';
import StudentPoolPanel from './components/StudentPoolPanel';
import TargetClassPanel from './components/TargetClassPanel';
import { Container, PageHeader, Title, PageSubtitle, SplitView, ActionCenter, MoveButton } from './styles';

export default function ClassPlacementAssignmentView() {
  const {
    grades,
    sourceClassId,
    sourceStudents,
    selectedClassId,
    classDetail,
    selectedStudentIds,
    loading,
    loadingClass,
    handleSourceClassChange,
    handleTargetClassChange,
    toggleStudentSelection,
    handleAssignToClass,
  } = useClassPlacement();

  const isDisabled = !selectedClassId || selectedStudentIds.length === 0 || loading || sourceClassId === selectedClassId;

  return (
    <Container>
      <PageHeader>
        <Title>Xếp lớp cho Học sinh</Title>
        <PageSubtitle>Chọn học sinh từ nguồn và xếp vào lớp học đích phù hợp</PageSubtitle>
      </PageHeader>

      <SplitView>
        <StudentPoolPanel
          sourceClassId={sourceClassId}
          sourceStudents={sourceStudents}
          grades={grades}
          selectedCount={selectedStudentIds.length}
          loading={loading}
          onSourceClassChange={handleSourceClassChange}
          onToggleSelection={toggleStudentSelection}
          selectedStudentIds={selectedStudentIds}
        />

        <ActionCenter>
          <MoveButton
            disabled={isDisabled}
            onClick={handleAssignToClass}
            title={isDisabled ? 'Chọn học sinh và lớp đích' : `Xếp ${selectedStudentIds.length} học sinh vào lớp`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MoveButton>
        </ActionCenter>

        <TargetClassPanel
          selectedClassId={selectedClassId}
          classDetail={classDetail}
          grades={grades}
          loadingClass={loadingClass}
          onClassChange={handleTargetClassChange}
        />
      </SplitView>
    </Container>
  );
}
