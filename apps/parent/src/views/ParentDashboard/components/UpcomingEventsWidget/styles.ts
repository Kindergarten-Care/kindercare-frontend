import styled from 'styled-components';

export const Card = styled.div`
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #dde8d9);
  border-radius: var(--r-lg, 16px);
  padding: 16px 18px;
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

export const EvItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border, #dde8d9);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:hover {
    background: #fafafa;
  }
`;

export const EvDate = styled.div`
  background: var(--bg, #f4f9f1);
  border: 1px solid var(--border, #dde8d9);
  border-radius: 10px;
  width: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;

  strong {
    display: block;
    font-size: 16px;
    font-weight: 900;
    color: var(--accent, #005e2c);
    padding: 4px 0 2px;
  }
  
  span {
    display: block;
    width: 100%;
    text-align: center;
    background: var(--accent-light, #dcfce7);
    color: var(--accent, #005e2c);
    font-size: 10px;
    font-weight: 700;
    padding: 2px 0;
  }
`;

export const EvInfo = styled.div`
  flex: 1;
  min-width: 0;
  
  strong {
    display: block;
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 2px;
  }
  
  span {
    font-size: 12px;
    color: var(--muted, #627062);
  }
`;

export const EvTag = styled.div<{ $type?: 'school' | 'payment' | 'holiday' }>`
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
  flex-shrink: 0;

  ${props => {
    switch (props.$type) {
      case 'school':
        return `
          background: var(--info-light, #e0f2fe);
          color: var(--info, #0369a1);
        `;
      case 'payment':
        return `
          background: var(--warn-light, #fef3c7);
          color: var(--warn, #c77b0a);
        `;
      case 'holiday':
        return `
          background: var(--accent-light, #dcfce7);
          color: var(--accent, #005e2c);
        `;
      default:
        return `
          background: #f1f5f9;
          color: #475569;
        `;
    }
  }}
`;
