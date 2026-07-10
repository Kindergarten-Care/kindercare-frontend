'use client';

import styled from 'styled-components';

export const Sec = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SecHead = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

export const SecIco = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--brand-tint, #E6F3ED);
  color: var(--brand, #005A36);
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const SecTitle = styled.h2`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--fg, #1F2937);
`;

export const SecSub = styled.span`
  font-size: 12px;
  color: var(--muted-2, #9CA3AF);
  margin-left: auto;
  font-weight: 500;
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  @media (max-width: 680px) { grid-template-columns: repeat(2, 1fr); }
`;

export const Photo = styled.div`
  position: relative;
  border-radius: 13px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  border: 1px solid #EEF4F0;
  background: repeating-linear-gradient(45deg, #EEF4F0, #EEF4F0 11px, #E6EEE9 11px, #E6EEE9 22px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;
  transition: transform 0.16s;
  color: var(--muted-2, #9CA3AF);
  &:hover { transform: scale(1.02); }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PhotoTag = styled.span`
  font-family: var(--font-jetbrains-mono, 'JetBrains Mono'), ui-monospace, monospace;
  font-size: 10px;
  color: var(--muted-2, #9CA3AF);
  text-align: center;
  padding: 0 6px;
`;

export const PhotoCap = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 14px 10px 8px;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.55));
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 32px 16px;
  border-radius: 13px;
  border: 1px dashed #D9E2DC;
  background: #FAFBFA;
  color: var(--muted-2, #9CA3AF);
  text-align: center;
`;

export const EmptyStateTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: var(--muted, #6B7280);
`;

export const PhotoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(2px);
  display: grid;
  place-items: center;
  color: #ffffff;
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 22px;
  font-weight: 700;
  z-index: 2;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(15, 23, 42, 0.5);
  }
`;
