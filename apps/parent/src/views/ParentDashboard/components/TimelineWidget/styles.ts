import styled from 'styled-components';

export const TimelineWrap = styled.div`
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #dde8d9);
  border-radius: var(--r-lg, 16px);
  padding: 18px 20px;
`;

export const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--fg, #181d18);
  display: flex;
  align-items: center;
  gap: 7px;
  
  span {
    font-size: 15px;
  }
`;

export const SectionLink = styled.span`
  font-size: 12px;
  color: var(--accent, #005e2c);
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const TlItem = styled.div`
  display: flex;
  gap: 0;
`;

export const TlLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 52px;
`;

export const TlTime = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: var(--muted, #627062);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
  padding-top: 5px;
  text-align: center;
  width: 100%;
`;

export const TlSpine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

export const TlDot = styled.div<{ $type: 'done' | 'current' | 'upcoming' }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  border: 2px solid var(--border, #dde8d9);
  background: var(--surface, #ffffff);
  flex-shrink: 0;

  ${props => {
    switch (props.$type) {
      case 'done':
        return `
          border-color: var(--accent, #005e2c);
          background: var(--accent-light, #dcfce7);
        `;
      case 'current':
        return `
          border-color: var(--accent, #005e2c);
          background: var(--accent, #005e2c);
          box-shadow: 0 0 0 4px rgba(0, 94, 44, 0.12);
        `;
      case 'upcoming':
        return `
          background: var(--bg, #f4f9f1);
          border-color: var(--border, #dde8d9);
          opacity: 0.7;
        `;
    }
  }}
`;

export const TlLine = styled.div`
  width: 2px;
  flex: 1;
  background: var(--border, #dde8d9);
  min-height: 18px;
  margin: 4px 0;
`;

export const TlContent = styled.div<{ $isLast?: boolean }>`
  flex: 1;
  min-width: 0;
  padding: 4px 0 18px 14px;
  ${props => props.$isLast && 'padding-bottom: 0;'}
`;

export const TlEventLabel = styled.div<{ $isUpcoming?: boolean }>`
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
  ${props => props.$isUpcoming && 'color: var(--muted, #627062);'}
`;

export const NowBadge = styled.span`
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  background: var(--accent, #005e2c);
  color: #fff;
  padding: 1px 6px;
  border-radius: 6px;
`;

export const TlDesc = styled.div`
  font-size: 12px;
  color: var(--muted, #627062);
  line-height: 1.5;
`;

export const TlPhotoRow = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`;

export const TlPhoto = styled.div<{ $bg?: string }>`
  width: 58px;
  height: 58px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  border: 1px solid var(--border, #dde8d9);
  cursor: pointer;
  transition: transform 0.1s;
  ${props => props.$bg && `background: ${props.$bg};`}

  &:hover {
    transform: scale(1.05);
  }
`;

export const TlUpcomingLabel = styled.div`
  font-size: 11px;
  color: var(--muted, #627062);
  font-style: italic;
`;

export const TlNowDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 2px 0 10px;
`;

export const NdLine = styled.div`
  flex: 1;
  height: 1px;
  background: var(--accent, #005e2c);
`;

export const NdLabel = styled.div`
  font-size: 10px;
  font-weight: 800;
  color: var(--accent, #005e2c);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  background: var(--accent-light, #dcfce7);
  padding: 2px 8px;
  border-radius: 6px;
`;
