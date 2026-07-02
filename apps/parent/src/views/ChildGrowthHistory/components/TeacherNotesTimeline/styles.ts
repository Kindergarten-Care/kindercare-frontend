'use client';

import styled from 'styled-components';

export const NoteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Note = styled.div`
  display: flex;
  gap: 14px;
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 14px;
  padding: 17px 19px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
`;

export const NoteMonth = styled.div`
  flex-shrink: 0;
  width: 58px;
  text-align: center;
  border-right: 1px solid #EEF4F0;
  padding-right: 14px;
`;

export const NoteMonthNum = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 22px;
  font-weight: 800;
  color: #005A36;
  line-height: 1;
`;

export const NoteMonthYear = styled.div`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 600;
  margin-top: 3px;
`;

export const NoteBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const NoteTop = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 7px;
`;

export const NoteAvatar = styled.span<{ $gradient: string }>`
  width: 30px;
  height: 30px;
  border-radius: 9px;
  font-size: 11px;
  display: grid;
  place-items: center;
  color: #fff;
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-weight: 700;
  background: ${p => p.$gradient};
  flex-shrink: 0;
`;

export const NoteName = styled.span`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #1F2937;
`;

export const NoteText = styled.div`
  font-size: 13.5px;
  color: #374151;
  line-height: 1.6;
`;

export const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 14px;
`;
