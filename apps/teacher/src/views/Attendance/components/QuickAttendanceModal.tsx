'use client';

import React, { useState, useEffect } from 'react';
import { Student, AttendanceStatus } from '@/config/types/attendance';
import {
  ModalBackdrop,
  ModalCard,
  ModalHeader,
  ModalTitle,
  ModalCloseBtn,
  ModalBody,
  ModalFooter,
  CancelBtn,
  ApproveBtn,
  Th,
  Tr,
  Td,
  Table,
  TableHead,
  TBody,
  StatusToggleBtn,
  StatusButtonGroup,
  StudentProfileCell,
  StudentAvatar,
  StudentMeta,
  StudentName,
  StudentIdBadge,
} from '../styles';

interface QuickAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onConfirm: (records: { studentId: string; status: AttendanceStatus }[]) => void;
}

export function QuickAttendanceModal({
  isOpen,
  onClose,
  students,
  onConfirm,
}: QuickAttendanceModalProps): React.ReactElement | null {
  const [localStatuses, setLocalStatuses] = useState<{ [id: string]: AttendanceStatus }>({});

  // Initialize local status state when modal opens
  useEffect(() => {
    if (isOpen && students.length > 0) {
      const initial: { [id: string]: AttendanceStatus } = {};
      students.forEach(s => {
        initial[s.id] = s.attendanceStatus;
      });
      setLocalStatuses(initial);
    }
  }, [isOpen, students]);

  if (!isOpen) return null;

  const handleStatusSelect = (studentId: string, status: AttendanceStatus) => {
    setLocalStatuses(prev => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSelectAllPresent = () => {
    const updated: { [id: string]: AttendanceStatus } = {};
    students.forEach(s => {
      // Do not overwrite students with existing leave request approval or leave requests unless they want to
      if (s.hasActiveLeaveRequest) {
        updated[s.id] = localStatuses[s.id] || 'PERMISSION_ABSENCE';
      } else {
        updated[s.id] = 'PRESENT';
      }
    });
    setLocalStatuses(updated);
  };

  const handleSave = () => {
    const payload = Object.entries(localStatuses).map(([studentId, status]) => ({
      studentId,
      status,
    }));
    onConfirm(payload);
    onClose();
  };

  const presentCount = Object.values(localStatuses).filter(v => v === 'PRESENT').length;
  const totalCount = students.length;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalCard style={{ maxWidth: '800px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <ModalTitle>Điểm danh nhanh lớp Mầm Non 1</ModalTitle>
            <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
              Tổng số: {totalCount} học sinh • Sĩ số hiện tại: <strong style={{ color: '#22c55e' }}>{presentCount}</strong>/{totalCount}
            </span>
          </div>
          <ModalCloseBtn onClick={onClose}>&times;</ModalCloseBtn>
        </ModalHeader>

        <ModalBody style={{ padding: '0px', maxHeight: '60vh' }}>
          {/* Quick Toolbar */}
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <button
              onClick={handleSelectAllPresent}
              style={{
                background: '#22c55e',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Chọn tất cả có mặt
            </button>
            <span style={{ fontSize: '0.8125rem', color: '#64748b', fontStyle: 'italic' }}>
              * P: Có mặt | P.A: Vắng phép | U.A: Không phép
            </span>
          </div>

          <div style={{ overflowY: 'auto', maxHeight: 'calc(60vh - 70px)' }}>
            <Table>
              <TableHead>
                <Tr>
                  <Th>Học sinh</Th>
                  <Th style={{ textAlign: 'center' }}>Trạng thái</Th>
                </Tr>
              </TableHead>
              <TBody>
                {students.map((student) => (
                  <Tr key={student.id}>
                    <Td>
                      <StudentProfileCell>
                        <StudentAvatar style={{ width: '36px', height: '36px' }}>
                          <img src={student.avatar} alt={student.name} />
                        </StudentAvatar>
                        <StudentMeta>
                          <StudentName style={{ fontSize: '0.875rem' }}>{student.name}</StudentName>
                          <StudentIdBadge>{student.id}</StudentIdBadge>
                        </StudentMeta>
                      </StudentProfileCell>
                    </Td>
                    <Td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <StatusButtonGroup>
                          <StatusToggleBtn
                            $active={localStatuses[student.id] === 'PRESENT'}
                            $type="present"
                            onClick={() => handleStatusSelect(student.id, 'PRESENT')}
                          >
                            P
                          </StatusToggleBtn>
                          <StatusToggleBtn
                            $active={localStatuses[student.id] === 'PERMISSION_ABSENCE'}
                            $type="permission"
                            onClick={() => handleStatusSelect(student.id, 'PERMISSION_ABSENCE')}
                          >
                            P.A
                          </StatusToggleBtn>
                          <StatusToggleBtn
                            $active={localStatuses[student.id] === 'UNEXCUSED_ABSENCE'}
                            $type="unexcused"
                            onClick={() => handleStatusSelect(student.id, 'UNEXCUSED_ABSENCE')}
                          >
                            U.A
                          </StatusToggleBtn>
                        </StatusButtonGroup>
                      </div>
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </div>
        </ModalBody>

        <ModalFooter>
          <CancelBtn onClick={onClose}>Hủy bỏ</CancelBtn>
          <ApproveBtn onClick={handleSave}>Hoàn tất & Gửi thông báo cho phụ huynh</ApproveBtn>
        </ModalFooter>
      </ModalCard>
    </ModalBackdrop>
  );
}
export default QuickAttendanceModal;
