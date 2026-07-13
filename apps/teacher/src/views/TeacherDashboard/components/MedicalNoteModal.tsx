import React from 'react';
import styled, { keyframes } from 'styled-components';
import { X, Pill, Clock, AlertTriangle, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { getStudentInitials } from '@/utils/string';

interface MedicalNoteDetails {
  id: string;
  studentName: string;
  medicineName: string;
  dosage: string;
  timeToTake: string;
  parentNotes?: string;
  imageUrl?: string;
  avatarUrl?: string;
}

export interface MedicalNoteModalProps {
  isOpen: boolean;
  data: MedicalNoteDetails | null;
  onClose: () => void;
  onMarkDone: (id: string) => void;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const popUp = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.2s ease;
`;

const ModalBox = styled.div`
  background: #ffffff;
  width: 90%;
  max-width: 440px;
  border-radius: 24px;
  box-shadow: 0 24px 48px -12px rgba(220, 38, 38, 0.15);
  overflow: hidden;
  animation: ${popUp} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: #FEF2F2;
  border-bottom: 1px solid #FEE2E2;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #991B1B;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #F87171;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 50%;
  transition: all 0.15s;

  &:hover {
    background: #FEE2E2;
    color: #DC2626;
  }
`;

const Content = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StudentInfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: #fff;
  border-radius: 16px;
  border: 1px dashed #FCA5A5;
`;

const Avatar = styled.div`
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #FEE2E2;
  color: #DC2626;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  overflow: hidden;
`;

const AvatarImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const StName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1F2937;
`;

const FieldRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.div`
  font-size: 12.5px;
  font-weight: 600;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MedicineCard = styled.div`
  display: flex;
  flex-direction: column;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  padding: 16px;
  gap: 12px;
`;

const MedTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #1F2937;
`;

const MedDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #F3F4F6;
`;

const MedDetailCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MedLabel = styled.span`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 600;
  text-transform: uppercase;
`;

const MedValue = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #111827;
`;

const NoteBox = styled.div`
  background: #FEF2F2;
  border-left: 4px solid #F87171;
  padding: 12px 16px;
  font-size: 13.5px;
  color: #991B1B;
  font-weight: 500;
  line-height: 1.5;
  border-radius: 0 8px 8px 0;
`;

const ImagePreview = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px dashed #FCA5A5;
  margin-top: 8px;
`;

const Footer = styled.div`
  display: flex;
  padding: 16px 24px;
  border-top: 1px solid #F3F4F6;
  background: #fff;
`;

const ActionBtn = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 48px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 14.5px;
  cursor: pointer;
  border: none;
  background: #DC2626;
  color: #fff;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -8px rgba(220, 38, 38, 0.4);
    background: #B91C1C;
  }
`;

export const MedicalNoteModal: React.FC<MedicalNoteModalProps> = ({ isOpen, data, onClose, onMarkDone }) => {
  if (!isOpen || !data) return null;

  const initial = getStudentInitials(data.studentName);

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <Header>
          <Title>
            <AlertTriangle size={20} />
            Lưu ý Y tế
          </Title>
          <CloseBtn onClick={onClose}>
            <X size={22} strokeWidth={2.5} />
          </CloseBtn>
        </Header>
        
        <Content>
          <StudentInfoCard>
            <Avatar>
              {initial}
              {data.avatarUrl && (
                <AvatarImg 
                  src={data.avatarUrl} 
                  alt="" 
                  onError={(e: any) => { e.currentTarget.style.display = 'none'; }} 
                />
              )}
            </Avatar>
            <InfoCol>
              <StName>{data.studentName}</StName>
            </InfoCol>
          </StudentInfoCard>

          <FieldRow>
            <Label><Pill size={15} /> Thông tin Thuốc</Label>
            <MedicineCard>
              <MedTitle>{data.medicineName}</MedTitle>
              <MedDetails>
                <MedDetailCol>
                  <MedLabel>Liều lượng</MedLabel>
                  <MedValue>{data.dosage}</MedValue>
                </MedDetailCol>
                <MedDetailCol style={{ alignItems: 'flex-end' }}>
                  <MedLabel>Thời gian</MedLabel>
                  <MedValue style={{ color: '#DC2626' }}>
                    <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />
                    {data.timeToTake}
                  </MedValue>
                </MedDetailCol>
              </MedDetails>
            </MedicineCard>
          </FieldRow>

          {data.parentNotes && (
            <FieldRow>
              <Label>Lời dặn của phụ huynh</Label>
              <NoteBox>
                "{data.parentNotes}"
              </NoteBox>
            </FieldRow>
          )}

          {data.imageUrl && (
            <FieldRow>
              <Label><ImageIcon size={15} /> Ảnh toa thuốc / Minh chứng</Label>
              <ImagePreview src={data.imageUrl} alt="Minh chứng y tế" />
            </FieldRow>
          )}
        </Content>

        <Footer>
          <ActionBtn onClick={() => { onMarkDone(data.id); onClose(); }}>
            <CheckCircle2 size={18} />
            Đã cho uống thuốc
          </ActionBtn>
        </Footer>
      </ModalBox>
    </Overlay>
  );
};
