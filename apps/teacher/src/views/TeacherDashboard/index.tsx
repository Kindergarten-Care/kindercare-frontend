'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as S from './styles';
import { HeroBannerWidget } from './components/HeroBannerWidget';
import { QuickCategoriesWidget } from './components/QuickCategoriesWidget';
import { FeaturedKidsWidget, FeaturedKid } from './components/FeaturedKidsWidget';
import { TopKidWidget } from './components/TopKidWidget';
import { AttendanceProgressWidget } from './components/AttendanceProgressWidget';
import { TaskListWidget, TaskItem } from './components/TaskListWidget';
import { LeaveApprovalWidget } from './components/LeaveApprovalWidget';
import { QrScannerModal } from '@/components/QrScannerModal';

import { LeaveRequestModal } from './components/LeaveRequestModal';
import { MedicalNoteModal } from './components/MedicalNoteModal';
import { GoodKidModal } from './components/GoodKidModal';
import { AllFeaturesModal } from './components/AllFeaturesModal';

import dynamic from 'next/dynamic';

const CreateNewsfeedModal = dynamic(() => import('./components/CreateNewsfeedModal').then(mod => mod.CreateNewsfeedModal), { ssr: false });
const ClassNewsfeedWidget = dynamic(() => import('./components/ClassNewsfeedWidget').then(mod => mod.ClassNewsfeedWidget), { ssr: false });

import { AttendanceService } from '@/services/attendance';
import { Student } from '@/config/types/attendance';

import { 
  useDashboardStats, 
  useNotifications, 
  useLeaveRequests,
  useUpdateLeaveRequest,
  useWeeklyRewards
} from '@/hooks/useTeacherQueries';

// Helper to calculate current week number
const getWeekNumber = (d: Date) => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
};

