import styled, { keyframes } from 'styled-components';

const fadein = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
`;

const backdropIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: none; }
`;

// ─── Layout ────────────────────────────────────────────────────────────────────

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 4px 32px;
  animation: ${fadein} 0.3s ease;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #1F2937;
  margin: 0;
  font-family: inherit;
`;

export const Subtitle = styled.p`
  font-size: 13px;
  color: #6B7280;
  margin: 4px 0 0;
  font-weight: 500;
`;

// ─── Quick Stat Cards ─────────────────────────────────────────────────────────

export const StatCardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.button<{ $color?: string; $bg?: string; $border?: string }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background: ${props => props.$bg || '#fff'};
  border: 1px solid ${props => props.$border || '#E6EEE9'};
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0,90,54,0.06);
  cursor: pointer;
  text-align: left;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  animation: ${fadein} 0.35s ease both;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px -8px rgba(0,90,54,0.12);
    border-color: ${props => props.$color || '#005A36'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const StatIcon = styled.div<{ $color?: string; $bg?: string }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${props => props.$bg || '#E6F3ED'};
  color: ${props => props.$color || '#005A36'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
`;

export const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const StatValue = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #1F2937;
  font-family: inherit;
  letter-spacing: -0.02em;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// ─── Tabs ──────────────────────────────────────────────────────────────────────

export const TabBar = styled.div`
  display: flex;
  gap: 6px;
  background: #F8FAF9;
  border: 1px solid #E6EEE9;
  border-radius: 14px;
  padding: 5px;
  width: fit-content;
`;

export const Tab = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  border-radius: 10px;
  border: none;
  font-family: inherit;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  ${props => props.$active
    ? `background: #fff; color: #005A36; box-shadow: 0 2px 8px rgba(0,90,54,0.12);`
    : `background: transparent; color: #6B7280;`
  }

  &:hover {
    ${props => !props.$active && `color: #005A36; background: rgba(0,90,54,0.04);`}
  }
`;

// ─── BMI Input Section ─────────────────────────────────────────────────────────

export const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const BentoCard = styled.div<{ $colSpan?: number; $highlight?: boolean }>`
  background: ${props => props.$highlight ? '#F0FDF4' : '#fff'};
  border: 1px solid ${props => props.$highlight ? '#86EFAC' : '#E6EEE9'};
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0,90,54,0.06);
  padding: 20px;
  grid-column: ${props => props.$colSpan ? `span ${props.$colSpan}` : 'unset'};
  animation: ${fadein} 0.4s ease both;
  transition: border-color 0.3s, background 0.3s;

  @media (max-width: 900px) {
    grid-column: unset;
  }
`;

export const BentoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 14px;
  letter-spacing: -0.01em;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const FormLabel = styled.label`
  font-size: 11.5px;
  font-weight: 700;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const FormInput = styled.input`
  height: 44px;
  padding: 0 14px;
  border-radius: 11px;
  border: 1.5px solid #E6EEE9;
  background: #FAFCFB;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #34D399;
    box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.18);
  }

  &::placeholder {
    color: #C7CFCA;
    font-weight: 500;
  }
`;

export const FormSelect = styled.select`
  height: 44px;
  padding: 0 36px 0 14px;
  border-radius: 11px;
  border: 1.5px solid #E6EEE9;
  background: #FAFCFB url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 12px center;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
  box-sizing: border-box;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #34D399;
    box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.18);
  }
`;

export const FormTextarea = styled.textarea`
  padding: 10px 14px;
  border-radius: 11px;
  border: 1.5px solid #E6EEE9;
  background: #FAFCFB;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
  resize: vertical;
  min-height: 72px;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #34D399;
    box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.18);
  }

  &::placeholder {
    color: #C7CFCA;
  }
`;

// ─── BMI Preview ────────────────────────────────────────────────────────────────

