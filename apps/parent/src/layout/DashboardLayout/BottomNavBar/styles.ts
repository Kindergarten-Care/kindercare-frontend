'use client';

import styled from 'styled-components';
import Link from 'next/link';

export const Bar = styled.nav`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: stretch;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    padding-bottom: env(safe-area-inset-bottom, 0px);
    background: #ffffff;
    border-top: 1px solid var(--border, #e6eee9);
    box-shadow: 0 -4px 16px -6px rgba(0, 0, 0, 0.08);
    z-index: 500;
  }
`;

export const Item = styled(Link)<{ $active?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  text-decoration: none;
  color: ${p => (p.$active ? 'var(--brand, #005a36)' : 'var(--muted, #6b7280)')};
  font-size: 10.5px;
  font-weight: 600;
  position: relative;
`;

export const ItemButton = styled.button<{ $active?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  border: none;
  background: none;
  font: inherit;
  cursor: pointer;
  color: ${p => (p.$active ? 'var(--brand, #005a36)' : 'var(--muted, #6b7280)')};
  font-size: 10.5px;
  font-weight: 600;
  position: relative;
`;

