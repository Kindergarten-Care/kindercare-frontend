'use client';

import React from 'react';
import { LeaveRequest } from '@/config/types/attendance';
import {
  ModalBackdrop,
  ModalCard,
  ModalHeader,
  ModalTitle,
  ModalCloseBtn,
  ModalBody,
  ModalFooter,
  LeaveDetailSection,
  DetailLabel,
  DetailText,
  AttachmentPreview,
  RejectBtn,
  ApproveBtn,
  CancelBtn,
  StudentProfileCell,
  StudentAvatar,
  StudentMeta,
  StudentName,
  StudentIdBadge,
} from '../styles';

interface LeaveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  leaveRequest: LeaveRequest | null;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function LeaveRequestModal({
  isOpen,
  onClose,
  leaveRequest,
  onApprove,
  onReject,
}: LeaveRequestModalProps): React.ReactElement | null {
  if (!isOpen || !leaveRequest) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Chi tiết đơn xin nghỉ - Bé {leaveRequest.studentName}</ModalTitle>
          <ModalCloseBtn onClick={onClose}>&times;</ModalCloseBtn>
        </ModalHeader>

        <ModalBody>
          {/* Student & Parent Info Card */}
          <StudentProfileCell style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <StudentAvatar>
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=60" 
                alt={leaveRequest.studentName} 
              />
            </StudentAvatar>
            <StudentMeta>
              <StudentName>{leaveRequest.studentName}</StudentName>
              <StudentIdBadge>{leaveRequest.relationship} - {leaveRequest.parentName}</StudentIdBadge>
            </StudentMeta>
          </StudentProfileCell>

          {/* Reason Section */}
          <LeaveDetailSection>
            <DetailLabel>Lý do nghỉ</DetailLabel>
            <DetailText>{leaveRequest.reason}</DetailText>
          </LeaveDetailSection>

          {/* Proof Section */}
          <LeaveDetailSection>
            <DetailLabel>Minh chứng đính kèm</DetailLabel>
            <AttachmentPreview>
              {leaveRequest.attachmentUrl ? (
                <img src={leaveRequest.attachmentUrl} alt="Minh chứng xin nghỉ" />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8', fontSize: '0.875rem' }}>
                  Không có minh chứng đính kèm
                </div>
              )}
            </AttachmentPreview>
          </LeaveDetailSection>
        </ModalBody>

        <ModalFooter>
          {leaveRequest.status === 'PENDING' ? (
            <>
              <RejectBtn onClick={() => onReject(leaveRequest.id)}>Từ chối</RejectBtn>
              <ApproveBtn onClick={() => onApprove(leaveRequest.id)}>Xác nhận & Duyệt</ApproveBtn>
            </>
          ) : (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: leaveRequest.status === 'APPROVED' ? '#15803d' : '#b91c1c' }}>
                Trạng thái đơn: {leaveRequest.status === 'APPROVED' ? 'Đã duyệt phép' : 'Đã từ chối'}
              </span>
              <button 
                onClick={onClose}
                style={{ padding: '8px 16px', fontSize: '0.875rem', fontWeight: 600, background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer' }}
              >
                Đóng
              </button>
            </div>
          )}
        </ModalFooter>
      </ModalCard>
    </ModalBackdrop>
  );
}
export default LeaveRequestModal;
