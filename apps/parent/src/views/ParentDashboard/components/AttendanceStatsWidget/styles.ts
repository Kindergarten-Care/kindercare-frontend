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

export const MainStat = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;

  strong {
    font-size: 32px;
    font-weight: 900;
    color: var(--accent, #005e2c);
    letter-spacing: -0.02em;
  }

  span {
    font-size: 12px;
    font-weight: 600;
    color: var(--muted, #627062);
  }
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

export const StatBox = styled.div<{ $type?: 'present' | 'absent' | 'excused' }>`
  background: var(--bg, #f4f9f1);
  padding: 10px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid var(--border, #dde8d9);

  strong {
    display: block;
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 2px;
  }

  span {
    font-size: 10px;
    color: var(--muted, #627062);
    font-weight: 600;
    text-transform: uppercase;
  }

  ${props => {
    switch (props.$type) {
      case 'present':
        return `
          background: var(--accent-light, #dcfce7);
          border-color: #bbf7d0;
          strong { color: var(--accent, #005e2c); }
        `;
      case 'absent':
        return `
          background: var(--danger-light, #fee2e2);
          border-color: #fca5a5;
          strong { color: var(--danger, #b91c1c); }
        `;
      case 'excused':
        return `
          background: var(--warn-light, #fef3c7);
          border-color: #fde68a;
          strong { color: var(--warn, #c77b0a); }
        `;
    }
  }}
`;
