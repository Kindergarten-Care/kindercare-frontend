'use client';

import styled from 'styled-components';

export const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
`;

export const DetailBackBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #374151;
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.15s ease;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

export const Breadcrumbs = styled.div`
  font-size: 13.5px;
  color: var(--muted, #64748b);

  strong {
    color: var(--fg);
    font-weight: 700;
  }

  span {
    margin: 0 4px;
  }
`;

export const DetailSummaryCard = styled.div<{ $color: string }>`
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  border-left: 5px solid ${p => p.$color};
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SummaryTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

export const SummaryLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SummaryIconWrapper = styled.div<{ $bg: string; $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${p => p.$bg};
  color: ${p => p.$color};
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const SummaryTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: var(--fg);
  margin: 0 0 4px 0;
  letter-spacing: -0.01em;
`;

export const SummaryMeta = styled.span`
  font-size: 13px;
  color: var(--muted, #6b7280);
  font-weight: 500;
`;

export const StatusBadge = styled.span<{ $status: 'pending' | 'approved' | 'completed' | 'cancelled' | 'rejected' }>`
  font-size: 11.5px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 8px;
  letter-spacing: 0.01em;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  ${p => {
    switch (p.$status) {
      case 'pending':
        return 'background: #fff7ed; color: #c2410c;';
      case 'approved':
      case 'completed':
        return 'background: #f0fdf4; color: #15803d;';
      case 'cancelled':
        return 'background: #f1f5f9; color: #64748b;';
      case 'rejected':
        return 'background: #fef2f2; color: #dc2626;';
    }
  }}
`;

export const SummaryDivider = styled.hr`
  border: none;
  border-top: 1px solid var(--border-soft, #f1f5f9);
  margin: 0;
`;

export const SummaryChildRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SummaryChildAvatar = styled.div<{ $gradient: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${p => p.$gradient};
  color: #fff;
  font-size: 13.5px;
  font-weight: 700;
  display: grid;
  place-items: center;
`;

export const SummaryChildAvatarImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const SummaryChildName = styled.h4`
  font-size: 14.5px;
  font-weight: 700;
  color: var(--fg);
  margin: 0 0 2px 0;
`;

export const SummaryChildClass = styled.span`
  font-size: 12.5px;
  color: var(--muted, #6b7280);
  font-weight: 500;
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const DetailLeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DetailRightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DetailCard = styled.div`
  background: var(--surface, #fff);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DetailCardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: var(--fg);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: var(--brand, #005a36);
  }
`;

export const DetailInfoTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DetailInfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  border-bottom: 1px dashed var(--border-soft, #f1f5f9);
  padding-bottom: 12px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const DetailInfoLabel = styled.span`
  color: var(--muted, #6b7280);
  font-weight: 500;
`;

export const DetailInfoValue = styled.span`
  color: var(--fg);
  font-weight: 600;
  display: flex;
  align-items: center;
`;

export const DetailNoteBlock = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  border-left: 4px solid #cbd5e1;
`;

export const DetailNoteHeader = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: var(--muted, #64748b);
  letter-spacing: 0.05em;
  margin-bottom: 6px;
`;

export const DetailNoteContent = styled.div`
  font-size: 13.5px;
  color: #334155;
  line-height: 1.5;
  font-weight: 500;
`;

export const TeacherResponseText = styled.p`
  font-size: 14px;
  color: #475569;
  line-height: 1.5;
  margin: 0;
  font-weight: 500;
`;

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 20px;
  margin-left: 10px;

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 0;
    width: 2px;
    background: #e2e8f0;
  }
`;

export const TimelineItem = styled.div<{ $status: 'completed' | 'pending' | 'waiting' | 'cancelled' | 'rejected' }>`
  position: relative;
  padding-bottom: 24px;

  &:last-child {
    padding-bottom: 0;
  }
`;

export const TimelineIcon = styled.div<{ $status: 'completed' | 'pending' | 'waiting' | 'cancelled' | 'rejected' }>`
  position: absolute;
  left: -30px;
  top: 2px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  z-index: 2;

  background: ${p => {
    if (p.$status === 'completed') return '#16a34a';
    if (p.$status === 'pending') return '#ea580c';
    if (p.$status === 'cancelled' || p.$status === 'rejected') return '#ef4444';
    return '#e2e8f0';
  }};

  color: #fff;
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px ${p => {
    if (p.$status === 'completed') return 'rgba(22, 163, 74, 0.15)';
    if (p.$status === 'pending') return 'rgba(234, 88, 12, 0.15)';
    if (p.$status === 'cancelled' || p.$status === 'rejected') return 'rgba(239, 68, 68, 0.15)';
    return 'transparent';
  }};
`;

export const TimelineContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const TimelineTitle = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: var(--fg);
`;

export const TimelineSub = styled.span`
  font-size: 12px;
  color: var(--muted, #64748b);
  font-weight: 500;
`;

export const TimelineActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
`;

export const BtnCancelDetail = styled.button`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #dc2626;
  background: #fff;
  border: 1px solid #fca5a5;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #fef2f2;
    border-color: #ef4444;
  }
`;

export const BtnBackToList = styled.button`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #374151;
  background: #f1f5f9;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #e2e8f0;
  }
`;

export const DetailMedicinesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const DetailMedicineItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  border: 1px solid var(--border-soft, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
`;

export const DetailMedIndex = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ea580c;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: grid;
  place-items: center;
`;

export const DetailMedInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const DetailMedName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: var(--fg);
`;

export const DetailMedMeta = styled.span`
  font-size: 11.5px;
  color: var(--muted, #64748b);
`;

export const MedCard = styled.div`
  background: #fffdfa;
  border: 1px solid #fef3c7;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
`;

export const MedCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MedNumBadge = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ea580c;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const MedNameText = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: var(--fg);
  margin: 0;
`;

export const MedInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const MedInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  color: var(--muted, #64748b);
`;

export const MedDosagePill = styled.span`
  font-size: 12px;
  font-weight: 700;
  background: #fef3c7;
  color: #b45309;
  padding: 4px 10px;
  border-radius: 8px;
`;

export const MedTimePill = styled.span`
  font-size: 12px;
  font-weight: 700;
  background: #dbeafe;
  color: #1e40af;
  padding: 4px 10px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const MedImagePlaceholder = styled.div`
  border: 2px dashed #e2e8f0;
  background: repeating-linear-gradient(
    45deg,
    #fafaf9,
    #fafaf9 10px,
    #f5f5f4 10px,
    #f5f5f4 20px
  );
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--muted, #9ca3af);
  font-size: 12.5px;
  font-weight: 500;

  svg {
    opacity: 0.6;
  }
`;

export const MedImageWrapper = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--brand, #005a36);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  img {
    width: 100%;
    height: auto;
    max-height: 280px;
    object-fit: contain;
    display: block;
    border-radius: 6px;
  }
`;

export const ZoomOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: overlayFadeIn 0.25s ease-out;

  @keyframes overlayFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const ZoomContainer = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: zoomIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);

  @keyframes zoomIn {
    from { transform: scale(0.9) translateY(10px); opacity: 0; }
    to { transform: scale(1) translateY(0); opacity: 1; }
  }
`;

export const ZoomCloseBtn = styled.button`
  position: absolute;
  top: -46px;
  right: 0;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 15px;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(255, 255, 255, 0.35);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ZoomedImg = styled.img`
  max-width: 100%;
  max-height: 85vh;
  border-radius: 12px;
  display: block;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
`;

export const InfoIconWrapper = styled.span`
  margin-right: 6px;
  display: inline-flex;
  align-items: center;
`;

export const EvidenceBlock = styled.div`
  margin-top: 16px;
`;

export const EvidenceHeader = styled(DetailNoteHeader)`
  margin-bottom: 8px;
`;

export const MedCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MedTimesText = styled.span`
  color: var(--fg);
  font-weight: 600;
`;

export const SentTimeRow = styled(DetailInfoRow)`
  border-bottom: none;
  padding-top: 12px;
  padding-bottom: 0;
`;

export const PendingDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
`;

export const WaitingDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #94a3b8;
`;