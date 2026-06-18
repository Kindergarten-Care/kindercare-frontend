'use client';

import React from 'react';
import { useAttendance } from './hooks';
import { LeaveRequestModal } from './components/LeaveRequestModal';
import { QuickAttendanceModal } from './components/QuickAttendanceModal';
import { LeaveRequestsListModal } from './components/LeaveRequestsListModal';
import { AttendanceService } from '@/services/attendance';
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

  const [viewMode, setViewMode] = React.useState<'EDIT' | 'TRACKER' | 'QR'>('TRACKER');

  interface QrCheckInEvent {
    studentId: string;
    studentName: string;
    parentName: string;
    relationship: string;
    checkInTime: string;
  }

  const [qrHistory, setQrHistory] = React.useState<QrCheckInEvent[]>([]);
  const [simSelectedStudentId, setSimSelectedStudentId] = React.useState<string>('');
  const [qrSuccessModal, setQrSuccessModal] = React.useState<{
    isOpen: boolean;
    studentName: string;
    parentName: string;
    relationship: string;
    checkInTime: string;
  } | null>(null);

  const [isCameraScanning, setIsCameraScanning] = React.useState<boolean>(false);
  const qrScannerRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const existingScript = document.getElementById('html5-qrcode-cdn');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'html5-qrcode-cdn';
        script.src = 'https://unpkg.com/html5-qrcode';
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, []);

  React.useEffect(() => {
    return () => {
      if (qrScannerRef.current && qrScannerRef.current.isScanning) {
        try {
          qrScannerRef.current.stop();
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  React.useEffect(() => {
    if (students && students.length > 0) {
      const presentWithTime = students.filter(s => s.attendanceStatus === 'PRESENT' && s.arrivalTime && s.arrivalTime !== '--:--');
      const mappedEvents: QrCheckInEvent[] = presentWithTime.map((s, index) => {
        const pNames = ['Anh Tuấn', 'Công Danh', 'Thanh Hải', 'Minh Đăng', 'Quang Vinh'];
        const relationships = ['Ba', 'Mẹ', 'Ông nội', 'Bà ngoại'];
        const pName = `Nguyễn ${pNames[index % pNames.length]}`;
        const rel = relationships[index % relationships.length];
        return {
          studentId: s.id,
          studentName: s.name,
          parentName: pName,
          relationship: rel,
          checkInTime: s.arrivalTime
        };
      });
      setQrHistory(mappedEvents);
    }
  }, [students]);

  const playBeepSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.value = 1000;
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        audioCtx.close();
      }, 150);
    } catch (err) {
      console.error('Audio beep failed', err);
    }
  };

  const handleQrCodeScanned = (decodedText: string) => {
    let studentId = '';
    let parentName = '';
    let relationship = '';

    try {
      const data = JSON.parse(decodedText);
      studentId = String(data.studentId);
      parentName = data.parentName || '';
      relationship = data.relationship || '';
    } catch (e) {
      const num = Number(decodedText.trim());
      if (!isNaN(num) && num > 0) {
        studentId = String(num);
      }
    }

    if (!studentId) {
      alert("Mã QR không đúng định dạng điểm danh!");
      return;
    }

    const student = students.find(s => s.id === studentId);
    if (!student) {
      alert(`Không tìm thấy học sinh với ID ${studentId} trong lớp này!`);
      return;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const finalParentName = parentName || (student.leaveRequestId ? 'Phụ huynh' : 'Người thân');
    const finalRelationship = relationship || 'Người đưa đón';

    playBeepSound();

    setQrSuccessModal({
      isOpen: true,
      studentName: student.name,
      parentName: finalParentName,
      relationship: finalRelationship,
      checkInTime: timeStr
    });

    setTimeout(() => {
      setQrSuccessModal(null);
    }, 2500);

    handleStatusChange(studentId, 'PRESENT');
    handleArrivalTimeChange(studentId, timeStr);

    const newEvent: QrCheckInEvent = {
      studentId,
      studentName: student.name,
      parentName: finalParentName,
      relationship: finalRelationship,
      checkInTime: timeStr
    };
    setQrHistory(prev => [newEvent, ...prev]);

    try {
      const updatedRecords = [{
        studentId: student.id,
        status: 'PRESENT' as const,
        arrivalTime: timeStr,
        healthNote: student.healthNote || ''
      }];
      AttendanceService.updateAttendance(selectedClassId || 'MN1', selectedDate, updatedRecords);
    } catch (e) {
      console.error('Auto save QR attendance failed', e);
    }
  };

  const handleStartCameraScan = () => {
    setIsCameraScanning(true);
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).Html5Qrcode) {
        try {
          const Html5QrcodeClass = (window as any).Html5Qrcode;
          const html5QrCode = new Html5QrcodeClass("reader");
          qrScannerRef.current = html5QrCode;

          html5QrCode.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: { width: 220, height: 220 }
            },
            (decodedText: string) => {
              html5QrCode.stop().then(() => {
                setIsCameraScanning(false);
                handleQrCodeScanned(decodedText);
              }).catch((err: any) => {
                console.error(err);
                setIsCameraScanning(false);
              });
            },
            () => {
              // Ignore failure frames
            }
          ).catch((err: any) => {
            console.error(err);
            alert("Không thể khởi động camera: " + err);
            setIsCameraScanning(false);
          });
        } catch (e) {
          console.error(e);
          alert("Lỗi cấu hình trình quét camera");
          setIsCameraScanning(false);
        }
      } else {
        alert("Thư viện quét camera chưa tải xong. Vui lòng thử lại sau vài giây.");
      }
    }, 300);
  };

  const handleStopCameraScan = () => {
    if (qrScannerRef.current) {
      try {
        if (qrScannerRef.current.isScanning) {
          qrScannerRef.current.stop().then(() => {
            setIsCameraScanning(false);
          }).catch((err: any) => {
            console.error(err);
            setIsCameraScanning(false);
          });
        } else {
          setIsCameraScanning(false);
        }
      } catch (e) {
        setIsCameraScanning(false);
      }
    } else {
      setIsCameraScanning(false);
    }
  };

  const handleSimulateQrScan = async (studentId: string) => {
    if (!studentId) return;
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const pNames = ['Anh Tuấn', 'Công Danh', 'Thanh Hải', 'Minh Đăng', 'Quang Vinh'];
    const relationships = ['Ba', 'Mẹ', 'Ông nội', 'Bà ngoại'];
    const mockParentName = `Nguyễn ${pNames[Math.floor(Math.random() * pNames.length)]}`;
    const mockRelationship = relationships[Math.floor(Math.random() * relationships.length)];

    playBeepSound();

    setQrSuccessModal({
      isOpen: true,
      studentName: student.name,
      parentName: mockParentName,
      relationship: mockRelationship,
      checkInTime: timeStr
    });

    setTimeout(() => {
      setQrSuccessModal(null);
    }, 2500);

    handleStatusChange(studentId, 'PRESENT');
    handleArrivalTimeChange(studentId, timeStr);

    const newEvent: QrCheckInEvent = {
      studentId,
      studentName: student.name,
      parentName: mockParentName,
      relationship: mockRelationship,
      checkInTime: timeStr
    };
    setQrHistory(prev => [newEvent, ...prev]);

    try {
      const updatedRecords = [{
        studentId: student.id,
        status: 'PRESENT' as const,
        arrivalTime: timeStr,
        healthNote: student.healthNote || ''
      }];
      await AttendanceService.updateAttendance(selectedClassId || 'MN1', selectedDate, updatedRecords);
    } catch (e) {
      console.error('Auto save QR attendance failed', e);
    }
  };
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
            <ViewModeBtn 
              $active={viewMode === 'QR'} 
              onClick={() => setViewMode('QR')}
            >
              Điểm danh QR
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
      {viewMode === 'EDIT' && (
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
      )}
      {viewMode === 'TRACKER' && (
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

      {/* QR Mode View Layout */}
      {viewMode === 'QR' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', marginTop: '24px' }}>
          {/* Left: QR Display & Simulator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* QR Card */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '16px', 
              padding: '32px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Mã QR Điểm Danh Hôm Nay
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b', maxWidth: '400px', marginBottom: '24px' }}>
                Phụ huynh quét mã này trên ứng dụng di động để điểm danh đưa con đến lớp.
              </p>
              
              {/* QR Image */}
              <div style={{ 
                padding: '16px', 
                backgroundColor: '#f8fafc', 
                borderRadius: '12px', 
                border: '1px solid #e2e8f0',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
              }}>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=0e793c&data=${encodeURIComponent(
                    JSON.stringify({
                      classId: selectedClassId,
                      date: selectedDate,
                      type: 'checkin',
                      token: `kc_qr_${selectedClassId}_${selectedDate}`
                    })
                  )}`} 
                  alt="QR Code Điểm Danh"
                  style={{ width: '200px', height: '200px' }}
                />
              </div>

              <span style={{ 
                marginTop: '16px', 
                fontSize: '0.875rem', 
                fontWeight: 600, 
                color: '#0e793c',
                backgroundColor: '#f0fdf4',
                padding: '6px 16px',
                borderRadius: '9999px',
                border: '1px solid #bbf7d0'
              }}>
                ● Mã QR hoạt động • Lớp {classes.find(c => c.classId === selectedClassId)?.className || ''}
              </span>
            </div>

            {/* Real Camera Scanner Card */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '16px', 
              padding: '24px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#0e793c' }}>
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                Quét Mã QR Bằng Camera (Thực Tế)
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                Kích hoạt camera của thiết bị giáo viên để quét trực tiếp mã QR do phụ huynh cung cấp.
              </p>
              
              <button 
                onClick={handleStartCameraScan}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#0e793c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.975rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(14, 121, 60, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                Mở Camera Quét Mã
              </button>
            </div>

            {/* QR Simulator Card */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '16px', 
              padding: '24px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#22c55e' }}>
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
                Trình Giả Lập Quét Mã QR Phụ Huynh (Kiểm Thử)
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '16px' }}>
                Chọn học sinh bên dưới để giả lập hành động phụ huynh quét mã QR điểm danh đưa trẻ đến lớp.
              </p>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <select 
                  value={simSelectedStudentId} 
                  onChange={(e) => setSimSelectedStudentId(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem',
                    color: '#1e293b',
                    outline: 'none',
                    backgroundColor: '#f8fafc'
                  }}
                >
                  <option value="">-- Chọn học sinh cần quét mã --</option>
                  {students
                    .filter(s => s.attendanceStatus !== 'PRESENT')
                    .map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.attendanceStatus === 'PERMISSION_ABSENCE' ? 'Vắng phép' : 'Chưa điểm danh'})</option>
                    ))
                  }
                </select>
                
                <button 
                  onClick={() => {
                    handleSimulateQrScan(simSelectedStudentId);
                    setSimSelectedStudentId('');
                  }}
                  disabled={!simSelectedStudentId}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: simSelectedStudentId ? '#0e793c' : '#cbd5e1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: simSelectedStudentId ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    boxShadow: simSelectedStudentId ? '0 4px 12px rgba(14, 121, 60, 0.2)' : 'none'
                  }}
                >
                  Giả Lập Quét QR
                </button>
              </div>
            </div>
          </div>

          {/* Right: QR History Feed */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '16px', 
            padding: '24px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            height: 'fit-content',
            maxHeight: '600px'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Lịch Sử Quét Mã QR</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                Hôm nay
              </span>
            </h3>

            <div style={{ 
              overflowY: 'auto', 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px',
              paddingRight: '4px'
            }}>
              {qrHistory.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b', fontSize: '0.875rem' }}>
                  Chưa có lượt quét QR nào trong ngày.
                </div>
              ) : (
                qrHistory.map((ev, idx) => (
                  <div key={`${ev.studentId}-${idx}`} style={{ 
                    display: 'flex', 
                    alignItems: 'start', 
                    gap: '12px', 
                    padding: '12px', 
                    borderRadius: '12px', 
                    backgroundColor: idx === 0 ? '#f0fdf4' : '#f8fafc',
                    border: idx === 0 ? '1px solid #bbf7d0' : '1px solid #e2e8f0',
                    transition: 'all 0.3s'
                  }}>
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%', 
                      backgroundColor: '#dcfce7', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#15803d',
                      flexShrink: 0
                    }}>
                      ✓
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
                        {ev.studentName}
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>
                        Phụ huynh: {ev.parentName} ({ev.relationship})
                      </p>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                      {ev.checkInTime}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* QR Check-in Success Popup */}
      {qrSuccessModal && qrSuccessModal.isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '32px',
            width: '90%',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e2e8f0',
            animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            {/* Animated Checkmark Circle */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#dcfce7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              color: '#15803d',
              fontSize: '2.5rem',
              boxShadow: '0 4px 10px rgba(21, 128, 61, 0.15)'
            }}>
              ✓
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              ĐIỂM DANH THÀNH CÔNG
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '24px' }}>
              Học sinh đã được quét mã check-in thành công.
            </p>

            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              border: '1px solid #e2e8f0',
              marginBottom: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Học sinh:</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>{qrSuccessModal.studentName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Phụ huynh:</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>{qrSuccessModal.parentName} ({qrSuccessModal.relationship})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Giờ check-in:</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#15803d' }}>{qrSuccessModal.checkInTime}</span>
              </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes scaleUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            `}} />
          </div>
        </div>
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
      {/* Camera Scanner Modal */}
      {isCameraScanning && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9998,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '24px',
            width: '90%',
            maxWidth: '500px',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Quét Mã QR Phụ Huynh
              </h3>
              <button 
                onClick={handleStopCameraScan}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                ✕
              </button>
            </div>
            
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
              Căn chỉnh mã QR của Phụ huynh nằm trong khung camera bên dưới.
            </p>

            {/* Video Reader Element */}
            <div style={{
              width: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#0f172a',
              position: 'relative',
              aspectRatio: '4/3',
              border: 'none'
            }}>
              <div id="reader" style={{ width: '100%', height: '100%' }}></div>
              
              {/* Overlay Laser Scan Frame */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                border: '2px dashed #22c55e',
                borderRadius: '8px',
                boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.5)',
                pointerEvents: 'none',
                zIndex: 10
              }}>
                {/* Scanner laser line */}
                <div style={{
                  width: '100%',
                  height: '2px',
                  backgroundColor: '#22c55e',
                  boxShadow: '0 0 8px #22c55e',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  animation: 'laserSweep 2s linear infinite'
                }}></div>
              </div>
            </div>

            <button 
              onClick={handleStopCameraScan}
              style={{
                padding: '10px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Hủy bỏ quét
            </button>

            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes laserSweep {
                0% { top: 0%; }
                50% { top: 100%; }
                100% { top: 0%; }
              }
              #reader, #reader-dashboard {
                border: none !important;
              }
              #reader__scan_region, #reader-dashboard__scan_region {
                border: none !important;
              }
            `}} />
          </div>
        </div>
      )}
    </AttendancePageContainer>
  );
}
export default AttendanceView;
