'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTopLoader } from 'nextjs-toploader';
import * as S from './styles';
import LeaveRequestPopup from '@/views/ParentDashboard/components/LeaveRequestPopup';
import MedicationRequestPopup from '@/views/ParentDashboard/components/MedicationRequestPopup';
import { RequestListView } from './components/RequestListView';
import { useRequestList } from './hooks/useRequestList';
import { IconMedicine, IconRequest } from '@/assets/icons/dashboard';

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
    handleCancelRequest,
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
        onCancelRequest={handleCancelRequest}
        onCreateRequestClick={() => setIsSelectPopupOpen(true)}
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

          {isSelectPopupOpen && (
            <S.ModalOverlay onClick={() => setIsSelectPopupOpen(false)}>
              <S.ModalContent onClick={e => e.stopPropagation()}>
                <S.ModalHeader>
                  <S.ModalTitle>Tạo yêu cầu mới</S.ModalTitle>
                  <S.CloseBtn onClick={() => setIsSelectPopupOpen(false)}>✕</S.CloseBtn>
                </S.ModalHeader>
                <S.SelectionGrid>
                  <S.SelectionCard onClick={() => {
                    setIsSelectPopupOpen(false);
                    setIsLeavePopupOpen(true);
                  }}>
                    <S.CardIconCircle $bg="#eff6ff" $color="#2563eb">
                      <IconRequest size={24} />
                    </S.CardIconCircle>
                    <S.SelectionCardTitle>Báo nghỉ học</S.SelectionCardTitle>
                    <S.SelectionCardSub>Xin nghỉ phép cho bé gửi đến giáo viên lớp</S.SelectionCardSub>
                  </S.SelectionCard>

                  <S.SelectionCard onClick={() => {
                    setIsSelectPopupOpen(false);
                    setIsMedicationPopupOpen(true);
                  }}>
                    <S.CardIconCircle $bg="#fff7ed" $color="#ea580c">
                      <IconMedicine size={24} />
                    </S.CardIconCircle>
                    <S.SelectionCardTitle>Dặn dò thuốc</S.SelectionCardTitle>
                    <S.SelectionCardSub>Gửi lịch và hướng dẫn uống thuốc cho bé</S.SelectionCardSub>
                  </S.SelectionCard>
                </S.SelectionGrid>
              </S.ModalContent>
            </S.ModalOverlay>
          )}
        </>
      )}
    </S.PageContainer>
  );
};
