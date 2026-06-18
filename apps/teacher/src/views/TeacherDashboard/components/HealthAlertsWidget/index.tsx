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

interface HealthAlertsWidgetProps {
  students: { id: string; name: string; healthNote?: string }[];
}

export const HealthAlertsWidget: React.FC<HealthAlertsWidgetProps> = ({ students }) => {
  const [meds, setMeds] = useState<MedItem[]>([]);

  React.useEffect(() => {
    const alerts = students.filter(s => s.healthNote && s.healthNote.trim().length > 0);
    const colors = ['#F9A8D4', '#FDBA74', '#93C5FD', '#FCA5A5', '#6EE7B7', '#C4B5FD'];
    const mapped = alerts.map((s, idx) => {
      const initial = s.name.trim().split(' ').pop()?.charAt(0).toUpperCase() || 'B';
      const color = colors[idx % colors.length];
      return {
        id: s.id,
        name: s.name,
        med: s.healthNote || '',
        dose: 'Lưu ý',
        time: 'Trong ngày',
        initial,
        color,
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
