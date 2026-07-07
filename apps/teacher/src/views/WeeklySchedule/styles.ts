import styled from 'styled-components';

// Main container
export const Container = styled.div`
  padding: 24px 32px;
  width: 100%;
  max-width: 1640px;
  margin: 0 auto;
  box-sizing: border-box;
`;

// Hero Section
export const HeroSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 32px;
  color: white;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
`;

export const HeroBgOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeroText = styled.div`
  min-width: 0;
  flex: 1 1 280px;
`;

export const HeroSubtitle = styled.p`
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 4px;
`;

export const HeroTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 16px 0;
`;

export const HeroStats = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const HeroDivider = styled.div`
  width: 1px;
  height: 20px;
  background: rgba(255,255,255,0.3);
`;

export const HeroWeekLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const StatusBadge = styled.span<{ $color: string; $bg: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => props.$bg};
  color: ${props => props.$color};
`;

export const StatusDot = styled.span<{ $color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

export const HeroActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  flex: 0 1 auto;
  max-width: 100%;

  > * {
    flex-shrink: 0;
  }

  @media (max-width: 900px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

// Buttons
export const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f7fafc;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SecondaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255,255,255,0.2);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255,255,255,0.3);
  }
`;

export const ImportBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #10B981;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #059669;
  }
`;

// Toolbar
export const Toolbar = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
`;

export const WeekNav = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const WeekNavBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f7fafc;
    border-color: #667eea;
  }
`;

export const WeekNavLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1a202c;
  min-width: 180px;
  text-align: center;
`;

export const MonthNav = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MonthLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  min-width: 120px;
  text-align: center;
`;

// Week tabs
export const WeekTabs = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const WeekTab = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  min-height: 52px;
  border: 2px solid ${props => props.$active ? '#667eea' : '#e2e8f0'};
  border-radius: 8px;
  background: ${props => props.$active ? '#667eea' : 'white'};
  color: ${props => props.$active ? 'white' : '#4a5568'};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  &:hover {
    border-color: #667eea;
    ${props => !props.$active && `background: #f7fafc;`}
  }
`;

// Board Grid
export const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const DayCol = styled.div<{ $isToday?: boolean; $dayStatus?: 'past' | 'today' | 'future' }>`
  background: white;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 2px solid ${props => {
    if (props.$isToday) return '#667eea';
    if (props.$dayStatus === 'future') return '#10B981';
    if (props.$dayStatus === 'past') return '#e2e8f0';
    if (props.$dayStatus === 'today') return '#a0aec0';
    return 'transparent';
  }};
  opacity: ${props => {
    if (props.$dayStatus === 'past') return 0.6;
    if (props.$dayStatus === 'today' && !props.$isToday) return 0.75;
    return 1;
  }};
  position: relative;
  transition: opacity 0.2s, border-color 0.2s;
  min-width: 0;
  overflow: hidden;
`;

export const DayColHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
`;

export const DayName = styled.h3<{ $isToday?: boolean }>`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.$isToday ? '#667eea' : '#2d3748'};
  margin: 0;
`;

export const DayDate = styled.span`
  font-size: 12px;
  color: #718096;
`;

export const TodayTag = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: white;
  background: #667eea;
  padding: 2px 6px;
  border-radius: 4px;
`;

export const PastTag = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: #718096;
  background: #e2e8f0;
  padding: 2px 6px;
  border-radius: 4px;
`;

// Activity Cards
export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ActivityCard = styled.div<{ $typeColor?: string; $dayStatus?: 'past' | 'today' | 'future' }>`
  background: #f7fafc;
  border-left: 3px solid ${props => props.$typeColor || '#667eea'};
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;
  opacity: ${props => {
    if (props.$dayStatus === 'past') return 0.7;
    return 1;
  }};
  filter: ${props => props.$dayStatus === 'past' ? 'grayscale(40%)' : 'none'};

  &:hover {
    background: #edf2f7;
    transform: translateX(2px);
  }
`;

export const ActivityTime = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #718096;
`;

export const ActivityName = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: #2d3748;
  margin: 4px 0;
`;

export const ActivityDetails = styled.p`
  font-size: 11px;
  color: #718096;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ActivityActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 6px;
`;

export const IconBtn = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: ${props => props.$danger ? '#e53e3e' : '#718096'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$danger ? '#fed7d7' : '#e2e8f0'};
  }
`;

export const AddActivityBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 10px;
  border: 2px dashed #cbd5e0;
  border-radius: 8px;
  background: transparent;
  color: #718096;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;

  &:hover {
    border-color: #667eea;
    color: #667eea;
    background: rgba(102, 126, 234, 0.05);
  }
`;

// Modal
export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalBox = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 720px;
  max-height: 90vh;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const ImportModalBox = styled(ModalBox)`
  max-width: 720px;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
`;

export const ModalIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
`;

export const ModalSubtitle = styled.p`
  font-size: 13px;
  color: #718096;
  margin: 4px 0 0 0;
`;

export const ModalCloseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: #f7fafc;
  color: #718096;
  cursor: pointer;

  &:hover {
    background: #edf2f7;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
`;

