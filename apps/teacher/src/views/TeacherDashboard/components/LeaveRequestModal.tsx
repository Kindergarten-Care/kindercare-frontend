import React from 'react';
import styled, { keyframes } from 'styled-components';
import { X, Calendar, User, Phone, CheckCircle, XCircle, FileText, Image as ImageIcon } from 'lucide-react';

interface LeaveRequestDetails {
  id: string;
  studentName: string;
  parentName: string;
  parentPhone?: string;
  reason: string;
  fromDate: string;
  toDate: string;
  parentNotes?: string;
  attachmentUrl?: string;
  avatarUrl?: string;
}

interface LeaveRequestModalProps {
  isOpen: boolean;
  data: LeaveRequestDetails | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
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
  max-width: 480px;
  border-radius: 24px;
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.18);
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
  border-bottom: 1px solid #E6EEE9;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #1F2937;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 50%;
  transition: all 0.15s;

  &:hover {
    background: #F3F4F6;
    color: #1F2937;
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
  background: #F8FAFC;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
`;

const Avatar = styled.div<{ $imgUrl?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${props => props.$imgUrl ? `url(${props.$imgUrl}) center/cover no-repeat` : '#E0E7FF'};
  color: ${props => props.$imgUrl ? 'transparent' : '#4338CA'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
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

const StClass = styled.div`
  font-size: 13px;
  color: #64748B;
  font-weight: 500;
  margin-top: 2px;
`;

const FieldRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.div`
  font-size: 12.5px;
  font-weight: 600;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ValueBox = styled.div`
  font-size: 14.5px;
  color: #1F2937;
  font-weight: 600;
  padding: 12px 16px;
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 12px;
`;

const ReasonBox = styled(ValueBox)`
  background: #FEF3C7;
  border-color: #FDE68A;
  color: #92400E;
`;

const ImagePreview = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  margin-top: 8px;
`;

const Footer = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E6EEE9;
  background: #F8FAF8;
`;

const ActionBtn = styled.button<{ $type: 'reject' | 'approve' }>`
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
  transition: transform 0.15s, box-shadow 0.15s;

  background: ${props => props.$type === 'approve' ? '#005A36' : '#fff'};
  color: ${props => props.$type === 'approve' ? '#fff' : '#DC2626'};
  border: ${props => props.$type === 'approve' ? 'none' : '1px solid #FECACA'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.$type === 'approve' ? '0 8px 20px -8px rgba(0,90,54,0.4)' : '0 8px 20px -8px rgba(220,38,38,0.2)'};
  }
`;

export const LeaveRequestModal: React.FC<LeaveRequestModalProps> = ({ isOpen, data, onClose, onApprove, onReject }) => {
  if (!isOpen || !data) return null;

  const initial = data.studentName.split(' ').pop()?.charAt(0).toUpperCase() || '?';

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <Header>
          <Title>
            <FileText size={20} color="#4338CA" />
            Chi tiết Đơn xin phép
          </Title>
          <CloseBtn onClick={onClose}>
            <X size={22} strokeWidth={2.5} />
          </CloseBtn>
        </Header>
        
        <Content>
          <StudentInfoCard>
            <Avatar $imgUrl={data.avatarUrl}>{!data.avatarUrl && initial}</Avatar>
            <InfoCol>
              <StName>{data.studentName}</StName>
              <StClass>
                Phụ huynh: {data.parentName}
                {data.parentPhone && ` • 📞 ${data.parentPhone}`}
              </StClass>
            </InfoCol>
          </StudentInfoCard>

          <FieldRow>
            <Label><Calendar size={15} /> Thời gian nghỉ</Label>
            <ValueBox>
              Từ <strong>{data.fromDate}</strong> đến <strong>{data.toDate}</strong>
            </ValueBox>
          </FieldRow>

          <FieldRow>
            <Label><User size={15} /> Lý do / Lời nhắn</Label>
            <ReasonBox>
              "{data.reason || 'Việc gia đình'}"
              {data.parentNotes && (
                <div style={{ marginTop: '8px', fontSize: '13px', opacity: 0.8, fontWeight: 500 }}>
                  Ghi chú: {data.parentNotes}
                </div>
              )}
            </ReasonBox>
          </FieldRow>

          {data.attachmentUrl && (
            <FieldRow>
              <Label><ImageIcon size={15} /> Ảnh minh chứng</Label>
              <ImagePreview src={data.attachmentUrl} alt="Minh chứng xin nghỉ" />
            </FieldRow>
          )}
        </Content>

        <Footer>
          <ActionBtn $type="reject" onClick={() => { onReject(data.id); onClose(); }}>
            <XCircle size={18} />
            Từ chối
          </ActionBtn>
          <ActionBtn $type="approve" onClick={() => { onApprove(data.id); onClose(); }}>
            <CheckCircle size={18} />
            Duyệt đơn
          </ActionBtn>
        </Footer>
      </ModalBox>
    </Overlay>
  );
};
