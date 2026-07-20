import React from 'react';
import { Bell, Calendar } from 'lucide-react';
import * as S from '../styles';
import { LeaveRequest } from '../../../config/types/attendance';
import { PROOF_BGS } from '../constants';
import { getAvatarGrad } from '../utils';

interface LeaveDrawerProps {
  allLeaves: LeaveRequest[];
  pendingLeavesCount: number;
  imageErrors: Record<string, boolean>;
  setImageErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  drawerRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onOpenProof: (id: string) => void;
  onProcessLeaveRequest: (requestId: string, status: 'APPROVED' | 'REJECTED') => void;
}

export const LeaveDrawer: React.FC<LeaveDrawerProps> = ({
  allLeaves,
  pendingLeavesCount,
  imageErrors,
  setImageErrors,
  drawerRef,
  onClose,
  onOpenProof,
  onProcessLeaveRequest,
}) => {
  return (
    <>
      <S.DrawerOverlay onClick={onClose} />
      <S.DrawerContainer ref={drawerRef}>
        <S.DrawerHeader>
          <S.DrawerHeaderIconBlock><Bell size={24} /></S.DrawerHeaderIconBlock>
          <S.DrawerHeaderMeta>
            <div style={{ fontSize: '18px', fontWeight: 700 }}>Đơn xin nghỉ phép</div>
            <div style={{ fontSize: '13px', color: '#6B7280' }}>{pendingLeavesCount} đơn chờ duyệt · {allLeaves.length} tổng</div>
          </S.DrawerHeaderMeta>
          <S.DrawerCloseBtn onClick={onClose}>✕</S.DrawerCloseBtn>
        </S.DrawerHeader>
        <S.DrawerContentList>
          {allLeaves.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#9CA3AF', fontWeight: 600 }}>Không có đơn xin nghỉ.</div>
          ) : (
            allLeaves.map((l, i) => {
              const isPending = l.status === 'PENDING';
              const fromStr = l.fromDate ? new Date(l.fromDate * 1000).toLocaleDateString('vi-VN') : '';
              const toStr = l.toDate ? new Date(l.toDate * 1000).toLocaleDateString('vi-VN') : '';
              const dateRangeText = fromStr === toStr ? fromStr : `${fromStr} → ${toStr}`;

              return (
                <S.LeaveCard key={l.id} $isPending={isPending}>
                  <S.LeaveCardHeader>
                    <S.LeaveStudentAvatar $grad={getAvatarGrad(l.studentName)}>
                      {l.studentAvatar && !imageErrors[`l-${l.id}`] ? (
                        <S.LeaveStudentAvatarImg src={l.studentAvatar} onError={() => setImageErrors(prev => ({ ...prev, [`l-${l.id}`]: true }))} />
                      ) : l.studentName.charAt(0)}
                    </S.LeaveStudentAvatar>
                    <S.LeaveStudentMeta>
                      <S.LeaveStudentNameRow>
                        <S.LeaveStudentName>{l.studentName}</S.LeaveStudentName>
                        <S.LeaveStatusPill $status={l.status}>
                          {l.status === 'APPROVED' ? '✓ Đã duyệt' : (l.status === 'REJECTED' ? '✕ Từ chối' : 'Chờ duyệt')}
                        </S.LeaveStatusPill>
                      </S.LeaveStudentNameRow>
                      <S.LeaveSubDetail>Mã HS: {l.studentId.substring(0, 8)}</S.LeaveSubDetail>
                    </S.LeaveStudentMeta>
                  </S.LeaveCardHeader>

                  <S.LeaveDetailsBlock>
                    <S.LeaveDetailRow>
                      <S.LeaveDetailIconBlock $bg="#E3EDFD" $color="#2563EB"><Calendar size={15} /></S.LeaveDetailIconBlock>
                      <S.LeaveDetailLabel>Thời gian</S.LeaveDetailLabel>
                      <S.LeaveDetailValue>{dateRangeText}</S.LeaveDetailValue>
                    </S.LeaveDetailRow>
                    <S.LeaveDetailRow>
                      <S.LeaveDetailIconBlock $bg="#FEF3C7" $color="#D97706"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></S.LeaveDetailIconBlock>
                      <S.LeaveDetailLabel>Lý do</S.LeaveDetailLabel>
                      <S.LeaveDetailValue>{l.reason}</S.LeaveDetailValue>
                    </S.LeaveDetailRow>
                  </S.LeaveDetailsBlock>

                  {l.attachmentUrl && (
                    <S.LeaveEvidenceBlock>
                      <S.LeaveEvidenceTitle>Ảnh minh chứng</S.LeaveEvidenceTitle>
                      <S.LeaveEvidenceBtn $bg={PROOF_BGS[i % PROOF_BGS.length]} onClick={() => onOpenProof(l.id)}>
                        <img src={l.attachmentUrl} alt="minh chung" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </S.LeaveEvidenceBtn>
                    </S.LeaveEvidenceBlock>
                  )}

                  {isPending && (
                    <S.LeaveActionButtons>
                      <S.LeaveActionApproveBtn onClick={() => onProcessLeaveRequest(l.id, 'APPROVED')}>Duyệt</S.LeaveActionApproveBtn>
                      <S.LeaveActionRejectBtn onClick={() => onProcessLeaveRequest(l.id, 'REJECTED')}>Từ chối</S.LeaveActionRejectBtn>
                    </S.LeaveActionButtons>
                  )}
                </S.LeaveCard>
              );
            })
          )}
        </S.DrawerContentList>
      </S.DrawerContainer>
    </>
  );
};
