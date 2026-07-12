import styled, { keyframes } from 'styled-components';

const cardIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const popIn = keyframes`
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
`;

const modalIn = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: inherit;
  color: #1F2937;
`;

export const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: linear-gradient(120deg, #065F46 0%, #047857 60%, #059669 100%);
  box-shadow: 0 18px 44px -18px rgba(6, 95, 70, 0.4);
  padding: 28px 32px;
`;

export const HeroBgOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(400px 250px at 90% 120%, rgba(255, 255, 255, 0.15), transparent 60%);
`;

export const HeroContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

export const HeroText = styled.div`
  min-width: 240px;
`;

export const HeroSubtitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #A7F3D0;
  text-transform: uppercase;
`;

export const HeroTitle = styled.h1`
  margin: 6px 0 0;
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  letter-spacing: -0.02em;
`;

export const HeroDesc = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  color: #ECFDF5;
  max-width: 500px;
  line-height: 1.45;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
`;

export const Card = styled.div`
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -8px rgba(0, 90, 54, 0.08);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: ${cardIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px -10px rgba(6, 95, 70, 0.15);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dashed #E5E7EB;
  padding-bottom: 10px;
`;

export const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const StudentName = styled.span`
  font-weight: 800;
  font-size: 15px;
  color: #111827;
`;

export const ParentName = styled.span`
  font-size: 12px;
  color: #6B7280;
`;

export const Badge = styled.span`
  font-size: 11px;
  font-weight: 700;
  background: #FEF3C7;
  color: #D97706;
  padding: 4px 10px;
  border-radius: 999px;
`;

export const CardBody = styled.div`
  display: flex;
  gap: 12px;
`;

export const AvatarBox = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 10px;
  overflow: hidden;
  background: #F3F4F6;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProxyDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  justify-content: center;
`;

export const ProxyName = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #1F2937;
`;

export const ProxyMeta = styled.div`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const NotesText = styled.div`
  font-size: 12.5px;
  color: #4B5563;
  line-height: 1.4;
  background: #F9FAFB;
  padding: 8px 12px;
  border-radius: 8px;
  border-left: 2.5px solid #059669;
`;

export const ActionBtn = styled.button`
  width: 100%;
  height: 38px;
  border-radius: 10px;
  border: 1px solid #059669;
  background: #fff;
  color: #059669;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #E6F3ED;
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9400;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${popIn} 0.2s ease;
`;

export const ModalBox = styled.div`
  width: min(480px, 100%);
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${modalIn} 0.24s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ModalTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #111827;
`;

export const CloseBtn = styled.button`
  border: none;
  background: none;
  color: #9CA3AF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #DC2626;
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LargePhoto = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

export const MetaField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Value = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: #1F2937;
`;

export const ModalFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #F3F4F6;
  display: flex;
  gap: 10px;
  background: #F9FAFB;
`;

export const RejectBtn = styled.button`
  flex: 1;
  height: 42px;
  border-radius: 10px;
  border: 1px solid #FCA5A5;
  background: #fff;
  color: #DC2626;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #FEF2F2;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ApproveBtn = styled.button`
  flex: 1;
  height: 42px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #059669, #047857);
  color: #fff;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
  transition: all 0.15s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(5, 150, 105, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  border: 1.5px dashed #D1D5DB;
  border-radius: 20px;
  background: #F9FAFB;
  color: #6B7280;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const TabRow = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #EEF2F0;
  padding-bottom: 2px;
  margin-bottom: 10px;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  background: none;
  border: none;
  border-bottom: 2px solid ${({ $active }) => ($active ? '#059669' : 'transparent')};
  color: ${({ $active }) => ($active ? '#059669' : '#6B7280')};
  margin-bottom: -4px;
  transition: all 0.15s;

  &:hover {
    color: #059669;
  }
`;

export const TabBadge = styled.span<{ $active?: boolean }>`
  font-size: 11px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? '#059669' : '#E5E7EB')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#4B5563')};
`;

export const HistoryStatusBadge = styled.span<{ $status: 'Approved' | 'Rejected' }>`
  font-size: 11.5px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ $status }) => ($status === 'Approved' ? '#D1FAE5' : '#FEE2E2')};
  color: ${({ $status }) => ($status === 'Approved' ? '#065F46' : '#991B1B')};
`;

