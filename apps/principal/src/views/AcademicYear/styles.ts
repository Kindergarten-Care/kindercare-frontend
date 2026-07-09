import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 24px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 24px;
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InfoText = styled.div`
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 20px;
`;

export const DangerButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #dc2626;
  }
  
  &:disabled {
    background: #fca5a5;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled.button`
  background: #0ea5e9;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #0284c7;
  }

  &:disabled {
    background: #7dd3fc;
    cursor: not-allowed;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 6px;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  outline: none;
  font-size: 1rem;

  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 1px #0ea5e9;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;

export const Th = styled.th`
  background: #f9fafb;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #4b5563;
  border-bottom: 1px solid #e5e7eb;
`;

export const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  color: #1f2937;
`;

export const Badge = styled.span<{ $active?: boolean }>`
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  background: ${props => props.$active ? '#dcfce7' : '#f3f4f6'};
  color: ${props => props.$active ? '#166534' : '#4b5563'};
`;
