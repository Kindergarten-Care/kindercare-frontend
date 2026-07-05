'use client';

import styled from 'styled-components';

// ─── Page layout ──────────────────────────────────────────────────────────────

export const PageWrap = styled.div`
  padding: 24px 32px 56px;
  @media (max-width: 860px) { padding: 18px 18px 48px; }
  @media (max-width: 768px) { padding: 16px 0 48px; }
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 22px;
`;

export const PageTitle = styled.h1`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1F2937;
`;

export const PageSub = styled.p`
  font-size: 13px;
  color: #6B7280;
  margin-top: 3px;
`;

export const HeaderActions = styled.div`
  margin-left: auto;
`;

export const BtnGhost = styled.button`
  font: inherit;
  font-weight: 600;
  font-size: 13.5px;
  border: 1px solid #E6EEE9;
  background: #F4F8F5;
  color: #1F2937;
  cursor: pointer;
  border-radius: 11px;
  padding: 10px 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background .15s, border-color .15s, transform .12s;

  &:hover { background: #fff; border-color: #CFE0D5; }
  &:active { transform: scale(0.97); }
`;

export const BtnBrand = styled.button`
  font: inherit;
  font-weight: 600;
  font-size: 13px;
  border: none;
  background: #005A36;
  color: #fff;
  cursor: pointer;
  border-radius: 11px;
  padding: 9px 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  box-shadow: 0 8px 18px -7px rgba(0, 90, 54, 0.5);
  transition: background .15s, transform .12s;

  &:hover { background: #004428; }
  &:active { transform: scale(0.97); }
`;

// ─── Two-column layout ──────────────────────────────────────────────────────────

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 24px;
  align-items: start;
  @media (max-width: 980px) { grid-template-columns: minmax(0, 1fr); }
`;

export const ColLeft = styled.div`
  min-width: 0;
`;

export const ColRight = styled.div`
  min-width: 0;
`;

// ─── Sections (stacked vertically) ─────────────────────────────────────────────

export const Section = styled.div`
  margin-bottom: 24px;
`;

export const SecHead = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 14px;
`;

