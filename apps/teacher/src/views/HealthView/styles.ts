import styled, { keyframes } from 'styled-components';

export const kcFadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
`;

export const kcPop = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: none; }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  font-family: 'Inter', sans-serif;
  color: #1F2937;
  -webkit-font-smoothing: antialiased;
`;

// ─── Hero ──────────────────────────────────────────────────────────────────────

export const HeroSection = styled.div`
  background: linear-gradient(135deg, #059669 0%, #00794A 60%, #065F46 100%);
  border-radius: 24px;
  padding: 28px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 12px 40px -12px rgba(0, 121, 74, 0.45);
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    right: -8%;
    top: -60%;
    width: 380px;
    height: 380px;
    background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
    pointer-events: none;
  }
`;

export const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  z-index: 1;
`;

export const HeroTitle = styled.h1`
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  margin: 0;
  letter-spacing: -0.02em;
`;

export const HeroSubtitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #A7C9B6;
`;

export const HeroRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 1;
`;

// ─── Bento Cards ───────────────────────────────────────────────────────────────

export const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const BentoCard = styled.button<{ $color: string; $bg: string }>`
  background: ${props => props.$bg};
  border: 1px solid ${props => props.$color}22;
  border-radius: 20px;
  padding: 20px 22px;
  cursor: pointer;
  text-align: left;
  transition: transform 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s;
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${props => props.$color};
    opacity: 0;
    transition: opacity 0.2s;
    border-radius: 20px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px -12px ${props => props.$color}40;
    &::after { opacity: 0.04; }
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const BentoIcon = styled.div<{ $color: string; $bg: string }>`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
`;

export const BentoMeta = styled.div`
  flex: 1;
`;

export const BentoValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: #1F2937;
  line-height: 1;
  font-variant-numeric: tabular-nums;
`;

export const BentoLabel = styled.div`
  font-size: 12.5px;
  font-weight: 600;
  color: #6B7280;
  margin-top: 4px;
`;

export const BentoBadge = styled.div<{ $color: string; $bg: string }>`
  position: absolute;
  top: 14px;
  right: 16px;
  font-size: 11px;
  font-weight: 700;
  color: ${props => props.$color};
  background: ${props => props.$bg};
  padding: 2px 9px;
  border-radius: 999px;
`;

// ─── Tabs ─────────────────────────────────────────────────────────────────────

export const TabBar = styled.div`
  display: flex;
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  padding: 5px;
  gap: 4px;
  width: fit-content;
`;

export const TabBtn = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 12px;
  border: none;
  background: ${props => props.$active ? 'linear-gradient(135deg, #059669, #00794A)' : 'transparent'};
  color: ${props => props.$active ? '#fff' : '#6B7280'};
  font-weight: ${props => props.$active ? 700 : 600};
  font-size: 13.5px;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$active ? 'linear-gradient(135deg, #059669, #00794A)' : '#F1F4F1'};
    color: ${props => props.$active ? '#fff' : '#374151'};
  }
`;

// ─── List Section ──────────────────────────────────────────────────────────────

export const ListSection = styled.section`
  background: #fff;
  border-radius: 20px;
  border: 1px solid #E6EEE9;
  padding: 8px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.04);
`;

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  flex-wrap: wrap;
`;

export const ListTitle = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  background: #F8FBF9;
  border: 1px solid #E6EEE9;
  min-width: 200px;

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 13px;
    color: #1F2937;
    &::placeholder { color: #9CA3AF; }
  }
`;

// ─── Student Row ───────────────────────────────────────────────────────────────

