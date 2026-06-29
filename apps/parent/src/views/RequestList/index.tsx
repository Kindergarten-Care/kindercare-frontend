'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTopLoader } from 'nextjs-toploader';
import * as S from './styles';
import LeaveRequestPopup from '@/views/ParentDashboard/components/LeaveRequestPopup';
import MedicationRequestPopup from '@/views/ParentDashboard/components/MedicationRequestPopup';
import { RequestListView } from './components/RequestListView';
import { ConfirmCancelModal } from './components/ConfirmCancelModal';
import { SelectRequestTypeModal } from './components/SelectRequestTypeModal';
import { useRequestList } from './hooks/useRequestList';

export { type RequestItem } from './types';

export const RequestList: React.FC = () => {
  const router = useRouter();
  const loader = useTopLoader();
  const {
    activeStudent,
    loading,
    activeTab,
    setActiveTab,
    activeStatusFilter,
    setActiveStatusFilter,
    isLeavePopupOpen,
    setIsLeavePopupOpen,
    isMedicationPopupOpen,
    setIsMedicationPopupOpen,
    isSelectPopupOpen,
    setIsSelectPopupOpen,
    fetchRequests,
    stats,
    filteredRequests,
    isConfirmOpen,
    setIsConfirmOpen,
    triggerCancelRequest,
    confirmCancelRequest,
    studentName,
  } = useRequestList();

  useEffect(() => {
    if (!loading) {
      loader.done();
    }
  }, [loading, loader]);

  return (
    <S.PageContainer>
      <RequestListView
        filteredRequests={filteredRequests}
        loading={loading}
        studentName={studentName}
        stats={stats}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeStatusFilter={activeStatusFilter}
        setActiveStatusFilter={setActiveStatusFilter}
        onShowDetail={(r) => {
          loader.start();
          router.push(`/request/${r.id}`);
        }}
        onCancelRequest={triggerCancelRequest}
        onCreateRequestClick={() => setIsSelectPopupOpen(true)}
      />

      <ConfirmCancelModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmCancelRequest}
      />

      {/* Creation Popups */}
      {activeStudent && (
        <>
          <LeaveRequestPopup
            isOpen={isLeavePopupOpen}
            onClose={() => setIsLeavePopupOpen(false)}
            onSubmitSuccess={fetchRequests}
            studentName={activeStudent.fullName}
            className={activeStudent.className}
          />

          <MedicationRequestPopup
            isOpen={isMedicationPopupOpen}
            onClose={() => setIsMedicationPopupOpen(false)}
            onSubmitSuccess={fetchRequests}
            studentName={activeStudent.fullName}
            className={activeStudent.className}
          />

          <SelectRequestTypeModal
            isOpen={isSelectPopupOpen}
            onClose={() => setIsSelectPopupOpen(false)}
            onSelectLeave={() => {
              setIsSelectPopupOpen(false);
              setIsLeavePopupOpen(true);
            }}
            onSelectMedication={() => {
              setIsSelectPopupOpen(false);
              setIsMedicationPopupOpen(true);
            }}
          />
        </>
      )}
    </S.PageContainer>
  );
};
