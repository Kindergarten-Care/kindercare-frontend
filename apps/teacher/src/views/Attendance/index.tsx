'use client';

import React from 'react';
import { useAttendance } from './hooks';
import { LeaveRequestModal } from './components/LeaveRequestModal';
import { QuickAttendanceModal } from './components/QuickAttendanceModal';
import { LeaveRequestsListModal } from './components/LeaveRequestsListModal';
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
  LeaveRequestsBtn,
  LeaveRequestsBadgeCount,
  SaveBtn,
  ViewModeToggleContainer,
  ViewModeBtn,
  TabContainer,
  TabButton,
  TabBadge,
  TrackerGrid,
  TrackerCard,
  TrackerCardHeader,
  TrackerCardBody,
  TrackerCardFooter,
  TrackerInfoRow,
  TrackerInfoLabel,
  TrackerInfoValue,
  CallParentBtn,
  TrackerStatusBadge,
} from './styles';

const getFormattedToday = (): string => {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const getTodayDateString = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDateStringToDisplay = (dateStr: string): string => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
};

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
    
    // Date
    selectedDate,
    setSelectedDate,
    
    // Classes
    classes,
    selectedClassId,
    setSelectedClassId,

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

    // Leave Requests List Modal
    leaveRequestsListModalOpen,
    setLeaveRequestsListModalOpen,
    classLeaveRequests,
    pendingClassLeaveRequestsCount,

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

  const [viewMode, setViewMode] = React.useState<'EDIT' | 'TRACKER'>('TRACKER');
  const dateInputRef = React.useRef<HTMLInputElement>(null);

  const handleDatePickerTrigger = () => {
    if (dateInputRef.current) {
      try {
        dateInputRef.current.showPicker();
      } catch (err) {
        console.error('showPicker failed:', err);
      }
    }
  };

  const handleCallParent = (studentName: string) => {
    alert(`Đang kết nối cuộc gọi đến phụ huynh học sinh ${studentName}...`);
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <DateHeader 
            onClick={handleDatePickerTrigger}
            style={{ 
              position: 'relative', 
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              backgroundColor: '#f1f5f9',
              borderRadius: '8px',
              border: '1px solid #cbd5e1'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#22c55e' }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1e293b' }}>
              {formatDateStringToDisplay(selectedDate)}
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#64748b', marginLeft: '4px' }}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            <input 
              ref={dateInputRef}
              type="date" 
              value={selectedDate} 
              max={getTodayDateString()}
              onChange={(e) => {
                const val = e.target.value;
                const today = getTodayDateString();
                if (val > today) {
                  alert('Không thể chọn ngày ở tương lai');
                  return;
                }
                setSelectedDate(val);
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                pointerEvents: 'none',
                zIndex: -1
              }}
            />
          </DateHeader>

          <ViewModeToggleContainer>
            <ViewModeBtn 
              $active={viewMode === 'TRACKER'} 
              onClick={() => setViewMode('TRACKER')}
            >
              Bảng theo dõi
            </ViewModeBtn>
            <ViewModeBtn 
              $active={viewMode === 'EDIT'} 
              onClick={() => setViewMode('EDIT')}
            >
              Nhập điểm danh
            </ViewModeBtn>
          </ViewModeToggleContainer>
        </div>

        <ActionsGroup>
          <LeaveRequestsBtn onClick={() => setLeaveRequestsListModalOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            Đơn xin nghỉ
            {pendingClassLeaveRequestsCount > 0 && (
              <LeaveRequestsBadgeCount>
                {pendingClassLeaveRequestsCount}
              </LeaveRequestsBadgeCount>
            )}
          </LeaveRequestsBtn>

          {viewMode === 'EDIT' ? (
            <>
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
            </>
          ) : (
            <SaveBtn onClick={() => setViewMode('EDIT')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Cập nhật điểm danh
            </SaveBtn>
          )}
        </ActionsGroup>
      </HeaderActionsSection>

      {/* Stats Board Section */}
      <StatsGrid>
        <StatCard $borderType="neutral" style={{ cursor: 'pointer' }} onClick={() => setStatusFilter('ALL')}>
          <StatLabel>Tổng sĩ số</StatLabel>
          <StatValue>{statistics.total}</StatValue>
          <StatSub>Học sinh trong lớp</StatSub>
        </StatCard>
        <StatCard $borderType="green" style={{ cursor: 'pointer' }} onClick={() => setStatusFilter('PRESENT')}>
          <StatLabel>Có mặt</StatLabel>
          <StatValue style={{ color: '#15803d' }}>{statistics.present}</StatValue>
          <StatSub>Học sinh đang ở lớp</StatSub>
        </StatCard>
        <StatCard $borderType="amber" style={{ cursor: 'pointer' }} onClick={() => setStatusFilter('PERMISSION_ABSENCE')}>
          <StatLabel>Vắng phép</StatLabel>
          <StatValue style={{ color: '#b45309' }}>{statistics.absentPermission}</StatValue>
          <StatSub>Phụ huynh đã xin nghỉ</StatSub>
        </StatCard>
        <StatCard style={{ borderLeftColor: '#ef4444', cursor: 'pointer' }} onClick={() => setStatusFilter('UNEXCUSED_ABSENCE')}>
          <StatLabel>Không phép</StatLabel>
          <StatValue style={{ color: '#b91c1c' }}>{statistics.absentUnexcused}</StatValue>
          <StatSub>Chưa rõ lý do vắng</StatSub>
        </StatCard>
      </StatsGrid>

      {/* Interactive Tabs */}
      <TabContainer>
        <TabButton 
          $active={statusFilter === 'ALL'} 
          $type="all"
          onClick={() => setStatusFilter('ALL')}
        >
          Tất cả
          <TabBadge $active={statusFilter === 'ALL'} $type="all">
            {statistics.total}
          </TabBadge>
        </TabButton>
        <TabButton 
          $active={statusFilter === 'PRESENT'} 
          $type="present"
          onClick={() => setStatusFilter('PRESENT')}
        >
          Đã điểm danh (Có mặt)
          <TabBadge $active={statusFilter === 'PRESENT'} $type="present">
            {statistics.present}
          </TabBadge>
        </TabButton>
        <TabButton 
          $active={statusFilter === 'PERMISSION_ABSENCE'} 
          $type="permission"
          onClick={() => setStatusFilter('PERMISSION_ABSENCE')}
        >
          Nghỉ có phép
          <TabBadge $active={statusFilter === 'PERMISSION_ABSENCE'} $type="permission">
            {statistics.absentPermission}
          </TabBadge>
        </TabButton>
        <TabButton 
          $active={statusFilter === 'UNEXCUSED_ABSENCE'} 
          $type="unexcused"
          onClick={() => setStatusFilter('UNEXCUSED_ABSENCE')}
        >
          Nghỉ không phép
          <TabBadge $active={statusFilter === 'UNEXCUSED_ABSENCE'} $type="unexcused">
            {statistics.absentUnexcused}
          </TabBadge>
        </TabButton>
      </TabContainer>

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

        {classes.length > 0 && (
          <FilterDropdownWrapper>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Lớp học:</span>
            <CustomSelect 
              value={selectedClassId || ''} 
              onChange={(e) => setSelectedClassId(Number(e.target.value))}
            >
              {classes.map((cls) => (
                <option key={cls.classId} value={cls.classId}>
                  {cls.className} ({cls.studentCount} học sinh)
                </option>
              ))}
            </CustomSelect>
          </FilterDropdownWrapper>
        )}
      </FilterBar>

      {/* Main Grid View Switch */}
      {viewMode === 'EDIT' ? (
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
                          {student.leaveRequestId && (
                            <div>
                              <LeaveRequestBadge onClick={() => handleSelectLeaveRequest(student.leaveRequestId!)}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                  <polyline points="14 2 14 8 20 8"></polyline>
                                  <line x1="16" y1="13" x2="8" y2="13"></line>
                                  <line x1="16" y1="17" x2="8" y2="17"></line>
                                  <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                                Xem đơn xin nghỉ {
                                  student.leaveRequestStatus === 'PENDING' ? '(Chờ duyệt)' : 
                                  student.leaveRequestStatus === 'APPROVED' ? '(Đã duyệt)' : '(Từ chối)'
                                }
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
      ) : (
        <TrackerGrid>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <TrackerCard key={student.id} $status={student.attendanceStatus}>
                <TrackerCardHeader>
                  <StudentProfileCell>
                    <StudentAvatar>
                      <img src={student.avatar} alt={student.name} />
                    </StudentAvatar>
                    <StudentMeta>
                      <StudentName>{student.name}</StudentName>
                      <StudentIdBadge>ID: {student.id}</StudentIdBadge>
                    </StudentMeta>
                  </StudentProfileCell>
                  <TrackerStatusBadge $status={student.attendanceStatus}>
                    {student.attendanceStatus === 'PRESENT' ? 'Có mặt' : 
                     student.attendanceStatus === 'PERMISSION_ABSENCE' ? 'Vắng phép' : 'Không phép'}
                  </TrackerStatusBadge>
                </TrackerCardHeader>

                <TrackerCardBody>
                  {student.attendanceStatus === 'PRESENT' && (
                    <>
                      <TrackerInfoRow>
                        <TrackerInfoLabel>Thời gian đến lớp</TrackerInfoLabel>
                        <TrackerInfoValue $highlight="green">{student.arrivalTime || 'Chưa cập nhật'}</TrackerInfoValue>
                      </TrackerInfoRow>
                      <TrackerInfoRow>
                        <TrackerInfoLabel>Ghi chú sức khỏe</TrackerInfoLabel>
                        <TrackerInfoValue>{student.healthNote || 'Khỏe mạnh bình thường'}</TrackerInfoValue>
                      </TrackerInfoRow>
                    </>
                  )}

                  {student.attendanceStatus === 'PERMISSION_ABSENCE' && (
                    <>
                      <TrackerInfoRow>
                        <TrackerInfoLabel>Lý do xin nghỉ</TrackerInfoLabel>
                        <TrackerInfoValue $highlight="amber">{student.leaveRequestReason || student.healthNote || 'Xin nghỉ học có phép'}</TrackerInfoValue>
                      </TrackerInfoRow>
                      <TrackerInfoRow>
                        <TrackerInfoLabel>Đơn xin nghỉ từ phụ huynh</TrackerInfoLabel>
                        <TrackerInfoValue>
                          {student.leaveRequestId ? (
                            <LeaveRequestBadge onClick={() => handleSelectLeaveRequest(student.leaveRequestId!)}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                              </svg>
                              Xem đơn & Chi tiết {
                                student.leaveRequestStatus === 'PENDING' ? '(Chờ duyệt)' : 
                                student.leaveRequestStatus === 'APPROVED' ? '(Đã duyệt)' : '(Từ chối)'
                              }
                            </LeaveRequestBadge>
                          ) : (
                            <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: '500' }}>
                              Không có đơn xin nghỉ
                            </span>
                          )}
                        </TrackerInfoValue>
                      </TrackerInfoRow>
                    </>
                  )}

                  {student.attendanceStatus === 'UNEXCUSED_ABSENCE' && (
                    <>
                      <TrackerInfoRow>
                        <TrackerInfoLabel>Trạng thái vắng mặt</TrackerInfoLabel>
                        <TrackerInfoValue $highlight="red">
                          {student.leaveRequestReason ? 'Không phép (Bị từ chối phép)' : 'Không phép (Chưa rõ lý do)'}
                        </TrackerInfoValue>
                      </TrackerInfoRow>
                      {student.leaveRequestReason && (
                        <TrackerInfoRow>
                          <TrackerInfoLabel>Lý do xin nghỉ (Bị từ chối)</TrackerInfoLabel>
                          <TrackerInfoValue style={{ color: '#ef4444', fontWeight: '500' }}>
                            {student.leaveRequestReason}
                          </TrackerInfoValue>
                        </TrackerInfoRow>
                      )}
                      {student.leaveRequestId && (
                        <TrackerInfoRow>
                          <TrackerInfoLabel>Đơn xin nghỉ từ phụ huynh</TrackerInfoLabel>
                          <TrackerInfoValue>
                            <LeaveRequestBadge onClick={() => handleSelectLeaveRequest(student.leaveRequestId!)}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                              </svg>
                              Xem đơn & Chi tiết (Từ chối)
                            </LeaveRequestBadge>
                          </TrackerInfoValue>
                        </TrackerInfoRow>
                      )}
                      <TrackerInfoRow>
                        <TrackerInfoLabel>Hành động cần thiết</TrackerInfoLabel>
                        <TrackerInfoValue style={{ marginTop: '4px' }}>
                          <CallParentBtn onClick={() => handleCallParent(student.name)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            Liên hệ phụ huynh ngay
                          </CallParentBtn>
                        </TrackerInfoValue>
                      </TrackerInfoRow>
                    </>
                  )}
                </TrackerCardBody>
              </TrackerCard>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: '#64748b', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              Không tìm thấy học sinh nào phù hợp.
            </div>
          )}
        </TrackerGrid>
      )}

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

      {/* Leave Requests List Modal */}
      <LeaveRequestsListModal
        isOpen={leaveRequestsListModalOpen}
        onClose={() => setLeaveRequestsListModalOpen(false)}
        leaveRequests={classLeaveRequests}
        onSelectRequest={(id) => {
          setLeaveRequestsListModalOpen(false);
          handleSelectLeaveRequest(id);
        }}
      />
    </AttendancePageContainer>
  );
}
export default AttendanceView;