export const BMIPreview = styled.div<{ $color: string; $bg: string; $border: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px;
  border-radius: 14px;
  background: ${props => props.$bg};
  border: 1.5px solid ${props => props.$border};
  transition: all 0.3s;
`;

export const BMIGauge = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(to right, #93C5FD, #6EE7B7, #FCD34D, #FCA5A5);
  margin: 8px 0 4px;
  overflow: hidden;
`;

export const BMIMarker = styled.div<{ $position: number }>`
  position: absolute;
  top: 50%;
  left: ${props => props.$position}%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  border: 2.5px solid #1F2937;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  transition: left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

export const BMIValue = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: #1F2937;
  font-family: inherit;
  letter-spacing: -0.03em;
`;

export const BMICategoryLabel = styled.div<{ $color: string }>`
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.$color};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

// ─── Student List Table ────────────────────────────────────────────────────────

export const StudentTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 18px -4px rgba(0,90,54,0.06);
  animation: ${fadein} 0.4s ease both;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 100px;
  gap: 8px;
  padding: 12px 18px;
  background: #F8FAF9;
  border-bottom: 1px solid #E6EEE9;
  font-size: 11px;
  font-weight: 700;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 900px) {
    grid-template-columns: 2fr 1fr 1fr 80px;
    & > *:nth-child(n+4):not(:last-child) {
      display: none;
    }
  }

  @media (max-width: 560px) {
    grid-template-columns: 2fr 1fr 60px;
    & > *:nth-child(n+3):not(:last-child) {
      display: none;
    }
  }
`;

export const TableRow = styled.div<{ $saved?: boolean }>`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 100px;
  gap: 8px;
  padding: 12px 18px;
  align-items: center;
  border-bottom: 1px solid #EEF4F0;
  background: ${props => props.$saved ? '#F0FDF4' : '#fff'};
  transition: background 0.4s, opacity 0.4s;
  animation: ${slideUp} 0.25s ease both;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F6FAF7;
  }

  @media (max-width: 900px) {
    grid-template-columns: 2fr 1fr 1fr 80px;
    & > *:nth-child(n+4):not(:last-child) {
      display: none;
    }
  }

  @media (max-width: 560px) {
    grid-template-columns: 2fr 1fr 60px;
    & > *:nth-child(n+3):not(:last-child) {
      display: none;
    }
  }
`;

export const StudentCell = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

export const AvatarSmall = styled.div<{ $grad: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.$grad};
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  overflow: hidden;
`;

export const StudentName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1F2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CellValue = styled.div<{ $color?: string }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.$color || '#374151'};
  font-variant-numeric: tabular-nums;
`;

export const BMIBadge = styled.span<{ $color: string; $bg: string; $border: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  border: 1px solid ${props => props.$border};
  min-width: 56px;
`;

export const SaveButton = styled.button`
  height: 34px;
  border-radius: 9px;
  border: none;
  background: #005A36;
  color: #fff;
  font-family: inherit;
  font-weight: 700;
  font-size: 12.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: transform 0.15s, background 0.15s, opacity 0.2s;
  padding: 0 12px;

  &:hover {
    transform: scale(1.04);
    background: #004428;
  }

  &:active {
    transform: scale(0.96);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SavedButton = styled.div`
  height: 34px;
  border-radius: 9px;
  border: 1px solid #86EFAC;
  background: #F0FDF4;
  color: #059669;
  font-family: inherit;
  font-weight: 700;
  font-size: 12.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0 12px;
`;

// ─── Popup / Modal ─────────────────────────────────────────────────────────────

export const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(15, 23, 42, 0.35);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: ${backdropIn} 0.2s ease;
`;

export const Popup = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 32px 80px rgba(0, 90, 54, 0.22);
  width: 100%;
  max-width: 560px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${slideUp} 0.3s cubic-bezier(0.32, 0.72, 0, 1);
`;

export const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 22px 16px;
  border-bottom: 1px solid #EEF4F0;
  flex: none;
`;

export const PopupTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 17px;
  font-weight: 800;
  color: #1F2937;
  letter-spacing: -0.02em;
`;

export const PopupBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 22px 24px;
`;

export const CloseBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #E6EEE9;
  background: #F8FAF9;
  color: #6B7280;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  flex: none;

  &:hover {
    background: #FEE2E2;
    border-color: #FCA5A5;
    color: #DC2626;
  }
`;

export const ListItem = styled.div<{ $variant?: 'allergy' | 'medication' }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border-radius: 13px;
  border: 1px solid #E6EEE9;
  background: #FAFCFB;
  margin-bottom: 10px;
  transition: border-color 0.15s;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    border-color: ${props => props.$variant === 'allergy' ? '#FCA5A5' : '#93C5FD'};
  }
`;

export const ListItemIcon = styled.div<{ $color: string; $bg: string }>`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
`;

export const ListItemContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ListItemTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1F2937;
`;

export const ListItemMeta = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  margin-top: 2px;
`;

export const SeverityBadge = styled.span<{ $severity: 'Mild' | 'Moderate' | 'Severe' }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 9px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 700;
  margin-top: 5px;

  ${props => {
    switch (props.$severity) {
      case 'Mild':
        return `background: #DBEAFE; color: #1D4ED8; border: 1px solid #93C5FD;`;
      case 'Moderate':
        return `background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;`;
      case 'Severe':
        return `background: #FEE2E2; color: #DC2626; border: 1px solid #FCA5A5;`;
    }
  }}
