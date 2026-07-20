import { useEffect, useRef, useState } from 'react';
import { AttendanceService } from '@/services/Attendance/AttendanceService';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';
import { Student, LeaveRequest } from '../../../config/types/attendance';
import { ST } from '../constants';
import { buildCalendarCells, buildWeekTrend, exportAttendanceCSV, formatDateStr, getStatusKey } from '../utils';

export function useAttendance() {
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

  const [leaveDrawerOpen, setLeaveDrawerOpen] = useState(false);
  const [proofOpenId, setProofOpenId] = useState<string | null>(null);
  const [monthOffset, setMonthOffset] = useState<number>(0);

  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isPhotoScannerOpen, setIsPhotoScannerOpen] = useState(false);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [reasonDraft, setReasonDraft] = useState('');
  const [menuStage, setMenuStage] = useState<'options' | 'reason'>('options');

  const toastIdCounter = useRef(0);
  const popoverRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const fetchAttendance = async (cId: string, dMs: number) => {
    try {
      const dateStr = formatDateStr(dMs);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (classId) {
      fetchAttendance(classId, dateMs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const dateStr = formatDateStr(dateMs);
        const newDomainStatus = status === 'APPROVED' ? 'PERMISSION_ABSENCE' : 'UNEXCUSED_ABSENCE';

        await AttendanceService.updateAttendance(classId, dateStr, [{
          studentId: targetStudent.id,
          status: newDomainStatus,
          arrivalTime: undefined,
          healthNote: targetStudent.healthNote || '',
        }]);
      }

      setStudents(prev => prev.map(s => {
        if (s.leaveRequestId === requestId) {
          const newDomainStatus = status === 'APPROVED' ? 'PERMISSION_ABSENCE' : (s.attendanceStatus === 'PERMISSION_ABSENCE' ? 'UNEXCUSED_ABSENCE' : s.attendanceStatus);
          return {
            ...s,
            leaveRequestStatus: status,
            attendanceStatus: newDomainStatus,
            arrivalTime: newDomainStatus !== 'PRESENT' ? '--:--' : s.arrivalTime,
          };
        }
        return s;
      }));

      setAllLeaves(prev => prev.map(l => (l.id === requestId ? { ...l, status } : l)));
      addToast(status === 'APPROVED' ? 'Đã duyệt đơn nghỉ phép' : 'Đã từ chối đơn nghỉ phép');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Lỗi xử lý đơn';
      addToast(`Lỗi: ${msg}`);
    }
  };

  const handleUpdateStatus = async (studentId: string, newStatus: string, reason?: string) => {
    if (!classId) return;
    try {
      const dateStr = formatDateStr(dateMs);
      const payload: any = { studentId, date: dateStr, status: newStatus };

      if (newStatus === 'Present') {
        const now = new Date();
        payload.arrivalTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      }
      if (reason) payload.notes = reason;

      let newDomainStatus: 'PRESENT' | 'PERMISSION_ABSENCE' | 'UNEXCUSED_ABSENCE' = 'PRESENT';
      if (newStatus === 'Excused') newDomainStatus = 'PERMISSION_ABSENCE';
      if (newStatus === 'Absent') newDomainStatus = 'UNEXCUSED_ABSENCE';

      await AttendanceService.updateAttendance(classId, dateStr, [{
        studentId,
        status: newDomainStatus,
        arrivalTime: payload.arrivalTime,
        healthNote: reason,
      }]);

      const targetStudent = students.find(s => s.id === studentId);
      let newLeaveReqStatus = targetStudent?.leaveRequestStatus;

      if (targetStudent && targetStudent.leaveRequestId && newDomainStatus !== 'PRESENT') {
        const syncActionStatus = newDomainStatus === 'PERMISSION_ABSENCE' ? 'APPROVED' : 'REJECTED';
        try {
          await LeaveRequestService.processLeaveRequest(targetStudent.leaveRequestId, syncActionStatus);
          newLeaveReqStatus = syncActionStatus;
          setAllLeaves(prev => prev.map(l => (l.id === targetStudent.leaveRequestId ? { ...l, status: syncActionStatus } : l)));
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
            leaveRequestStatus: newLeaveReqStatus,
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

  const exportCSV = () => {
    exportAttendanceCSV(students, className);
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

  const weekTrend = buildWeekTrend(rate);

  const baseDate = new Date();
  baseDate.setDate(1);
  const currentMonthDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + monthOffset, 1);
  const calendarYear = currentMonthDate.getFullYear();
  const calendarMonth = currentMonthDate.getMonth();
  const calendarCells = buildCalendarCells(calendarYear, calendarMonth);

  return {
    // filters
    query, setQuery,
    sortBy, setSortBy,
    statusFilter, setStatusFilter,
    dateMs, setDateMs,

    // data
    students, allLeaves, classId, className,
    toasts, imageErrors, setImageErrors,

    // drawers/popovers
    leaveDrawerOpen, setLeaveDrawerOpen,
    proofOpenId, setProofOpenId,
    monthOffset, setMonthOffset,
    isQrScannerOpen, setIsQrScannerOpen,
    isPhotoScannerOpen, setIsPhotoScannerOpen,
    openMenuId, setOpenMenuId,
    reasonDraft, setReasonDraft,
    menuStage, setMenuStage,
    popoverRef, drawerRef,

    // actions
    fetchAttendance,
    handleProcessLeaveRequest,
    handleUpdateStatus,
    exportCSV,
    handleReasonSubmit,

    // derived
    stTotal, cPresent, cExcused, cUnexcused, rate,
    donutGradient,
    sortedStudents,
    pendingLeavesCount,
    selectedProof,
    weekTrend,
    calendarYear, calendarMonth, calendarCells,
  };
}
