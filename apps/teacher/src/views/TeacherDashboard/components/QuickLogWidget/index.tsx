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

const INITIAL_LOGS: StudentLog[] = [
  { id: 'g0', name: 'Minh Khôi', initial: 'K', color: '#FCA5A5', status: 'none' },
  { id: 'g1', name: 'Khánh Linh', initial: 'L', color: '#FCD34D', status: 'none' },
  { id: 'g2', name: 'An Nhiên', initial: 'N', color: '#6EE7B7', status: 'none' },
  { id: 'g3', name: 'Gia Huy', initial: 'H', color: '#93C5FD', status: 'none' },
  { id: 'g4', name: 'Bảo Trâm', initial: 'T', color: '#C4B5FD', status: 'none' },
  { id: 'g5', name: 'Hoàng Long', initial: 'L', color: '#F9A8D4', status: 'none' },
  { id: 'g6', name: 'Ngọc Diệp', initial: 'D', color: '#FDBA74', status: 'none' },
  { id: 'g7', name: 'Tường Vy', initial: 'V', color: '#67E8F9', status: 'none' },
  { id: 'g8', name: 'Đăng Khoa', initial: 'K', color: '#A5B4FC', status: 'none' },
  { id: 'g9', name: 'Mỹ Anh', initial: 'A', color: '#5EEAD4', status: 'none' },
  { id: 'g10', name: 'Quốc Bảo', initial: 'B', color: '#FCA5A5', status: 'none' },
  { id: 'g11', name: 'Hà My', initial: 'M', color: '#FCD34D', status: 'none' },
  { id: 'g12', name: 'Nhật Nam', initial: 'N', color: '#6EE7B7', status: 'none' },
  { id: 'g13', name: 'Yến Nhi', initial: 'N', color: '#93C5FD', status: 'none' },
  { id: 'g14', name: 'Trí Dũng', initial: 'D', color: '#C4B5FD', status: 'none' },
  { id: 'g15', name: 'Khánh Vân', initial: 'V', color: '#F9A8D4', status: 'none' },
];

export const QuickLogWidget: React.FC = () => {
  const [logs, setLogs] = useState<StudentLog[]>(INITIAL_LOGS);

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