`;

export const StatusBadge = styled.span<{ $status: 'Pending' | 'Completed' | 'Rejected' }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 9px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 700;
  margin-top: 5px;

  ${props => {
    switch (props.$status) {
      case 'Pending':
        return `background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;`;
      case 'Completed':
        return `background: #D1FAE5; color: #065F46; border: 1px solid #6EE7B7;`;
      case 'Rejected':
        return `background: #FEE2E2; color: #991B1B; border: 1px solid #FCA5A5;`;
    }
  }}
`;

// ─── Actions ────────────────────────────────────────────────────────────────────

export const ActionRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

export const PrimaryBtn = styled.button`
  height: 42px;
  padding: 0 22px;
  border-radius: 11px;
  border: none;
  background: #005A36;
  color: #fff;
  font-family: inherit;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: transform 0.15s, background 0.15s;

  &:hover {
    transform: scale(1.02);
    background: #004428;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SecondaryBtn = styled.button`
  height: 42px;
  padding: 0 22px;
  border-radius: 11px;
  border: 1px solid #E6EEE9;
  background: #fff;
  color: #005A36;
  font-family: inherit;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: background 0.15s;

  &:hover {
    background: #F1F4F1;
  }
`;

export const IconBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 9px;
  border: 1px solid #E6EEE9;
  background: #fff;
  color: #6B7280;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  flex: none;

  &:hover {
    background: #FEE2E2;
    border-color: #FCA5A5;
    color: #DC2626;
  }
`;

// ─── Toast ──────────────────────────────────────────────────────────────────────

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Toast = styled.div<{ $variant?: 'success' | 'error' | 'warning' | 'info' }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 600;
  box-shadow: 0 12px 32px rgba(0,0,0,0.15);
  animation: ${slideUp} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  min-width: 240px;
  max-width: 380px;

  ${props => {
    switch (props.$variant) {
      case 'success':
        return `background: #065F46; color: #fff; border: 1px solid #059669;`;
      case 'error':
        return `background: #991B1B; color: #fff; border: 1px solid #DC2626;`;
      case 'warning':
        return `background: #92400E; color: #fff; border: 1px solid #D97706;`;
      default:
        return `background: #1E3A5F; color: #fff; border: 1px solid #2563EB;`;
    }
  }}
`;

// ─── Empty State ────────────────────────────────────────────────────────────────

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 40px 20px;
  text-align: center;
  color: #9CA3AF;
`;

export const EmptyTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #6B7280;
`;

export const EmptyDesc = styled.div`
  font-size: 12.5px;
  font-weight: 500;
`;

// ─── Misc ──────────────────────────────────────────────────────────────────────

export const Divider = styled.div`
  height: 1px;
  background: #EEF4F0;
  margin: 12px 0;
`;

export const NoteText = styled.div`
  font-size: 11.5px;
  color: #6B7280;
  font-weight: 500;
  font-style: italic;
  margin-top: 4px;
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

