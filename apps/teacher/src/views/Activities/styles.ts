'use client';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ActivitiesPageContainer = styled.div`
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

// Tab bar styles
export const TabBar = styled.div`
  display: flex;
  border-bottom: 2px solid ${props => props.theme.colors.border};
  gap: 32px;
  margin-bottom: 8px;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 12px 4px 16px 4px;
  font-size: 0.9375rem;
  font-weight: 700;
  cursor: pointer;
  color: ${props => (props.$active ? props.theme.colors.greenMid : props.theme.colors.muted)};
  position: relative;
  transition: all 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${props => props.theme.colors.greenMid};
    transform: scaleX(${props => (props.$active ? 1 : 0)});
    transition: transform 0.2s ease;
    border-radius: 99px;
  }

  &:hover {
    color: ${props => props.theme.colors.greenMid};
  }
`;

// Menu Config Board Section
export const MenuSection = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.soft};
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
`;

export const MenuHeader = styled.div`
  padding: 16px 24px;
  background: #fcfdfe;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const MenuTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MenuToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.greenMid};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  outline: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const MenuContent = styled.div<{ $isOpen: boolean }>`
  display: ${props => (props.$isOpen ? 'block' : 'none')};
  padding: 24px;
  background: #fafcf9;
`;

export const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const MenuCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.md};
  padding: 16px;
`;

export const MenuLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${props => props.theme.colors.greenMid};
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const MenuText = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${props => props.theme.colors.fg};
  margin: 0;
  white-space: pre-wrap;
  min-height: 48px;
`;

export const MenuTextarea = styled.textarea`
  width: 100%;
  min-height: 72px;
  padding: 8px 12px;
  font-size: 0.875rem;
  border-radius: ${props => props.theme.radius.sm};
  border: 1px solid ${props => props.theme.colors.border};
  outline: none;
  resize: vertical;
  background: ${props => props.theme.colors.bg};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${props => props.theme.colors.greenMid};
    background: ${props => props.theme.colors.surface};
  }
`;

// Filter & Quick Actions Bar
export const WorkspaceControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.md};
  padding: 16px 24px;
  box-shadow: ${props => props.theme.shadows.soft};
  border: 1px solid ${props => props.theme.colors.border};
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  max-width: 320px;
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

export const QuickActionsRow = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    flex-direction: column;
  }
`;

export const QuickFillBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 0.8125rem;
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

// Student Intake Workspace Grid/Table
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
  width: 40px;
  height: 40px;
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

// Meal Intake Selectors
export const MealButtonGroup = styled.div`
  display: flex;
  gap: 6px;
  background: #f0f4ef;
  padding: 4px;
  border-radius: ${props => props.theme.radius.md};
  width: fit-content;
`;

export const MealToggleBtn = styled.button<{ $active: boolean; $status: 'ALL' | 'HALF' | 'NONE' }>`
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: ${props => props.theme.radius.sm};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  color: ${props => props.theme.colors.muted};

  ${props => props.$active && props.$status === 'ALL' && `
    background: ${props.theme.colors.greenMid};
    color: white;
  `}

  ${props => props.$active && props.$status === 'HALF' && `
    background: ${props.theme.colors.amber};
    color: white;
  `}

  ${props => props.$active && props.$status === 'NONE' && `
    background: #ef4444;
    color: white;
  `}

  &:hover {
    ${props => !props.$active && `
      background: rgba(14, 121, 60, 0.08);
      color: ${props.theme.colors.greenMid};
    `}
  }
`;

export const DropdownSelect = styled.select`
  width: 100%;
  max-width: 150px;
  padding: 8px 12px;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: ${props => props.theme.radius.md};
  border: 1px solid ${props => props.theme.colors.border};
  outline: none;
  background: ${props => props.theme.colors.surface};
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${props => props.theme.colors.greenMid};
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
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

export const PhotoUploadWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PhotoThumbnail = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.radius.sm};
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AddPhotoBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px dashed ${props => props.theme.colors.border};
  background: none;
  color: ${props => props.theme.colors.muted};
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.greenMid};
    color: ${props => props.theme.colors.greenMid};
    background: rgba(34, 197, 94, 0.05);
  }
`;
