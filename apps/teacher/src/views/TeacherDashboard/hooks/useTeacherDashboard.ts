import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { AttendanceService } from '@/services/Attendance/AttendanceService';
import { LeaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';
import { Student } from '@/config/types/attendance';
import { LeaveRequestStatus } from '@/config/types/attendance';
import { fixImageUrl } from '@/utils/imageUrl';
import { getStudentInitials } from '@/utils/string';
import { getWeekNumber, getTodayDateString } from '../utils';

import { 
  useDashboardStats,
  useLeaveRequests,
  useUpdateLeaveRequest,
  useMonthlyGoodKids,
  useMedicalRequests,
  useUpdateMedicalRequest,
  useProxyApprovals,
  useUpdateProxyApproval,
} from '@/hooks/queries';
import { TodayKid } from '../components/TodayKidsWidget';
import { TaskItem } from '../components/TaskListWidget';

export const useTeacherDashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Data
  const { data: dashboardData, isLoading: isLoadingDashboardQuery } = useDashboardStats();
  const { data: allLeaveRequests = [] } = useLeaveRequests();
  const { data: pendingLeaves = [] } = useLeaveRequests('Pending');
  const updateLeaveReq = useUpdateLeaveRequest();
  const [activeClassId, setActiveClassId] = useState<number | null>(null);
  const { data: rawMedicalReqs = [] } = useMedicalRequests(activeClassId || undefined);
  const updateMedicalReq = useUpdateMedicalRequest();
  const { data: rawProxyReqs = [] } = useProxyApprovals();
  const updateProxyReq = useUpdateProxyApproval();

  // Local state
  const [activeClassName, setActiveClassName] = useState<string>('');
  const [studentsList, setStudentsList] = useState<Student[]>([]);
  const [presentCount, setPresentCount] = useState(0);
  const [toasts, setToasts] = useState<{id: string, text: string}[]>([]);
  const [confetti, setConfetti] = useState<any[]>([]);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState<boolean>(true);
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  // Modals state
  const [scannerOpen, setScannerOpen] = useState(false);
  const [photoScannerOpen, setPhotoScannerOpen] = useState(false);
  const [newsfeedModalOpen, setNewsfeedModalOpen] = useState(false);
  const [isTimelineModalOpen, setTimelineModalOpen] = useState(false);
  const [allFeaturesOpen, setAllFeaturesOpen] = useState(false);
  const [requestListType, setRequestListType] = useState<'leave' | 'medical' | 'proxy' | 'all' | null>(null);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [selectedMedical, setSelectedMedical] = useState<any>(null);
  const [selectedProxy, setSelectedProxy] = useState<any>(null);
  const [selectedQuickKid, setSelectedQuickKid] = useState<TodayKid | null>(null);

  // Deep Link Search Params
  const openLeaveId = searchParams.get('openLeaveRequest');
  const openMedId = searchParams.get('openMedRequest');
  const openRequestList = searchParams.get('openRequestList');

  // Dates
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const currentWeek = getWeekNumber(now);
  const termPeriod = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
  const todayDate = getTodayDateString();

  // Load basic data
  const loadDashboardData = async () => {
    try {
      setIsLoadingDashboard(true);
      setDashboardError(null);
      const classes = (dashboardData as any)?.classes || await AttendanceService.getTeacherClasses();
      if (classes && classes.length > 0) {
        const firstClass = classes[0];
        setActiveClassId(firstClass.classId);
        setActiveClassName(firstClass.className);
        
        const students = await AttendanceService.getDailyAttendance(firstClass.classId, todayDate);
        setStudentsList(students);

        const present = students.filter(s => s.attendanceStatus === 'PRESENT' && !s.hasActiveLeaveRequest);
        setPresentCount(present.length);
      }
    } catch (e: any) {
      console.warn('Failed to load dashboard data:', e);
      setDashboardError('Không thể tải dữ liệu lớp học. Vui lòng kiểm tra kết nối và thử lại.');
    } finally {
      setIsLoadingDashboard(false);
    }
  };

  useEffect(() => {
    if (!isLoadingDashboardQuery && dashboardData) {
      loadDashboardData();
    }
  }, [isLoadingDashboardQuery, dashboardData]);

  // Toast and effects
  const addToast = (text: string) => {
    const id = 'toast-' + Date.now() + Math.random();
    setToasts(prev => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const triggerConfetti = (centerX: number, centerY: number) => {
    const colors = ['#10B981', '#34D399', '#FCD34D', '#F43F5E', '#93C5FD', '#C4B5FD'];
    const newPieces: any[] = [];
    for (let i = 0; i < 30; i++) {
      const ang = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 85;
      newPieces.push({
        id: 'confetti-' + Date.now() + '-' + i,
        x: centerX,
        y: centerY,
        color: colors[i % colors.length],
        dx: Math.cos(ang) * dist,
        dy: Math.sin(ang) * dist - 30,
        angle: Math.random() * 360
      });
    }
    setConfetti(prev => [...prev, ...newPieces]);
    setTimeout(() => {
      const pieceIds = new Set(newPieces.map(p => p.id));
      setConfetti(prev => prev.filter(p => !pieceIds.has(p.id)));
    }, 1200);
  };

  // Handlers
  const handleApproveLeave = (reqId: string) => {
    updateLeaveReq.mutate({ requestId: Number(reqId), status: 'APPROVED' as LeaveRequestStatus }, {
      onSuccess: () => addToast('🎉 Đã duyệt đơn xin phép!'),
      onError: () => addToast('❌ Lỗi khi duyệt đơn')
    });
  };

  const handleRejectLeave = (reqId: string) => {
    updateLeaveReq.mutate({ requestId: Number(reqId), status: 'REJECTED' as LeaveRequestStatus }, {
      onSuccess: () => addToast('Đã từ chối đơn!'),
      onError: () => addToast('❌ Lỗi khi từ chối đơn')
    });
  };

  // Deep links effect
  useEffect(() => {
    const handleDeepLinks = async () => {
      if (openLeaveId && !selectedLeave) {
        let target = pendingLeaves.find((l: any) => String(l.id) === openLeaveId);
        if (!target) {
          try {
            target = (await LeaveRequestService.getLeaveRequestDetail(openLeaveId) as any) || undefined;
          } catch (e) {
            console.warn('Could not fetch leave request detail for deep link');
          }
        }
        if (target) {
          const t: any = target;
          setSelectedLeave({
            id: String(t.id ?? t.requestId),
            studentName: t.studentName,
            parentName: t.parentName || 'Phụ huynh',
            parentPhone: t.parentPhone || 'Chưa cập nhật',
            reason: t.reason,
            fromDate: t.fromDate,
            toDate: t.toDate,
            parentNotes: t.parentNotes,
            attachmentUrl: t.attachmentUrl,
            avatarUrl: t.studentAvatar || t.avatarUrl || t.avatar
          });
        }
      }
      
      if (openMedId && !selectedMedical) {
        const target = rawMedicalReqs.find((m: any) => String(m.medRequestId || m.requestId || m.id) === openMedId);
        if (target) {
          const m: any = target;
          setSelectedMedical({
            id: String(m.medRequestId || m.requestId || m.id),
            studentName: m.studentName,
            medicineName: m.medicineDetails || m.medicineName,
            dosage: m.dosage,
            timeToTake: m.timeToTake,
            parentNotes: m.parentNote || m.parentNotes,
            imageUrl: m.medicineImageUrl || m.attachmentUrl || m.imageUrl,
            avatarUrl: m.studentAvatar || m.avatarUrl || m.avatar
          });
        }
      }
      
      if (openRequestList && !requestListType) {
        if (openRequestList === 'leave' || openRequestList === 'medical' || openRequestList === 'proxy') {
          setRequestListType(openRequestList as any);
        }
      }
    };
    handleDeepLinks();
  }, [openLeaveId, openMedId, openRequestList, pendingLeaves.length, rawMedicalReqs.length]);

  return {
    router,
    activeClassId,
    activeClassName,
    studentsList,
    presentCount,
    toasts,
    confetti,
    isLoadingDashboard,
    dashboardError,
    scannerOpen, setScannerOpen,
    photoScannerOpen, setPhotoScannerOpen,
    newsfeedModalOpen, setNewsfeedModalOpen,
    isTimelineModalOpen, setTimelineModalOpen,
    allFeaturesOpen, setAllFeaturesOpen,
    requestListType, setRequestListType,
    selectedLeave, setSelectedLeave,
    selectedMedical, setSelectedMedical,
    selectedProxy, setSelectedProxy,
    selectedQuickKid, setSelectedQuickKid,
    termPeriod,
    todayDate,
    allLeaveRequests,
    rawMedicalReqs,
    rawProxyReqs,
    updateLeaveReq,
    updateMedicalReq,
    updateProxyReq,
    addToast,
    triggerConfetti,
    handleApproveLeave,
    handleRejectLeave,
    loadDashboardData,
  };
};
