'use client';

import React from 'react';
import { getInitials, getAvatarGradient } from '@/utils/Student/Avatar';
import { IconClose, IconCheck, IconPlus } from '@/assets/icons/dashboard';
import * as S from './styles';

interface ChildSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  kids: any[];
  activeStudent: any;
  setActiveStudent: (student: any) => void;
}

const ChildSelectorModal: React.FC<ChildSelectorModalProps> = ({
  isOpen,
  onClose,
  kids,
  activeStudent,
  setActiveStudent
}) => {
  if (!isOpen) return null;

  return (
    <S.CSModalOverlay onClick={onClose}>
      <S.CSModalContainer onClick={(e) => e.stopPropagation()}>
        <S.CSModalHeader>
          <S.CSModalTitle>Chọn hồ sơ bé</S.CSModalTitle>
          <S.CSModalClose onClick={onClose} aria-label="Đóng">
            <IconClose size={14} />
          </S.CSModalClose>
        </S.CSModalHeader>

        <S.CSModalList>
          {kids.map((child) => {
            const isSelected = child.studentId === activeStudent?.studentId;
            const grad = getAvatarGradient(child.studentId);
            const init = getInitials(child.fullName);

            return (
              <S.CSOption
                key={child.studentId}
                $active={isSelected}
                onClick={() => {
                  setActiveStudent(child);
                  onClose();
                }}
              >
                <S.CSAv $gradient={grad} style={{ width: 34, height: 34, fontSize: 12 }}>
                  {child.avatarUrl ? (
                    <img
                      src={child.avatarUrl}
                      alt={child.fullName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                    />
                  ) : (
                    init
                  )}
                </S.CSAv>
                <div>
                  <S.CSOptName>{child.fullName}</S.CSOptName>
                  <S.CSOptClass>{child.className}</S.CSOptClass>
                </div>
                {isSelected && (
                  <S.CSCheck>
                    <IconCheck size={14} color="#005A36" />
                  </S.CSCheck>
                )}
              </S.CSOption>
            );
          })}
        </S.CSModalList>

        <S.CSAdd style={{ borderTop: '1px solid var(--border-soft)', marginTop: 4, paddingTop: 10 }}>
          <IconPlus size={14} /> Thêm hồ sơ bé
        </S.CSAdd>
      </S.CSModalContainer>
    </S.CSModalOverlay>
  );
};

export default ChildSelectorModal;
