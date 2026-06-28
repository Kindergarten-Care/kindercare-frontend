import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { QrAttendanceService, QrScanResult } from '@/services/qr-attendance';
import { X, CheckCircle, AlertCircle, LogIn, LogOut } from 'lucide-react';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  width: 90%;
  max-width: 450px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
  background: #ffffff;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 8px;
  transition: all 0.2s;
  &:hover { background: #f3f4f6; color: #1f2937; }
`;

const ScannerWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: #000;
  position: relative;
  overflow: hidden;
`;

const ResultCard = styled.div<{ $isSuccess: boolean }>`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: ${props => props.$isSuccess ? '#f0fdf4' : '#fef2f2'};
`;

const ResultTitle = styled.h3<{ $isSuccess: boolean }>`
  margin: 16px 0 8px;
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.$isSuccess ? '#166534' : '#991b1b'};
`;

const ResultText = styled.p`
  margin: 0 0 4px;
  font-size: 15px;
  color: #374151;
`;

const ResultHighlight = styled.p`
  margin: 8px 0 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const RetryButton = styled.button`
  margin-top: 20px;
  background: #111827;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
`;

interface QrScannerModalProps {
  onClose: () => void;
  onScanSuccess?: () => void; // Optional callback to refresh attendance list
}

export function QrScannerModal({ onClose, onScanSuccess }: QrScannerModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanResult, setScanResult] = useState<{ success: boolean; data?: QrScanResult; errorMsg?: string } | null>(null);
  
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerId = 'qr-reader';

  // Initialize Scanner
  useEffect(() => {
    const html5QrCode = new Html5Qrcode(containerId, { formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE] });
    scannerRef.current = html5QrCode;

    html5QrCode.start(
      { facingMode: 'environment' }, // Prefer back camera
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        handleQrDetect(decodedText);
      },
      (errorMessage) => {
        // Ignore constant detection errors
      }
    ).catch(err => {
      console.error('Camera startup error:', err);
      setScanResult({ success: false, errorMsg: 'Không thể khởi động camera. Vui lòng cấp quyền truy cập.' });
    });

    return () => {
      if (html5QrCode.isScanning) {
        html5QrCode.stop().catch(console.error);
      }
    };
  }, []);

  const handleQrDetect = async (qrToken: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      // Pause scanning while calling API
      if (scannerRef.current?.isScanning) {
        scannerRef.current.pause(true);
      }

      const result = await QrAttendanceService.scanQrToken(qrToken);
      setScanResult({ success: true, data: result });
      if (onScanSuccess) onScanSuccess();

      // Automatically reset to scan again after 3 seconds on success
      setTimeout(() => {
        resetScanner();
      }, 3000);

    } catch (error: any) {
      const msg = error.response?.data?.message || 'Có lỗi xảy ra khi quét mã QR';
      setScanResult({ success: false, errorMsg: msg });
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setIsProcessing(false);
    if (scannerRef.current?.isScanning) {
      scannerRef.current.resume();
    }
  };

  const handleClose = () => {
    if (scannerRef.current?.isScanning) {
      scannerRef.current.stop().then(() => onClose()).catch(() => onClose());
    } else {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Header>
          <Title>Quét mã QR Điểm danh</Title>
          <CloseButton onClick={handleClose}>
            <X size={20} strokeWidth={2.5} />
          </CloseButton>
        </Header>

        {/* Màn hình kết quả */}
        {scanResult ? (
          <ResultCard $isSuccess={scanResult.success}>
            {scanResult.success ? (
              <>
                {scanResult.data?.attendanceType === 'checkin' ? (
                  <LogIn size={48} color="#166534" strokeWidth={2} />
                ) : (
                  <LogOut size={48} color="#166534" strokeWidth={2} />
                )}
                <ResultTitle $isSuccess={true}>
                  {scanResult.data?.attendanceType === 'checkin' ? 'Vào lớp thành công' : 'Ra về thành công'}
                </ResultTitle>
                <ResultHighlight>{scanResult.data?.fullName}</ResultHighlight>
                <ResultText>{scanResult.data?.className} · {scanResult.data?.campusName}</ResultText>
                <ResultText style={{ marginTop: 8, fontWeight: 600, color: '#166534' }}>
                  Giờ ghi nhận: {scanResult.data?.time}
                </ResultText>
                
                {/* Auto reset feedback */}
                <p style={{ fontSize: 13, color: '#166534', marginTop: 24, opacity: 0.8 }}>
                  Sẽ tự động quét tiếp trong giây lát...
                </p>
              </>
            ) : (
              <>
                <AlertCircle size={48} color="#991b1b" strokeWidth={2} />
                <ResultTitle $isSuccess={false}>Quét thất bại</ResultTitle>
                <ResultText>{scanResult.errorMsg}</ResultText>
                <RetryButton onClick={resetScanner}>Quét lại</RetryButton>
              </>
            )}
          </ResultCard>
        ) : (
          <ScannerWrapper>
            <div id={containerId} style={{ width: '100%', height: '100%' }} />
          </ScannerWrapper>
        )}
      </ModalContent>
    </Overlay>
  );
}