export const TeacherDashboardView: React.FC = () => {
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

  // Modal States
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [selectedMedical, setSelectedMedical] = useState<any>(null);
  const [selectedGoodKid, setSelectedGoodKid] = useState<any>(null);
  const [allFeaturesOpen, setAllFeaturesOpen] = useState(false);

  // API Hooks integration
  const { data: pendingLeaves = [] } = useLeaveRequests('Pending');
  const updateLeaveReq = useUpdateLeaveRequest();

  const now = new Date();
  const currentWeek = getWeekNumber(now);
  const currentYear = now.getFullYear();

  const { data: rawWeeklyRewards = [] } = useWeeklyRewards(activeClassId || undefined, currentWeek, currentYear);

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
      const classes = dashboardData?.classes || await AttendanceService.getTeacherClasses();
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
    } catch (e) {
      console.warn('Failed to load dashboard data:', e);
    } finally {
      setIsLoadingDashboard(false);
    }
  };

  useEffect(() => {
    if (!isLoadingDashboardQuery && dashboardData) {
      loadDashboardData();
    }
  }, [isLoadingDashboardQuery, dashboardData]);

  // HTML5 QR code scanner dependency loading
  useEffect(() => {
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
    updateLeaveReq.mutate({ requestId: reqId, status: 'Approved' }, {
      onSuccess: () => addToast('🎉 Đã duyệt đơn xin phép!'),
      onError: () => addToast('❌ Lỗi khi duyệt đơn')
    });
  };

  const cats = [
    { id: '1', label: 'Điểm danh', icon: '✓', iconBg: '#E6F3ED', iconColor: '#005A36', onClick: () => setScannerOpen(true) },
    { id: '2', label: 'Hoạt động', icon: '🧩', iconBg: '#E0E7FF', iconColor: '#4338CA', onClick: () => setNewsfeedModalOpen(true) },
    { id: '3', label: 'Y tế', icon: '💊', iconBg: '#FCE7F3', iconColor: '#BE185D', onClick: () => addToast('Đang phát triển...') },
    { id: '4', label: 'Phiếu bé ngoan', icon: '⭐', iconBg: '#FEF3C7', iconColor: '#D97706', onClick: () => addToast('Đang phát triển...') },
    { id: '5', label: 'Đơn phép', icon: '📝', iconBg: '#F3E8FF', iconColor: '#7E22CE', onClick: () => addToast('Đang phát triển...') },
  ];

  // Map Real Weekly Rewards API to FeaturedKids
  const featuredKids: FeaturedKid[] = rawWeeklyRewards.slice(0, 4).map((r: any, idx: number) => {
    const colors = ['#FEF3C7', '#E0E7FF', '#FCE7F3', '#E6F3ED'];
    const names = r.studentName ? r.studentName.split(' ') : ['Bé'];
    const initial = names[names.length - 1].charAt(0).toUpperCase();
    return {
      id: String(r.studentId || idx),
      name: r.studentName || 'Bé ngoan',
      initial,
      color: colors[idx % colors.length],
      stars: r.totalStars || (10 - idx),
      days: r.attendanceDays || 5,
      eatLabel: r.eatingStatus || 'Ăn hết suất',
      justAwarded: idx === 0 // Highlight top 1
    };
  });
  
  // Fallback to mock data if API returns empty
  if (featuredKids.length === 0) {
    featuredKids.push(
      { id: 'm1', name: 'Khôi', initial: 'K', color: '#FECACA', stars: 10, days: 5, eatLabel: 'Ăn hết suất', justAwarded: true, eatStyle: { color: '#005A36', background: '#E6F3ED' } },
      { id: 'm2', name: 'Nhiên', initial: 'N', color: '#C7D2FE', stars: 9, days: 5, eatLabel: 'Ăn khá', eatStyle: { color: '#B45309', background: '#FEF3C7' } },
      { id: 'm3', name: 'Linh', initial: 'L', color: '#BAE6FD', stars: 8, days: 4, eatLabel: 'Ăn khá', eatStyle: { color: '#B45309', background: '#FEF3C7' } },
      { id: 'm4', name: 'Huy', initial: 'H', color: '#FBCFE8', stars: 8, days: 5, eatLabel: 'Ăn khá', eatStyle: { color: '#B45309', background: '#FEF3C7' } }
    );
  }

  // Map Real Leave Requests to TaskList
  const tasks: TaskItem[] = pendingLeaves.map((leave: any) => {
    const names = leave.studentName ? leave.studentName.split(' ') : ['?'];
    const initial = names[names.length - 1].charAt(0).toUpperCase();
    return {
      id: String(leave.id),
      name: leave.studentName,
      initial,
      color: '#FEF08A', // Yellowish for leave requests
      tag: 'Đơn phép',
      tagStyle: { color: '#B45309', background: '#FEF3C7', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' },
      sub: `Lý do: ${leave.reason || 'Việc gia đình'}`,
      btn: updateLeaveReq.isPending ? 'Đang duyệt...' : 'Duyệt',
      btnColor: '#005A36',
      btnBorder: '#A7E0C6',
      action: () => handleApproveLeave(String(leave.id)),
      onRowClick: () => setSelectedLeave({
        id: String(leave.id),
        studentName: leave.studentName,
        parentName: leave.parentName || 'Phụ huynh',
        parentPhone: leave.parentPhone || '0988 123 456',
        reason: leave.reason,
        fromDate: leave.fromDate,
        toDate: leave.toDate,
        parentNotes: leave.parentNotes,
        attachmentUrl: leave.attachmentUrl // Pass real attachment URL if available
      })
    };
  });

  // If no leaves, show exact mock data from the image to demonstrate the UI
  if (tasks.length === 0) {
    tasks.push(
      { 
        id: 'mock1', name: 'Bé Khang', initial: 'K', color: '#E0E7FF', tag: 'Y tế', tagStyle: { color: '#DC2626', background: '#FEE2E2', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }, sub: 'Siro ho Prospan - 5ml', btn: 'Đã cho uống', btnColor: '#DC2626', btnBorder: '#FCA5A5', action: () => addToast('Đã ghi nhận cho uống thuốc'),
        onRowClick: () => setSelectedMedical({ id: 'mock1', studentName: 'Bé Khang', medicineName: 'Siro ho Prospan', dosage: '5ml', timeToTake: 'Sau ăn trưa', parentNotes: 'Bé đang ho đờm, cô nhớ cho uống nước ấm nhé.', imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80' })
      },
      { 
        id: 'mock2', name: 'Bé Bảo Long', initial: 'L', color: '#FCE7F3', tag: 'Y tế', tagStyle: { color: '#DC2626', background: '#FEE2E2', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }, sub: 'Kháng dị ứng - sau ăn', btn: 'Đã cho uống', btnColor: '#DC2626', btnBorder: '#FCA5A5', action: () => addToast('Đã ghi nhận cho uống thuốc'),
        onRowClick: () => setSelectedMedical({ id: 'mock2', studentName: 'Bé Bảo Long', medicineName: 'Kháng dị ứng', dosage: '1 viên', timeToTake: 'Sau ăn sáng', parentNotes: 'Bé bị dị ứng thời tiết.', imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80' })
      },
      { 
        id: 'mock3', name: 'Bé Phương Vy', initial: 'V', color: '#FECDD3', tag: 'Đơn phép', tagStyle: { color: '#B45309', background: '#FEF3C7', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }, sub: 'Bị ốm, sốt - hôm nay', btn: 'Duyệt', btnColor: '#005A36', btnBorder: '#A7E0C6', action: () => addToast('Đã duyệt đơn phép'),
        onRowClick: () => setSelectedLeave({ id: 'mock3', studentName: 'Bé Phương Vy', parentName: 'Mẹ Vy', parentPhone: '0909 111 222', reason: 'Bị ốm, sốt', fromDate: getTodayDateString(), toDate: getTodayDateString(), parentNotes: 'Cháu sốt cao từ đêm qua.', attachmentUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400&q=80' })
      }
    );
  }

  // Define Top Kid data (using the first FeaturedKid or mock if empty)
  const topKid = featuredKids[0] || { name: 'Khôi', initial: 'K', stars: 10, days: 5 };

  const handleOpenGoodKid = (kid: any) => {
    setSelectedGoodKid({
      id: kid.id,
      studentName: kid.name,
      totalStars: kid.stars,
      daysAttended: kid.days,
      maxDays: 5,
      mealsGood: kid.days,
      maxMeals: 5
    });
  };

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

      <S.BodyLayout>
        {/* MAIN COLUMN (LEFT) */}
        <S.MainColumn>
          <HeroBannerWidget 
            className={activeClassName || 'Lớp Mầm 1'}
            presentCount={presentCount}
            totalCount={studentsList.length || 42}
            onOpenScanner={() => setScannerOpen(true)}
          />

          <QuickCategoriesWidget 
            categories={cats} 
            onViewAll={() => setAllFeaturesOpen(true)}
          />

          <FeaturedKidsWidget kids={featuredKids} />

          <AttendanceProgressWidget 
            presentCount={presentCount}
            totalCount={studentsList.length || 42}
            onScanMore={() => setScannerOpen(true)}
          />

          <div style={{ marginTop: '8px' }}>
            <ClassNewsfeedWidget classId={activeClassId} />
          </div>
        </S.MainColumn>

        {/* RIGHT COLUMN */}
        <S.RightColumn>
          {/* Real API-driven Tasks List */}
          <TaskListWidget tasks={tasks} />

          <div onClick={() => handleOpenGoodKid(topKid)} style={{ cursor: 'pointer' }}>
            <TopKidWidget 
              name={topKid.name} 
              initial={topKid.initial} 
              days={topKid.days} 
              maxDays={5} 
              meals={topKid.days} 
              maxMeals={5} 
              totalStars={topKid.stars} 
              onAward={() => handleOpenGoodKid(topKid)}
            />
          </div>
        </S.RightColumn>
      </S.BodyLayout>

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
        onReject={(id) => { addToast('Đã từ chối đơn!'); setSelectedLeave(null); }}
      />

      <MedicalNoteModal 
        isOpen={!!selectedMedical}
        data={selectedMedical}
        onClose={() => setSelectedMedical(null)}
        onMarkDone={(id) => { addToast('✅ Đã cho uống thuốc thành công!'); setSelectedMedical(null); }}
      />

      <GoodKidModal 
        isOpen={!!selectedGoodKid}
        data={selectedGoodKid}
        onClose={() => setSelectedGoodKid(null)}
        onAward={(id, note) => { addToast(`🎁 Đã cấp phiếu bé ngoan cho bé thành công!`); setSelectedGoodKid(null); }}
      />

      <AllFeaturesModal 
        isOpen={allFeaturesOpen}
        onClose={() => setAllFeaturesOpen(false)}
        onSelectFeature={(feature) => {
          if (feature === 'Nhật ký lớp') {
            setNewsfeedModalOpen(true);
          } else {
            addToast(`Đang mở: ${feature}`);
          }
        }}
      />
    </S.DashboardContainer>
  );
};
export default TeacherDashboardView;
