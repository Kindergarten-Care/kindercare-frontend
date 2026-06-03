import styled from 'styled-components';

export const Card = styled.div`
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #dde8d9);
  border-radius: var(--r-lg, 16px);
  padding: 16px 18px;
`;

export const CalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const MonthSelect = styled.div`
  font-size: 13px;
  font-weight: 800;
  color: var(--fg, #181d18);
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  
  &:hover {
    color: var(--accent, #005e2c);
  }
`;

export const NavBtns = styled.div`
  display: flex;
  gap: 4px;
`;

export const NavBtn = styled.button`
  width: 24px;
  height: 24px;
  background: var(--bg, #f4f9f1);
  border: 1px solid var(--border, #dde8d9);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
  color: var(--muted, #627062);
  
  &:hover {
    background: var(--accent-light, #dcfce7);
    color: var(--accent, #005e2c);
  }
`;

export const CalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  text-align: center;
`;

export const Weekday = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: var(--muted, #627062);
  margin-bottom: 4px;
`;

export const Day = styled.div<{ $isToday?: boolean; $isOtherMonth?: boolean; $status?: 'present' | 'absent' | 'excused' | 'weekend' | 'holiday' | 'none' }>`
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: transform 0.1s, box-shadow 0.1s;

  ${props => props.$isOtherMonth && `
    color: #cbd5e1;
  `}

  ${props => !props.$isOtherMonth && props.$status === 'none' && `
    color: #334155;
    &:hover { background: #f8fafc; }
  `}

  ${props => props.$status === 'weekend' && `
    color: #94a3b8;
    background: #f8fafc;
  `}

  ${props => props.$status === 'present' && `
    color: var(--accent, #005e2c);
    background: var(--accent-light, #dcfce7);
    font-weight: 700;
  `}

  ${props => props.$status === 'absent' && `
    color: var(--danger, #b91c1c);
    background: var(--danger-light, #fee2e2);
  `}

  ${props => props.$status === 'excused' && `
    color: var(--warn, #c77b0a);
    background: var(--warn-light, #fef3c7);
  `}
  
  ${props => props.$status === 'holiday' && `
    color: #0369a1;
    background: #e0f2fe;
  `}

  ${props => props.$isToday && `
    border: 1.5px solid var(--accent, #005e2c);
  `}

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
`;
