'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as S from './styles';
import { AttendanceWidget } from './components/AttendanceWidget';
import { GoodBehaviorWidget } from './components/GoodBehaviorWidget';
import { HealthAlertsWidget } from './components/HealthAlertsWidget';
import { TimelineWidget } from './components/TimelineWidget';
import { LeaveApprovalWidget } from './components/LeaveApprovalWidget';
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

  // Bento state variables
  const [quickOpen, setQuickOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [qrSuccessModal, setQrSuccessModal] = useState<{
    isOpen: boolean;
    studentName: string;
    parentName: string;
    relationship: string;
    checkInTime: string;
  } | null>(null);

  const [activeClassName, setActiveClassName] = useState<string>('');
  const [isLoadingDashboard, setIsLoadingDashboard] = useState<boolean>(true);

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
      const classes = await AttendanceService.getTeacherClasses();
      if (classes && classes.length > 0) {
        const firstClass = classes[0];
        setActiveClassId(firstClass.classId);
        setActiveClassName(firstClass.className);
        
        const todayDate = getTodayDateString();
        const students = await AttendanceService.getDailyAttendance(firstClass.classId, todayDate);
        setStudentsList(students);

        // Filter already checked-in students
        const present = students.filter(s => s.attendanceStatus === 'PRESENT' && !s.hasActiveLeaveRequest);
        setPresentCount(present.length);

        const checkedIn = students.filter(s => s.arrivalTime && s.arrivalTime !== '--:--');

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
    } finally {
      setIsLoadingDashboard(false);
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

  // Cleanup scanner on unmount
  useEffect(() => {
    return () => {
      if (qrScannerRef.current && qrScannerRef.current.isScanning) {
        try {
          qrScannerRef.current.stop();
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
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

    // 1. Find the student to check-in
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

    if (targetStudent.hasActiveLeaveRequest || targetStudent.leaveRequestStatus === 'PENDING') {
      addToast(`Không thể điểm danh bé ${targetStudent.name} qua QR vì có đơn xin nghỉ đang chờ duyệt!`);
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
      triggerConfetti(window.innerWidth / 2, window.innerHeight / 2);

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
      setStudentsList(prev => prev.map(s => s.id === targetStudent.id ? { ...s, arrivalTime: checkInTime, attendanceStatus: 'PRESENT' } : s));
    } catch (e) {
      console.warn('Failed to commit attendance check-in to SQL Database:', e);
      addToast('Gặp lỗi khi ghi nhận điểm danh vào CSDL.');
    }
  };

  const handleStartScanner = () => {
    setScannerOpen(true);
    setQuickOpen(false);
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).Html5Qrcode) {
        try {
          const Html5QrcodeClass = (window as any).Html5Qrcode;
          const html5QrCode = new Html5QrcodeClass("reader-dashboard");
          qrScannerRef.current = html5QrCode;
          setIsCameraActive(true);

          html5QrCode.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: { width: 220, height: 220 }
            },
            (decodedText: string) => {
              html5QrCode.stop().then(() => {
                setIsCameraActive(false);
                setScannerOpen(false);
                handleQrCodeScanned(decodedText);
              }).catch((err: any) => {
                console.error("Scanner stop failed", err);
                setIsCameraActive(false);
                setScannerOpen(false);
              });
            },
            () => {
              // Ignore failure frames
            }
          ).catch((err: any) => {
            console.error("Scanner start failed", err);
            alert("Không thể khởi động camera: " + err);
            setIsCameraActive(false);
            setScannerOpen(false);
          });
        } catch (e) {
          console.error(e);
          alert("Lỗi cấu hình camera");
          setIsCameraActive(false);
          setScannerOpen(false);
        }
      } else {
        alert("Thư viện camera chưa tải xong. Vui lòng thử lại sau vài giây.");
        setScannerOpen(false);
      }
    }, 300);
  };

  const handleStopScanner = () => {
    if (qrScannerRef.current) {
      try {
        if (qrScannerRef.current.isScanning) {
          qrScannerRef.current.stop().then(() => {
            setIsCameraActive(false);
            setScannerOpen(false);
          }).catch((err: any) => {
            console.error(err);
            setIsCameraActive(false);
            setScannerOpen(false);
          });
        } else {
          setIsCameraActive(false);
          setScannerOpen(false);
        }
      } catch (e) {
        setIsCameraActive(false);
        setScannerOpen(false);
      }
    } else {
      setIsCameraActive(false);
      setScannerOpen(false);
    }
  };

  const handleQrCodeScanned = async (decodedText: string) => {
    let studentId = '';
    let parentName = '';
    let relationship = '';

    try {
      const data = JSON.parse(decodedText);
      studentId = data.studentId ? String(data.studentId) : '';
      parentName = data.parentName || data.name || '';
      relationship = data.relationship || 'Người đưa đón';
    } catch (e) {
      const num = Number(decodedText.trim());
      if (!isNaN(num) && num > 0) {
        studentId = String(num);
      }
    }

    if (!studentId) {
      addToast("Mã QR không đúng định dạng điểm danh!");
      return;
    }

    const student = studentsList.find(s => String(s.id) === String(studentId));
    if (!student) {
      addToast(`Không tìm thấy học sinh có ID ${studentId} trong lớp!`);
      return;
    }

    const checkInTime = getNowTime();
    const finalParentName = parentName || 'Phụ huynh';
    const finalRelationship = relationship || 'Người đưa đón';

    playChime();

    setQrSuccessModal({
      isOpen: true,
      studentName: student.name,
      parentName: finalParentName,
      relationship: finalRelationship,
      checkInTime
    });

    setTimeout(() => {
      setQrSuccessModal(null);
    }, 2800);

    await handleScanSuccess(student.name, student.healthNote || null, student.id);
  };

  const quickActionsList = [
    { id: 'q1', label: 'Điểm danh QR', desc: 'Quét mã check-in', color: '#005A36', tint: '#E6F3ED', icon: '📲', run: handleStartScanner },
    { id: 'q2', label: 'Tạo nhật ký', desc: 'Ghi lại hoạt động lớp', color: '#2563EB', tint: '#E3EDFD', icon: '📝', run: () => addToast('📝 Tạo nhật ký lớp mới…') },
    { id: 'q3', label: 'Phiếu bé ngoan', desc: 'Đánh giá hàng ngày', color: '#EC4899', tint: '#FCE7F3', icon: '🌺', run: () => { addToast('Vui lòng dùng nút Đánh giá ngay trên Widget'); setQuickOpen(false); } },
  ];

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

      {/* TOP GREETING BAR */}
      <S.GreetingHeader>
        <S.HeaderLeft>
          <S.GreetingTitle>Chào buổi sáng, Thầy Huy! 👋</S.GreetingTitle>
          <S.GreetingSubtitleRow>
            <S.CalendarIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </S.CalendarIcon>
            <span>{dateStr}</span>
          </S.GreetingSubtitleRow>
        </S.HeaderLeft>

        <S.HeaderRight>
          {/* QUICK CREATE DROPDOWN */}
          <S.DropdownWrapper>
            <S.PrimaryActionButton onClick={() => { setQuickOpen(!quickOpen); setNotifOpen(false); }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Tạo nhanh
            </S.PrimaryActionButton>

            {quickOpen && (
              <S.QuickActionsMenu>
                {quickActionsList.map(q => (
                  <S.MenuItemButton key={q.id} $tint={q.tint} $color={q.color} onClick={q.run}>
                    <S.MenuItemIcon $tint={q.tint} $color={q.color}>{q.icon}</S.MenuItemIcon>
                    <S.MenuItemLabel>{q.label}</S.MenuItemLabel>
                  </S.MenuItemButton>
                ))}
              </S.QuickActionsMenu>
            )}
          </S.DropdownWrapper>

          {/* NOTIFICATION BUTTON */}
          <S.DropdownWrapper>
            <S.NotifIconButton onClick={() => { setNotifOpen(!notifOpen); setQuickOpen(false); }}>
              <S.NotifIconWrapper>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </S.NotifIconWrapper>
              <S.RedIndicator />
            </S.NotifIconButton>

            {notifOpen && (
              <S.NotifMenu>
                <S.NotifMenuTitle>Thông báo</S.NotifMenuTitle>
                <S.NotifItem onClick={() => addToast('🚑 Mở chi tiết lưu ý sức khỏe…')}>
                  <S.NotifItemIcon $bg="#FEE2E2" $color="#DC2626">🚑</S.NotifItemIcon>
                  <S.NotifContent>
                    <S.NotifText>Bé Bảo Long cần theo dõi dị ứng</S.NotifText>
                    <S.NotifTime>5 phút trước</S.NotifTime>
                  </S.NotifContent>
                </S.NotifItem>
                <S.NotifItem onClick={() => addToast('🌺 Mở chi tiết Phiếu bé ngoan...')}>
                  <S.NotifItemIcon $bg="#FCE7F3" $color="#EC4899">🌺</S.NotifItemIcon>
                  <S.NotifContent>
                    <S.NotifText>Nhắc nhở: Cần đánh giá phiếu bé ngoan hôm nay</S.NotifText>
                    <S.NotifTime>12 phút trước</S.NotifTime>
                  </S.NotifContent>
                </S.NotifItem>
              </S.NotifMenu>
            )}
          </S.DropdownWrapper>
        </S.HeaderRight>
      </S.GreetingHeader>

      {/* BENTO GRID */}
      <S.BentoGrid>
        {/* CARD A: Attendance (col span 2) */}
        <S.GridCol2Span>
          <AttendanceWidget students={studentsList} className={activeClassName} loading={isLoadingDashboard} />
        </S.GridCol2Span>

        {/* CARD D: Good Behavior (col span 1) */}
        <S.GridCol1Span>
          <GoodBehaviorWidget students={studentsList} />
        </S.GridCol1Span>

        {/* CARD E: Health alert notes (col span 1) */}
        <S.GridCol1Span>
          <HealthAlertsWidget students={studentsList} />
        </S.GridCol1Span>

        {/* CARD C: Timeline checklist (col span 2, row span 2) */}
        <S.GridCol2Span style={{ gridRow: 'span 2' }}>
          <TimelineWidget />
        </S.GridCol2Span>

        {/* CARD B: Approvals list (col span 1, row span 2) */}
        <S.GridRow2Span>
          <LeaveApprovalWidget onAction={addToast} onRefresh={loadDashboardData} />
        </S.GridRow2Span>

        {/* QUICK ACTIONS column (col span 1, row span 2) */}
        <S.QuickActionsColumn>
          {quickActionsList.map(q => (
            <S.ActionTile key={q.id} onClick={q.run}>
              <S.ActionTileIcon $bg={q.tint} $color={q.color}>{q.icon}</S.ActionTileIcon>
              <div>
                <S.ActionTileTitle>{q.label}</S.ActionTileTitle>
                <S.ActionTileDesc>{q.desc}</S.ActionTileDesc>
              </div>
            </S.ActionTile>
          ))}
        </S.QuickActionsColumn>
      </S.BentoGrid>

      {/* FLOATING TOAST NOTIFICATIONS */}
      <S.ToastsContainer>
        {toasts.map(t => (
          <S.Toast key={t.id}>{t.text}</S.Toast>
        ))}
      </S.ToastsContainer>


      {/* QR CAMERA SCANNER MODAL */}
      <S.ScannerOverlay $active={scannerOpen}>
        <S.ScannerContent>
          <S.ScannerHeader>
            <S.ScannerTitle>Quét Mã QR Điểm Danh</S.ScannerTitle>
            <S.ScannerCloseButton onClick={handleStopScanner}>✕</S.ScannerCloseButton>
          </S.ScannerHeader>
          <S.ScannerDesc>
            Căn chỉnh mã QR học sinh / phụ huynh nằm chính giữa khung camera quét bên dưới.
          </S.ScannerDesc>

          <S.VideoWrapper>
            <div id="reader-dashboard" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
            <S.ScannerOverlayGuide>
              {isCameraActive && <S.LaserLine />}
            </S.ScannerOverlayGuide>
          </S.VideoWrapper>

          <S.ScannerCancelButton onClick={handleStopScanner}>
            Hủy bỏ quét
          </S.ScannerCancelButton>
        </S.ScannerContent>
      </S.ScannerOverlay>

      {/* QR SCAN SUCCESS OVERLAY */}
      {qrSuccessModal && qrSuccessModal.isOpen && (
        <S.SuccessOverlay>
          <S.SuccessContent>
            <S.SuccessCheckIcon>✓</S.SuccessCheckIcon>
            <S.SuccessTitle>ĐIỂM DANH THÀNH CÔNG</S.SuccessTitle>
            <S.SuccessDesc>Thông tin quét mã check-in đã được xác thực.</S.SuccessDesc>
            
            <S.SuccessInfoBlock>
              <S.SuccessInfoRow>
                <S.SuccessInfoLabel>Học sinh:</S.SuccessInfoLabel>
                <S.SuccessInfoVal>{qrSuccessModal.studentName}</S.SuccessInfoVal>
              </S.SuccessInfoRow>
              <S.SuccessInfoRow>
                <S.SuccessInfoLabel>Người đón:</S.SuccessInfoLabel>
                <S.SuccessInfoVal>{qrSuccessModal.parentName} ({qrSuccessModal.relationship})</S.SuccessInfoVal>
              </S.SuccessInfoRow>
              <S.SuccessInfoRow>
                <S.SuccessInfoLabel>Thời gian:</S.SuccessInfoLabel>
                <S.SuccessInfoVal $isGreen>{qrSuccessModal.checkInTime}</S.SuccessInfoVal>
              </S.SuccessInfoRow>
            </S.SuccessInfoBlock>
          </S.SuccessContent>
        </S.SuccessOverlay>
      )}
    </S.DashboardContainer>
  );
};
export default TeacherDashboardView;
