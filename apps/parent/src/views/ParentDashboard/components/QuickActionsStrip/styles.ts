import styled from 'styled-components';

export const StripContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 2px;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Pill = styled.div<{ $variant?: 'primary' | 'warn' }>`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 16px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #dde8d9);
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 600;
  color: var(--fg, #181d18);
  transition: box-shadow 0.13s, transform 0.1s, background 0.12s;
  flex-shrink: 0;

  &:hover {
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.07);
    transform: translateY(-1px);
    background: var(--accent-xlight, #f0faf3);
    color: var(--accent, #005e2c);
  }

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: #fff5f5;
          border-color: #fca5a5;
          color: var(--danger, #b91c1c);
          &:hover {
            background: var(--danger-light, #fee2e2);
          }
        `;
      case 'warn':
        return `
          background: var(--warn-light, #fef3c7);
          border-color: #fde68a;
          color: var(--warn, #c77b0a);
        `;
    }
  }}
`;

export const PillIco = styled.span`
  font-size: 16px;
`;

export const PillBadge = styled.span`
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: var(--accent, #005e2c);
  padding: 1px 5px;
  border-radius: 8px;
`;
