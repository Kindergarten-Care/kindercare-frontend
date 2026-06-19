import React, { useState, useEffect, useRef } from 'react';
import * as S from './styles';
import { AttendanceService } from '../../services/attendance';
import { Student, LeaveRequest } from '../../config/types/attendance';

export const AttendanceView: React.FC = () => {
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
  
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [reasonDraft, setReasonDraft] = useState('');
  const [menuStage, setMenuStage] = useState<'options' | 'reason'>('options');

  let toastIdCounter = useRef(0);

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

  // Click outside menu
  useEffect(() => {
    const handleClick = () => {
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

  const ST = {
    present:   { label: 'Có mặt',          c: '#059669', bg: '#ECFDF5', bd: '#A7F3D0', ring: '#10B981', dim: false },
    excused:   { label: 'Vắng có phép',    c: '#D97706', bg: '#FEF3C7', bd: '#FDE68A', ring: '#F59E0B', dim: false },
    unexcused: { label: 'Vắng không phép', c: '#E11D48', bg: '#FFF1F2', bd: '#FECDD3', ring: '#F43F5E', dim: true },
    absent:    { label: 'Chưa điểm danh',  c: '#6B7280', bg: '#F3F4F6', bd: '#E5E7EB', ring: '#9CA3AF', dim: true }, // Default backend state
  };

  const getStatusKey = (s: Student) => {
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
      
      // Update attendance status in database to sync
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
      
      // Tự động đồng bộ Đơn xin phép nếu bé có Đơn
      const targetStudent = students.find(s => s.id === studentId);
      let newLeaveReqStatus = targetStudent?.leaveRequestStatus;

      if (targetStudent && targetStudent.leaveRequestId && newDomainStatus !== 'PRESENT') {
        const syncActionStatus = newDomainStatus === 'PERMISSION_ABSENCE' ? 'APPROVED' : 'REJECTED';
        try {
          // Gửi API duyệt hoặc từ chối tự động
          await AttendanceService.processLeaveRequest(targetStudent.leaveRequestId, syncActionStatus);
          newLeaveReqStatus = syncActionStatus;
          
          // Cập nhật lại Modal Detail nếu đang mở đúng bé đó
          if (leaveReqDetail && leaveReqDetail.id === targetStudent.leaveRequestId) {
            setLeaveReqDetail({ ...leaveReqDetail, status: syncActionStatus });
          }
        } catch (e) {
          console.error('Lỗi tự động đồng bộ trạng thái đơn:', e);
        }
      }
      
      // Optimistic update
      setStudents(prev => prev.map(s => {
        if (s.id === studentId) {
          return {
            ...s,
            attendanceStatus: newDomainStatus,
            arrivalTime: payload.arrivalTime || s.arrivalTime,
            leaveRequestReason: reason || s.leaveRequestReason
          };
        }
        return s;
      }));
      
      addToast('Cập nhật thành công');
      setOpenMenuId(null);
    } catch (err: any) {
      console.error('Update failed:', err);
      const msg = err.response?.data?.message || err.message || 'Lỗi cập nhật';
      addToast(`Lỗi: ${msg}`);
    }
  };

  const av = (name: string) => {
    const palette = ['#FCA5A5','#FCD34D','#6EE7B7','#93C5FD','#C4B5FD','#F9A8D4','#FDBA74','#67E8F9','#A5B4FC','#5EEAD4'];
    const p = name.trim().split(' ');
    const initial = p[p.length - 1]?.[0]?.toUpperCase() || '?';
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return { initial, color: palette[h % palette.length] };
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
  
  let stTotal = students.length;
  let stPresent = 0;
  let stExcused = 0;
  let stUnexcused = 0;

  students.forEach(s => {
    const key = getStatusKey(s);
    if (key === 'present') stPresent++;
    else if (key === 'excused') stExcused++;
    else if (key === 'unexcused') stUnexcused++;
  });

  const dObj = new Date(dateMs);
  const dateLabel = `Ngày ${dObj.getDate()} tháng ${dObj.getMonth() + 1}, ${dObj.getFullYear()}`;

  return (
    <S.PageContainer>
      <S.TopBar>
        <div style={{ flex: 'none' }}>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#1F2937', letterSpacing: '-.02em' }}>
            Điểm danh hàng ngày
          </div>
          <div style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 500, marginTop: '2px' }}>
            Lớp {className || '...'}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px', flex: 1, maxWidth: '420px', height: '46px', padding: '0 18px', borderRadius: '999px', background: '#fff', border: '1px solid #EAEFEA', boxShadow: '0 2px 10px rgba(16,24,40,.03)' }}>
          <span style={{ color: '#9CA3AF', display: 'flex' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
          <input 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            placeholder="Tìm bé theo tên…" 
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: '14px', color: '#1F2937' }} 
          />
        </div>
        <div style={{ flex: 1 }}></div>
      </S.TopBar>

      <S.ContentContainer>
        <S.ControlRow>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <S.DateControl>
              <S.NavButton onClick={() => setDateMs(d => d - 86400000)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </S.NavButton>
              <S.DateLabel>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#10B981' }}><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                {dateLabel}
              </S.DateLabel>
              <S.NavButton onClick={() => setDateMs(d => d + 86400000)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </S.NavButton>
            </S.DateControl>
            <S.ActionButton $primary onClick={() => {
              const d = new Date(); d.setHours(0,0,0,0); setDateMs(d.getTime());
            }}>
              Hôm nay
            </S.ActionButton>
          </div>
          <S.ActionButton onClick={() => addToast('Đang tạo báo cáo Excel...')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#10B981' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Xuất báo cáo
          </S.ActionButton>
        </S.ControlRow>

        <S.StatsGrid>
          <S.StatCard>
            <S.StatIcon $bg="#EEF2FF" $color="#4F46E5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path></svg>
            </S.StatIcon>
            <div>
              <div style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 600 }}>Sĩ số lớp</div>
              <div style={{ fontSize: '30px', fontWeight: 800, color: '#1F2937', lineHeight: 1.1 }}>{stTotal}</div>
            </div>
          </S.StatCard>
          <S.StatCard>
            <S.StatIcon $bg="#ECFDF5" $color="#10B981">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </S.StatIcon>
            <div>
              <div style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 600 }}>Có mặt</div>
              <div style={{ fontSize: '30px', fontWeight: 800, color: '#059669', lineHeight: 1.1 }}>{stPresent}</div>
            </div>
          </S.StatCard>
          <S.StatCard>
            <S.StatIcon $bg="#F3F4F6" $color="#6B7280">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </S.StatIcon>
            <div>
              <div style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 600 }}>Vắng có phép</div>
              <div style={{ fontSize: '30px', fontWeight: 800, color: '#4B5563', lineHeight: 1.1 }}>{stExcused}</div>
            </div>
          </S.StatCard>
          <S.StatCard $borderColor="#FECDD3">
            <S.StatIcon $bg="#FFF1F2" $color="#F43F5E">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </S.StatIcon>
            <div>
              <div style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 600 }}>Vắng không phép</div>
              <div style={{ fontSize: '30px', fontWeight: 800, color: '#E11D48', lineHeight: 1.1 }}>{stUnexcused}</div>
            </div>
          </S.StatCard>
        </S.StatsGrid>

        <S.ToolbarRow>
          <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: 600 }}>
            Hiển thị <span style={{ color: '#1F2937', fontWeight: 800 }}>{filtered.length}</span> / {stTotal} bé
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

        <S.Board>
          {filtered.length === 0 ? (
            <S.EmptyState>
              <span style={{ fontSize: '56px' }}>🔍</span>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#6B7280' }}>
                Không tìm thấy bé nào khớp với "{query}"
              </div>
            </S.EmptyState>
          ) : viewMode === 'list' ? (
            <S.ListContainer>
              <S.Table>
                <thead>
                  <tr>
                    <S.Th>Học sinh</S.Th>
                    <S.Th>Trạng thái</S.Th>
                    <S.Th>Giờ đến</S.Th>
                    <S.Th>Ghi chú</S.Th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAndFiltered.map((s, index) => {
                    const sk = getStatusKey(s);
                    const st = ST[sk as keyof typeof ST];
                    const a = av(s.name);
                    return (
                      <S.Tr key={`${s.id}-${index}`}>
                        <S.Td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                            <S.Avatar $color={a.color} $ring={st.ring} $dim={st.dim}>{a.initial}</S.Avatar>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '14.5px', color: '#1F2937' }}>{s.name}</div>
                              <div style={{ fontSize: '11.5px', color: '#9CA3AF' }}>{s.id.substring(0, 8)}</div>
                            </div>
                          </div>
                        </S.Td>
                        <S.Td>
                          <S.BadgeBtn 
                            $bg={st.bg} $color={st.c} $borderColor={st.bd} $dim={st.dim}
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
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: st.ring }}></span>
                            {st.label}
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.55 }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                          </S.BadgeBtn>
                        </S.Td>
                        <S.Td>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: st.c }}>{s.arrivalTime && s.arrivalTime !== '--:--' ? s.arrivalTime : ''}</div>
                        </S.Td>
                        <S.Td>
                          <div style={{ fontSize: '13.5px', color: '#6B7280', maxWidth: '280px', display: 'flex', alignItems: 'center' }}>
                            {s.healthNote || ''}
                            {(s.attendanceStatus === 'PERMISSION_ABSENCE' || s.leaveRequestReason || s.leaveRequestStatus) && (
                              <S.ViewFormBtn onClick={(e) => { e.stopPropagation(); handleOpenLeaveRequest(s); }}>Xem đơn</S.ViewFormBtn>
                            )}
                          </div>
                        </S.Td>
                      </S.Tr>
                    );
                  })}
                </tbody>
              </S.Table>
            </S.ListContainer>
          ) : (
            <S.GridContainer>
              {sortedAndFiltered.map((s, index) => {
                const sk = getStatusKey(s);
                const st = ST[sk as keyof typeof ST];
                const a = av(s.name);
                const shortName = s.name.split(' ').slice(-2).join(' ');
                
                return (
                  <S.GridCard key={`${s.id}-${index}`} onClick={(e) => {
                    e.stopPropagation();
                    if (isFuture()) {
                      addToast('Không thể điểm danh trước cho ngày tương lai!');
                      return;
                    }
                    setMenuPos({ x: e.clientX, y: e.clientY });
                    setOpenMenuId(s.id);
                    setMenuStage('options');
                  }}>
                    <S.GridAvatar $color={a.color} $ring={st.ring} $dim={st.dim}>
                      {a.initial}
                      <span style={{ position: 'absolute', right: '-2px', bottom: '-2px', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', background: st.ring, color: '#fff', boxShadow: '0 0 0 2.5px #FBFDFC' }}>
                        {sk === 'present' ? '✓' : ''}
                      </span>
                      {(s.attendanceStatus === 'PERMISSION_ABSENCE' || s.leaveRequestReason || s.leaveRequestStatus) && (
                        <span 
                          style={{ position: 'absolute', right: '-2px', top: '-2px', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', background: '#fff', border: `1px solid ${st.bd}`, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', cursor: 'pointer' }}
                          onClick={(e) => { e.stopPropagation(); handleOpenLeaveRequest(s); }}
                        >
                          📎
                        </span>
                      )}
                    </S.GridAvatar>
                    <span style={{ fontWeight: 700, fontSize: '13px', color: '#1F2937', textAlign: 'center', lineHeight: 1.2 }}>{shortName}</span>
                    <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '11.5px', fontWeight: 700, background: st.bg, color: st.c, border: `1px solid ${st.bd}` }}>
                      {st.label}
                    </span>
                  </S.GridCard>
                );
              })}
            </S.GridContainer>
          )}
        </S.Board>
      </S.ContentContainer>

      {/* STATUS POPOVER */}
      {openMenuId && (
        <S.PopoverOverlay onClick={e => e.stopPropagation()} style={{ left: Math.min(menuPos.x, window.innerWidth - 220), top: menuPos.y + 10 }}>
          {menuStage === 'options' ? (
            <div style={{ padding: '5px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em', padding: '6px 8px' }}>
                Đổi trạng thái
              </div>
              <button onClick={() => handleUpdateStatus(openMenuId, 'Present')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 8px', borderRadius: '10px', border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: '13.5px', fontWeight: 600, color: '#374151', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: ST.present.ring }}></span>
                Có mặt
              </button>
              <button onClick={() => {
                setReasonDraft('');
                setMenuStage('reason');
              }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 8px', borderRadius: '10px', border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: '13.5px', fontWeight: 600, color: '#374151', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: ST.excused.ring }}></span>
                Vắng có phép
              </button>
              <button onClick={() => handleUpdateStatus(openMenuId, 'Absent')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 8px', borderRadius: '10px', border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: '13.5px', fontWeight: 600, color: '#374151', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: ST.unexcused.ring }}></span>
                Vắng không phép
              </button>
            </div>
          ) : (
            <div style={{ padding: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#6B7280', paddingBottom: '8px' }}>Lý do xin phép</div>
              <input 
                autoFocus
                value={reasonDraft} 
                onChange={e => setReasonDraft(e.target.value)} 
                placeholder="VD: Bé bị ốm..." 
                style={{ width: '100%', height: '42px', border: '1px solid #E3F0E8', borderRadius: '11px', padding: '0 13px', fontFamily: 'inherit', fontSize: '13.5px', outline: 'none', background: '#F7FBF8' }}
              />
              <div style={{ display: 'flex', gap: '8px', marginTop: '9px' }}>
                <button onClick={() => handleUpdateStatus(openMenuId, 'Excused', reasonDraft)} style={{ flex: 1, height: '40px', borderRadius: '11px', border: 'none', background: '#10B981', color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: '13.5px', cursor: 'pointer' }}>Lưu</button>
                <button onClick={() => setOpenMenuId(null)} style={{ height: '40px', padding: '0 16px', borderRadius: '11px', border: '1px solid #EAEFEA', background: '#fff', color: '#6B7280', fontFamily: 'inherit', fontWeight: 600, fontSize: '13.5px', cursor: 'pointer' }}>Hủy</button>
              </div>
            </div>
          )}
        </S.PopoverOverlay>
      )}

      <S.ToastContainer>
        {toasts.map(t => <S.ToastMsg key={t.id}>{t.text}</S.ToastMsg>)}
      </S.ToastContainer>

      {/* VIEW LEAVE REQUEST MODAL */}
      {selectedLeaveRequest && (
        <S.ModalOverlay onClick={() => setSelectedLeaveRequest(null)}>
          <S.ModalContent onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#1F2937', marginBottom: '16px' }}>Đơn xin phép - {selectedLeaveRequest.name}</div>
            
            {isLoadingReqDetail ? (
              <div style={{ padding: '40px 0', textAlign: 'center', color: '#6B7280', fontSize: '14px', fontWeight: 500 }}>
                Đang tải dữ liệu chi tiết...
              </div>
            ) : leaveReqDetail ? (
              <>
                <div style={{ fontSize: '14px', color: '#4B5563', marginBottom: '8px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div>
                    <strong>Phụ huynh: </strong>
                    <span style={{ color: '#1F2937', fontWeight: 500 }}>{leaveReqDetail.parentName} ({leaveReqDetail.relationship})</span>
                  </div>
                  <div>
                    <strong>Trạng thái: </strong>
                    <span style={{ color: leaveReqDetail.status === 'APPROVED' ? '#059669' : (leaveReqDetail.status === 'REJECTED' ? '#E11D48' : '#D97706'), fontWeight: 600 }}>
                      {leaveReqDetail.status === 'APPROVED' ? 'Đã duyệt' : (leaveReqDetail.status === 'REJECTED' ? 'Từ chối' : 'Chờ duyệt')}
                    </span>
                  </div>
                </div>
                
                <div style={{ fontSize: '14px', color: '#4B5563', marginBottom: '12px' }}>
                  <strong>Thời gian nghỉ: </strong>
                  <span style={{ color: '#1F2937', fontWeight: 500 }}>
                    Từ {leaveReqDetail.fromDate ? new Date(leaveReqDetail.fromDate * 1000).toLocaleDateString('vi-VN') : '...'} đến {leaveReqDetail.toDate ? new Date(leaveReqDetail.toDate * 1000).toLocaleDateString('vi-VN') : '...'}
                  </span>
                </div>

                <div style={{ fontSize: '13.5px', color: '#6B7280', marginBottom: '6px', fontWeight: 600 }}>Lý do:</div>
                <div style={{ fontSize: '14px', color: '#1F2937', background: '#F9FAFB', border: '1px solid #E5E7EB', padding: '12px', borderRadius: '12px', minHeight: '60px', marginBottom: '20px' }}>
                  {leaveReqDetail.reason || 'Không ghi rõ lý do'}
                </div>
                
                {leaveReqDetail.attachmentUrl && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '13.5px', color: '#6B7280', marginBottom: '6px', fontWeight: 600 }}>Minh chứng đính kèm:</div>
                    <img src={leaveReqDetail.attachmentUrl} alt="Minh chứng" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '8px', border: '1px solid #E5E7EB', objectFit: 'cover' }} />
                  </div>
                )}
              </>
            ) : (
              <>
                <div style={{ fontSize: '14px', color: '#4B5563', marginBottom: '8px' }}>
                  <strong>Trạng thái: </strong>
                  <span style={{ color: selectedLeaveRequest.leaveRequestStatus === 'APPROVED' || selectedLeaveRequest.attendanceStatus === 'PERMISSION_ABSENCE' ? '#059669' : (selectedLeaveRequest.leaveRequestStatus === 'REJECTED' || selectedLeaveRequest.attendanceStatus === 'UNEXCUSED_ABSENCE' ? '#E11D48' : '#D97706'), fontWeight: 600 }}>
                    {selectedLeaveRequest.leaveRequestStatus === 'APPROVED' || selectedLeaveRequest.attendanceStatus === 'PERMISSION_ABSENCE' ? 'Đã duyệt / Có phép' : (selectedLeaveRequest.leaveRequestStatus === 'REJECTED' || selectedLeaveRequest.attendanceStatus === 'UNEXCUSED_ABSENCE' ? 'Từ chối / Không phép' : 'Chờ duyệt')}
                  </span>
                </div>
                <div style={{ fontSize: '13.5px', color: '#6B7280', marginBottom: '6px', fontWeight: 600 }}>Ghi chú / Lý do:</div>
                <div style={{ fontSize: '14px', color: '#1F2937', background: '#F9FAFB', border: '1px solid #E5E7EB', padding: '12px', borderRadius: '12px', minHeight: '80px', marginBottom: '20px' }}>
                  {selectedLeaveRequest.leaveRequestReason || 'Không ghi rõ lý do'}
                </div>
              </>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              {((leaveReqDetail && leaveReqDetail.status === 'PENDING') ||
                 (!leaveReqDetail && selectedLeaveRequest.leaveRequestStatus === 'PENDING')) ? (
                <>
                  <S.ModalRejectBtn onClick={() => handleProcessLeaveRequest(leaveReqDetail?.id || selectedLeaveRequest.leaveRequestId!, 'REJECTED')}>Từ chối</S.ModalRejectBtn>
                  <S.ModalApproveBtn onClick={() => handleProcessLeaveRequest(leaveReqDetail?.id || selectedLeaveRequest.leaveRequestId!, 'APPROVED')}>Xác nhận & Duyệt</S.ModalApproveBtn>
                </>
              ) : (
                <button 
                  onClick={() => setSelectedLeaveRequest(null)}
                  style={{ padding: '8px 20px', background: '#F3F4F6', color: '#4B5563', fontWeight: 600, border: 'none', borderRadius: '10px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px' }}
                >
                  Đóng
                </button>
              )}
            </div>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.PageContainer>
  );
};
