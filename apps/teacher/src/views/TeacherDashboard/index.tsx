'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as S from './styles';
import { LeaveRequestStatus } from '@/config/types/attendance';
import { HeroBannerWidget } from './components/HeroBannerWidget';
import { QuickCategoriesWidget } from './components/QuickCategoriesWidget';
import { TodayKidsWidget, TodayKid } from './components/TodayKidsWidget';
import { KidQuickActionModal } from './components/KidQuickActionModal';
import { PeriodicAssessmentWidget } from './components/GoodBehaviorWidget';
import { TaskListWidget, TaskItem } from './components/TaskListWidget';
import { LeaveApprovalWidget } from './components/LeaveApprovalWidget';
import { QrScannerModal } from '@/components/QrScannerModal';

import { LeaveRequestModal } from './components/LeaveRequestModal';
import { MedicalNoteModal } from './components/MedicalNoteModal';
import { ProxyDetailModal } from './components/ProxyDetailModal';
import { TimelineModal } from './components/TimelineModal';
import { AllFeaturesModal } from './components/AllFeaturesModal';
import { RequestListModal } from './components/RequestListModal';


import { AlertTriangle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';

const CreateNewsfeedModal = dynamic(() => import('./components/CreateNewsfeedModal').then(mod => mod.CreateNewsfeedModal), { ssr: false });
const ClassNewsfeedWidget = dynamic(() => import('./components/ClassNewsfeedWidget').then(mod => mod.ClassNewsfeedWidget), { ssr: false });

import { AttendanceService } from '@/services/attendance';
import { LeaveRequestService } from '@/services/leave-requests';
import { Student } from '@/config/types/attendance';
import { fixImageUrl } from '@/utils/imageUrl';

import { 
  useDashboardStats,
  useNotifications,
  useLeaveRequests,
  useUpdateLeaveRequest,
  useMonthlyGoodKids,
  useMedicalRequests,
  useUpdateMedicalRequest,
  useProxyApprovals,
  useUpdateProxyApproval,
} from '@/hooks/useTeacherQueries';

// Helper to calculate current week number
const getWeekNumber = (d: Date) => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
};

