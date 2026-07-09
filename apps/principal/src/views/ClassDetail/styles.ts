import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const Header = styled.div`
  margin-bottom: 32px;
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

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
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
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
`;

export const InfoCard = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const AvatarPlaceholder = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #64748b;
  flex-shrink: 0;
`;

export const InfoDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

export const InfoName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const InfoSubtext = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TabContainer = styled.div`
  margin-top: 32px;
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

export const Td = styled.td`
  padding: 12px 16px;
  font-size: 0.875rem;
  color: #1f2937;
  border-bottom: 1px solid #e2e8f0;
`;
