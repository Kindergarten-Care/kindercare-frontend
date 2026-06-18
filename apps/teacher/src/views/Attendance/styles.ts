'use client';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const backdropFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const modalSlideUp = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(30px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

export const AttendancePageContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const HeaderActionsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const DateHeader = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #374151;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  border-radius: 999px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 6px rgba(16, 24, 40, 0.03);

  &:hover {
    background: #F9FAFB;
    border-color: #D1D5DB;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(16, 24, 40, 0.05);
  }

  svg {
    color: #10B981;
  }
`;

export const ActionsGroup = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div<{ $borderType?: 'green' | 'amber' | 'neutral' }>`
  background: #ffffff;
  border-radius: 24px;
  padding: 24px;
  border: 1px solid rgba(16, 24, 40, 0.04);
  box-shadow: 0 4px 20px rgba(16, 24, 40, 0.04);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${props => {
      if (props.$borderType === 'green') return 'linear-gradient(90deg, #10B981, #059669)';
      if (props.$borderType === 'amber') return 'linear-gradient(90deg, #F59E0B, #D97706)';
      return 'linear-gradient(90deg, #9CA3AF, #6B7280)';
    }};
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(16, 24, 40, 0.08);
    border-color: rgba(16, 24, 40, 0.08);
  }
`;

export const StatLabel = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const StatValue = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 36px;
  font-weight: 800;
  color: #1F2937;
  line-height: 1;
  letter-spacing: -0.02em;
`;

export const StatSub = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`;

export const FilterBar = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 16px 24px;
  box-shadow: 0 4px 20px rgba(16, 24, 40, 0.04);
  border: 1px solid rgba(16, 24, 40, 0.03);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  max-width: 360px;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 100%;
  }

  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.muted};
  }
`;

export const SearchField = styled.input`
  width: 100%;
  padding: 12px 16px 12px 46px;
  font-size: 14px;
  border-radius: 999px;
  border: 1.5px solid #E3F0E8;
  outline: none;
  background: #F0F5EC;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  color: #374151;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    border-color: #10B981;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
  }
`;

export const FilterDropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Montserrat', sans-serif;
`;

export const CustomSelect = styled.select`
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 999px;
  border: 1px solid #E3F0E8;
  outline: none;
  background: #F7FBF8;
  color: #374151;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  transition: all 0.2s ease;

  &:hover {
    background: #ECFDF5;
    border-color: #A7F3D0;
  }

  &:focus {
    border-color: #10B981;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
  }
`;

export const GridContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.soft};
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.border};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const TableHead = styled.thead`
  background: ${props => props.theme.colors.bg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const Th = styled.th`
  padding: 18px 24px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${props => props.theme.colors.muted};
`;

export const TBody = styled.tbody`
  tr:last-child {
    border-bottom: none;
  }
`;

export const Tr = styled.tr`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.bg};
  }
`;

export const Td = styled.td`
  padding: 16px 24px;
  font-size: 0.875rem;
  vertical-align: middle;
`;

export const StudentProfileCell = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StudentAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  background: ${props => props.theme.colors.bg};
  border: 1px solid ${props => props.theme.colors.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StudentMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StudentName = styled.span`
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
  font-size: 0.9375rem;
`;

export const StudentIdBadge = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.muted};
  font-weight: 600;
`;

export const StatusButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const StatusToggleBtn = styled.button<{ $active: boolean; $type: 'present' | 'permission' | 'unexcused' }>`
  padding: 8px 16px;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: ${props => props.theme.radius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.muted};

  ${props => props.$active && props.$type === 'present' && `
    background: ${props.theme.colors.greenLight};
    border-color: ${props.theme.colors.greenMid};
    color: ${props.theme.colors.greenDark};
  `}

  ${props => props.$active && props.$type === 'permission' && `
    background: ${props.theme.colors.amberLight};
    border-color: ${props.theme.colors.amberMid};
    color: ${props.theme.colors.amber};
  `}

  ${props => props.$active && props.$type === 'unexcused' && `
    background: #fef2f2;
    border-color: #f87171;
    color: #b91c1c;
  `}

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.soft};
  }
