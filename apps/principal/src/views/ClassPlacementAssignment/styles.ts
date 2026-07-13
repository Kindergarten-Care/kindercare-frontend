import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 22px;
`;

export const HeaderText = styled.div``;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1f2937;
  margin: 0 0 4px 0;
`;

export const PageSubtitle = styled.p`
  font-size: 13.5px;
  color: #6b7280;
  margin: 0;
`;

export const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #237a3c;
  color: white;
  border: none;
  padding: 11px 18px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 8px 18px -8px rgba(35, 122, 60, 0.45);
  white-space: nowrap;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: #1a5c2d;
    transform: scale(1.02);
  }

  &:disabled {
    background: #e6eee9;
    color: #9ca3af;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const SaveBadge = styled.span`
  background: rgba(255, 255, 255, 0.22);
  border-radius: 20px;
  padding: 1px 8px;
  font-size: 12px;
  margin-left: 4px;
`;

export const ErrorBanner = styled.div`
  background: #fee2e2;
  border: 1px solid #fca5a5;
  color: #991b1b;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 13.5px;
  margin-bottom: 16px;
`;

export const SplitView = styled.div`
  display: grid;
  grid-template-columns: 1fr 76px 1fr;
  gap: 0;
  flex: 1;
  align-items: stretch;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const Panel = styled.div`
  background: #ffffff;
  border: 1px solid #e6eee9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 640px;

  @media (max-width: 1000px) {
    height: auto;
    max-height: 520px;
  }
`;

export const PanelHead = styled.div`
  padding: 18px 18px 16px;
  border-bottom: 1px solid #eef4f0;
  flex-shrink: 0;
`;

export const PanelTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

export const PanelTitle = styled.h3`
  font-weight: 700;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 9px;
  color: #1f2937;
`;

export const PanelTitleIcon = styled.span<{ $variant?: 'src' | 'dst' }>`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: ${({ $variant }) => ($variant === 'dst' ? '#e8f5ed' : '#fff0d8')};
  color: ${({ $variant }) => ($variant === 'dst' ? '#237a3c' : '#92400e')};
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  background: #ffffff;
  border: 1px solid #e6eee9;
  border-radius: 11px;
  padding: 0 12px;
  height: 40px;
  margin-top: 10px;
  color: #9ca3af;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  font: inherit;
  font-size: 13px;
  color: #1f2937;
  width: 100%;
  background: none;

  &::placeholder { color: #9ca3af; }
`;

export const SubBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 12.5px;
`;

export const SelectionCount = styled.span<{ $active?: boolean }>`
  font-weight: 600;
  color: ${({ $active }) => ($active ? '#374151' : '#9ca3af')};

  b { color: #237a3c; }
`;

export const LinkBtn = styled.button`
  border: none;
  background: none;
  color: #237a3c;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;

  &:hover { text-decoration: underline; }

  &:disabled {
    color: #9ca3af;
    cursor: not-allowed;
    text-decoration: none;
  }
`;

export const PanelMeta = styled.div`
  margin-top: 12px;
  font-size: 12.5px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

export const ListGroupLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #9ca3af;
  padding: 10px 12px 6px;
`;

export const StudentRow = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.12s;
  user-select: none;
  background: ${({ $selected }) => ($selected ? '#e8f5ed' : 'transparent')};

  &:hover { background: ${({ $selected }) => ($selected ? '#e8f5ed' : '#f7fbf8')}; }
`;

export const Checkbox = styled.span<{ $checked?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 2px solid ${({ $checked }) => ($checked ? '#237a3c' : '#e6eee9')};
  background: ${({ $checked }) => ($checked ? '#237a3c' : 'transparent')};
  flex-shrink: 0;
  display: grid;
  place-items: center;
  color: #fff;
  transition: all 0.12s;
`;

export const StudentAvatar = styled.span<{ $bg: string; $size?: number }>`
  width: ${({ $size }) => $size ?? 36}px;
  height: ${({ $size }) => $size ?? 36}px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  flex-shrink: 0;
  overflow: hidden;
  background: ${({ $bg }) => $bg};
`;

export const StudentAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StudentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StudentName = styled.div`
  font-weight: 600;
  font-size: 13.5px;
  line-height: 1.3;
  color: #1f2937;
`;

export const StudentMeta = styled.div`
  font-size: 11.5px;
  color: #9ca3af;
  font-variant-numeric: tabular-nums;
  margin-top: 1px;
`;

export const AgeChip = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  background: #eef4f0;
  padding: 3px 9px;
  border-radius: 20px;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const NewTag = styled.span`
  font-size: 10.5px;
  font-weight: 700;
  color: #237a3c;
  background: #e8f5ed;
  padding: 2px 8px;
  border-radius: 20px;
  flex-shrink: 0;
`;

export const RemoveBtn = styled.button`
  width: 26px;
  height: 26px;
  border-radius: 8px;
  border: none;
  background: none;
  color: #9ca3af;
  cursor: pointer;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  transition: all 0.15s;

  &:hover { background: #fee2e2; color: #dc2626; }
`;

export const MidCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;

  @media (max-width: 1000px) {
    flex-direction: row;
  }
`;

export const MoveButton = styled.button<{ $primary?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  border: 1px solid ${({ $primary }) => ($primary ? '#237a3c' : '#e6eee9')};
  background: ${({ $primary }) => ($primary ? '#237a3c' : '#ffffff')};
  color: ${({ $primary }) => ($primary ? '#fff' : '#6b7280')};
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: ${({ $primary }) =>
    $primary ? '0 10px 22px -8px rgba(35,122,60,.5)' : '0 4px 18px -4px rgba(0,90,54,0.06)'};
  transition: all 0.15s;

  &:hover:not(:disabled) {
    ${({ $primary }) => ($primary ? 'transform: scale(1.06);' : 'border-color: #cfe0d5; color: #1f2937;')}
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }
`;

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #9ca3af;
  text-align: center;
  padding: 30px;
`;

export const EmptyIcon = styled.div`
  font-size: 2.5rem;
  opacity: 0.5;
`;

export const EmptyText = styled.div`
  font-size: 13px;
  line-height: 1.5;
  color: #9ca3af;
`;
