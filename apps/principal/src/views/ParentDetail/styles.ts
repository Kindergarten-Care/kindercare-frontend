import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 18px;
`;

export const BtnGhost = styled.button`
  background: #f4f8f5;
  color: #1f2937;
  border: 1px solid #e6eee9;
  padding: 11px 16px;
  font-size: 13.5px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.15s ease;

  &:hover {
    background: #fff;
    border-color: #cfe0d5;
    transform: scale(1.02);
  }
`;

export const BtnDanger = styled.button`
  background: #dc2626;
  color: #fff;
  border: none;
  padding: 11px 16px;
  font-size: 13.5px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 18px -6px rgba(220, 38, 38, 0.45);
  transition: all 0.15s ease;

  &:hover {
    background: #b91c1c;
    transform: scale(1.02);
  }
`;

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e6eee9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
`;

export const Hero = styled(Card)`
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 26px;
  margin-bottom: 22px;
  position: relative;
  overflow: hidden;
`;

export const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, #237a3c 0%, #0a7a4c 55%, #12a066 100%);
  opacity: 0.06;
`;

export const HeroAvatar = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 24px;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 800;
  font-size: 30px;
  flex-shrink: 0;
  background: linear-gradient(140deg, #f97316, #fdba74);
  box-shadow: 0 8px 22px -8px rgba(249, 115, 22, 0.5);
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

export const HeroAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const HeroMain = styled.div`
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 1;
`;

export const HeroName = styled.div`
  font-weight: 800;
  font-size: 25px;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #1f2937;
`;

export const HeroMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

export const Pill = styled.span<{ $variant?: 'code' | 'role' }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12.5px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
  color: ${({ $variant }) => ($variant === 'role' ? '#237a3c' : '#6b7280')};
  background: ${({ $variant }) => ($variant === 'role' ? '#e8f5ed' : '#eef4f0')};
  font-variant-numeric: ${({ $variant }) => ($variant === 'code' ? 'tabular-nums' : 'normal')};
`;

export const Cdot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  display: inline-block;
`;

export const CardPad = styled(Card)`
  padding: 22px;
  margin-bottom: 22px;
`;

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
`;

export const CardTitle = styled.span`
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1f2937;
`;

export const TitleIcon = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  background: #e8f5ed;
  color: #237a3c;
  flex-shrink: 0;
`;

export const CountChip = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #237a3c;
  background: #e8f5ed;
  padding: 2px 10px;
  border-radius: 20px;
  margin-left: 2px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px 26px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Field = styled.div`
  min-width: 0;
`;

export const FieldLabel = styled.div`
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 5px;
`;

export const FieldValue = styled.div<{ $muted?: boolean; $mono?: boolean }>`
  font-size: 14.5px;
  font-weight: ${({ $muted }) => ($muted ? 500 : 600)};
  color: ${({ $muted }) => ($muted ? '#9ca3af' : '#1f2937')};
  font-variant-numeric: ${({ $mono }) => ($mono ? 'tabular-nums' : 'normal')};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9ca3af;
  text-align: left;
  padding: 0 14px 13px;
  border-bottom: 1px solid #eef4f0;
`;

export const Tr = styled.tr`
  transition: background 0.15s;
  cursor: default;

  &:hover {
    background: #f7fbf8;
  }

  &:last-child td {
    border-bottom: none;
  }
`;

export const Td = styled.td`
  padding: 13px 14px;
  border-bottom: 1px solid #eef4f0;
  font-size: 13.5px;
  vertical-align: middle;
  color: #1f2937;
`;

export const KidCell = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

export const KidAvatar = styled.span<{ $bg: string }>`
  width: 34px;
  height: 34px;
  font-size: 12px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 700;
  flex-shrink: 0;
  overflow: hidden;
  background: ${({ $bg }) => $bg};
`;

export const KidAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const KidName = styled.span`
  font-weight: 600;
`;

export const CodeText = styled.span`
  font-variant-numeric: tabular-nums;
  color: #6b7280;
  font-weight: 500;
`;

export const ClassChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 600;
  padding: 4px 11px;
  border-radius: 20px;
  color: #237a3c;
  background: #e8f5ed;
`;

export const GenderChip = styled.span<{ $girl?: boolean }>`
  display: inline-flex;
  align-items: center;
  font-size: 12.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  color: ${({ $girl }) => ($girl ? '#db2777' : '#2563eb')};
  background: ${({ $girl }) => ($girl ? '#fce7f3' : '#e3edfd')};
`;

export const RelText = styled.span`
  color: #6b7280;
  font-weight: 600;
`;

export const YesChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  color: #237a3c;
  background: #e8f5ed;
  padding: 4px 11px;
  border-radius: 20px;
`;

export const NoChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  color: #9ca3af;
  background: #f3f4f6;
  padding: 4px 11px;
  border-radius: 20px;
`;

export const DobText = styled.span`
  font-variant-numeric: tabular-nums;
  color: #6b7280;
`;

export const EmptyText = styled.div`
  text-align: center;
  padding: 32px;
  color: #9ca3af;
  font-size: 13.5px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(20, 35, 28, 0.42);
  backdrop-filter: blur(3px);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: 24px;
`;

export const Modal = styled.div`
  background: #ffffff;
  border-radius: 20px;
  width: 440px;
  max-width: 100%;
  box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.16), 0 6px 16px -6px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

export const ModalHead = styled.div`
  padding: 22px 24px 0;
`;

export const ModalHeadTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
`;

export const ModalBody = styled.div`
  padding: 18px 24px 24px;
`;

export const ModalFoot = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 6px;
`;

export const ModalBtn = styled.button<{ $danger?: boolean }>`
  padding: 12px 22px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.15s;
  background: ${({ $danger }) => ($danger ? '#dc2626' : '#f4f8f5')};
  color: ${({ $danger }) => ($danger ? '#fff' : '#1f2937')};
  box-shadow: ${({ $danger }) => ($danger ? '0 8px 18px -6px rgba(220, 38, 38, 0.45)' : 'none')};

  &:hover {
    background: ${({ $danger }) => ($danger ? '#b91c1c' : '#fff')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StateText = styled.div`
  padding: 40px;
  text-align: center;
  color: #6b7280;
`;
