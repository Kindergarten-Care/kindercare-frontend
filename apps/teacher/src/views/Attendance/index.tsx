import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'styled-components';
import { theme } from '@kindercare/ui';
import * as S from './styles';
import { AttendanceService } from '../../services/attendance';
import { QrScannerModal } from '../../components/QrScannerModal';
import { Student, LeaveRequest } from '../../config/types/attendance';

export const AttendanceView: React.FC = () => {
  const theme = useTheme();

  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'time' | 'pending_leave'>('name');
  const [dateMs, setDateMs] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  });
  
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<Student | null>(null);
  const [leaveReqDetail, setLeaveReqDetail] = useState<LeaveRequest | null>(null);
  const [isLoadingReqDetail, setIsLoadingReqDetail] = useState<boolean>(false);
  const [classId, setClassId] = useState<string>('');
  const [className, setClassName] = useState<string>('');
  const [toasts, setToasts] = useState<{id: string, text: string}[]>([]);
  
  // States for summary leave requests modal
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [allLeaves, setAllLeaves] = useState<LeaveRequest[]>([]);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [summaryFilter, setSummaryFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [reasonDraft, setReasonDraft] = useState('');
  const [menuStage, setMenuStage] = useState<'options' | 'reason'>('options');

  const toastIdCounter = useRef(0);
  const popoverRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const init = async () => {
      try {
        const classes = await AttendanceService.getTeacherClasses();
        if (classes.length > 0) {
          setClassId(String(classes[0].classId));
          setClassName(classes[0].className);
          fetchAttendance(String(classes[0].classId), dateMs);
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

  // Click outside menu to close
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

  const addToast = (text: string) => {
    const id = 't' + (toastIdCounter.current++);
    setToasts(prev => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleOpenSummaryModal = async () => {
    setIsSummaryModalOpen(true);
    setIsLoadingSummary(true);
    try {
      const data = await AttendanceService.getAllLeaveRequests();
      setAllLeaves(data);
    } catch (e) {
      console.error('Failed to load summary leave requests:', e);
      addToast('Lỗi khi tải danh sách đơn phép');
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const ST = {
    present: {
      label: 'Có mặt',
      c: theme.colors.green,
      bg: theme.colors.greenLight,
      bd: theme.colors.greenXLight,
      dot: theme.colors.greenMid,
      dim: false
    },
    excused: {
      label: 'Vắng có phép',
      c: theme.colors.amber,
      bg: theme.colors.amberLight,
      bd: theme.colors.amberLight,
      dot: theme.colors.amberMid,
      dim: true
    },
    unexcused: {
      label: 'Vắng không phép',
      c: theme.colors.red || '#dc2626',
      bg: theme.colors.redLight || '#fee2e2',
      bd: theme.colors.redLight || '#fee2e2',
      dot: theme.colors.redMid || '#ef4444',
      dim: true
    },
    absent: {
      label: 'Chưa điểm danh',
      c: theme.colors.muted,
      bg: theme.colors.bg,
      bd: theme.colors.border,
      dot: theme.colors.muted,
      dim: true
    }
  };

  const getStatusKey = (s: Student): 'present' | 'excused' | 'unexcused' | 'absent' => {
    if (s.attendanceStatus === 'PRESENT') return 'present';
    if (s.attendanceStatus === 'PERMISSION_ABSENCE') return 'excused';
    if (s.attendanceStatus === 'UNEXCUSED_ABSENCE') return 'unexcused';
    return 'absent';
  };

  const handleOpenLeaveRequest = async (s: Student) => {
    setSelectedLeaveRequest(s);
    setLeaveReqDetail(null);
    if (s.leaveRequestId) {
      setIsLoadingReqDetail(true);
      try {
        const detail = await AttendanceService.getLeaveRequestDetail(s.leaveRequestId);
        setLeaveReqDetail(detail);
      } catch (err) {
        console.error('Failed to load leave request detail:', err);
      } finally {
        setIsLoadingReqDetail(false);
      }
    }
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

      if (leaveReqDetail) {
        setLeaveReqDetail({ ...leaveReqDetail, status });
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
      addToast('Xử lý đơn thành công');
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
          
          if (leaveReqDetail && leaveReqDetail.id === targetStudent.leaveRequestId) {
            setLeaveReqDetail({ ...leaveReqDetail, status: syncActionStatus });
          }
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

  const grads = [
    'linear-gradient(135deg, #00794A, #005A36)',
    'linear-gradient(135deg, #3B82F6, #2563EB)',
    'linear-gradient(135deg, #A78BFA, #8B5CF6)',
    'linear-gradient(135deg, #FB923C, #F97316)',
    'linear-gradient(135deg, #34D399, #059669)',
    'linear-gradient(135deg, #F472B6, #DB2777)'
  ];
  
  const getAvatarInfo = (name: string) => {
    const p = name.trim().split(' ');
    const initial = p[p.length - 1]?.[0]?.toUpperCase() || '?';
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    const grad = grads[h % grads.length];
    return { initial, grad };
  };

  const isFuture = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateMs > today.getTime();
  };

  const filtered = students.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));
  
  const sortedAndFiltered = (() => {
    const copy = [...filtered];
    
    const getVietnameseSortKeys = (fullName: string) => {
      const parts = fullName.trim().split(/\s+/);
      const givenName = parts[parts.length - 1] || '';
      const rest = parts.slice(0, -1).join(' ');
      return { givenName, rest };
    };

    const sortByName = (a: Student, b: Student) => {
      const aKeys = getVietnameseSortKeys(a.name);
      const bKeys = getVietnameseSortKeys(b.name);
      
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
        
        if (aTime !== bTime) {
          return aTime.localeCompare(bTime);
        }
        return sortByName(a, b);
      });
    } else if (sortBy === 'pending_leave') {
      return copy.sort((a, b) => {
        const aPending = a.leaveRequestStatus === 'PENDING' ? 1 : 0;
        const bPending = b.leaveRequestStatus === 'PENDING' ? 1 : 0;
        
        if (aPending !== bPending) {
          return bPending - aPending;
        }
        return sortByName(a, b);
      });
    }
    
    return copy;
  })();
  
  const stTotal = students.length;
  let stPresent = 0;
  let stExcused = 0;
  let stUnexcused = 0;

  students.forEach(s => {
    const key = getStatusKey(s);
    if (key === 'present') stPresent++;
    else if (key === 'excused') stExcused++;
    else if (key === 'unexcused') stUnexcused++;
  });

  const pctPresent = stTotal > 0 ? (stPresent / stTotal) * 100 : 0;
  const pctExcused = stTotal > 0 ? (stExcused / stTotal) * 100 : 0;
  const pctUnexcused = stTotal > 0 ? (stUnexcused / stTotal) * 100 : 0;
  const rate = stTotal > 0 ? Math.round((stPresent / stTotal) * 100) : 0;

  const today = new Date();
  today.setHours(0,0,0,0);
  const dd = new Date(dateMs);
  let dateLabel = dd.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  dateLabel = dateLabel.charAt(0).toUpperCase() + dateLabel.slice(1);
  if (dateMs === today.getTime()) {
    dateLabel = 'Hôm nay · ' + dd.toLocaleDateString('vi-VN', { weekday: 'long' });
  }

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

  return (
    <S.PageContainer>
      {/* HEADER */}
      <S.HeaderRow>
        <S.HeaderLeft>
          <S.SubTitle>Lớp {className || '...'} · Check-in đầu ngày</S.SubTitle>
          <S.Title>Điểm danh hàng ngày</S.Title>
        </S.HeaderLeft>
        <div style={{ display: 'flex', gap: '12px' }}>
          <S.SummaryButton onClick={() => setIsQrScannerOpen(true)} style={{ background: '#111827', color: 'white', border: 'none' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', color: 'white' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="3"></rect><rect x="14" y="7" width="3" height="3"></rect><rect x="7" y="14" width="3" height="3"></rect><rect x="14" y="14" width="3" height="3"></rect></svg>
            Quét mã QR
          </S.SummaryButton>
          <S.SummaryButton onClick={handleOpenSummaryModal}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', color: '#b45309' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Tổng hợp đơn
          </S.SummaryButton>
          <S.ExportButton onClick={exportCSV}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', color: theme.colors.green }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Xuất báo cáo
          </S.ExportButton>
        </div>
      </S.HeaderRow>

      {/* TOP 2 BENTO CARDS */}
      <S.BentoGrid>
        {/* CARD 1: ROSTER STATS */}
        <S.StatsCardBento>
          <S.CardHeader>
            <S.CardTitle>Sĩ số thời gian thực</S.CardTitle>
            <S.AttendanceRate>{rate}% chuyên cần</S.AttendanceRate>
          </S.CardHeader>
          <S.MiniStatsGrid>
            <S.MiniStatCard $statusType="total">
              <S.MiniStatVal $colorType="fg">{stTotal}</S.MiniStatVal>
              <S.MiniStatLabel>Sĩ số</S.MiniStatLabel>
            </S.MiniStatCard>
            <S.MiniStatCard $statusType="present">
              <S.MiniStatVal $colorType="green">{stPresent}</S.MiniStatVal>
              <S.MiniStatLabel>Có mặt</S.MiniStatLabel>
            </S.MiniStatCard>
            <S.MiniStatCard $statusType="excused">
              <S.MiniStatVal $colorType="muted">{stExcused}</S.MiniStatVal>
              <S.MiniStatLabel>Có phép</S.MiniStatLabel>
            </S.MiniStatCard>
            <S.MiniStatCard $statusType="unexcused">
              <S.MiniStatVal $colorType="red">{stUnexcused}</S.MiniStatVal>
              <S.MiniStatLabel>Ko phép</S.MiniStatLabel>
            </S.MiniStatCard>
          </S.MiniStatsGrid>
          <S.ProgressBar>
            <S.ProgressSegment $pct={pctPresent} $color={theme.colors.green} />
            <S.ProgressSegment $pct={pctExcused} $color={theme.colors.muted} />
            <S.ProgressSegment $pct={pctUnexcused} $color={theme.colors.red || '#dc2626'} />
          </S.ProgressBar>
        </S.StatsCardBento>

        {/* CARD 2: DATE & FILTERS */}
        <S.FilterCardBento>
          <S.FilterTitleRow>
            <S.FilterIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </S.FilterIcon>
            <S.DateLabelText>{dateLabel}</S.DateLabelText>
          </S.FilterTitleRow>
          <S.DateNavRow>
            <S.NavButton onClick={() => setDateMs(d => d - 86400000)}>
              ← Hôm qua
            </S.NavButton>
            <S.NavButton $today={dateMs === today.getTime()} onClick={() => {
              const d = new Date(); 
              d.setHours(0,0,0,0); 
              setDateMs(d.getTime());
            }}>
              Hôm nay
            </S.NavButton>
            <S.NavButton onClick={() => setDateMs(d => d + 86400000)}>
              Ngày mai →
            </S.NavButton>
          </S.DateNavRow>
          <S.SearchContainer>
            <S.SearchIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </S.SearchIcon>
            <S.SearchInput 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              placeholder="Tìm bé theo tên…" 
            />
            {query && (
              <S.ClearSearchButton onClick={() => setQuery('')}>✕</S.ClearSearchButton>
            )}
          </S.SearchContainer>
        </S.FilterCardBento>
      </S.BentoGrid>

      {/* ROSTER LIST BENTO */}
      <S.RosterSection>
        <S.RosterHeader>
          <S.RosterTitle>
            Danh sách điểm danh <S.ShownCount>· {filtered.length} bé</S.ShownCount>
          </S.RosterTitle>
          <S.LegendContainer>
            <S.LegendItem>
              <S.LegendDot $color={theme.colors.green} />
              Có mặt
            </S.LegendItem>
            <S.LegendItem>
              <S.LegendDot $color={theme.colors.muted} />
              Có phép
            </S.LegendItem>
            <S.LegendItem>
              <S.LegendDot $color={theme.colors.red || '#dc2626'} />
              Không phép
            </S.LegendItem>
          </S.LegendContainer>
        </S.RosterHeader>

        {/* Toolbar & Sort select */}
        <S.ToolbarRow>
          <div style={{ fontSize: '13.5px', color: theme.colors.muted, fontWeight: 600 }}>
            Hiển thị <span style={{ color: theme.colors.fg, fontWeight: 800 }}>{filtered.length}</span> / {stTotal} bé
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <S.SortControl>
              <S.SortLabel>Sắp xếp:</S.SortLabel>
              <S.SortSelect value={sortBy} onChange={e => setSortBy(e.target.value as 'name' | 'time' | 'pending_leave')}>
                <option value="name">Tên từ A → Z</option>
                <option value="time">Giờ điểm danh</option>
                <option value="pending_leave">Đơn chưa duyệt</option>
              </S.SortSelect>
            </S.SortControl>

            <S.ViewToggle>
              <S.ToggleBtn $active={viewMode === 'list'} onClick={() => setViewMode('list')}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                Danh sách
              </S.ToggleBtn>
              <S.ToggleBtn $active={viewMode === 'grid'} onClick={() => setViewMode('grid')}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect></svg>
                Lưới
              </S.ToggleBtn>
            </S.ViewToggle>
          </div>
        </S.ToolbarRow>

        {isFuture() ? (
          <S.FutureState>
            <span style={{ fontSize: '52px' }}>🗓️</span>
            <div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: theme.colors.fg }}>Chưa có dữ liệu điểm danh</div>
              <div style={{ fontSize: '13.5px', color: theme.colors.muted, marginTop: '5px' }}>Ngày trong tương lai — dữ liệu sẽ xuất hiện khi các bé check-in.</div>
            </div>
            <S.NavButton $today style={{ flex: 'none', width: 'auto', padding: '0 24px', height: '42px' }} onClick={() => {
              const d = new Date(); 
              d.setHours(0,0,0,0); 
              setDateMs(d.getTime());
            }}>
              ← Về hôm nay
            </S.NavButton>
          </S.FutureState>
        ) : filtered.length === 0 ? (
          <S.NoResultsState>
            <span style={{ fontSize: '46px' }}>🔍</span>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Không tìm thấy bé nào khớp “{query}”</span>
          </S.NoResultsState>
        ) : viewMode === 'list' ? (
          <>
            {/* column header */}
            <S.TableHeader>
              <span>Học sinh</span>
              <span>Giờ đến</span>
              <span>Trạng thái</span>
              <span>Ghi chú / lý do</span>
            </S.TableHeader>

            <S.TableContainer>
              {sortedAndFiltered.map((s, index) => {
                const sk = getStatusKey(s);
                const st = ST[sk];
                const a = getAvatarInfo(s.name);
                const present = sk === 'present';
                return (
                  <S.Tr key={`${s.id}-${index}`}>
                    <S.StudentInfo>
                      <S.StudentAvatar $grad={a.grad} $dim={st.dim}>
                        {a.initial}
                        {present && <S.OnlineDot />}
                      </S.StudentAvatar>
                      <S.StudentMeta>
                        <S.StudentName>{s.name}</S.StudentName>
                        <S.StudentCode>{s.id.substring(0, 8)}</S.StudentCode>
                      </S.StudentMeta>
                    </S.StudentInfo>
                    <S.TimeText $present={present}>
                      {present && s.arrivalTime && s.arrivalTime !== '--:--' ? s.arrivalTime : '—'}
                    </S.TimeText>
                    <div>
                      <S.BadgeBtn 
                        className="badge-btn"
                        $bg={st.bg} $color={st.c} $borderColor={st.bd}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isFuture()) {
                            addToast('Không thể điểm danh trước cho ngày tương lai!');
                            return;
                          }
                          setMenuPos({ x: e.clientX, y: e.clientY });
                          setOpenMenuId(s.id);
                          setMenuStage('options');
                        }}
                      >
                        <S.BadgeDot $color={st.dot} />
                        {st.label}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </S.BadgeBtn>
                    </div>
                    <S.NotesText>
                      <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {s.healthNote || s.leaveRequestReason || '—'}
                      </span>
                      {(s.attendanceStatus === 'PERMISSION_ABSENCE' || s.leaveRequestReason || s.leaveRequestId) && (
                        <S.ViewFormBtn onClick={(e) => { e.stopPropagation(); handleOpenLeaveRequest(s); }}>Xem đơn</S.ViewFormBtn>
                      )}
                    </S.NotesText>
                  </S.Tr>
                );
              })}
            </S.TableContainer>
          </>
        ) : (
          <S.GridContainer>
            {sortedAndFiltered.map((s, index) => {
              const sk = getStatusKey(s);
              const st = ST[sk];
              const a = getAvatarInfo(s.name);
              const shortName = s.name.split(' ').slice(-2).join(' ');
              
              return (
                <S.GridCard className="badge-btn" key={`${s.id}-${index}`} onClick={(e) => {
                  e.stopPropagation();
                  if (isFuture()) {
                    addToast('Không thể điểm danh trước cho ngày tương lai!');
                    return;
                  }
                  setMenuPos({ x: e.clientX, y: e.clientY });
                  setOpenMenuId(s.id);
                  setMenuStage('options');
                }}>
                  <S.GridAvatar $color={a.grad} $ring={st.dot} $dim={st.dim}>
                    {a.initial}
                    {sk === 'present' && (
                      <span style={{ position: 'absolute', right: '-2px', bottom: '-2px', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', background: st.dot, color: theme.colors.white, boxShadow: `0 0 0 2.5px ${theme.colors.surface}` }}>
                        ✓
                      </span>
                    )}
                    {(s.attendanceStatus === 'PERMISSION_ABSENCE' || s.leaveRequestReason || s.leaveRequestId) && (
                      <span 
                        style={{ position: 'absolute', right: '-2px', top: '-2px', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', background: theme.colors.surface, border: `1px solid ${st.bd}`, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', cursor: 'pointer' }}
                        onClick={(e) => { e.stopPropagation(); handleOpenLeaveRequest(s); }}
                      >
                        📎
                      </span>
                    )}
                  </S.GridAvatar>
                  <span style={{ fontWeight: 700, fontSize: '13px', color: theme.colors.fg, textAlign: 'center', lineHeight: 1.2 }}>{shortName}</span>
                  <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '11.5px', fontWeight: 700, background: st.bg, color: st.c, border: `1px solid ${st.bd}` }}>
                    {st.label}
                  </span>
                </S.GridCard>
              );
            })}
          </S.GridContainer>
        )}

        {rate === 100 && stTotal > 0 && !isFuture() && (
          <S.SuccessBanner>
            <span style={{ fontSize: '26px' }}>🎉</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: theme.colors.green }}>Lớp đã đi học đông đủ!</span>
          </S.SuccessBanner>
        )}
      </S.RosterSection>

      {/* QUICK ATTENDANCE CHANGE POPOVER */}
      {openMenuId && (
        <S.PopoverOverlay 
          ref={popoverRef}
          className="attendance-popover"
          onClick={e => e.stopPropagation()} 
          $x={Math.min(menuPos.x, typeof window !== 'undefined' ? window.innerWidth - 220 : 200)} 
          $y={menuPos.y + 10}
        >
          {menuStage === 'options' ? (
            <div style={{ padding: '5px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: theme.colors.muted, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '6px 8px' }}>
                Đổi trạng thái
              </div>
              <S.PopoverItem onClick={() => handleUpdateStatus(openMenuId, 'Present')}>
                <S.PopoverItemDot $color={theme.colors.greenMid} />
                Có mặt
              </S.PopoverItem>
              <S.PopoverItem onClick={() => {
                const targetStu = students.find(s => s.id === openMenuId);
                setReasonDraft(targetStu?.healthNote || targetStu?.leaveRequestReason || '');
                setMenuStage('reason');
              }}>
                <S.PopoverItemDot $color={theme.colors.amberMid} />
                Vắng có phép
              </S.PopoverItem>
              <S.PopoverItem onClick={() => handleUpdateStatus(openMenuId, 'Absent')}>
                <S.PopoverItemDot $color={theme.colors.redMid || '#ef4444'} />
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
                  <S.PopoverSaveButton type="button" style={{ background: theme.colors.bg, color: theme.colors.muted, border: `1px solid ${theme.colors.border}` }} onClick={() => setOpenMenuId(null)}>Hủy</S.PopoverSaveButton>
                </div>
              </form>
            </S.PopoverReasonContainer>
          )}
        </S.PopoverOverlay>
      )}

      {/* TOASTS CONTAINER */}
      <S.ToastContainer>
        {toasts.map(t => <S.ToastMsg key={t.id}>{t.text}</S.ToastMsg>)}
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

      {/* SUMMARY LEAVE REQUESTS MODAL */}
      {isSummaryModalOpen && (
        <S.ModalOverlay onClick={() => setIsSummaryModalOpen(false)}>
          <S.SummaryModalContent onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <S.ModalTitle style={{ margin: 0, fontSize: '18px' }}>Tổng hợp đơn xin nghỉ học</S.ModalTitle>
              <button 
                onClick={() => setIsSummaryModalOpen(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: theme.colors.muted }}
              >
                ✕
              </button>
            </div>

            <S.TabRow>
              <S.TabBtn $active={summaryFilter === 'ALL'} onClick={() => setSummaryFilter('ALL')}>
                Tất cả ({allLeaves.length})
              </S.TabBtn>
              <S.TabBtn $active={summaryFilter === 'PENDING'} onClick={() => setSummaryFilter('PENDING')}>
                Chờ duyệt ({allLeaves.filter(l => l.status === 'PENDING').length})
              </S.TabBtn>
              <S.TabBtn $active={summaryFilter === 'APPROVED'} onClick={() => setSummaryFilter('APPROVED')}>
                Đã duyệt ({allLeaves.filter(l => l.status === 'APPROVED').length})
              </S.TabBtn>
              <S.TabBtn $active={summaryFilter === 'REJECTED'} onClick={() => setSummaryFilter('REJECTED')}>
                Từ chối ({allLeaves.filter(l => l.status === 'REJECTED').length})
              </S.TabBtn>
            </S.TabRow>

            {isLoadingSummary ? (
              <div style={{ padding: '50px 0', textAlign: 'center', color: theme.colors.muted, fontWeight: 600 }}>
                Đang tải danh sách đơn phép...
              </div>
            ) : (
              <S.SummaryTableWrapper>
                <S.SummaryTable>
                  <thead>
                    <tr>
                      <S.SummaryTh>Học sinh</S.SummaryTh>
                      <S.SummaryTh>Thời gian nghỉ</S.SummaryTh>
                      <S.SummaryTh>Lý do</S.SummaryTh>
                      <S.SummaryTh>Trạng thái</S.SummaryTh>
                    </tr>
                  </thead>
                  <tbody>
                    {allLeaves
                      .filter(l => {
                        if (summaryFilter === 'PENDING') return l.status === 'PENDING';
                        if (summaryFilter === 'APPROVED') return l.status === 'APPROVED';
                        if (summaryFilter === 'REJECTED') return l.status === 'REJECTED';
                        return true;
                      })
                      .map((l, index) => {
                        const fromStr = l.fromDate ? new Date(l.fromDate * 1000).toLocaleDateString('vi-VN') : '...';
                        const toStr = l.toDate ? new Date(l.toDate * 1000).toLocaleDateString('vi-VN') : '...';
                        return (
                          <S.SummaryTr 
                            key={`${l.id}-${index}`}
                            onClick={() => {
                              const dummyStudent: Student = {
                                id: l.studentId,
                                name: l.studentName,
                                avatar: '',
                                attendanceStatus: l.status === 'APPROVED' ? 'PERMISSION_ABSENCE' : (l.status === 'REJECTED' ? 'UNEXCUSED_ABSENCE' : 'NOT_YET'),
                                arrivalTime: '--:--',
                                healthNote: '',
                                hasActiveLeaveRequest: l.status === 'PENDING',
                                leaveRequestId: l.id,
                                leaveRequestStatus: l.status,
                                leaveRequestReason: l.reason
                              };
                              setSelectedLeaveRequest(dummyStudent);
                              setLeaveReqDetail(l);
                            }}
                          >
                            <S.SummaryTd style={{ fontWeight: 700 }}>{l.studentName}</S.SummaryTd>
                            <S.SummaryTd>{fromStr} - {toStr}</S.SummaryTd>
                            <S.SummaryTd style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {l.reason || 'Không rõ lý do'}
                            </S.SummaryTd>
                            <S.SummaryTd>
                              <S.ModalValue $status={l.status}>
                                {l.status === 'APPROVED' ? 'Đã duyệt' : (l.status === 'REJECTED' ? 'Từ chối' : 'Chờ duyệt')}
                              </S.ModalValue>
                            </S.SummaryTd>
                          </S.SummaryTr>
                        );
                      })}
                    {allLeaves.filter(l => {
                      if (summaryFilter === 'PENDING') return l.status === 'PENDING';
                      if (summaryFilter === 'APPROVED') return l.status === 'APPROVED';
                      if (summaryFilter === 'REJECTED') return l.status === 'REJECTED';
                      return true;
                    }).length === 0 && (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', padding: '30px', color: theme.colors.muted, fontWeight: 500 }}>
                          Không có đơn xin nghỉ học nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </S.SummaryTable>
              </S.SummaryTableWrapper>
            )}

            <S.ModalActionRow style={{ marginTop: '20px' }}>
              <S.ModalCloseBtn onClick={() => setIsSummaryModalOpen(false)}>Đóng</S.ModalCloseBtn>
            </S.ModalActionRow>
          </S.SummaryModalContent>
        </S.ModalOverlay>
      )}

      {/* VIEW LEAVE REQUEST MODAL */}
      {selectedLeaveRequest && (
        <S.ModalOverlay onClick={() => setSelectedLeaveRequest(null)} style={{ zIndex: 10000 }}>
          <S.ModalContent onClick={e => e.stopPropagation()}>
            <S.ModalTitle>Đơn xin phép - {selectedLeaveRequest.name}</S.ModalTitle>
            
            {isLoadingReqDetail ? (
              <div style={{ padding: '40px 0', textAlign: 'center', color: theme.colors.muted, fontSize: '14px', fontWeight: 500 }}>
                Đang tải dữ liệu chi tiết...
              </div>
            ) : leaveReqDetail ? (
              <>
                <S.ModalMetaRow>
                  <S.ModalMetaField>
                    <S.ModalLabel>Phụ huynh: </S.ModalLabel>
                    <span style={{ color: theme.colors.fg, fontWeight: 500 }}>{leaveReqDetail.parentName} ({leaveReqDetail.relationship})</span>
                  </S.ModalMetaField>
                  <S.ModalMetaField>
                    <S.ModalLabel>Trạng thái: </S.ModalLabel>
                    <S.ModalValue $status={leaveReqDetail.status}>
                      {leaveReqDetail.status === 'APPROVED' ? 'Đã duyệt' : (leaveReqDetail.status === 'REJECTED' ? 'Từ chối' : 'Chờ duyệt')}
                    </S.ModalValue>
                  </S.ModalMetaField>
                  <S.ModalMetaField>
                    <S.ModalLabel>Thời gian nghỉ: </S.ModalLabel>
                    <span style={{ color: theme.colors.fg, fontWeight: 500 }}>
                      Từ {leaveReqDetail.fromDate ? new Date(leaveReqDetail.fromDate * 1000).toLocaleDateString('vi-VN') : '...'} đến {leaveReqDetail.toDate ? new Date(leaveReqDetail.toDate * 1000).toLocaleDateString('vi-VN') : '...'}
                    </span>
                  </S.ModalMetaField>
                </S.ModalMetaRow>

                <div style={{ fontSize: '13px', color: theme.colors.muted, marginBottom: '6px', fontWeight: 700 }}>LÝ DO:</div>
                <S.ModalReasonBox>
                  {leaveReqDetail.reason || 'Không ghi rõ lý do'}
                </S.ModalReasonBox>
                
                {leaveReqDetail.attachmentUrl && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '13px', color: theme.colors.muted, marginBottom: '6px', fontWeight: 700 }}>MINH CHỨNG ĐÍNH KÈM:</div>
                    <img src={leaveReqDetail.attachmentUrl} alt="Minh chứng" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '8px', border: `1px solid ${theme.colors.border}`, objectFit: 'cover' }} />
                  </div>
                )}
              </>
            ) : (
              <>
                <S.ModalMetaRow>
                  <S.ModalMetaField>
                    <S.ModalLabel>Trạng thái: </S.ModalLabel>
                    <S.ModalValue $status={selectedLeaveRequest.leaveRequestStatus}>
                      {selectedLeaveRequest.leaveRequestStatus === 'APPROVED' || selectedLeaveRequest.attendanceStatus === 'PERMISSION_ABSENCE' ? 'Đã duyệt / Có phép' : (selectedLeaveRequest.leaveRequestStatus === 'REJECTED' || selectedLeaveRequest.attendanceStatus === 'UNEXCUSED_ABSENCE' ? 'Từ chối / Không phép' : 'Chờ duyệt')}
                    </S.ModalValue>
                  </S.ModalMetaField>
                </S.ModalMetaRow>
                <div style={{ fontSize: '13px', color: theme.colors.muted, marginBottom: '6px', fontWeight: 700 }}>GHI CHÚ / LÝ DO:</div>
                <S.ModalReasonBox>
                  {selectedLeaveRequest.leaveRequestReason || 'Không ghi rõ lý do'}
                </S.ModalReasonBox>
              </>
            )}
            
            <S.ModalActionRow>
              {((leaveReqDetail && leaveReqDetail.status === 'PENDING') ||
                 (!leaveReqDetail && selectedLeaveRequest.leaveRequestStatus === 'PENDING')) ? (
                <>
                  <S.ModalRejectBtn onClick={() => handleProcessLeaveRequest(leaveReqDetail?.id || selectedLeaveRequest.leaveRequestId!, 'REJECTED')}>Từ chối</S.ModalRejectBtn>
                  <S.ModalApproveBtn onClick={() => handleProcessLeaveRequest(leaveReqDetail?.id || selectedLeaveRequest.leaveRequestId!, 'APPROVED')}>Xác nhận & Duyệt</S.ModalApproveBtn>
                </>
              ) : (
                <S.ModalCloseBtn onClick={() => setSelectedLeaveRequest(null)}>Đóng</S.ModalCloseBtn>
              )}
            </S.ModalActionRow>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.PageContainer>
  );
};
