import { useState, useEffect, useMemo, useCallback } from 'react';
import { Student, LeaveRequest, AttendanceStatus } from '@/config/types/attendance';
import { AttendanceService } from '@/services/attendance';

export function useAttendance(classId: string = 'MN1', date: string = '2026-05-18') {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Leave Request modal state
  const [leaveRequestModalOpen, setLeaveRequestModalOpen] = useState<boolean>(false);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<LeaveRequest | null>(null);

  // Quick Attendance modal state
  const [quickAttendanceModalOpen, setQuickAttendanceModalOpen] = useState<boolean>(false);

  // Fetch initial records
  const fetchAttendance = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await AttendanceService.getDailyAttendance(classId, date);
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch attendance data:', error);
    } finally {
      setLoading(false);
    }
  }, [classId, date]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  // Update status for a specific student
  const handleStatusChange = useCallback((studentId: string, status: AttendanceStatus): void => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        // If changing to PRESENT, set arrival time to current time or standard, if changing to absent, set to --:--
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

  // Update health note
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
      // Do not overwrite students who already have an approved or pending leave request unless marking all
      if (s.hasActiveLeaveRequest && status === 'PRESENT_ALL') {
        return s; // Keep their leave status
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
        // Reload list to get updated statuses from database mock
        const data = await AttendanceService.getDailyAttendance(classId, date);
        setStudents(data);
        setLeaveRequestModalOpen(false);
        setSelectedLeaveRequest(null);
      }
    } catch (error) {
      console.error('Failed to process leave request:', error);
    } finally {
      setSaving(false);
    }
  }, [classId, date]);

  // Persist current page values
  const handleSave = useCallback(async (): Promise<boolean> => {
    try {
      setSaving(true);
      const payload = students.map(s => ({
        studentId: s.id,
        status: s.attendanceStatus,
        arrivalTime: s.arrivalTime,
        healthNote: s.healthNote,
      }));
      await AttendanceService.updateAttendance(classId, payload);
      alert('Lưu điểm danh & đồng bộ thành công!');
      return true;
    } catch (error) {
      console.error('Failed to save attendance:', error);
      return false;
    } finally {
      setSaving(false);
    }
  }, [classId, students]);

  // Filtered lists
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchStatus = true;
      if (statusFilter === 'PRESENT') {
        matchStatus = s.attendanceStatus === 'PRESENT';
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
    const present = students.filter(s => s.attendanceStatus === 'PRESENT').length;
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
    fetchAttendance,
  };
}
