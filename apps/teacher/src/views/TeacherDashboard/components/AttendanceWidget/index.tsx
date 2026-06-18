import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '@/i18n/routing';
import { AttendanceService } from '@/services/attendance';
import { Student } from '@/config/types/attendance';
import * as S from './styles';

const getTodayDateString = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const AttendanceWidget: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [classId, setClassId] = useState<number | null>(null);
  const [className, setClassName] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [isCameraScanning, setIsCameraScanning] = useState<boolean>(false);
  const [qrSuccessModal, setQrSuccessModal] = useState<{
    isOpen: boolean;
    studentName: string;
    parentName: string;
    relationship: string;
    checkInTime: string;
  } | null>(null);

  const qrScannerRef = useRef<any>(null);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const classes = await AttendanceService.getTeacherClasses();
      if (classes.length > 0) {
        const firstClass = classes[0];
        setClassId(firstClass.classId);
        setClassName(firstClass.className);
        
        const todayStr = getTodayDateString();
        const data = await AttendanceService.getDailyAttendance(firstClass.classId, todayStr);
        setStudents(data);
      }
    } catch (error) {
      console.error('Failed to load dashboard attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

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

  const playBeepSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.value = 1000;
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        audioCtx.close();
      }, 150);
    } catch (err) {
      console.error('Audio beep failed', err);
    }
  };

  const handleQrCodeScanned = async (decodedText: string) => {
    let studentId = '';
    let parentName = '';
    let relationship = '';

    try {
      const data = JSON.parse(decodedText);
      studentId = String(data.studentId);
      parentName = data.parentName || '';
      relationship = data.relationship || '';
    } catch (e) {
      const num = Number(decodedText.trim());
      if (!isNaN(num) && num > 0) {
        studentId = String(num);
      }
    }

    if (!studentId) {
      alert("Mã QR không đúng định dạng điểm danh!");
      return;
    }

    const student = students.find(s => s.id === studentId);
    if (!student) {
      alert(`Không tìm thấy học sinh với ID ${studentId} trong lớp này!`);
      return;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const finalParentName = parentName || 'Phụ huynh';
    const finalRelationship = relationship || 'Người đưa đón';

    playBeepSound();

    setQrSuccessModal({
      isOpen: true,
      studentName: student.name,
      parentName: finalParentName,
      relationship: finalRelationship,
      checkInTime: timeStr
    });

    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          attendanceStatus: 'PRESENT',
          arrivalTime: timeStr
        };
      }
      return s;
    }));

    setTimeout(() => {
      setQrSuccessModal(null);
    }, 2500);

    try {
      const updatedRecords = [{
        studentId: student.id,
        status: 'PRESENT' as const,
        arrivalTime: timeStr,
        healthNote: student.healthNote || ''
      }];
      await AttendanceService.updateAttendance(classId || 'MN1', getTodayDateString(), updatedRecords);
    } catch (e) {
      console.error('Auto save QR attendance failed', e);
    }
  };

  const handleStartCameraScan = () => {
    setIsCameraScanning(true);
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).Html5Qrcode) {
        try {
          const Html5QrcodeClass = (window as any).Html5Qrcode;
          const html5QrCode = new Html5QrcodeClass("reader-dashboard");
          qrScannerRef.current = html5QrCode;

          html5QrCode.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: { width: 220, height: 220 }
            },
            (decodedText: string) => {
              html5QrCode.stop().then(() => {
                setIsCameraScanning(false);
                handleQrCodeScanned(decodedText);
              }).catch((err: any) => {
                console.error(err);
                setIsCameraScanning(false);
              });
            },
            () => {
              // Ignore failure frames
            }
          ).catch((err: any) => {
            console.error(err);
            alert("Không thể khởi động camera: " + err);
            setIsCameraScanning(false);
          });
        } catch (e) {
          console.error(e);
          alert("Lỗi cấu hình trình quét camera");
          setIsCameraScanning(false);
        }
      } else {
        alert("Thư viện quét camera chưa tải xong. Vui lòng thử lại sau vài giây.");
      }
    }, 300);
  };

  const handleStopCameraScan = () => {
    if (qrScannerRef.current) {
      try {
        if (qrScannerRef.current.isScanning) {
          qrScannerRef.current.stop().then(() => {
            setIsCameraScanning(false);
          }).catch((err: any) => {
            console.error(err);
            setIsCameraScanning(false);
          });
        } else {
          setIsCameraScanning(false);
        }
      } catch (e) {
        setIsCameraScanning(false);
      }
    } else {
      setIsCameraScanning(false);
    }
  };

  const totalCount = students.length || 20;
  const presentCount = students.filter(s => s.attendanceStatus === 'PRESENT').length;
  const excusedCount = students.filter(s => s.attendanceStatus === 'PERMISSION_ABSENCE').length;
  const unexcusedCount = students.filter(s => s.attendanceStatus === 'UNEXCUSED_ABSENCE').length;

  if (loading) {
    return (
      <S.WidgetContainer style={{ minHeight: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '30px', height: '30px', border: '3px solid #0e793c', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <span style={{ fontSize: '14px', color: '#6f7a6e', fontWeight: '500' }}>Đang tải sĩ số...</span>
          <style dangerouslySetInnerHTML={{ __html: '@keyframes spin { to { transform: rotate(360deg); } }' }} />
        </div>
      </S.WidgetContainer>
    );
  }

  return (
    <S.WidgetContainer>
      <S.WidgetHeader>
        <S.WidgetTitle>
          Sĩ số {className || 'Lớp'}: {totalCount} bé
        </S.WidgetTitle>
        <S.MoreIcon>⋮</S.MoreIcon>
      </S.WidgetHeader>
      
      <S.ChartContainer>
        <S.ChartCircle>
          <S.ChartNumber>{presentCount}</S.ChartNumber>
          <S.ChartLabel>CÓ MẶT</S.ChartLabel>
        </S.ChartCircle>
      </S.ChartContainer>

      <S.StatsList>
        <S.StatItem variant="present">
          <S.StatInfo>
            <S.Dot color="#0e793c" />
            <S.StatName>Có mặt</S.StatName>
          </S.StatInfo>
          <S.StatValue bg="#97f7ac" color="#00210b">{presentCount}</S.StatValue>
        </S.StatItem>
        <S.StatItem variant="absent-excused">
          <S.StatInfo>
            <S.Dot color="#f59e0b" />
            <S.StatName>Vắng có phép</S.StatName>
          </S.StatInfo>
          <S.StatValue bg="#ffedd5" color="#9a3412">{excusedCount}</S.StatValue>
        </S.StatItem>
        <S.StatItem variant="absent-unexcused">
          <S.StatInfo>
            <S.Dot color="#ba1a1a" />
            <S.StatName>Vắng không phép</S.StatName>
          </S.StatInfo>
          <S.StatValue bg="#ffdad6" color="#93000a">{unexcusedCount}</S.StatValue>
        </S.StatItem>
      </S.StatsList>

      <S.ActionButton onClick={() => router.push('/attendance')}>Điểm danh ngay</S.ActionButton>
      <S.QrScanButton onClick={handleStartCameraScan}>Quét mã QR điểm danh</S.QrScanButton>

      {/* Camera Scanner Modal */}
      {isCameraScanning && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9998,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '24px',
            width: '90%',
            maxWidth: '500px',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: 'Montserrat, sans-serif' }}>
                Quét Mã QR Phụ Huynh
              </h3>
              <button 
                onClick={handleStopCameraScan}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                ✕
              </button>
            </div>
            
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0, fontFamily: 'Montserrat, sans-serif' }}>
              Căn chỉnh mã QR của Phụ huynh nằm trong khung camera bên dưới.
            </p>

            {/* Video Reader Element */}
            <div style={{
              width: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#0f172a',
              position: 'relative',
              aspectRatio: '4/3',
              border: 'none'
            }}>
              <div id="reader-dashboard" style={{ width: '100%', height: '100%' }}></div>
              
              {/* Overlay Laser Scan Frame */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                border: '2px dashed #22c55e',
                borderRadius: '8px',
                boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.5)',
                pointerEvents: 'none',
                zIndex: 10
              }}>
                {/* Scanner laser line */}
                <div style={{
                  width: '100%',
                  height: '2px',
                  backgroundColor: '#22c55e',
                  boxShadow: '0 0 8px #22c55e',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  animation: 'laserSweep 2s linear infinite'
                }}></div>
              </div>
            </div>

            <button 
              onClick={handleStopCameraScan}
              style={{
                padding: '10px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              Hủy bỏ quét
            </button>

            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes laserSweep {
                0% { top: 0%; }
                50% { top: 100%; }
                100% { top: 0%; }
              }
              #reader, #reader-dashboard {
                border: none !important;
              }
              #reader__scan_region, #reader-dashboard__scan_region {
                border: none !important;
              }
            `}} />
          </div>
        </div>
      )}

      {/* QR Check-in Success Popup */}
      {qrSuccessModal && qrSuccessModal.isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '32px',
            width: '90%',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e2e8f0',
            animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#dcfce7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              color: '#15803d',
              fontSize: '2.5rem',
              boxShadow: '0 4px 10px rgba(21, 128, 61, 0.15)'
            }}>
              ✓
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', fontFamily: 'Montserrat, sans-serif' }}>
              ĐIỂM DANH THÀNH CÔNG
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '24px', fontFamily: 'Montserrat, sans-serif' }}>
              Học sinh đã được quét mã check-in thành công.
            </p>

            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              border: '1px solid #e2e8f0',
              marginBottom: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#64748b', fontFamily: 'Montserrat, sans-serif' }}>Học sinh:</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', fontFamily: 'Montserrat, sans-serif' }}>{qrSuccessModal.studentName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#64748b', fontFamily: 'Montserrat, sans-serif' }}>Phụ huynh:</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', fontFamily: 'Montserrat, sans-serif' }}>{qrSuccessModal.parentName} ({qrSuccessModal.relationship})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#64748b', fontFamily: 'Montserrat, sans-serif' }}>Giờ check-in:</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#15803d', fontFamily: 'Montserrat, sans-serif' }}>{qrSuccessModal.checkInTime}</span>
              </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes scaleUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            `}} />
          </div>
        </div>
      )}
    </S.WidgetContainer>
  );
};