export const ViewOnlyNotice = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 14px;
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  color: #92400E;
  font-size: 13px;
  line-height: 1.4;

  svg {
    flex-shrink: 0;
    margin-top: 1px;
  }
`;

export const ChangeRequestHint = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 14px;
  background: #EFF6FF;
  border: 1px solid #3B82F6;
  border-radius: 8px;
  color: #1E40AF;
  font-size: 13px;
  line-height: 1.4;

  svg {
    flex-shrink: 0;
    margin-top: 1px;
  }
`;

// Form Elements
export const FieldLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 6px;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    background: #f7fafc;
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const SelectInput = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const TimeRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const TimeField = styled.div``;

// Activity Type Grid
export const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

export const TypeBtn = styled.button<{ $active: boolean; $color?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  border: 2px solid ${props => props.$active ? props.$color || '#667eea' : '#e2e8f0'};
  border-radius: 8px;
  background: ${props => props.$active ? `${props.$color || '#667eea'}15` : 'white'};
  color: ${props => props.$active ? props.$color || '#667eea' : '#718096'};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.$color || '#667eea'};
  }
`;

export const TypeIcon = styled.span`
  font-size: 20px;
`;

export const TypeLabel = styled.span`
  font-size: 10px;
`;

// Day buttons
export const DayBtnRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const DayBtn = styled.button<{ $active: boolean }>`
  padding: 8px 12px;
  border: 2px solid ${props => props.$active ? '#667eea' : '#e2e8f0'};
  border-radius: 6px;
  background: ${props => props.$active ? '#667eea' : 'white'};
  color: ${props => props.$active ? 'white' : '#718096'};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #667eea;
  }
`;

// Cancel and Save buttons
export const CancelBtn = styled.button`
  padding: 10px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #718096;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #f7fafc;
  }
`;

export const SaveBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// CSV Import Modal
export const DropZone = styled.div<{ $active: boolean }>`
  border: 2px dashed ${props => props.$active ? '#667eea' : '#cbd5e0'};
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  background: ${props => props.$active ? 'rgba(102, 126, 234, 0.05)' : '#f7fafc'};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.05);
  }
`;

export const DropZoneIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

export const DropZoneText = styled.p`
  font-size: 14px;
  color: #4a5568;
  margin: 0 0 8px 0;
`;

export const DropZoneHint = styled.p`
  font-size: 12px;
  color: #a0aec0;
  margin: 0;
`;

// Preview Table
export const PreviewTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;

  th, td {
    padding: 8px 12px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    background: #f7fafc;
    font-weight: 600;
    color: #4a5568;
  }

  td {
    color: #2d3748;
  }
`;

export const PreviewSummary = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 16px;
  padding: 12px 16px;
  background: #f7fafc;
  border-radius: 8px;
`;

export const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SummaryLabel = styled.span`
  font-size: 11px;
  color: #718096;
`;

export const SummaryValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #667eea;
`;

// Empty State
export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  h3 {
    font-size: 18px;
    color: #2d3748;
    margin: 0 0 8px 0;
  }

  p {
    font-size: 14px;
    color: #718096;
    margin: 0 0 24px 0;
  }
`;

// Toast
export const ToastStack = styled.div`
  position: fixed;
  top: 80px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
  width: auto;
  max-width: 400px;
`;

export const ToastItem = styled.div<{ $variant?: 'success' | 'error' | 'warning' | 'info' }>`
  padding: 16px 24px;
  background: ${props => {
    switch (props.$variant) {
      case 'error':
        return 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)';
      case 'warning':
        return 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)';
      case 'info':
        return 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)';
      default:
        return 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
    }
  }};
  color: white;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  box-shadow: ${props => {
    switch (props.$variant) {
      case 'error':
        return '0 8px 24px rgba(239, 68, 68, 0.4)';
      case 'warning':
        return '0 8px 24px rgba(245, 158, 11, 0.4)';
      case 'info':
        return '0 8px 24px rgba(59, 130, 246, 0.4)';
      default:
        return '0 8px 24px rgba(16, 185, 129, 0.4)';
    }
  }};
  border: 2px solid ${props => {
    switch (props.$variant) {
      case 'error':
        return '#fca5a5';
      case 'warning':
        return '#fcd34d';
      case 'info':
        return '#93c5fd';
      default:
        return '#34d399';
    }
  }};
  animation: slideIn 0.3s ease;
  text-align: center;
  min-width: 280px;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

// Reviewer Comment
export const ReviewNote = styled.div`
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #92400e;
`;

// Read-only Banner
export const ReadOnlyBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #e0e7ff;
  color: #3730a3;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 13px;
`;

// Class Selector
export const ClassSelectWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

export const ClassSelect = styled.select`
  background: rgba(255, 255, 255, 0.15);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-family: inherit;
  font-weight: 700;
  font-size: 18px;
  padding: 8px 40px 8px 14px;
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  appearance: none;
  transition: all 0.15s;
  min-width: 180px;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: white;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }

  option {
    background: #667eea;
    color: white;
    font-weight: 600;
  }
`;

export const ClassSelectArrow = styled.span`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 10px;
  pointer-events: none;
  opacity: 0.8;
`;