export const StudentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-bottom: 1px solid #F3F9F6;
  transition: background 0.15s;
  cursor: pointer;
  border-radius: 12px;

  &:hover {
    background: #F8FBF9;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const StudentAvatar = styled.div<{ $grad: string }>`
  flex: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${props => props.$grad};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  position: relative;
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const StudentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StudentName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1F2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StudentMeta = styled.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 2px;
  font-weight: 500;
`;

// ─── Status Badges ────────────────────────────────────────────────────────────

export const SeverityBadge = styled.span<{ $severity: 'Mild' | 'Moderate' | 'Severe' }>`
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  ${props => {
    if (props.$severity === 'Severe') return 'color:#DC2626;background:#FEE2E2;border:1px solid #FCA5A5;';
    if (props.$severity === 'Moderate') return 'color:#D97706;background:#FEF3C7;border:1px solid #FDE68A;';
    return 'color:#059669;background:#D1FAE5;border:1px solid #A7F3D0;';
  }}
`;

export const StatusBadge = styled.span<{ $status: 'Pending' | 'Completed' | 'Rejected' }>`
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  ${props => {
    if (props.$status === 'Completed') return 'color:#059669;background:#D1FAE5;border:1px solid #A7F3D0;';
    if (props.$status === 'Rejected') return 'color:#DC2626;background:#FEE2E2;border:1px solid #FCA5A5;';
    return 'color:#D97706;background:#FEF3C7;border:1px solid #FDE68A;';
  }}
`;

export const AllergenPill = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  background: #FEE2E2;
  color: #DC2626;
  border: 1px solid #FCA5A5;
`;

// ─── BMI Grid ─────────────────────────────────────────────────────────────────

export const BmiGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 20px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const BmiInputCard = styled.div`
  background: #fff;
  border-radius: 20px;
  border: 1px solid #E6EEE9;
  padding: 24px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.04);
`;

export const BmiInputTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 20px;
`;

export const BmiForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const BmiFormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FormLabel = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #6B7280;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const FormInput = styled.input`
  height: 46px;
  border: 1.5px solid #E6EEE9;
  border-radius: 12px;
  padding: 0 14px;
  font-family: inherit;
  font-size: 14.5px;
  font-weight: 600;
  color: #1F2937;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #00794A;
  }

  &::placeholder {
    color: #9CA3AF;
    font-weight: 500;
  }
`;

export const FormSelect = styled.select`
  height: 46px;
  border: 1.5px solid #E6EEE9;
  border-radius: 12px;
  padding: 0 14px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  outline: none;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    border-color: #00794A;
  }
`;

export const FormTextarea = styled.textarea`
  border: 1.5px solid #E6EEE9;
  border-radius: 12px;
  padding: 12px 14px;
  font-family: inherit;
  font-size: 14px;
  color: #1F2937;
  outline: none;
  resize: vertical;
  min-height: 72px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #00794A;
  }

  &::placeholder {
    color: #9CA3AF;
    font-weight: 500;
  }
`;

export const SubmitBtn = styled.button`
  height: 48px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #059669, #00794A);
  color: #fff;
  font-family: inherit;
  font-weight: 700;
  font-size: 14.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
  box-shadow: 0 6px 20px -6px rgba(0, 121, 74, 0.4);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px -8px rgba(0, 121, 74, 0.45);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const BmiPreviewCard = styled.div`
  background: linear-gradient(135deg, #ECFDF5, #D1FAE5);
  border-radius: 20px;
  border: 1px solid #A7F3D0;
  padding: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    right: -10%;
    top: -20%;
    width: 180px;
    height: 180px;
    background: radial-gradient(circle, rgba(5,150,105,0.15) 0%, rgba(5,150,105,0) 70%);
    border-radius: 50%;
    pointer-events: none;
  }
`;

export const BmiPreviewLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #059669;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
`;

export const BmiPreviewValue = styled.div<{ $status: string }>`
  font-size: 52px;
  font-weight: 800;
  color: ${props => {
    if (props.$status === 'Thừa cân' || props.$status === 'Béo phì') return '#DC2626';
    if (props.$status === 'Nhẹ cân' || props.$status === 'Suy dinh dưỡng') return '#D97706';
    return '#059669';
  }};
  letter-spacing: -0.02em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
`;

export const BmiPreviewUnit = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #6B7280;
  margin-top: 4px;
`;

export const BmiPreviewStatus = styled.div<{ $status: string }>`
  display: inline-flex;
  margin-top: 12px;
  padding: 5px 16px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 700;
  background: ${props => {
    if (props.$status === 'Thừa cân' || props.$status === 'Béo phì') return '#FEE2E2';
    if (props.$status === 'Nhẹ cân' || props.$status === 'Suy dinh dưỡng') return '#FEF3C7';
    return '#D1FAE5';
  }};
  color: ${props => {
    if (props.$status === 'Thừa cân' || props.$status === 'Béo phì') return '#DC2626';
    if (props.$status === 'Nhẹ cân' || props.$status === 'Suy dinh dưỡng') return '#D97706';
    return '#059669';
  }};
`;

