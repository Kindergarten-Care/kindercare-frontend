import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { QRSmartHubWidget } from './components/QRSmartHubWidget';
import { HealthAlertsWidget } from './components/HealthAlertsWidget';
import { LeaveApprovalWidget } from './components/LeaveApprovalWidget';
import { QuickLogWidget } from './components/QuickLogWidget';
import { ParentChatDrawer } from './components/ParentChatDrawer';
import { AttendanceService } from '@/services/attendance';
import { Student } from '@/config/types/attendance';

interface LiveFeedItem {
  id: string;
  name: string;
  time: string;
  note: string | null;
  initial: string;
  color: string;
}

interface ConfettiItem {
  id: string;
  x: number;
  y: number;
  color: string;
  dx: number;
  dy: number;
  angle: number;
}

interface ToastItem {
  id: string;
  text: string;
}

export const TeacherDashboardView: React.FC = () => {
  const [activeClassId, setActiveClassId] = useState<number | null>(null);
  const [studentsList, setStudentsList] = useState<Student[]>([]);
  const [presentCount, setPresentCount] = useState(0);
  const [liveFeed, setLiveFeed] = useState<LiveFeedItem[]>([]);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confetti, setConfetti] = useState<ConfettiItem[]>([]);
  const [dateStr, setDateStr] = useState('Hôm nay');
  const [menuToday, setMenuToday] = useState<any[]>([]);

  const getTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const loadDashboardData = async () => {
    try {
      const classes = await AttendanceService.getTeacherClasses();
      if (classes && classes.length > 0) {
        const firstClass = classes[0];
        setActiveClassId(firstClass.classId);
        
        const todayDate = getTodayDateString();
        const students = await AttendanceService.getDailyAttendance(firstClass.classId, todayDate);
        setStudentsList(students);

        const menu = await AttendanceService.getClassMenu(firstClass.classId, todayDate);
        setMenuToday(menu);

        // Filter already checked-in students
        const checkedIn = students.filter(s => s.arrivalTime && s.arrivalTime !== '--:--');
        setPresentCount(checkedIn.length);

        // Map and pre-populate live check-in logs
        const colors = ['#FCA5A5', '#FCD34D', '#6EE7B7', '#93C5FD', '#C4B5FD', '#F9A8D4', '#FDBA74', '#67E8F9'];
        const feedLogs: LiveFeedItem[] = checkedIn.map(s => {
          const initial = s.name.trim().split(' ').pop()?.charAt(0).toUpperCase() || 'B';
          let h = 0;
          for (let i = 0; i < s.name.length; i++) h = (h * 31 + s.name.charCodeAt(i)) >>> 0;
          const color = colors[h % colors.length];
          return {
            id: s.id,
            name: s.name,
            time: s.arrivalTime,
            note: s.healthNote || null,
            initial,
            color
          };
        });
        setLiveFeed(feedLogs);
      }
    } catch (e) {
      console.warn('Failed to load real DB dashboard data:', e);
    }
  };

  useEffect(() => {
    // Format dynamic vietnamese date label
    const d = new Date();
    let ds = d.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    ds = ds.charAt(0).toUpperCase() + ds.slice(1);
    setDateStr(ds);

    // Initial load from real DB
    loadDashboardData();
  }, []);

  const getNowTime = () => {
    const d = new Date();
    return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  };

  const playChime = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioContext.currentTime;
      [880, 1318.5].forEach((freq, index) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const startTime = now + index * 0.085;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.16, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.32);
        osc.connect(gain).connect(audioContext.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.34);
      });
    } catch (e) {
      console.warn('AudioContext failed to trigger beep:', e);
    }
  };

  const addToast = (text: string) => {
    const id = 'toast-' + Date.now() + Math.random();
    setToasts(prev => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const triggerConfetti = (centerX: number, centerY: number) => {
    const colors = ['#10B981', '#34D399', '#FCD34D', '#F43F5E', '#93C5FD', '#C4B5FD'];
    const newPieces: ConfettiItem[] = [];
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

  const handleScanSuccess = async (name: string, note: string | null, studentId?: string) => {
    if (!activeClassId) return;

    // 1. Find the student to check-in: matching id first, then name, then first unchecked
    let targetStudent = null;
    if (studentId) {
      targetStudent = studentsList.find(s => String(s.id) === String(studentId));
    }
    if (!targetStudent && name) {
      targetStudent = studentsList.find(s => s.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (!targetStudent) {
      targetStudent = studentsList.find(s => !s.arrivalTime || s.arrivalTime === '--:--');
    }

    if (!targetStudent) {
      addToast('🎉 Tất cả học sinh trong lớp đều đã có mặt!');
      return;
    }

    if (targetStudent.arrivalTime && targetStudent.arrivalTime !== '--:--') {
      addToast(`Bé ${targetStudent.name} đã được điểm danh trước đó lúc ${targetStudent.arrivalTime}.`);
      return;
    }

    const checkInTime = getNowTime();

    try {
      // 2. Persist check-in record directly to backend SQL Database
      await AttendanceService.updateAttendance(activeClassId, getTodayDateString(), [
        {
          studentId: targetStudent.id,
          status: 'PRESENT',
          arrivalTime: checkInTime,
          healthNote: targetStudent.healthNote || ''
        }
      ]);

      // 3. Play chime sound signals
      playChime();
      
      // 4. Trigger confetti drop coordinates
      const scannerX = window.innerWidth > 992 ? 280 : window.innerWidth / 2;
      const scannerY = 320;
      triggerConfetti(scannerX, scannerY);

      // 5. Update local present counter
      setPresentCount(prev => prev + 1);

      // 6. Push details onto dynamic LiveFeed list state
      const colors = ['#FCA5A5', '#FCD34D', '#6EE7B7', '#93C5FD', '#C4B5FD', '#F9A8D4', '#FDBA74', '#67E8F9'];
      const initial = targetStudent.name.trim().split(' ').pop()?.charAt(0).toUpperCase() || 'B';
      let h = 0;
      for (let i = 0; i < targetStudent.name.length; i++) h = (h * 31 + targetStudent.name.charCodeAt(i)) >>> 0;
      const itemColor = colors[h % colors.length];

      const newFeed: LiveFeedItem = {
        id: 'feed-' + Date.now(),
        name: targetStudent.name,
        time: checkInTime,
        note: targetStudent.healthNote || null,
        initial,
        color: itemColor
      };

      setLiveFeed(prev => [newFeed, ...prev]);
      addToast(`✓ Đã điểm danh thành công bé ${targetStudent.name}`);

      // 7. Update local students array state copy so they won't be checked-in again
      setStudentsList(prev => prev.map(s => s.id === targetStudent.id ? { ...s, arrivalTime: checkInTime } : s));
    } catch (e) {
      console.warn('Failed to commit attendance check-in to SQL Database:', e);
      addToast('Gặp lỗi khi ghi nhận điểm danh vào CSDL.');
    }
  };

  const handleUpdateMealStatus = async (studentId: string, status: string) => {
    if (!activeClassId) return;
    try {
      await AttendanceService.submitQuickMealLogs(activeClassId, getTodayDateString(), [
        { studentId, eatingStatus: status }
      ]);
      setStudentsList(prev => prev.map(s => s.id === studentId ? { ...s, eatingStatus: status } : s));
      addToast(`Cập nhật trạng thái bữa ăn thành công`);
    } catch (e) {
      addToast('Cập nhật trạng thái bữa ăn thất bại');
    }
  };

  const handleUpdateAllMealStatus = async (status: string) => {
    if (!activeClassId || studentsList.length === 0) return;
    try {
      const payload = studentsList.map(s => ({
        studentId: s.id,
        eatingStatus: status
      }));
      await AttendanceService.submitQuickMealLogs(activeClassId, getTodayDateString(), payload);
      setStudentsList(prev => prev.map(s => ({ ...s, eatingStatus: status })));
      addToast(`Đã ghi nhận cả lớp ăn hết suất`);
    } catch (e) {
      addToast('Cập nhật trạng thái bữa ăn thất bại');
    }
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

      {/* TOP GREETING BANNER */}
      <S.GreetingHeader>
        <S.GreetingTitle>Chào buổi sáng, Thầy Huy 👋</S.GreetingTitle>
        <S.GreetingSubtitle>{dateStr}</S.GreetingSubtitle>
      </S.GreetingHeader>

      {/* 1. HERO SPLIT QR MODULE */}
      <QRSmartHubWidget
        presentCount={presentCount}
        totalCount={studentsList.length || 42}
        liveFeed={liveFeed}
        onScanSuccess={handleScanSuccess}
      />

      {/* 2. THREE-COLUMN ACTION WIDGETS GRID */}
      <S.DashboardGrid3Col>
        <S.Column>
          <HealthAlertsWidget students={studentsList} />
        </S.Column>
        <S.Column>
          <LeaveApprovalWidget onAction={addToast} />
        </S.Column>
        <S.Column>
          <QuickLogWidget 
            students={studentsList} 
            menuInfo={menuToday}
            onUpdateMeal={handleUpdateMealStatus} 
            onUpdateAll={handleUpdateAllMealStatus} 
          />
        </S.Column>
      </S.DashboardGrid3Col>

      {/* TOAST NOTIFICATION STACK */}
      <S.ToastsContainer>
        {toasts.map(t => (
          <S.Toast key={t.id}>{t.text}</S.Toast>
        ))}
      </S.ToastsContainer>

      {/* FLOATING PARENT MESSENGER DRAWER */}
      <ParentChatDrawer />
    </S.DashboardContainer>
  );
};
