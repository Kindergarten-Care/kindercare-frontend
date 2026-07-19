import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'styled-components';
import { ScanLine, Search, Filter, SortDesc, Calendar, Bell, ChevronLeft, ChevronRight, CheckCircle2, Download, Camera } from 'lucide-react';
import * as S from './styles';
import { AttendanceService } from '@/services/Attendance/AttendanceService';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';
import { QrScannerModal } from '../../components/QrScannerModal';
import { PhotoAttendanceModal } from '../../components/PhotoAttendance/PhotoAttendanceModal';
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

const ST = {
  present: {
    label: 'Có mặt',
    c: '#005A36',
    bg: '#E6F3ED',
    bd: '#C7E3D5',
    dot: '#005A36'
  },
  excused: {
    label: 'Vắng có phép',
    c: '#4B5563',
    bg: '#F1F4F1',
    bd: '#E6EEE9',
    dot: '#9CA3AF'
  },
  unexcused: {
    label: 'Vắng không phép',
    c: '#DC2626',
    bg: '#FEE2E2',
    bd: '#FCA5A5',
    dot: '#DC2626'
  },
  absent: {
    label: 'Chưa điểm danh',
    c: '#6B7280',
    bg: '#F8FBF9',
    bd: '#E6EEE9',
    dot: '#9CA3AF'
  }
};

