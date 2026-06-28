import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'styled-components';
import { theme } from '@kindercare/ui';
import * as S from './styles';
import { AttendanceService } from '../../services/attendance';
import { QrScannerModal } from '../../components/QrScannerModal';
import { Student, LeaveRequest } from '../../config/types/attendance';

const GRADS = [
  'linear-gradient(135deg, #00794A, #005A36)',
  'linear-gradient(135deg, #3B82F6, #2563EB)',
  'linear-gradient(135deg, #A78BFA, #8B5CF6)',
  'linear-gradient(135deg, #FB923C, #F97316)',
  'linear-gradient(135deg, #34D399, #059669)',
  'linear-gradient(135deg, #F472B6, #DB2777)'
];

const PROOF_BGS = [
  'linear-gradient(135deg, #64748B, #334155)',
  'linear-gradient(135deg, #0EA5E9, #0369A1)',
  'linear-gradient(135deg, #14B8A6, #0F766E)'
];

const getAvatarGrad = (name: string) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return GRADS[h % GRADS.length];
};

const getAvatarInitial = (name: string) => {
  const p = name.trim().split(' ');
  return p[p.length - 1]?.[0]?.toUpperCase() || '?';
};

const ST = {
  present: {
    label: 'Có mặt',
    c: '#005A36',
    bg: '#E6F3ED',
    bd: '#C7E3D5',
    dot: '#005A36',
    mini: '✓',
    dim: false
  },
  excused: {
    label: 'Vắng có phép',
    c: '#4B5563',
    bg: '#F1F4F1',
    bd: '#E6EEE9',
    dot: '#9CA3AF',
    mini: '·',
    dim: true
  },
  unexcused: {
    label: 'Vắng không phép',
    c: '#DC2626',
    bg: '#FEE2E2',
    bd: '#FCA5A5',
    dot: '#DC2626',
    mini: '✕',
    dim: true
  },
  absent: {
    label: 'Chưa điểm danh',
    c: '#6B7280',
    bg: '#F3F4F6',
    bd: '#E5E7EB',
    dot: '#9CA3AF',
    mini: '·',
    dim: true
  }
};

