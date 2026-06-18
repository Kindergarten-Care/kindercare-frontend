'use client';

import React from 'react';
import styled from 'styled-components';
import { LeaveRequest } from '@/config/types/attendance';
import {
  ModalBackdrop,
  ModalCard,
  ModalHeader,
  ModalTitle,
  ModalCloseBtn,
  ModalBody,
  ModalFooter,
  Table,
  TableHead,
  TBody,
  Tr,
  Th,
  Td,
  StudentProfileCell,
  StudentAvatar,
  StudentMeta,
  StudentName,
  StudentIdBadge,
} from '../styles';

const WideModalCard = styled(ModalCard)`
  max-width: 850px;
`;

const RequestStatusBadge = styled.span<{ $status: 'PENDING' | 'APPROVED' | 'REJECTED' }>`
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 9999px;
  display: inline-block;
  text-align: center;
  white-space: nowrap;

  ${props => props.$status === 'PENDING' && `
    background: ${props.theme.colors.amberLight};
    color: ${props.theme.colors.amber};
  `}

  ${props => props.$status === 'APPROVED' && `
    background: ${props.theme.colors.greenLight};
    color: ${props.theme.colors.greenDark};
  `}

  ${props => props.$status === 'REJECTED' && `
    background: #fef2f2;
    color: #b91c1c;
  `}
`;

const ViewDetailBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${props => props.theme.colors.greenDark};
  background: ${props => props.theme.colors.greenLight};
  border: 1px solid ${props => props.theme.colors.greenMid};
  border-radius: ${props => props.theme.radius.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.greenMid};
    color: white;
    transform: translateY(-1px);
  }
`;

const formatDate = (timestamp?: number): string => {
  if (!timestamp) return '---';
  const date = new Date(timestamp * 1000);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

interface LeaveRequestsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  leaveRequests: LeaveRequest[];
  onSelectRequest: (id: string) => void;
}

export function LeaveRequestsListModal({
  isOpen,
  onClose,
  leaveRequests,
  onSelectRequest,
}: LeaveRequestsListModalProps): React.ReactElement | null {
  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <WideModalCard onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Danh sách đơn xin nghỉ</ModalTitle>
          <ModalCloseBtn onClick={onClose}>&times;</ModalCloseBtn>
        </ModalHeader>

        <ModalBody style={{ padding: 0, overflowX: 'auto' }}>
          <Table style={{ minWidth: '700px' }}>
            <TableHead>
              <Tr>
                <Th style={{ width: '25%' }}>Học sinh</Th>
                <Th style={{ width: '20%' }}>Phụ huynh</Th>
                <Th style={{ width: '25%' }}>Thời gian nghỉ</Th>
                <Th style={{ width: '15%', textAlign: 'center' }}>Trạng thái</Th>
                <Th style={{ width: '15%', textAlign: 'center' }}>Hành động</Th>
              </Tr>
            </TableHead>
            <TBody>
              {leaveRequests.length > 0 ? (
                leaveRequests.map((req) => (
                  <Tr key={req.id}>
                    <Td>
                      <StudentProfileCell>
                        <StudentAvatar>
                          <img
                            src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=80&auto=format&fit=crop&q=60"
                            alt={req.studentName}
                          />
                        </StudentAvatar>
                        <StudentMeta>
                          <StudentName>{req.studentName}</StudentName>
                          <StudentIdBadge>ID: {req.studentId}</StudentIdBadge>
                        </StudentMeta>
                      </StudentProfileCell>
                    </Td>
                    <Td>
                      <div style={{ fontWeight: 600, color: '#334155' }}>{req.parentName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{req.relationship}</div>
                    </Td>
                    <Td>
                      <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#334155' }}>
                        {formatDate(req.fromDate)} - {formatDate(req.toDate)}
                      </div>
                    </Td>
                    <Td style={{ textAlign: 'center' }}>
                      <RequestStatusBadge $status={req.status}>
                        {req.status === 'PENDING' && 'Chờ duyệt'}
                        {req.status === 'APPROVED' && 'Đã duyệt'}
                        {req.status === 'REJECTED' && 'Từ chối'}
                      </RequestStatusBadge>
                    </Td>
                    <Td style={{ textAlign: 'center' }}>
                      <ViewDetailBtn onClick={() => onSelectRequest(req.id)}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        Chi tiết
                      </ViewDetailBtn>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    Không có đơn xin nghỉ nào cho lớp hiện tại.
                  </Td>
                </Tr>
              )}
            </TBody>
          </Table>
        </ModalBody>

        <ModalFooter>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              fontSize: '0.875rem',
              fontWeight: 600,
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Đóng
          </button>
        </ModalFooter>
      </WideModalCard>
    </ModalBackdrop>
  );
}

export default LeaveRequestsListModal;
