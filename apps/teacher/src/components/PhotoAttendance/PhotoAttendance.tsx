'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Camera, RefreshCw } from 'lucide-react';
import { AttendanceConfirmModal } from './AttendanceConfirmModal';
import { Student } from '@/config/types/attendance';

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: #111827;
`;

const OutlinedBtn = styled.button`
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { background: #f3f4f6; }
  &:active { transform: scale(0.96); }
`;

const CameraCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.p`
  color: #f87171;
  margin-bottom: 8px;
`;

const PrimaryBtn = styled.button`
  width: 100%;
  padding: 16px;
  background: #111827;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
  &:hover:not(:disabled) { background: #1f2937; box-shadow: 0 6px 12px -2px rgba(0,0,0,0.15); }
  &:active:not(:disabled) { transform: scale(0.98); }
`;

interface PhotoAttendanceProps {
  onSuccess?: () => void;
  onCloseModal?: () => void;
  students: Student[];
  classId: string;
  className: string;
}

export const PhotoAttendance: React.FC<PhotoAttendanceProps> = ({ 
  onSuccess, onCloseModal, students, classId, className 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const teacherId = "TEACHER_1"; // Có thể lấy từ context sau

  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      streamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      setCameraError('Không thể truy cập camera. Vui lòng cấp quyền!');
      console.error("Camera access error:", err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setStream(null);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setPhotoBlob(blob);
            setPhotoUrl(url);
            setIsModalOpen(true);
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (photoUrl) {
      URL.revokeObjectURL(photoUrl);
    }
    setPhotoUrl(null);
    setPhotoBlob(null);
  };

  const handleSuccess = () => {
    if (onSuccess) onSuccess();
    if (onCloseModal) onCloseModal();
  };

  return (
    <Container>
      <HeaderRow>
        <Title>Điểm danh chụp ảnh</Title>
        <OutlinedBtn onClick={startCamera}>
          <RefreshCw size={14} /> Khởi động lại
        </OutlinedBtn>
      </HeaderRow>

      <CameraCard>
        {cameraError ? (
          <div style={{ textAlign: 'center', padding: 20 }}>
            <ErrorText>{cameraError}</ErrorText>
            <OutlinedBtn onClick={startCamera} style={{ margin: '0 auto' }}>Thử lại</OutlinedBtn>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </CameraCard>

      <PrimaryBtn 
        onClick={handleCapture}
        disabled={!stream || !!cameraError}
      >
        <Camera size={24} />
        Chụp ảnh
      </PrimaryBtn>

      {isModalOpen && (
        <AttendanceConfirmModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          photoBlob={photoBlob}
          photoUrl={photoUrl}
          students={students}
          classId={classId}
          className={className}
          teacherId={teacherId}
          onSuccess={handleSuccess}
        />
      )}
    </Container>
  );
};
