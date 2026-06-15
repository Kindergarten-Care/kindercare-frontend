import styled from 'styled-components';

export const Section = styled.div`
  margin-bottom: 40px;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  
  svg {
    color: #4B5563;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldGroup = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${({ $fullWidth }) => $fullWidth && `grid-column: 1 / -1;`}
`;

export const Label = styled.label`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
  text-transform: uppercase;
`;

export const ValueBox = styled.div`
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 14px 16px;
  color: #111827;
  font-size: 16px;
  font-weight: 500;
`;
