'use client';

import styled from 'styled-components';

export const ColLeft = styled.div`
  min-width: 0;
  position: sticky;
  top: 24px;
  @media (max-width: 980px) { position: static; order: 2; }
`;

export const SecHead = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

export const SecIco = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--brand-tint, #E6F3ED);
  color: var(--brand, #005A36);
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const SecTitle = styled.h2`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--fg, #1F2937);
`;

export const SecSub = styled.span`
  font-size: 12px;
  color: var(--muted-2, #9CA3AF);
  margin-left: auto;
  font-weight: 500;
`;

export const Feed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Post = styled.div`
  background: var(--surface, #fff);
  border: 1px solid var(--border, #E6EEE9);
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0,90,54,0.06), 0 2px 6px -1px rgba(0,0,0,0.03);
  overflow: hidden;
  flex-shrink: 0;
`;

export const PostHead = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 15px 18px 12px;
`;

export const PostAvatar = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(140deg, #0a7a4c, #005A36);
  color: #fff;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 14px;
  font-weight: 700;
  overflow: hidden;
`;

export const PostAuthor = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #1F2937;
`;

export const PostMeta = styled.div`
  font-size: 12px;
  color: var(--muted-2, #9CA3AF);
  margin-top: 2px;
`;

export const PostPill = styled.span`
  margin-left: auto;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 8px;
  background: #E6F3ED;
  color: #005A36;
`;

export const PostBody = styled.p`
  padding: 0 18px 14px;
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
`;

export const PostImg = styled.div`
  aspect-ratio: 16 / 9;
  border-top: 1px solid #EEF4F0;
  border-bottom: 1px solid #EEF4F0;
  background: repeating-linear-gradient(45deg, #EEF4F0, #EEF4F0 13px, #E6EEE9 13px, #E6EEE9 26px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--muted-2, #9CA3AF);
`;

export const PostImgLabel = styled.span`
  font-family: var(--font-jetbrains-mono, 'JetBrains Mono'), ui-monospace, monospace;
  font-size: 11.5px;
  color: var(--muted-2, #9CA3AF);
`;

export const PostFoot = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 12px 18px;
`;

export const PostAct = styled.button<{ $liked: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: ${p => p.$liked ? '#DB2777' : 'var(--muted, #6B7280)'};
  cursor: pointer;
  background: none;
  border: none;
  transition: color 0.15s;
  svg { fill: ${p => p.$liked ? '#DB2777' : 'none'}; }
  &:hover { color: var(--brand, #005A36); }
`;

export const ViewAllButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  background: #f0fdf4;
  color: var(--brand, #005a36);
  border: 1px dashed rgba(0, 90, 54, 0.3);
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 14px;

  &:hover {
    background: var(--brand-tint, #e6f3ed);
    border-color: var(--brand, #005a36);
    box-shadow: 0 4px 12px -2px rgba(0, 90, 54, 0.08);
  }

  &:active {
    transform: scale(0.98);
  }
`;

