import styled from 'styled-components';

export const KmOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(20, 35, 28, 0.42);
  backdrop-filter: blur(3px);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: 24px;
  animation: km-fade 0.2s ease;

  @keyframes km-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const KmModal = styled.div<{ $size?: 'sm' | 'md' | 'lg' }>`
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.16), 0 6px 16px -6px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  width: 100%;
  max-width: ${({ $size }) => ($size === 'lg' ? '600px' : $size === 'sm' ? '400px' : '460px')};
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  text-align: left;
  animation: km-rise 0.25s cubic-bezier(0.2, 0.8, 0.3, 1);

  @keyframes km-rise {
    from { transform: translateY(16px) scale(0.98); opacity: 0; }
    to { transform: none; opacity: 1; }
  }
`;

export const KmHead = styled.div`
  padding: 20px 20px 0 24px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  flex-shrink: 0;
`;

export const KmIco = styled.span<{ $variant?: 'brand' | 'red' | 'amber' | 'blue' }>`
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  flex-shrink: 0;

  ${({ $variant = 'brand' }) => {
    switch ($variant) {
      case 'red':
        return 'background: #FEE2E2; color: #DC2626;';
      case 'amber':
        return 'background: #FEF3C7; color: #92400E;';
      case 'blue':
        return 'background: #E3EDFD; color: #2563EB;';
      default:
        return 'background: #E6F3ED; color: #005A36;';
    }
  }}
`;

export const KmHText = styled.div`
  flex: 1;
  min-width: 0;
  padding-top: 2px;
`;

export const KmTitle = styled.h3`
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.3;
  color: #1f2937;
`;

export const KmSubtitle = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin-top: 5px;
  line-height: 1.5;
`;

export const KmClose = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: none;
  background: none;
  color: #9ca3af;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 0.15s;
  flex-shrink: 0;
  margin-top: -4px;

  &:hover {
    background: #f1f4f1;
    color: #1f2937;
  }

  &:active {
    background: #e6eee9;
  }
`;

export const KmBody = styled.div<{ $padTop?: boolean }>`
  padding: ${({ $padTop }) => ($padTop ? '20px 24px 22px' : '18px 24px 22px')};
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  box-sizing: border-box;
`;

// ── Fields ───────────────────────────────────────────────────
export const KmField = styled.div`
  margin-bottom: 15px;

  &:last-child { margin-bottom: 0; }
`;

export const KmLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 7px;
  color: #1f2937;

  .opt { color: #9ca3af; font-weight: 500; }
`;

export const KmInput = styled.input`
  width: 100%;
  font: inherit;
  font-size: 14px;
  padding: 11px 13px;
  border: 1px solid #e6eee9;
  border-radius: 11px;
  background: #fff;
  color: #1f2937;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    border-color: #005a36;
    box-shadow: 0 0 0 3px #e6f3ed;
  }
`;

export const KmTextArea = styled.textarea`
  width: 100%;
  font: inherit;
  font-size: 14px;
  padding: 11px 13px;
  border: 1px solid #e6eee9;
  border-radius: 11px;
  background: #fff;
  color: #1f2937;
  outline: none;
  resize: vertical;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    border-color: #005a36;
    box-shadow: 0 0 0 3px #e6f3ed;
  }
`;

export const KmHint = styled.div`
  font-size: 11.5px;
  color: #9ca3af;
  margin-top: 6px;
`;

export const KmRow2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const KmInputAffix = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input { padding-right: 44px; }

  .affix {
    position: absolute;
    right: 13px;
    font-size: 13px;
    font-weight: 600;
    color: #9ca3af;
    pointer-events: none;
  }
`;

// ── Callout ──────────────────────────────────────────────────
export const KmCallout = styled.div<{ $variant?: 'red' | 'amber' }>`
  display: flex;
  gap: 12px;
  padding: 14px 15px;
  border-radius: 13px;
  font-size: 13px;
  line-height: 1.55;
  border: 1px solid;
  margin-top: 2px;

  b { font-weight: 700; }
  svg { flex-shrink: 0; margin-top: 1px; }

  ${({ $variant = 'red' }) =>
    $variant === 'amber'
      ? 'background: #FEF3C7; border-color: #F6E2A8; color: #92400E;'
      : 'background: #FEE2E2; border-color: #FCA5A5; color: #991B1B;'}
`;

// ── Footer ───────────────────────────────────────────────────
export const KmFoot = styled.div<{ $tight?: boolean; $spread?: boolean }>`
  display: flex;
  gap: 10px;
  justify-content: ${({ $spread }) => ($spread ? 'space-between' : 'flex-end')};
  padding: ${({ $tight }) => ($tight ? '0 24px 22px' : '16px 24px 22px')};
  border-top: ${({ $tight }) => ($tight ? 'none' : '1px solid #eef4f0')};
  flex-shrink: 0;
`;

// ── Buttons ──────────────────────────────────────────────────
export const KmBtn = styled.button<{ $variant?: 'brand' | 'danger' | 'ghost' }>`
  font: inherit;
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  padding: 11px 20px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.12s, background 0.15s, box-shadow 0.15s;

  &:active { transform: scale(0.97); }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  ${({ $variant = 'ghost' }) => {
    switch ($variant) {
      case 'brand':
        return `
          background: #005A36;
          color: #fff;
          box-shadow: 0 8px 18px -6px rgba(0,90,54,.45);
          &:hover:not(:disabled) { background: #004428; }
        `;
      case 'danger':
        return `
          background: #DC2626;
          color: #fff;
          box-shadow: 0 8px 18px -6px rgba(220,38,38,.42);
          &:hover:not(:disabled) { background: #B91C1C; }
        `;
      default:
        return `
          background: #F4F8F5;
          color: #1f2937;
          border: 1px solid #E6EEE9;
          &:hover:not(:disabled) { background: #fff; border-color: #CFE0D5; }
        `;
    }
  }}
`;

// ── Success state ────────────────────────────────────────────
export const KmSuccess = styled.div`
  padding: 30px 24px 10px;
  text-align: center;
`;

export const KmSuccessRing = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #e6f3ed;
  color: #005a36;
  display: grid;
  place-items: center;
  margin: 0 auto 18px;
`;

export const KmSuccessTitle = styled.h3`
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
`;

export const KmSuccessText = styled.p`
  font-size: 13.5px;
  color: #6b7280;
  margin-top: 8px;
  max-width: 320px;
  margin-inline: auto;
`;

export const KmErrorText = styled.p`
  font-size: 13px;
  color: #dc2626;
  margin-top: 8px;
`;