export const TeacherDashboardView: React.FC = () => {
  const router = useRouter();
  const { data: dashboardData, isLoading: isLoadingDashboardQuery } = useDashboardStats();

  const [activeClassId, setActiveClassId] = useState<number | null>(null);
  const [activeClassName, setActiveClassName] = useState<string>('');
  const [studentsList, setStudentsList] = useState<Student[]>([]);
  const [presentCount, setPresentCount] = useState(0);
  const [toasts, setToasts] = useState<{id: string, text: string}[]>([]);
  const [confetti, setConfetti] = useState<any[]>([]);

  // Modals
  const [scannerOpen, setScannerOpen] = useState(false);
  const [newsfeedModalOpen, setNewsfeedModalOpen] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState<boolean>(true);
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  // Deep Link Search Params
  const searchParams = useSearchParams();
  const openLeaveId = searchParams.get('openLeaveRequest');
  const openMedId = searchParams.get('openMedRequest');
  const openRequestList = searchParams.get('openRequestList');

  // Modal States
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [selectedMedical, setSelectedMedical] = useState<any>(null);
  const [selectedProxy, setSelectedProxy] = useState<any>(null);
  const [selectedQuickKid, setSelectedQuickKid] = useState<TodayKid | null>(null);
  const [isTimelineModalOpen, setTimelineModalOpen] = useState(false);
  const [allFeaturesOpen, setAllFeaturesOpen] = useState(false);
  const [requestListType, setRequestListType] = useState<'leave' | 'medical' | 'all' | null>(null);

  // API Hooks integration
  // Fetch ALL requests (not just pending) to show processed ones with faded style
  const { data: allLeaveRequests = [] } = useLeaveRequests();
  const { data: pendingLeaves = [] } = useLeaveRequests('Pending');
  const updateLeaveReq = useUpdateLeaveRequest();
  const { data: rawMedicalReqs = [] } = useMedicalRequests(activeClassId || undefined);
  const updateMedicalReq = useUpdateMedicalRequest();
  
  const { data: rawProxyReqs = [] } = useProxyApprovals();
  const updateProxyReq = useUpdateProxyApproval();

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const currentWeek = getWeekNumber(now);
  const termPeriod = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;

  // Hook vẫn giữ để tương thích ngược với các modal khác; không dùng trong dashboard chính.
  const { data: rawMonthlyKids = [] } = useMonthlyGoodKids(currentYear, currentMonth);
  void rawMonthlyKids;

  const qrScannerRef = useRef<any>(null);

  const getTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const loadDashboardData = async () => {
    try {
      setIsLoadingDashboard(true);
      setDashboardError(null);
      const classes = (dashboardData as any)?.classes || await AttendanceService.getTeacherClasses();
      if (classes && classes.length > 0) {
        const firstClass = classes[0];
        setActiveClassId(firstClass.classId);
        setActiveClassName(firstClass.className);
        
        const todayDate = getTodayDateString();
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

  // MOCK DATA FOR NEW WIDGETS
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

  // Tự động mở Modal từ Deep Link (khi bấm vào Thông báo)
  useEffect(() => {
    const handleDeepLinks = async () => {
      // Handle Leave Request
      if (openLeaveId && !selectedLeave) {
        let target = pendingLeaves.find((l: any) => String(l.id) === openLeaveId);
        
        // Nếu không có trong list pending (đã duyệt, hoặc chưa có request nào pending), fetch trực tiếp
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
            parentPhone: t.parentPhone || '0988 123 456',
            reason: t.reason,
            fromDate: t.fromDate,
            toDate: t.toDate,
            parentNotes: t.parentNotes,
            attachmentUrl: t.attachmentUrl,
            avatarUrl: t.studentAvatar || t.avatarUrl || t.avatar
          });
        }
      }
      
      // Handle Medical Request
      if (openMedId && !selectedMedical) {
        // Có thể medical reqs chưa fetch xong
        const target = rawMedicalReqs.find((m: any) => String(m.medRequestId || m.requestId || m.id) === openMedId);
        if (target) {
          const m: any = target;
          setSelectedMedical({
            id: String(m.medRequestId || m.requestId || m.id),
            studentName: m.studentName,
            medicineName: m.medicineName,
            dosage: m.dosage,
            timeToTake: m.timeToTake,
            parentNotes: m.parentNotes,
            imageUrl: m.attachmentUrl,
            avatarUrl: m.studentAvatar || m.avatarUrl || m.avatar
          });
        }
      }
      
      // Handle Request List
      if (openRequestList && !requestListType) {
        if (openRequestList === 'leave' || openRequestList === 'medical') {
          setRequestListType(openRequestList);
        }
      }
    };

    handleDeepLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openLeaveId, openMedId, openRequestList, pendingLeaves.length, rawMedicalReqs.length]);

  const cats = [
    { id: '1', label: 'Điểm danh', icon: '✓', iconBg: '#E6F3ED', iconColor: '#005A36', onClick: () => setScannerOpen(true) },
    { id: '2', label: 'Hoạt động', icon: '🧩', iconBg: '#E0E7FF', iconColor: '#4338CA', onClick: () => setTimelineModalOpen(true) },
    { id: '3', label: 'Y tế', icon: '💊', iconBg: '#FCE7F3', iconColor: '#BE185D', onClick: () => setRequestListType('medical') },
    { id: '4', label: 'Đánh giá định kỳ', icon: '📊', iconBg: '#FEF3C7', iconColor: '#D97706', onClick: () => router.push('/assessment') },
    { id: '5', label: 'Đơn phép', icon: '📝', iconBg: '#F3E8FF', iconColor: '#7E22CE', onClick: () => setRequestListType('leave') },
  ];

  // Map Real Leave Requests to TaskList - show ALL requests, not just pending
  const leaveTasks: TaskItem[] = allLeaveRequests.map((leave: any) => {
    const names = leave.studentName ? leave.studentName.split(' ') : ['?'];
    const initial = names[names.length - 1].charAt(0).toUpperCase();
    const student = studentsList.find((s: any) => String(s.id) === String(leave.studentId));
    const isDone = leave.status === 'APPROVED' || leave.status === 'Approved' || leave.status === 'REJECTED' || leave.status === 'Rejected';
    return {
      id: String(leave.requestId || leave.id),
      name: leave.studentName,
      initial,
      avatarUrl: leave.studentAvatar || leave.avatarUrl || leave.avatar || student?.avatar,
      color: isDone ? '#E5E7EB' : '#FEF08A', // Gray if processed, yellow if pending
      tag: leave.status === 'APPROVED' || leave.status === 'Approved' ? 'Đã duyệt' : (leave.status === 'REJECTED' || leave.status === 'Rejected' ? 'Đã từ chối' : 'Đơn phép'),
      tagStyle: { 
        color: leave.status === 'APPROVED' || leave.status === 'Approved' ? '#059669' : (leave.status === 'REJECTED' || leave.status === 'Rejected' ? '#DC2626' : '#B45309'), 
        background: leave.status === 'APPROVED' || leave.status === 'Approved' ? '#D1FAE5' : (leave.status === 'REJECTED' || leave.status === 'Rejected' ? '#FEE2E2' : '#FEF3C7'), 
        fontSize: '10px', 
        padding: '2px 6px', 
        borderRadius: '4px', 
        fontWeight: 'bold' 
      },
      sub: `Lý do: ${leave.reason || 'Việc gia đình'}`,
      btn: isDone ? 'Đã xử lý' : (updateLeaveReq.isPending && String(updateLeaveReq.variables?.requestId) === String(leave.requestId || leave.id) ? 'Đang duyệt...' : 'Duyệt'),
      btnColor: isDone ? '#9CA3AF' : '#005A36',
      btnBorder: isDone ? '#D1D5DB' : '#A7E0C6',
      action: () => {
        if (!isDone) {
          handleApproveLeave(String(leave.requestId || leave.id));
        }
      },
      rowStyle: isDone ? { opacity: 0.55, filter: 'grayscale(80%)' } : undefined,
      isDone, // For sorting - processed items go to bottom
      status: String(leave.status).toUpperCase(),
      createdAt: leave.createdAt ? new Date(leave.createdAt).getTime() : Date.now(),
      onRowClick: () => setSelectedLeave({
        id: String(leave.requestId || leave.id),
        studentName: leave.studentName,
        parentName: leave.parentName || 'Phụ huynh',
        parentPhone: leave.parentPhone || '0988 123 456',
        reason: leave.reason,
        fromDate: leave.fromDate,
        toDate: leave.toDate,
        parentNotes: leave.parentNotes,
        attachmentUrl: leave.attachmentUrl,
        avatarUrl: leave.studentAvatar || leave.avatarUrl || leave.avatar || student?.avatar,
        status: leave.status // Pass status to modal
      })
    };
  });

  const medicalTasks: TaskItem[] = rawMedicalReqs.map((med: any) => {
    const names = med.studentName ? med.studentName.split(' ') : ['?'];
    const initial = names[names.length - 1].charAt(0).toUpperCase();
    const isDone = med.status === 'Done' || med.status === 'Completed';
    const student = studentsList.find((s: any) => String(s.id) === String(med.studentId));
    return {
      id: `med_${med.requestId || med.id}`,
      name: med.studentName,
      initial,
      avatarUrl: med.studentAvatar || med.avatarUrl || med.avatar || student?.avatar,
      color: isDone ? '#F3F4F6' : '#FCE7F3', 
      tag: 'Y tế',
      tagStyle: { color: isDone ? '#9CA3AF' : '#DC2626', background: isDone ? '#E5E7EB' : '#FEE2E2', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' },
      sub: `${med.medicineName || 'Thuốc'} - ${med.dosage || 'Liều'}`,
      btn: isDone ? 'Đã cho uống' : (updateMedicalReq.isPending && String(updateMedicalReq.variables?.requestId) === String(med.requestId || med.id) ? 'Đang lưu...' : 'Xác nhận uống'),
      btnColor: isDone ? '#9CA3AF' : '#DC2626',
      btnBorder: isDone ? '#D1D5DB' : '#FCA5A5',
      action: () => {
        if (!isDone) {
          updateMedicalReq.mutate({ requestId: Number(med.requestId || med.id), status: 'Completed' as any }, {
            onSuccess: () => addToast('Đã ghi nhận cho uống thuốc')
          });
        }
      },
      onRowClick: () => setSelectedMedical({
        id: String(med.requestId || med.id),
        studentName: med.studentName,
        medicineName: med.medicineName,
        dosage: med.dosage,
        timeToTake: med.timeToTake,
        parentNotes: med.parentNotes,
        imageUrl: med.attachmentUrl,
        avatarUrl: med.studentAvatar || med.avatarUrl || med.avatar || student?.avatar
      }),
      rowStyle: isDone ? { opacity: 0.55, filter: 'grayscale(80%)' } : undefined,
      isDone, // For sorting
      status: String(med.status).toUpperCase(),
      createdAt: med.requestDate ? med.requestDate * 1000 : Date.now()
    };
  });

  const proxyTasks: TaskItem[] = rawProxyReqs.map((proxy: any) => {
    const names = proxy.studentName ? proxy.studentName.split(' ') : ['?'];
    const initial = names[names.length - 1].charAt(0).toUpperCase();
    const isDone = proxy.status === 'Approved';
    const student = studentsList.find((s: any) => String(s.id) === String(proxy.studentId));
    return {
      id: `proxy_${proxy.authorizationId}`,
      name: proxy.studentName,
      initial,
      avatarUrl: proxy.studentAvatar || proxy.avatarUrl || student?.avatar,
      color: isDone ? '#F3F4F6' : '#E0E7FF',
      tag: 'Đón hộ',
      tagStyle: { color: isDone ? '#9CA3AF' : '#4338CA', background: isDone ? '#E5E7EB' : '#C7D2FE', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' },
      sub: `Người đón: ${proxy.proxyName}`,
      btn: isDone ? 'Đã duyệt' : 'Xem & Duyệt',
      btnColor: isDone ? '#9CA3AF' : '#4338CA',
      btnBorder: isDone ? '#D1D5DB' : '#A5B4FC',
      action: (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (!isDone) {
          setSelectedProxy({
            authorizationId: String(proxy.authorizationId),
            studentName: proxy.studentName,
            parentName: proxy.parentName,
            parentPhone: proxy.parentPhone,
            proxyName: proxy.proxyName,
            proxyPhone: proxy.proxyPhone,
            proxyIdCard: proxy.proxyIdCard,
            proxyPhotoUrl: proxy.proxyPhotoUrl,
            authorizationDate: proxy.authorizationDate,
            type: proxy.type,
            notes: proxy.notes,
            status: proxy.status,
            avatarUrl: proxy.studentAvatar || proxy.avatarUrl || student?.avatar
          });
        }
      },
      onRowClick: () => setSelectedProxy({
        authorizationId: String(proxy.authorizationId),
        studentName: proxy.studentName,
        parentName: proxy.parentName,
        parentPhone: proxy.parentPhone,
        proxyName: proxy.proxyName,
        proxyPhone: proxy.proxyPhone,
        proxyIdCard: proxy.proxyIdCard,
        proxyPhotoUrl: proxy.proxyPhotoUrl,
        authorizationDate: proxy.authorizationDate,
        type: proxy.type,
        notes: proxy.notes,
        status: proxy.status,
        avatarUrl: proxy.studentAvatar || proxy.avatarUrl || student?.avatar
      }),
      rowStyle: isDone ? { opacity: 0.55, filter: 'grayscale(80%)' } : undefined,
      isDone,
      status: String(proxy.status).toUpperCase(),
      createdAt: proxy.createdAt * 1000
    };
  });

  const tasks: TaskItem[] = [...leaveTasks, ...medicalTasks, ...proxyTasks].sort((a: any, b: any) => {
    if (a.isDone === b.isDone) return 0;
    return a.isDone ? 1 : -1;
  });

  /**
   * Map studentsList (từ getDailyAttendance) → TodayKid cho widget "Tình trạng hôm nay".
   * Giáo viên click vào thẻ → mở modal KidQuickActionModal để sửa nhanh điểm danh.
   */
  const todayDate = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();

  const todayKids: TodayKid[] = studentsList.map(s => {
    const parts = s.name?.split(' ') || ['Bé'];
    const initial = parts[parts.length - 1].charAt(0).toUpperCase();
    return {
      id: String(s.id),
      name: s.name || 'Học sinh',
      initial,
      avatarUrl: fixImageUrl(s.avatar),
      attendanceStatus: (s.attendanceStatus as any) || 'NOT_MARKED',
      arrivalTime: s.arrivalTime,
      teacherNote: s.teacherNote,
    };
  });

  const openQuickActionFor = (kid: TodayKid) => setSelectedQuickKid(kid);

  return (
    <S.DashboardContainer>
      {/* CONFETTI LAYER */}
      <S.ConfettiContainer>
        {confetti.map(p => (
          <S.ConfettiPiece
            key={p.id}
            $x={p.x}
            $y={p.y}
            $color={p.color}
            $dx={p.dx}
            $dy={p.dy}
            $angle={p.angle}
          />
        ))}
      </S.ConfettiContainer>

      {dashboardError ? (
        <S.ErrorContainer>
          <AlertTriangle size={48} color="#DC2626" />
          <S.ErrorTitle>Không thể tải dữ liệu lớp học</S.ErrorTitle>
          <S.ErrorDesc>{dashboardError}</S.ErrorDesc>
          <S.RetryButton onClick={loadDashboardData}>
            Thử lại
          </S.RetryButton>
        </S.ErrorContainer>
      ) : (
        <S.BodyLayout>
          {/* [1] Hero Banner Quét QR */}
          <HeroBannerWidget
            className={activeClassName || 'Lớp Mầm 1'}
            presentCount={presentCount}
            totalCount={studentsList.length || 42}
            onOpenScanner={() => setScannerOpen(true)}
          />

          {/* [2] Quick Actions */}
          <QuickCategoriesWidget
            categories={cats}
            onViewAll={() => setAllFeaturesOpen(true)}
          />

          {/* [3] Tình trạng hôm nay (Điểm danh nhanh dạng lưới) */}
          <TodayKidsWidget
            kids={todayKids}
            date={todayDate}
            onKidClick={openQuickActionFor}
            onViewAll={() => router.push('/attendance')}
          />

          {/* [4] Đơn cần xử lý */}
          <TaskListWidget tasks={tasks.slice(0, 5)} onViewAll={() => setRequestListType('all')} />

          {/* [5] Newsfeed */}
          <div>
            <ClassNewsfeedWidget classId={activeClassId} />
          </div>

          {/* [6] Đánh giá định kỳ */}
          <PeriodicAssessmentWidget
            classId={activeClassId}
            termPeriod={termPeriod}
            studentNames={Object.fromEntries(
              studentsList.map((s: any) => [String(s.id), String(s.name ?? '')]).filter(([, n]) => n)
            ) as Record<string, string>}
            studentAvatars={Object.fromEntries(
              studentsList.map((s: any) => [String(s.id), String(fixImageUrl(s.avatar) ?? '')]).filter(([, v]) => v)
            ) as Record<string, string>}
          />
        </S.BodyLayout>
      )}

      {/* FLOATING TOAST NOTIFICATIONS */}
      <S.ToastsContainer>
        {toasts.map(t => (
          <S.Toast key={t.id}>{t.text}</S.Toast>
        ))}
      </S.ToastsContainer>

      {/* QR SCANNER MODAL */}
      {scannerOpen && (
        <QrScannerModal 
          onClose={() => setScannerOpen(false)}
          onScanSuccess={() => {
            loadDashboardData();
            triggerConfetti(window.innerWidth / 2, window.innerHeight / 2);
          }}
        />
      )}

      {/* CREATE NEWSFEED MODAL */}
      <CreateNewsfeedModal 
        isOpen={newsfeedModalOpen}
        onClose={() => setNewsfeedModalOpen(false)}
        classId={activeClassId}
        onSuccess={() => {
          setNewsfeedModalOpen(false);
          addToast('🎉 Tạo nhật ký lớp thành công!');
        }}
      />

      {/* NEW MODALS */}
      <LeaveRequestModal 
        isOpen={!!selectedLeave}
        data={selectedLeave}
        onClose={() => setSelectedLeave(null)}
        onApprove={(id) => { handleApproveLeave(id); setSelectedLeave(null); }}
        onReject={(id) => { handleRejectLeave(id); setSelectedLeave(null); }}
      />

      <MedicalNoteModal 
        isOpen={!!selectedMedical}
        data={selectedMedical}
        onClose={() => setSelectedMedical(null)}
        onMarkDone={(id) => { addToast('✅ Đã cho uống thuốc thành công!'); setSelectedMedical(null); }}
      />

      <ProxyDetailModal
        isOpen={!!selectedProxy}
        data={selectedProxy}
        onClose={() => setSelectedProxy(null)}
        onApprove={(id) => {
          updateProxyReq.mutate({ authorizationId: Number(id) }, {
            onSuccess: () => {
              addToast('✅ Đã duyệt đơn đón hộ!');
              setSelectedProxy(null);
            }
          });
        }}
      />

      <KidQuickActionModal
        isOpen={!!selectedQuickKid}
        kid={selectedQuickKid ? {
          id: selectedQuickKid.id,
          name: selectedQuickKid.name,
          avatarUrl: selectedQuickKid.avatarUrl,
          attendanceStatus: selectedQuickKid.attendanceStatus,
          arrivalTime: selectedQuickKid.arrivalTime,
          teacherNote: selectedQuickKid.teacherNote,
        } : null}
        classId={activeClassId}
        date={todayDate}
        onClose={() => setSelectedQuickKid(null)}
        onSaved={() => {
          addToast('✅ Đã cập nhật điểm danh!');
          loadDashboardData();
        }}
      />

      <AllFeaturesModal
        isOpen={allFeaturesOpen}
        onClose={() => setAllFeaturesOpen(false)}
        onSelectFeature={(featureId) => {
          switch (featureId) {
            case 'qr':
              setScannerOpen(true);
              break;
            case 'attendance':
              router.push('/attendance');
              break;
            case 'students':
              router.push('/students');
              break;
            case 'schedule':
              router.push('/schedule');
              break;
            case 'lesson-plan':
              router.push('/lesson-plan');
              break;
            case 'activities':
              setTimelineModalOpen(true);
              break;
            case 'health':
              setRequestListType('medical');
              break;
            case 'leave':
              setRequestListType('leave');
              break;
            case 'assessment':
              router.push('/assessment');
              break;
            case 'newsfeed':
              setNewsfeedModalOpen(true);
              break;
            case 'weekly-schedule':
              router.push('/weekly-schedule');
              break;
            case 'profile':
              router.push('/profile');
              break;
            default:
              addToast(`Đang mở: ${featureId}`);
          }
        }}
      />

      <RequestListModal 
        isOpen={!!requestListType}
        onClose={() => setRequestListType(null)}
        type={requestListType || 'leave'}
        title={requestListType === 'leave' ? 'Đơn xin nghỉ học' : (requestListType === 'medical' ? 'Dặn dò y tế' : 'Tất cả đơn')}
        subtitle="Danh sách cần xử lý"
        tasks={(requestListType === 'leave' ? tasks.filter(t => t.tag === 'Đơn phép') : (requestListType === 'medical' ? tasks.filter(t => t.tag === 'Y tế') : tasks)).map(t => ({
          ...t,
          onRowClick: t.onRowClick ? () => {
            setRequestListType(null); // Đóng bảng danh sách
            t.onRowClick!();          // Bật tờ đơn chi tiết
          } : undefined
        }))}
      />
      
      <TimelineModal
        isOpen={isTimelineModalOpen}
        onClose={() => setTimelineModalOpen(false)}
        classId={activeClassId}
      />
    </S.DashboardContainer>
  );
};
export default TeacherDashboardView;