export const BmiLegendGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
`;

export const BmiLegendItem = styled.div<{ $active?: boolean; $color: string; $bg: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 12px;
  border: 1.5px solid ${props => props.$active ? props.$color : '#E6EEE9'};
  background: ${props => props.$active ? props.$bg : '#fff'};
  transition: all 0.2s;
`;

export const BmiLegendDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$color};
  flex: none;
`;

export const BmiLegendText = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #374151;
`;

export const BmiLegendRange = styled.div`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`;

// ─── Popup / Modal ────────────────────────────────────────────────────────────

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${kcFadeIn} 0.2s ease;
`;

export const ModalContainer = styled.div`
  background: #fff;
  border-radius: 24px;
  width: 100%;
  max-width: 560px;
  max-height: 85vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 32px 80px rgba(15, 23, 42, 0.25);
  animation: ${kcPop} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const ModalHeader = styled.div<{ $color: string }>`
  background: ${props => props.$color}10;
  border-bottom: 1px solid ${props => props.$color}22;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const ModalHeaderIcon = styled.div<{ $color: string; $bg: string }>`
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
`;

export const ModalHeaderMeta = styled.div`
  flex: 1;
`;

export const ModalTitle = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: #1F2937;
`;

export const ModalSubtitle = styled.div`
  font-size: 12.5px;
  color: #6B7280;
  margin-top: 2px;
`;

export const ModalCloseBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: #F1F4F1;
  color: #6B7280;
  font-size: 17px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  flex: none;

  &:hover { background: #E6EEE9; }
`;

export const ModalBody = styled.div`
  flex: 1;
  overflow: auto;
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModalSection = styled.div`
  background: #F8FBF9;
  border-radius: 14px;
  padding: 16px;
`;

export const ModalSectionTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9CA3AF;
  margin-bottom: 10px;
`;

export const ModalField = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 6px 0;
`;

export const ModalFieldLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  min-width: 90px;
`;

export const ModalFieldValue = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: #1F2937;
  flex: 1;
`;

export const AllergyChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 999px;
  background: #FEE2E2;
  color: #DC2626;
  border: 1px solid #FCA5A5;
  font-size: 12.5px;
  font-weight: 700;
`;

export const AllergyChipMild = styled(AllergyChip)`
  background: #D1FAE5;
  color: #059669;
  border-color: #A7F3D0;
`;

export const AllergyChipModerate = styled(AllergyChip)`
  background: #FEF3C7;
  color: #D97706;
  border-color: #FDE68A;
`;

// ─── Save Success Animation ────────────────────────────────────────────────────

export const SavedRow = styled.div`
  background: #D1FAE5;
  border-radius: 12px;
  transition: background 0.4s;
`;

// ─── Toast ─────────────────────────────────────────────────────────────────────

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
  pointer-events: none;
`;

export const ToastMsg = styled.div<{ $type?: 'success' | 'error' | 'info' }>`
  background: ${props => props.$type === 'error' ? '#DC2626' : props.$type === 'info' ? '#2563EB' : '#005A36'};
  color: #fff;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  animation: ${kcFadeIn} 0.3s ease;
`;

// ─── Empty State ───────────────────────────────────────────────────────────────

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px 20px;
  color: #9CA3AF;
  font-weight: 600;
  font-size: 14px;
`;

// ─── Medication Image ─────────────────────────────────────────────────────────

export const MedImageThumb = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  object-fit: cover;
  border: 1.5px solid #E6EEE9;
  cursor: pointer;
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.05);
  }
`;

// ─── Action Buttons ───────────────────────────────────────────────────────────

export const ActionRow = styled.div`
  display: flex;
  gap: 10px;
`;

export const ApproveBtn = styled.button`
  flex: 1;
  height: 42px;
  border-radius: 12px;
  border: none;
  background: #00794A;
  color: #fff;
  font-family: inherit;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s;

  &:hover { background: #059669; transform: translateY(-1px); }
`;

export const RejectBtn = styled.button`
  flex: 1;
  height: 42px;
  border-radius: 12px;
  border: 1.5px solid #FCA5A5;
  background: #FEF2F2;
  color: #DC2626;
  font-family: inherit;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s;

  &:hover { background: #FEE2E2; transform: translateY(-1px); }
`;
