'use client';

import React from 'react';
import * as S from './styles';
import { DashboardLayout } from '@/layout/DashboardLayout';
import { QrScannerModal } from '../../components/QrScannerModal';
import { PhotoAttendanceModal } from '../../components/PhotoAttendance/PhotoAttendanceModal';
import { useAttendance } from './hooks/useAttendance';
import { StatsSidebar } from './components/StatsSidebar';
import { StudentRoster } from './components/StudentRoster';
import { LeaveDrawer } from './components/LeaveDrawer';
import { ProofLightbox } from './components/ProofLightbox';

export const AttendanceView: React.FC = () => {
  const a = useAttendance();

  return (
    <DashboardLayout>
      <S.PageContainer>
        <S.MainLayout>
          <StatsSidebar
            stTotal={a.stTotal}
            cPresent={a.cPresent}
            cExcused={a.cExcused}
            cUnexcused={a.cUnexcused}
            rate={a.rate}
            donutGradient={a.donutGradient}
            weekTrend={a.weekTrend}
            calendarYear={a.calendarYear}
            calendarMonth={a.calendarMonth}
            calendarCells={a.calendarCells}
            monthOffset={a.monthOffset}
            setMonthOffset={a.setMonthOffset}
          />

          <StudentRoster
            className={a.className}
            statusFilter={a.statusFilter}
            setStatusFilter={a.setStatusFilter}
            cPresent={a.cPresent}
            cExcused={a.cExcused}
            cUnexcused={a.cUnexcused}
            query={a.query}
            setQuery={a.setQuery}
            sortedStudents={a.sortedStudents}
            imageErrors={a.imageErrors}
            setImageErrors={a.setImageErrors}
            openMenuId={a.openMenuId}
            setOpenMenuId={a.setOpenMenuId}
            menuStage={a.menuStage}
            setMenuStage={a.setMenuStage}
            reasonDraft={a.reasonDraft}
            setReasonDraft={a.setReasonDraft}
            popoverRef={a.popoverRef}
            pendingLeavesCount={a.pendingLeavesCount}
            onOpenLeaveDrawer={() => a.setLeaveDrawerOpen(true)}
            onOpenPhotoScanner={() => a.setIsPhotoScannerOpen(true)}
            onExportCSV={a.exportCSV}
            onUpdateStatus={a.handleUpdateStatus}
            onReasonSubmit={a.handleReasonSubmit}
          />
        </S.MainLayout>

        {a.leaveDrawerOpen && (
          <LeaveDrawer
            allLeaves={a.allLeaves}
            pendingLeavesCount={a.pendingLeavesCount}
            imageErrors={a.imageErrors}
            setImageErrors={a.setImageErrors}
            drawerRef={a.drawerRef}
            onClose={() => a.setLeaveDrawerOpen(false)}
            onOpenProof={(id) => a.setProofOpenId(id)}
            onProcessLeaveRequest={a.handleProcessLeaveRequest}
          />
        )}

        {a.selectedProof && (
          <ProofLightbox proof={a.selectedProof} onClose={() => a.setProofOpenId(null)} />
        )}

        <S.ToastContainer>
          {a.toasts.map(t => (
            <S.ToastMsg key={t.id}>{t.text}</S.ToastMsg>
          ))}
        </S.ToastContainer>

        {a.isQrScannerOpen && (
          <QrScannerModal
            onClose={() => a.setIsQrScannerOpen(false)}
            onScanSuccess={() => {
              if (a.classId) a.fetchAttendance(a.classId, a.dateMs);
            }}
          />
        )}

        <PhotoAttendanceModal
          isOpen={a.isPhotoScannerOpen}
          onClose={() => a.setIsPhotoScannerOpen(false)}
          students={a.students}
          classId={a.classId}
          className={a.className}
          onSuccess={() => {
            if (a.classId) a.fetchAttendance(a.classId, a.dateMs);
          }}
        />
      </S.PageContainer>
    </DashboardLayout>
  );
};
