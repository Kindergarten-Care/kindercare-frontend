import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 60px;
  color: #6b7280;
  font-size: 0.9rem;
`;

export const ErrorText = styled.div`
  text-align: center;
  padding: 60px;
  color: #dc2626;
  font-size: 0.9rem;
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

export const BtnBrand = styled.button`
  background: #237a3c;
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
  box-shadow: 0 8px 18px -8px rgba(35, 122, 60, 0.45);
  transition: all 0.15s ease;

  &:hover {
    background: #1a5c2d;
    transform: scale(1.02);
  }
`;

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e6eee9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
`;

// ── Hero ─────────────────────────────────────────────────────
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
  width: 92px;
  height: 92px;
  border-radius: 24px;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 800;
  font-size: 34px;
  flex-shrink: 0;
  background: linear-gradient(140deg, #db2777, #f9a8d4);
  box-shadow: 0 8px 22px -8px rgba(219, 39, 119, 0.5);
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
  font-size: 26px;
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

export const Pill = styled.span<{ $variant?: 'code' | 'cls' | 'on' }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12.5px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
  color: ${({ $variant }) => ($variant === 'cls' || $variant === 'on' ? '#237a3c' : '#6b7280')};
  background: ${({ $variant }) => ($variant === 'cls' || $variant === 'on' ? '#e8f5ed' : '#eef4f0')};
  font-variant-numeric: ${({ $variant }) => ($variant === 'code' ? 'tabular-nums' : 'normal')};
`;

export const Cdot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  display: inline-block;
`;

export const HeroActions = styled.div`
  display: flex;
  gap: 9px;
  position: relative;
  z-index: 1;
`;

// ── Cards ────────────────────────────────────────────────────
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

// ── Info grid ────────────────────────────────────────────────
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px 26px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Field = styled.div<{ $full?: boolean }>`
  min-width: 0;
  grid-column: ${({ $full }) => ($full ? '1 / -1' : 'auto')};
`;

export const FieldLabel = styled.div`
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 5px;
`;

export const FieldValue = styled.div<{ $muted?: boolean }>`
  font-size: 14.5px;
  font-weight: ${({ $muted }) => ($muted ? 500 : 600)};
  color: ${({ $muted }) => ($muted ? '#9ca3af' : '#1f2937')};
`;

// ── Parent cards ─────────────────────────────────────────────
export const Parents = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const ParentCard = styled.div`
  border: 1px solid #e6eee9;
  border-radius: 14px;
  padding: 18px;
`;

export const ParentCardHead = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const ParentAvatar = styled.span<{ $bg: string }>`
  width: 44px;
  height: 44px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  flex-shrink: 0;
  overflow: hidden;
  background: ${({ $bg }) => $bg};
`;

export const ParentAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ParentName = styled.div`
  font-weight: 700;
  font-size: 14.5px;
  color: #1f2937;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const ParentRel = styled.div`
  font-size: 12.5px;
  color: #9ca3af;
  margin-top: 1px;
`;

export const PrimaryTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  color: #237a3c;
  background: #e8f5ed;
  padding: 2px 9px;
  border-radius: 20px;
  margin-left: 8px;
`;

export const ParentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
`;

export const ContactLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 600;
  color: #1f2937;

  svg { color: #9ca3af; flex-shrink: 0; }
`;

export const EmptyText = styled.div`
  text-align: center;
  padding: 32px;
  color: #9ca3af;
  font-size: 13.5px;
`;

// ── Allergy note ─────────────────────────────────────────────
export const AllergyNote = styled.div<{ $hasContent: boolean }>`
  grid-column: 1 / -1;
  background: ${({ $hasContent }) => ($hasContent ? '#fff0d8' : '#f4f8f5')};
  border: 1px solid ${({ $hasContent }) => ($hasContent ? '#fcd34d' : '#e6eee9')};
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 13px;
  color: ${({ $hasContent }) => ($hasContent ? '#92400e' : '#9ca3af')};
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 4px;

  svg { width: 14px; height: 14px; flex-shrink: 0; margin-top: 1px; }
`;
