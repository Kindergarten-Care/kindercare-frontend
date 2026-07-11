'use client';

import React from 'react';
import { useHomeroomAssignment } from './hooks/useHomeroomAssignment';
import ClassSidebar from './components/ClassSidebar';
import ClassDetailPanel from './components/ClassDetailPanel';
import { Container, PageHeader, Title, PageSubtitle, Layout } from './styles';

export default function HomeroomTeacherAssignmentView() {
  const { grades, selectedClass, classDetail, loading, handleSelectClass, handleRefresh } =
    useHomeroomAssignment();

  return (
    <Container>
      <PageHeader>
        <Title>Bổ nhiệm Giáo viên Chủ nhiệm</Title>
        <PageSubtitle>Phân công giáo viên chủ nhiệm và giáo viên bộ môn cho từng lớp học</PageSubtitle>
      </PageHeader>

      <Layout>
        <ClassSidebar
          grades={grades}
          selectedClassId={selectedClass?.classId}
          onSelectClass={handleSelectClass}
        />
        <ClassDetailPanel
          selectedClass={selectedClass}
          classDetail={classDetail}
          loading={loading}
          onAssignSuccess={handleRefresh}
        />
      </Layout>
    </Container>
  );
}
