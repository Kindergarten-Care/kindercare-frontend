import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

export const PageHeader = styled.div`
  margin-bottom: 22px;
`;

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

export const ErrorBanner = styled.div`
  background: #fee2e2;
  border: 1px solid #fca5a5;
  color: #991b1b;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 13.5px;
  margin-bottom: 16px;
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const FGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FLabel = styled.label`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #9ca3af;
`;

export const SearchBox = styled.div`
  position: relative;
  min-width: 220px;
`;

export const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  font-size: 13.5px;
  padding: 10px 13px 10px 36px;
  border-radius: 11px;
  border: 1px solid #e6eee9;
  background: #fff;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    border-color: #237a3c;
    box-shadow: 0 0 0 3px rgba(35, 122, 60, 0.12);
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  display: flex;
`;

export const SegTabs = styled.div`
  display: inline-flex;
  background: #eef4f0;
  border: 1px solid #e6eee9;
  border-radius: 12px;
  padding: 4px;
  gap: 3px;
`;

export const SegTab = styled.button<{ $active?: boolean }>`
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: ${({ $active }) => ($active ? '#237a3c' : '#6b7280')};
  padding: 8px 15px;
  border: none;
  background: ${({ $active }) => ($active ? '#fff' : 'none')};
  border-radius: 9px;
  cursor: pointer;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  box-shadow: ${({ $active }) => ($active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none')};

  &:hover {
    color: #1f2937;
  }
`;

export const SegCount = styled.span<{ $active?: boolean }>`
  font-size: 11px;
  font-weight: 700;
  background: ${({ $active }) => ($active ? '#237a3c' : 'rgba(35, 122, 60, 0.12)')};
  color: ${({ $active }) => ($active ? '#fff' : '#237a3c')};
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  display: grid;
  place-items: center;
`;

export const ResultCount = styled.span`
  margin-left: auto;
  font-size: 12.5px;
  color: #6b7280;
  font-weight: 500;
  align-self: center;
`;

export const SchedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 1160px) {
    grid-template-columns: 1fr;
  }
`;

export const SCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  cursor: pointer;
  position: relative;
  background: #fff;
  border: 1px solid #e6eee9;
  border-radius: 16px;
  box-shadow: 0 4px 18px -4px rgba(0, 90, 54, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  transition: transform 0.16s, box-shadow 0.16s, border-color 0.16s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px -8px rgba(0, 90, 54, 0.14);
    border-color: #dce7df;
  }
`;

export const SCardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 14px;
`;

export const SCardAv = styled.span<{ $bg: string }>`
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  color: #fff;
  flex-shrink: 0;
  background: ${({ $bg }) => $bg};
  box-shadow: 0 6px 14px -6px rgba(0, 0, 0, 0.25);
`;

export const SCardCls = styled.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.2;
  color: #1f2937;
`;

export const SCardGrade = styled.div`
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
  margin-top: 2px;
`;

export const SCardMonth = styled.div`
  margin-left: auto;
  text-align: right;
  flex-shrink: 0;
`;

export const SCardMM = styled.div`
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: #1f2937;
`;

export const SCardYY = styled.div`
  font-size: 11.5px;
  color: #9ca3af;
  font-weight: 600;
  margin-top: 1px;
`;

export const SCardTheme = styled.div`
  font-size: 13.5px;
  color: #374151;
  line-height: 1.5;
  font-weight: 500;
  padding: 12px 14px;
  background: #f7fbf8;
  border: 1px solid #eef4f0;
  border-radius: 11px;
  display: flex;
  gap: 9px;
  align-items: flex-start;

  svg {
    color: #237a3c;
    flex-shrink: 0;
    margin-top: 1px;
  }
`;

export const SCardFoot = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding-top: 15px;
`;

export const SCardUpdated = styled.div`
  width: 100%;
  margin-top: 11px;
  padding-top: 11px;
  border-top: 1px solid #eef4f0;
  font-size: 11.5px;
  color: #9ca3af;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    color: #9ca3af;
    flex-shrink: 0;
  }
`;

export const SCardGo = styled.span`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 600;
  color: #237a3c;
  transition: gap 0.15s;

  ${SCard}:hover & {
    gap: 8px;
  }
`;

export const ABadge = styled.span<{ $variant: 'pending' | 'approved' | 'active' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 700;
  padding: 5px 11px;
  border-radius: 20px;
  letter-spacing: 0.01em;

  ${({ $variant }) => {
    switch ($variant) {
      case 'approved':
        return 'color: #237a3c; background: #e8f5ed;';
      case 'active':
        return 'color: #2563eb; background: #e3edfd;';
      default:
        return 'color: #92400e; background: #fff0d8;';
    }
  }}
`;

export const ADot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  color: #6b7280;
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 64px 20px;
  color: #9ca3af;
`;

export const EmptyIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: #f1f6f3;
  color: #9ca3af;
  display: grid;
  place-items: center;
  margin: 0 auto 16px;
`;

export const EmptyTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #6b7280;
  margin: 0 0 5px;
`;

export const EmptyDesc = styled.p`
  font-size: 13px;
  margin: 0;
`;
