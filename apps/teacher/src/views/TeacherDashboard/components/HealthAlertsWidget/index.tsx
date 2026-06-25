'use client';

import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { useMedicalRequests } from '@/hooks/useTeacherQueries';

interface MedItem {
  id: string;
  name: string;
  med: string;
  dose: string;
  time: string;
  emoji: string;
  done: boolean;
  raw: any;
}

interface HealthAlertsWidgetProps {
  students?: { id: string; name: string; healthNote?: string }[];
  classId?: number | null;
}

export const HealthAlertsWidget: React.FC<HealthAlertsWidgetProps> = ({ students, classId }) => {
  const { data: medicalData, isLoading } = useMedicalRequests(classId || undefined);
  const [meds, setMeds] = useState<MedItem[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<MedItem | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    // Priority: Real medical data from API
    if (medicalData && medicalData.length > 0) {
      const mapped = medicalData.map((m: any) => {
        let emoji = '💊';
        const noteLower = (m.medicineDetails || '').toLowerCase();
        if (noteLower.includes('dị ứng') || noteLower.includes('allergy')) emoji = '⚠️';
        else if (noteLower.includes('sốt') || noteLower.includes('fever')) emoji = '🌡️';
        else if (noteLower.includes('ho') || noteLower.includes('cough')) emoji = '🥤';

        return {
          id: String(m.requestId),
          name: m.studentName,
          med: m.medicineDetails || 'Cần lưu ý',
          dose: m.dosage || 'Theo đơn',
          time: m.timeToTake || 'Trong ngày',
          emoji,
          done: m.status === 'Administered',
          raw: m
        };
      });
      setMeds(mapped);
    } 
    // Fallback: local healthNotes from students array if no medical DB records exist
    else if (students && students.length > 0) {
      const alerts = students.filter(s => s.healthNote && s.healthNote.trim().length > 0);
      const mapped = alerts.map((s, idx) => {
        const noteLower = (s.healthNote || '').toLowerCase();
        let emoji = '💊';
        let dose = 'Theo đơn';
        let time = 'Trong ngày';

        if (noteLower.includes('dị ứng') || noteLower.includes('allergy')) {
          emoji = '⚠️';
          dose = 'Đặc biệt lưu ý';
          time = 'Cả ngày';
        } else if (noteLower.includes('sốt') || noteLower.includes('fever')) {
          emoji = '🌡️';
          dose = 'Theo dõi nhiệt độ';
          time = 'Thường xuyên';
        } else if (noteLower.includes('ho') || noteLower.includes('cough')) {
          emoji = '🥤';
          dose = 'Uống siro ho';
          time = '11:00';
        }

        return {
          id: s.id,
          name: s.name,
          med: s.healthNote || '',
          dose,
          time,
          emoji,
          done: false,
          raw: null
        };
      });
      setMeds(mapped);
    }
  }, [medicalData, students]);

  const toggleMed = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setMeds(prev => prev.map(m => m.id === id ? { ...m, done: !m.done } : m));
  };

  const handleOpenAlert = (item: MedItem) => {
    setSelectedAlert(item);
  };

  const pendingCount = meds.filter(m => !m.done).length;

  return (
    <>
      <S.WidgetContainer>
        <S.HeaderRow>
          <S.HeaderIconWrapper>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m10.5 20.5-7-7a4.95 4.95 0 1 1 7-7 4.95 4.95 0 1 1 7 7Z" />
              <path d="m8.5 8.5 7 7" />
            </svg>
          </S.HeaderIconWrapper>
          <S.WidgetTitle>Lưu ý y tế</S.WidgetTitle>
          <S.CounterBadge>{isLoading ? '...' : pendingCount}</S.CounterBadge>
        </S.HeaderRow>

        <S.MedList>
          {isLoading ? (
            <div style={{ color: '#9CA3AF', padding: '20px', textAlign: 'center', fontSize: '13px', fontWeight: 600 }}>
              Đang tải dữ liệu y tế...
            </div>
          ) : meds.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', flex: 1, padding: '30px 10px', textAlign: 'center', color: '#9CA3AF' }}>
              <span style={{ fontSize: '36px' }}>😊</span>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Không có lưu ý y tế!</span>
            </div>
          ) : (
            meds.map(m => (
              <S.MedRow key={m.id} $done={m.done} style={{ cursor: 'pointer' }} onClick={() => handleOpenAlert(m)}>
                <S.EmojiIcon>{m.emoji}</S.EmojiIcon>
                <S.InfoCol>
                  <S.MedName $done={m.done}>Bé {m.name} · {m.med}</S.MedName>
                  <S.MedDose>{m.dose} · {m.time}</S.MedDose>
                </S.InfoCol>
                <S.CheckBox $done={m.done} onClick={(e) => toggleMed(e, m.id)}>
                  {m.done && <S.CheckIcon>✓</S.CheckIcon>}
                </S.CheckBox>
              </S.MedRow>
            ))
          )}
        </S.MedList>
      </S.WidgetContainer>

      {selectedAlert && (
        <S.ModalOverlay onClick={() => setSelectedAlert(null)}>
          <S.ModalContent onClick={e => e.stopPropagation()}>
            <S.ModalTitle>{selectedAlert.emoji} Chi tiết dặn thuốc - Bé {selectedAlert.name}</S.ModalTitle>
            
            {selectedAlert.raw ? (
              <>
                <S.ModalMetaRow>
                  <S.ModalMetaField>
                    <S.ModalLabel>Phụ huynh: </S.ModalLabel>
                    <span style={{ color: '#1F2937', fontWeight: 500 }}>{selectedAlert.raw.parentName || '...'}</span>
                  </S.ModalMetaField>
                  <S.ModalMetaField>
                    <S.ModalLabel>Ngày dặn: </S.ModalLabel>
                    <span style={{ color: '#1F2937', fontWeight: 500 }}>
                      {new Date(selectedAlert.raw.requestDate * 1000).toLocaleDateString('vi-VN')}
                    </span>
                  </S.ModalMetaField>
                  <S.ModalMetaField>
                    <S.ModalLabel>Liều lượng: </S.ModalLabel>
                    <span style={{ color: '#1F2937', fontWeight: 500 }}>{selectedAlert.raw.dosage || 'Không rõ'}</span>
                  </S.ModalMetaField>
                  <S.ModalMetaField>
                    <S.ModalLabel>Tần suất: </S.ModalLabel>
                    <span style={{ color: '#1F2937', fontWeight: 500 }}>{selectedAlert.raw.frequency || 'Không rõ'}</span>
                  </S.ModalMetaField>
                  <S.ModalMetaField>
                    <S.ModalLabel>Thời điểm uống: </S.ModalLabel>
                    <span style={{ color: '#1F2937', fontWeight: 500 }}>{selectedAlert.raw.timeToTake || 'Không rõ'}</span>
                  </S.ModalMetaField>
                </S.ModalMetaRow>

                <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '6px', fontWeight: 700 }}>CHI TIẾT THUỐC / LƯU Ý:</div>
                <S.ModalReasonBox>
                  {selectedAlert.raw.medicineDetails || 'Không ghi rõ chi tiết'}
                </S.ModalReasonBox>

                {selectedAlert.raw.parentNote && (
                  <>
                    <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '6px', fontWeight: 700 }}>LỜI DẶN THÊM CỦA BA MẸ:</div>
                    <S.ModalReasonBox style={{ minHeight: '60px', background: '#F9FAFB', border: '1px solid #E5E7EB', color: '#374151' }}>
                      {selectedAlert.raw.parentNote}
                    </S.ModalReasonBox>
                  </>
                )}

                {selectedAlert.raw.medicineImageUrl && (
                  <>
                    <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '6px', fontWeight: 700 }}>HÌNH ẢNH ĐƠN THUỐC:</div>
                    <S.ImagePreview 
                      src={selectedAlert.raw.medicineImageUrl} 
                      alt="Đơn thuốc" 
                      onClick={() => setLightboxImage(selectedAlert.raw.medicineImageUrl)}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '6px', fontWeight: 700 }}>CHI TIẾT LƯU Ý:</div>
                <S.ModalReasonBox>
                  {selectedAlert.med || 'Không ghi rõ chi tiết'}
                </S.ModalReasonBox>
              </>
            )}

            <S.ModalActionRow>
              <S.ModalCloseBtn onClick={() => setSelectedAlert(null)}>Đóng</S.ModalCloseBtn>
            </S.ModalActionRow>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      {lightboxImage && (
        <S.ModalOverlay onClick={() => setLightboxImage(null)} style={{ zIndex: 9999 }}>
          <img 
            src={lightboxImage} 
            alt="Phóng to" 
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px' }} 
            onClick={e => e.stopPropagation()} 
          />
          <button 
            onClick={() => setLightboxImage(null)}
            style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer' }}
          >
            ✕
          </button>
        </S.ModalOverlay>
      )}
    </>
  );
};
export const MedicalAlertsWidget = HealthAlertsWidget;
export default HealthAlertsWidget;
