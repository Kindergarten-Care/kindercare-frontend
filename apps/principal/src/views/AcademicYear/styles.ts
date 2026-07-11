import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const PageHeader = styled.div`
  margin-bottom: 28px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
`;

export const PageSubtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const AlertBox = styled.div<{ $variant: 'success' | 'error' | 'info' }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 0.875rem;
  line-height: 1.5;

  ${({ $variant }) => {
    switch ($variant) {
      case 'success':
        return `
          background: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
        `;
      case 'error':
        return `
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        `;
      default:
        return `
          background: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #bfdbfe;
        `;
    }
  }}
`;

export const AlertIcon = styled.div`
  font-size: 1.1rem;
  line-height: 1;
  flex-shrink: 0;
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
  margin-bottom: 24px;
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CardDescription = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 20px 0;
  line-height: 1.6;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  background: #fafafa;
  padding: 12px 16px;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #f3f4f6;
`;

export const Td = styled.td`
  padding: 14px 16px;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #f9fafb;
  vertical-align: middle;
`;

export const Tr = styled.tr`
  &:last-child td { border-bottom: none; }
  &:hover td { background: #fafbfb; }
`;

export const Badge = styled.span<{ $active?: boolean; $status?: 'active' | 'inactive' }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;

  ${({ $active, $status }) => {
    const isActive = $active ?? $status === 'active';
    return isActive
      ? `background: #dcfce7; color: #15803d;`
      : `background: #f3f4f6; color: #6b7280;`;
  }}
`;

export const PrimaryButton = styled.button`
  background: #047857;
  color: white;
  border: none;
  padding: 9px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover { background: #065f46; }
  &:disabled { background: #86efac; cursor: not-allowed; }
`;

export const DangerButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 9px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover { background: #dc2626; }
  &:disabled { background: #fca5a5; cursor: not-allowed; }
`;

export const FormGroup = styled.div`margin-bottom: 16px;`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 6px;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  font-size: 0.9rem;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus { border-color: #047857; box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.1); }
`;

export const LoadingText = styled.div`
  font-size: 0.875rem;
  color: #9ca3af;
  padding: 40px 0;
  text-align: center;
`;

export const EmptyState = styled.div`
  font-size: 0.875rem;
  color: #9ca3af;
  padding: 40px 0;
  text-align: center;
  font-style: italic;
`;

export const StepCard = styled(Card)<{ $accent?: 'danger' | 'primary' | 'success' }>`
  border-left: 4px solid ${({ $accent }) =>
    $accent === 'danger' ? '#ef4444'
    : $accent === 'primary' ? '#0ea5e9'
    : '#10b981'};
  margin-bottom: 20px;
`;

export const WarningText = styled.div`
  color: #991b1b;
  margin-top: 8px;
  font-size: 0.8125rem;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const FormBody = styled.div`
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  margin-bottom: 12px;
`;

export const DateRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
