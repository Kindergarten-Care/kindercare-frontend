'use client';

import React from 'react';
import { getInitials, getAvatarGradient } from '@/utils/Student/Avatar';
import { IconCheck, IconPlus } from '@/assets/icons/dashboard';
import * as S from './styles';

interface ChildSelectorDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  kids: any[];
  activeStudent: any;
  setActiveStudent: (student: any) => void;
  collapsed: boolean;
}

const ChildSelectorDropdown: React.FC<ChildSelectorDropdownProps> = ({
  isOpen,
  onClose,
  kids,
  activeStudent,
  setActiveStudent,
  collapsed
}) => {
  if (!isOpen) return null;

  return (
    <S.CSMenu $collapsed={collapsed}>
      <S.CSMenuH>Chọn hồ sơ bé</S.CSMenuH>
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
      <S.CSAdd onClick={onClose}>
        <IconPlus size={14} /> Thêm hồ sơ bé
      </S.CSAdd>
    </S.CSMenu>
  );
};

export default ChildSelectorDropdown;
