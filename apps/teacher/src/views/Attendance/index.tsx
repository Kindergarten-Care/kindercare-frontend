'use client';

import React from 'react';
import { useAttendance } from './hooks';
import { LeaveRequestModal } from './components/LeaveRequestModal';
import { QuickAttendanceModal } from './components/QuickAttendanceModal';
import {
  AttendancePageContainer,
  HeaderActionsSection,
  DateHeader,
  ActionsGroup,
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  StatSub,
  FilterBar,
  SearchInputWrapper,
  SearchField,
  FilterDropdownWrapper,
  CustomSelect,
  GridContainer,
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
  StatusButtonGroup,
  StatusToggleBtn,
  TimeInput,
  NoteInput,
  LeaveRequestBadge,
  QuickFillBtn,
  SaveBtn,
} from './styles';

export function AttendanceView(): React.ReactElement {
  const {
    filteredStudents,
    loading,
    saving,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    statistics,
    
    // Quick Attendance Modal
    quickAttendanceModalOpen,
    setQuickAttendanceModalOpen,
    handleQuickAttendance,

    // Leave Request Modal
    leaveRequestModalOpen,
    setLeaveRequestModalOpen,
    selectedLeaveRequest,
    handleSelectLeaveRequest,
    handleProcessLeaveRequest,

    // Actions
    handleStatusChange,
    handleArrivalTimeChange,
    handleHealthNoteChange,
    handleSave,
    students,
  } = useAttendance();

  // Custom bulk status payload confirmatory callback
  const handleQuickAttendanceConfirm = (payload: { studentId: string; status: any }[]) => {
    payload.forEach(item => {
      handleStatusChange(item.studentId, item.status);
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #22c55e', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>Đang tải dữ liệu điểm danh...</span>
        <style dangerouslySetInnerHTML={{ __html: '@keyframes spin { to { transform: rotate(360deg); } }' }} />
      </div>
    );
  }

  return (
    <AttendancePageContainer>
      {/* Top Header & Save Controls */}
      <HeaderActionsSection>
        <DateHeader>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#22c55e' }}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Hôm nay, 18/05/2026
        </DateHeader>

        <ActionsGroup>
          <QuickFillBtn onClick={() => setQuickAttendanceModalOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Điểm danh nhanh
          </QuickFillBtn>

          <SaveBtn onClick={handleSave} disabled={saving}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Lưu điểm danh & Gửi thông báo
          </SaveBtn>
        </ActionsGroup>
      </HeaderActionsSection>

      {/* Stats Board Section */}
      <StatsGrid>
        <StatCard $borderType="neutral">
          <StatLabel>Tổng sĩ số</StatLabel>
          <StatValue>{statistics.total}</StatValue>
          <StatSub>Học sinh trong lớp</StatSub>
        </StatCard>
        <StatCard $borderType="green">
          <StatLabel>Có mặt</StatLabel>
          <StatValue style={{ color: '#15803d' }}>{statistics.present}</StatValue>
          <StatSub>Học sinh đang ở lớp</StatSub>
        </StatCard>
        <StatCard $borderType="amber">
          <StatLabel>Vắng phép</StatLabel>
          <StatValue style={{ color: '#b45309' }}>{statistics.absentPermission}</StatValue>
          <StatSub>Phụ huynh đã xin nghỉ</StatSub>
        </StatCard>
        <StatCard style={{ borderLeftColor: '#ef4444' }}>
          <StatLabel>Không phép</StatLabel>
          <StatValue style={{ color: '#b91c1c' }}>{statistics.absentUnexcused}</StatValue>
          <StatSub>Chưa rõ lý do vắng</StatSub>
        </StatCard>
      </StatsGrid>

      {/* Filter and Search Bar */}
      <FilterBar>
        <SearchInputWrapper>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <SearchField 
            type="text" 
            placeholder="Tìm nhanh học sinh..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchInputWrapper>

        <FilterDropdownWrapper>
          <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#64748b' }}>Trạng thái:</span>
          <CustomSelect 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="PRESENT">Có mặt</option>
            <option value="ABSENT">Vắng mặt (Tất cả)</option>
            <option value="PERMISSION_ABSENCE">Vắng phép</option>
            <option value="UNEXCUSED_ABSENCE">Không phép</option>
          </CustomSelect>
        </FilterDropdownWrapper>
      </FilterBar>

      {/* Daily Student Attendance Grid */}
      <GridContainer>
        <Table>
          <TableHead>
            <Tr>
              <Th style={{ width: '30%' }}>Học sinh</Th>
              <Th style={{ width: '30%', textAlign: 'center' }}>Trạng thái điểm danh</Th>
              <Th style={{ width: '15%', textAlign: 'center' }}>Giờ đến</Th>
              <Th style={{ width: '25%' }}>Ghi chú sức khỏe / hoạt động</Th>
            </Tr>
          </TableHead>
          <TBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <Tr key={student.id}>
                  <Td>
                    <StudentProfileCell>
                      <StudentAvatar>
                        <img src={student.avatar} alt={student.name} />
                      </StudentAvatar>
                      <StudentMeta>
                        <StudentName>{student.name}</StudentName>
                        <StudentIdBadge>ID: {student.id}</StudentIdBadge>
                        {student.hasActiveLeaveRequest && student.leaveRequestId && (
                          <div>
                            <LeaveRequestBadge onClick={() => handleSelectLeaveRequest(student.leaveRequestId!)}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                              </svg>
                              Xem đơn xin nghỉ
                            </LeaveRequestBadge>
                          </div>
                        )}
                      </StudentMeta>
                    </StudentProfileCell>
                  </Td>
                  <Td>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <StatusButtonGroup>
                        <StatusToggleBtn 
                          $active={student.attendanceStatus === 'PRESENT'}
                          $type="present"
                          onClick={() => handleStatusChange(student.id, 'PRESENT')}
                        >
                          Có mặt
                        </StatusToggleBtn>
                        <StatusToggleBtn 
                          $active={student.attendanceStatus === 'PERMISSION_ABSENCE'}
                          $type="permission"
                          onClick={() => handleStatusChange(student.id, 'PERMISSION_ABSENCE')}
                        >
                          Vắng phép
                        </StatusToggleBtn>
                        <StatusToggleBtn 
                          $active={student.attendanceStatus === 'UNEXCUSED_ABSENCE'}
                          $type="unexcused"
                          onClick={() => handleStatusChange(student.id, 'UNEXCUSED_ABSENCE')}
                        >
                          Không phép
                        </StatusToggleBtn>
                      </StatusButtonGroup>
                    </div>
                  </Td>
                  <Td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <TimeInput 
                        type="text" 
                        value={student.arrivalTime} 
                        onChange={(e) => handleArrivalTimeChange(student.id, e.target.value)}
                        disabled={student.attendanceStatus !== 'PRESENT'}
                        style={student.attendanceStatus !== 'PRESENT' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                      />
                    </div>
                  </Td>
                  <Td>
                    <NoteInput 
                      type="text" 
                      placeholder="Thêm ghi chú..." 
                      value={student.healthNote}
                      onChange={(e) => handleHealthNoteChange(student.id, e.target.value)}
                    />
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                  Không tìm thấy học sinh nào phù hợp.
                </Td>
              </Tr>
            )}
          </TBody>
        </Table>
      </GridContainer>

      {/* Leave Request Approval Details Modal */}
      <LeaveRequestModal 
        isOpen={leaveRequestModalOpen}
        onClose={() => setLeaveRequestModalOpen(false)}
        leaveRequest={selectedLeaveRequest}
        onApprove={(id) => handleProcessLeaveRequest(id, 'APPROVED')}
        onReject={(id) => handleProcessLeaveRequest(id, 'REJECTED')}
      />

      {/* Quick Attendance Modal Panel */}
      <QuickAttendanceModal 
        isOpen={quickAttendanceModalOpen}
        onClose={() => setQuickAttendanceModalOpen(false)}
        students={students}
        onConfirm={handleQuickAttendanceConfirm}
      />
    </AttendancePageContainer>
  );
}
export default AttendanceView;