export const SecIcon = styled.span<{ $bg?: string; $fg?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: ${p => p.$bg ?? '#E6F3ED'};
  color: ${p => p.$fg ?? '#005A36'};
`;

export const SecTitle = styled.h2`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #1F2937;
`;

export const SecSub = styled.span`
  font-size: 12.5px;
  color: #9CA3AF;
  margin-left: auto;
  font-weight: 500;
`;

export const Card = styled.div`
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
`;

// ─── Child profile banner (full-width, horizontal) ─────────────────────────────

export const ChildBanner = styled(Card)`
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 24px 28px;
  position: relative;
  overflow: hidden;
  min-width: 0;
  background: linear-gradient(100deg, #EBF6F0 0%, #FFFFFF 46%);

  &::before {
    content: '';
    position: absolute;
    top: -60px;
    right: -60px;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 90, 54, .08), transparent 70%);
  }

  @media (max-width: 860px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ChildIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  min-width: 0;
  position: relative;

  @media (max-width: 860px) { width: 100%; }
`;

export const ChildAvatar = styled.span<{ $gradient: string }>`
  width: 84px;
  height: 84px;
  border-radius: 24px;
  font-size: 30px;
  flex-shrink: 0;
  box-shadow: 0 18px 48px -12px rgba(0, 90, 54, 0.16), 0 6px 16px -6px rgba(0, 0, 0, 0.06);
  position: relative;
  display: grid;
  place-items: center;
  color: #fff;
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-weight: 700;
  background: ${p => p.$gradient};
  overflow: hidden;
`;

export const ChildName = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1F2937;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 480px) {
    white-space: normal;
    overflow-wrap: break-word;
  }
`;

export const ChildTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const CTag = styled.span<{ $variant?: 'class' | 'status' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 9px;
  ${p => p.$variant === 'class'
    ? 'background: #E6F3ED; color: #005A36;'
    : 'background: #fff; border: 1px solid #E6EEE9; color: #16803d;'}
`;

export const StatusDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #16a34a;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, .15);
  display: inline-block;
`;

export const InfoDivider = styled.div`
  width: 1px;
  align-self: stretch;
  background: #EEF4F0;
  flex-shrink: 0;

  @media (max-width: 860px) { display: none; }
`;

export const InfoGrid = styled.div`
  flex: 1;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px 24px;

  @media (max-width: 1180px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 860px) { grid-template-columns: repeat(2, 1fr); width: 100%; margin-top: 4px; }
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`;

export const InfoRow = styled.div<{ $c?: string; $tint?: string }>`
  display: flex;
  align-items: center;
  gap: 12px;
  --c: ${p => p.$c ?? '#005A36'};
  --c-tint: ${p => p.$tint ?? '#F4F8F5'};
`;

export const InfoIcon = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: var(--c-tint);
  color: var(--c);
`;

export const InfoMain = styled.div`
  flex: 1;
  min-width: 0;
`;

export const InfoKey = styled.div`
  font-size: 11.5px;
  color: #9CA3AF;
  font-weight: 500;
`;

export const InfoValue = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 13.5px;
  font-weight: 700;
  margin-top: 2px;
  color: #1F2937;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// ─── Family cards ─────────────────────────────────────────────────────────────

export const FamilyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 18px;
`;

export const RelCard = styled(Card)<{ $c?: string }>`
  position: relative;
  overflow: hidden;
  --c: ${p => p.$c ?? '#005A36'};
`;

export const RelHead = styled.div<{ $tint?: string }>`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 20px 22px;
  position: relative;
  --c-tint: ${p => p.$tint ?? '#E6F3ED'};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--c);
  }
`;

export const RelAvatar = styled.span<{ $gradient: string }>`
  width: 60px;
  height: 60px;
  border-radius: 17px;
  font-size: 21px;
  flex-shrink: 0;
  box-shadow: 0 6px 14px -6px rgba(0, 0, 0, .25);
  display: grid;
  place-items: center;
  color: #fff;
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-weight: 700;
  background: ${p => p.$gradient};
  overflow: hidden;
`;

export const RelId = styled.div`
  flex: 1;
  min-width: 0;
`;

export const RelRole = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .03em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 8px;
  background: var(--c-tint);
  color: var(--c);
  margin-bottom: 6px;
`;

export const RelName = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1F2937;
`;

export const RelJob = styled.div`
  font-size: 12.5px;
  color: #6B7280;
  margin-top: 3px;
  display: flex;
  align-items: center;
  gap: 6px;

  svg { color: #9CA3AF; }
`;

export const RelPrimary = styled.span`
  margin-left: auto;
  align-self: flex-start;
  font-size: 10.5px;
  font-weight: 700;
  color: #92400E;
  background: #FEF3C7;
  padding: 4px 9px;
  border-radius: 7px;
  flex-shrink: 0;
  white-space: nowrap;
`;

export const RelBody = styled.div`
  padding: 4px 22px 20px;
`;

export const RelItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 0;

  & + & { border-top: 1px solid #EEF4F0; }
`;

export const RelItemIcon = styled.span`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: #F4F8F5;
  color: #6B7280;
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const RelItemMain = styled.div`
  flex: 1;
  min-width: 0;
`;

export const RelItemKey = styled.div`
  font-size: 11.5px;
  color: #9CA3AF;
  font-weight: 500;
`;

export const RelItemValue = styled.div`
  font-size: 13.5px;
  font-weight: 600;
  margin-top: 1px;
  word-break: break-word;
  color: #1F2937;
`;

export const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`;

export const RelActions = styled.div`
  display: flex;
  gap: 10px;
  padding: 4px 22px 22px;
`;

export const RelActionBtn = styled.a<{ $variant?: 'call' | 'mail' }>`
  flex: 1;
  font: inherit;
  font-weight: 700;
  font-size: 13px;
  border: none;
  cursor: pointer;
  border-radius: 11px;
  padding: 11px 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  transition: transform .12s, opacity .15s;
  color: #fff;
  background: ${p => (p.$variant === 'mail' ? '#2563EB' : 'var(--brand, #005A36)')};

  &:hover { opacity: 0.9; }
  &:active { transform: scale(0.97); }
`;