export const AttendanceView: React.FC = () => {
  const theme = useTheme();

  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'time' | 'pending_leave'>('name');
  const [statusFilter, setStatusFilter] = useState<'all' | 'present' | 'excused' | 'unexcused' | 'absent'>('all');
  const [dateMs, setDateMs] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  });
  
  const [students, setStudents] = useState<Student[]>([]);
  const [allLeaves, setAllLeaves] = useState<LeaveRequest[]>([]);
  const [classId, setClassId] = useState<string>('');
  const [className, setClassName] = useState<string>('');
  const [toasts, setToasts] = useState<{ id: string; text: string }[]>([]);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Redesign states
  const [leaveDrawerOpen, setLeaveDrawerOpen] = useState(false);
  const [highlightedLeaveId, setHighlightedLeaveId] = useState<string | null>(null);
  const [proofOpenId, setProofOpenId] = useState<string | null>(null);
  const [monthOffset, setMonthOffset] = useState<number>(0);

  // QR Scanner State
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);

  // Quick menu popover states
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [reasonDraft, setReasonDraft] = useState('');
  const [menuStage, setMenuStage] = useState<'options' | 'reason'>('options');

  const toastIdCounter = useRef(0);
  const popoverRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const fetchAttendance = async (cId: string, dMs: number) => {
    try {
      const dateObj = new Date(dMs);
      const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
      const data = await AttendanceService.getDailyAttendance(cId, dateStr);
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
      addToast('Lỗi khi tải dữ liệu điểm danh');
    }
  };

  const fetchLeaves = async () => {
    try {
      const leavesData = await AttendanceService.getAllLeaveRequests();
      setAllLeaves(leavesData);
    } catch (error) {
      console.error('Failed to fetch leave requests:', error);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const classes = await AttendanceService.getTeacherClasses();
        if (classes.length > 0) {
          setClassId(String(classes[0].classId));
          setClassName(classes[0].className);
          fetchAttendance(String(classes[0].classId), dateMs);
          fetchLeaves();
        }
      } catch (error) {
        console.error('Failed to get classes:', error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (classId) {
      fetchAttendance(classId, dateMs);
    }
  }, [dateMs]);

  // Click outside menu or drawer to close
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (popoverRef.current && popoverRef.current.contains(target)) {
        return;
      }
      if (target.closest('.badge-btn')) {
        return;
      }
      if (openMenuId) setOpenMenuId(null);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [openMenuId]);

  // Keyboard shortcut listener (Escape key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (proofOpenId) setProofOpenId(null);
        else if (leaveDrawerOpen) setLeaveDrawerOpen(false);
        else if (openMenuId) setOpenMenuId(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [proofOpenId, leaveDrawerOpen, openMenuId]);

  const addToast = (text: string) => {
    const id = 't' + (toastIdCounter.current++);
    setToasts(prev => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleProcessLeaveRequest = async (requestId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      await AttendanceService.processLeaveRequest(requestId, status);
      
      const targetStudent = students.find(s => s.leaveRequestId === requestId);
      if (targetStudent) {
        const dateObj = new Date(dateMs);
        const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
        const newDomainStatus = status === 'APPROVED' ? 'PERMISSION_ABSENCE' : 'UNEXCUSED_ABSENCE';
        
        await AttendanceService.updateAttendance(classId, dateStr, [{
          studentId: targetStudent.id,
          status: newDomainStatus,
          arrivalTime: undefined,
          healthNote: targetStudent.healthNote || ''
        }]);
      }

      setStudents(prev => prev.map(s => {
        if (s.leaveRequestId === requestId) {
          const newDomainStatus = status === 'APPROVED' ? 'PERMISSION_ABSENCE' : (s.attendanceStatus === 'PERMISSION_ABSENCE' ? 'UNEXCUSED_ABSENCE' : s.attendanceStatus);
          return {
            ...s,
            leaveRequestStatus: status,
            attendanceStatus: newDomainStatus,
            arrivalTime: newDomainStatus !== 'PRESENT' ? '--:--' : s.arrivalTime
          };
        }
        return s;
      }));

      // Update leaves list local state
      setAllLeaves(prev => prev.map(l => l.id === requestId ? { ...l, status } : l));
      addToast(status === 'APPROVED' ? 'Đã duyệt đơn nghỉ phép' : 'Đã từ chối đơn nghỉ phép');
    } catch (err: any) {
      console.error('Process leave request failed:', err);
      const msg = err.response?.data?.message || err.message || 'Lỗi xử lý đơn';
      addToast(`Lỗi: ${msg}`);
    }
  };

  const handleUpdateStatus = async (studentId: string, newStatus: string, reason?: string) => {
    if (!classId) return;
    try {
      const dateObj = new Date(dateMs);
      const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
      
      const payload: any = {
        studentId,
        date: dateStr,
        status: newStatus
      };

      if (newStatus === 'Present') {
        const now = new Date();
        payload.arrivalTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      }
      
      if (reason) {
        payload.notes = reason;
      }

      let newDomainStatus: 'PRESENT'|'PERMISSION_ABSENCE'|'UNEXCUSED_ABSENCE' = 'PRESENT';
      if (newStatus === 'Excused') newDomainStatus = 'PERMISSION_ABSENCE';
      if (newStatus === 'Absent') newDomainStatus = 'UNEXCUSED_ABSENCE';

      await AttendanceService.updateAttendance(classId, dateStr, [{
        studentId,
        status: newDomainStatus,
        arrivalTime: payload.arrivalTime,
        healthNote: reason
      }]);
      
      const targetStudent = students.find(s => s.id === studentId);
      let newLeaveReqStatus = targetStudent?.leaveRequestStatus;

      if (targetStudent && targetStudent.leaveRequestId && newDomainStatus !== 'PRESENT') {
        const syncActionStatus = newDomainStatus === 'PERMISSION_ABSENCE' ? 'APPROVED' : 'REJECTED';
        try {
          await AttendanceService.processLeaveRequest(targetStudent.leaveRequestId, syncActionStatus);
          newLeaveReqStatus = syncActionStatus;
          
          setAllLeaves(prev => prev.map(l => l.id === targetStudent.leaveRequestId ? { ...l, status: syncActionStatus } : l));
        } catch (e) {
          console.error('Lỗi tự động đồng bộ trạng thái đơn:', e);
        }
      }
      
      setStudents(prev => prev.map(s => {
        if (s.id === studentId) {
          return {
            ...s,
            attendanceStatus: newDomainStatus,
            arrivalTime: payload.arrivalTime || s.arrivalTime,
            healthNote: reason || s.healthNote,
            leaveRequestStatus: newLeaveReqStatus
          };
        }
        return s;
      }));
      
      const shortName = targetStudent?.name.split(' ').slice(-1)[0] || '';
      addToast(`Đã cập nhật ${shortName} → ${ST[newDomainStatus === 'PRESENT' ? 'present' : (newDomainStatus === 'PERMISSION_ABSENCE' ? 'excused' : 'unexcused')].label}`);
      setOpenMenuId(null);
    } catch (err: any) {
      console.error('Update failed:', err);
      const msg = err.response?.data?.message || err.message || 'Lỗi cập nhật';
      addToast(`Lỗi: ${msg}`);
    }
  };

  const getStatusKey = (s: Student): 'present' | 'excused' | 'unexcused' | 'absent' => {
    if (s.attendanceStatus === 'PRESENT') return 'present';
    if (s.attendanceStatus === 'PERMISSION_ABSENCE') return 'excused';
    if (s.attendanceStatus === 'UNEXCUSED_ABSENCE') return 'unexcused';
    return 'absent';
  };

  const isFuture = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateMs > today.getTime();
  };

  const handleReasonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reason = reasonDraft.trim();
    if (!reason) {
      addToast('Vui lòng nhập lý do xin phép!');
      return;
    }
    if (openMenuId) {
      handleUpdateStatus(openMenuId, 'Excused', reason);
    }
  };

  const prevMonth = () => setMonthOffset(prev => prev - 1);
  const nextMonth = () => setMonthOffset(prev => prev + 1);

  const exportCSV = () => {
    const rows = [['Mã HS', 'Học sinh', 'Trạng thái', 'Giờ đến', 'Ghi chú']];
    students.forEach(s => {
      const key = getStatusKey(s);
      rows.push([
        s.id.substring(0, 8), 
        s.name, 
        ST[key].label, 
        s.arrivalTime && s.arrivalTime !== '--:--' ? s.arrivalTime : '', 
        s.healthNote || s.leaveRequestReason || ''
      ]);
    });
    const csv = '\ufeff' + rows.map(r => r.map(c => '"' + c + '"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); 
    a.href = url; 
    a.download = `diem-danh-lop-${className || 'lop'}.csv`; 
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    addToast('📄 Đã xuất báo cáo điểm danh');
  };

  // Calculations for KPIs
  const stTotal = students.length;
  const cPresent = students.filter(s => s.attendanceStatus === 'PRESENT').length;
  const cExcused = students.filter(s => s.attendanceStatus === 'PERMISSION_ABSENCE').length;
  const cUnexcused = students.filter(s => s.attendanceStatus === 'UNEXCUSED_ABSENCE').length;
  const cNotYet = students.filter(s => s.attendanceStatus === 'NOT_YET' || !s.attendanceStatus).length;
  const rate = stTotal > 0 ? Math.round((cPresent / stTotal) * 100) : 0;

  // Donut chart logic
  const a1 = stTotal > 0 ? (cPresent / stTotal) * 360 : 0;
  const a2 = stTotal > 0 ? a1 + (cExcused / stTotal) * 360 : 0;
  const a3 = stTotal > 0 ? a2 + (cUnexcused / stTotal) * 360 : 0;
  const donutGradient = stTotal > 0 
    ? `conic-gradient(#005A36 0deg ${a1}deg, #9CA3AF ${a1}deg ${a2}deg, #DC2626 ${a2}deg ${a3}deg, #E5E7EB ${a3}deg 360deg)`
    : '#E2E8F0';

  // Format date display
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(dateMs);
  let dateLabel = selectedDate.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  dateLabel = dateLabel.charAt(0).toUpperCase() + dateLabel.slice(1);
  if (dateMs === today.getTime()) {
    dateLabel = 'Hôm nay · ' + selectedDate.toLocaleDateString('vi-VN', { weekday: 'long' });
  }

  // Filter & Sort student rows
  const filteredByStatus = students.filter(s => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'present') return s.attendanceStatus === 'PRESENT';
    if (statusFilter === 'excused') return s.attendanceStatus === 'PERMISSION_ABSENCE';
    if (statusFilter === 'unexcused') return s.attendanceStatus === 'UNEXCUSED_ABSENCE';
    if (statusFilter === 'absent') return s.attendanceStatus === 'NOT_YET' || !s.attendanceStatus;
    return true;
  });

  const filteredAndSearched = filteredByStatus.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));

  const sortedStudents = (() => {
    const copy = [...filteredAndSearched];
    
    const getSortKeys = (fullName: string) => {
      const parts = fullName.trim().split(/\s+/);
      const givenName = parts[parts.length - 1] || '';
      const rest = parts.slice(0, -1).join(' ');
      return { givenName, rest };
    };

    const sortByName = (a: Student, b: Student) => {
      const aKeys = getSortKeys(a.name);
      const bKeys = getSortKeys(b.name);
      const compGiven = aKeys.givenName.localeCompare(bKeys.givenName, 'vi', { sensitivity: 'base' });
      if (compGiven !== 0) return compGiven;
      return aKeys.rest.localeCompare(bKeys.rest, 'vi', { sensitivity: 'base' });
    };

    if (sortBy === 'name') {
      return copy.sort(sortByName);
    } else if (sortBy === 'time') {
      return copy.sort((a, b) => {
        const aTime = a.arrivalTime && /^\d{2}:\d{2}$/.test(a.arrivalTime) ? a.arrivalTime : '99:99';
        const bTime = b.arrivalTime && /^\d{2}:\d{2}$/.test(b.arrivalTime) ? b.arrivalTime : '99:99';
        if (aTime !== bTime) return aTime.localeCompare(bTime);
        return sortByName(a, b);
      });
    } else if (sortBy === 'pending_leave') {
      return copy.sort((a, b) => {
        const aPending = a.leaveRequestStatus === 'PENDING' ? 1 : 0;
        const bPending = b.leaveRequestStatus === 'PENDING' ? 1 : 0;
        if (aPending !== bPending) return bPending - aPending;
        return sortByName(a, b);
      });
    }
    return copy;
  })();

  // Weekly Trend Chart Data
  const todayDow = new Date().getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const weekRaw = [
    { dow: 'T2', pct: todayDow === 1 ? rate : 95, off: false },
    { dow: 'T3', pct: todayDow === 2 ? rate : 90, off: false },
    { dow: 'T4', pct: todayDow === 3 ? rate : 100, off: false },
    { dow: 'T5', pct: todayDow === 4 ? rate : 85, off: false },
    { dow: 'T6', pct: todayDow === 5 ? rate : 92, off: false },
    { dow: 'T7', pct: 0, off: true }
  ];

  const weekTrend = weekRaw.map((w, i) => {
    const activeDay = i === (todayDow === 0 ? 6 : todayDow - 1);
    const isOff = w.off;
    const h = isOff ? 6 : Math.max(10, (w.pct / 100) * 88);
    const barBg = isOff 
      ? '#EEF4F0' 
      : activeDay 
        ? 'linear-gradient(180deg, #00794A, #005A36)' 
        : '#A7C9B6';
    return {
      dow: w.dow,
      pctText: isOff ? '–' : `${w.pct}%`,
      h,
      barBg,
      activeDay,
    };
  });

  // Calendar calculations
  const baseDate = new Date();
  baseDate.setDate(1);
  const currentMonthDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + monthOffset, 1);
  const calendarYear = currentMonthDate.getFullYear();
  const calendarMonth = currentMonthDate.getMonth();

  const calendarCells = (() => {
    const first = new Date(calendarYear, calendarMonth, 1);
    const startDow = (first.getDay() + 6) % 7; // Mon=0
    const days = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const todayZero = new Date();
    todayZero.setHours(0, 0, 0, 0);

    const cells: ({ day: number; weekend: boolean; isToday: boolean; isFuture: boolean; kind: 'none' | 'full' | 'some' | 'high' } | null)[] = [];
    for (let i = 0; i < startDow; i++) {
      cells.push(null);
    }
    for (let d = 1; d <= days; d++) {
      const date = new Date(calendarYear, calendarMonth, d);
      const dow = (date.getDay() + 6) % 7;
      const weekend = dow >= 5;
      const isToday = date.getTime() === todayZero.getTime();
      const isFuture = date.getTime() > todayZero.getTime();
      
      let kind: 'none' | 'full' | 'some' | 'high' = 'none';
      if (!weekend && !isFuture) {
        const r = (d * 13 + calendarMonth * 7) % 100;
        if (r < 8) kind = 'high';
        else if (r < 26) kind = 'some';
        else kind = 'full';
      }
      cells.push({ day: d, weekend, isToday, isFuture, kind });
    }
    return cells;
  })();

  const calendarMonthLabel = `Tháng ${calendarMonth + 1} / ${calendarYear}`;
  const calKindColor = { full: '#005A36', some: '#D97706', high: '#DC2626', none: 'transparent' };

  // Pending leaves count
  const pendingLeavesCount = allLeaves.filter(l => l.status === 'PENDING').length;

  // Selected proof object
  const selectedProof = proofOpenId ? allLeaves.find(l => l.id === proofOpenId) : null;

  return (
    <S.PageContainer>
      {/* HEADER */}
      <S.HeaderRow>
        <S.HeaderLeft>
          <S.SubTitle>Lớp {className || '...'} · Tổng quan điểm danh</S.SubTitle>
          <S.Title>{dateLabel}</S.Title>
        </S.HeaderLeft>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setIsQrScannerOpen(true)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              height: '46px',
              padding: '0 18px',
              borderRadius: '12px',
              border: 'none',
              background: '#111827',
              color: '#fff',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 8px 18px -6px rgba(17, 24, 39, 0.4)',
              transition: 'transform 0.15s'
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="3"></rect><rect x="14" y="7" width="3" height="3"></rect><rect x="7" y="14" width="3" height="3"></rect><rect x="14" y="14" width="3" height="3"></rect></svg>
            Quét mã QR
          </button>
          <button 
            onClick={() => setLeaveDrawerOpen(true)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              height: '46px',
              padding: '0 18px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #00794A, #005A36)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 8px 18px -6px rgba(0, 90, 54, 0.4)',
              transition: 'transform 0.15s'
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
            Đơn xin nghỉ
            {pendingLeavesCount > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '22px', height: '22px', padding: '0 6px', borderRadius: '999px', background: '#fff', color: '#005A36', fontSize: '12px', fontWeight: 800 }}>
                {pendingLeavesCount}
              </span>
            )}
          </button>
          <S.ExportButton onClick={exportCSV}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '17px', height: '17px', color: '#005A36' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Xuất
          </S.ExportButton>
        </div>
      </S.HeaderRow>

      {/* KPI ROW */}
      <S.KpiGrid>
        <S.KpiCard>
          <S.KpiIconBlock $bg="#EEF2FF" $color="#4F46E5">
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path></svg>
          </S.KpiIconBlock>
          <S.KpiMeta>
            <S.KpiLabel>Sĩ số lớp</S.KpiLabel>
            <S.KpiValue>{stTotal}</S.KpiValue>
          </S.KpiMeta>
        </S.KpiCard>

        <S.KpiCard>
          <S.KpiIconBlock $bg="#E6F3ED" $color="#005A36">
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </S.KpiIconBlock>
          <S.KpiMeta>
            <S.KpiLabel>Có mặt</S.KpiLabel>
            <S.KpiValue $color="#005A36">{cPresent}</S.KpiValue>
          </S.KpiMeta>
        </S.KpiCard>

        <S.KpiCard>
          <S.KpiIconBlock $bg="#F1F4F1" $color="#4B5563">
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          </S.KpiIconBlock>
          <S.KpiMeta>
            <S.KpiLabel>Vắng có phép</S.KpiLabel>
            <S.KpiValue $color="#4B5563">{cExcused}</S.KpiValue>
          </S.KpiMeta>
        </S.KpiCard>

        <S.KpiCard $borderColor="#FCA5A5" style={{ background: '#FEF2F2' }}>
          <S.KpiIconBlock $bg="#FEE2E2" $color="#DC2626">
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </S.KpiIconBlock>
          <S.KpiMeta>
            <S.KpiLabel>Vắng không phép</S.KpiLabel>
            <S.KpiValue $color="#DC2626">{cUnexcused}</S.KpiValue>
          </S.KpiMeta>
        </S.KpiCard>

        <S.KpiCard $borderColor="#E5E7EB" style={{ background: '#F9FAFB' }}>
          <S.KpiIconBlock $bg="#F3F4F6" $color="#6B7280">
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </S.KpiIconBlock>
          <S.KpiMeta>
            <S.KpiLabel>Chưa điểm danh</S.KpiLabel>
            <S.KpiValue $color="#6B7280">{cNotYet}</S.KpiValue>
          </S.KpiMeta>
        </S.KpiCard>
      </S.KpiGrid>

      {/* CHART + CALENDAR */}
      <S.ChartCalendarGrid>
        {/* CHART SECTION */}
        <section className="kc-bento" style={{ background: '#fff', border: '1px solid #E6EEE9', borderRadius: '16px', boxShadow: '0 4px 18px -4px rgba(0,90,54,.06)', padding: '22px' }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, Inter, sans-serif', fontWeight: 700, fontSize: '16px', marginBottom: '18px', color: '#1F2937' }}>
            Tỷ lệ chuyên cần
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '26px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 'none', width: '150px', height: '150px', borderRadius: '50%', background: donutGradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', width: '104px', height: '104px', borderRadius: '50%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 2px 6px rgba(0,90,54,.05)' }}>
                <span style={{ fontFamily: 'Plus Jakarta Sans, Inter, sans-serif', fontSize: '32px', fontWeight: 800, color: '#005A36', letterSpacing: '-.02em', lineHeight: 1 }}>{rate}%</span>
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: '3px' }}>Hôm nay</span>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '11px', height: '11px', borderRadius: '3px', background: '#005A36' }}></span>
                <span style={{ flex: 1, fontSize: '13px', color: '#374151', fontWeight: 500 }}>Có mặt</span>
                <span style={{ fontFamily: 'Plus Jakarta Sans, Inter, sans-serif', fontSize: '16px', fontWeight: 800, color: '#005A36', fontVariantNumeric: 'tabular-nums' }}>{cPresent}</span>
                <span style={{ fontSize: '12px', color: '#9CA3AF', width: '42px', textAlign: 'right' }}>{stTotal > 0 ? Math.round(cPresent / stTotal * 100) : 0}%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '11px', height: '11px', borderRadius: '3px', background: '#9CA3AF' }}></span>
                <span style={{ flex: 1, fontSize: '13px', color: '#374151', fontWeight: 500 }}>Vắng có phép</span>
                <span style={{ fontFamily: 'Plus Jakarta Sans, Inter, sans-serif', fontSize: '16px', fontWeight: 800, color: '#4B5563', fontVariantNumeric: 'tabular-nums' }}>{cExcused}</span>
                <span style={{ fontSize: '12px', color: '#9CA3AF', width: '42px', textAlign: 'right' }}>{stTotal > 0 ? Math.round(cExcused / stTotal * 100) : 0}%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '11px', height: '11px', borderRadius: '3px', background: '#DC2626' }}></span>
                <span style={{ flex: 1, fontSize: '13px', color: '#374151', fontWeight: 500 }}>Vắng không phép</span>
                <span style={{ fontFamily: 'Plus Jakarta Sans, Inter, sans-serif', fontSize: '16px', fontWeight: 800, color: '#DC2626', fontVariantNumeric: 'tabular-nums' }}>{cUnexcused}</span>
                <span style={{ fontSize: '12px', color: '#9CA3AF', width: '42px', textAlign: 'right' }}>{stTotal > 0 ? Math.round(cUnexcused / stTotal * 100) : 0}%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '11px', height: '11px', borderRadius: '3px', background: '#E5E7EB' }}></span>
                <span style={{ flex: 1, fontSize: '13px', color: '#374151', fontWeight: 500 }}>Chưa điểm danh</span>
                <span style={{ fontFamily: 'Plus Jakarta Sans, Inter, sans-serif', fontSize: '16px', fontWeight: 800, color: '#6B7280', fontVariantNumeric: 'tabular-nums' }}>{cNotYet}</span>
                <span style={{ fontSize: '12px', color: '#9CA3AF', width: '42px', textAlign: 'right' }}>{stTotal > 0 ? Math.round(cNotYet / stTotal * 100) : 0}%</span>
              </div>
            </div>
          </div>

          <S.WeeklyTrendContainer>
            <S.WeeklyTrendHeader>
              <S.WeeklyTrendTitle>Xu hướng tuần này</S.WeeklyTrendTitle>
              <S.WeeklyTrendSubtitle>% có mặt theo ngày</S.WeeklyTrendSubtitle>
            </S.WeeklyTrendHeader>
            <S.WeeklyTrendBars>
              {weekTrend.map((w, index) => (
                <S.WeeklyBarCol key={index}>
                  <S.WeeklyBarVal $active={w.activeDay}>{w.pctText}</S.WeeklyBarVal>
                  <S.WeeklyBarGraphic $h={w.h} $bg={w.barBg} />
                  <S.WeeklyBarLabel $active={w.activeDay}>{w.dow}</S.WeeklyBarLabel>
                </S.WeeklyBarCol>
              ))}
            </S.WeeklyTrendBars>
          </S.WeeklyTrendContainer>
        </section>

        {/* CALENDAR SECTION */}
        <S.CalendarCard>
          <S.CalendarHeaderRow>
            <S.CalendarMonthLabel>{calendarMonthLabel}</S.CalendarMonthLabel>
            <S.CalendarNavButtons>
              <S.CalendarNavBtn onClick={prevMonth}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </S.CalendarNavBtn>
              <S.CalendarNavBtn onClick={nextMonth}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </S.CalendarNavBtn>
            </S.CalendarNavButtons>
          </S.CalendarHeaderRow>

          <S.CalendarDowsHeader>
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d, index) => (
              <S.CalendarDowLabel key={index}>{d}</S.CalendarDowLabel>
            ))}
          </S.CalendarDowsHeader>

          <S.CalendarDaysGrid>
            {calendarCells.map((c, index) => {
              if (!c) return <div key={index} style={{ aspectRatio: '1' }} />;
              return (
                <S.CalendarDayCell 
                  key={index} 
                  $isToday={c.isToday} 
                  $isFuture={c.isFuture} 
                  $weekend={c.weekend}
                >
                  {c.day}
                  {c.kind !== 'none' && !c.isToday && (
                    <S.CalendarDayDot $color={calKindColor[c.kind]} />
                  )}
                </S.CalendarDayCell>
              );
            })}
          </S.CalendarDaysGrid>

          <S.CalendarLegend>
            <S.CalendarLegendItem>
              <S.CalendarLegendDot $color="#005A36" />
              Đầy đủ
            </S.CalendarLegendItem>
            <S.CalendarLegendItem>
              <S.CalendarLegendDot $color="#D97706" />
              Có vắng
            </S.CalendarLegendItem>
            <S.CalendarLegendItem>
              <S.CalendarLegendDot $color="#DC2626" />
              Vắng nhiều
            </S.CalendarLegendItem>
            <S.CalendarLegendItem>
              <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '3px', background: '#005A36' }}></span>
              Hôm nay
            </S.CalendarLegendItem>
          </S.CalendarLegend>
        </S.CalendarCard>
      </S.ChartCalendarGrid>

      {/* STUDENT ROSTER LIST */}
      <section style={{ background: '#fff', border: '1px solid #E6EEE9', borderRadius: '16px', boxShadow: '0 4px 18px -4px rgba(0, 90, 54, 0.06)', padding: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', padding: '14px 16px 12px' }}>
          <span style={{ fontFamily: 'Plus Jakarta Sans, Inter, sans-serif', fontWeight: 700, fontSize: '16px', color: '#1F2937' }}>
            Danh sách bé
          </span>
          <div style={{ display: 'flex', background: '#F1F4F1', border: '1px solid #E6EEE9', borderRadius: '11px', padding: '3px', gap: '3px' }}>
            {[
              { key: 'all', label: 'Tất cả', count: stTotal },
              { key: 'present', label: 'Có mặt', count: cPresent },
              { key: 'excused', label: 'Có phép', count: cExcused },
              { key: 'unexcused', label: 'Không phép', count: cUnexcused },
              { key: 'absent', label: 'Chưa điểm danh', count: cNotYet }
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setStatusFilter(f.key as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  height: '34px',
                  padding: '0 13px',
                  borderRadius: '9px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: statusFilter === f.key ? 700 : 600,
                  fontSize: '12.5px',
                  whiteSpace: 'nowrap',
                  background: statusFilter === f.key ? '#fff' : 'transparent',
                  color: statusFilter === f.key ? '#005A36' : '#6B7280',
                  boxShadow: statusFilter === f.key ? '0 2px 8px rgba(0, 90, 54, 0.1)' : 'none'
                }}
              >
                {f.label} <span style={{ opacity: 0.7 }}>{f.count}</span>
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '42px', padding: '0 14px', borderRadius: '11px', background: '#F8FBF9', border: '1px solid #E6EEE9', minWidth: '200px' }}>
            <span style={{ flex: 'none', display: 'flex', width: '17px', height: '17px', color: '#9CA3AF' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span>
            <input 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              placeholder="Tìm bé…" 
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: '13.5px', color: '#1F2937' }} 
            />
          </div>
        </div>

        <S.ToolbarRow style={{ borderBottom: '1px solid #EEF4F0', paddingTop: 0 }}>
          <div style={{ fontSize: '13.5px', color: theme.colors.muted, fontWeight: 600 }}>
            Hiển thị <span style={{ color: theme.colors.fg, fontWeight: 800 }}>{sortedStudents.length}</span> / {stTotal} bé
          </div>
          <S.SortControl>
            <S.SortLabel>Sắp xếp:</S.SortLabel>
            <S.SortSelect value={sortBy} onChange={e => setSortBy(e.target.value as any)}>
              <option value="name">Tên từ A → Z</option>
              <option value="time">Giờ điểm danh</option>
              <option value="pending_leave">Đơn chưa duyệt</option>
            </S.SortSelect>
          </S.SortControl>
        </S.ToolbarRow>

        {isFuture() ? (
          <S.FutureState>
            <span style={{ fontSize: '52px' }}>🗓️</span>
            <div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: theme.colors.fg }}>Chưa có dữ liệu điểm danh</div>
              <div style={{ fontSize: '13.5px', color: theme.colors.muted, marginTop: '5px' }}>Ngày trong tương lai — dữ liệu sẽ xuất hiện khi các bé check-in.</div>
            </div>
            <S.NavButton 
              $today 
              style={{ flex: 'none', width: 'auto', padding: '0 24px', height: '42px' }} 
              onClick={() => {
                const d = new Date(); 
                d.setHours(0,0,0,0); 
                setDateMs(d.getTime());
              }}
            >
              ← Về hôm nay
            </S.NavButton>
          </S.FutureState>
        ) : sortedStudents.length === 0 ? (
          <S.NoResultsState>
            <span style={{ fontSize: '46px' }}>🔍</span>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Không tìm thấy bé nào khớp “{query}”</span>
          </S.NoResultsState>
        ) : (
          <>
            <S.TableHeader style={{ borderBottom: '1px solid #EEF4F0' }}>
              <span>Học sinh</span>
              <span>Giờ đến</span>
              <span>Trạng thái</span>
              <span className="kc-hidecol">Ghi chú</span>
            </S.TableHeader>

            <S.TableContainer>
              {sortedStudents.map((s, index) => {
                const sk = getStatusKey(s);
                const st = ST[sk];
                const grad = getAvatarGrad(s.name);
                const initial = getAvatarInitial(s.name);
                const present = sk === 'present';
                const hasError = imageErrors[s.id];
                const showImg = s.avatar && !hasError;
                
                return (
                  <S.Tr key={`${s.id}-${index}`} style={{ borderBottom: '1px solid #F3F6F4', position: 'relative', zIndex: openMenuId === s.id ? 100 : 1 }} className="kc-row">
                    <S.StudentInfo>
                      <S.StudentAvatar $grad={grad} $dim={st.dim} className="display">
                        {showImg ? (
                          <S.StudentAvatarImg 
                            src={s.avatar} 
                            alt={s.name} 
                            onError={() => setImageErrors(prev => ({ ...prev, [s.id]: true }))}
                          />
                        ) : (
                          initial
                        )}
                        <span style={{ position: 'absolute', right: '-2px', bottom: '-2px', width: '15px', height: '15px', borderRadius: '50%', background: st.dot, boxShadow: '0 0 0 2.5px #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '9px', fontWeight: 800 }}>
                          {st.mini}
                        </span>
                      </S.StudentAvatar>
                      <S.StudentMeta>
                        <S.StudentName>{s.name}</S.StudentName>
                        <S.StudentCode>{s.id.substring(0, 8)}</S.StudentCode>
                      </S.StudentMeta>
                    </S.StudentInfo>
                    
                    <S.TimeText $present={present} style={{ color: present ? '#374151' : '#C7CFCA' }}>
                      {present && s.arrivalTime && s.arrivalTime !== '--:--' ? s.arrivalTime : '—'}
                    </S.TimeText>
                    
                    <div style={{ position: 'relative' }}>
                      <S.BadgeBtn 
                        className="badge-btn"
                        $bg={st.bg} $color={st.c} $borderColor={st.bd}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isFuture()) {
                            addToast('Không thể điểm danh trước cho ngày tương lai!');
                            return;
                          }
                          setOpenMenuId(s.id);
                          setMenuStage('options');
                        }}
                      >
                        <S.BadgeDot $color={st.dot} />
                        {st.label}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </S.BadgeBtn>

                      {openMenuId === s.id && (
                        <S.PopoverOverlay 
                          ref={popoverRef}
                          className="attendance-popover"
                          onClick={e => e.stopPropagation()} 
                        >
                          {menuStage === 'options' ? (
                            <div style={{ padding: '5px' }}>
                              <div style={{ fontSize: '11px', fontWeight: 800, color: theme.colors.muted, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '6px 8px' }}>
                                Đổi trạng thái
                              </div>
                              <S.PopoverItem onClick={() => handleUpdateStatus(openMenuId, 'Present')}>
                                <S.PopoverItemDot $color="#005A36" />
                                Có mặt
                              </S.PopoverItem>
                              <S.PopoverItem onClick={() => {
                                const targetStu = students.find(stVal => stVal.id === openMenuId);
                                setReasonDraft(targetStu?.healthNote || targetStu?.leaveRequestReason || '');
                                setMenuStage('reason');
                              }}>
                                <S.PopoverItemDot $color="#D97706" />
                                Vắng có phép
                              </S.PopoverItem>
                              <S.PopoverItem onClick={() => handleUpdateStatus(openMenuId, 'Absent')}>
                                <S.PopoverItemDot $color="#DC2626" />
                                Vắng không phép
                              </S.PopoverItem>
                            </div>
                          ) : (
                            <S.PopoverReasonContainer>
                              <div style={{ fontSize: '12px', fontWeight: 800, color: theme.colors.muted, paddingLeft: '2px' }}>Lý do xin phép</div>
                              <form onSubmit={handleReasonSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <S.PopoverInput 
                                  autoFocus
                                  value={reasonDraft} 
                                  onChange={e => setReasonDraft(e.target.value)} 
                                  placeholder="VD: Bé bị ốm..." 
                                />
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <S.PopoverSaveButton type="submit" disabled={!reasonDraft.trim()}>Lưu</S.PopoverSaveButton>
                                  <S.PopoverSaveButton 
                                    type="button" 
                                    style={{ background: theme.colors.bg, color: theme.colors.muted, border: `1px solid ${theme.colors.border}` }} 
                                    onClick={() => setOpenMenuId(null)}
                                  >
                                    Hủy
                                  </S.PopoverSaveButton>
                                </div>
                              </form>
                            </S.PopoverReasonContainer>
                          )}
                        </S.PopoverOverlay>
                      )}
                    </div>
                    
                    <S.NotesText className="kc-hidecol">
                      <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {s.healthNote || s.leaveRequestReason || '—'}
                      </span>
                      {(s.attendanceStatus === 'PERMISSION_ABSENCE' || s.leaveRequestReason || s.leaveRequestId) && (
                        <S.ViewFormBtn 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            if (s.leaveRequestId) {
                              setLeaveDrawerOpen(true);
                              setHighlightedLeaveId(s.leaveRequestId);
                              setTimeout(() => {
                                const element = document.getElementById(`leave-card-${s.leaveRequestId}`);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                              }, 350);
                            } else {
                              addToast('Đơn xin nghỉ chưa được khởi tạo');
                            }
                          }}
                        >
                          Xem đơn
                        </S.ViewFormBtn>
                      )}
                    </S.NotesText>
                  </S.Tr>
                );
              })}
            </S.TableContainer>
          </>
        )}
      </section>



      {/* LEAVE REQUEST DRAWER */}
      {leaveDrawerOpen && (
        <>
          <S.DrawerOverlay onClick={() => setLeaveDrawerOpen(false)} />
          <S.DrawerContainer ref={drawerRef} onClick={e => e.stopPropagation()}>
            <S.DrawerHeader>
              <S.DrawerHeaderIconBlock>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              </S.DrawerHeaderIconBlock>
              <S.DrawerHeaderMeta>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#1F2937' }} className="display">Đơn xin nghỉ phép</div>
                <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '1px' }}>
                  {pendingLeavesCount} đơn chờ duyệt · {allLeaves.length} tổng
                </div>
              </S.DrawerHeaderMeta>
              <S.DrawerCloseBtn onClick={() => setLeaveDrawerOpen(false)}>✕</S.DrawerCloseBtn>
            </S.DrawerHeader>
            
            <S.DrawerContentList>
              {allLeaves.map((l, index) => {
                const isPending = l.status === 'PENDING';
                const grad = getAvatarGrad(l.studentName);
                const initial = getAvatarInitial(l.studentName);
                
                const fromStr = l.fromDate ? new Date(l.fromDate * 1000).toLocaleDateString('vi-VN') : '';
                const toStr = l.toDate ? new Date(l.toDate * 1000).toLocaleDateString('vi-VN') : '';
                const dateRangeText = fromStr === toStr ? fromStr : `${fromStr} → ${toStr}`;
                const hasError = imageErrors[`leave-${l.id}`];
                const showImg = l.studentAvatar && !hasError;
                
                return (
                  <S.LeaveCard 
                    key={`${l.id}-${index}`} 
                    $isPending={isPending}
                    id={`leave-card-${l.id}`}
                    style={{
                      border: highlightedLeaveId === l.id ? '2.5px solid #005A36' : undefined,
                      boxShadow: highlightedLeaveId === l.id ? '0 8px 24px rgba(0, 90, 54, 0.15)' : undefined,
                    }}
                  >
                    <S.LeaveCardHeader>
                      <S.LeaveStudentAvatar $grad={grad} className="display">
                        {showImg ? (
                          <S.LeaveStudentAvatarImg 
                            src={l.studentAvatar} 
                            alt={l.studentName} 
                            onError={() => setImageErrors(prev => ({ ...prev, [`leave-${l.id}`]: true }))}
                          />
                        ) : (
                          initial
                        )}
                      </S.LeaveStudentAvatar>
                      <S.LeaveStudentMeta>
                        <S.LeaveStudentNameRow>
                          <S.LeaveStudentName className="display">{l.studentName}</S.LeaveStudentName>
                          <S.LeaveStatusPill $status={l.status}>
                            {l.status === 'APPROVED' ? '✓ Đã duyệt' : (l.status === 'REJECTED' ? '✕ Từ chối' : 'Chờ duyệt')}
                          </S.LeaveStatusPill>
                        </S.LeaveStudentNameRow>
                        <S.LeaveSubDetail>
                          Mã HS: {l.studentId.substring(0, 8)}
                        </S.LeaveSubDetail>
                      </S.LeaveStudentMeta>
                    </S.LeaveCardHeader>

                    <S.LeaveDetailsBlock>
                      <S.LeaveDetailRow>
                        <S.LeaveDetailIconBlock $bg="#E3EDFD" $color="#2563EB">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        </S.LeaveDetailIconBlock>
                        <S.LeaveDetailLabel>Thời gian nghỉ</S.LeaveDetailLabel>
                        <S.LeaveDetailValue>{dateRangeText || 'Không rõ'}</S.LeaveDetailValue>
                      </S.LeaveDetailRow>
                      <S.LeaveDetailRow style={{ alignItems: 'flex-start' }}>
                        <S.LeaveDetailIconBlock $bg="#FEF3C7" $color="#D97706" style={{ marginTop: '2px' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        </S.LeaveDetailIconBlock>
                        <S.LeaveDetailLabel style={{ paddingTop: '5px' }}>Lý do</S.LeaveDetailLabel>
                        <S.LeaveDetailValue style={{ flex: 1.5, textAlign: 'right', lineHeight: 1.4 }}>{l.reason || 'Không rõ lý do'}</S.LeaveDetailValue>
                      </S.LeaveDetailRow>
                      <S.LeaveDetailRow>
                        <S.LeaveDetailIconBlock $bg="#E6F3ED" $color="#005A36">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                        </S.LeaveDetailIconBlock>
                        <S.LeaveDetailLabel>Người gửi</S.LeaveDetailLabel>
                        <S.LeaveDetailValue>{l.parentName} · {l.relationship}</S.LeaveDetailValue>
                      </S.LeaveDetailRow>
                      {l.parentPhone && (
                        <S.LeaveDetailRow>
                          <S.LeaveDetailIconBlock $bg="#E6F3ED" $color="#005A36">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                          </S.LeaveDetailIconBlock>
                          <S.LeaveDetailLabel>SĐT liên hệ</S.LeaveDetailLabel>
                          <S.LeaveDetailValue style={{ fontVariantNumeric: 'tabular-nums' }}>{l.parentPhone}</S.LeaveDetailValue>
                        </S.LeaveDetailRow>
                      )}
                    </S.LeaveDetailsBlock>

                    {/* EVIDENCE VIEW BUTTON */}
                    {l.attachmentUrl && (
                      <S.LeaveEvidenceBlock>
                        <S.LeaveEvidenceTitle>Ảnh minh chứng</S.LeaveEvidenceTitle>
                        <S.LeaveEvidenceBtn 
                          $bg={PROOF_BGS[index % PROOF_BGS.length]}
                          onClick={() => setProofOpenId(l.id)}
                          style={{ padding: 0 }}
                        >
                          <img src={l.attachmentUrl} alt="Minh chứng" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </S.LeaveEvidenceBtn>
                      </S.LeaveEvidenceBlock>
                    )}

                    {isPending && (
                      <S.LeaveActionButtons>
                        <S.LeaveActionApproveBtn className="display" onClick={() => handleProcessLeaveRequest(l.id, 'APPROVED')}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          Duyệt
                        </S.LeaveActionApproveBtn>
                        <S.LeaveActionRejectBtn className="display" onClick={() => handleProcessLeaveRequest(l.id, 'REJECTED')}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          Từ chối
                        </S.LeaveActionRejectBtn>
                      </S.LeaveActionButtons>
                    )}
                  </S.LeaveCard>
                );
              })}
              {allLeaves.length === 0 && (
                <div style={{ textAlign: 'center', padding: '50px 20px', color: '#9CA3AF', fontWeight: 600 }}>
                  Không tìm thấy đơn xin nghỉ học nào.
                </div>
              )}
            </S.DrawerContentList>
          </S.DrawerContainer>
        </>
      )}

      {/* EVIDENCE LIGHTBOX LIGHTBOX */}
      {selectedProof && (
        <S.LightboxOverlay onClick={() => setProofOpenId(null)}>
          <S.LightboxContainer onClick={e => e.stopPropagation()}>
            <S.LightboxMediaBox $bg={PROOF_BGS[allLeaves.indexOf(selectedProof) % PROOF_BGS.length]}>
              <S.LightboxStripeOverlay />
              {selectedProof.attachmentUrl ? (
                <S.LightboxImage src={selectedProof.attachmentUrl} alt="Ảnh minh chứng đính kèm" />
              ) : (
                <>
                  <span style={{ fontSize: '60px', position: 'relative' }}>📄</span>
                  <span style={{ fontSize: '15px', fontWeight: 700, position: 'relative' }}>Ảnh minh chứng</span>
                  <span style={{ fontSize: '13px', opacity: 0.85, position: 'relative' }}>Không tải được ảnh</span>
                </>
              )}
            </S.LightboxMediaBox>
            <S.LightboxFooter>
              <S.LightboxCaption>
                {selectedProof.studentName} · {selectedProof.fromDate ? (
                  new Date(selectedProof.fromDate * 1000).toLocaleDateString('vi-VN') === new Date(selectedProof.toDate! * 1000).toLocaleDateString('vi-VN')
                    ? new Date(selectedProof.fromDate * 1000).toLocaleDateString('vi-VN')
                    : `${new Date(selectedProof.fromDate * 1000).toLocaleDateString('vi-VN')} → ${new Date(selectedProof.toDate! * 1000).toLocaleDateString('vi-VN')}`
                ) : 'Đơn nghỉ'}
              </S.LightboxCaption>
              <S.LightboxCloseBtn onClick={() => setProofOpenId(null)}>Đóng</S.LightboxCloseBtn>
            </S.LightboxFooter>
          </S.LightboxContainer>
        </S.LightboxOverlay>
      )}

      {/* TOASTS CONTAINER */}
      <S.ToastContainer>
        {toasts.map(t => (
          <S.ToastMsg key={t.id} className="display">
            {t.text}
          </S.ToastMsg>
        ))}
      </S.ToastContainer>
      {/* QR SCANNER MODAL */}
      {isQrScannerOpen && (
        <QrScannerModal 
          onClose={() => setIsQrScannerOpen(false)}
          onScanSuccess={() => {
            if (classId) fetchAttendance(classId, dateMs); // Refresh data when scan successful
          }}
        />
      )}

    </S.PageContainer>
  );
};
