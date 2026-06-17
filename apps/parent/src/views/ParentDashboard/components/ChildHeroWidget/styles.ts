import styled from 'styled-components';

export const HeroContainer = styled.div`
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #dde8d9);
  border-radius: var(--r-xl, 20px);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #4ade80, var(--accent, #005e2c));
  }
`;

export const AvWrap = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const Av = styled.div`
  width: 96px;
  height: 96px;
  background: #ffd9b3;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  border: 4px solid var(--border, #dde8d9);
`;

export const StatusBadge = styled.div`
  position: absolute;
  bottom: -8px;
  right: -8px;
  background: #4ade80;
  border: 4px solid var(--surface, #ffffff);
  border-radius: 50%;
  width: 24px;
  height: 24px;
`;

export const Info = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Name = styled.div`
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--fg, #181d18);
`;

export const Meta = styled.div`
  font-size: 14px;
  color: var(--muted, #3f493f);
  margin-top: 4px;
`;

export const Tags = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

export const Tag = styled.span<{ $type: 'green' | 'blue' | 'neutral' | 'yellow' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;

  ${props => {
    switch (props.$type) {
      case 'green':
        return `
          background: var(--accent-light, #dcfce7);
          color: var(--accent, #005e2c);
        `;
      case 'blue':
        return `
          background: var(--info-light, #dbeafe);
          color: #006495;
        `;
      case 'neutral':
        return `
          background: #f3f4f6;
          color: #3f493f;
        `;
      case 'yellow':
        return `
          background: #fefce8;
          color: #b45309;
        `;
    }
  }}
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  flex-shrink: 0;
`;

export const CheckinCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
`;

export const CheckinLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted, #6f7a6e);
  margin-bottom: 2px;
`;

export const CheckinSub = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: var(--accent, #005e2c);
`;

export const CheckinTime = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: var(--fg, #181d18);
  letter-spacing: -0.02em;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

export const BtnAbsence = styled.button`
  background: var(--danger, #ba1a1a);
  color: #fff;
  border: none;
  padding: 9px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.15s;

  &:hover {
    background: #991b1b;
  }
`;

export const BtnMsg = styled.button`
  background: var(--accent-xlight, #f0f5ec);
  color: var(--accent, #005e2c);
  border: 1px solid rgba(0, 94, 44, 0.2);
  padding: 9px 17px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.15s;

  &:hover {
    background: #e6edd9;
  }
`;


