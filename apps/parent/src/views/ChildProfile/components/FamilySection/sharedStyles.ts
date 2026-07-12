'use client';

import styled from 'styled-components';

/**
 * Shared card styles used by both FamilySection (relatives) and HomeroomTeacherSection.
 * Keeping them here lets both card types stay visually consistent without duplication.
 */
export const RelCard = styled.div<{ $c: string }>`
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  border-left: 5px solid ${p => p.$c};
  display: flex;
  flex-direction: column;
`;

export const RelHead = styled.div<{ $tint: string }>`
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  background: ${p => p.$tint};
  position: relative;
`;

export const RelAvatar = styled.div<{ $gradient: string }>`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${p => p.$gradient};
  color: #fff;
  font-size: 18px;
  font-weight: 800;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  overflow: hidden;
`;

export const RelId = styled.div`
  flex: 1;
  min-width: 0;
`;

export const RelRole = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: .04em;
`;

export const RelName = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 15px;
  font-weight: 800;
  margin-top: 3px;
  color: #1F2937;
`;

export const RelJob = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
  font-weight: 500;
`;

export const RelPrimary = styled.span`
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 10.5px;
  font-weight: 700;
  color: #1D4ED8;
  background: #fff;
  border: 1px solid #BFDBFE;
  padding: 3px 9px;
  border-radius: 7px;
`;

export const RelBody = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RelItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const RelItemIcon = styled.span<{ $c?: string; $tint?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: ${p => p.$tint ?? '#F4F8F5'};
  color: ${p => p.$c ?? '#005A36'};
`;

export const RelItemMain = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
`;

export const RelItemKey = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: .04em;
`;

export const RelItemValue = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: #1F2937;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RelActions = styled.div`
  padding: 14px 18px 18px;
  display: flex;
  gap: 10px;
  border-top: 1px solid #EEF4F0;
`;

export const RelActionBtn = styled.a<{ $variant: 'call' | 'mail' }>`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 14px;
  border-radius: 10px;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all .15s;

  ${p => p.$variant === 'call'
    ? `
      background: #005A36;
      color: #fff;
      &:hover { background: #004428; }
    `
    : `
      background: #fff;
      color: #1F2937;
      border: 1px solid #E6EEE9;
      &:hover { border-color: #CFE0D5; background: #F4F8F5; }
    `}
`;