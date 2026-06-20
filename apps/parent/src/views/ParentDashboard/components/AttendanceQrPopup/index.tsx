'use client';

import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { IconClose, IconDownload } from '@/assets/icons/dashboard';
import { QrGenerator } from './QrGenerator';

interface AttendanceQrPopupProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    studentId: number;
    fullName: string;
    className: string;
    academicYearName: string;
    campusName: string;
  };
}

const IconQrCode: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <path d="M7 17h.01M17 17h.01M17 7h.01M7 7h.01" strokeWidth="3.5" strokeLinecap="round" />
    <rect x="9" y="9" width="6" height="6" fill={color} stroke="none" />
  </svg>
);

const IconRefresh: React.FC<{ size?: number }> = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const AttendanceQrPopup: React.FC<AttendanceQrPopupProps> = ({ isOpen, onClose, student }) => {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [qrToken, setQrToken] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Generate dynamic QR token
  const generateNewToken = () => {
    const timestamp = Math.floor(Date.now() / 1000);
    setQrToken(`kindercare:checkin:studentId=${student.studentId}:time=${timestamp}`);
    setTimeLeft(60);
  };

  useEffect(() => {
    if (isOpen) {
      generateNewToken();
    }
  }, [isOpen, student.studentId]);

  // Countdown timer for security auto-refresh
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Trigger refresh
          setRefreshing(true);
          setTimeout(() => setRefreshing(false), 500);
          generateNewToken();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleManualRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      generateNewToken();
    }, 600);
  };

  const handleDownload = () => {
    // Premium simulated download
    alert(`Tải mã QR điểm danh của bé ${student.fullName} thành công!`);
  };

  const studentCode = `KC-${student.studentId.toString().padStart(4, '0')}`;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.HeadRow>
          <S.TitleWrap>
            <S.IconBox>
              <IconQrCode size={18} color="var(--brand)" />
            </S.IconBox>
            <S.Title>Mã điểm danh học sinh</S.Title>
          </S.TitleWrap>
          <S.CloseBtn onClick={onClose} aria-label="Đóng popup">
            <IconClose size={14} />
          </S.CloseBtn>
        </S.HeadRow>

        <S.ContentBody>
          <S.QrOuterContainer>
            <S.ScannerArea>
              {/* Laser line effect */}
              <S.LaserLine />
              <QrGenerator value={qrToken} size={200} />
            </S.ScannerArea>
          </S.QrOuterContainer>

          <S.RefreshTimerRow>
            <S.RefreshIconWrap $refreshing={refreshing} onClick={handleManualRefresh} title="Làm mới mã QR">
              <IconRefresh size={14} />
            </S.RefreshIconWrap>
            <span>Tự động cập nhật sau <strong>{timeLeft}s</strong></span>
          </S.RefreshTimerRow>

          <S.InfoCard>
            <S.InfoRow>
              <S.InfoLabel>Mã học sinh</S.InfoLabel>
              <S.InfoValue>{studentCode}</S.InfoValue>
            </S.InfoRow>
            <S.InfoRow>
              <S.InfoLabel>Họ và tên</S.InfoLabel>
              <S.InfoValue>{student.fullName}</S.InfoValue>
            </S.InfoRow>
            <S.InfoRow>
              <S.InfoLabel>Lớp học</S.InfoLabel>
              <S.InfoValue>{student.className}</S.InfoValue>
            </S.InfoRow>
            <S.InfoRow>
              <S.InfoLabel>Cơ sở</S.InfoLabel>
              <S.InfoValue>{student.campusName}</S.InfoValue>
            </S.InfoRow>
          </S.InfoCard>
        </S.ContentBody>

        <S.Footer>
          <S.DownloadBtn onClick={handleDownload}>
            <IconDownload size={16} /> Tải mã QR
          </S.DownloadBtn>
        </S.Footer>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default AttendanceQrPopup;
