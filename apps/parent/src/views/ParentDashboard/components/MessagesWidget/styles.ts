import styled from 'styled-components';

export const Card = styled.div`
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #dde8d9);
  border-radius: var(--r-lg, 16px);
  padding: 16px 18px;
`;

export const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--fg, #181d18);
  display: flex;
  align-items: center;
  gap: 7px;
  
  span {
    font-size: 15px;
  }
`;

export const SectionLink = styled.span`
  font-size: 12px;
  color: var(--accent, #005e2c);
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const MsgItem = styled.div<{ $unread?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border, #dde8d9);
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:hover {
    background: #fafafa;
  }

  ${props => props.$unread && `
    .msg-name { font-weight: 800; color: #111; }
    .msg-prev { font-weight: 600; color: #333; }
    .msg-time { font-weight: 700; color: var(--accent, #005e2c); }
  `}
`;

export const MsgAv = styled.div<{ $bg?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  background: ${props => props.$bg || '#fce7f3'};
`;

export const MsgContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MsgHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 2px;
`;

export const MsgName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #333;
`;

export const MsgTime = styled.div`
  font-size: 11px;
  color: var(--muted, #627062);
  white-space: nowrap;
`;

export const MsgPreview = styled.div`
  font-size: 12px;
  color: var(--muted, #627062);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 12px;
`;

export const UnreadDot = styled.div`
  width: 8px;
  height: 8px;
  background: var(--accent, #005e2c);
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
`;
