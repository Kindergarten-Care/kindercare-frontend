'use client';

import React, { useState } from 'react';
import * as S from './styles';
import { Student } from '@/config/types/attendance';

interface GoodBehaviorWidgetProps {
  students: Student[];
}

export const GoodBehaviorWidget: React.FC<GoodBehaviorWidgetProps> = ({ students }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [evaluatedCount, setEvaluatedCount] = useState(0);

  // Fake states for checkboxes: { [studentId]: { criteria1: boolean, criteria2: boolean... } }
  const [evaluations, setEvaluations] = useState<Record<string, Record<string, boolean>>>({});

  const totalStudents = students.length || 20;
  const percent = totalStudents === 0 ? 0 : Math.round((evaluatedCount / totalStudents) * 100);

  const handleToggle = (studentId: string, criteria: string) => {
    setEvaluations(prev => {
      const studentEval = prev[studentId] || {
        attendance: true,
        eating: true,
        sleeping: true,
        obedience: true,
      };
      return {
        ...prev,
        [studentId]: {
          ...studentEval,
          [criteria]: !studentEval[criteria]
        }
      };
    });
  };

  const handleSave = () => {
    // Just a mock save
    setEvaluatedCount(Object.keys(evaluations).length || totalStudents);
    setIsModalOpen(false);
    // Ideally we would trigger a toast here
  };

  const getStudentEval = (studentId: string) => {
    return evaluations[studentId] || {
      attendance: true,
      eating: true,
      sleeping: true,
      obedience: true,
    };
  };

  const colors = ['#FCA5A5', '#FCD34D', '#6EE7B7', '#93C5FD', '#C4B5FD', '#F9A8D4'];
  const getAvatarColor = (name: string) => {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return colors[h % colors.length];
  };

  const displayStudents = students.length > 0 ? students : Array.from({ length: 5 }).map((_, i) => ({
    id: `fake-${i}`,
    name: `Bé Mẫu ${i + 1}`,
  } as Student));

  return (
    <>
      <S.WidgetContainer>
        <S.WidgetHeader>
          <S.HeaderLeft>
            <S.IconContainer>🌸</S.IconContainer>
            <S.TitleBox>
              <S.WidgetTitle>Phiếu bé ngoan</S.WidgetTitle>
              <S.WidgetSubtitle>Đánh giá hôm nay</S.WidgetSubtitle>
            </S.TitleBox>
          </S.HeaderLeft>
        </S.WidgetHeader>

        <S.ProgressSection>
          <S.ProgressCircle $percent={percent}>
            <S.ProgressContent>
              <S.ProgressValue>{percent}%</S.ProgressValue>
              <S.ProgressLabel>Hoàn thành</S.ProgressLabel>
            </S.ProgressContent>
          </S.ProgressCircle>
          
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
            Đã đánh giá: <strong style={{ color: '#BE185D' }}>{evaluatedCount}/{totalStudents}</strong> bé
          </div>
        </S.ProgressSection>

        <S.ActionButton onClick={() => setIsModalOpen(true)}>
          Đánh giá ngay
        </S.ActionButton>
      </S.WidgetContainer>

      {isModalOpen && (
        <S.ModalOverlay onClick={() => setIsModalOpen(false)}>
          <S.ModalContent onClick={e => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitleInfo>
                <S.ModalTitle>Đánh giá Phiếu bé ngoan</S.ModalTitle>
                <S.ModalSubtitle>Hôm nay, {new Date().toLocaleDateString('vi-VN')}</S.ModalSubtitle>
              </S.ModalTitleInfo>
              <S.CloseButton onClick={() => setIsModalOpen(false)}>✕</S.CloseButton>
            </S.ModalHeader>

            <S.ModalBody>
              <S.Table>
                <thead>
                  <tr>
                    <S.Th>Học sinh</S.Th>
                    <S.Th title="Đi học chuyên cần">🏃‍♂️ Chuyên cần</S.Th>
                    <S.Th title="Ăn hết suất">🍲 Ăn ngoan</S.Th>
                    <S.Th title="Ngủ đúng giờ, không quấy">😴 Ngủ ngoan</S.Th>
                    <S.Th title="Vâng lời cô giáo">🌟 Vâng lời</S.Th>
                  </tr>
                </thead>
                <tbody>
                  {displayStudents.map(s => {
                    const stEval = getStudentEval(s.id);
                    const initial = s.name.trim().split(' ').pop()?.charAt(0).toUpperCase() || 'B';
                    return (
                      <tr key={s.id}>
                        <S.Td>
                          <S.StudentInfo>
                            <S.Avatar $bg={getAvatarColor(s.name)}>{initial}</S.Avatar>
                            {s.name}
                          </S.StudentInfo>
                        </S.Td>
                        <S.Td>
                          <S.CheckboxLabel>
                            <S.CheckboxInput 
                              type="checkbox" 
                              checked={stEval.attendance} 
                              onChange={() => handleToggle(s.id, 'attendance')} 
                            />
                          </S.CheckboxLabel>
                        </S.Td>
                        <S.Td>
                          <S.CheckboxLabel>
                            <S.CheckboxInput 
                              type="checkbox" 
                              checked={stEval.eating} 
                              onChange={() => handleToggle(s.id, 'eating')} 
                            />
                          </S.CheckboxLabel>
                        </S.Td>
                        <S.Td>
                          <S.CheckboxLabel>
                            <S.CheckboxInput 
                              type="checkbox" 
                              checked={stEval.sleeping} 
                              onChange={() => handleToggle(s.id, 'sleeping')} 
                            />
                          </S.CheckboxLabel>
                        </S.Td>
                        <S.Td>
                          <S.CheckboxLabel>
                            <S.CheckboxInput 
                              type="checkbox" 
                              checked={stEval.obedience} 
                              onChange={() => handleToggle(s.id, 'obedience')} 
                            />
                          </S.CheckboxLabel>
                        </S.Td>
                      </tr>
                    );
                  })}
                </tbody>
              </S.Table>
            </S.ModalBody>

            <S.ModalFooter>
              <S.CancelButton onClick={() => setIsModalOpen(false)}>Hủy</S.CancelButton>
              <S.SaveButton onClick={handleSave}>Lưu đánh giá</S.SaveButton>
            </S.ModalFooter>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </>
  );
};
