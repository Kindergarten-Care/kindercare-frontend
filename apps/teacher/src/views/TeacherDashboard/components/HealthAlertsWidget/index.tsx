import React, { useState } from 'react';
import * as S from './styles';

interface MedItem {
  id: string;
  name: string;
  med: string;
  dose: string;
  time: string;
  initial: string;
  color: string;
  done: boolean;
}

const INITIAL_MEDS: MedItem[] = [
  { id: 'm1', name: 'Bé Khang', med: 'Siro ho Prospan', dose: '5ml', time: '11:00', initial: 'K', color: '#F9A8D4', done: false },
  { id: 'm2', name: 'Bé Bảo Long', med: 'Thuốc kháng dị ứng', dose: '1 viên', time: 'Sau ăn trưa', initial: 'L', color: '#FDBA74', done: false },
  { id: 'm3', name: 'Bé Hải Anh', med: 'Hạ sốt (nếu >38°)', dose: 'Theo dõi', time: 'Cả ngày', initial: 'A', color: '#93C5FD', done: false },
];

export const HealthAlertsWidget: React.FC = () => {
  const [meds, setMeds] = useState<MedItem[]>(INITIAL_MEDS);

  const toggleMed = (id: string) => {
    setMeds(prev => prev.map(m => m.id === id ? { ...m, done: !m.done } : m));
  };

  const pendingCount = meds.filter(m => !m.done).length;

  return (
    <S.WidgetContainer>
      <S.HeaderRow>
        <S.Title>💊 Lưu ý Y tế hôm nay</S.Title>
        <S.CounterBadge>{pendingCount} cần làm</S.CounterBadge>
      </S.HeaderRow>

      <S.MedList>
        {meds.map(m => (
          <S.MedRow key={m.id} $done={m.done}>
            <S.AvatarCircle $color={m.color}>{m.initial}</S.AvatarCircle>
            <S.InfoCol>
              <S.MedName $done={m.done}>{m.name} · {m.med}</S.MedName>
              <S.MedDose>Liều: {m.dose} · Lúc {m.time}</S.MedDose>
            </S.InfoCol>
            <S.CheckBox $done={m.done} onClick={() => toggleMed(m.id)}>
              {m.done && <S.CheckIcon>✓</S.CheckIcon>}
            </S.CheckBox>
          </S.MedRow>
        ))}
      </S.MedList>
    </S.WidgetContainer>
  );
};
export const MedicalAlertsWidget = HealthAlertsWidget;
