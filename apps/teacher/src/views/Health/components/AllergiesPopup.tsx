'use client';

import React, { useState } from 'react';
import { X, AlertTriangle, ChevronRight, ArrowLeft } from 'lucide-react';
import * as S from '../styles';
import type { StudentDetailedDomainModel } from '@/config/types/student';
import { getStudentInitials } from '@/utils/string';

interface AllergiesPopupProps {
  onClose: () => void;
  students: StudentDetailedDomainModel[];
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
  return getStudentInitials(name);
}

function formatDate(timestamp: number | null | undefined): string {
  if (!timestamp) return 'Chưa có thông tin';
  const d = new Date(timestamp * 1000);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export const AllergiesPopup: React.FC<AllergiesPopupProps> = ({
  onClose,
  students,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<StudentDetailedDomainModel | null>(null);

  const handleViewStudent = (student: StudentDetailedDomainModel) => {
    setSelectedStudent(student);
  };

  const handleBack = () => {
    setSelectedStudent(null);
  };
  
  return (
    <S.PopupOverlay onClick={onClose}>
      <S.Popup onClick={e => e.stopPropagation()} style={{ maxWidth: 580 }}>
        <S.PopupHeader>
          <S.PopupTitle>
            {selectedStudent ? (
              <>
                <button onClick={handleBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px 4px 0', display: 'flex', alignItems: 'center' }}>
                  <ArrowLeft size={18} color="#374151" />
                </button>
                <AlertTriangle size={20} color="#DC2626" />
                <span>Chi tiết dị ứng: {selectedStudent.fullName}</span>
              </>
            ) : (
              <>
                <AlertTriangle size={20} color="#DC2626" />
                Danh sách học sinh dị ứng
              </>
            )}
          </S.PopupTitle>
          <S.CloseBtn onClick={onClose}>
            <X size={16} />
          </S.CloseBtn>
        </S.PopupHeader>

        <S.PopupBody>
          {!selectedStudent ? (
            // Student List View
            students.length === 0 ? (
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
                    onClick={() => handleViewStudent(student)}
                  >
                    <S.AvatarSmall $grad={getAvatarGrad(student.fullName)} style={{ width: 44, height: 44, fontSize: 16, position: 'relative', overflow: 'hidden' }}>
                      {getInitials(student.fullName)}
                      {student.avatarUrl && (
                        <img 
                          src={student.avatarUrl} 
                          alt="" 
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                          onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
                        />
                      )}
                    </S.AvatarSmall>

                    <S.ListItemContent>
                      <S.ListItemTitle>{student.fullName}</S.ListItemTitle>
                      <S.ListItemMeta>
                        {student.dateOfBirth ? `Sinh nhật: ${formatDate(student.dateOfBirth)}` : 'Chưa có thông tin'}
                      </S.ListItemMeta>
                    </S.ListItemContent>

                    <ChevronRight size={18} color="#9CA3AF" />
                  </S.ListItem>
                ))}
              </>
            )
          ) : (
            // Student Allergy Detail View
            <div>
              <div style={{
                background: '#FEF3C3',
                border: '1px solid #FDE68A',
                borderRadius: 12,
                padding: '14px 16px',
                marginBottom: 16,
              }}>
                <div style={{ fontSize: 13, color: '#92400E', fontWeight: 600, marginBottom: 6 }}>
                  🤧 Dị ứng của {selectedStudent.fullName}:
                </div>
                <div style={{ fontSize: 14, color: '#78350F', lineHeight: 1.6 }}>
                  {selectedStudent.allergies || 'Không có thông tin dị ứng'}
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: '#6B7280', textAlign: 'center' }}>
                Nếu cần cập nhật thông tin dị ứng, vui lòng liên hệ phụ huynh.
              </div>
            </div>
          )}
        </S.PopupBody>
      </S.Popup>
    </S.PopupOverlay>
  );
};
