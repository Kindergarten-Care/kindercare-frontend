'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

export interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Panel max-width on desktop (center-modal mode). Ignored on mobile. */
  maxWidth?: string;
  /** Panel max-height on mobile (bottom-sheet mode). Ignored on desktop. Defaults to '85vh'. */
  mobileMaxHeight?: string;
  /** Vertical alignment on desktop: 'center' (default) or 'top' for tall content like tabbed settings panels. */
  desktopAlign?: 'center' | 'top';
  /** Hides the drag handle shown at the top of the mobile sheet. */
  hideMobileHandle?: boolean;
  className?: string;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const popIn = keyframes`
  from { opacity: 0; transform: translateY(14px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const popOut = keyframes`
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(14px) scale(0.98); }
`;

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const slideDown = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
`;

const EXIT_DURATION_MS = 200;

const Overlay = styled.div<{ $desktopAlign: 'center' | 'top'; $closing: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(17, 32, 28, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  animation: ${p => (p.$closing ? fadeOut : fadeIn)} 0.2s ease-out forwards;

  @media (min-width: 768px) {
    align-items: ${p => (p.$desktopAlign === 'top' ? 'flex-start' : 'center')};
    padding: 40px 20px;
  }

  @media (max-width: 767px) {
    align-items: flex-end;
  }
`;

const Panel = styled.div<{ $maxWidth?: string; $mobileMaxHeight?: string; $closing: boolean }>`
  background: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;

  @media (min-width: 768px) {
    max-width: ${p => p.$maxWidth ?? '480px'};
    border-radius: 22px;
    box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.16), 0 6px 16px -6px rgba(0, 0, 0, 0.06);
    animation: ${p => (p.$closing ? popOut : popIn)} 0.22s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    overflow: hidden;
  }

  @media (max-width: 767px) {
    max-height: ${p => p.$mobileMaxHeight ?? '85vh'};
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -10px 40px -10px rgba(0, 0, 0, 0.25);
    animation: ${p => (p.$closing ? slideDown : slideUp)} 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    overflow-y: auto;
  }
`;

const MobileHandle = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: block;
    width: 40px;
    height: 4px;
    border-radius: 999px;
    background: #e6eee9;
    margin: 10px auto 2px;
    flex-shrink: 0;
  }
`;

/**
 * A modal that renders as a centered dialog on desktop (>=768px) and as a
 * bottom sheet on mobile (<768px) — same overlay/close behavior, no content
 * opinion. Wrap any existing modal's inner content with this instead of a
 * bespoke `position: fixed` overlay to get free mobile bottom-sheet behavior.
 */
export function ResponsiveModal({
  isOpen,
  onClose,
  children,
  maxWidth,
  mobileMaxHeight,
  desktopAlign = 'center',
  hideMobileHandle,
  className,
}: ResponsiveModalProps): React.ReactElement | null {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setClosing(false);
    } else if (shouldRender) {
      setClosing(true);
      const t = setTimeout(() => {
        setShouldRender(false);
        setClosing(false);
      }, EXIT_DURATION_MS);
      return () => clearTimeout(t);
    }
  }, [isOpen, shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [shouldRender]);

  if (!shouldRender || !mounted) return null;

  return createPortal(
    <Overlay
      $desktopAlign={desktopAlign}
      $closing={closing}
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Panel
        $maxWidth={maxWidth}
        $mobileMaxHeight={mobileMaxHeight}
        $closing={closing}
        className={className}
        onMouseDown={e => e.stopPropagation()}
      >
        {!hideMobileHandle && <MobileHandle />}
        {children}
      </Panel>
    </Overlay>,
    document.body
  );
}
