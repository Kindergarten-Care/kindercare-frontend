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
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.colors.muted};
  display: flex;
  align-items: center;
  gap: 8px;
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
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.lg};
  padding: 24px;
  box-shadow: ${props => props.theme.shadows.soft};
  border-left: 5px solid ${props => {
    if (props.$borderType === 'green') return props.theme.colors.greenMid;
    if (props.$borderType === 'amber') return props.theme.colors.amberMid;
    return props.theme.colors.muted;
  }};
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

export const StatLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const StatValue = styled.span`
  font-size: 2.25rem;
  font-weight: 800;
  color: ${props => props.theme.colors.fg};
  line-height: 1;
`;

export const StatSub = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.muted};
`;

export const FilterBar = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.md};
  padding: 16px 24px;
  box-shadow: ${props => props.theme.shadows.soft};
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
  padding: 10px 14px 10px 42px;
  font-size: 0.875rem;
  border-radius: ${props => props.theme.radius.md};
  border: 1px solid ${props => props.theme.colors.border};
  outline: none;
  background: ${props => props.theme.colors.bg};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${props => props.theme.colors.greenMid};
    background: ${props => props.theme.colors.surface};
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
  }
`;

export const FilterDropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CustomSelect = styled.select`
  padding: 10px 14px;
  font-size: 0.875rem;
  border-radius: ${props => props.theme.radius.md};
  border: 1px solid ${props => props.theme.colors.border};
  outline: none;
  background: ${props => props.theme.colors.surface};
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${props => props.theme.colors.greenMid};
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
  padding: 10px 18px;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: ${props => props.theme.radius.md};
  background: ${props => props.theme.colors.bg};
  color: ${props => props.theme.colors.fg};
  border: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.border};
  }
`;

export const SaveBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
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
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.soft};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
  background: ${props => props.theme.colors.bg};
  padding: 4px;
  border-radius: ${props => props.theme.radius.lg};
  border: 1px solid ${props => props.theme.colors.border};
`;

export const ViewModeBtn = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: ${props => props.theme.radius.md};
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  background: ${props => props.$active ? props.theme.colors.surface : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.fg : props.theme.colors.muted};
  box-shadow: ${props => props.$active ? props.theme.shadows.soft : 'none'};

  &:hover {
    color: ${props => props.theme.colors.fg};
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 12px;
  border-bottom: 2px solid ${props => props.theme.colors.border};
  padding-bottom: 8px;
  margin-top: 16px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabButton = styled.button<{ $active: boolean; $type: 'all' | 'present' | 'permission' | 'unexcused' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: ${props => props.theme.radius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  background: transparent;
  color: ${props => props.theme.colors.muted};
  position: relative;

  ${props => props.$active && `
    font-weight: 700;
  `}

  ${props => props.$active && props.$type === 'all' && `
    background: ${props.theme.colors.bg};
    border-color: ${props.theme.colors.border};
    color: ${props.theme.colors.fg};
  `}

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
    background: ${props => !props.$active ? props.theme.colors.bg : ''};
  }
`;

export const TabBadge = styled.span<{ $active: boolean; $type: 'all' | 'present' | 'permission' | 'unexcused' }>`
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 9999px;

  background: ${props => {
    if (props.$type === 'present') return props.$active ? props.theme.colors.greenMid : 'rgba(34, 197, 94, 0.1)';
    if (props.$type === 'permission') return props.$active ? props.theme.colors.amberMid : 'rgba(245, 158, 11, 0.1)';
    if (props.$type === 'unexcused') return props.$active ? '#ef4444' : 'rgba(239, 68, 68, 0.1)';
    return props.$active ? props.theme.colors.muted : props.theme.colors.bg;
  }};

  color: ${props => {
    if (props.$type === 'present') return props.$active ? 'white' : props.theme.colors.greenDark;
    if (props.$type === 'permission') return props.$active ? 'white' : props.theme.colors.amber;
    if (props.$type === 'unexcused') return props.$active ? 'white' : '#b91c1c';
    return props.$active ? 'white' : props.theme.colors.fg;
  }};
`;

export const TrackerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const TrackerCard = styled.div<{ $status: 'PRESENT' | 'PERMISSION_ABSENCE' | 'UNEXCUSED_ABSENCE' }>`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.lg};
  border: 1px solid ${props => {
    if (props.$status === 'PRESENT') return 'rgba(34, 197, 94, 0.2)';
    if (props.$status === 'PERMISSION_ABSENCE') return 'rgba(245, 158, 11, 0.2)';
    return 'rgba(239, 68, 68, 0.2)';
  }};
  box-shadow: ${props => props.theme.shadows.soft};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

export const TrackerCardHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.theme.colors.bg};
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
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: flex-end;
  background: ${props => props.theme.colors.bg};
`;

export const TrackerInfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TrackerInfoLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${props => props.theme.colors.muted};
  letter-spacing: 0.05em;
`;

export const TrackerInfoValue = styled.div<{ $highlight?: 'green' | 'amber' | 'red' }>`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => {
    if (props.$highlight === 'green') return props.theme.colors.greenDark;
    if (props.$highlight === 'amber') return props.theme.colors.amber;
    if (props.$highlight === 'red') return '#b91c1c';
    return props.theme.colors.fg;
  }};
`;

export const CallParentBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 700;
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fee2e2;
  border-radius: ${props => props.theme.radius.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #fee2e2;
    transform: translateY(-1px);
  }
`;

export const TrackerStatusBadge = styled.span<{ $status: 'PRESENT' | 'PERMISSION_ABSENCE' | 'UNEXCUSED_ABSENCE' }>`
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 9999px;

  ${props => props.$status === 'PRESENT' && `
    background: ${props.theme.colors.greenLight};
    color: ${props.theme.colors.greenDark};
  `}

  ${props => props.$status === 'PERMISSION_ABSENCE' && `
    background: ${props.theme.colors.amberLight};
    color: ${props.theme.colors.amber};
  `}

  ${props => props.$status === 'UNEXCUSED_ABSENCE' && `
    background: #fef2f2;
    color: #b91c1c;
  `}
`;
