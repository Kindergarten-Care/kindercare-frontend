import React, { useState, useEffect, useRef } from 'react';
import * as S from './styles';

interface LiveFeedItem {
  id: string;
  name: string;
  time: string;
  note: string | null;
  initial: string;
  color: string;
}

interface QRSmartHubWidgetProps {
  presentCount: number;
  totalCount: number;
  liveFeed: LiveFeedItem[];
  onScanSuccess: (name: string, note: string | null, studentId?: string) => void;
}

const CHECK_IN_QUEUE = [
  { name: 'Gia Bảo', note: null },
  { name: 'Bảo Long', note: 'Dị ứng đậu phộng — RẤT nghiêm trọng, tránh xa món lạ' },
  { name: 'Thảo My', note: null },
  { name: 'Hải Anh', note: 'Đang sốt nhẹ 37.5°, cần theo dõi thêm' },
  { name: 'Đức Anh', note: null },
  { name: 'Phương Vy', note: null },
  { name: 'Tuấn Kiệt', note: 'Hôm nay ho nhiều, nhắc uống nước ấm' },
  { name: 'Bảo Ngọc', note: null },
];

export const QRSmartHubWidget: React.FC<QRSmartHubWidgetProps> = ({
  presentCount,
  totalCount,
  liveFeed,
  onScanSuccess
}) => {
  const [queueIndex, setQueueIndex] = useState(0);
  const [scanFlash, setScanFlash] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const qrScannerRef = useRef<any>(null);

  // Dynamically load html5-qrcode library from CDN
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

  // Cleanup camera scanning on unmount
  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        try {
          if (qrScannerRef.current.isScanning) {
            qrScannerRef.current.stop();
          }
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
      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        audioCtx.close();
      }, 150);
    } catch (err) {
      console.warn('Audio beep failed', err);
    }
  };

  const startCameraWithMode = (mode: 'user' | 'environment') => {
    if (typeof window !== 'undefined' && (window as any).Html5Qrcode) {
      try {
        const Html5QrcodeClass = (window as any).Html5Qrcode;
        const html5QrCode = new Html5QrcodeClass("reader-dashboard");
        qrScannerRef.current = html5QrCode;

        html5QrCode.start(
          { facingMode: mode },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          (decodedText: string) => {
            playBeepSound();
            setScanFlash(true);
            setTimeout(() => setScanFlash(false), 500);

            // Automatically stop camera after scan
            html5QrCode.stop().then(() => {
              setIsCameraActive(false);

              let studentId = undefined;
              let studentName = '';
              let note = null;

              try {
                const data = JSON.parse(decodedText);
                studentId = data.studentId ? String(data.studentId) : undefined;
                studentName = data.studentName || data.name || '';
                note = data.note || data.healthNote || null;
              } catch (e) {
                const num = Number(decodedText.trim());
                if (!isNaN(num) && num > 0) {
                  studentId = String(num);
                } else {
                  studentName = decodedText.trim();
                }
              }

              onScanSuccess(studentName, note, studentId);
            }).catch((err: any) => {
              console.error("Failed to stop scanner after scan", err);
              setIsCameraActive(false);
            });
          },
          () => {
            // Ignore scan failure frames
          }
        ).catch((err: any) => {
          console.error("Failed to start Html5Qrcode scanner", err);
          alert("Không thể khởi động camera: " + err);
          setIsCameraActive(false);
        });
      } catch (e) {
        console.error("Html5Qrcode constructor failed", e);
        alert("Lỗi cấu hình camera");
        setIsCameraActive(false);
      }
    } else {
      alert("Thư viện quét camera đang được tải. Vui lòng thử lại sau vài giây.");
      setIsCameraActive(false);
    }
  };

  const handleStartCamera = () => {
    setIsCameraActive(true);
    setTimeout(() => {
      startCameraWithMode(facingMode);
    }, 350); // Small delay to let container mount
  };

  const handleStopCamera = () => {
    if (qrScannerRef.current) {
      try {
        if (qrScannerRef.current.isScanning) {
          qrScannerRef.current.stop().then(() => {
            setIsCameraActive(false);
          }).catch((err: any) => {
            console.error(err);
            setIsCameraActive(false);
          });
        } else {
          setIsCameraActive(false);
        }
      } catch (e) {
        setIsCameraActive(false);
      }
    } else {
      setIsCameraActive(false);
    }
  };

  const toggleCameraFacing = () => {
    if (!isCameraActive) return;

    if (qrScannerRef.current && qrScannerRef.current.isScanning) {
      qrScannerRef.current.stop().then(() => {
        const nextMode = facingMode === 'environment' ? 'user' : 'environment';
        setFacingMode(nextMode);
        setTimeout(() => {
          startCameraWithMode(nextMode);
        }, 250);
      }).catch((e: any) => {
        console.error("Failed to switch camera", e);
      });
    }
  };

  const triggerSimulation = () => {
    playBeepSound();
    setScanFlash(true);
    setTimeout(() => setScanFlash(false), 500);

    const child = CHECK_IN_QUEUE[queueIndex];
    onScanSuccess(child.name, child.note);

    setQueueIndex((prev) => (prev + 1) % CHECK_IN_QUEUE.length);
  };

  return (
    <S.WidgetContainer>
      <S.HeaderRow>
        <S.TitleContainer>
          <S.IconBlock>📷</S.IconBlock>
          <div>
            <S.Title>QR Smart Hub · Điểm danh thông minh</S.Title>
            <S.Subtitle>Bé quét mã QR tại cửa lớp, hệ thống ghi nhận tức thì</S.Subtitle>
          </div>
        </S.TitleContainer>
        
        <S.AttendanceCounter>
          <S.CounterDot />
          <S.CounterText>
            Có mặt: {presentCount} <span>/ {totalCount}</span>
          </S.CounterText>
        </S.AttendanceCounter>
      </S.HeaderRow>

      <S.GridContainer>
        {/* SCANNER CONTAINER */}
        <S.ScannerColumn>
          <S.CameraContainer>
            <S.GridOverlay />
            <S.LiveBadge>
              <S.PulseDot />
              {isCameraActive ? `LIVE · Cam quét QR (${facingMode === 'environment' ? 'Sau' : 'Trước'})` : 'OFF · Cam lớp Mầm 1'}
            </S.LiveBadge>

            {/* Video Reader Element */}
            {isCameraActive && (
              <div id="reader-dashboard" style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                borderRadius: '18px',
                overflow: 'hidden'
              }} />
            )}

            {/* Scanning viewport guidance corners */}
            <S.CornerGuide $pos="tl" />
            <S.CornerGuide $pos="tr" />
            <S.CornerGuide $pos="bl" />
            <S.CornerGuide $pos="br" />

            {/* Neon sweeping line */}
            {isCameraActive && <S.LaserLine />}

            {!isCameraActive && (
              <S.CenterInfo>
                <S.BoxIcon>📷</S.BoxIcon>
                <S.HelpText>Camera đang tắt</S.HelpText>
              </S.CenterInfo>
            )}

            {/* Flash feedback overlay */}
            <S.FlashOverlay $active={scanFlash} />
          </S.CameraContainer>

          {isCameraActive ? (
            <S.TriggerButton onClick={handleStopCamera} style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}>
              🛑 Tắt camera quét QR
            </S.TriggerButton>
          ) : (
            <S.TriggerButton onClick={handleStartCamera}>
              📷 Bật camera quét QR
            </S.TriggerButton>
          )}

          <S.ButtonRow>
            <S.ActionButton onClick={toggleCameraFacing} disabled={!isCameraActive}>
              🔄 Đổi camera
            </S.ActionButton>
            <S.ActionButton onClick={triggerSimulation}>
              ⚡ Mô phỏng quét (Demo)
            </S.ActionButton>
          </S.ButtonRow>
        </S.ScannerColumn>

        {/* LOG FEED */}
        <S.FeedColumn>
          <S.FeedHeaderRow>
            <S.FeedTitle>Bảng tin điểm danh · Real-time</S.FeedTitle>
            <S.FeedBadge>{liveFeed.length} bé hôm nay</S.FeedBadge>
          </S.FeedHeaderRow>

          <S.FeedList>
            {liveFeed.map((item) => (
              <S.FeedItem key={item.id} $color={item.color}>
                <S.FeedAvatar $color={item.color}>{item.initial}</S.FeedAvatar>
                <S.FeedInfo>
                  <S.FeedNameRow>
                    <S.FeedName>{item.name}</S.FeedName>
                    <S.FeedTimeBadge>✓ Check-in {item.time}</S.FeedTimeBadge>
                  </S.FeedNameRow>
                  {item.note && (
                    <S.FeedWarning>
                      ⚠️ {item.note}
                    </S.FeedWarning>
                  )}
                </S.FeedInfo>
              </S.FeedItem>
            ))}

            <S.WaitingRow>
              <S.RippleWrapper>
                <S.RippleDot />
                <S.Ripples />
              </S.RippleWrapper>
              <S.WaitingText>Đang chờ lượt quét tiếp theo…</S.WaitingText>
            </S.WaitingRow>
          </S.FeedList>
        </S.FeedColumn>
      </S.GridContainer>
    </S.WidgetContainer>
  );
};
