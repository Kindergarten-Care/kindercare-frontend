'use client';

import React from 'react';
import { X, AlertTriangle, ChevronRight } from 'lucide-react';
import * as S from '../styles';
import type { StudentDetailedDomainModel } from '@/config/types/student';

interface AllergiesPopupProps {
  onClose: () => void;
  students: StudentDetailedDomainModel[];
  onViewStudent: (student: StudentDetailedDomainModel) => void;
  classId: number | string | undefined;
}

const avatarGradients = [
  '#F87171', '#FB923C', '#FBBF24', '#34D399', '#38BDF8', '#818CF8', '#E879F9', '#F472B6',
];

function getAvatarGrad(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarGradients[Math.abs(hash) % avatarGradients.length];
}

function getInitials(name: string) {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export const AllergiesPopup: React.FC<AllergiesPopupProps> = ({
  onClose,
  students,
  onViewStudent,
}) => {
  return (
    <S.PopupOverlay onClick={onClose}>
      <S.Popup onClick={e => e.stopPropagation()}>
        <S.PopupHeader>
          <S.PopupTitle>
            <AlertTriangle size={20} color="#DC2626" />
            Danh sách học sinh dị ứng
          </S.PopupTitle>
          <S.CloseBtn onClick={onClose}>
            <X size={16} />
          </S.CloseBtn>
        </S.PopupHeader>

        <S.PopupBody>
          {students.length === 0 ? (
            <S.EmptyState>
              <AlertTriangle size={36} color="#C7CFCA" />
              <S.EmptyTitle>Không có học sinh dị ứng</S.EmptyTitle>
              <S.EmptyDesc>Tất cả học sinh đều không có thông tin dị ứng.</S.EmptyDesc>
            </S.EmptyState>
          ) : (
            <>
              <div style={{ fontSize: 12.5, color: '#6B7280', fontWeight: 500, marginBottom: 14 }}>
                Nhấn vào học sinh để xem chi tiết dị ứng.
              </div>
              {students.map((student, idx) => (
                <S.ListItem
                  key={student.studentId}
                  $variant="allergy"
                  style={{ animationDelay: `${idx * 50}ms`, cursor: 'pointer' }}
                  onClick={() => onViewStudent(student)}
                >
                  <S.AvatarSmall $grad={getAvatarGrad(student.fullName)} style={{ width: 44, height: 44, fontSize: 16 }}>
                    {student.avatarUrl ? (
                      <img src={student.avatarUrl} alt={student.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      getInitials(student.fullName)
                    )}
                  </S.AvatarSmall>

                  <S.ListItemContent>
                    <S.ListItemTitle>{student.fullName}</S.ListItemTitle>
                    <S.ListItemMeta>
                      {student.dateOfBirth ? `Sinh nhật: ${student.dateOfBirth}` : 'Chưa có thông tin'}
                    </S.ListItemMeta>
                  </S.ListItemContent>

                  <ChevronRight size={18} color="#9CA3AF" />
                </S.ListItem>
              ))}
            </>
          )}
        </S.PopupBody>
      </S.Popup>
    </S.PopupOverlay>
  );
};
