import { useState, useEffect, useMemo, useCallback } from 'react';
import { Student, LeaveRequest, AttendanceStatus } from '@/config/types/attendance';
import { AttendanceService, TeacherClass } from '@/services/attendance';

const getTodayDateString = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function useAttendance(classId: string = 'MN1') {
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());
  
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Leave Request modal state
  const [leaveRequestModalOpen, setLeaveRequestModalOpen] = useState<boolean>(false);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<LeaveRequest | null>(null);

  // Leave Requests List modal state
  const [leaveRequestsListModalOpen, setLeaveRequestsListModalOpen] = useState<boolean>(false);
  const [allLeaveRequests, setAllLeaveRequests] = useState<LeaveRequest[]>([]);

  // Quick Attendance modal state
  const [quickAttendanceModalOpen, setQuickAttendanceModalOpen] = useState<boolean>(false);

  // Load classes assigned to the teacher on mount
  useEffect(() => {
    const loadClasses = async () => {
      try {
        const classList = await AttendanceService.getTeacherClasses();
        setClasses(classList);
        if (classList.length > 0) {
          setSelectedClassId(classList[0].classId);
        } else {
          setSelectedClassId(null); // No fallback to 1 to avoid 403 Forbidden errors if no classes exist
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to load teacher classes:', error);
        setSelectedClassId(null);
        setLoading(false);
      }
    };
    loadClasses();
  }, []);

  const fetchLeaveRequests = useCallback(async (): Promise<void> => {
    try {
      const list = await AttendanceService.getAllLeaveRequests();
      setAllLeaveRequests(list);
    } catch (error) {
      console.error('Failed to fetch leave requests:', error);
    }
  }, []);

  // Fetch initial records
  const fetchAttendance = useCallback(async (): Promise<void> => {
    if (selectedClassId === null) return;
    try {
      setLoading(true);
      const data = await AttendanceService.getDailyAttendance(selectedClassId, selectedDate);
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch attendance data:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedClassId, selectedDate]);

  useEffect(() => {
    fetchAttendance();
    fetchLeaveRequests();
  }, [fetchAttendance, fetchLeaveRequests]);

  // Update status for a specific student
  const handleStatusChange = useCallback((studentId: string, status: AttendanceStatus): void => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const arrivalTime = status === 'PRESENT' ? '08:00' : '--:--';
        return {
          ...s,
          attendanceStatus: status,
          arrivalTime,
        };
      }
      return s;
    }));
  }, []);

  // Update arrival time
  const handleArrivalTimeChange = useCallback((studentId: string, time: string): void => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, arrivalTime: time };
      }
      return s;
    }));
  }, []);

  // Update health note (local UI state only as DB Attendances doesn't support notes)
  const handleHealthNoteChange = useCallback((studentId: string, note: string): void => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, healthNote: note };
      }
      return s;
    }));
  }, []);

  // Bulk quick fill
  const handleQuickAttendance = useCallback((status: 'PRESENT_ALL' | AttendanceStatus): void => {
    setStudents(prev => prev.map(s => {
      if (s.hasActiveLeaveRequest && status === 'PRESENT_ALL') {
        return s;
      }
      
      let finalStatus: AttendanceStatus = 'PRESENT';
      if (status === 'PRESENT_ALL') {
        finalStatus = 'PRESENT';
      } else {
        finalStatus = status;
      }

      const arrivalTime = finalStatus === 'PRESENT' ? '08:00' : '--:--';
      return {
        ...s,
        attendanceStatus: finalStatus,
        arrivalTime,
      };
    }));
    setQuickAttendanceModalOpen(false);
  }, []);

  // Open & load leave request details
  const handleSelectLeaveRequest = useCallback(async (requestId: string): Promise<void> => {
    try {
      const details = await AttendanceService.getLeaveRequestDetail(requestId);
      if (details) {
        setSelectedLeaveRequest(details);
        setLeaveRequestModalOpen(true);
      }
    } catch (error) {
      console.error('Failed to load leave request detail:', error);
    }
  }, []);

  // Approve / reject leave request
  const handleProcessLeaveRequest = useCallback(async (requestId: string, status: 'APPROVED' | 'REJECTED'): Promise<void> => {
    try {
      setSaving(true);
      const success = await AttendanceService.processLeaveRequest(requestId, status);
      if (success) {
        await fetchAttendance();
        await fetchLeaveRequests();
        setLeaveRequestModalOpen(false);
        setSelectedLeaveRequest(null);
      }
    } catch (error) {
      console.error('Failed to process leave request:', error);
    } finally {
      setSaving(false);
    }
  }, [fetchAttendance, fetchLeaveRequests]);

  // Persist current page values to server db
  const handleSave = useCallback(async (): Promise<boolean> => {
    if (selectedClassId === null) return false;
    try {
      setSaving(true);
      const payload = students.map(s => ({
        studentId: s.id,
        status: s.attendanceStatus,
        arrivalTime: s.arrivalTime,
        healthNote: s.healthNote,
      }));
      await AttendanceService.updateAttendance(selectedClassId, selectedDate, payload);
      alert('Lưu điểm danh & đồng bộ thành công!');
      return true;
    } catch (error) {
      console.error('Failed to save attendance:', error);
      alert('Không thể lưu điểm danh. Vui lòng thử lại!');
      return false;
    } finally {
      setSaving(false);
    }
  }, [selectedClassId, selectedDate, students]);

  // Filtered lists
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchStatus = true;
      if (statusFilter === 'PRESENT') {
        matchStatus = s.attendanceStatus === 'PRESENT' && !s.hasActiveLeaveRequest;
      } else if (statusFilter === 'ABSENT') {
        matchStatus = s.attendanceStatus === 'PERMISSION_ABSENCE' || s.attendanceStatus === 'UNEXCUSED_ABSENCE';
      } else if (statusFilter === 'PERMISSION_ABSENCE') {
        matchStatus = s.attendanceStatus === 'PERMISSION_ABSENCE';
      } else if (statusFilter === 'UNEXCUSED_ABSENCE') {
        matchStatus = s.attendanceStatus === 'UNEXCUSED_ABSENCE';
      }

      return matchSearch && matchStatus;
    });
  }, [students, searchQuery, statusFilter]);

  // Statistics
  const statistics = useMemo(() => {
    const total = students.length;
    const present = students.filter(s => s.attendanceStatus === 'PRESENT' && !s.hasActiveLeaveRequest).length;
    const absentPermission = students.filter(s => s.attendanceStatus === 'PERMISSION_ABSENCE').length;
    const absentUnexcused = students.filter(s => s.attendanceStatus === 'UNEXCUSED_ABSENCE').length;
    const totalAbsent = absentPermission + absentUnexcused;

    return {
      total,
      present,
      absentPermission,
      absentUnexcused,
      totalAbsent,
    };
  }, [students]);

  const classLeaveRequests = useMemo(() => {
    if (selectedClassId === null) return [];
    return allLeaveRequests.filter(r => r.classId === selectedClassId && r.status === 'PENDING');
  }, [allLeaveRequests, selectedClassId]);

  const pendingClassLeaveRequestsCount = useMemo(() => {
    return classLeaveRequests.length;
  }, [classLeaveRequests]);

  return {
    students,
    filteredStudents,
    loading,
    saving,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    statistics,
    
    // Date state
    selectedDate,
    setSelectedDate,

    // Classes state
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
    fetchLeaveRequests,

    // Actions
    handleStatusChange,
    handleArrivalTimeChange,
    handleHealthNoteChange,
    handleSave,
    fetchAttendance,
  };
}