export const AttendanceView: React.FC = () => {
  const theme = useTheme();

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

  // Drawer & popovers
  const [leaveDrawerOpen, setLeaveDrawerOpen] = useState(false);
  const [proofOpenId, setProofOpenId] = useState<string | null>(null);
  const [monthOffset, setMonthOffset] = useState<number>(0);

  // QR & Photo Scanner State
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isPhotoScannerOpen, setIsPhotoScannerOpen] = useState(false);

  // Quick menu popover states
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
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
      const leavesData = await LeaveRequestService.getAllLeaveRequests();
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

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (popoverRef.current && popoverRef.current.contains(target)) return;
      if (target.closest('.badge-btn')) return;
      if (openMenuId) setOpenMenuId(null);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [openMenuId]);

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
      await LeaveRequestService.processLeaveRequest(requestId, status);
      
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

      setAllLeaves(prev => prev.map(l => l.id === requestId ? { ...l, status } : l));
      addToast(status === 'APPROVED' ? 'Đã duyệt đơn nghỉ phép' : 'Đã từ chối đơn nghỉ phép');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Lỗi xử lý đơn';
      addToast(`Lỗi: ${msg}`);
    }
  };

  const handleUpdateStatus = async (studentId: string, newStatus: string, reason?: string) => {
    if (!classId) return;
    try {
      const dateObj = new Date(dateMs);
      const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
      
      const payload: any = { studentId, date: dateStr, status: newStatus };

      if (newStatus === 'Present') {
        const now = new Date();
        payload.arrivalTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      }
      if (reason) payload.notes = reason;

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
          await LeaveRequestService.processLeaveRequest(targetStudent.leaveRequestId, syncActionStatus);
          newLeaveReqStatus = syncActionStatus;
          setAllLeaves(prev => prev.map(l => l.id === targetStudent.leaveRequestId ? { ...l, status: syncActionStatus } : l));
        } catch (e) {
          console.error('Lỗi đồng bộ', e);
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
    const csv = '\ufeff' + rows.map(r => r.map(c => '"' + String(c ?? '').replace(/"/g, '""') + '"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); 
    a.href = url; 
    a.download = `diem-danh-lop-${className || 'lop'}.csv`; 
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    addToast('📄 Đã xuất báo cáo điểm danh');
  };

  const handleReasonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reason = reasonDraft.trim();
    if (!reason) {
      addToast('Vui lòng nhập lý do xin phép!');
      return;
    }
    if (openMenuId) handleUpdateStatus(openMenuId, 'Excused', reason);
  };

  // KPIs
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

  // Filters & sorts
  const filteredByStatus = students.filter(s => {
    if (statusFilter === 'all') return true;
    return getStatusKey(s) === statusFilter;
  });

  const filteredAndSearched = filteredByStatus.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));

  const sortedStudents = (() => {
    const copy = [...filteredAndSearched];
    const sortByName = (a: Student, b: Student) => a.name.localeCompare(b.name, 'vi', { sensitivity: 'base' });
    if (sortBy === 'name') return copy.sort(sortByName);
    if (sortBy === 'time') return copy.sort((a, b) => (a.arrivalTime || '99:99').localeCompare(b.arrivalTime || '99:99'));
    if (sortBy === 'pending_leave') return copy.sort((a, b) => (b.leaveRequestStatus === 'PENDING' ? 1 : 0) - (a.leaveRequestStatus === 'PENDING' ? 1 : 0));
    return copy;
  })();

  const pendingLeavesCount = allLeaves.filter(l => l.status === 'PENDING').length;
  const selectedProof = proofOpenId ? allLeaves.find(l => l.id === proofOpenId) : null;

  // Calendar logic
  const todayDow = new Date().getDay(); 
  const weekRaw = [
    { dow: 'T2', pct: todayDow === 1 ? rate : 95, off: false },
    { dow: 'T3', pct: todayDow === 2 ? rate : 90, off: false },
    { dow: 'T4', pct: todayDow === 3 ? rate : 100, off: false },
    { dow: 'T5', pct: todayDow === 4 ? rate : 85, off: false },
    { dow: 'T6', pct: todayDow === 5 ? rate : 92, off: false },
    { dow: 'T7', pct: 0, off: true },
    { dow: 'CN', pct: 0, off: true }
  ];

  const weekTrend = weekRaw.map((w, i) => {
    const activeDay = i === (todayDow === 0 ? 6 : todayDow - 1);
    const isOff = w.off;
    const h = isOff ? 6 : Math.max(10, (w.pct / 100) * 88);
    const barBg = isOff ? '#EEF4F0' : (activeDay ? 'linear-gradient(180deg, #00794A, #005A36)' : '#A7C9B6');
    return { ...w, pctText: isOff ? '–' : `${w.pct}%`, h, barBg, activeDay };
  });

  const baseDate = new Date();
  baseDate.setDate(1);
  const currentMonthDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + monthOffset, 1);
  const calendarYear = currentMonthDate.getFullYear();
  const calendarMonth = currentMonthDate.getMonth();
  const calendarCells = (() => {
    const first = new Date(calendarYear, calendarMonth, 1);
    const startDow = (first.getDay() + 6) % 7; 
    const days = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const todayZero = new Date();
    todayZero.setHours(0, 0, 0, 0);

    const cells: ({ day: number; weekend: boolean; isToday: boolean; isFuture: boolean; kind: 'none' | 'full' | 'some' | 'high' } | null)[] = [];
    for (let i = 0; i < startDow; i++) cells.push(null);
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

  const calKindColor = { full: '#005A36', some: '#D97706', high: '#DC2626', none: 'transparent' };

  return (
    <S.PageContainer>
      {/* HERO SECTION */}
      <S.HeroSection>
        <S.HeroLeft>
          <S.HeroTitle>Điểm danh lớp {className || '...'}</S.HeroTitle>
          <S.HeroSubtitle>Tiến độ điểm danh hôm nay</S.HeroSubtitle>
        </S.HeroLeft>
        <S.HeroRight>
          <S.QrBtn onClick={() => setIsPhotoScannerOpen(true)} style={{ background: '#059669', color: '#fff', borderColor: '#059669' }}>
            <Camera size={18} /> Chụp ảnh điểm danh
          </S.QrBtn>
          <S.LeaveBtn onClick={() => setLeaveDrawerOpen(true)}>
            <Bell size={18} />
            Đơn xin nghỉ
            {pendingLeavesCount > 0 && <S.LeaveBadge>{pendingLeavesCount}</S.LeaveBadge>}
          </S.LeaveBtn>
          <S.QrBtn onClick={exportCSV}>
            <Download size={18} /> Xuất dữ liệu
          </S.QrBtn>
        </S.HeroRight>
      </S.HeroSection>

      {/* KPI GRID */}
      <S.KpiGrid>
        <S.KpiCard>
          <S.KpiIconBlock $bg="#EEF2FF" $color="#4F46E5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path></svg>
          </S.KpiIconBlock>
          <S.KpiMeta>
            <S.KpiLabel>Sĩ số lớp</S.KpiLabel>
            <S.KpiValue>{stTotal}</S.KpiValue>
          </S.KpiMeta>
        </S.KpiCard>

        <S.KpiCard>
          <S.KpiIconBlock $bg="#E6F3ED" $color="#005A36">
            <CheckCircle2 size={22} />
          </S.KpiIconBlock>
          <S.KpiMeta>
            <S.KpiLabel>Có mặt</S.KpiLabel>
            <S.KpiValue $color="#005A36">{cPresent}</S.KpiValue>
          </S.KpiMeta>
        </S.KpiCard>

        <S.KpiCard>
          <S.KpiIconBlock $bg="#F1F4F1" $color="#4B5563">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          </S.KpiIconBlock>
          <S.KpiMeta>
            <S.KpiLabel>Vắng có phép</S.KpiLabel>
            <S.KpiValue $color="#4B5563">{cExcused}</S.KpiValue>
          </S.KpiMeta>
        </S.KpiCard>

        <S.KpiCard>
          <S.KpiIconBlock $bg="#FEE2E2" $color="#DC2626">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"></path></svg>
          </S.KpiIconBlock>
          <S.KpiMeta>
            <S.KpiLabel>Vắng</S.KpiLabel>
            <S.KpiValue>{cUnexcused}</S.KpiValue>
          </S.KpiMeta>
        </S.KpiCard>
      </S.KpiGrid>

      {/* CHARTS & CALENDAR */}
      <S.ChartCalendarGrid>
        <S.ChartCard>
          <S.ChartTitle>Tỷ lệ chuyên cần</S.ChartTitle>
          <S.DonutRow>
            <S.DonutWrapper $bg={donutGradient}>
              <S.DonutInner>
                <S.DonutRate>{rate}%</S.DonutRate>
                <S.DonutLabel>Hôm nay</S.DonutLabel>
              </S.DonutInner>
            </S.DonutWrapper>
            
            <S.LegendList>
              <S.LegendItem>
                <S.LegendDot $bg="#005A36" />
                <S.LegendText>Có mặt</S.LegendText>
                <S.LegendCount $color="#005A36">{cPresent}</S.LegendCount>
                <S.LegendPct>{stTotal > 0 ? Math.round(cPresent / stTotal * 100) : 0}%</S.LegendPct>
              </S.LegendItem>
              <S.LegendItem>
                <S.LegendDot $bg="#9CA3AF" />
                <S.LegendText>Vắng có phép</S.LegendText>
                <S.LegendCount $color="#4B5563">{cExcused}</S.LegendCount>
                <S.LegendPct>{stTotal > 0 ? Math.round(cExcused / stTotal * 100) : 0}%</S.LegendPct>
              </S.LegendItem>
              <S.LegendItem>
                <S.LegendDot $bg="#DC2626" />
                <S.LegendText>Vắng không phép</S.LegendText>
                <S.LegendCount $color="#DC2626">{cUnexcused}</S.LegendCount>
                <S.LegendPct>{stTotal > 0 ? Math.round(cUnexcused / stTotal * 100) : 0}%</S.LegendPct>
              </S.LegendItem>
              <S.LegendItem>
                <S.LegendDot $bg="#E5E7EB" />
                <S.LegendText>Chưa điểm danh</S.LegendText>
                <S.LegendCount $color="#6B7280">{cNotYet}</S.LegendCount>
                <S.LegendPct>{stTotal > 0 ? Math.round(cNotYet / stTotal * 100) : 0}%</S.LegendPct>
              </S.LegendItem>
            </S.LegendList>
          </S.DonutRow>

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
        </S.ChartCard>

        <S.CalendarCard>
          <S.CalendarHeaderRow>
            <S.CalendarMonthLabel>Tháng {calendarMonth + 1} / {calendarYear}</S.CalendarMonthLabel>
            <S.CalendarNavButtons>
              <S.CalendarNavBtn onClick={() => setMonthOffset(prev => prev - 1)}><ChevronLeft size={16} /></S.CalendarNavBtn>
              <S.CalendarNavBtn onClick={() => setMonthOffset(prev => prev + 1)}><ChevronRight size={16} /></S.CalendarNavBtn>
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
                  {c.kind !== 'none' && !c.isToday && <S.CalendarDayDot $color={calKindColor[c.kind]} />}
                </S.CalendarDayCell>
              );
            })}
          </S.CalendarDaysGrid>

          <S.CalendarLegend>
            <S.CalLegendItem><S.CalLegendDot $color="#005A36" /> Đầy đủ</S.CalLegendItem>
            <S.CalLegendItem><S.CalLegendDot $color="#D97706" /> Có vắng</S.CalLegendItem>
            <S.CalLegendItem><S.CalLegendDot $color="#DC2626" /> Vắng nhiều</S.CalLegendItem>
            <S.CalLegendItem>
              <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '3px', background: '#005A36' }} /> Hôm nay
            </S.CalLegendItem>
          </S.CalendarLegend>
        </S.CalendarCard>
      </S.ChartCalendarGrid>

      {/* ROSTER LIST */}
      <S.ListSection>
        <S.ListHeader>
          <S.ListTitle>Danh sách lớp</S.ListTitle>
          <S.FilterGroup>
            <S.FilterBtn $active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>Tất cả</S.FilterBtn>
            <S.FilterBtn $active={statusFilter === 'present'} onClick={() => setStatusFilter('present')}>Có mặt ({cPresent})</S.FilterBtn>
            <S.FilterBtn $active={statusFilter === 'excused'} onClick={() => setStatusFilter('excused')}>Có phép ({cExcused})</S.FilterBtn>
            <S.FilterBtn $active={statusFilter === 'unexcused'} onClick={() => setStatusFilter('unexcused')}>Không phép ({cUnexcused})</S.FilterBtn>
          </S.FilterGroup>
          <div style={{ flex: 1 }} />
          <S.SearchBox>
            <Search size={16} color="#9CA3AF" />
            <input 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              placeholder="Tìm bé..." 
            />
          </S.SearchBox>
        </S.ListHeader>

        <S.TableHeader>
          <span>Học sinh</span>
          <span>Giờ đến</span>
          <span>Trạng thái</span>
          <span>Ghi chú</span>
        </S.TableHeader>

        <div>
          {sortedStudents.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#9CA3AF' }}>
              <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>🔍</span>
              <span style={{ fontWeight: 600 }}>Không tìm thấy học sinh phù hợp.</span>
            </div>
          ) : (
            sortedStudents.map((s, idx) => {
              const sk = getStatusKey(s);
              const st = ST[sk];
              const grad = getAvatarGrad(s.name);
              
              return (
                <S.TableRow key={s.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <S.StudentAvatar $grad={grad}>
                      {s.avatar && !imageErrors[s.id] ? (
                        <S.AvatarImg src={s.avatar} onError={() => setImageErrors(prev => ({ ...prev, [s.id]: true }))} />
                      ) : (
                        (() => {
                          const parts = s.name.split(' ').filter(Boolean);
                          return parts.map(p => p[0]).slice(-2).join('').toUpperCase();
                        })()
                      )}
                    </S.StudentAvatar>
                    <div>
                      <S.StudentName>{s.name}</S.StudentName>
                      <S.StudentCode>{s.id.substring(0, 8)}</S.StudentCode>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                        <span title="Ảnh nhận (Dropoff)"><Camera size={14} color={s.dropoffImage ? '#10B981' : '#D1D5DB'} /></span>
                        <span title="Ảnh trả (Pickup)"><Camera size={14} color={s.pickupImage ? '#10B981' : '#D1D5DB'} /></span>
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: sk === 'present' ? '#1F2937' : '#D1D5DB' }}>
                    {sk === 'present' && s.arrivalTime && s.arrivalTime !== '--:--' ? s.arrivalTime : '—'}
                  </div>

                  <div style={{ position: 'relative' }}>
                    <S.StatusBadgeBtn 
                      className="badge-btn"
                      $bg={st.bg} 
                      $color={st.c} 
                      $bd={st.bd}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(s.id);
                        setMenuStage('options');
                      }}
                    >
                      <S.StatusDot $color={st.dot} />
                      {st.label}
                    </S.StatusBadgeBtn>

                    {openMenuId === s.id && (
                      <S.PopoverOverlay ref={popoverRef}>
                        {menuStage === 'options' ? (
                          <>
                            <S.PopoverItem onClick={() => handleUpdateStatus(s.id, 'Present')}>
                              <S.StatusDot $color="#005A36" /> Có mặt
                            </S.PopoverItem>
                            <S.PopoverItem onClick={() => { setReasonDraft(s.healthNote || ''); setMenuStage('reason'); }}>
                              <S.StatusDot $color="#9CA3AF" /> Vắng có phép
                            </S.PopoverItem>
                            <S.PopoverItem onClick={() => handleUpdateStatus(s.id, 'Absent')}>
                              <S.StatusDot $color="#DC2626" /> Vắng không phép
                            </S.PopoverItem>
                          </>
                        ) : (
                          <S.PopoverReasonContainer>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280' }}>Lý do xin phép</div>
                            <S.PopoverInput 
                              autoFocus 
                              value={reasonDraft} 
                              onChange={e => setReasonDraft(e.target.value)} 
                              placeholder="Nhập lý do..." 
                            />
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <S.PopoverSaveButton onClick={handleReasonSubmit} disabled={!reasonDraft.trim()}>Lưu</S.PopoverSaveButton>
                              <S.PopoverSaveButton style={{ background: '#F3F4F6', color: '#4B5563' }} onClick={() => setOpenMenuId(null)}>Hủy</S.PopoverSaveButton>
                            </div>
                          </S.PopoverReasonContainer>
                        )}
                      </S.PopoverOverlay>
                    )}
                  </div>

                  <div style={{ fontSize: '13px', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {s.healthNote || s.leaveRequestReason || '—'}
                  </div>
                </S.TableRow>
              );
            })
          )}
        </div>
      </S.ListSection>

      {/* DRAWERS & TOASTS */}
      {leaveDrawerOpen && (
        <>
          <S.DrawerOverlay onClick={() => setLeaveDrawerOpen(false)} />
          <S.DrawerContainer ref={drawerRef}>
            <S.DrawerHeader>
              <S.DrawerHeaderIconBlock><Bell size={24} /></S.DrawerHeaderIconBlock>
              <S.DrawerHeaderMeta>
                <div style={{ fontSize: '18px', fontWeight: 700 }}>Đơn xin nghỉ phép</div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>{pendingLeavesCount} đơn chờ duyệt · {allLeaves.length} tổng</div>
              </S.DrawerHeaderMeta>
              <S.DrawerCloseBtn onClick={() => setLeaveDrawerOpen(false)}>✕</S.DrawerCloseBtn>
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
                          <S.LeaveEvidenceBtn $bg={PROOF_BGS[i % PROOF_BGS.length]} onClick={() => setProofOpenId(l.id)}>
                            <img src={l.attachmentUrl} alt="minh chung" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </S.LeaveEvidenceBtn>
                        </S.LeaveEvidenceBlock>
                      )}

                      {isPending && (
                        <S.LeaveActionButtons>
                          <S.LeaveActionApproveBtn onClick={() => handleProcessLeaveRequest(l.id, 'APPROVED')}>Duyệt</S.LeaveActionApproveBtn>
                          <S.LeaveActionRejectBtn onClick={() => handleProcessLeaveRequest(l.id, 'REJECTED')}>Từ chối</S.LeaveActionRejectBtn>
                        </S.LeaveActionButtons>
                      )}
                    </S.LeaveCard>
                  );
                })
              )}
            </S.DrawerContentList>
          </S.DrawerContainer>
        </>
      )}

      {selectedProof && (
        <S.LightboxOverlay onClick={() => setProofOpenId(null)}>
          <S.LightboxContainer onClick={e => e.stopPropagation()}>
            <S.LightboxMediaBox $bg={PROOF_BGS[0]}>
              <S.LightboxStripeOverlay />
              {selectedProof.attachmentUrl ? (
                <S.LightboxImage src={selectedProof.attachmentUrl} />
              ) : (
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>Không tải được ảnh</div>
              )}
            </S.LightboxMediaBox>
            <S.LightboxFooter>
              <S.LightboxCaption>{selectedProof.studentName} · Đơn nghỉ phép</S.LightboxCaption>
              <S.LightboxCloseBtn onClick={() => setProofOpenId(null)}>Đóng</S.LightboxCloseBtn>
            </S.LightboxFooter>
          </S.LightboxContainer>
        </S.LightboxOverlay>
      )}

      <S.ToastContainer>
        {toasts.map(t => (
          <S.ToastMsg key={t.id}>{t.text}</S.ToastMsg>
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

      {/* PHOTO ATTENDANCE MODAL */}
      <PhotoAttendanceModal 
        isOpen={isPhotoScannerOpen}
        onClose={() => setIsPhotoScannerOpen(false)}
        students={students}
        classId={classId}
        className={className}
        onSuccess={() => {
          if (classId) fetchAttendance(classId, dateMs);
        }}
      />
    </S.PageContainer>
  );
};
