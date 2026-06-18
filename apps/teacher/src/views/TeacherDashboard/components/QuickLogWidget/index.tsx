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
  students: { id: string; name: string }[];
}
export const QuickLogWidget: React.FC<QuickLogWidgetProps> = ({ students }) => {
  const [logs, setLogs] = useState<StudentLog[]>([]);

  React.useEffect(() => {
    const colors = ['#FCA5A5', '#FCD34D', '#6EE7B7', '#93C5FD', '#C4B5FD', '#F9A8D4', '#FDBA74', '#67E8F9', '#A5B4FC', '#5EEAD4'];
    const mappedLogs = students.map((s, index) => {
      const initial = s.name.trim().split(' ').pop()?.charAt(0).toUpperCase() || 'B';
      const color = colors[index % colors.length];
      return {
        id: s.id,
        name: s.name,
        initial,
        color,
        status: 'none' as StatusType
      };
    });
    setLogs(mappedLogs);
  }, [students]);

  const cycleStatus = (id: string) => {
    setLogs(prev => prev.map(student => {
      if (student.id !== id) return student;
      let nextStatus: StatusType = 'none';
      if (student.status === 'none') nextStatus = 'eat-all';
      else if (student.status === 'eat-all') nextStatus = 'slow-eater';
      else if (student.status === 'slow-eater') nextStatus = 'skip-meal';
      else if (student.status === 'skip-meal') nextStatus = 'none';
      
      return { ...student, status: nextStatus };
    }));
  };

  const markAllEatAll = () => {
    setLogs(prev => prev.map(student => ({ ...student, status: 'eat-all' })));
  };

  const getStatusBadge = (status: StatusType) => {
    if (status === 'eat-all') return '✓';
    if (status === 'slow-eater') return '🥄';
    if (status === 'skip-meal') return '😭';
    return null;
  };

  return (
    <S.WidgetContainer>
      <S.HeaderRow>
        <S.Title>📋 Sinh hoạt nhanh · Bữa trưa</S.Title>
        <S.BatchButton onClick={markAllEatAll}>
          🍚 Cả lớp ăn hết suất
        </S.BatchButton>
      </S.HeaderRow>

      <S.SubtitleRow>
        <span>✓ Ăn hết</span>
        <span>🥄 Ăn chậm</span>
        <span>😭 Bỏ bữa</span>
        <span style={{ color: '#C7CFCA' }}>· Chạm avatar để đổi</span>
      </S.SubtitleRow>

      <S.AvatarGrid>
        {logs.map(g => (
          <S.StudentButton key={g.id} onClick={() => cycleStatus(g.id)}>
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
