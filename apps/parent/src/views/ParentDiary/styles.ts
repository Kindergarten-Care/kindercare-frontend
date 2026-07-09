'use client';

import styled from 'styled-components';

// ─── Page layout ──────────────────────────────────────────────────────────────

export const PageWrap = styled.div`
  padding: 24px 32px 56px;
  @media (max-width: 860px) { padding: 18px 18px 48px; }
  @media (max-width: 768px) { padding: 16px 0 48px; }
`;

export const JournalGrid = styled.div`
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 24px;
  align-items: start;
  @media (max-width: 980px) { grid-template-columns: 1fr; }
`;

export const ColRight = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  container-type: inline-size;
  container-name: journal-col-right;

  @media (max-width: 980px) { order: 1; }
`;

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
  @container journal-col-right (max-width: 1240px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const WeekendCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  padding: 56px 24px;
  border-radius: 16px;
  background: linear-gradient(105deg, #EBF6F0 0%, #FFFFFF 90%);
  border: 1px solid #CFE7D8;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06);
`;

export const WeekendEmoji = styled.div`
  font-size: 48px;
  line-height: 1;
`;

export const WeekendTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: var(--fg);
`;

export const WeekendDesc = styled.p`
  font-size: 14px;
  color: var(--muted);
  max-width: 380px;
`;

import { ResponsiveModal } from '@kindercare/ui';

export const StyledResponsiveModal = styled(ResponsiveModal)`
  @media (min-width: 768px) {
    max-height: 85vh;
  }
`;

export const GalleryHead = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 22px 24px;
  border-bottom: 1px solid #f3f4f6;
`;

export const GalleryHeadInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const GalleryTitle = styled.h3`
  font-size: 19px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const GallerySubtitle = styled.p`
  font-size: 13px;
  color: var(--muted);
  margin-top: 3px;
`;

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  padding: 22px 24px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;

  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 99px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

export const GalleryPhoto = styled.button<{ $bg?: string }>`
  width: 100%;
  height: 172px;
  border-radius: 14px;
  border: 1px solid var(--border, #e5e7eb);
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  background: ${p => p.$bg || '#f3f4f6'};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.16s, box-shadow 0.16s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

export const TimePill = styled.span`
  position: absolute;
  left: 8px;
  bottom: 8px;
  background: rgba(15, 23, 42, 0.65);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 7px;
  backdrop-filter: blur(2px);
`;

export const ModalCloseBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #f3f4f6;
  border: none;
  color: #374151;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 16px;
  flex-shrink: 0;
  transition: background 0.15s;

  &:hover { background: #e5e7eb; }
`;
