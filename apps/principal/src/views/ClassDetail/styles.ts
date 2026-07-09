import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const Header = styled.div`
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => (theme.colors as any)?.text || '#111827'};
  margin: 0 0 8px 0;
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
`;

export const TotalStudentsCard = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
`;

export const TotalStudentsLabel = styled.span`
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
`;

export const TotalStudentsValue = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #005a36;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0; /* Prevents overflow in grid */
`;

export const Section = styled.section`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  border: 1px solid #f3f4f6;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-top: 0;
  margin-bottom: 20px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

export const InfoCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border-color: #cbd5e1;
    transform: translateY(-2px);
  }
`;

export const AvatarPlaceholder = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: #64748b;
  flex-shrink: 0;
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 1px #e2e8f0;
`;

export const InfoDetails = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoName = styled.h3`
  font-size: 1.05rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const InfoSubtext = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:first-of-type {
    color: #059669; /* Highlight the role */
    font-weight: 500;
    margin-bottom: 2px;
  }
`;

export const TabContainer = styled.div`
  margin-top: 32px;
`;

export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #334155;
  width: 250px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #005a36;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const TabRow = styled.div`
  display: flex;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 24px;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ $active }) => ($active ? '#047857' : '#64748b')};
  border-bottom: 2px solid ${({ $active }) => ($active ? '#047857' : 'transparent')};
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ $active }) => ($active ? '#047857' : '#334155')};
  }
`;

export const LoadingText = styled.div`
  font-size: 1.1rem;
  color: #6b7280;
  padding: 40px 0;
  text-align: center;
`;

export const ErrorText = styled.div`
  font-size: 1.1rem;
  color: #ef4444;
  padding: 40px 0;
  text-align: center;
`;

export const ChartContainer = styled.div`
  height: 250px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px 24px;
  gap: 8px;
  border-top: 1px solid #e2e8f0;
  background: white;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const PaginationButton = styled.button<{ $disabled?: boolean; $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid ${({ $active }) => ($active ? '#005a36' : '#e2e8f0')};
  background-color: ${({ $active }) => ($active ? '#005a36' : '#ffffff')};
  color: ${({ $active, $disabled }) => {
    if ($disabled) return '#94a3b8';
    if ($active) return '#ffffff';
    return '#475569';
  }};
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $active, $disabled }) => {
      if ($disabled) return '#ffffff';
      if ($active) return '#005a36';
      return '#f1f5f9';
    }};
  }
`;

export const PageInfo = styled.span`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 8px;
`;

export const Td = styled.td`
  padding: 12px 16px;
  font-size: 0.875rem;
  color: #1f2937;
  border-bottom: 1px solid #e2e8f0;
`;