`;

export const TimeInput = styled.input`
  width: 90px;
  padding: 8px 12px;
  font-size: 0.875rem;
  border-radius: ${props => props.theme.radius.sm};
  border: 1px solid ${props => props.theme.colors.border};
  outline: none;
  background: ${props => props.theme.colors.bg};
  text-align: center;
  font-weight: 600;
  color: ${props => props.theme.colors.fg};

  &:focus {
    border-color: ${props => props.theme.colors.greenMid};
    background: ${props => props.theme.colors.surface};
  }
`;

export const NoteInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 0.875rem;
  border-radius: ${props => props.theme.radius.sm};
  border: 1px solid ${props => props.theme.colors.border};
  outline: none;
  background: ${props => props.theme.colors.bg};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${props => props.theme.colors.greenMid};
    background: ${props => props.theme.colors.surface};
  }
`;

export const LeaveRequestBadge = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${props => props.theme.colors.amber};
  background: ${props => props.theme.colors.amberLight};
  border: 1px dashed ${props => props.theme.colors.amberMid};
  border-radius: ${props => props.theme.radius.sm};
  cursor: pointer;
  margin-top: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.amberMid};
    color: white;
  }
`;

export const QuickFillBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 14px;
  background: #F7FBF8;
  color: #374151;
  border: 1px solid #E3F0E8;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: #ECFDF5;
    border-color: #A7F3D0;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.06);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const LeaveRequestsBtn = styled.button`
  display: flex;
  align-items: center;
  position: relative;
  gap: 8px;
  padding: 11px 20px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 14px;
  background: #FEF3C7;
  color: #D97706;
  border: 1px solid #FCD34D;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: #FDE68A;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.08);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const LeaveRequestsBadgeCount = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background: #EF4444;
  color: white;
  border-radius: 999px;
  padding: 3px 7px;
  font-size: 10px;
  font-weight: 800;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;

export const SaveBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  font-size: 13px;
  font-weight: 800;
  border-radius: 14px;
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.2);

  &:hover {
    background: linear-gradient(135deg, #059669, #047857);
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(16, 185, 129, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

// Modal Styles
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(8px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${backdropFadeIn} 0.3s ease-out;
  padding: 20px;
`;

export const ModalCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.xl};
  max-width: 560px;
  width: 100%;
  box-shadow: ${props => props.theme.shadows.lg};
  animation: ${modalSlideUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
  margin: 0;
`;

export const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.muted};
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.fg};
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 70vh;
  overflow-y: auto;
`;

export const ModalFooter = styled.div`
  padding: 20px 24px;
  border-top: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.bg};
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

// Specific UI Details in Leave Modal
export const LeaveDetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const DetailLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${props => props.theme.colors.muted};
`;

export const DetailText = styled.p`
  font-size: 0.9375rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.fg};
  margin: 0;
  background: ${props => props.theme.colors.bg};
  padding: 16px;
  border-radius: ${props => props.theme.radius.md};
  border: 1px solid ${props => props.theme.colors.border};
  white-space: pre-wrap;
`;

export const AttachmentPreview = styled.div`
  width: 100%;
  height: 200px;
  border-radius: ${props => props.theme.radius.md};
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.border};
  position: relative;
  background: ${props => props.theme.colors.bg};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const RejectBtn = styled.button`
  padding: 10px 20px;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: ${props => props.theme.radius.md};
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fee2e2;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #fee2e2;
  }
`;

export const ApproveBtn = styled.button`
  padding: 10px 20px;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: ${props => props.theme.radius.md};
  background: ${props => props.theme.colors.greenMid};
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.green};
  }
`;

export const CancelBtn = styled.button`
  padding: 10px 20px;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: ${props => props.theme.radius.md};
  background: white;
  color: ${props => props.theme.colors.fg};
  border: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.bg};
  }
`;

export const ViewModeToggleContainer = styled.div`
  display: flex;
  background: #F0F5EC;
  padding: 4px;
  border-radius: 16px;
  border: 1px solid #E3F0E8;
`;

