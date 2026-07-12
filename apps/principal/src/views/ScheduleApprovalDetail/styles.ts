import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  color: #6b7280;
`;

export const ErrorText = styled.div`
  text-align: center;
  padding: 40px;
  color: #991b1b;
`;

export const Hero = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  margin-bottom: 22px;
  background: #fff;
  border: 1px solid #e6eee9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeroAv = styled.span<{ $bg: string }>`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  color: #fff;
  flex-shrink: 0;
  background: ${({ $bg }) => $bg};
  box-shadow: 0 8px 18px -8px rgba(0, 0, 0, 0.3);
`;

export const HeroMain = styled.div`
  flex: 1;
  min-width: 0;
`;

export const HeroCls = styled.div`
  font-weight: 800;
  font-size: 22px;
  letter-spacing: -0.02em;
  line-height: 1.1;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  color: #1f2937;
`;

export const HeroTheme = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-top: 8px;
  font-weight: 500;
  line-height: 1.5;
`;

export const HeroMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 11px;
  flex-wrap: wrap;
`;

export const MPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12.5px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
  color: #6b7280;
  background: #eef4f0;

  svg {
    color: #237a3c;
  }
`;

export const HeroActions = styled.div`
  display: flex;
  gap: 10px;
  flex-shrink: 0;

  @media (max-width: 900px) {
    width: 100%;

    button {
      flex: 1;
      justify-content: center;
    }
  }
`;

export const BtnApprove = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #237a3c;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 8px 18px -6px rgba(0, 90, 54, 0.45);

  &:hover {
    background: #1a5c2d;
    transform: scale(1.02);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const BtnActivate = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 8px 18px -6px rgba(59, 130, 246, 0.45);

  &:hover {
    background: #2563eb;
    transform: scale(1.02);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const BtnReject = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: #dc2626;
  border: 1px solid #fca5a5;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #fee2e2;
    transform: scale(1.02);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ABadge = styled.span<{ $variant: 'pending' | 'approved' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 20px;
  ${({ $variant }) =>
    $variant === 'approved'
      ? 'color: #237a3c; background: #e8f5ed;'
      : 'color: #92400e; background: #fff0d8;'}
`;

export const ADot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
`;

export const WeekTabs = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 18px;
`;

export const WeekTab = styled.button<{ $active?: boolean }>`
  font: inherit;
  text-align: left;
  background: #fff;
  border: 1px solid ${({ $active }) => ($active ? '#237a3c' : '#e6eee9')};
  background: ${({ $active }) => ($active ? 'rgba(35,122,60,0.08)' : '#fff')};
  border-radius: 13px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.15s;
  min-width: 180px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);

  &:hover {
    border-color: #cfe0d5;
    transform: translateY(-2px);
  }
`;

export const WeekTabN = styled.div<{ $active?: boolean }>`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? '#237a3c' : '#9ca3af')};
`;

export const WeekTabTh = styled.div`
  font-size: 13.5px;
  font-weight: 700;
  margin-top: 4px;
  line-height: 1.3;
  color: #1f2937;
`;

export const TtWrap = styled.div`
  background: #fff;
  border: 1px solid #e6eee9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  overflow-x: auto;
`;

export const Tt = styled.div`
  min-width: 920px;
  display: grid;
  grid-template-columns: 104px repeat(7, 1fr);
`;

export const TtCell = styled.div`
  padding: 10px 11px;
  border-bottom: 1px solid #eef4f0;
  border-right: 1px solid #eef4f0;
`;

export const TtHead = styled(TtCell)<{ $weekend?: boolean; $corner?: boolean }>`
  background: #fbfdfc;
  font-weight: 800;
  font-size: 13px;
  text-align: ${({ $corner }) => ($corner ? 'left' : 'center')};
  padding: 13px 6px;
  color: ${({ $weekend }) => ($weekend ? '#9ca3af' : '#1f2937')};
  ${({ $corner }) =>
    $corner &&
    'font-size:11px; color:#9ca3af; font-weight:700; text-transform:uppercase; letter-spacing:.04em; display:flex; align-items:center;'}
`;

export const TtTime = styled(TtCell)`
  display: flex;
  flex-direction: column;
  gap: 1px;
  font-family: ui-monospace, Menlo, monospace;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  background: #fbfdfc;
  font-variant-numeric: tabular-nums;
  justify-content: center;
`;

export const TtEnd = styled.span`
  color: #9ca3af;
  font-weight: 500;
`;

export const TtAct = styled(TtCell)<{ $c: string; $tint: string }>`
  min-height: 60px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

export const TtActIc = styled.span<{ $c: string; $tint: string }>`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: ${({ $tint }) => $tint};
  color: ${({ $c }) => $c};
  flex-shrink: 0;
  margin-top: 1px;
`;

export const TtActBody = styled.div`
  min-width: 0;
`;

export const TtActName = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.3;
`;

export const TtActLoc = styled.div`
  font-size: 10.5px;
  color: #9ca3af;
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const TtActDetail = styled.div`
  font-size: 10.5px;
  color: #6b7280;
  margin-top: 3px;
  line-height: 1.4;
  font-style: italic;
`;

export const TtEmpty = styled(TtCell)`
  min-height: 60px;
  display: grid;
  place-items: center;
  background: repeating-linear-gradient(45deg, #fbfdfc 0 8px, #f6faf7 8px 16px);

  span {
    font-size: 10.5px;
    color: #9ca3af;
    font-weight: 500;
  }
`;

export const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px 16px;
  margin-top: 16px;
`;

export const Leg = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
`;

export const LegIc = styled.span<{ $c: string; $tint: string }>`
  width: 22px;
  height: 22px;
  border-radius: 7px;
  display: grid;
  place-items: center;
  background: ${({ $tint }) => $tint};
  color: ${({ $c }) => $c};
`;

export const EmptyWeeks = styled.div`
  background: #fff;
  border: 1px solid #e6eee9;
  border-radius: 16px;
  text-align: center;
  padding: 60px 20px;
  color: #9ca3af;
`;

export const EmptyIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: #f1f6f3;
  color: #9ca3af;
  display: grid;
  place-items: center;
  margin: 0 auto 14px;
`;

export const EmptyTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #6b7280;
  margin: 0 0 5px;
`;
