'use client';

import styled from 'styled-components';

export const TopRowGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 20px;
  align-items: stretch;
  margin-bottom: 20px;
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

// ─── Overview sub-card ────────────────────────────────────────────────────────

export const OverviewCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  padding: 20px 24px;
  background: linear-gradient(105deg, #EBF6F0 0%, #FFFFFF 90%);
  border: 1px solid #CFE7D8;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06);
`;

export const OvHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
`;

export const OvAvatar = styled.span`
  width: 58px;
  height: 58px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
`;

export const OvMood = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--brand, #005A36);
  background: #fff;
  border: 1px solid #CFE7D8;
  padding: 4px 10px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const OvBody = styled.div`
  flex: 1;
  min-width: 160px;
`;

export const OvTitle = styled.h2`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1F2937;
`;

export const OvDesc = styled.p`
  font-size: 13.5px;
  color: #4B5563;
  margin-top: 4px;
  line-height: 1.5;
`;

export const OvStatPills = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

export const OvStatPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f0fdf4;
  color: #166534;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid #dcfce7;
  svg { color: #15803d; }
`;

// ─── Attendance sub-card ──────────────────────────────────────────────────────

export const AttCard = styled.div`
  background: var(--surface, #fff);
  border: 1px solid var(--border, #E6EEE9);
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0,90,54,0.06), 0 2px 6px -1px rgba(0,0,0,0.03);
`;

export const AttGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

export const AttCol = styled.div`
  padding: 18px 22px;
  &:first-child {
    border-right: 1px solid #EEF4F0;
    @media (max-width: 560px) {
      border-right: none;
      border-bottom: 1px solid #EEF4F0;
    }
  }
`;

export const AttTag = styled.span<{ $type: 'in' | 'out' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 8px;
  margin-bottom: 12px;
  ${p => p.$type === 'in'
    ? 'background: #E6F3ED; color: #005A36;'
    : 'background: #FEF3C7; color: #92400E;'
  }
`;

export const AttTime = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
  color: #1F2937;
`;

export const AttWho = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
`;

export const AttWhoAv = styled.span`
  width: 38px;
  height: 38px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  color: #fff;
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const AttWhoLbl = styled.div`
  font-size: 11.5px;
  color: var(--muted-2, #9CA3AF);
  font-weight: 500;
`;

export const AttWhoName = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #1F2937;
  margin-top: 1px;
`;

export const AttPhotoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 92px;
  margin-top: 14px;
  border: 1.5px dashed #D9E2DC;
  border-radius: 12px;
  background: #FAFBFA;
  box-sizing: border-box;
  overflow: hidden;
`;

export const AttPhotoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: zoom-in;
  display: block;
`;

export const AttPhotoPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #9CA3AF;
  font-size: 11.5px;
  text-align: center;
`;
