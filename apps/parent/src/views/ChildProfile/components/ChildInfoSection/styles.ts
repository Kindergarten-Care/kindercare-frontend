'use client';

import styled from 'styled-components';

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
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: ${p => p.$bg ?? '#E6F3ED'};
  color: ${p => p.$fg ?? '#005A36'};
`;

export const SecTitle = styled.h2`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -.015em;
  color: #1F2937;
`;

export const SecSub = styled.span`
  font-size: 12.5px;
  color: #9CA3AF;
  margin-left: auto;
  font-weight: 500;
`;

export const ChildBanner = styled.div`
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  overflow: hidden;
`;

export const ChildIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 22px;
`;

export const ChildAvatar = styled.div<{ $gradient: string }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${p => p.$gradient};
  color: #fff;
  font-size: 24px;
  font-weight: 800;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  overflow: hidden;
`;

export const ChildName = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: #1F2937;
  letter-spacing: -.01em;
`;

export const InfoDivider = styled.div`
  height: 1px;
  background: #EEF4F0;
  margin: 0 22px;
`;

export const InfoGrid = styled.div`
  padding: 18px 22px 22px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px 22px;
`;

export const InfoRow = styled.div<{ $c: string; $tint: string }>`
  display: flex;
  align-items: center;
  gap: 12px;
  --c: ${p => p.$c};
  --c-tint: ${p => p.$tint};
`;

export const InfoIcon = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--c-tint);
  color: var(--c);
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const InfoMain = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const InfoKey = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: .04em;
`;

export const InfoValue = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: #1F2937;
  margin-top: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;