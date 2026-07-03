'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as S from './styles';
import { IconClose } from '@/assets/icons/dashboard';
import { QrGenerator } from './QrGenerator';
import { qrTokenService } from '@/services/QrToken/QrTokenService';

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
  const [qrToken, setQrToken] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const fetchToken = useCallback(async () => {
    setLoading(true);
    setError(null);
    stopTimer();
    try {
      const res = await qrTokenService.getQrToken(student.studentId);
      setQrToken(res.token);
      const ttl = res.ttl ?? 60;
      setTimeLeft(ttl);

      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            stopTimer();
            fetchToken();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Không thể lấy mã QR');
    } finally {
      setLoading(false);
    }
  }, [student.studentId]);

  useEffect(() => {
    if (isOpen) {
      fetchToken();
    } else {
      stopTimer();
      setQrToken('');
      setError(null);
    }
    return () => stopTimer();
  }, [isOpen, fetchToken]);

  if (!isOpen) return null;

  const handleManualRefresh = () => {
    if (refreshing || loading) return;
    setRefreshing(true);
    fetchToken().finally(() => setRefreshing(false));
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
              {loading && !qrToken ? (
                <div style={{ width: 300, height: 300, display: 'grid', placeItems: 'center', color: 'var(--muted)' }}>
                  Đang tải mã QR...
                </div>
              ) : error && !qrToken ? (
                <div style={{ width: 300, height: 300, display: 'grid', placeItems: 'center', color: '#ef4444', fontSize: 13, textAlign: 'center', padding: '0 16px' }}>
                  {error}
                </div>
              ) : (
                <QrGenerator value={qrToken} size={300} />
              )}
            </S.ScannerArea>
          </S.QrOuterContainer>

          <S.RefreshTimerRow>
            <S.RefreshIconWrap $refreshing={refreshing || loading} onClick={handleManualRefresh} title="Làm mới mã QR">
              <IconRefresh size={14} />
            </S.RefreshIconWrap>
            {error
              ? <span style={{ color: '#ef4444', fontSize: 12 }}>{error} — <strong style={{ cursor: 'pointer' }} onClick={handleManualRefresh}>Thử lại</strong></span>
              : <span>Tự động cập nhật sau <strong>{timeLeft}s</strong></span>
            }
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
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default AttendanceQrPopup;
