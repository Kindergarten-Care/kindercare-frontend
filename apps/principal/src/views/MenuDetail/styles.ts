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

export const HeroName = styled.div`
  font-weight: 800;
  font-size: 22px;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: #1f2937;
`;

export const HeroMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

export const MPill = styled.span<{ $brand?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12.5px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
  color: ${({ $brand }) => ($brand ? '#237a3c' : '#6b7280')};
  background: ${({ $brand }) => ($brand ? '#e8f5ed' : '#eef4f0')};
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

export const BtnDel = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: #dc2626;
  border: 1px solid #fca5a5;
  padding: 11px 18px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #fee2e2;
    transform: scale(1.02);
  }
`;

export const NoteStrip = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 13px 16px;
  border-radius: 12px;
  background: #e3edfd;
  border: 1px solid #c7d9f7;
  font-size: 12.5px;
  color: #1e3a8a;
  line-height: 1.5;

  svg {
    flex-shrink: 0;
    margin-top: 1px;
    color: #2563eb;
  }
`;

export const MenuWrap = styled.div`
  background: #fff;
  border: 1px solid #e6eee9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  overflow-x: auto;
`;

export const MenuGrid = styled.div`
  min-width: 780px;
  display: grid;
  grid-template-columns: 96px repeat(5, 1fr);
`;

export const MgCell = styled.div`
  padding: 12px;
  border-bottom: 1px solid #eef4f0;
  border-right: 1px solid #eef4f0;
`;

export const MgCorner = styled(MgCell)`
  background: #fbfdfc;
`;

export const MgDayHead = styled(MgCell)`
  background: #fbfdfc;
  text-align: center;
  padding: 14px 6px;
`;

export const MgDayVn = styled.div`
  font-weight: 800;
  font-size: 13.5px;
  color: #1f2937;
`;

export const MgDayShort = styled.div`
  font-size: 10.5px;
  color: #9ca3af;
  font-weight: 600;
  margin-top: 2px;
`;

export const MgMeal = styled(MgCell)<{ $c: string; $tint: string }>`
  background: ${({ $tint }) => $tint};
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
`;

export const MgMealIc = styled.span<{ $c: string }>`
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: #fff;
  color: ${({ $c }) => $c};
  display: grid;
  place-items: center;
`;

export const MgMealLbl = styled.span<{ $c: string }>`
  font-weight: 700;
  font-size: 12.5px;
  color: ${({ $c }) => $c};
`;

export const DishCell = styled(MgCell)<{ $c?: string; $tint?: string }>`
  position: relative;
  min-height: 78px;
  ${({ $tint }) => $tint && `background: ${$tint}22;`}
`;

export const DishName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.35;
`;

export const DishCal = styled.div<{ $c: string; $tint: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ $c }) => $c};
  background: ${({ $tint }) => $tint};
  padding: 2px 8px;
  border-radius: 7px;
  font-variant-numeric: tabular-nums;
`;

export const DishDetail = styled.div`
  font-size: 11px;
  color: #6b7280;
  margin-top: 6px;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: help;
`;

export const DishEmpty = styled.div`
  display: grid;
  place-items: center;
  min-height: 78px;
  background: repeating-linear-gradient(45deg, #fbfdfc 0 8px, #f6faf7 8px 16px);
  border-radius: 8px;

  span {
    font-size: 11px;
    color: #9ca3af;
    font-weight: 500;
  }
`;

export const Tip = styled.div<{ $show: boolean; $top: number; $left: number }>`
  position: fixed;
  z-index: 80;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  background: #1f2937;
  color: #fff;
  font-size: 12px;
  line-height: 1.5;
  padding: 9px 12px;
  border-radius: 10px;
  max-width: 260px;
  box-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.35);
  pointer-events: none;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: translateY(${({ $show }) => ($show ? '0' : '4px')});
  transition: opacity 0.14s, transform 0.14s;

  b {
    color: #a7f3d0;
  }
`;