export const ViewModeBtn = styled.button<{ $active: boolean }>`
  padding: 8px 18px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 800;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  background: ${props => props.$active ? '#FFFFFF' : 'transparent'};
  color: ${props => props.$active ? '#10B981' : '#9CA3AF'};
  box-shadow: ${props => props.$active ? '0 4px 12px rgba(16, 185, 129, 0.08)' : 'none'};

  &:hover {
    color: ${props => props.$active ? '#10B981' : '#374151'};
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 12px;
  border-bottom: 2px solid #E3F0E8;
  padding-bottom: 12px;
  margin-top: 20px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabButton = styled.button<{ $active: boolean; $type: 'all' | 'present' | 'permission' | 'unexcused' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 800;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid transparent;
  background: transparent;
  color: #9CA3AF;
  position: relative;

  ${props => props.$active && props.$type === 'all' && `
    background: #F3F4F6;
    border-color: #E5E7EB;
    color: #1F2937;
  `}

  ${props => props.$active && props.$type === 'present' && `
    background: #ECFDF5;
    border-color: #A7F3D0;
    color: #065F46;
  `}

  ${props => props.$active && props.$type === 'permission' && `
    background: #FEF3C7;
    border-color: #FCD34D;
    color: #92400E;
  `}

  ${props => props.$active && props.$type === 'unexcused' && `
    background: #FEE2E2;
    border-color: #FCA5A5;
    color: #991B1B;
  `}

  &:hover {
    background: ${props => !props.$active ? '#F3F4F6' : ''};
  }
`;

export const TabBadge = styled.span<{ $active: boolean; $type: 'all' | 'present' | 'permission' | 'unexcused' }>`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 999px;

  background: ${props => {
    if (props.$type === 'present') return props.$active ? '#10B981' : 'rgba(16, 185, 129, 0.12)';
    if (props.$type === 'permission') return props.$active ? '#F59E0B' : 'rgba(245, 158, 11, 0.12)';
    if (props.$type === 'unexcused') return props.$active ? '#EF4444' : 'rgba(239, 68, 68, 0.12)';
    return props.$active ? '#9CA3AF' : '#E5E7EB';
  }};

  color: ${props => {
    if (props.$type === 'present') return props.$active ? '#FFFFFF' : '#047857';
    if (props.$type === 'permission') return props.$active ? '#FFFFFF' : '#B45309';
    if (props.$type === 'unexcused') return props.$active ? '#FFFFFF' : '#B91C1C';
    return props.$active ? '#FFFFFF' : '#374151';
  }};
`;

export const TrackerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const TrackerCard = styled.div<{ $status: 'PRESENT' | 'PERMISSION_ABSENCE' | 'UNEXCUSED_ABSENCE' }>`
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid ${props => {
    if (props.$status === 'PRESENT') return 'rgba(16, 185, 129, 0.14)';
    if (props.$status === 'PERMISSION_ABSENCE') return 'rgba(245, 158, 11, 0.14)';
    return 'rgba(239, 68, 68, 0.14)';
  }};
  box-shadow: 0 4px 20px rgba(16, 24, 40, 0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(16, 24, 40, 0.08);
    border-color: ${props => {
      if (props.$status === 'PRESENT') return 'rgba(16, 185, 129, 0.3)';
      if (props.$status === 'PERMISSION_ABSENCE') return 'rgba(245, 158, 11, 0.3)';
      return 'rgba(239, 68, 68, 0.3)';
    }};
  }
`;

export const TrackerCardHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FAFBFA;
`;

export const TrackerCardBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

export const TrackerCardFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #F3F4F6;
  display: flex;
  justify-content: flex-end;
  background: #FAFBFA;
`;

export const TrackerInfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TrackerInfoLabel = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #9CA3AF;
  letter-spacing: 0.05em;
`;

export const TrackerInfoValue = styled.div<{ $highlight?: 'green' | 'amber' | 'red' }>`
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: ${props => {
    if (props.$highlight === 'green') return '#047857';
    if (props.$highlight === 'amber') return '#D97706';
    if (props.$highlight === 'red') return '#B91C1C';
    return '#374151';
  }};
`;

export const CallParentBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 800;
  background: #FEF2F2;
  color: #B91C1C;
  border: 1px solid #FCA5A5;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: #EF4444;
    color: #FFFFFF;
    border-color: #EF4444;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TrackerStatusBadge = styled.span<{ $status: 'PRESENT' | 'PERMISSION_ABSENCE' | 'UNEXCUSED_ABSENCE' }>`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 999px;

  ${props => props.$status === 'PRESENT' && `
    background: #ECFDF5;
    color: #047857;
  `}

  ${props => props.$status === 'PERMISSION_ABSENCE' && `
    background: #FEF3C7;
    color: #B45309;
  `}

  ${props => props.$status === 'UNEXCUSED_ABSENCE' && `
    background: #FEE2E2;
    color: #B91C1C;
  `}
`;
