import React, { useState } from 'react';
import * as S from './styles';

type StatusType = 'none' | 'eat-all' | 'slow-eater' | 'skip-meal';

interface StudentLog {
  id: string;
  name: string;
  initial: string;
  color: string;
  status: StatusType;
}

interface QuickLogWidgetProps {
  students: { id: string; name: string; eatingStatus?: string }[];
  menuInfo?: any[];
  onUpdateMeal?: (studentId: string, status: string) => void;
  onUpdateAll?: (status: string) => void;
}
export const QuickLogWidget: React.FC<QuickLogWidgetProps> = ({ students, menuInfo, onUpdateMeal, onUpdateAll }) => {
  const [logs, setLogs] = useState<StudentLog[]>([]);

  React.useEffect(() => {
    const colors = ['#FCA5A5', '#FCD34D', '#6EE7B7', '#93C5FD', '#C4B5FD', '#F9A8D4', '#FDBA74', '#67E8F9', '#A5B4FC', '#5EEAD4'];
    const mappedLogs = students.map((s, index) => {
      const initial = s.name.trim().split(' ').pop()?.charAt(0).toUpperCase() || 'B';
      const color = colors[index % colors.length];

      let widgetStatus: StatusType = 'none';
      if (s.eatingStatus === 'Ăn hết') widgetStatus = 'eat-all';
      else if (s.eatingStatus === 'Ăn chậm') widgetStatus = 'slow-eater';
      else if (s.eatingStatus === 'Không ăn') widgetStatus = 'skip-meal';

      return {
        id: s.id,
        name: s.name,
        initial,
        color,
        status: widgetStatus
      };
    });
    setLogs(mappedLogs);
  }, [students]);

  const cycleStatus = (id: string) => {
    const student = logs.find(s => s.id === id);
    if (!student) return;

    let nextStatus: StatusType = 'none';
    let dbStatus = '';

    if (student.status === 'none') { nextStatus = 'eat-all'; dbStatus = 'Ăn hết'; }
    else if (student.status === 'eat-all') { nextStatus = 'slow-eater'; dbStatus = 'Ăn chậm'; }
    else if (student.status === 'slow-eater') { nextStatus = 'skip-meal'; dbStatus = 'Không ăn'; }
    else if (student.status === 'skip-meal') { nextStatus = 'none'; dbStatus = ''; }
    
    // Optistic local update
    setLogs(prev => prev.map(s => s.id === id ? { ...s, status: nextStatus } : s));

    if (onUpdateMeal && dbStatus) {
      onUpdateMeal(id, dbStatus);
    }
  };

  const markAllEatAll = () => {
    setLogs(prev => prev.map(student => ({ ...student, status: 'eat-all' })));
    if (onUpdateAll) {
      onUpdateAll('Ăn hết');
    }
  };

  const getStatusBadge = (status: StatusType) => {
    if (status === 'eat-all') return '✓';
    if (status === 'slow-eater') return '🥄';
    if (status === 'skip-meal') return '😭';
    return null;
  };

  const getMenuDisplay = () => {
    if (!menuInfo || menuInfo.length === 0) return 'Chưa có thực đơn hôm nay';
    const m = menuInfo[0];
    return `${m.mealType || 'Bữa ăn'}: ${m.dishName || 'Chưa cập nhật'}`;
  };

  return (
    <S.WidgetContainer>
      <S.HeaderRow>
        <S.Title>📋 Sinh hoạt nhanh</S.Title>
        <S.BatchButton onClick={markAllEatAll}>
          🍚 Cả lớp ăn hết suất
        </S.BatchButton>
      </S.HeaderRow>
      <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px', marginTop: '-8px' }}>
        {getMenuDisplay()}
      </div>

      <S.SubtitleRow>
        <span>✓ Ăn hết</span>
        <span>🥄 Ăn chậm</span>
        <span>😭 Bỏ bữa</span>
        <span style={{ color: '#C7CFCA' }}>· Chạm avatar để đổi</span>
      </S.SubtitleRow>

      <S.AvatarGrid>
        {logs.map((g, index) => (
          <S.StudentButton key={`${g.id}-${index}`} onClick={() => cycleStatus(g.id)}>
            <S.AvatarRing $status={g.status} $color={g.color}>
              {g.initial}
              {g.status !== 'none' && (
                <S.BadgeIcon $status={g.status}>
                  {getStatusBadge(g.status)}
                </S.BadgeIcon>
              )}
            </S.AvatarRing>
            <S.StudentName>{g.name.split(' ').pop()}</S.StudentName>
          </S.StudentButton>
        ))}
      </S.AvatarGrid>
    </S.WidgetContainer>
  );
};
export default QuickLogWidget;
