'use client';

import styled, { keyframes } from 'styled-components';

const rise = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px 18px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 10px;
`;

export const HeadIco = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: var(--brand-tint);
  color: var(--brand);
  display: grid;
  place-items: center;
  font-size: 18px;
  flex-shrink: 0;
`;

export const HeadInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const HeadTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PhotoCount = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--brand);
  background: var(--brand-tint);
  padding: 3px 9px;
  border-radius: 8px;
`;

export const HeadSub = styled.div`
  font-size: 12.5px;
  color: var(--muted);
  font-weight: 500;
  margin-top: 2px;
`;

export const ViewAllBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--brand);
  background: var(--brand-tint);
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: gap 0.15s, background 0.15s;

  &:hover {
    gap: 8px;
    background: #d7ebe0;
  }
`;

export const Rail = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 2px 2px 6px;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: #cfe0d5 transparent;
  margin-top: auto;

  &::-webkit-scrollbar { height: 6px; }
  &::-webkit-scrollbar-thumb { background: #cfe0d5; border-radius: 99px; }
  &::-webkit-scrollbar-track { background: transparent; }
`;

export const Photo = styled.button<{ $bg: string }>`
  flex: 0 0 128px;
  width: 128px;
  height: 96px;
  border-radius: 12px;
  border: 1px solid var(--border);
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  background: ${p => p.$bg};
  position: relative;
  scroll-snap-align: start;
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

  &:hover > .zoom {
    opacity: 1;
  }
`;

export const PhotoIco = styled.div`
  font-size: 28px;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
`;

export const TimePill = styled.div`
  position: absolute;
  bottom: 6px;
  left: 6px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  background: rgba(0, 0, 0, 0.42);
  padding: 2px 7px;
  border-radius: 7px;
  backdrop-filter: blur(2px);
`;

export const ZoomIcon = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.85);
  color: #374151;
  display: grid;
  place-items: center;
  opacity: 0;
  transition: opacity 0.15s;
  font-size: 12px;
  backdrop-filter: blur(3px);
  pointer-events: none;
`;

export const MoreTile = styled.button`
  flex: 0 0 96px;
  width: 96px;
  height: 96px;
  border-radius: 12px;
  border: 1.5px dashed #cfe0d5;
  background: #f7fbf8;
  color: var(--brand);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font: inherit;
  font-size: 11.5px;
  font-weight: 600;
  flex-shrink: 0;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: var(--brand-tint);
    border-color: #a9cfba;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const GalleryModal = styled.div`
  background: var(--surface);
  border-radius: 20px;
  width: min(820px, 94vw);
  max-height: 88vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
  animation: ${rise} 0.25s cubic-bezier(0.2, 0.8, 0.3, 1);
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
`;

export const GalleryPhoto = styled.button<{ $bg: string }>`
  width: 100%;
  height: 172px;
  border-radius: 14px;
  border: 1px solid var(--border);
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  background: ${p => p.$bg};
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

export const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Lightbox = styled.div`
  position: relative;
  width: min(560px, 92vw);
  animation: ${rise} 0.22s cubic-bezier(0.2, 0.8, 0.3, 1);
`;

export const LbPhoto = styled.div<{ $bg: string }>`
  width: 100%;
  height: min(58vh, 440px);
  border-radius: 18px;
  background: ${p => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.35);
`;

export const LbClose = styled.button`
  position: absolute;
  top: -14px;
  right: -14px;
  z-index: 3;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #fff;
  border: none;
  color: #374151;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);

  &:hover { background: #f4f8f5; }
`;

export const LbArrow = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: calc(50% - 42px);
  transform: translateY(-50%);
  ${p => p.$side === 'left' ? 'left: -20px;' : 'right: -20px;'}
  z-index: 3;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  border: none;
  color: #374151;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 18px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  transition: background 0.15s, transform 0.15s;

  &:hover {
    background: #fff;
    transform: translateY(-50%) scale(1.08);
  }
`;

export const LbFoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
  background: #fff;
  border-radius: 14px;
  padding: 14px 16px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
`;

export const LbCaption = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

export const LbMeta = styled.div`
  font-size: 12.5px;
  color: var(--muted);
  margin-top: 3px;
`;

export const LbActions = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
`;

export const LbDots = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #9ca3af;
`;

export const LbDownload = styled.button`
  background: var(--brand);
  color: #fff;
  border: none;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.15s;

  &:hover { background: #004428; }
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
