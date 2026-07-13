import styled from 'styled-components';

export const SummaryCard = styled.div`
  background: linear-gradient(135deg, #047857 0%, #065f46 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  margin-bottom: 20px;
`;

export const SummaryTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 18px;
`;

export const SummaryStudent = styled.div`
  font-size: 1.05rem;
  font-weight: 700;
`;

export const SummaryMeta = styled.div`
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 4px;
`;

export const SummaryAmount = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

export const SummaryAmountLabel = styled.div`
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.75);
  text-align: right;
`;

export const Section = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.div`
  font-size: 0.82rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 10px;
`;

export const BreakdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

export const BreakdownRow = styled.div<{ $emphasis?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-radius: 10px;
  background: ${({ $emphasis }) => ($emphasis ? '#ecfdf5' : '#f9fafb')};
  border: 1px solid ${({ $emphasis }) => ($emphasis ? '#a7f3d0' : '#f3f4f6')};
`;

export const BreakdownLabel = styled.span`
  font-size: 0.82rem;
  color: #6b7280;
`;

export const BreakdownValue = styled.span<{ $emphasis?: boolean }>`
  font-size: 0.88rem;
  font-weight: ${({ $emphasis }) => ($emphasis ? 700 : 600)};
  color: ${({ $emphasis }) => ($emphasis ? '#047857' : '#111827')};
`;

export const BreakdownRowTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const BreakdownNote = styled.div`
  font-size: 0.72rem;
  color: #9ca3af;
  margin-top: 4px;
  width: 100%;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 14px;
`;

export const InfoItem = styled.div`
  font-size: 0.85rem;
`;

export const InfoLabel = styled.div`
  font-size: 0.72rem;
  color: #9ca3af;
  margin-bottom: 2px;
`;

export const InfoValue = styled.div`
  color: #111827;
  font-weight: 500;
`;

export const TxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TxRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  background: #f9fafb;
  border: 1px solid #f3f4f6;
`;

export const TxMethod = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: #111827;
`;

export const TxMeta = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 2px;
`;

export const TxAmount = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: #047857;
  white-space: nowrap;
`;

export const TxStatusBadge = styled.span<{ $success?: boolean }>`
  display: inline-block;
  margin-top: 4px;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 0.68rem;
  font-weight: 600;
  background: ${({ $success }) => ($success ? '#DEF7EC' : '#fef2f2')};
  color: ${({ $success }) => ($success ? '#03543F' : '#b91c1c')};
`;

export const EmptyTx = styled.div`
  text-align: center;
  padding: 24px;
  color: #9ca3af;
  font-size: 0.85rem;
  background: #f9fafb;
  border-radius: 10px;
  border: 1px dashed #e5e7eb;
`;

export const LoadingBox = styled.div`
  text-align: center;
  padding: 48px;
  color: #6b7280;
`;
