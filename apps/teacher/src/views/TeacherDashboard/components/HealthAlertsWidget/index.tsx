'use client';

import React, { useState, useEffect } from 'react';
import * as S from './styles';

interface MedItem {
  id: string;
  name: string;
  med: string;
  dose: string;
  time: string;
  emoji: string;
  done: boolean;
}

interface HealthAlertsWidgetProps {
  students: { id: string; name: string; healthNote?: string }[];
}

export const HealthAlertsWidget: React.FC<HealthAlertsWidgetProps> = ({ students }) => {
  const [meds, setMeds] = useState<MedItem[]>([]);

  useEffect(() => {
    const alerts = students.filter(s => s.healthNote && s.healthNote.trim().length > 0);
    const mapped = alerts.map((s, idx) => {
      // Choose emoji and details based on contents
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
        done: false
      };
    });
    setMeds(mapped);
  }, [students]);

  const toggleMed = (id: string) => {
    setMeds(prev => prev.map(m => m.id === id ? { ...m, done: !m.done } : m));
  };

  const pendingCount = meds.filter(m => !m.done).length;

  return (
    <S.WidgetContainer>
      <S.HeaderRow>
        <S.HeaderIconWrapper>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m10.5 20.5-7-7a4.95 4.95 0 1 1 7-7 4.95 4.95 0 1 1 7 7Z" />
            <path d="m8.5 8.5 7 7" />
          </svg>
        </S.HeaderIconWrapper>
        <S.WidgetTitle>Lưu ý y tế</S.WidgetTitle>
        <S.CounterBadge>{pendingCount}</S.CounterBadge>
      </S.HeaderRow>

      <S.MedList>
        {meds.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', flex: 1, padding: '30px 10px', textAlign: 'center', color: '#9CA3AF' }}>
            <span style={{ fontSize: '36px' }}>😊</span>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Không có lưu ý y tế!</span>
          </div>
        ) : (
          meds.map(m => (
            <S.MedRow key={m.id} $done={m.done}>
              <S.EmojiIcon>{m.emoji}</S.EmojiIcon>
              <S.InfoCol>
                <S.MedName $done={m.done}>Bé {m.name} · {m.med}</S.MedName>
                <S.MedDose>{m.dose} · Lúc {m.time}</S.MedDose>
              </S.InfoCol>
              <S.CheckBox $done={m.done} onClick={() => toggleMed(m.id)}>
                {m.done && <S.CheckIcon>✓</S.CheckIcon>}
              </S.CheckBox>
            </S.MedRow>
          ))
        )}
      </S.MedList>
    </S.WidgetContainer>
  );
};
export const MedicalAlertsWidget = HealthAlertsWidget;
export default HealthAlertsWidget;
