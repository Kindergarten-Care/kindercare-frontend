import React from 'react';
import styled from 'styled-components';
import { PhotoAttendance } from './PhotoAttendance';
import { X } from 'lucide-react';
import { Student } from '@/config/types/attendance';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  width: 100%;
  max-width: 600px;
  height: 90vh;
  border-radius: 16px;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0,0,0,0.1);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  color: #333;
  &:hover { background: rgba(0,0,0,0.2); }
`;

interface PhotoAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  students: Student[];
  classId: string;
  className: string;
}

export const PhotoAttendanceModal: React.FC<PhotoAttendanceModalProps> = ({ 
  isOpen, onClose, onSuccess, students, classId, className 
}) => {
  if (!isOpen) return null;
  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseBtn onClick={onClose}><X size={18} /></CloseBtn>
        <PhotoAttendance 
          onSuccess={onSuccess} 
          onCloseModal={onClose}
          students={students}
          classId={classId}
          className={className}
        />
      </ModalContent>
    </Overlay>
  );
};
