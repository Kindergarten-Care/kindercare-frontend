import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 28px;
  gap: 16px;
`;

export const TitleBlock = styled.div``;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
`;

export const StatBadge = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 400;
  margin-left: 8px;
`;

export const PageSubtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #047857;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 1px 3px rgba(4, 120, 87, 0.3);
  white-space: nowrap;

  &:hover { background: #065f46; }
  &:active { transform: translateY(1px); }
`;

export const TreeCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
  overflow: hidden;
`;

export const TreeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
  background: #fafafa;
`;

export const TreeTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
`;

export const TreeBody = styled.div`
  padding: 20px;
`;

export const GradeItem = styled.div`
  margin-bottom: 16px;

  &:last-child { margin-bottom: 0; }
`;

export const GradeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 1.5px solid #bbf7d0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;

  &:hover {
    border-color: #047857;
    box-shadow: 0 2px 8px rgba(4, 120, 87, 0.15);
  }
`;

export const GradeIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #047857;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
`;

export const GradeInfo = styled.div`
  flex: 1;
`;

export const GradeName = styled.div`
  font-weight: 700;
  color: #111827;
  font-size: 0.9375rem;
`;

export const GradeMeta = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 2px;
`;

export const ChevronIcon = styled.div<{ $expanded: boolean }>`
  color: #6b7280;
  font-size: 0.7rem;
  transition: transform 0.25s ease;
  transform: rotate(${({ $expanded }) => ($expanded ? '90deg' : '0deg')});
  display: flex;
  align-items: center;
`;

export const ClassListWrapper = styled.div<{ $expanded: boolean }>`
  overflow: hidden;
  max-height: ${({ $expanded }) => ($expanded ? '500px' : '0')};
  transition: max-height 0.3s ease-in-out;
`;

export const ClassList = styled.div`
  padding: 12px 0 8px 24px;
  margin-left: 18px;
  border-left: 2px solid #e5e7eb;
`;

export const ClassRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #f0fdf4;
  }
`;

export const ClassIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: #e0f2fe;
  color: #0369a1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  flex-shrink: 0;
`;

export const ClassInfo = styled.div`
  flex: 1;
`;

export const ClassName = styled.div`
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
`;

export const ClassYear = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
`;

export const ArrowIcon = styled.div`
  color: #047857;
  opacity: 0;
  transition: opacity 0.15s;
  display: flex;

  ${ClassRow}:hover & {
    opacity: 1;
  }
`;

export const EmptyClass = styled.div`
  font-size: 0.8125rem;
  color: #9ca3af;
  font-style: italic;
  padding: 8px 0 8px 38px;
`;

export const LoadingText = styled.div`
  font-size: 0.875rem;
  color: #9ca3af;
  padding: 60px;
  text-align: center;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 40px;
  color: #9ca3af;
`;

export const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 12px;
  opacity: 0.5;
`;

export const EmptyTitle = styled.div`
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 4px;
`;

export const EmptySubtitle = styled.div`
  font-size: 0.875rem;
  color: #9ca3af;
`;
